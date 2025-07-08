#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);

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