// Server management functions
import { 
    currentConfig, 
    setCurrentConfig, 
    preConfiguredServers, 
    setPreConfiguredServers,
    starsData,
    setStarsData
} from './state.js';
import { showMessage, closeModal, findCardElement, isServerInstalled, findExistingServerName } from './utils.js';
// UI functions will be called via window object to avoid circular deps

export async function loadServers() {
    try {
        const response = await fetch('/api/servers');
        const servers = await response.json();
        setPreConfiguredServers(servers);
        if (window.displayServers) window.displayServers();
    } catch (error) {
        showMessage('Failed to load servers', 'error');
    }
}

export async function loadStarsData() {
    try {
        const response = await fetch('/mcp-servers-with-stars.json');
        const data = await response.json();
        setStarsData(data);
        console.log('Stars data loaded:', Object.keys(data).length, 'servers');
        if (Object.keys(preConfiguredServers).length > 0) {
            if (window.displayServers) window.displayServers();
        }
    } catch (error) {
        console.log('Stars data not available:', error.message);
        setStarsData({});
    }
}

export function quickInstallServer(key) {
    const server = preConfiguredServers[key];
    
    const cardElement = findCardElement(key);
    if (cardElement) {
        cardElement.classList.add('installing');
        const statusIndicator = cardElement.querySelector('.status-indicator');
        if (statusIndicator) {
            statusIndicator.classList.add('installing');
        }
    }
    
    const installParts = server.installCommand.split(' ');
    const command = installParts[0];
    const args = installParts.slice(1);
    
    const serverConfig = {
        command,
        args: [...args]
    };
    
    if (server.optionalParams && server.optionalParams.length > 0) {
        serverConfig.env = {};
    }
    
    const config = { ...currentConfig };
    config.mcpServers[key] = serverConfig;
    setCurrentConfig(config);
    
    fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
    }).then(response => {
        if (response.ok) {
            setTimeout(() => {
                if (window.updateCurrentServers) window.updateCurrentServers();
                document.getElementById('configEditor').value = JSON.stringify(config, null, 2);
                if (window.displayServers) window.displayServers();
            }, 300);
        } else {
            throw new Error('Failed to save configuration');
        }
    }).catch(error => {
        showMessage(error.message, 'error');
        if (cardElement) {
            cardElement.classList.remove('installing');
            const statusIndicator = cardElement.querySelector('.status-indicator');
            if (statusIndicator) {
                statusIndicator.classList.remove('installing');
            }
        }
    });
}

export function uninstallServer(key, silent = false) {
    const server = preConfiguredServers[key];
    if (silent || confirm(`Are you sure you want to uninstall ${server.name}?`)) {
        const cardElement = findCardElement(key);
        if (cardElement) {
            cardElement.classList.add('uninstalling');
            const statusIndicator = cardElement.querySelector('.status-indicator');
            if (statusIndicator) {
                statusIndicator.classList.add('uninstalling');
            }
        }
        
        const config = { ...currentConfig };
        if (config.mcpServers[key]) {
            delete config.mcpServers[key];
        } else {
            Object.entries(config.mcpServers).forEach(([name, serverConfig]) => {
                const installedCommand = serverConfig.command + " " + serverConfig.args.join(" ");
                if (installedCommand === server.installCommand) {
                    delete config.mcpServers[name];
                }
            });
        }
        
        setCurrentConfig(config);
        
        fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        }).then(response => {
            if (response.ok) {
                setTimeout(() => {
                    if (window.updateCurrentServers) window.updateCurrentServers();
                    document.getElementById('configEditor').value = JSON.stringify(config, null, 2);
                    if (window.displayServers) window.displayServers();
                }, 300);
            } else {
                throw new Error('Failed to save configuration');
            }
        }).catch(error => {
            showMessage(error.message, 'error');
            if (cardElement) {
                cardElement.classList.remove('uninstalling');
                const statusIndicator = cardElement.querySelector('.status-indicator');
                if (statusIndicator) {
                    statusIndicator.classList.remove('uninstalling');
                }
            }
        });
    }
}

export function removeServer(name) {
    if (confirm(`Are you sure you want to remove "${name}"?`)) {
        const config = { ...currentConfig };
        delete config.mcpServers[name];
        setCurrentConfig(config);
        
        fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        }).then(response => {
            if (response.ok) {
                if (window.updateCurrentServers) window.updateCurrentServers();
                document.getElementById('configEditor').value = JSON.stringify(config, null, 2);
                if (window.displayServers) window.displayServers();
            } else {
                throw new Error('Failed to save configuration');
            }
        }).catch(error => {
            showMessage(error.message, 'error');
        });
    }
}