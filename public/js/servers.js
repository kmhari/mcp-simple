// Server management functions
import { 
    currentConfig, 
    setCurrentConfig, 
    preConfiguredServers, 
    setPreConfiguredServers,
    starsData,
    setStarsData
} from './state.js';
import { showMessage, closeModal, findCardElement, isServerInstalled, findExistingServerName, invalidateInstalledServersCache } from './utils.js';
// UI functions will be called via window object to avoid circular deps

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

export async function loadServers() {
    try {
        const response = await fetch('/api/servers');
        const servers = await response.json();
        setPreConfiguredServers(servers);
        
        // Build search index after servers are loaded (disabled for optimized UI)
        // if (window.searchIndex) {
        //     window.searchIndex.buildIndex(servers);
        // }
        
        // Only call displayServers if not using optimized UI
        if (window.displayServers && !window.USE_OPTIMIZED_UI) {
            window.displayServers();
        }
    } catch (error) {
        showMessage('Failed to load servers', 'error');
        console.error('Error loading servers:', error);
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
            if (window.displayServers && !window.USE_OPTIMIZED_UI) window.displayServers();
        }
    } catch (error) {
        console.log('Stars data not available:', error.message);
        setStarsData({});
    }
}

export async function quickInstallServer(key) {
    const server = preConfiguredServers[key];
    
    // Store the original state for potential rollback
    const originalConfig = { ...currentConfig };
    
    try {
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
            const parsed = parseGitHubUrl(server.githubLink);
            if (!parsed) {
                throw new Error('Invalid GitHub URL format');
            }
            
            const { owner, repo } = parsed;
            const folderName = `${owner}-${repo}`;
            
            const serverConfig = {
                command: 'bash',
                args: ['-c', `cd .mcp/${folderName} && ${server.installCommand}`]
            };
            
            if (server.optionalParams && server.optionalParams.length > 0) {
                serverConfig.env = {};
            }
            
            const config = { ...currentConfig };
            config.mcpServers[key] = serverConfig;
            setCurrentConfig(config);
            invalidateInstalledServersCache(); // Invalidate cache when server is installed
            
            // Update UI immediately
            if (window.updateCurrentServers) window.updateCurrentServers();
            document.getElementById('configEditor').value = JSON.stringify(config, null, 2);
            if (window.displayServers && !window.USE_OPTIMIZED_UI) window.displayServers();
            
            // Send request to backend
            const configResponse = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            
            if (!configResponse.ok) {
                throw new Error('Failed to save configuration');
            }
            
            showMessage(`Successfully installed ${server.name}`, 'success');
            
        } else {
            // Regular installation flow (non-"self" installType)
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
            invalidateInstalledServersCache(); // Invalidate cache when server is installed
            
            // Update UI immediately
            if (window.updateCurrentServers) window.updateCurrentServers();
            document.getElementById('configEditor').value = JSON.stringify(config, null, 2);
            if (window.displayServers && !window.USE_OPTIMIZED_UI) window.displayServers();
            
            // Send request to backend
            const response = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            
            if (!response.ok) {
                throw new Error('Failed to save configuration');
            }
            
            showMessage(`Successfully installed ${server.name}`, 'success');
        }
        
    } catch (error) {
        // Rollback the optimistic update
        setCurrentConfig(originalConfig);
        invalidateInstalledServersCache(); // Invalidate cache when rolling back
        if (window.updateCurrentServers) window.updateCurrentServers();
        document.getElementById('configEditor').value = JSON.stringify(originalConfig, null, 2);
        if (window.displayServers && !window.USE_OPTIMIZED_UI) window.displayServers();
        
        showMessage(`Failed to install ${server.name}: ${error.message}`, 'error');
    }
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
        invalidateInstalledServersCache(); // Invalidate cache when server is uninstalled
        
        // Update UI immediately
        if (window.updateCurrentServers) window.updateCurrentServers();
        document.getElementById('configEditor').value = JSON.stringify(config, null, 2);
        if (window.displayServers && !window.USE_OPTIMIZED_UI) window.displayServers();
        
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
            invalidateInstalledServersCache(); // Invalidate cache when rolling back
            if (window.updateCurrentServers) window.updateCurrentServers();
            document.getElementById('configEditor').value = JSON.stringify(originalConfig, null, 2);
            if (window.displayServers && !window.USE_OPTIMIZED_UI) window.displayServers();
            
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
        invalidateInstalledServersCache(); // Invalidate cache when server is removed
        
        // Update UI immediately
        if (window.updateCurrentServers) window.updateCurrentServers();
        document.getElementById('configEditor').value = JSON.stringify(config, null, 2);
        if (window.displayServers && !window.USE_OPTIMIZED_UI) window.displayServers();
        
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
            invalidateInstalledServersCache(); // Invalidate cache when rolling back
            if (window.updateCurrentServers) window.updateCurrentServers();
            document.getElementById('configEditor').value = JSON.stringify(originalConfig, null, 2);
            if (window.displayServers && !window.USE_OPTIMIZED_UI) window.displayServers();
            
            showMessage(`Failed to remove ${name}: ${error.message}`, 'error');
        });
    }
}