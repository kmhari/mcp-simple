#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const os = require('os');
const http = require('http');
const { execSync } = require('child_process');

class MCPManager {
    constructor() {
        this.configPath = path.join(process.cwd(), '.mcp.json');
        this.locationsFile = path.join(os.homedir(), '.config', 'mcpsimple', 'locations');
        this.databasePath = path.join(__dirname, 'mcp-servers-database.json');
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: true
        });
        
        this.preConfiguredServers = this.loadMCPDatabase();
    }

    loadMCPDatabase() {
        try {
            if (fs.existsSync(this.databasePath)) {
                const content = fs.readFileSync(this.databasePath, 'utf8');
                return JSON.parse(content);
            }
        } catch (error) {
            console.log('Warning: Could not load MCP servers database:', error.message);
        }
        
        return {};
    }

    ensureConfigDir() {
        const configDir = path.dirname(this.locationsFile);
        try {
            fs.mkdirSync(configDir, { recursive: true });
        } catch (error) {
            // Directory might already exist, ignore
        }
    }

    registerLocation(configPath) {
        this.ensureConfigDir();
        
        try {
            let locations = [];
            if (fs.existsSync(this.locationsFile)) {
                const content = fs.readFileSync(this.locationsFile, 'utf8').trim();
                if (content) {
                    locations = content.split('\n').filter(loc => loc.trim());
                }
            }
            
            const absolutePath = path.resolve(configPath);
            if (!locations.includes(absolutePath)) {
                locations.push(absolutePath);
                fs.writeFileSync(this.locationsFile, locations.join('\n') + '\n');
            }
        } catch (error) {
            console.log('Warning: Could not register location:', error.message);
        }
    }

    loadConfig() {
        try {
            if (fs.existsSync(this.configPath)) {
                this.registerLocation(this.configPath);
                const content = fs.readFileSync(this.configPath, 'utf8');
                return JSON.parse(content);
            }
        } catch (error) {
            console.log('Error reading config file:', error.message);
        }
        
        return {
            mcpServers: {}
        };
    }

    saveConfig(config) {
        try {
            fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
            this.registerLocation(this.configPath);
            console.log('✅ Configuration saved successfully!');
        } catch (error) {
            console.log('❌ Error saving config:', error.message);
        }
    }

    async prompt(question) {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                if (answer.toLowerCase() === 'q') {
                    console.log('\n👋 Goodbye!');
                    this.rl.close();
                    process.exit(0);
                }
                resolve(answer);
            });
        });
    }

    async showMainMenu() {
        console.log('\n🔧 MCP Server Manager');
        console.log('=====================');
        console.log('1. Add pre-configured server');
        console.log('2. Add custom server');
        console.log('3. List current servers');
        console.log('4. Remove server');
        console.log('5. View configuration file');
        console.log('6. Search MCP servers');
        console.log('7. Exit');
        console.log('\nPress q to quit at any time');
        
        const choice = await this.prompt('\nSelect an option (1-7 or q): ');
        return choice.trim();
    }

    async addPreConfiguredServer() {
        console.log('\n📦 Available Pre-configured Servers:');
        console.log('====================================');
        
        const servers = Object.keys(this.preConfiguredServers);
        const categories = [...new Set(servers.map(key => this.preConfiguredServers[key].category || 'Other'))];
        
        // Display servers by category
        let serverList = [];
        categories.sort().forEach(category => {
            console.log(`\n${category}:`);
            servers.forEach(key => {
                const server = this.preConfiguredServers[key];
                if ((server.category || 'Other') === category) {
                    serverList.push({ key, server });
                    console.log(`${serverList.length}. ${server.name} - ${server.description}`);
                }
            });
        });
        
        const choice = await this.prompt(`\nSelect server (1-${serverList.length}), 0 to cancel, or q to quit: `);
        const serverIndex = parseInt(choice) - 1;
        
        if (choice === '0') {
            return;
        }
        
        if (serverIndex < 0 || serverIndex >= serverList.length) {
            console.log('❌ Invalid selection');
            return;
        }
        
        const { key: serverKey, server } = serverList[serverIndex];
        const config = this.loadConfig();
        
        // Parse the install command to get command and args
        const installParts = server.installCommand.split(' ');
        const command = installParts[0];
        const args = installParts.slice(1);
        
        let serverConfig = {
            command,
            args: [...args],
            env: {}
        };
        
        // Handle required environment variables
        if (server.requiredEnvVars && server.requiredEnvVars.length > 0) {
            console.log(`\n⚙️  This server requires the following configuration:`);
            for (const envVar of server.requiredEnvVars) {
                const value = await this.prompt(`${envVar}: `);
                if (value) {
                    serverConfig.env[envVar] = value;
                }
            }
        }
        
        // Handle optional parameters
        if (server.optionalParams && server.optionalParams.length > 0) {
            console.log(`\n📝 Optional parameters (press Enter to skip):`);
            for (const param of server.optionalParams) {
                const value = await this.prompt(`${param}: `);
                if (value) {
                    serverConfig.env[param] = value;
                }
            }
        }
        
        const serverName = await this.prompt(`\nServer name (default: ${serverKey}): `) || serverKey;
        
        config.mcpServers[serverName] = serverConfig;
        this.saveConfig(config);
        console.log(`\n✅ Added ${server.name} server successfully!`);
        if (server.usageInstructions) {
            console.log(`\n💡 Usage: ${server.usageInstructions}`);
        }
    }

    async addCustomServer() {
        console.log('\n➕ Add Custom Server');
        console.log('====================');
        
        const name = await this.prompt('Server name (or q to quit): ');
        const command = await this.prompt('Command: ');
        const argsInput = await this.prompt('Arguments (comma-separated): ');
        const envInput = await this.prompt('Environment variables (key=value, comma-separated): ');
        
        const args = argsInput.split(',').map(arg => arg.trim()).filter(arg => arg);
        const env = {};
        
        if (envInput.trim()) {
            envInput.split(',').forEach(pair => {
                const [key, value] = pair.split('=').map(s => s.trim());
                if (key && value) {
                    env[key] = value;
                }
            });
        }
        
        const config = this.loadConfig();
        config.mcpServers[name] = {
            command,
            args,
            ...(Object.keys(env).length > 0 && { env })
        };
        
        this.saveConfig(config);
        console.log(`✅ Added custom server "${name}" successfully!`);
    }

    listServers() {
        const config = this.loadConfig();
        const servers = Object.keys(config.mcpServers);
        
        console.log('\n📋 Current MCP Servers:');
        console.log('=======================');
        
        if (servers.length === 0) {
            console.log('No servers configured.');
            return;
        }
        
        servers.forEach((name, index) => {
            const server = config.mcpServers[name];
            console.log(`${index + 1}. ${name}`);
            console.log(`   Command: ${server.command}`);
            console.log(`   Args: ${server.args.join(' ')}`);
            if (server.env && Object.keys(server.env).length > 0) {
                console.log(`   Env: ${JSON.stringify(server.env)}`);
            }
            console.log('');
        });
    }

    async removeServer() {
        const config = this.loadConfig();
        const servers = Object.keys(config.mcpServers);
        
        if (servers.length === 0) {
            console.log('❌ No servers to remove.');
            return;
        }
        
        console.log('\n🗑️  Remove Server:');
        console.log('==================');
        
        servers.forEach((name, index) => {
            console.log(`${index + 1}. ${name}`);
        });
        
        const choice = await this.prompt(`\nSelect server to remove (1-${servers.length}) or q to quit: `);
        const serverIndex = parseInt(choice) - 1;
        
        if (serverIndex < 0 || serverIndex >= servers.length) {
            console.log('❌ Invalid selection');
            return;
        }
        
        const serverName = servers[serverIndex];
        delete config.mcpServers[serverName];
        
        this.saveConfig(config);
        console.log(`✅ Removed server "${serverName}" successfully!`);
    }

    viewConfig() {
        console.log('\n📄 Current Configuration:');
        console.log('=========================');
        
        const config = this.loadConfig();
        console.log(JSON.stringify(config, null, 2));
    }

    searchServers(query) {
        const servers = Object.keys(this.preConfiguredServers);
        const results = [];
        const searchTerm = query.toLowerCase();
        
        servers.forEach(key => {
            const server = this.preConfiguredServers[key];
            if ((server.name && server.name.toLowerCase().includes(searchTerm)) ||
                (server.description && server.description.toLowerCase().includes(searchTerm)) ||
                (server.package && server.package.toLowerCase().includes(searchTerm)) ||
                (server.category && server.category.toLowerCase().includes(searchTerm))) {
                results.push({ key, server });
            }
        });
        
        return results;
    }
    
    async searchMCPServers() {
        console.log('\n🔍 Search MCP Servers:');
        console.log('======================');
        
        const query = await this.prompt('Search term (or q to quit): ');
        const results = this.searchServers(query);
        
        if (results.length === 0) {
            console.log('\nNo servers found matching your search.');
        } else {
            console.log(`\nFound ${results.length} servers:`);
            results.forEach(({ key, server }, index) => {
                console.log(`\n${index + 1}. ${server.name}`);
                console.log(`   Key: ${key}`);
                console.log(`   Package: ${server.package}`);
                console.log(`   Description: ${server.description}`);
                console.log(`   Category: ${server.category || 'Other'}`);
            });
        }
        
        await this.prompt('\nPress Enter to return to main menu (or q to quit)...');
    }

    async run() {
        console.log('Welcome to MCP Server Manager! 🚀');
        console.log(''); // Add empty line for better formatting
        
        while (true) {
            try {
                const choice = await this.showMainMenu();
                
                switch (choice) {
                    case '1':
                        await this.addPreConfiguredServer();
                        break;
                    case '2':
                        await this.addCustomServer();
                        break;
                    case '3':
                        this.listServers();
                        break;
                    case '4':
                        await this.removeServer();
                        break;
                    case '5':
                        this.viewConfig();
                        break;
                    case '6':
                        await this.searchMCPServers();
                        break;
                    case '7':
                    case 'q':
                    case 'Q':
                        console.log('👋 Goodbye!');
                        this.rl.close();
                        return;
                    default:
                        console.log('❌ Invalid option. Please try again.');
                }
            } catch (error) {
                console.log('❌ Error:', error.message);
            }
        }
    }

    startWebServer() {
        const PORT = process.env.PORT || 3333;
        
        const server = http.createServer((req, res) => {
            // Handle API endpoints
            if (req.url === '/api/config' && req.method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify(this.loadConfig()));
            } else if (req.url === '/api/config' && req.method === 'POST') {
                let body = '';
                req.on('data', chunk => body += chunk);
                req.on('end', () => {
                    try {
                        const config = JSON.parse(body);
                        this.saveConfig(config);
                        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                        res.end(JSON.stringify({ success: true }));
                    } catch (error) {
                        res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                        res.end(JSON.stringify({ error: error.message }));
                    }
                });
            } else if (req.url === '/api/servers' && req.method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify(this.preConfiguredServers));
            } else if (req.url === '/' || req.url === '/index.html') {
                // Serve the HTML interface
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(this.getWebInterface());
            } else if (req.method === 'OPTIONS') {
                // Handle CORS preflight
                res.writeHead(200, {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                });
                res.end();
            } else {
                res.writeHead(404);
                res.end('Not Found');
            }
        });

        server.listen(PORT, () => {
            console.log(`🌐 MCP Manager Web Interface running at http://localhost:${PORT}`);
            console.log('Press Ctrl+C to stop the server\n');
            
            // Try to open the browser
            const url = `http://localhost:${PORT}`;
            try {
                if (process.platform === 'darwin') {
                    execSync(`open ${url}`);
                } else if (process.platform === 'win32') {
                    execSync(`start ${url}`);
                } else {
                    execSync(`xdg-open ${url}`);
                }
            } catch (error) {
                console.log(`Please open your browser and navigate to ${url}`);
            }
        });
    }

    getWebInterface() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MCP Server Manager</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f5f5f5;
            color: #333;
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        h1 {
            color: #2c3e50;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .tabs {
            display: flex;
            margin-bottom: 30px;
            border-bottom: 2px solid #e0e0e0;
        }
        
        .tab {
            padding: 10px 20px;
            cursor: pointer;
            background: none;
            border: none;
            font-size: 16px;
            color: #666;
            transition: all 0.3s;
        }
        
        .tab:hover {
            color: #2c3e50;
        }
        
        .tab.active {
            color: #3498db;
            border-bottom: 2px solid #3498db;
            margin-bottom: -2px;
        }
        
        .tab-content {
            display: none;
        }
        
        .tab-content.active {
            display: block;
        }
        
        .server-grid {
            margin-bottom: 30px;
        }
        
        .category-section {
            margin-bottom: 40px;
        }
        
        .category-title {
            color: #2c3e50;
            font-size: 24px;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #3498db;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .category-title::before {
            content: '';
            width: 6px;
            height: 24px;
            background: #3498db;
            border-radius: 3px;
        }
        
        .category-count {
            font-size: 18px;
            color: #7f8c8d;
            font-weight: normal;
            margin-left: 10px;
        }
        
        /* Category-specific colors */
        .category-section[data-category="AI & Machine Learning"] .category-title::before,
        .category-section[data-category="AI & Machine Learning"] .category-title {
            border-color: #9b59b6;
        }
        .category-section[data-category="AI & Machine Learning"] .category-title::before {
            background: #9b59b6;
        }
        
        .category-section[data-category="Cloud Services"] .category-title::before,
        .category-section[data-category="Cloud Services"] .category-title {
            border-color: #3498db;
        }
        .category-section[data-category="Cloud Services"] .category-title::before {
            background: #3498db;
        }
        
        .category-section[data-category="Communication"] .category-title::before,
        .category-section[data-category="Communication"] .category-title {
            border-color: #e74c3c;
        }
        .category-section[data-category="Communication"] .category-title::before {
            background: #e74c3c;
        }
        
        .category-section[data-category="Data & Analytics"] .category-title::before,
        .category-section[data-category="Data & Analytics"] .category-title {
            border-color: #f39c12;
        }
        .category-section[data-category="Data & Analytics"] .category-title::before {
            background: #f39c12;
        }
        
        .category-section[data-category="Databases"] .category-title::before,
        .category-section[data-category="Databases"] .category-title {
            border-color: #27ae60;
        }
        .category-section[data-category="Databases"] .category-title::before {
            background: #27ae60;
        }
        
        .category-section[data-category="Development Tools"] .category-title::before,
        .category-section[data-category="Development Tools"] .category-title {
            border-color: #2c3e50;
        }
        .category-section[data-category="Development Tools"] .category-title::before {
            background: #2c3e50;
        }
        
        .category-section[data-category="File Systems"] .category-title::before,
        .category-section[data-category="File Systems"] .category-title {
            border-color: #16a085;
        }
        .category-section[data-category="File Systems"] .category-title::before {
            background: #16a085;
        }
        
        .category-section[data-category="Knowledge & Research"] .category-title::before,
        .category-section[data-category="Knowledge & Research"] .category-title {
            border-color: #8e44ad;
        }
        .category-section[data-category="Knowledge & Research"] .category-title::before {
            background: #8e44ad;
        }
        
        .category-section[data-category="Productivity"] .category-title::before,
        .category-section[data-category="Productivity"] .category-title {
            border-color: #e67e22;
        }
        .category-section[data-category="Productivity"] .category-title::before {
            background: #e67e22;
        }
        
        .category-section[data-category="Utilities"] .category-title::before,
        .category-section[data-category="Utilities"] .category-title {
            border-color: #95a5a6;
        }
        .category-section[data-category="Utilities"] .category-title::before {
            background: #95a5a6;
        }
        
        .category-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .server-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .server-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .server-card h3 {
            color: #2c3e50;
            margin-bottom: 10px;
        }
        
        
        .server-card .description {
            color: #666;
            font-size: 14px;
            margin-bottom: 15px;
        }
        
        .server-card button {
            background: #3498db;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .server-card button:hover {
            background: #2980b9;
        }
        
        .config-editor {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .config-editor h3 {
            margin-bottom: 15px;
            color: #2c3e50;
        }
        
        .config-editor textarea {
            width: 100%;
            min-height: 400px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            resize: vertical;
        }
        
        .button-group {
            margin-top: 15px;
            display: flex;
            gap: 10px;
        }
        
        .button-group button {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.3s;
        }
        
        .btn-primary {
            background: #3498db;
            color: white;
        }
        
        .btn-primary:hover {
            background: #2980b9;
        }
        
        .btn-secondary {
            background: #95a5a6;
            color: white;
        }
        
        .btn-secondary:hover {
            background: #7f8c8d;
        }
        
        .search-box {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
            margin-bottom: 20px;
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
        }
        
        .modal-content {
            background: white;
            width: 90%;
            max-width: 500px;
            margin: 50px auto;
            padding: 30px;
            border-radius: 8px;
            position: relative;
        }
        
        .modal-close {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 24px;
            cursor: pointer;
            color: #999;
        }
        
        .modal-close:hover {
            color: #333;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #555;
            font-weight: 500;
        }
        
        .form-group input {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }
        
        .form-group small {
            color: #888;
            font-size: 12px;
            display: block;
            margin-top: 5px;
        }
        
        .message {
            padding: 12px;
            border-radius: 4px;
            margin-bottom: 20px;
            display: none;
        }
        
        .message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .current-servers {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        
        .server-list {
            list-style: none;
        }
        
        .server-item {
            padding: 15px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .server-item:last-child {
            border-bottom: none;
        }
        
        .server-info h4 {
            color: #2c3e50;
            margin-bottom: 5px;
        }
        
        .server-info .details {
            font-size: 12px;
            color: #666;
            font-family: 'Courier New', monospace;
        }
        
        .btn-remove {
            background: #e74c3c;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .btn-remove:hover {
            background: #c0392b;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔧 MCP Server Manager</h1>
        
        <div id="message" class="message"></div>
        
        <div class="tabs">
            <button class="tab active" onclick="switchTab('browse')">Browse Servers</button>
            <button class="tab" onclick="switchTab('current')">Current Servers</button>
            <button class="tab" onclick="switchTab('custom')">Add Custom</button>
            <button class="tab" onclick="switchTab('config')">Edit Config</button>
        </div>
        
        <div id="browse" class="tab-content active">
            <input type="text" class="search-box" placeholder="Search servers..." onkeyup="searchServers(this.value)">
            <div id="serverGrid" class="server-grid">
                <!-- Server cards will be populated here -->
            </div>
        </div>
        
        <div id="current" class="tab-content">
            <div class="current-servers">
                <h3>Currently Configured Servers</h3>
                <ul id="currentServerList" class="server-list">
                    <!-- Current servers will be populated here -->
                </ul>
            </div>
        </div>
        
        <div id="custom" class="tab-content">
            <div class="config-editor">
                <h3>Add Custom Server</h3>
                <form onsubmit="addCustomServer(event)">
                    <div class="form-group">
                        <label>Server Name</label>
                        <input type="text" id="customName" required>
                    </div>
                    <div class="form-group">
                        <label>Command</label>
                        <input type="text" id="customCommand" required placeholder="e.g., npx">
                    </div>
                    <div class="form-group">
                        <label>Arguments (comma-separated)</label>
                        <input type="text" id="customArgs" placeholder="e.g., -y, @modelcontextprotocol/server-example">
                    </div>
                    <div class="form-group">
                        <label>Environment Variables (key=value, comma-separated)</label>
                        <input type="text" id="customEnv" placeholder="e.g., API_KEY=abc123, DEBUG=true">
                    </div>
                    <div class="button-group">
                        <button type="submit" class="btn-primary">Add Server</button>
                    </div>
                </form>
            </div>
        </div>
        
        <div id="config" class="tab-content">
            <div class="config-editor">
                <h3>Edit Configuration</h3>
                <textarea id="configEditor"></textarea>
                <div class="button-group">
                    <button class="btn-primary" onclick="saveConfig()">Save Configuration</button>
                    <button class="btn-secondary" onclick="loadConfig()">Reload</button>
                </div>
            </div>
        </div>
    </div>
    
    <div id="serverModal" class="modal">
        <div class="modal-content">
            <span class="modal-close" onclick="closeModal()">&times;</span>
            <h3 id="modalTitle"></h3>
            <div id="modalBody"></div>
        </div>
    </div>
    
    <script>
        let currentConfig = { mcpServers: {} };
        let preConfiguredServers = {};
        
        async function init() {
            await loadServers();
            await loadConfig();
            updateCurrentServers();
        }
        
        async function loadServers() {
            try {
                const response = await fetch('/api/servers');
                preConfiguredServers = await response.json();
                displayServers();
            } catch (error) {
                showMessage('Failed to load servers', 'error');
            }
        }
        
        async function loadConfig() {
            try {
                const response = await fetch('/api/config');
                currentConfig = await response.json();
                document.getElementById('configEditor').value = JSON.stringify(currentConfig, null, 2);
                updateCurrentServers();
            } catch (error) {
                showMessage('Failed to load configuration', 'error');
            }
        }
        
        async function saveConfig() {
            try {
                const configText = document.getElementById('configEditor').value;
                const config = JSON.parse(configText);
                
                const response = await fetch('/api/config', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(config)
                });
                
                if (response.ok) {
                    currentConfig = config;
                    showMessage('Configuration saved successfully', 'success');
                    updateCurrentServers();
                } else {
                    throw new Error('Failed to save configuration');
                }
            } catch (error) {
                showMessage(error.message, 'error');
            }
        }
        
        function displayServers(servers = preConfiguredServers) {
            const grid = document.getElementById('serverGrid');
            grid.innerHTML = '';
            
            // Group servers by category
            const categories = {};
            Object.entries(servers).forEach(([key, server]) => {
                const category = server.category || 'Other';
                if (!categories[category]) {
                    categories[category] = [];
                }
                categories[category].push({ key, server });
            });
            
            // Sort categories and display them
            const sortedCategories = Object.keys(categories).sort();
            
            sortedCategories.forEach(category => {
                // Create category section
                const categorySection = document.createElement('div');
                categorySection.className = 'category-section';
                categorySection.setAttribute('data-category', category);
                categorySection.innerHTML = \`
                    <h2 class="category-title">\${category} <span class="category-count">(\${categories[category].length})</span></h2>
                    <div class="category-grid">
                \`;
                
                // Add servers in this category
                categories[category].forEach(({ key, server }) => {
                    const card = document.createElement('div');
                    card.className = 'server-card';
                    card.innerHTML = \`
                        <h3>\${server.name}</h3>
                        <p class="description">\${server.description}</p>
                        <button onclick="configureServer('\${key}')">Configure</button>
                    \`;
                    categorySection.querySelector('.category-grid').appendChild(card);
                });
                
                categorySection.innerHTML += '</div>';
                grid.appendChild(categorySection);
            });
        }
        
        function updateCurrentServers() {
            const list = document.getElementById('currentServerList');
            list.innerHTML = '';
            
            if (Object.keys(currentConfig.mcpServers).length === 0) {
                list.innerHTML = '<li class="server-item">No servers configured</li>';
                return;
            }
            
            Object.entries(currentConfig.mcpServers).forEach(([name, config]) => {
                const item = document.createElement('li');
                item.className = 'server-item';
                item.innerHTML = \`
                    <div class="server-info">
                        <h4>\${name}</h4>
                        <div class="details">
                            Command: \${config.command} \${config.args.join(' ')}
                            \${config.env ? '<br>Env: ' + JSON.stringify(config.env) : ''}
                        </div>
                    </div>
                    <button class="btn-remove" onclick="removeServer('\${name}')">Remove</button>
                \`;
                list.appendChild(item);
            });
        }
        
        function searchServers(query) {
            if (!query) {
                displayServers();
                return;
            }
            
            const filtered = {};
            const searchTerm = query.toLowerCase();
            
            Object.entries(preConfiguredServers).forEach(([key, server]) => {
                if ((server.name && server.name.toLowerCase().includes(searchTerm)) ||
                    (server.description && server.description.toLowerCase().includes(searchTerm)) ||
                    (server.category && server.category.toLowerCase().includes(searchTerm)) ||
                    (server.package && server.package.toLowerCase().includes(searchTerm))) {
                    filtered[key] = server;
                }
            });
            
            displayServers(filtered);
            
            // Show a message if no results
            if (Object.keys(filtered).length === 0) {
                const grid = document.getElementById('serverGrid');
                grid.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">No servers found matching your search.</div>';
            }
        }
        
        function configureServer(key) {
            const server = preConfiguredServers[key];
            const modal = document.getElementById('serverModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalBody = document.getElementById('modalBody');
            
            modalTitle.textContent = \`Configure \${server.name}\`;
            
            let formHtml = \`
                <form onsubmit="installServer(event, '\${key}')">
                    <div class="form-group">
                        <label>Server Name</label>
                        <input type="text" id="serverName" value="\${key}" required>
                        <small>Name for this server in your configuration</small>
                    </div>
            \`;
            
            if (server.requiredEnvVars && server.requiredEnvVars.length > 0) {
                formHtml += '<h4>Required Configuration</h4>';
                server.requiredEnvVars.forEach(envVar => {
                    formHtml += \`
                        <div class="form-group">
                            <label>\${envVar}</label>
                            <input type="text" name="env_\${envVar}" required>
                        </div>
                    \`;
                });
            }
            
            if (server.optionalParams && server.optionalParams.length > 0) {
                formHtml += '<h4>Optional Parameters</h4>';
                server.optionalParams.forEach(param => {
                    formHtml += \`
                        <div class="form-group">
                            <label>\${param}</label>
                            <input type="text" name="opt_\${param}">
                        </div>
                    \`;
                });
            }
            
            formHtml += \`
                <div class="button-group">
                    <button type="submit" class="btn-primary">Add Server</button>
                    <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                </div>
            </form>
            \`;
            
            modalBody.innerHTML = formHtml;
            modal.style.display = 'block';
        }
        
        function installServer(event, key) {
            event.preventDefault();
            
            const server = preConfiguredServers[key];
            const form = event.target;
            const serverName = form.serverName.value;
            
            const installParts = server.installCommand.split(' ');
            const command = installParts[0];
            const args = installParts.slice(1);
            
            const serverConfig = {
                command,
                args: [...args],
                env: {}
            };
            
            // Collect environment variables
            const formData = new FormData(form);
            for (const [key, value] of formData.entries()) {
                if (key.startsWith('env_') && value) {
                    const envVar = key.substring(4);
                    serverConfig.env[envVar] = value;
                } else if (key.startsWith('opt_') && value) {
                    const param = key.substring(4);
                    serverConfig.env[param] = value;
                }
            }
            
            currentConfig.mcpServers[serverName] = serverConfig;
            
            // Save configuration
            fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentConfig)
            }).then(response => {
                if (response.ok) {
                    showMessage(\`Added \${server.name} successfully\`, 'success');
                    updateCurrentServers();
                    document.getElementById('configEditor').value = JSON.stringify(currentConfig, null, 2);
                    closeModal();
                } else {
                    throw new Error('Failed to save configuration');
                }
            }).catch(error => {
                showMessage(error.message, 'error');
            });
        }
        
        function addCustomServer(event) {
            event.preventDefault();
            
            const name = document.getElementById('customName').value;
            const command = document.getElementById('customCommand').value;
            const argsInput = document.getElementById('customArgs').value;
            const envInput = document.getElementById('customEnv').value;
            
            const args = argsInput.split(',').map(arg => arg.trim()).filter(arg => arg);
            const env = {};
            
            if (envInput.trim()) {
                envInput.split(',').forEach(pair => {
                    const [key, value] = pair.split('=').map(s => s.trim());
                    if (key && value) {
                        env[key] = value;
                    }
                });
            }
            
            currentConfig.mcpServers[name] = {
                command,
                args,
                ...(Object.keys(env).length > 0 && { env })
            };
            
            // Save configuration
            fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentConfig)
            }).then(response => {
                if (response.ok) {
                    showMessage(\`Added custom server "\${name}" successfully\`, 'success');
                    updateCurrentServers();
                    document.getElementById('configEditor').value = JSON.stringify(currentConfig, null, 2);
                    event.target.reset();
                    switchTab('current');
                } else {
                    throw new Error('Failed to save configuration');
                }
            }).catch(error => {
                showMessage(error.message, 'error');
            });
        }
        
        function removeServer(name) {
            if (confirm(\`Are you sure you want to remove "\${name}"?\`)) {
                delete currentConfig.mcpServers[name];
                
                fetch('/api/config', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(currentConfig)
                }).then(response => {
                    if (response.ok) {
                        showMessage(\`Removed "\${name}" successfully\`, 'success');
                        updateCurrentServers();
                        document.getElementById('configEditor').value = JSON.stringify(currentConfig, null, 2);
                    } else {
                        throw new Error('Failed to save configuration');
                    }
                }).catch(error => {
                    showMessage(error.message, 'error');
                });
            }
        }
        
        function switchTab(tabId) {
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            event.target.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        }
        
        function closeModal() {
            document.getElementById('serverModal').style.display = 'none';
        }
        
        function showMessage(text, type) {
            const message = document.getElementById('message');
            message.textContent = text;
            message.className = \`message \${type}\`;
            message.style.display = 'block';
            
            setTimeout(() => {
                message.style.display = 'none';
            }, 5000);
        }
        
        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('serverModal');
            if (event.target === modal) {
                closeModal();
            }
        }
        
        // Initialize on load
        init();
    </script>
</body>
</html>`;
    }
}

if (require.main === module) {
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
}

module.exports = MCPManager;