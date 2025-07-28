// Utility functions
import { currentConfig, preConfiguredServers } from './state.js';

// Cache for server installation lookups to optimize search performance
let installedServersCache = null;
let lastConfigVersion = null;

export function showMessage(text, type) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.className = `message ${type}`;
    message.style.display = 'block';
    
    setTimeout(() => {
        message.style.display = 'none';
    }, 5000);
}

export function closeModal() {
    document.getElementById('serverModal').style.display = 'none';
}

export function findCardElement(serverKey) {
    const cards = document.querySelectorAll('.server-card');
    for (const card of cards) {
        const h3 = card.querySelector('h3');
        if (h3) {
            const server = preConfiguredServers[serverKey];
            if (server && h3.textContent.trim() === server.name) {
                return card;
            }
        }
    }
    return null;
}

// Helper function to generate a version hash for config changes
function getConfigVersion(config) {
    if (!config || !config.mcpServers) return '';
    return JSON.stringify(Object.keys(config.mcpServers).sort());
}

// Build optimized lookup cache for installed servers
function buildInstalledServersCache() {
    if (!currentConfig || !currentConfig.mcpServers) {
        return { byKey: new Map(), byCommand: new Map(), byNormalizedCommand: new Map() };
    }

    const byKey = new Map();
    const byCommand = new Map();
    const byNormalizedCommand = new Map();
    const normalizeCommand = (cmd) => cmd ? cmd.trim().replace(/\s+/g, ' ') : '';

    Object.entries(currentConfig.mcpServers).forEach(([name, config]) => {
        // Cache by exact key name
        byKey.set(name, name);
        
        // Cache by full command
        const installedCommand = config.command + " " + config.args.join(" ");
        byCommand.set(installedCommand, name);
        
        // Cache by normalized command
        const normalizedCommand = normalizeCommand(installedCommand);
        byNormalizedCommand.set(normalizedCommand, name);
    });

    return { byKey, byCommand, byNormalizedCommand };
}

export function isServerInstalled(key, server) {
    if (!currentConfig || !currentConfig.mcpServers) {
        return false;
    }

    // Check if cache needs to be rebuilt
    const currentConfigVersion = getConfigVersion(currentConfig);
    if (installedServersCache === null || lastConfigVersion !== currentConfigVersion) {
        installedServersCache = buildInstalledServersCache();
        lastConfigVersion = currentConfigVersion;
    }

    // Fast lookup using cached maps
    // 1. Check by exact key
    if (installedServersCache.byKey.has(key)) {
        return true;
    }

    // 2. Check by full command
    if (installedServersCache.byCommand.has(server.installCommand)) {
        return true;
    }

    // 3. Check by normalized command
    const normalizeCommand = (cmd) => cmd ? cmd.trim().replace(/\s+/g, ' ') : '';
    const normalizedCommand = normalizeCommand(server.installCommand);
    if (installedServersCache.byNormalizedCommand.has(normalizedCommand)) {
        return true;
    }

    return false;
}

export function findExistingServerName(key, server) {
    if (!currentConfig || !currentConfig.mcpServers) {
        return key;
    }

    // Check if cache needs to be rebuilt
    const currentConfigVersion = getConfigVersion(currentConfig);
    if (installedServersCache === null || lastConfigVersion !== currentConfigVersion) {
        installedServersCache = buildInstalledServersCache();
        lastConfigVersion = currentConfigVersion;
    }

    // 1. Check by exact key first
    if (installedServersCache.byKey.has(key)) {
        return key;
    }

    // 2. Check by full command
    if (installedServersCache.byCommand.has(server.installCommand)) {
        return installedServersCache.byCommand.get(server.installCommand);
    }

    // 3. Check by normalized command
    const normalizeCommand = (cmd) => cmd ? cmd.trim().replace(/\s+/g, ' ') : '';
    const normalizedCommand = normalizeCommand(server.installCommand);
    if (installedServersCache.byNormalizedCommand.has(normalizedCommand)) {
        return installedServersCache.byNormalizedCommand.get(normalizedCommand);
    }

    return key;
}

// Function to invalidate cache when config changes
export function invalidateInstalledServersCache() {
    installedServersCache = null;
    lastConfigVersion = null;
}

export function switchTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}