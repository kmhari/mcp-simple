#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const os = require('os');

class MCPManager {
    constructor() {
        this.configPath = path.join(process.cwd(), '.mcp.json');
        this.locationsFile = path.join(os.homedir(), '.config', 'mcpsimple', 'locations');
        this.databasePath = path.join(__dirname, 'mcp-servers-database.json');
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        this.mcpServersDatabase = this.loadMCPDatabase();

        this.preConfiguredServers = {
            postgres: {
                name: 'PostgreSQL',
                package: '@modelcontextprotocol/server-postgres',
                config: {
                    command: 'npx',
                    args: ['-y', '@modelcontextprotocol/server-postgres'],
                    env: {}
                },
                requiresInput: true,
                inputPrompt: 'PostgreSQL connection URL (e.g., postgresql://user:pass@localhost:5432/mydb):'
            },
            redis: {
                name: 'Redis',
                package: '@modelcontextprotocol/server-redis',
                config: {
                    command: 'npx',
                    args: ['-y', '@modelcontextprotocol/server-redis'],
                    env: {
                        REDIS_URL: 'redis://localhost:6379'
                    }
                },
                requiresInput: true,
                inputPrompt: 'Redis connection URL (default: redis://localhost:6379):'
            },
            sqlite: {
                name: 'SQLite',
                package: 'mcp-server-sqlite',
                config: {
                    command: 'uvx',
                    args: ['mcp-server-sqlite', '--db-path'],
                    env: {}
                },
                requiresInput: true,
                inputPrompt: 'SQLite database path (e.g., ./db.sqlite):'
            },
            filesystem: {
                name: 'Filesystem',
                package: '@modelcontextprotocol/server-filesystem',
                config: {
                    command: 'npx',
                    args: ['-y', '@modelcontextprotocol/server-filesystem'],
                    env: {}
                },
                requiresInput: true,
                inputPrompt: 'Root directory path to allow access (e.g., /home/user/projects):'
            },
            github: {
                name: 'GitHub',
                package: '@modelcontextprotocol/server-github',
                config: {
                    command: 'npx',
                    args: ['-y', '@modelcontextprotocol/server-github'],
                    env: {}
                },
                requiresInput: true,
                inputPrompt: 'GitHub Personal Access Token:'
            },
            googledrive: {
                name: 'Google Drive',
                package: '@modelcontextprotocol/server-gdrive',
                config: {
                    command: 'npx',
                    args: ['-y', '@modelcontextprotocol/server-gdrive'],
                    env: {}
                },
                requiresInput: false,
                inputPrompt: ''
            },
            slack: {
                name: 'Slack',
                package: '@modelcontextprotocol/server-slack',
                config: {
                    command: 'npx',
                    args: ['-y', '@modelcontextprotocol/server-slack'],
                    env: {}
                },
                requiresInput: true,
                inputPrompt: 'Slack Bot Token (xoxb-...):'
            },
            brave: {
                name: 'Brave Search',
                package: '@modelcontextprotocol/server-brave-search',
                config: {
                    command: 'npx',
                    args: ['-y', '@modelcontextprotocol/server-brave-search'],
                    env: {}
                },
                requiresInput: true,
                inputPrompt: 'Brave Search API Key:'
            },
            everything: {
                name: 'Everything (Windows)',
                package: '@modelcontextprotocol/server-everything',
                config: {
                    command: 'npx',
                    args: ['-y', '@modelcontextprotocol/server-everything'],
                    env: {}
                },
                requiresInput: false,
                inputPrompt: ''
            },
            fetch: {
                name: 'Fetch',
                package: '@modelcontextprotocol/server-fetch',
                config: {
                    command: 'npx',
                    args: ['-y', '@modelcontextprotocol/server-fetch'],
                    env: {}
                },
                requiresInput: false,
                inputPrompt: ''
            },
            memory: {
                name: 'Memory',
                package: '@modelcontextprotocol/server-memory',
                config: {
                    command: 'npx',
                    args: ['-y', '@modelcontextprotocol/server-memory'],
                    env: {}
                },
                requiresInput: false,
                inputPrompt: ''
            },
            puppeteer: {
                name: 'Puppeteer',
                package: '@modelcontextprotocol/server-puppeteer',
                config: {
                    command: 'npx',
                    args: ['-y', '@modelcontextprotocol/server-puppeteer'],
                    env: {}
                },
                requiresInput: false,
                inputPrompt: ''
            }
        };
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
            this.rl.question(question, resolve);
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
        console.log('6. Browse MCP servers database');
        console.log('7. Exit');
        
        const choice = await this.prompt('\nSelect an option (1-7): ');
        return choice.trim();
    }

    async addPreConfiguredServer() {
        console.log('\n📦 Available Pre-configured Servers:');
        console.log('====================================');
        
        const servers = Object.keys(this.preConfiguredServers);
        servers.forEach((key, index) => {
            const server = this.preConfiguredServers[key];
            console.log(`${index + 1}. ${server.name} (${server.package})`);
        });
        
        const choice = await this.prompt(`\nSelect server (1-${servers.length}): `);
        const serverIndex = parseInt(choice) - 1;
        
        if (serverIndex < 0 || serverIndex >= servers.length) {
            console.log('❌ Invalid selection');
            return;
        }
        
        const serverKey = servers[serverIndex];
        const server = this.preConfiguredServers[serverKey];
        const config = this.loadConfig();
        
        let serverConfig = { ...server.config };
        
        if (server.requiresInput) {
            const input = await this.prompt(server.inputPrompt + ' ');
            
            if (serverKey === 'postgres') {
                serverConfig.args.push(input);
            } else if (serverKey === 'redis') {
                serverConfig.env.REDIS_URL = input || 'redis://localhost:6379';
            } else if (serverKey === 'sqlite') {
                serverConfig.args.push(input);
            } else if (serverKey === 'filesystem') {
                serverConfig.args.push(input);
            } else if (serverKey === 'github') {
                serverConfig.env.GITHUB_PERSONAL_ACCESS_TOKEN = input;
            } else if (serverKey === 'slack') {
                serverConfig.env.SLACK_BOT_TOKEN = input;
            } else if (serverKey === 'brave') {
                serverConfig.env.BRAVE_SEARCH_API_KEY = input;
            }
        }
        
        config.mcpServers[serverKey] = serverConfig;
        this.saveConfig(config);
        console.log(`✅ Added ${server.name} server successfully!`);
    }

    async addCustomServer() {
        console.log('\n➕ Add Custom Server');
        console.log('====================');
        
        const name = await this.prompt('Server name: ');
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
        
        const choice = await this.prompt(`\nSelect server to remove (1-${servers.length}): `);
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

    async browseMCPDatabase() {
        console.log('\n🗄️  MCP Servers Database:');
        console.log('=========================');
        
        const servers = Object.keys(this.mcpServersDatabase);
        servers.forEach((key, index) => {
            const server = this.mcpServersDatabase[key];
            console.log(`${index + 1}. ${server.name}`);
            console.log(`   Package: ${server.package}`);
            console.log(`   Description: ${server.description}`);
            console.log(`   GitHub: ${server.githubLink}`);
            console.log('');
        });
        
        console.log(`Found ${servers.length} MCP servers in the database.`);
        
        const action = await this.prompt('\nPress Enter to return to main menu...');
    }

    async run() {
        console.log('Welcome to MCP Server Manager! 🚀');
        
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
                        await this.browseMCPDatabase();
                        break;
                    case '7':
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
}

if (require.main === module) {
    const manager = new MCPManager();
    manager.run().catch(console.error);
}

module.exports = MCPManager;