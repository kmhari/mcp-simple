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
        console.log('4. Edit server');
        console.log('5. Remove server');
        console.log('6. View configuration file');
        console.log('7. Search MCP servers');
        console.log('8. Exit');
        console.log('\nPress q to quit at any time');
        
        const choice = await this.prompt('\nSelect an option (1-8 or q): ');
        return choice.trim();
    }

    async addPreConfiguredServer() {
        console.log('\n📦 Available Pre-configured Servers:');
        console.log('====================================');
        
        const servers = Object.keys(this.preConfiguredServers);
        const categories = [...new Set(servers.map(key => this.preConfiguredServers[key].category || 'Other'))];
        
        // Separate servers with and without required env vars
        const fastServers = [];
        const regularServers = [];
        
        servers.forEach(key => {
            const server = this.preConfiguredServers[key];
            if (!server.requiredEnvVars || server.requiredEnvVars.length === 0) {
                fastServers.push({ key, server });
            } else {
                regularServers.push({ key, server });
            }
        });
        
        // Display supafast servers first
        if (fastServers.length > 0) {
            console.log('\n⚡ Supafast Servers (no setup required):');
            console.log('==========================================');
            fastServers.forEach((item, index) => {
                console.log(`S${index + 1}. ${item.server.name} - ${item.server.description}`);
            });
        }
        
        // Display regular servers by category
        let serverList = [];
        categories.sort().forEach(category => {
            const categoryServers = regularServers.filter(item => (item.server.category || 'Other') === category);
            if (categoryServers.length > 0) {
                console.log(`\n${category}:`);
                categoryServers.forEach(item => {
                    serverList.push(item);
                    console.log(`${serverList.length}. ${item.server.name} - ${item.server.description}`);
                });
            }
        });
        
        console.log('\nOptions:');
        console.log(`• S1-S${fastServers.length}: Add supafast server instantly`);
        console.log(`• 1-${serverList.length}: Configure server with settings`);
        console.log('• 0: Cancel');
        
        const choice = await this.prompt(`\nSelect server (S1-S${fastServers.length}, 1-${serverList.length}, 0 to cancel, or q to quit): `);
        
        // Handle supafast servers
        if (choice.toLowerCase().startsWith('s')) {
            const fastIndex = parseInt(choice.substring(1)) - 1;
            if (fastIndex >= 0 && fastIndex < fastServers.length) {
                await this.addSupafastServer(fastServers[fastIndex]);
                return;
            } else {
                console.log('❌ Invalid supafast selection');
                return;
            }
        }
        
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

    async addSupafastServer({ key: serverKey, server }) {
        console.log(`\n⚡ Adding ${server.name} instantly...`);
        
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
        
        // Handle optional parameters if any
        if (server.optionalParams && server.optionalParams.length > 0) {
            const addOptional = await this.prompt(`\n📝 Configure optional parameters? (y/N): `);
            if (addOptional.toLowerCase() === 'y') {
                console.log(`\n📝 Optional parameters (press Enter to skip):`);
                for (const param of server.optionalParams) {
                    const value = await this.prompt(`${param}: `);
                    if (value) {
                        serverConfig.env[param] = value;
                    }
                }
            }
        }
        
        const serverName = await this.prompt(`\nServer name (default: ${serverKey}): `) || serverKey;
        
        config.mcpServers[serverName] = serverConfig;
        this.saveConfig(config);
        console.log(`\n🚀 Added ${server.name} server instantly!`);
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

    async editServer() {
        const config = this.loadConfig();
        const servers = Object.keys(config.mcpServers);
        
        if (servers.length === 0) {
            console.log('❌ No servers to edit.');
            return;
        }
        
        console.log('\n✏️  Edit Server:');
        console.log('================');
        
        servers.forEach((name, index) => {
            const server = config.mcpServers[name];
            console.log(`${index + 1}. ${name}`);
            console.log(`   Command: ${server.command} ${server.args.join(' ')}`);
            if (server.env && Object.keys(server.env).length > 0) {
                console.log(`   Env vars: ${Object.keys(server.env).join(', ')}`);
            }
            console.log('');
        });
        
        const choice = await this.prompt(`\nSelect server to edit (1-${servers.length}) or q to quit: `);
        const serverIndex = parseInt(choice) - 1;
        
        if (serverIndex < 0 || serverIndex >= servers.length) {
            console.log('❌ Invalid selection');
            return;
        }
        
        const oldName = servers[serverIndex];
        const currentServer = config.mcpServers[oldName];
        
        console.log(`\n📝 Editing server: ${oldName}`);
        console.log('Leave fields empty to keep current values\n');
        
        // Edit server name
        const newName = await this.prompt(`Server name (${oldName}): `) || oldName;
        
        // Edit command
        const newCommand = await this.prompt(`Command (${currentServer.command}): `) || currentServer.command;
        
        // Edit args
        console.log(`Current args: ${currentServer.args.join(', ')}`);
        const newArgsInput = await this.prompt('New arguments (comma-separated, or press Enter to keep): ');
        const newArgs = newArgsInput ? newArgsInput.split(',').map(arg => arg.trim()).filter(arg => arg) : currentServer.args;
        
        // Edit environment variables
        const currentEnvVars = currentServer.env || {};
        const envVarKeys = Object.keys(currentEnvVars);
        let newEnv = {};
        
        if (envVarKeys.length > 0) {
            console.log('\nCurrent environment variables:');
            for (const key of envVarKeys) {
                console.log(`  ${key}: ${currentEnvVars[key]}`);
            }
            
            const editEnv = await this.prompt('\nEdit environment variables? (y/n): ');
            if (editEnv.toLowerCase() === 'y') {
                // Edit existing env vars
                for (const key of envVarKeys) {
                    const newValue = await this.prompt(`${key} (${currentEnvVars[key]}): `);
                    if (newValue) {
                        newEnv[key] = newValue;
                    } else {
                        newEnv[key] = currentEnvVars[key];
                    }
                }
                
                // Option to add new env vars
                const addMore = await this.prompt('\nAdd new environment variables? (y/n): ');
                if (addMore.toLowerCase() === 'y') {
                    const newEnvInput = await this.prompt('New env vars (key=value, comma-separated): ');
                    if (newEnvInput.trim()) {
                        newEnvInput.split(',').forEach(pair => {
                            const [key, value] = pair.split('=').map(s => s.trim());
                            if (key && value) {
                                newEnv[key] = value;
                            }
                        });
                    }
                }
            } else {
                newEnv = currentEnvVars;
            }
        } else {
            const addEnv = await this.prompt('\nAdd environment variables? (y/n): ');
            if (addEnv.toLowerCase() === 'y') {
                const envInput = await this.prompt('Environment variables (key=value, comma-separated): ');
                if (envInput.trim()) {
                    envInput.split(',').forEach(pair => {
                        const [key, value] = pair.split('=').map(s => s.trim());
                        if (key && value) {
                            newEnv[key] = value;
                        }
                    });
                }
            }
        }
        
        // If the name changed, delete the old entry
        if (newName !== oldName) {
            delete config.mcpServers[oldName];
        }
        
        // Save the updated server configuration
        config.mcpServers[newName] = {
            command: newCommand,
            args: newArgs,
            ...(Object.keys(newEnv).length > 0 && { env: newEnv })
        };
        
        this.saveConfig(config);
        console.log(`✅ Server "${newName}" updated successfully!`);
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
        
        // Display installed servers at startup
        const config = this.loadConfig();
        const installedCount = Object.keys(config.mcpServers).length;
        
        if (installedCount > 0) {
            console.log('📋 Installed MCP Servers:');
            console.log('========================');
            Object.entries(config.mcpServers).forEach(([name, server]) => {
                console.log(`• ${name}`);
            });
            console.log(`\nTotal: ${installedCount} server${installedCount !== 1 ? 's' : ''} installed`);
            console.log(''); // Add empty line for better formatting
        } else {
            console.log('ℹ️  No MCP servers currently installed.');
            console.log('   Use option 1 or 2 to add your first server.');
            console.log(''); // Add empty line for better formatting
        }
        
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
                        await this.editServer();
                        break;
                    case '5':
                        await this.removeServer();
                        break;
                    case '6':
                        this.viewConfig();
                        break;
                    case '7':
                        await this.searchMCPServers();
                        break;
                    case '8':
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
        
        .server-actions {
            display: flex;
            gap: 10px;
        }
        
        .btn-edit {
            background: #3498db;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .btn-edit:hover {
            background: #2980b9;
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
                    <div class="server-actions">
                        <button class="btn-edit" onclick="editServer('\${name}')">Edit</button>
                        <button class="btn-remove" onclick="removeServer('\${name}')">Remove</button>
                    </div>
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
                            <input type="text" name="env_\${envVar}" id="env_\${envVar}" required>
                            \${key === 'slack' && envVar === 'SLACK_BOT_TOKEN' ? 
                                \`<button type="button" class="btn-secondary" style="margin-top: 8px;" onclick="getSlackTokenWithSkyvern()">
                                    Get Token with Skyvern
                                </button>\` : ''}
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
        
        function editServer(name) {
            const server = currentConfig.mcpServers[name];
            if (!server) {
                showMessage('Server not found', 'error');
                return;
            }
            
            const modal = document.getElementById('serverModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalBody = document.getElementById('modalBody');
            
            modalTitle.textContent = \`Edit Server: \${name}\`;
            
            let envVarsHtml = '';
            if (server.env && Object.keys(server.env).length > 0) {
                envVarsHtml = '<h4>Environment Variables</h4>';
                Object.entries(server.env).forEach(([key, value]) => {
                    envVarsHtml += \`
                        <div class="form-group">
                            <label>\${key}</label>
                            <input type="text" name="env_\${key}" value="\${value}">
                            <button type="button" class="btn-remove" style="padding: 4px 8px; font-size: 12px;" onclick="this.parentElement.remove()">Remove</button>
                        </div>
                    \`;
                });
            }
            
            modalBody.innerHTML = \`
                <form onsubmit="updateServer(event, '\${name}')">
                    <div class="form-group">
                        <label>Server Name</label>
                        <input type="text" id="editServerName" value="\${name}" required>
                        <small>Rename this server configuration</small>
                    </div>
                    <div class="form-group">
                        <label>Command</label>
                        <input type="text" id="editCommand" value="\${server.command}" required>
                    </div>
                    <div class="form-group">
                        <label>Arguments (comma-separated)</label>
                        <input type="text" id="editArgs" value="\${server.args.join(', ')}">
                    </div>
                    <div id="envVarsContainer">
                        \${envVarsHtml}
                    </div>
                    <button type="button" class="btn-secondary" style="margin: 10px 0;" onclick="addEnvVar()">Add Environment Variable</button>
                    <div class="button-group">
                        <button type="submit" class="btn-primary">Save Changes</button>
                        <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                    </div>
                </form>
            \`;
            
            modal.style.display = 'block';
        }
        
        function addEnvVar() {
            const container = document.getElementById('envVarsContainer');
            if (!container.querySelector('h4')) {
                container.innerHTML = '<h4>Environment Variables</h4>' + container.innerHTML;
            }
            
            const newEnvVar = document.createElement('div');
            newEnvVar.className = 'form-group';
            newEnvVar.innerHTML = \`
                <input type="text" name="env_key" placeholder="Variable name" style="width: 45%; margin-right: 2%;">
                <input type="text" name="env_value" placeholder="Value" style="width: 45%; margin-right: 2%;">
                <button type="button" class="btn-remove" style="padding: 4px 8px; font-size: 12px;" onclick="this.parentElement.remove()">Remove</button>
            \`;
            container.appendChild(newEnvVar);
        }
        
        function updateServer(event, oldName) {
            event.preventDefault();
            
            const form = event.target;
            const newName = form.editServerName.value;
            const command = form.editCommand.value;
            const argsInput = form.editArgs.value;
            
            const args = argsInput.split(',').map(arg => arg.trim()).filter(arg => arg);
            const env = {};
            
            // Collect existing environment variables
            const envInputs = form.querySelectorAll('input[name^="env_"]:not([name="env_key"]):not([name="env_value"])');
            envInputs.forEach(input => {
                const key = input.name.substring(4);
                if (input.value) {
                    env[key] = input.value;
                }
            });
            
            // Collect new environment variables
            const newEnvKeys = form.querySelectorAll('input[name="env_key"]');
            const newEnvValues = form.querySelectorAll('input[name="env_value"]');
            newEnvKeys.forEach((keyInput, index) => {
                if (keyInput.value && newEnvValues[index].value) {
                    env[keyInput.value] = newEnvValues[index].value;
                }
            });
            
            // If name changed, delete old entry
            if (newName !== oldName) {
                delete currentConfig.mcpServers[oldName];
            }
            
            // Update configuration
            currentConfig.mcpServers[newName] = {
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
                    showMessage(\`Updated "\${newName}" successfully\`, 'success');
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
        
        async function getSlackTokenWithSkyvern() {
            // Show step-by-step guide modal
            showSlackTokenGuide();
        }
        
        function showSlackTokenGuide() {
            const modal = document.getElementById('serverModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalBody = document.getElementById('modalBody');
            
            modalTitle.textContent = 'Get Slack Bot Token - Step by Step';
            
            modalBody.innerHTML = \`
                <div class="slack-token-guide">
                    <h3>Manual Steps:</h3>
                    <ol>
                        <li>
                            <strong>Go to Slack API Apps page</strong><br>
                            <a href="https://api.slack.com/apps" target="_blank" class="btn-secondary">Open Slack Apps</a>
                        </li>
                        <li>
                            <strong>Create a new app or select existing app</strong><br>
                            <small>If creating new: Choose "From scratch" and give it a name</small>
                        </li>
                        <li>
                            <strong>Navigate to "OAuth & Permissions" in the left sidebar</strong>
                        </li>
                        <li>
                            <strong>Add Bot Token Scopes</strong><br>
                            <small>Common scopes: chat:write, channels:read, users:read</small>
                        </li>
                        <li>
                            <strong>Install to Workspace</strong><br>
                            <small>Click "Install to Workspace" button and authorize</small>
                        </li>
                        <li>
                            <strong>Copy the Bot User OAuth Token</strong><br>
                            <small>It starts with "xoxb-"</small>
                        </li>
                    </ol>
                    
                    <div class="form-group">
                        <label>Paste your Bot Token here:</label>
                        <input type="text" id="manual_slack_token" placeholder="xoxb-your-token-here">
                    </div>
                    
                    <h4>Or use Skyvern automation:</h4>
                    <button type="button" class="btn-primary" onclick="launchSkyvernAutomation()">
                        Launch Skyvern Browser Automation
                    </button>
                    
                    <div class="button-group" style="margin-top: 20px;">
                        <button type="button" class="btn-primary" onclick="applySlackToken()">Apply Token</button>
                        <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                    </div>
                </div>
                
                <style>
                    .slack-token-guide ol {
                        margin: 20px 0;
                        padding-left: 20px;
                    }
                    .slack-token-guide li {
                        margin: 15px 0;
                        line-height: 1.5;
                    }
                    .slack-token-guide a {
                        display: inline-block;
                        margin: 5px 0;
                    }
                </style>
            \`;
            
            modal.style.display = 'block';
        }
        
        function applySlackToken() {
            const token = document.getElementById('manual_slack_token').value;
            if (token) {
                document.getElementById('env_SLACK_BOT_TOKEN').value = token;
                closeModal();
                showMessage('Slack token applied successfully', 'success');
            } else {
                showMessage('Please enter a token', 'error');
            }
        }
        
        async function launchSkyvernAutomation() {
            const button = event.target;
            const originalText = button.textContent;
            button.disabled = true;
            button.textContent = 'Checking Skyvern...';
            
            try {
                // Check if Skyvern is configured
                const skyvernConfig = currentConfig.mcpServers.skyvern;
                if (!skyvernConfig || !skyvernConfig.env || !skyvernConfig.env.SKYVERN_API_KEY) {
                    throw new Error('Skyvern is not configured. Please configure Skyvern server first.');
                }
                
                button.textContent = 'Launching browser...';
                
                // Create Skyvern task
                const skyvernUrl = skyvernConfig.env.SKYVERN_BASE_URL || 'https://api.skyvern.com';
                const apiKey = skyvernConfig.env.SKYVERN_API_KEY;
                
                const taskPayload = {
                    url: 'https://api.slack.com/apps',
                    navigation_goal: 'Navigate to Slack API apps, create or select a bot app, go to OAuth & Permissions, and retrieve the Bot User OAuth Token that starts with xoxb-',
                    data_extraction_goal: 'Extract the Bot User OAuth Token from the OAuth & Permissions page',
                    proxy_location: 'NONE',
                    navigation_payload: {
                        instructions: [
                            'If not logged in, wait for user to login',
                            'Create new app or select existing app', 
                            'Navigate to OAuth & Permissions section',
                            'If no scopes added, add chat:write scope',
                            'Install app to workspace if not installed',
                            'Copy Bot User OAuth Token'
                        ]
                    }
                };
                
                const response = await fetch(\`\${skyvernUrl}/api/v1/tasks\`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey
                    },
                    body: JSON.stringify(taskPayload)
                });
                
                if (!response.ok) {
                    const error = await response.text();
                    throw new Error(\`Failed to create Skyvern task: \${error}\`);
                }
                
                const task = await response.json();
                button.textContent = 'Browser launched - Complete steps in browser';
                
                // Open Skyvern dashboard in new tab
                if (task.task_id) {
                    window.open(\`\${skyvernUrl}/tasks/\${task.task_id}\`, '_blank');
                }
                
                // Poll for completion
                const taskId = task.task_id;
                let pollCount = 0;
                const maxPolls = 60; // 5 minutes
                
                const pollInterval = setInterval(async () => {
                    pollCount++;
                    
                    try {
                        const statusResponse = await fetch(\`\${skyvernUrl}/api/v1/tasks/\${taskId}\`, {
                            headers: {
                                'x-api-key': apiKey
                            }
                        });
                        
                        if (statusResponse.ok) {
                            const status = await statusResponse.json();
                            
                            if (status.status === 'completed') {
                                clearInterval(pollInterval);
                                
                                // Try to extract token from results
                                let token = null;
                                
                                if (status.extracted_information) {
                                    // Look for token in various possible locations
                                    token = status.extracted_information.token || 
                                           status.extracted_information.bot_token ||
                                           status.extracted_information.oauth_token;
                                    
                                    // If not found, search in the text
                                    if (!token && status.extracted_information.text) {
                                        const match = status.extracted_information.text.match(/xoxb-[a-zA-Z0-9-]+/);
                                        if (match) token = match[0];
                                    }
                                }
                                
                                if (token) {
                                    document.getElementById('manual_slack_token').value = token;
                                    button.textContent = 'Token Retrieved! Click Apply Token';
                                    showMessage('Token found! Click "Apply Token" to use it', 'success');
                                } else {
                                    button.textContent = 'Task completed - Check browser and paste token manually';
                                    showMessage('Please copy the token from the browser and paste it above', 'info');
                                }
                                
                                button.disabled = false;
                            } else if (status.status === 'failed') {
                                clearInterval(pollInterval);
                                throw new Error('Skyvern task failed - Please complete manually');
                            } else if (pollCount >= maxPolls) {
                                clearInterval(pollInterval);
                                button.textContent = 'Complete in browser and paste token';
                                button.disabled = false;
                                showMessage('Please complete the process in the browser and paste the token', 'info');
                            }
                        }
                    } catch (error) {
                        clearInterval(pollInterval);
                        button.textContent = originalText;
                        button.disabled = false;
                        showMessage('Error: ' + error.message, 'error');
                    }
                }, 5000);
                
            } catch (error) {
                showMessage('Error: ' + error.message, 'error');
                button.textContent = originalText;
                button.disabled = false;
            }
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