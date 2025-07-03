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
        console.log('8. Update stale server stars');
        console.log('9. Create Slack Bot Token');
        console.log('10. Get ClickUp API Key');
        console.log('11. Exit');
        console.log('\nPress q to quit at any time');
        
        const choice = await this.prompt('\nSelect an option (1-11 or q): ');
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
        
        // Apply default environment variables if they exist
        if (server.defaultEnvVars) {
            Object.assign(serverConfig.env, server.defaultEnvVars);
            console.log(`\n✅ Applied default values:`);
            Object.entries(server.defaultEnvVars).forEach(([key, value]) => {
                console.log(`   ${key}: ${value}`);
            });
        }
        
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
                const currentValue = serverConfig.env[param];
                const promptText = currentValue ? `${param} (current: ${currentValue}): ` : `${param}: `;
                const value = await this.prompt(promptText);
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
        
        // Apply default environment variables if they exist
        if (server.defaultEnvVars) {
            Object.assign(serverConfig.env, server.defaultEnvVars);
            console.log(`\n✅ Applied default values:`);
            Object.entries(server.defaultEnvVars).forEach(([key, value]) => {
                console.log(`   ${key}: ${value}`);
            });
        }
        
        // Handle optional parameters if any
        if (server.optionalParams && server.optionalParams.length > 0) {
            const addOptional = await this.prompt(`\n📝 Configure optional parameters? (y/N): `);
            if (addOptional.toLowerCase() === 'y') {
                console.log(`\n📝 Optional parameters (press Enter to skip):`);
                for (const param of server.optionalParams) {
                    const currentValue = serverConfig.env[param];
                    const promptText = currentValue ? `${param} (current: ${currentValue}): ` : `${param}: `;
                    const value = await this.prompt(promptText);
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

    async updateStaleStars() {
        console.log('\n⭐ Update Stale Server Stars');
        console.log('=============================');
        console.log('This will update GitHub star data for servers with outdated information.');
        console.log('Only servers with data older than the specified threshold will be updated.\n');

        // Show options for different staleness thresholds
        console.log('Select staleness threshold:');
        console.log('1. 7 days (update weekly)');
        console.log('2. 14 days (update bi-weekly)');
        console.log('3. 30 days (update monthly - default)');
        console.log('4. Custom days');
        console.log('5. Cancel');

        const choice = await this.prompt('\nSelect threshold (1-5): ');
        
        let days;
        switch (choice) {
            case '1':
                days = 7;
                break;
            case '2':
                days = 14;
                break;
            case '3':
                days = 30;
                break;
            case '4':
                const customDays = await this.prompt('Enter number of days: ');
                days = parseInt(customDays);
                if (isNaN(days) || days < 1) {
                    console.log('❌ Invalid number of days');
                    return;
                }
                break;
            case '5':
                return;
            default:
                console.log('❌ Invalid selection');
                return;
        }

        console.log(`\n🔄 Updating servers with star data older than ${days} days...`);
        console.log('This may take a few minutes depending on how many servers need updates.\n');

        try {
            const { spawn } = require('child_process');
            const updateProcess = spawn('node', ['fetch-github-stars.js', '--stale', '--days', days.toString()], {
                stdio: 'inherit'
            });

            updateProcess.on('close', (code) => {
                if (code === 0) {
                    console.log('\n✅ Star data update completed successfully!');
                } else {
                    console.log('\n❌ Star data update failed');
                }
            });

            updateProcess.on('error', (error) => {
                console.log('❌ Error running star update:', error.message);
                console.log('Make sure the fetch-github-stars.js script is available');
            });

        } catch (error) {
            console.log('❌ Error starting update process:', error.message);
        }
    }

    async createSlackBotToken() {
        console.log('\n🤖 Create Slack Bot Token');
        console.log('==========================');
        console.log('This feature uses browser automation to create Slack bot tokens.');
        console.log('You will need your Slack workspace credentials.\n');

        const confirm = await this.prompt('Continue? (y/N): ');
        if (confirm.toLowerCase() !== 'y') {
            return;
        }

        try {
            const SlackBotTokenAutomation = require('./slack-automation');
            const automation = new SlackBotTokenAutomation();
            await automation.run();
        } catch (error) {
            console.log('❌ Error running Slack automation:', error.message);
            console.log('Make sure Playwright is installed: npx playwright install');
        }
    }

    async getClickUpAPIKey() {
        console.log('\n🔑 Get ClickUp API Key');
        console.log('======================');
        console.log('This will help you retrieve your ClickUp API key using Skyvern automation.');
        console.log('');
        
        // Check if Skyvern is configured
        const config = this.loadConfig();
        const skyvernConfig = config.mcpServers.skyvern;
        
        if (!skyvernConfig || !skyvernConfig.env || !skyvernConfig.env.SKYVERN_API_KEY) {
            console.log('⚠️  Skyvern is not configured. Would you like to:');
            console.log('1. Use browser automation (Playwright) instead');
            console.log('2. Configure Skyvern first');
            console.log('3. Get manual instructions');
            console.log('4. Cancel');
            
            const choice = await this.prompt('\nSelect option (1-4): ');
            
            switch (choice) {
                case '1':
                    // Use Playwright automation
                    try {
                        const ClickUpAPIAutomation = require('./clickup-api-automation');
                        const automation = new ClickUpAPIAutomation();
                        await automation.run();
                    } catch (error) {
                        console.log('❌ Error running automation:', error.message);
                        console.log('Make sure Playwright is installed: npx playwright install');
                    }
                    return;
                case '2':
                    console.log('\n✨ Let\'s configure Skyvern first...');
                    await this.addPreConfiguredServer();
                    return;
                case '3':
                    this.showClickUpManualInstructions();
                    return;
                case '4':
                    return;
            }
        }
        
        console.log('🤖 Using Skyvern to help you get your ClickUp API key...\n');
        
        const skyvernUrl = skyvernConfig.env.SKYVERN_BASE_URL || 'https://api.skyvern.com';
        const apiKey = skyvernConfig.env.SKYVERN_API_KEY;
        
        try {
            console.log('🌐 Creating Skyvern task to navigate to ClickUp settings...');
            
            const taskPayload = {
                url: 'https://app.clickup.com',
                navigation_goal: 'Navigate to ClickUp settings, go to the Apps section, and help the user find and copy their API token',
                data_extraction_goal: 'Extract the API token if visible on the page',
                proxy_location: 'NONE',
                navigation_payload: {
                    instructions: [
                        'Wait for user to log in if not already logged in',
                        'Navigate to Settings (usually in bottom left corner)',
                        'Go to Apps section',
                        'Find API Token or Personal Token section',
                        'Help user generate or reveal their API token',
                        'Extract the token if possible'
                    ]
                }
            };
            
            const https = require('https');
            const taskData = JSON.stringify(taskPayload);
            
            const options = {
                hostname: new URL(skyvernUrl).hostname,
                path: '/api/v1/tasks',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'Content-Length': taskData.length
                }
            };
            
            const response = await new Promise((resolve, reject) => {
                const req = https.request(options, (res) => {
                    let data = '';
                    res.on('data', chunk => data += chunk);
                    res.on('end', () => {
                        if (res.statusCode === 200 || res.statusCode === 201) {
                            resolve(JSON.parse(data));
                        } else {
                            reject(new Error(`Skyvern API error: ${res.statusCode} - ${data}`));
                        }
                    });
                });
                
                req.on('error', reject);
                req.write(taskData);
                req.end();
            });
            
            console.log('✅ Skyvern task created successfully!');
            console.log(`🔗 Task ID: ${response.task_id}`);
            console.log('');
            console.log('📺 Opening Skyvern dashboard in your browser...');
            console.log(`🔗 ${skyvernUrl}/tasks/${response.task_id}`);
            
            // Try to open the browser
            const { exec } = require('child_process');
            const taskUrl = `${skyvernUrl}/tasks/${response.task_id}`;
            if (process.platform === 'darwin') {
                exec(`open "${taskUrl}"`);
            } else if (process.platform === 'win32') {
                exec(`start "${taskUrl}"`);
            } else {
                exec(`xdg-open "${taskUrl}"`);
            }
            
            console.log('\n📋 Instructions:');
            console.log('1. The Skyvern browser automation is now running');
            console.log('2. Log in to ClickUp if prompted');
            console.log('3. Skyvern will navigate to Settings → Apps');
            console.log('4. Look for "API Token" or "Personal Token"');
            console.log('5. Click "Generate" or "Show" to reveal your token');
            console.log('6. Copy the token when it appears');
            
            console.log('\n💡 Once you have your API token:');
            console.log('• Use it to configure the ClickUp MCP server');
            console.log('• Store it as CLICKUP_API_KEY in your .env file');
            console.log('• Keep it secure - treat it like a password!');
            
            await this.prompt('\nPress Enter when done...');
            
        } catch (error) {
            console.log('❌ Error creating Skyvern task:', error.message);
            console.log('\n💡 Falling back to manual instructions...\n');
            this.showClickUpManualInstructions();
        }
    }
    
    showClickUpManualInstructions() {
        console.log('📚 Manual Instructions to Get ClickUp API Key:');
        console.log('===========================================\n');
        console.log('1. Go to: https://app.clickup.com');
        console.log('2. Sign in to your ClickUp account');
        console.log('3. Click your profile avatar (bottom left corner)');
        console.log('4. Select "Settings" from the menu');
        console.log('5. Navigate to "Apps" in the settings sidebar');
        console.log('6. Look for "API Token" or "Personal Token"');
        console.log('7. Click "Generate" or "Show" to reveal your token');
        console.log('8. Copy the token and save it securely');
        console.log('\n📖 For more details, visit:');
        console.log('https://help.clickup.com/hc/en-us/articles/6303426241687-Use-the-ClickUp-API');
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
                        await this.updateStaleStars();
                        break;
                    case '9':
                        await this.createSlackBotToken();
                        break;
                    case '10':
                        await this.getClickUpAPIKey();
                        break;
                    case '11':
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
        
        // Slack automation endpoint
        app.post('/api/slack-automation', async (req, res) => {
            try {
                const { action } = req.body;
                
                if (action === 'create_slack_token') {
                    const SlackBotTokenAutomation = require('./slack-automation');
                    const automation = new SlackBotTokenAutomation();
                    
                    // Run automation programmatically
                    const result = await automation.createSlackBotToken(
                        '', // workspaceUrl - will prompt in browser
                        '', // email - will prompt in browser
                        '', // password - will prompt in browser
                        'Bot App', // default app name
                        'Created via MCP Manager' // default description
                    );
                    
                    res.json(result);
                } else {
                    res.status(400).json({ error: 'Unknown action' });
                }
            } catch (error) {
                res.status(500).json({ 
                    success: false, 
                    error: error.message 
                });
            }
        });

        // ClickUp automation endpoint
        app.post('/api/clickup-automation', async (req, res) => {
            try {
                const { action } = req.body;
                
                if (action === 'get_api_key_with_skyvern') {
                    // Check if Skyvern is configured
                    const config = this.loadConfig();
                    const skyvernServer = config.mcpServers && config.mcpServers.skyvern;
                    
                    if (!skyvernServer || !skyvernServer.env || !skyvernServer.env.SKYVERN_API_KEY) {
                        return res.status(400).json({
                            success: false,
                            error: 'Skyvern is not configured. Please configure Skyvern first to use this feature.'
                        });
                    }
                    
                    // For now, we'll use the built-in ClickUp automation
                    const ClickUpAPIAutomation = require('./clickup-api-automation');
                    const automation = new ClickUpAPIAutomation();
                    
                    // Run the browser automation to guide user
                    automation.getClickUpAPIKey().then(() => {
                        res.json({
                            success: false,
                            message: 'Automation completed. Please check the browser window and copy the API key manually.'
                        });
                    }).catch(error => {
                        res.status(500).json({
                            success: false,
                            error: error.message
                        });
                    });
                    
                } else {
                    res.status(400).json({ error: 'Unknown action' });
                }
            } catch (error) {
                res.status(500).json({ 
                    success: false, 
                    error: error.message 
                });
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
        
        // Shutdown endpoint
        app.post('/api/shutdown', (req, res) => {
            console.log('\n📛 Shutdown request received via web interface');
            res.json({ 
                success: true, 
                message: 'Server is shutting down...' 
            });
            
            // Close the server gracefully
            if (this.httpServer) {
                console.log('🛑 Stopping MCP Manager server...');
                this.httpServer.close(() => {
                    console.log('✅ Server stopped successfully');
                    process.exit(0);
                });
                
                // Force exit after 5 seconds if server doesn't close gracefully
                setTimeout(() => {
                    console.log('⚠️  Forcing server shutdown after timeout');
                    process.exit(0);
                }, 5000);
            } else {
                process.exit(0);
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
