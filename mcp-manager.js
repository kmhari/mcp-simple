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

    detectGitRepository() {
        try {
            // Check if we're in a git repository
            const gitDir = execSync('git rev-parse --show-toplevel', { 
                encoding: 'utf8', 
                stdio: 'pipe',
                cwd: process.cwd()
            }).trim();
            
            // Get remote origin URL
            const remoteUrl = execSync('git config --get remote.origin.url', { 
                encoding: 'utf8', 
                stdio: 'pipe',
                cwd: gitDir
            }).trim();
            
            // Parse GitHub repository from remote URL
            let repoInfo = null;
            const githubMatch = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/]+?)(?:\.git)?$/);
            if (githubMatch) {
                repoInfo = {
                    owner: githubMatch[1],
                    repo: githubMatch[2],
                    fullName: `${githubMatch[1]}/${githubMatch[2]}`,
                    url: remoteUrl
                };
            }
            
            return repoInfo;
        } catch (error) {
            // Not in a git repository or git not available
            return null;
        }
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
                let value = '';
                
                // Special handling for GITHUB_REPO
                if (envVar === 'GITHUB_REPO') {
                    const gitInfo = this.detectGitRepository();
                    if (gitInfo) {
                        console.log(`\n🔍 Detected git repository: ${gitInfo.fullName}`);
                        const useDetected = await this.prompt(`Use detected repository "${gitInfo.fullName}"? (Y/n): `);
                        if (useDetected.toLowerCase() !== 'n') {
                            value = gitInfo.fullName;
                            
                            // Auto-fill GITHUB_OWNER if it's also required and not yet set
                            if (server.requiredEnvVars.includes('GITHUB_OWNER') && !serverConfig.env['GITHUB_OWNER']) {
                                serverConfig.env['GITHUB_OWNER'] = gitInfo.owner;
                                console.log(`✅ Auto-filled GITHUB_OWNER: ${gitInfo.owner}`);
                            }
                        }
                    }
                    
                    if (!value) {
                        value = await this.prompt(`${envVar} (format: owner/repo): `);
                    }
                } else {
                    // Skip GITHUB_OWNER if already set from git detection
                    if (envVar === 'GITHUB_OWNER' && serverConfig.env['GITHUB_OWNER']) {
                        console.log(`✅ Using GITHUB_OWNER: ${serverConfig.env['GITHUB_OWNER']}`);
                        continue;
                    }
                    value = await this.prompt(`${envVar}: `);
                }
                
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

    compareVersions(version1, version2) {
        const v1Parts = version1.split('.').map(Number);
        const v2Parts = version2.split('.').map(Number);
        
        for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
            const v1Part = v1Parts[i] || 0;
            const v2Part = v2Parts[i] || 0;
            
            if (v1Part > v2Part) return 1;
            if (v1Part < v2Part) return -1;
        }
        
        return 0;
    }

    startWebServer() {
        const express = require('express');
        const app = express();
        const PORT = process.env.PORT || 3333;
        
        // Middleware
        app.use(express.json());
        app.use(express.static(path.join(__dirname, 'public')));
        
        // Enable CORS
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            if (req.method === 'OPTIONS') {
                return res.sendStatus(200);
            }
            next();
        });
        
        // API Routes
        app.get('/api/config', (req, res) => {
            res.json(this.loadConfig());
        });
        
        app.post('/api/config', (req, res) => {
            try {
                this.saveConfig(req.body);
                res.json({ success: true });
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        
        app.get('/api/servers', (req, res) => {
            res.json(this.preConfiguredServers);
        });
        
        // Serve stars data
        app.get('/mcp-servers-with-stars.json', (req, res) => {
            const starsPath = path.join(__dirname, 'mcp-servers-with-stars.json');
            if (fs.existsSync(starsPath)) {
                res.sendFile(starsPath);
            } else {
                res.status(404).json({ error: 'Stars data not available' });
            }
        });
        
        app.get('/api/variables', (req, res) => {
            const variablesPath = path.join(os.homedir(), '.config', 'mcpsimple', 'mcp.json');
            let variables = {};
            try {
                if (fs.existsSync(variablesPath)) {
                    const data = fs.readFileSync(variablesPath, 'utf8');
                    const config = JSON.parse(data);
                    variables = config.variables || {};
                }
            } catch (error) {
                console.error('Error loading variables:', error);
            }
            res.json(variables);
        });
        
        app.post('/api/variables', (req, res) => {
            try {
                const variables = req.body;
                
                // Save variables to ~/.config/mcpsimple/mcp.json
                const configDir = path.join(os.homedir(), '.config', 'mcpsimple');
                const variablesPath = path.join(configDir, 'mcp.json');
                
                // Ensure directory exists
                if (!fs.existsSync(configDir)) {
                    fs.mkdirSync(configDir, { recursive: true });
                }
                
                // Load existing config or create new one
                let config = {};
                if (fs.existsSync(variablesPath)) {
                    const data = fs.readFileSync(variablesPath, 'utf8');
                    config = JSON.parse(data);
                }
                
                // Update variables
                config.variables = variables;
                
                // Save config
                fs.writeFileSync(variablesPath, JSON.stringify(config, null, 2));
                
                res.json({ success: true });
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        
        // Check for .env file and get variables
        app.get('/api/env-variables', (req, res) => {
            try {
                const envPath = path.join(process.cwd(), '.env');
                if (fs.existsSync(envPath)) {
                    const dotenv = require('dotenv');
                    const envConfig = dotenv.parse(fs.readFileSync(envPath, 'utf8'));
                    res.json({ exists: true, variables: envConfig });
                } else {
                    res.json({ exists: false, variables: {} });
                }
            } catch (error) {
                console.error('Error reading .env file:', error);
                res.json({ exists: false, variables: {} });
            }
        });
        
        // Git repository detection endpoint
        app.get('/api/git-info', (req, res) => {
            try {
                const gitInfo = this.detectGitRepository();
                res.json({ success: true, gitInfo });
            } catch (error) {
                res.json({ success: false, error: error.message });
            }
        });
        
        // Check for updates endpoint
        app.get('/api/version-check', async (req, res) => {
            try {
                const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
                const currentVersion = packageJson.version;
                const packageName = packageJson.name;
                
                // Fetch latest version from npm
                const https = require('https');
                const npmUrl = `https://registry.npmjs.org/${packageName}/latest`;
                
                https.get(npmUrl, (npmRes) => {
                    let data = '';
                    npmRes.on('data', chunk => data += chunk);
                    npmRes.on('end', () => {
                        try {
                            const npmData = JSON.parse(data);
                            const latestVersion = npmData.version;
                            
                            const needsUpdate = this.compareVersions(latestVersion, currentVersion) > 0;
                            
                            res.json({
                                currentVersion,
                                latestVersion,
                                needsUpdate,
                                packageName,
                                isMandatory: needsUpdate // For now, all updates are mandatory
                            });
                        } catch (parseError) {
                            console.error('Error parsing npm response:', parseError);
                            res.status(500).json({ error: 'Failed to parse npm response' });
                        }
                    });
                }).on('error', (error) => {
                    console.error('Error fetching npm data:', error);
                    res.status(500).json({ error: 'Failed to fetch version info' });
                });
            } catch (error) {
                console.error('Error in version check:', error);
                res.status(500).json({ error: 'Failed to check version' });
            }
        });
        
        // Auto-update endpoint
        app.post('/api/auto-update', (req, res) => {
            try {
                const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
                const packageName = packageJson.name;
                
                // Execute npm update command
                const { spawn } = require('child_process');
                const updateProcess = spawn('npm', ['install', '-g', `${packageName}@latest`], {
                    stdio: 'pipe'
                });
                
                let output = '';
                let errorOutput = '';
                
                updateProcess.stdout.on('data', (data) => {
                    output += data.toString();
                });
                
                updateProcess.stderr.on('data', (data) => {
                    errorOutput += data.toString();
                });
                
                updateProcess.on('close', (code) => {
                    if (code === 0) {
                        res.json({ 
                            success: true, 
                            message: 'Update completed successfully. Please restart the application.',
                            output: output
                        });
                    } else {
                        res.status(500).json({ 
                            success: false, 
                            message: 'Update failed', 
                            error: errorOutput 
                        });
                    }
                });
                
                updateProcess.on('error', (error) => {
                    res.status(500).json({ 
                        success: false, 
                        message: 'Failed to start update process', 
                        error: error.message 
                    });
                });
                
            } catch (error) {
                res.status(500).json({ 
                    success: false, 
                    message: 'Update initiation failed', 
                    error: error.message 
                });
            }
        });
        
        // Start server
        this.httpServer = app.listen(PORT, () => {
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
