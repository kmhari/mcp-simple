// Main application entry point - refactored with modules
import { loadConfig, saveConfig } from './config.js';
import { loadServers, loadStarsData, quickInstallServer, uninstallServer, removeServer } from './servers.js';
import { handleGroupByChange, handleSortByChange, handleStarsFilterChange, searchServers, updateCurrentServers, displayServers, toggleCategory, restoreExpandedStates, updateFilterIndicator, resetStarsFilter } from './ui.js';
import { initOptimizedUI } from './ui-optimized.js';
import { initVirtualScrolling, updateVirtualList, refreshVirtualList } from './virtual-scroll.js';
import { loadVariables, updateVariablesList, handleVariableChange, saveIndividualVariable, fetchFromEnvForVariables, saveVariables } from './variables.js';
import { clearSelection, initializeKeyboardNavigation } from './keyboard.js';
import { checkForUpdates, performAutoUpdate } from './updates.js';
import { confirmStopServer, stopServer, showSlackTokenGuide, applySlackToken, showReadme } from './modals.js';
import { switchTab, closeModal, showMessage, invalidateInstalledServersCache } from './utils.js';
import { currentConfig, setCurrentConfig, preConfiguredServers, savedVariables } from './state.js';

/**
 * Parse GitHub URL to extract owner and repository name
 * @param {string} githubUrl - GitHub repository URL
 * @returns {object} - {owner, repo} or null if invalid
 */
function parseGitHubUrl(githubUrl) {
    try {
        // Handle different GitHub URL formats
        const patterns = [
            /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+?)(?:\.git)?(?:\/.*)?$/,
            /^git@github\.com:([^\/]+)\/([^\/]+?)(?:\.git)?$/
        ];
        
        for (const pattern of patterns) {
            const match = githubUrl.match(pattern);
            if (match) {
                const [, owner, repo] = match;
                return { owner, repo };
            }
        }
        
        return null;
    } catch (error) {
        console.error('Error parsing GitHub URL:', error);
        return null;
    }
}

// Load project information
async function loadProjectInfo() {
    try {
        const response = await fetch('/api/project-info');
        const projectInfo = await response.json();
        
        document.getElementById('projectName').textContent = projectInfo.name;
        document.getElementById('projectType').textContent = projectInfo.type;
        
        // Update page title if it's not just a folder name
        if (projectInfo.type !== 'Local Project') {
            document.title = `MCP Server Manager - ${projectInfo.name}`;
        }
    } catch (error) {
        console.error('Error loading project info:', error);
        document.getElementById('projectName').textContent = 'Unknown Project';
        document.getElementById('projectType').textContent = '';
    }
}

// Initialize application
async function init() {
    // Set UI mode early to prevent legacy UI from interfering
    const USE_OPTIMIZED_UI = true; // Enable optimized backend-powered UI
    window.USE_OPTIMIZED_UI = USE_OPTIMIZED_UI; // Make it available globally
    
    await loadConfig();
    await loadServers();
    await loadStarsData();
    await loadVariables();
    await loadProjectInfo();
    
    // Check if we should use optimized UI (for performance with large datasets)
    if (USE_OPTIMIZED_UI) {
        // Initialize optimized UI with backend APIs
        initOptimizedUI();
    } else {
        // Use legacy client-side processing
        updateCurrentServers();
        updateFilterIndicator(0);
    }
    
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
            // Handle both old format (string) and new format (object)
            const varName = typeof envVar === 'string' ? envVar : envVar.name;
            const description = typeof envVar === 'object' ? envVar.description : '';
            const example = typeof envVar === 'object' ? envVar.example : '';
            
            let currentValue = '';
            if (existingConfig && existingConfig.env && existingConfig.env[varName]) {
                currentValue = existingConfig.env[varName];
            } else {
                currentValue = savedVariables[varName] || '';
            }
            
            const sources = [];
            if (savedVariables[varName]) {
                sources.push({ type: 'global', label: 'global variables', value: savedVariables[varName] });
            }
            if (envVariables[varName] !== undefined) {
                sources.push({ type: 'env', label: '.env file', value: envVariables[varName] });
            }
            if (gitInfo && (varName === 'GITHUB_REPO' || varName === 'GITHUB_OWNER')) {
                const gitValue = varName === 'GITHUB_REPO' ? gitInfo.fullName : gitInfo.owner;
                sources.push({ type: 'git', label: 'git repository', value: gitValue });
            }
            
            const hasMultipleSources = sources.length > 1;
            const buttonWidth = hasMultipleSources ? '90px' : (sources.length === 1 ? '90px' : '8px');
            
            formHtml += `
                <div class="form-group">
                    <label>${varName}${description ? ': ' + description : ''}</label>
                    <div style="position: relative;">
                        <input type="text" name="env_${varName}" id="env_${varName}" value="${currentValue}" required style="padding-right: ${buttonWidth};" placeholder="${example || ''}">
                        ${sources.length > 0 ? (
                            hasMultipleSources ? `
                                <div class="fetch-dropdown" style="position: absolute; right: 4px; top: 50%; transform: translateY(-50%);">
                                    <button type="button" class="btn-fetch-multi" onclick="toggleFetchDropdown('${varName}')" title="Fetch from multiple sources">
                                        <span style="font-size: 12px;">📥  fetch  ▼</span>
                                    </button>
                                    <div class="dropdown-content" id="dropdown-${varName}" style="display: none;">
                                        ${sources.map(source => `
                                            <a href="#" onclick="fetchFromSource('${varName}', '${source.type}'); return false;" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                                📋 ${source.label}: <span style="color: #666; font-size: 11px;">${source.value.length > 20 ? source.value.substring(0, 20) + '...' : source.value}</span>
                                            </a>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : `
                                <button type="button" class="btn-fetch-single" onclick="fetchFromSource('${varName}', '${sources[0].type}')" title="Fetch from ${sources[0].label}">
                                    <span style="font-size: 12px;">📋 fetch from ${sources[0].type}</span>
                                </button>
                            `
                        ) : ''}
                    </div>
                    ${currentValue && (existingConfig && existingConfig.env && existingConfig.env[varName]) ? '<small style="color: #3498db;">✓ Current server value</small>' : (currentValue ? '<small style="color: #27ae60;">✓ Using saved value from Variables tab</small>' : '')}
                </div>
            `;
        });
    }
    
    // Add optional parameters form fields
    if (server.optionalParams && server.optionalParams.length > 0) {
        formHtml += '<h4>Optional Parameters</h4>';
        server.optionalParams.forEach(param => {
            // Handle both old format (string) and new format (object)
            const paramName = typeof param === 'string' ? param : param.name;
            const description = typeof param === 'object' ? param.description : '';
            const example = typeof param === 'object' ? param.example : '';
            
            let currentValue = '';
            if (existingConfig && existingConfig.env && existingConfig.env[paramName]) {
                currentValue = existingConfig.env[paramName];
            } else {
                currentValue = savedVariables[paramName] || '';
            }
            
            const sources = [];
            if (savedVariables[paramName]) {
                sources.push({ type: 'global', label: 'global variables', value: savedVariables[paramName] });
            }
            if (envVariables[paramName] !== undefined) {
                sources.push({ type: 'env', label: '.env file', value: envVariables[paramName] });
            }
            if (gitInfo && (paramName === 'GITHUB_REPO' || paramName === 'GITHUB_OWNER')) {
                const gitValue = paramName === 'GITHUB_REPO' ? gitInfo.fullName : gitInfo.owner;
                sources.push({ type: 'git', label: 'git repository', value: gitValue });
            }
            
            const hasMultipleSources = sources.length > 1;
            const buttonWidth = hasMultipleSources ? '90px' : (sources.length === 1 ? '90px' : '8px');
            
            formHtml += `
                <div class="form-group">
                    <label>${paramName}${description ? ': ' + description : ''}</label>
                    <div style="position: relative;">
                        <input type="text" name="opt_${paramName}" id="opt_${paramName}" value="${currentValue}" style="padding-right: ${buttonWidth};" placeholder="${example || ''}">
                        ${sources.length > 0 ? (
                            hasMultipleSources ? `
                                <div class="fetch-dropdown" style="position: absolute; right: 4px; top: 50%; transform: translateY(-50%);">
                                    <button type="button" class="btn-fetch-multi" onclick="toggleFetchDropdown('opt_${paramName}')" title="Fetch from multiple sources">
                                        <span style="font-size: 12px;">📥  fetch  ▼</span>
                                    </button>
                                    <div class="dropdown-content" id="dropdown-opt_${paramName}" style="display: none;">
                                        ${sources.map(source => `
                                            <a href="#" onclick="fetchFromSource('opt_${paramName}', '${source.type}'); return false;" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                                📋 ${source.label}: <span style="color: #666; font-size: 11px;">${source.value.length > 20 ? source.value.substring(0, 20) + '...' : source.value}</span>
                                            </a>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : `
                                <button type="button" class="btn-fetch-single" onclick="fetchFromSource('opt_${paramName}', '${sources[0].type}')" title="Fetch from ${sources[0].label}">
                                    <span style="font-size: 12px;">📋 fetch from ${sources[0].type}</span>
                                </button>
                            `
                        ) : ''}
                    </div>
                    ${currentValue && (existingConfig && existingConfig.env && existingConfig.env[param]) ? '<small style="color: #3498db;">✓ Current server value</small>' : (currentValue ? '<small style="color: #27ae60;">✓ Using saved value from Variables tab</small>' : '')}
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

async function installServer(event, key) {
    event.preventDefault();
    
    const server = preConfiguredServers[key];
    const form = event.target;
    const serverName = form.serverName.value;
    
    const isReconfigure = isServerInstalled(key, server);
    const existingServerName = isReconfigure ? findExistingServerName(key, server) : null;
    
    try {
        let serverConfig;
        
        // Check if server requires git cloning (installType: "self")
        if (server.installType === 'self' && server.githubLink) {
            showMessage(`Cloning repository for ${server.name}...`, 'info');
            
            // Clone the repository first
            const cloneResponse = await fetch('/api/clone-repository', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ serverKey: key })
            });
            
            if (!cloneResponse.ok) {
                const error = await cloneResponse.json();
                throw new Error(error.error || 'Failed to clone repository');
            }
            
            const cloneResult = await cloneResponse.json();
            showMessage(`Repository cloned successfully: ${cloneResult.message}`, 'success');
            
            // For "self" installType, we need to modify the serverConfig to run commands in the cloned directory
            // Parse GitHub URL to get folder name
            const parsed = parseGitHubUrl(server.githubLink);
            if (!parsed) {
                throw new Error('Invalid GitHub URL format');
            }
            
            const { owner, repo } = parsed;
            const folderName = `${owner}-${repo}`;
            
            serverConfig = {
                command: 'bash',
                args: ['-c', `cd .mcp/${folderName} && ${server.installCommand}`],
                env: {}
            };
            
        } else {
            // Regular installation flow (non-"self" installType)
            const installParts = server.installCommand.split(' ');
            const command = installParts[0];
            const args = installParts.slice(1);
            
            serverConfig = {
                command,
                args: [...args],
                env: {}
            };
        }
        
        // Process form data for environment variables and optional parameters
        const formData = new FormData(form);
        for (const [formKey, value] of formData.entries()) {
            if (formKey.startsWith('env_') && value) {
                const envVar = formKey.substring(4);
                serverConfig.env[envVar] = value;
                
                if (savedVariables[envVar] !== value) {
                    savedVariables[envVar] = value;
                    saveVariables();
                }
            } else if (formKey.startsWith('opt_') && value) {
                const optParam = formKey.substring(4);
                serverConfig.env[optParam] = value;
                
                if (savedVariables[optParam] !== value) {
                    savedVariables[optParam] = value;
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
        
        const response = await fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        });
        
        if (response.ok) {
            updateCurrentServers();
            document.getElementById('configEditor').value = JSON.stringify(config, null, 2);
            closeModal();
            displayServers();
            showMessage(`Successfully installed ${server.name}`, 'success');
        } else {
            throw new Error('Failed to save configuration');
        }
        
    } catch (error) {
        showMessage(`Failed to install ${server.name}: ${error.message}`, 'error');
    }
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

async function fetchFromGit(varName) {
    try {
        const response = await fetch('/api/git-info');
        const data = await response.json();
        
        if (data.success && data.gitInfo) {
            let gitValue = '';
            if (varName === 'GITHUB_REPO') {
                gitValue = data.gitInfo.fullName;
            } else if (varName === 'GITHUB_OWNER') {
                gitValue = data.gitInfo.owner;
            }
            
            if (gitValue) {
                const envInput = document.getElementById(`env_${varName}`);
                const optInput = document.getElementById(`opt_${varName}`);
                
                if (envInput) {
                    envInput.value = gitValue;
                } else if (optInput) {
                    optInput.value = gitValue;
                }
                
                showMessage(`Fetched ${varName} from git repository`, 'success');
            } else {
                showMessage(`${varName} not available from git repository`, 'error');
            }
        } else {
            showMessage(`Git repository information not available`, 'error');
        }
    } catch (error) {
        showMessage(`Error fetching ${varName} from git repository: ${error.message}`, 'error');
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
    
    // Extract the actual variable name (remove opt_ prefix if present)
    const actualVarName = varName.startsWith('opt_') ? varName.substring(4) : varName;
    
    try {
        switch (sourceType) {
            case 'global':
                if (savedVariables[actualVarName]) {
                    const input = document.getElementById(varName);
                    if (input) {
                        input.value = savedVariables[actualVarName];
                        showMessage(`Fetched ${actualVarName} from global variables`, 'success');
                    }
                } else {
                    showMessage(`${actualVarName} not found in global variables`, 'error');
                }
                break;
                
            case 'env':
                await fetchFromEnv(actualVarName);
                break;
                
            case 'git':
                await fetchFromGit(actualVarName);
                break;
                
            default:
                showMessage(`Unknown source type: ${sourceType}`, 'error');
        }
    } catch (error) {
        showMessage(`Error fetching ${actualVarName} from ${sourceType}`, 'error');
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
window.handleSortByChange = handleSortByChange;
window.handleStarsFilterChange = handleStarsFilterChange;
window.resetStarsFilter = resetStarsFilter;
window.searchServers = searchServers;
window.updateCurrentServers = updateCurrentServers;
window.displayServers = displayServers;
window.toggleCategory = toggleCategory;
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
window.showReadme = showReadme;
window.fetchFromEnv = fetchFromEnv;
window.toggleFetchDropdown = toggleFetchDropdown;
window.fetchFromSource = fetchFromSource;
window.invalidateInstalledServersCache = invalidateInstalledServersCache;

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