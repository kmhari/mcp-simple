#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);

// Handle --version flag
if (args.includes('--version') || args.includes('-v')) {
    try {
        const packagePath = path.join(__dirname, 'package.json');
        const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        console.log(`${packageData.name} v${packageData.version}`);
        process.exit(0);
    } catch (error) {
        console.log('Version information not available');
        process.exit(1);
    }
}

if (args.includes('--server')) {
    // Launch MCP server mode
    console.error('🚀 Starting Tech Stack & MCP Recommender Server...');
    const serverProcess = spawn('node', [path.join(__dirname, 'mcp-server.js')], {
        stdio: ['inherit', 'inherit', 'inherit']
    });
    
    serverProcess.on('close', (code) => {
        process.exit(code);
    });
    
    serverProcess.on('error', (error) => {
        console.error('Failed to start MCP server:', error);
        process.exit(1);
    });
} else {
    // Launch regular CLI mode  
    const cliProcess = spawn('node', [path.join(__dirname, 'mcp-manager.cjs'), ...args], {
        stdio: 'inherit'
    });
    
    cliProcess.on('close', (code) => {
        process.exit(code);
    });
    
    cliProcess.on('error', (error) => {
        console.error('Failed to start CLI:', error);
        process.exit(1);
    });
}