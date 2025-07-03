// Configuration management
import { currentConfig, setCurrentConfig, preConfiguredServers } from './state.js';
import { showMessage } from './utils.js';
// UI functions will be called via window object to avoid circular deps

export async function loadConfig() {
    try {
        const response = await fetch('/api/config');
        const config = await response.json();
        setCurrentConfig(config);
        console.log('Loaded config:', config);
        document.getElementById('configEditor').value = JSON.stringify(config, null, 2);
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
        
        const response = await fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        });
        
        if (response.ok) {
            setCurrentConfig(config);
            console.log('Saved config:', config);
            showMessage('Configuration saved successfully', 'success');
            if (window.updateCurrentServers) window.updateCurrentServers();
            if (window.displayServers) window.displayServers();
        } else {
            throw new Error('Failed to save configuration');
        }
    } catch (error) {
        showMessage(error.message, 'error');
    }
}