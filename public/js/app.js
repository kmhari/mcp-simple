let currentConfig = { mcpServers: {} };
let preConfiguredServers = {};
let savedVariables = {};

async function init() {
    await loadConfig();
    await loadServers();
    await loadVariables();
    updateCurrentServers();
}

async function loadServers() {
    try {
        const response = await fetch('/api/servers');
        preConfiguredServers = await response.json();
        displayServers();
    } catch (error) {
        showMessage('Failed to load servers', 'error');
    }
}

async function loadConfig() {
    try {
        const response = await fetch('/api/config');
        currentConfig = await response.json();
        console.log('Loaded config:', currentConfig);
        document.getElementById('configEditor').value = JSON.stringify(currentConfig, null, 2);
        updateCurrentServers();
        // Re-display servers after config is loaded to update installation status
        if (Object.keys(preConfiguredServers).length > 0) {
            displayServers();
        }
    } catch (error) {
        console.error('Error loading config:', error);
        showMessage('Failed to load configuration', 'error');
    }
}

async function saveConfig() {
    try {
        const configText = document.getElementById('configEditor').value;
        const config = JSON.parse(configText);
        
        const response = await fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        });
        
        if (response.ok) {
            currentConfig = config;
            console.log('Saved config:', currentConfig);
            showMessage('Configuration saved successfully', 'success');
            updateCurrentServers();
            displayServers(); // Re-display to update installation status
        } else {
            throw new Error('Failed to save configuration');
        }
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

let currentGroupBy = 'none';

function handleGroupByChange(value) {
    currentGroupBy = value;
    const searchValue = document.querySelector('.search-box').value;
    searchServers(searchValue);
}

function displayServers(servers = preConfiguredServers) {
    const grid = document.getElementById('serverGrid');
    grid.innerHTML = '';
    
    if (currentGroupBy === 'category') {
        displayServersByCategory(servers, grid);
    } else {
        displayServersFlat(servers, grid);
    }
}

function isServerInstalled(key, server) {
    console.log("=== Checking if server " + key + " is installed ===");
    console.log("Server install command: " + server.installCommand);
    console.log("Current config state:", currentConfig);
    
    if (!currentConfig || !currentConfig.mcpServers) {
        console.log("No mcpServers found in config");
        return false;
    }

    return Object.entries(currentConfig.mcpServers).some(([name, config]) => {
        console.log("");
        console.log("Comparing with installed server: " + name );
        console.log("  Installed config:", JSON.stringify(config));

        // Exact key match
        if (name === key) {
            console.log("  ✓ Exact key match found!");
            return true;
        }

        // Reconstruct the install command from the config
        const installedCommand = config.command + " " + config.args.join(" ");
        console.log("  Reconstructed command: " + installedCommand);
        console.log("  Expected command: " + server.installCommand);
        
        // Direct comparison of full commands
        if (installedCommand === server.installCommand) {
            console.log("  ✓ Full command match found!");
            return true;
        }

        // Also check if commands are equivalent (handling extra spaces)
        const normalizeCommand = (cmd) => cmd.trim().replace(/\s+/g, ' ');
        if (normalizeCommand(installedCommand) === normalizeCommand(server.installCommand)) {
            console.log("  ✓ Normalized command match found!");
            return true;
        }

        console.log("  ✗ No match");
        return false;
    });
}

function displayServersFlat(servers, grid) {
    // Create a single container for all servers
    const container = document.createElement('div');
    container.className = 'category-grid';
    container.style.marginTop = '0';
    console.log({servers,mcp:currentConfig})
    // Add all servers without grouping
    Object.entries(servers).forEach(([key, server]) => {
        const card = document.createElement('div');
        card.className = 'server-card';
        
        // Check if server is already installed
        const isInstalled = isServerInstalled(key, server);
        // Check if server requires configuration
        const requiresConfig = server.requiredEnvVars && server.requiredEnvVars.length > 0;
        
        // Add data-selected attribute if installed
        if (isInstalled) {
            card.setAttribute('data-selected', '');
        }
        
        card.innerHTML = `
            <div>
                <h3>${server.name}</h3>
                <p class="description">${server.description}</p>
            </div>
            <div class="card-footer">
                <div class="button-container">
                    ${isInstalled ? 
                        `<button class="btn-installed" disabled>Installed</button>
                         <button class="btn-configure" onclick="configureServer('${key}')">Reconfigure</button>
                         <button class="btn-uninstall" onclick="uninstallServer('${key}')">Uninstall</button>` :
                        `<button class="btn-configure" onclick="configureServer('${key}')">Configure</button>
                         ${!requiresConfig ? 
                            `<button onclick="quickInstallServer('${key}')">Install</button>` : ''
                         }`
                    }
                </div>
                <div class="status-indicator ${isInstalled ? 'installed' : ''}"></div>
            </div>
        `;
        container.appendChild(card);
    });
    
    grid.appendChild(container);
}


function displayServersByCategory(servers, grid) {
    // Group servers by category
    const categories = {};
    Object.entries(servers).forEach(([key, server]) => {
        const category = server.category || 'Other';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push({ key, server });
    });
    
    // Sort categories and display them
    const sortedCategories = Object.keys(categories).sort();
    
    sortedCategories.forEach(category => {
        // Create category section
        const categorySection = document.createElement('div');
        categorySection.className = 'category-section';
        categorySection.setAttribute('data-category', category);
        categorySection.innerHTML = `
            <h2 class="category-title">${category} <span class="category-count">(${categories[category].length})</span></h2>
            <div class="category-grid">
        `;
        
        // Add servers in this category
        categories[category].forEach(({ key, server }) => {
            const card = document.createElement('div');
            card.className = 'server-card';
            
            // Check if server is already installed
            const isInstalled = isServerInstalled(key, server);
            // Check if server requires configuration
            const requiresConfig = server.requiredEnvVars && server.requiredEnvVars.length > 0;
            
            // Add data-selected attribute if installed
            if (isInstalled) {
                card.setAttribute('data-selected', '');
            }
            
            card.innerHTML = `
                <div>
                    <h3>${server.name}</h3>
                    <p class="description">${server.description}</p>
                </div>
                <div class="card-footer">
                    <div class="button-container">
                        ${isInstalled ? 
                            `<button class="btn-installed" disabled>Installed</button>
                             <button class="btn-configure" onclick="configureServer('${key}')">Reconfigure</button>
                             <button class="btn-uninstall" onclick="uninstallServer('${key}')">Uninstall</button>` :
                            `<button class="btn-configure" onclick="configureServer('${key}')">Configure</button>
                             ${!requiresConfig ? 
                                `<button onclick="quickInstallServer('${key}')">Install</button>` : ''
                             }`
                        }
                    </div>
                    <div class="status-indicator ${isInstalled ? 'installed' : ''}"></div>
                </div>
            `;
            categorySection.querySelector('.category-grid').appendChild(card);
        });
        
        categorySection.innerHTML += '</div>';
        grid.appendChild(categorySection);
    });
}

function updateCurrentServers() {
    const list = document.getElementById('currentServerList');
    list.innerHTML = '';
    
    if (Object.keys(currentConfig.mcpServers).length === 0) {
        list.innerHTML = '<li class="server-item">No servers configured</li>';
        return;
    }
    
    Object.entries(currentConfig.mcpServers).forEach(([name, config]) => {
        const item = document.createElement('li');
        item.className = 'server-item';
        item.innerHTML = `
            <div class="server-info">
                <h4>${name}</h4>
                <div class="details">
                    Command: ${config.command} ${config.args.join(' ')}
                    ${config.env ? '<br>Env: ' + JSON.stringify(config.env) : ''}
                </div>
            </div>
            <div class="server-actions">
                <button class="btn-edit" onclick="editServer('${name}')">Edit</button>
                <button class="btn-remove" onclick="removeServer('${name}')">Remove</button>
            </div>
        `;
        list.appendChild(item);
    });
}

function searchServers(query) {
    if (!query) {
        displayServers();
        return;
    }
    
    const filtered = {};
    const searchTerm = query.toLowerCase();
    
    Object.entries(preConfiguredServers).forEach(([key, server]) => {
        if ((server.name && server.name.toLowerCase().includes(searchTerm)) ||
            (server.description && server.description.toLowerCase().includes(searchTerm)) ||
            (server.category && server.category.toLowerCase().includes(searchTerm)) ||
            (server.package && server.package.toLowerCase().includes(searchTerm))) {
            filtered[key] = server;
        }
    });
    
    displayServers(filtered);
    
    // Show a message if no results
    if (Object.keys(filtered).length === 0) {
        const grid = document.getElementById('serverGrid');
        grid.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">No servers found matching your search.</div>';
    }
}

async function configureServer(key) {
    const server = preConfiguredServers[key];
    const modal = document.getElementById('serverModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `Configure ${server.name}`;
    
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
    
    let formHtml = `
        <form onsubmit="installServer(event, '${key}')">
            <div class="form-group">
                <label>Server Name</label>
                <input type="text" id="serverName" value="${key}" required>
                <small>Name for this server in your configuration</small>
            </div>
    `;
    
    if (server.requiredEnvVars && server.requiredEnvVars.length > 0) {
        formHtml += '<h4>Required Configuration</h4>';
        server.requiredEnvVars.forEach(envVar => {
            // Check if we have a saved value for this variable
            const savedValue = savedVariables[envVar] || '';
            const hasEnvValue = envVariables[envVar] !== undefined;
            formHtml += `
                <div class="form-group">
                    <label>${envVar}</label>
                    <div style="position: relative;">
                        <input type="text" name="env_${envVar}" id="env_${envVar}" value="${savedValue}" required style="padding-right: ${hasEnvValue ? '110px' : '8px'};">
                        ${hasEnvValue ? `
                            <button type="button" class="btn-env-fetch" onclick="fetchFromEnv('${envVar}')" title="Fetch from .env file">
                                <span style="font-size: 12px;">📋 fetch from .env</span>
                            </button>
                        ` : ''}
                    </div>
                    ${savedValue ? '<small style="color: #27ae60;">✓ Using saved value from Variables tab</small>' : ''}
                    ${key === 'slack' && envVar === 'SLACK_BOT_TOKEN' ? 
                        `<button type="button" class="btn-secondary" style="margin-top: 8px;" onclick="getSlackTokenWithSkyvern()">
                            Get Token with Skyvern
                        </button>` : ''}
                </div>
            `;
        });
    }
    
    if (server.optionalParams && server.optionalParams.length > 0) {
        formHtml += '<h4>Optional Parameters</h4>';
        server.optionalParams.forEach(param => {
            // Check if we have a saved value for this parameter
            const savedValue = savedVariables[param] || '';
            const hasEnvValue = envVariables[param] !== undefined;
            formHtml += `
                <div class="form-group">
                    <label>${param}</label>
                    <div style="position: relative;">
                        <input type="text" name="opt_${param}" value="${savedValue}" style="padding-right: ${hasEnvValue ? '110px' : '8px'};">
                        ${hasEnvValue ? `
                            <button type="button" class="btn-env-fetch" onclick="fetchFromEnv('${param}')" title="Fetch from .env file">
                                <span style="font-size: 12px;">📋 fetch from .env</span>
                            </button>
                        ` : ''}
                    </div>
                    ${savedValue ? '<small style="color: #27ae60;">✓ Using saved value from Variables tab</small>' : ''}
                </div>
            `;
        });
    }
    
    formHtml += `
        <div class="button-group">
            <button type="submit" class="btn-primary">Add Server</button>
            <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
        </div>
    </form>
    `;
    
    modalBody.innerHTML = formHtml;
    modal.style.display = 'block';
}

function quickInstallServer(key) {
    const server = preConfiguredServers[key];
    
    // Parse the install command to get command and args
    const installParts = server.installCommand.split(' ');
    const command = installParts[0];
    const args = installParts.slice(1);
    
    const serverConfig = {
        command,
        args: [...args]
    };
    
    // Add empty env object only if there are optional params
    if (server.optionalParams && server.optionalParams.length > 0) {
        serverConfig.env = {};
    }
    
    // Use the key as the server name
    currentConfig.mcpServers[key] = serverConfig;
    
    // Save configuration
    fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentConfig)
    }).then(response => {
        if (response.ok) {
            showMessage(`Installed ${server.name} successfully`, 'success');
            updateCurrentServers();
            document.getElementById('configEditor').value = JSON.stringify(currentConfig, null, 2);
            displayServers(); // Re-display to update installation status
        } else {
            throw new Error('Failed to save configuration');
        }
    }).catch(error => {
        showMessage(error.message, 'error');
    });
}

function installServer(event, key) {
    event.preventDefault();
    
    const server = preConfiguredServers[key];
    const form = event.target;
    const serverName = form.serverName.value;
    
    const installParts = server.installCommand.split(' ');
    const command = installParts[0];
    const args = installParts.slice(1);
    
    const serverConfig = {
        command,
        args: [...args],
        env: {}
    };
    
    // Collect environment variables
    const formData = new FormData(form);
    for (const [key, value] of formData.entries()) {
        if (key.startsWith('env_') && value) {
            const envVar = key.substring(4);
            serverConfig.env[envVar] = value;
            
            // Update saved variables if value changed
            if (savedVariables[envVar] !== value) {
                savedVariables[envVar] = value;
                saveVariables(); // Save the updated variable
            }
        } else if (key.startsWith('opt_') && value) {
            const param = key.substring(4);
            serverConfig.env[param] = value;
            
            // Update saved variables if value changed
            if (savedVariables[param] !== value) {
                savedVariables[param] = value;
                saveVariables(); // Save the updated variable
            }
        }
    }
    
    currentConfig.mcpServers[serverName] = serverConfig;
    
    // Save configuration
    fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentConfig)
    }).then(response => {
        if (response.ok) {
            showMessage(`Added ${server.name} successfully`, 'success');
            updateCurrentServers();
            document.getElementById('configEditor').value = JSON.stringify(currentConfig, null, 2);
            closeModal();
            displayServers(); // Re-display to update installation status
        } else {
            throw new Error('Failed to save configuration');
        }
    }).catch(error => {
        showMessage(error.message, 'error');
    });
}

function addCustomServer(event) {
    event.preventDefault();
    
    const name = document.getElementById('customName').value;
    const command = document.getElementById('customCommand').value;
    const argsInput = document.getElementById('customArgs').value;
    const envInput = document.getElementById('customEnv').value;
    
    const args = argsInput.split(',').map(arg => arg.trim()).filter(arg => arg);
    const env = {};
    
    if (envInput.trim()) {
        envInput.split(',').forEach(pair => {
            const [key, value] = pair.split('=').map(s => s.trim());
            if (key && value) {
                env[key] = value;
            }
        });
    }
    
    currentConfig.mcpServers[name] = {
        command,
        args,
        ...(Object.keys(env).length > 0 && { env })
    };
    
    // Save configuration
    fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentConfig)
    }).then(response => {
        if (response.ok) {
            showMessage(`Added custom server "${name}" successfully`, 'success');
            updateCurrentServers();
            document.getElementById('configEditor').value = JSON.stringify(currentConfig, null, 2);
            event.target.reset();
            switchTab('current');
        } else {
            throw new Error('Failed to save configuration');
        }
    }).catch(error => {
        showMessage(error.message, 'error');
    });
}

function removeServer(name) {
    if (confirm(`Are you sure you want to remove "${name}"?`)) {
        delete currentConfig.mcpServers[name];
        
        fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentConfig)
        }).then(response => {
            if (response.ok) {
                showMessage(`Removed "${name}" successfully`, 'success');
                updateCurrentServers();
                document.getElementById('configEditor').value = JSON.stringify(currentConfig, null, 2);
                displayServers(); // Re-display to update installation status
            } else {
                throw new Error('Failed to save configuration');
            }
        }).catch(error => {
            showMessage(error.message, 'error');
        });
    }
}

function uninstallServer(key) {
    const server = preConfiguredServers[key];
    if (confirm(`Are you sure you want to uninstall ${server.name}?`)) {
        // Check if server exists with exact key match
        if (currentConfig.mcpServers[key]) {
            delete currentConfig.mcpServers[key];
        } else {
            // If not found by key, search by matching command
            Object.entries(currentConfig.mcpServers).forEach(([name, config]) => {
                const installedCommand = config.command + " " + config.args.join(" ");
                if (installedCommand === server.installCommand) {
                    delete currentConfig.mcpServers[name];
                }
            });
        }
        
        fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentConfig)
        }).then(response => {
            if (response.ok) {
                showMessage(`Uninstalled ${server.name} successfully`, 'success');
                updateCurrentServers();
                document.getElementById('configEditor').value = JSON.stringify(currentConfig, null, 2);
                displayServers(); // Re-display to update installation status
            } else {
                throw new Error('Failed to save configuration');
            }
        }).catch(error => {
            showMessage(error.message, 'error');
        });
    }
}

function editServer(name) {
    const server = currentConfig.mcpServers[name];
    if (!server) {
        showMessage('Server not found', 'error');
        return;
    }
    
    const modal = document.getElementById('serverModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `Edit Server: ${name}`;
    
    let envVarsHtml = '';
    if (server.env && Object.keys(server.env).length > 0) {
        envVarsHtml = '<h4>Environment Variables</h4>';
        Object.entries(server.env).forEach(([key, value]) => {
            envVarsHtml += `
                <div class="form-group">
                    <label>${key}</label>
                    <input type="text" name="env_${key}" value="${value}">
                    <button type="button" class="btn-remove" style="padding: 4px 8px; font-size: 12px;" onclick="this.parentElement.remove()">Remove</button>
                </div>
            `;
        });
    }
    
    modalBody.innerHTML = `
        <form onsubmit="updateServer(event, '${name}')">
            <div class="form-group">
                <label>Server Name</label>
                <input type="text" id="editServerName" value="${name}" required>
                <small>Rename this server configuration</small>
            </div>
            <div class="form-group">
                <label>Command</label>
                <input type="text" id="editCommand" value="${server.command}" required>
            </div>
            <div class="form-group">
                <label>Arguments (comma-separated)</label>
                <input type="text" id="editArgs" value="${server.args.join(', ')}">
            </div>
            <div id="envVarsContainer">
                ${envVarsHtml}
            </div>
            <button type="button" class="btn-secondary" style="margin: 10px 0;" onclick="addEnvVar()">Add Environment Variable</button>
            <div class="button-group">
                <button type="submit" class="btn-primary">Save Changes</button>
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
            </div>
        </form>
    `;
    
    modal.style.display = 'block';
}

function addEnvVar() {
    const container = document.getElementById('envVarsContainer');
    if (!container.querySelector('h4')) {
        container.innerHTML = '<h4>Environment Variables</h4>' + container.innerHTML;
    }
    
    const newEnvVar = document.createElement('div');
    newEnvVar.className = 'form-group';
    newEnvVar.innerHTML = `
        <input type="text" name="env_key" placeholder="Variable name" style="width: 45%; margin-right: 2%;">
        <input type="text" name="env_value" placeholder="Value" style="width: 45%; margin-right: 2%;">
        <button type="button" class="btn-remove" style="padding: 4px 8px; font-size: 12px;" onclick="this.parentElement.remove()">Remove</button>
    `;
    container.appendChild(newEnvVar);
}

function updateServer(event, oldName) {
    event.preventDefault();
    
    const form = event.target;
    const newName = form.editServerName.value;
    const command = form.editCommand.value;
    const argsInput = form.editArgs.value;
    
    const args = argsInput.split(',').map(arg => arg.trim()).filter(arg => arg);
    const env = {};
    
    // Collect existing environment variables
    const envInputs = form.querySelectorAll('input[name^="env_"]:not([name="env_key"]):not([name="env_value"])');
    envInputs.forEach(input => {
        const key = input.name.substring(4);
        if (input.value) {
            env[key] = input.value;
        }
    });
    
    // Collect new environment variables
    const newEnvKeys = form.querySelectorAll('input[name="env_key"]');
    const newEnvValues = form.querySelectorAll('input[name="env_value"]');
    newEnvKeys.forEach((keyInput, index) => {
        if (keyInput.value && newEnvValues[index].value) {
            env[keyInput.value] = newEnvValues[index].value;
        }
    });
    
    // If name changed, delete old entry
    if (newName !== oldName) {
        delete currentConfig.mcpServers[oldName];
    }
    
    // Update configuration
    currentConfig.mcpServers[newName] = {
        command,
        args,
        ...(Object.keys(env).length > 0 && { env })
    };
    
    // Save configuration
    fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentConfig)
    }).then(response => {
        if (response.ok) {
            showMessage(`Updated "${newName}" successfully`, 'success');
            updateCurrentServers();
            document.getElementById('configEditor').value = JSON.stringify(currentConfig, null, 2);
            closeModal();
        } else {
            throw new Error('Failed to save configuration');
        }
    }).catch(error => {
        showMessage(error.message, 'error');
    });
}

function switchTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

function closeModal() {
    document.getElementById('serverModal').style.display = 'none';
}

function showMessage(text, type) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.className = `message ${type}`;
    message.style.display = 'block';
    
    setTimeout(() => {
        message.style.display = 'none';
    }, 5000);
}

async function getSlackTokenWithSkyvern() {
    // Show step-by-step guide modal
    showSlackTokenGuide();
}

function showSlackTokenGuide() {
    const modal = document.getElementById('serverModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = 'Get Slack Bot Token - Step by Step';
    
    modalBody.innerHTML = `
        <div class="slack-token-guide">
            <h3>Manual Steps:</h3>
            <ol>
                <li>
                    <strong>Go to Slack API Apps page</strong><br>
                    <a href="https://api.slack.com/apps" target="_blank" class="btn-secondary">Open Slack Apps</a>
                </li>
                <li>
                    <strong>Create a new app or select existing app</strong><br>
                    <small>If creating new: Choose "From scratch" and give it a name</small>
                </li>
                <li>
                    <strong>Navigate to "OAuth & Permissions" in the left sidebar</strong>
                </li>
                <li>
                    <strong>Add Bot Token Scopes</strong><br>
                    <small>Common scopes: chat:write, channels:read, users:read</small>
                </li>
                <li>
                    <strong>Install to Workspace</strong><br>
                    <small>Click "Install to Workspace" button and authorize</small>
                </li>
                <li>
                    <strong>Copy the Bot User OAuth Token</strong><br>
                    <small>It starts with "xoxb-"</small>
                </li>
            </ol>
            
            <div class="form-group">
                <label>Paste your Bot Token here:</label>
                <input type="text" id="manual_slack_token" placeholder="xoxb-your-token-here">
            </div>
            
            <h4>Or use Skyvern automation:</h4>
            <button type="button" class="btn-primary" onclick="launchSkyvernAutomation()">
                Launch Skyvern Browser Automation
            </button>
            
            <div class="button-group" style="margin-top: 20px;">
                <button type="button" class="btn-primary" onclick="applySlackToken()">Apply Token</button>
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
            </div>
        </div>
        
        <style>
            .slack-token-guide ol {
                margin: 20px 0;
                padding-left: 20px;
            }
            .slack-token-guide li {
                margin: 15px 0;
                line-height: 1.5;
            }
            .slack-token-guide a {
                display: inline-block;
                margin: 5px 0;
            }
        </style>
    `;
    
    modal.style.display = 'block';
}

function applySlackToken() {
    const token = document.getElementById('manual_slack_token').value;
    if (token) {
        document.getElementById('env_SLACK_BOT_TOKEN').value = token;
        closeModal();
        showMessage('Slack token applied successfully', 'success');
    } else {
        showMessage('Please enter a token', 'error');
    }
}

async function launchSkyvernAutomation() {
    const button = event.target;
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Checking Skyvern...';
    
    try {
        // Check if Skyvern is configured
        const skyvernConfig = currentConfig.mcpServers.skyvern;
        if (!skyvernConfig || !skyvernConfig.env || !skyvernConfig.env.SKYVERN_API_KEY) {
            throw new Error('Skyvern is not configured. Please configure Skyvern server first.');
        }
        
        button.textContent = 'Launching browser...';
        
        // Create Skyvern task
        const skyvernUrl = skyvernConfig.env.SKYVERN_BASE_URL || 'https://api.skyvern.com';
        const apiKey = skyvernConfig.env.SKYVERN_API_KEY;
        
        const taskPayload = {
            url: 'https://api.slack.com/apps',
            navigation_goal: 'Navigate to Slack API apps, create or select a bot app, go to OAuth & Permissions, and retrieve the Bot User OAuth Token that starts with xoxb-',
            data_extraction_goal: 'Extract the Bot User OAuth Token from the OAuth & Permissions page',
            proxy_location: 'NONE',
            navigation_payload: {
                instructions: [
                    'If not logged in, wait for user to login',
                    'Create new app or select existing app', 
                    'Navigate to OAuth & Permissions section',
                    'If no scopes added, add chat:write scope',
                    'Install app to workspace if not installed',
                    'Copy Bot User OAuth Token'
                ]
            }
        };
        
        const response = await fetch(`${skyvernUrl}/api/v1/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify(taskPayload)
        });
        
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to create Skyvern task: ${error}`);
        }
        
        const task = await response.json();
        button.textContent = 'Browser launched - Complete steps in browser';
        
        // Open Skyvern dashboard in new tab
        if (task.task_id) {
            window.open(`${skyvernUrl}/tasks/${task.task_id}`, '_blank');
        }
        
        // Poll for completion
        const taskId = task.task_id;
        let pollCount = 0;
        const maxPolls = 60; // 5 minutes
        
        const pollInterval = setInterval(async () => {
            pollCount++;
            
            try {
                const statusResponse = await fetch(`${skyvernUrl}/api/v1/tasks/${taskId}`, {
                    headers: {
                        'x-api-key': apiKey
                    }
                });
                
                if (statusResponse.ok) {
                    const status = await statusResponse.json();
                    
                    if (status.status === 'completed') {
                        clearInterval(pollInterval);
                        
                        // Try to extract token from results
                        let token = null;
                        
                        if (status.extracted_information) {
                            // Look for token in various possible locations
                            token = status.extracted_information.token || 
                                   status.extracted_information.bot_token ||
                                   status.extracted_information.oauth_token;
                            
                            // If not found, search in the text
                            if (!token && status.extracted_information.text) {
                                const match = status.extracted_information.text.match(/xoxb-[a-zA-Z0-9-]+/);
                                if (match) token = match[0];
                            }
                        }
                        
                        if (token) {
                            document.getElementById('manual_slack_token').value = token;
                            button.textContent = 'Token Retrieved! Click Apply Token';
                            showMessage('Token found! Click "Apply Token" to use it', 'success');
                        } else {
                            button.textContent = 'Task completed - Check browser and paste token manually';
                            showMessage('Please copy the token from the browser and paste it above', 'info');
                        }
                        
                        button.disabled = false;
                    } else if (status.status === 'failed') {
                        clearInterval(pollInterval);
                        throw new Error('Skyvern task failed - Please complete manually');
                    } else if (pollCount >= maxPolls) {
                        clearInterval(pollInterval);
                        button.textContent = 'Complete in browser and paste token';
                        button.disabled = false;
                        showMessage('Please complete the process in the browser and paste the token', 'info');
                    }
                }
            } catch (error) {
                clearInterval(pollInterval);
                button.textContent = originalText;
                button.disabled = false;
                showMessage('Error: ' + error.message, 'error');
            }
        }, 5000);
        
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
        button.textContent = originalText;
        button.disabled = false;
    }
}

// Variables management functions
async function loadVariables() {
    try {
        const response = await fetch('/api/variables');
        if (response.ok) {
            savedVariables = await response.json();
        }
    } catch (error) {
        console.error('Failed to load variables:', error);
    }
}

function updateVariablesList() {
    const container = document.getElementById('variablesList');
    container.innerHTML = '';
    
    // Collect all unique environment variables from all servers
    const variableUsage = {};
    
    // Scan pre-configured servers
    Object.entries(preConfiguredServers).forEach(([key, server]) => {
        if (server.requiredEnvVars) {
            server.requiredEnvVars.forEach(varName => {
                if (!variableUsage[varName]) {
                    variableUsage[varName] = [];
                }
                variableUsage[varName].push(server.name);
            });
        }
    });
    
    // Scan current configuration
    Object.entries(currentConfig.mcpServers).forEach(([name, config]) => {
        if (config.env) {
            Object.keys(config.env).forEach(varName => {
                if (!variableUsage[varName]) {
                    variableUsage[varName] = [];
                }
                if (!variableUsage[varName].includes(name)) {
                    variableUsage[varName].push(name);
                }
            });
        }
    });
    
    // Create UI for each variable
    Object.entries(variableUsage).sort().forEach(([varName, servers]) => {
        const item = document.createElement('div');
        item.className = 'variable-item';
        
        const value = savedVariables[varName] || '';
        
        item.innerHTML = `
            <div class="variable-name">${varName}</div>
            <input type="text" 
                   class="variable-input" 
                   data-var-name="${varName}"
                   value="${value}"
                   placeholder="Enter value for ${varName}">
            <div class="variable-usage">
                <strong>Used by:</strong> ${servers.join(', ')}
            </div>
        `;
        
        container.appendChild(item);
    });
    
    if (Object.keys(variableUsage).length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No environment variables found in configured servers.</p>';
    }
}

async function saveVariables() {
    const variables = {};
    
    // Collect all variable values
    document.querySelectorAll('.variable-input').forEach(input => {
        const varName = input.getAttribute('data-var-name');
        const value = input.value.trim();
        if (value) {
            variables[varName] = value;
        }
    });
    
    try {
        const response = await fetch('/api/variables', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(variables)
        });
        
        if (response.ok) {
            savedVariables = variables;
            showMessage('Variables saved successfully', 'success');
        } else {
            throw new Error('Failed to save variables');
        }
    } catch (error) {
        showMessage('Error saving variables: ' + error.message, 'error');
    }
}

// Update switchTab to handle variables tab
const originalSwitchTab = switchTab;
switchTab = function(tabName) {
    originalSwitchTab(tabName);
    if (tabName === 'variables') {
        updateVariablesList();
    }
};

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('serverModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Function to fetch value from .env and populate input
async function fetchFromEnv(varName) {
    try {
        const response = await fetch('/api/env-variables');
        const data = await response.json();
        
        if (data.exists && data.variables[varName]) {
            // Find the input field and set its value
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

// Make functions globally available
window.fetchFromEnv = fetchFromEnv;
window.uninstallServer = uninstallServer;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    init();
});