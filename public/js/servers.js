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
        // Load stars data directly from the database
        const response = await fetch('/api/servers');
        const data = await response.json();
        
        // Transform database format to expected stars data format
        const starsDataFormatted = {};
        Object.entries(data).forEach(([key, server]) => {
            if (server.stars !== undefined || server.lastStarUpdate) {
                starsDataFormatted[key] = {
                    github: {
                        stars: server.stars || 0,
                        fetched_at: server.lastStarUpdate || server.updated_at,
                        updated_at: server.updated_at
                    }
                };
            }
        });
        
        setStarsData(starsDataFormatted);
        console.log('Stars data loaded from database:', Object.keys(starsDataFormatted).length, 'servers with stars');
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
    
    // Store the original state for potential rollback
    const originalConfig = { ...currentConfig };
    
    // Optimistically update the UI immediately
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
    
    // Update UI immediately
    if (window.updateCurrentServers) window.updateCurrentServers();
    document.getElementById('configEditor').value = JSON.stringify(config, null, 2);
    if (window.displayServers) window.displayServers();
    
    // Send request to backend
    fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to save configuration');
        }
        // Success - no additional UI updates needed since we already updated optimistically
    }).catch(error => {
        // Rollback the optimistic update
        setCurrentConfig(originalConfig);
        if (window.updateCurrentServers) window.updateCurrentServers();
        document.getElementById('configEditor').value = JSON.stringify(originalConfig, null, 2);
        if (window.displayServers) window.displayServers();
        
        showMessage(`Failed to install ${server.name}: ${error.message}`, 'error');
    });
}

export function uninstallServer(key, silent = false) {
    const server = preConfiguredServers[key];
    if (silent || confirm(`Are you sure you want to uninstall ${server.name}?`)) {
        // Store the original state for potential rollback
        const originalConfig = { ...currentConfig };
        
        // Optimistically update the UI immediately
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
        
        // Update UI immediately
        if (window.updateCurrentServers) window.updateCurrentServers();
        document.getElementById('configEditor').value = JSON.stringify(config, null, 2);
        if (window.displayServers) window.displayServers();
        
        // Send request to backend
        fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to save configuration');
            }
            // Success - no additional UI updates needed since we already updated optimistically
        }).catch(error => {
            // Rollback the optimistic update
            setCurrentConfig(originalConfig);
            if (window.updateCurrentServers) window.updateCurrentServers();
            document.getElementById('configEditor').value = JSON.stringify(originalConfig, null, 2);
            if (window.displayServers) window.displayServers();
            
            showMessage(`Failed to uninstall ${server.name}: ${error.message}`, 'error');
        });
    }
}

export function removeServer(name) {
    if (confirm(`Are you sure you want to remove "${name}"?`)) {
        // Store the original state for potential rollback
        const originalConfig = { ...currentConfig };
        
        // Optimistically update the UI immediately
        const config = { ...currentConfig };
        delete config.mcpServers[name];
        setCurrentConfig(config);
        
        // Update UI immediately
        if (window.updateCurrentServers) window.updateCurrentServers();
        document.getElementById('configEditor').value = JSON.stringify(config, null, 2);
        if (window.displayServers) window.displayServers();
        
        // Send request to backend
        fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to save configuration');
            }
            // Success - no additional UI updates needed since we already updated optimistically
        }).catch(error => {
            // Rollback the optimistic update
            setCurrentConfig(originalConfig);
            if (window.updateCurrentServers) window.updateCurrentServers();
            document.getElementById('configEditor').value = JSON.stringify(originalConfig, null, 2);
            if (window.displayServers) window.displayServers();
            
            showMessage(`Failed to remove ${name}: ${error.message}`, 'error');
        });
    }
}