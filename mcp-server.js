#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from "zod";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class TechStackMCPServer {
    constructor() {
        this.server = new McpServer({
            name: "Tech Stack & MCP Recommender",
            version: "1.0.0"
        });
        
        this.mcpDatabase = this.loadMCPDatabase();
        this.setupTools();
    }

    loadMCPDatabase() {
        try {
            const databasePath = path.join(__dirname, 'mcp-servers-database.json');
            if (fs.existsSync(databasePath)) {
                const content = fs.readFileSync(databasePath, 'utf8');
                return JSON.parse(content);
            }
        } catch (error) {
            console.error('Warning: Could not load MCP servers database:', error.message);
        }
        return {};
    }

    detectGitRepository(projectPath = process.cwd()) {
        try {
            const gitDir = execSync('git rev-parse --show-toplevel', { 
                encoding: 'utf8', 
                stdio: 'pipe',
                cwd: projectPath
            }).trim();
            
            const remoteUrl = execSync('git config --get remote.origin.url', { 
                encoding: 'utf8', 
                stdio: 'pipe',
                cwd: gitDir
            }).trim();
            
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
            return null;
        }
    }

    analyzeProjectFiles(projectPath = process.cwd()) {
        const techStack = {
            languages: [],
            frameworks: [],
            databases: [],
            tools: [],
            packageManagers: [],
            buildTools: [],
            testing: [],
            deployment: [],
            confidence: {}
        };

        try {
            // Check package.json for Node.js projects
            const packageJsonPath = path.join(projectPath, 'package.json');
            if (fs.existsSync(packageJsonPath)) {
                const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
                techStack.languages.push('JavaScript/TypeScript');
                techStack.packageManagers.push('npm');
                
                // Check dependencies for frameworks and tools
                const allDeps = {
                    ...packageJson.dependencies,
                    ...packageJson.devDependencies
                };
                
                if (allDeps.react) techStack.frameworks.push('React');
                if (allDeps.vue) techStack.frameworks.push('Vue.js');
                if (allDeps.angular) techStack.frameworks.push('Angular');
                if (allDeps.express) techStack.frameworks.push('Express.js');
                if (allDeps.fastify) techStack.frameworks.push('Fastify');
                if (allDeps['next']) techStack.frameworks.push('Next.js');
                if (allDeps.nuxt) techStack.frameworks.push('Nuxt.js');
                if (allDeps.svelte) techStack.frameworks.push('Svelte');
                
                if (allDeps.jest || allDeps.mocha || allDeps.chai || allDeps.vitest) techStack.testing.push('JavaScript Testing');
                if (allDeps.webpack) techStack.buildTools.push('Webpack');
                if (allDeps.vite) techStack.buildTools.push('Vite');
                if (allDeps.rollup) techStack.buildTools.push('Rollup');
                
                if (allDeps.mongodb || allDeps.mongoose) techStack.databases.push('MongoDB');
                if (allDeps.pg || allDeps.postgres) techStack.databases.push('PostgreSQL');
                if (allDeps.mysql) techStack.databases.push('MySQL');
                if (allDeps.sqlite3) techStack.databases.push('SQLite');
            }

            // Check for Python projects
            if (fs.existsSync(path.join(projectPath, 'requirements.txt')) || 
                fs.existsSync(path.join(projectPath, 'pyproject.toml')) ||
                fs.existsSync(path.join(projectPath, 'setup.py'))) {
                techStack.languages.push('Python');
                techStack.packageManagers.push('pip');
            }

            // Check for Rust projects
            if (fs.existsSync(path.join(projectPath, 'Cargo.toml'))) {
                techStack.languages.push('Rust');
                techStack.packageManagers.push('cargo');
            }

            // Check for Go projects
            if (fs.existsSync(path.join(projectPath, 'go.mod'))) {
                techStack.languages.push('Go');
                techStack.packageManagers.push('go modules');
            }

            // Check for Docker
            if (fs.existsSync(path.join(projectPath, 'Dockerfile')) || 
                fs.existsSync(path.join(projectPath, 'docker-compose.yml'))) {
                techStack.deployment.push('Docker');
            }

            // Check for common config files
            if (fs.existsSync(path.join(projectPath, '.env'))) {
                techStack.tools.push('Environment Variables');
            }

            // Calculate confidence scores
            Object.keys(techStack).forEach(category => {
                if (Array.isArray(techStack[category])) {
                    techStack.confidence[category] = techStack[category].length > 0 ? 
                        Math.min(techStack[category].length * 0.3 + 0.7, 1.0) : 0;
                }
            });

        } catch (error) {
            console.error('Error analyzing project files:', error.message);
        }

        return techStack;
    }

    recommendMCPServers(techStack) {
        const recommendations = [];
        const serverKeys = Object.keys(this.mcpDatabase);

        // Map tech stack to MCP server categories
        const recommendations_map = {
            'PostgreSQL': ['postgres'],
            'MySQL': ['mysql'],
            'SQLite': ['sqlite'],
            'MongoDB': ['mongodb'],
            'Redis': ['redis'],
            'JavaScript/TypeScript': ['github', 'npm'],
            'Python': ['github', 'pip'],
            'Docker': ['docker'],
            'Environment Variables': ['env'],
            'Git': ['github']
        };

        // Check for specific technology recommendations
        [...techStack.languages, ...techStack.frameworks, ...techStack.databases, ...techStack.tools]
            .forEach(tech => {
                if (recommendations_map[tech]) {
                    recommendations_map[tech].forEach(serverType => {
                        const matchingServers = serverKeys.filter(key => 
                            key.toLowerCase().includes(serverType) ||
                            this.mcpDatabase[key].name?.toLowerCase().includes(serverType) ||
                            this.mcpDatabase[key].description?.toLowerCase().includes(serverType)
                        );
                        
                        matchingServers.forEach(serverKey => {
                            if (!recommendations.find(r => r.key === serverKey)) {
                                recommendations.push({
                                    key: serverKey,
                                    server: this.mcpDatabase[serverKey],
                                    reason: `Recommended for ${tech}`,
                                    confidence: techStack.confidence[this.getCategoryForTech(tech, techStack)] || 0.5
                                });
                            }
                        });
                    });
                }
            });

        // Add general purpose servers
        const generalServers = ['filesystem', 'web-search', 'memory'];
        generalServers.forEach(serverType => {
            const matchingServers = serverKeys.filter(key => 
                key.toLowerCase().includes(serverType) ||
                this.mcpDatabase[key].name?.toLowerCase().includes(serverType)
            );
            
            matchingServers.forEach(serverKey => {
                if (!recommendations.find(r => r.key === serverKey)) {
                    recommendations.push({
                        key: serverKey,
                        server: this.mcpDatabase[serverKey],
                        reason: 'General purpose utility',
                        confidence: 0.3
                    });
                }
            });
        });

        return recommendations.sort((a, b) => b.confidence - a.confidence);
    }

    getCategoryForTech(tech, techStack) {
        for (const [category, items] of Object.entries(techStack)) {
            if (Array.isArray(items) && items.includes(tech)) {
                return category;
            }
        }
        return 'tools';
    }

    searchMCPServers(query) {
        const results = [];
        const searchTerm = query.toLowerCase();
        
        Object.keys(this.mcpDatabase).forEach(key => {
            const server = this.mcpDatabase[key];
            if ((server.name && server.name.toLowerCase().includes(searchTerm)) ||
                (server.description && server.description.toLowerCase().includes(searchTerm)) ||
                (server.package && server.package.toLowerCase().includes(searchTerm)) ||
                (server.category && server.category.toLowerCase().includes(searchTerm))) {
                results.push({ key, server });
            }
        });
        
        return results;
    }

    setupTools() {
        // Tool 1: Detect tech stack
        this.server.tool(
            'detect-tech-stack',
            'Analyze a project directory to detect the technology stack used',
            {
                projectPath: z.string().optional().describe("Path to the project directory (defaults to current directory)")
            },
            async ({ projectPath = process.cwd() }) => {
                try {
                    const techStack = this.analyzeProjectFiles(projectPath);
                    const gitInfo = this.detectGitRepository(projectPath);
                    
                    return {
                        content: [{
                            type: "text",
                            text: JSON.stringify({
                                techStack,
                                gitRepository: gitInfo,
                                summary: `Detected ${techStack.languages.length} languages, ${techStack.frameworks.length} frameworks, ${techStack.databases.length} databases`
                            }, null, 2)
                        }]
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error detecting tech stack: ${error.message}`
                        }]
                    };
                }
            }
        );

        // Tool 2: Recommend MCP servers
        this.server.tool(
            'recommend-mcp-servers',
            'Recommend MCP servers based on detected technology stack',
            {
                projectPath: z.string().optional().describe("Path to the project directory (defaults to current directory)"),
                maxRecommendations: z.number().optional().default(10).describe("Maximum number of recommendations to return")
            },
            async ({ projectPath = process.cwd(), maxRecommendations = 10 }) => {
                try {
                    const techStack = this.analyzeProjectFiles(projectPath);
                    const recommendations = this.recommendMCPServers(techStack).slice(0, maxRecommendations);
                    
                    return {
                        content: [{
                            type: "text",
                            text: JSON.stringify({
                                techStack: {
                                    languages: techStack.languages,
                                    frameworks: techStack.frameworks,
                                    databases: techStack.databases
                                },
                                recommendations: recommendations.map(rec => ({
                                    name: rec.server.name,
                                    key: rec.key,
                                    description: rec.server.description,
                                    reason: rec.reason,
                                    confidence: rec.confidence,
                                    package: rec.server.package,
                                    installCommand: rec.server.installCommand
                                }))
                            }, null, 2)
                        }]
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error generating recommendations: ${error.message}`
                        }]
                    };
                }
            }
        );

        // Tool 3: Search MCP servers
        this.server.tool(
            'search-mcp-servers',
            'Search through available MCP servers by name, description, or category',
            {
                query: z.string().describe("Search query to find MCP servers"),
                maxResults: z.number().optional().default(20).describe("Maximum number of results to return")
            },
            async ({ query, maxResults = 20 }) => {
                try {
                    const results = this.searchMCPServers(query).slice(0, maxResults);
                    
                    return {
                        content: [{
                            type: "text",
                            text: JSON.stringify({
                                query,
                                totalResults: results.length,
                                results: results.map(result => ({
                                    name: result.server.name,
                                    key: result.key,
                                    description: result.server.description,
                                    category: result.server.category,
                                    package: result.server.package,
                                    installCommand: result.server.installCommand
                                }))
                            }, null, 2)
                        }]
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error searching MCP servers: ${error.message}`
                        }]
                    };
                }
            }
        );

        // Tool 4: Get MCP server info
        this.server.tool(
            'get-mcp-server-info',
            'Get detailed information about a specific MCP server',
            {
                serverKey: z.string().describe("The key/identifier of the MCP server")
            },
            async ({ serverKey }) => {
                try {
                    const server = this.mcpDatabase[serverKey];
                    
                    if (!server) {
                        return {
                            content: [{
                                type: "text",
                                text: `MCP server with key "${serverKey}" not found. Use search-mcp-servers to find available servers.`
                            }]
                        };
                    }
                    
                    return {
                        content: [{
                            type: "text",
                            text: JSON.stringify({
                                key: serverKey,
                                ...server
                            }, null, 2)
                        }]
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error getting server info: ${error.message}`
                        }]
                    };
                }
            }
        );
    }

    async start() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('Tech Stack & MCP Recommender Server started');
    }
}

// Start the server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const server = new TechStackMCPServer();
    server.start().catch(error => {
        console.error('Failed to start MCP server:', error);
        process.exit(1);
    });
}

export default TechStackMCPServer;