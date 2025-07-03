// Main application entry point - refactored with modules
import { loadConfig, saveConfig } from './config.js';
import { loadServers, loadStarsData, quickInstallServer, uninstallServer, removeServer } from './servers.js';
import { handleGroupByChange, searchServers, updateCurrentServers, displayServers } from './ui.js';
import { loadVariables, updateVariablesList, handleVariableChange, saveIndividualVariable, fetchFromEnvForVariables, saveVariables } from './variables.js';
import { clearSelection, initializeKeyboardNavigation } from './keyboard.js';
import { checkForUpdates, performAutoUpdate } from './updates.js';
import { confirmStopServer, stopServer, showSlackTokenGuide, applySlackToken } from './modals.js';
import { switchTab, closeModal, showMessage } from './utils.js';
import { currentConfig, setCurrentConfig, preConfiguredServers, savedVariables } from './state.js';

// Initialize application
async function init() {
    await loadConfig();
    await loadServers();
    await loadStarsData();
    await loadVariables();
    updateCurrentServers();
    
    setTimeout(checkForUpdates, 2000);
    
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.focus();
    }
    
    initializeKeyboardNavigation();
}

// Server configuration and installation functions
async function configureServer(key) {
    const server = preConfiguredServers[key];
    const modal = document.getElementById('serverModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    // Check if server is already installed to determine if this is a reconfigure
    const isReconfigure = isServerInstalled(key, server);
    const existingServerName = isReconfigure ? findExistingServerName(key, server) : key;
    const existingConfig = isReconfigure ? currentConfig.mcpServers[existingServerName] : null;
    
    modalTitle.textContent = `${isReconfigure ? 'Reconfigure' : 'Configure'} ${server.name}`;
    
    // Check if .env file exists
    let envVariables = {};
    try {
        const response = await fetch('/api/env-variables');
        const data = await response.json();
        if (data.exists) {
            envVariables = data.variables;
        }
    } catch (error) {
        console.error('Error fetching .env variables:', error);
    }
    
    // Check if git repository is available
    let gitInfo = null;
    try {
        const response = await fetch('/api/git-info');
        const data = await response.json();
        if (data.success && data.gitInfo) {
            gitInfo = data.gitInfo;
        }
    } catch (error) {
        console.error('Error fetching git info:', error);
    }
    
    let formHtml = `
        <form onsubmit="installServer(event, '${key}')">
            <div class="form-group">
                <label>Server Name</label>
                <input type="text" id="serverName" value="${existingServerName}" required>
                <small>Name for this server in your configuration</small>
            </div>
    `;
    
    // Add required environment variables form fields
    if (server.requiredEnvVars && server.requiredEnvVars.length > 0) {
        formHtml += '<h4>Required Configuration</h4>';
        server.requiredEnvVars.forEach(envVar => {
            let currentValue = '';
            if (existingConfig && existingConfig.env && existingConfig.env[envVar]) {
                currentValue = existingConfig.env[envVar];
            } else {
                currentValue = savedVariables[envVar] || '';
            }
            
            const sources = [];
            if (savedVariables[envVar]) {
                sources.push({ type: 'global', label: 'global variables', value: savedVariables[envVar] });
            }
            if (envVariables[envVar] !== undefined) {
                sources.push({ type: 'env', label: '.env file', value: envVariables[envVar] });
            }
            if (gitInfo && (envVar === 'GITHUB_REPO' || envVar === 'GITHUB_OWNER')) {
                const gitValue = envVar === 'GITHUB_REPO' ? gitInfo.fullName : gitInfo.owner;
                sources.push({ type: 'git', label: 'git repository', value: gitValue });
            }
            
            const hasMultipleSources = sources.length > 1;
            const buttonWidth = hasMultipleSources ? '90px' : (sources.length === 1 ? '90px' : '8px');
            
            formHtml += `
                <div class="form-group">
                    <label>${envVar}</label>
                    <div style="position: relative;">
                        <input type="text" name="env_${envVar}" id="env_${envVar}" value="${currentValue}" required style="padding-right: ${buttonWidth};">
                        ${sources.length > 0 ? (
                            hasMultipleSources ? `
                                <div class="fetch-dropdown" style="position: absolute; right: 4px; top: 50%; transform: translateY(-50%);">
                                    <button type="button" class="btn-fetch-multi" onclick="toggleFetchDropdown('${envVar}')" title="Fetch from multiple sources">
                                        <span style="font-size: 12px;">📥  fetch  ▼</span>
                                    </button>
                                    <div class="dropdown-content" id="dropdown-${envVar}" style="display: none;">
                                        ${sources.map(source => `
                                            <a href="#" onclick="fetchFromSource('${envVar}', '${source.type}'); return false;" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                                📋 ${source.label}: <span style="color: #666; font-size: 11px;">${source.value.length > 20 ? source.value.substring(0, 20) + '...' : source.value}</span>
                                            </a>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : `
                                <button type="button" class="btn-fetch-single" onclick="fetchFromSource('${envVar}', '${sources[0].type}')" title="Fetch from ${sources[0].label}">
                                    <span style="font-size: 12px;">📋 fetch from ${sources[0].type}</span>
                                </button>
                            `
                        ) : ''}
                    </div>
                    ${currentValue && (existingConfig && existingConfig.env && existingConfig.env[envVar]) ? '<small style="color: #3498db;">✓ Current server value</small>' : (currentValue ? '<small style="color: #27ae60;">✓ Using saved value from Variables tab</small>' : '')}
                </div>
            `;
        });
    }
    
    formHtml += `
        <div class="button-group">
            <button type="submit" class="btn-primary">${isReconfigure ? 'Update Server' : 'Add Server'}</button>
            <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
        </div>
    </form>
    `;
    
    modalBody.innerHTML = formHtml;
    modal.style.display = 'block';
}

function installServer(event, key) {
    event.preventDefault();
    
    const server = preConfiguredServers[key];
    const form = event.target;
    const serverName = form.serverName.value;
    
    const isReconfigure = isServerInstalled(key, server);
    const existingServerName = isReconfigure ? findExistingServerName(key, server) : null;
    
    const installParts = server.installCommand.split(' ');
    const command = installParts[0];
    const args = installParts.slice(1);
    
    const serverConfig = {
        command,
        args: [...args],
        env: {}
    };
    
    const formData = new FormData(form);
    for (const [formKey, value] of formData.entries()) {
        if (formKey.startsWith('env_') && value) {
            const envVar = formKey.substring(4);
            serverConfig.env[envVar] = value;
            
            if (savedVariables[envVar] !== value) {
                savedVariables[envVar] = value;
                saveVariables();
            }
        }
    }
    
    if (isReconfigure && existingServerName && existingServerName !== serverName) {
        delete currentConfig.mcpServers[existingServerName];
    }
    
    const config = { ...currentConfig };
    config.mcpServers[serverName] = serverConfig;
    setCurrentConfig(config);
    
    fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
    }).then(response => {
        if (response.ok) {
            updateCurrentServers();
            document.getElementById('configEditor').value = JSON.stringify(config, null, 2);
            closeModal();
            displayServers();
        } else {
            throw new Error('Failed to save configuration');
        }
    }).catch(error => {
        showMessage(error.message, 'error');
    });
}

// Helper functions for fetching values
async function fetchFromEnv(varName) {
    try {
        const response = await fetch('/api/env-variables');
        const data = await response.json();
        
        if (data.exists && data.variables[varName]) {
            const envInput = document.getElementById(`env_${varName}`);
            const optInput = document.querySelector(`input[name="opt_${varName}"]`);
            
            if (envInput) {
                envInput.value = data.variables[varName];
            } else if (optInput) {
                optInput.value = data.variables[varName];
            }
            
            showMessage(`Fetched ${varName} from .env file`, 'success');
        } else {
            showMessage(`${varName} not found in .env file`, 'error');
        }
    } catch (error) {
        showMessage('Error fetching from .env file', 'error');
    }
}

function toggleFetchDropdown(varName) {
    const dropdown = document.getElementById(`dropdown-${varName}`);
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    
    allDropdowns.forEach(d => {
        if (d !== dropdown) {
            d.style.display = 'none';
        }
    });
    
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

async function fetchFromSource(varName, sourceType) {
    const dropdown = document.getElementById(`dropdown-${varName}`);
    if (dropdown) {
        dropdown.style.display = 'none';
    }
    
    try {
        switch (sourceType) {
            case 'global':
                if (savedVariables[varName]) {
                    const input = document.getElementById(`env_${varName}`);
                    if (input) {
                        input.value = savedVariables[varName];
                        showMessage(`Fetched ${varName} from global variables`, 'success');
                    }
                } else {
                    showMessage(`${varName} not found in global variables`, 'error');
                }
                break;
                
            case 'env':
                await fetchFromEnv(varName);
                break;
                
            default:
                showMessage(`Unknown source type: ${sourceType}`, 'error');
        }
    } catch (error) {
        showMessage(`Error fetching ${varName} from ${sourceType}`, 'error');
    }
}

// Extended switchTab to handle variables tab
function extendedSwitchTab(tabName) {
    switchTab(tabName);
    if (tabName === 'variables') {
        updateVariablesList();
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('serverModal');
    if (event.target === modal) {
        closeModal();
    }
    
    if (!event.target.closest('.fetch-dropdown')) {
        const allDropdowns = document.querySelectorAll('.dropdown-content');
        allDropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    }
}

// Make all functions globally available for HTML onclick handlers
window.handleGroupByChange = handleGroupByChange;
window.searchServers = searchServers;
window.updateCurrentServers = updateCurrentServers;
window.displayServers = displayServers;
window.configureServer = configureServer;
window.installServer = installServer;
window.quickInstallServer = quickInstallServer;
window.uninstallServer = uninstallServer;
window.removeServer = removeServer;
window.saveConfig = saveConfig;
window.switchTab = extendedSwitchTab;
window.closeModal = closeModal;
window.showMessage = showMessage;
window.clearSelection = clearSelection;
window.handleVariableChange = handleVariableChange;
window.saveIndividualVariable = saveIndividualVariable;
window.saveVariables = saveVariables;
window.fetchFromEnvForVariables = fetchFromEnvForVariables;
window.performAutoUpdate = performAutoUpdate;
window.confirmStopServer = confirmStopServer;
window.stopServer = stopServer;
window.showSlackTokenGuide = showSlackTokenGuide;
window.applySlackToken = applySlackToken;
window.fetchFromEnv = fetchFromEnv;
window.toggleFetchDropdown = toggleFetchDropdown;
window.fetchFromSource = fetchFromSource;

// Helper functions that need to be available globally
window.isServerInstalled = function(key, server) {
    if (!currentConfig || !currentConfig.mcpServers) {
        return false;
    }

    return Object.entries(currentConfig.mcpServers).some(([name, config]) => {
        if (name === key) {
            return true;
        }

        const installedCommand = config.command + " " + config.args.join(" ");
        if (installedCommand === server.installCommand) {
            return true;
        }

        const normalizeCommand = (cmd) => cmd.trim().replace(/\s+/g, ' ');
        if (normalizeCommand(installedCommand) === normalizeCommand(server.installCommand)) {
            return true;
        }

        return false;
    });
};

window.findExistingServerName = function(key, server) {
    if (!currentConfig || !currentConfig.mcpServers) {
        return key;
    }

    if (currentConfig.mcpServers[key]) {
        return key;
    }

    for (const [name, config] of Object.entries(currentConfig.mcpServers)) {
        const installedCommand = config.command + " " + config.args.join(" ");
        const normalizeCommand = (cmd) => cmd.trim().replace(/\s+/g, ' ');
        
        if (installedCommand === server.installCommand || 
            normalizeCommand(installedCommand) === normalizeCommand(server.installCommand)) {
            return name;
        }
    }

    return key;
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
});