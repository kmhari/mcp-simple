// Utility functions
import { currentConfig, preConfiguredServers } from './state.js';

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

export function isServerInstalled(key, server) {
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

        if (name === key) {
            console.log("  ✓ Exact key match found!");
            return true;
        }

        const installedCommand = config.command + " " + config.args.join(" ");
        console.log("  Reconstructed command: " + installedCommand);
        console.log("  Expected command: " + server.installCommand);
        
        if (installedCommand === server.installCommand) {
            console.log("  ✓ Full command match found!");
            return true;
        }

        const normalizeCommand = (cmd) => cmd.trim().replace(/\s+/g, ' ');
        if (normalizeCommand(installedCommand) === normalizeCommand(server.installCommand)) {
            console.log("  ✓ Normalized command match found!");
            return true;
        }

        console.log("  ✗ No match");
        return false;
    });
}

export function findExistingServerName(key, server) {
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
}

export function switchTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}