// Configuration management
import { currentConfig, setCurrentConfig, preConfiguredServers } from './state.js';
import { showMessage, invalidateInstalledServersCache } from './utils.js';
// UI functions will be called via window object to avoid circular deps

export async function loadConfig() {
    try {
        // Check if we should use global config
        const useGlobal = window.useGlobalConfig || false;
        const url = useGlobal ? '/api/config?global=true' : '/api/config';
        
        const response = await fetch(url);
        const config = await response.json();
        setCurrentConfig(config);
        invalidateInstalledServersCache(); // Invalidate cache when config changes
        console.log(`Loaded ${useGlobal ? 'global' : 'local'} config:`, config);
        
        const configEditor = document.getElementById('configEditor');
        if (configEditor) {
            configEditor.value = JSON.stringify(config, null, 2);
        }
        
        if (window.updateCurrentServers) window.updateCurrentServers();
        if (window.displayServers && Object.keys(preConfiguredServers).length > 0) {
            window.displayServers();
        }
    } catch (error) {
        console.error('Error loading config:', error);
        showMessage('Failed to load configuration', 'error');
    }
}

export async function saveConfig() {
    try {
        const configText = document.getElementById('configEditor').value;
        const config = JSON.parse(configText);
        
        // Check if we should save to global config
        const useGlobal = window.useGlobalConfig || false;
        const url = useGlobal ? '/api/config?global=true' : '/api/config';
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        });
        
        if (response.ok) {
            setCurrentConfig(config);
            invalidateInstalledServersCache(); // Invalidate cache when config changes
            console.log(`Saved ${useGlobal ? 'global' : 'local'} config:`, config);
            showMessage(`Configuration saved to ${useGlobal ? 'global' : 'local'} file`, 'success');
            if (window.updateCurrentServers) window.updateCurrentServers();
            if (window.displayServers) window.displayServers();
        } else {
            throw new Error('Failed to save configuration');
        }
    } catch (error) {
        showMessage(error.message, 'error');
    }
}