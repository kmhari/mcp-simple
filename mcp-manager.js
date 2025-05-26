#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

class MCPManager {
    constructor() {
        this.configPath = path.join(process.cwd(), '.mcp.json');
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
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
            }
        };
    }

    loadConfig() {
        try {
            if (fs.existsSync(this.configPath)) {
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
        console.log('6. Exit');
        
        const choice = await this.prompt('\nSelect an option (1-6): ');
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