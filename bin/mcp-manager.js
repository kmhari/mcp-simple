#!/usr/bin/env node

const path = require('path');
const MCPManager = require(path.join(__dirname, '..', 'mcp-manager.js'));

const manager = new MCPManager();

// Check for --web argument
const args = process.argv.slice(2);
if (args.includes('--web')) {
    manager.startWebServer();
} else {
    manager.run().catch(error => {
        console.error('Error:', error);
        process.exit(1);
    });
}