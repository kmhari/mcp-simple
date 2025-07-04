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
            version: "1.2.0"
        });
        
        this.mcpDatabase = this.loadMCPDatabase();
        this.setupTools();
        this.setupPrompts();
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
        // Tool 1: Recommend MCP servers
        this.server.tool(
            'recommend-mcp-servers',
            'Recommend MCP servers based on provided technology stack information',
            {
                techStack: z.object({
                    languages: z.array(z.string()).optional().default([]).describe("Programming languages used"),
                    frameworks: z.array(z.string()).optional().default([]).describe("Frameworks and libraries used"),
                    databases: z.array(z.string()).optional().default([]).describe("Database technologies used"),
                    tools: z.array(z.string()).optional().default([]).describe("Development tools used"),
                    deployment: z.array(z.string()).optional().default([]).describe("Deployment technologies used")
                }).describe("Technology stack information from analysis"),
                maxRecommendations: z.number().optional().default(10).describe("Maximum number of recommendations to return")
            },
            async ({ techStack, maxRecommendations = 10 }) => {
                try {
                    // Convert input format to internal format
                    const formattedTechStack = {
                        languages: techStack.languages || [],
                        frameworks: techStack.frameworks || [],
                        databases: techStack.databases || [],
                        tools: techStack.tools || [],
                        deployment: techStack.deployment || [],
                        confidence: {}
                    };

                    // Calculate confidence scores
                    Object.keys(formattedTechStack).forEach(category => {
                        if (Array.isArray(formattedTechStack[category])) {
                            formattedTechStack.confidence[category] = formattedTechStack[category].length > 0 ? 
                                Math.min(formattedTechStack[category].length * 0.3 + 0.7, 1.0) : 0;
                        }
                    });

                    const recommendations = this.recommendMCPServers(formattedTechStack).slice(0, maxRecommendations);
                    
                    return {
                        content: [{
                            type: "text",
                            text: JSON.stringify({
                                providedTechStack: {
                                    languages: techStack.languages,
                                    frameworks: techStack.frameworks,
                                    databases: techStack.databases,
                                    tools: techStack.tools,
                                    deployment: techStack.deployment
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

        // Tool 2: Search MCP servers
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

        // Tool 3: Get MCP server info
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

        // Tool 4: Install MCP server
        this.server.tool(
            'install-mcp-server',
            'Install an MCP server to the local .mcp.json configuration',
            {
                serverKey: z.string().describe("The key/identifier of the MCP server to install"),
                serverName: z.string().optional().describe("Custom name for the server instance"),
                envVars: z.record(z.string()).optional().describe("Environment variables for the server"),
                confirmed: z.boolean().optional().default(false).describe("Whether installation has been confirmed")
            },
            async ({ serverKey, serverName, envVars = {}, confirmed = false }) => {
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

                    // Check if confirmation is needed
                    if (!confirmed) {
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify({
                                    action: "confirmation_required",
                                    server: {
                                        key: serverKey,
                                        name: server.name,
                                        description: server.description,
                                        installCommand: server.installCommand,
                                        requiredEnvVars: server.requiredEnvVars || [],
                                        optionalParams: server.optionalParams || []
                                    },
                                    message: "Please confirm installation of this MCP server by calling this tool again with confirmed: true",
                                    environmentVariables: server.requiredEnvVars || []
                                }, null, 2)
                            }]
                        };
                    }

                    // Load existing .mcp.json configuration
                    const mcpConfigPath = path.join(process.cwd(), '.mcp.json');
                    let mcpConfig = { mcpServers: {} };
                    
                    if (fs.existsSync(mcpConfigPath)) {
                        try {
                            const content = fs.readFileSync(mcpConfigPath, 'utf8');
                            mcpConfig = JSON.parse(content);
                            if (!mcpConfig.mcpServers) {
                                mcpConfig.mcpServers = {};
                            }
                        } catch (parseError) {
                            return {
                                content: [{
                                    type: "text",
                                    text: `Error reading existing .mcp.json: ${parseError.message}`
                                }]
                            };
                        }
                    }

                    // Determine server configuration
                    const finalServerName = serverName || serverKey;
                    const serverConfig = {
                        command: server.installCommand.split(' ')[0],
                        args: server.installCommand.split(' ').slice(1),
                        env: { ...envVars }
                    };

                    // Add required environment variables if provided
                    if (server.requiredEnvVars && server.requiredEnvVars.length > 0) {
                        const missingVars = server.requiredEnvVars.filter(varName => !envVars[varName]);
                        if (missingVars.length > 0) {
                            return {
                                content: [{
                                    type: "text",
                                    text: JSON.stringify({
                                        action: "environment_variables_required",
                                        missingVariables: missingVars,
                                        message: `The following environment variables are required: ${missingVars.join(', ')}`
                                    }, null, 2)
                                }]
                            };
                        }
                    }

                    // Install the server
                    mcpConfig.mcpServers[finalServerName] = serverConfig;

                    // Write updated configuration
                    fs.writeFileSync(mcpConfigPath, JSON.stringify(mcpConfig, null, 2));

                    return {
                        content: [{
                            type: "text",
                            text: JSON.stringify({
                                action: "installation_successful",
                                serverName: finalServerName,
                                serverKey: serverKey,
                                configuration: serverConfig,
                                configurationFile: mcpConfigPath,
                                message: `Successfully installed ${server.name} as "${finalServerName}" in .mcp.json`
                            }, null, 2)
                        }]
                    };

                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error installing MCP server: ${error.message}`
                        }]
                    };
                }
            }
        );
    }

    setupPrompts() {
        // Tech Stack Analysis Prompts
        this.server.prompt(
            'analyze-tech-stack',
            'Analyze a project directory to detect technology stack and provide detailed insights',
            {
                projectPath: z.string().optional().describe("Path to the project directory"),
                analysisDepth: z.enum(['basic', 'detailed', 'comprehensive']).optional().default('detailed').describe("Level of analysis depth"),
                includeRecommendations: z.boolean().optional().default(true).describe("Whether to include MCP server recommendations")
            },
            async (args) => {
                const { projectPath = ".", analysisDepth = "detailed", includeRecommendations = true } = args;
                
                let prompt = `# Tech Stack Analysis

## Instructions
Analyze the project at "${projectPath}" to detect the technology stack. `;

                switch (analysisDepth) {
                    case 'basic':
                        prompt += `Provide a basic overview of:
- Primary programming languages
- Main frameworks/libraries
- Package manager used
- Basic project structure`;
                        break;
                    case 'detailed':
                        prompt += `Provide a detailed analysis including:
- Programming languages with versions (if detectable)
- Frameworks and libraries with their purposes
- Database technologies
- Build tools and bundlers
- Development tools and linting
- Testing frameworks
- Deployment configurations
- Environment and configuration management`;
                        break;
                    case 'comprehensive':
                        prompt += `Provide a comprehensive analysis covering:
- Complete technology inventory with versions
- Architecture patterns and design decisions
- Development workflow and toolchain
- Performance and optimization tools
- Security and authentication mechanisms
- Monitoring and logging solutions
- CI/CD pipeline configuration
- Infrastructure and deployment strategy
- Dependency analysis and potential risks
- Best practices adherence assessment`;
                        break;
                }

                prompt += `

## Analysis Guidelines
1. **Evidence-Based**: Only report technologies you can verify from files
2. **Confidence Levels**: Indicate confidence (High/Medium/Low) for each detection
3. **File Evidence**: Cite specific files that led to each conclusion
4. **Patterns**: Look for common patterns and conventions
5. **Ecosystem**: Consider the broader ecosystem and typical tech combinations

## Files to Examine
- \`package.json\` / \`package-lock.json\` (Node.js)
- \`requirements.txt\` / \`pyproject.toml\` / \`setup.py\` (Python)
- \`Cargo.toml\` (Rust)
- \`go.mod\` (Go)
- \`pom.xml\` / \`build.gradle\` (Java)
- \`Gemfile\` (Ruby)
- \`composer.json\` (PHP)
- Configuration files (\`.env\`, \`config/\`, etc.)
- Docker files
- CI/CD configurations
- README files and documentation

## Output Format
Structure your analysis as:

### 🔍 Technology Stack Detection

**Languages & Runtimes:**
- [Language]: [Version] - [Confidence] - [Evidence File]

**Frameworks & Libraries:**
- [Framework]: [Purpose] - [Confidence] - [Evidence File]

**Data & Storage:**
- [Technology]: [Usage] - [Confidence] - [Evidence File]

**Development Tools:**
- [Tool]: [Purpose] - [Confidence] - [Evidence File]

**Deployment & Infrastructure:**
- [Technology]: [Configuration] - [Confidence] - [Evidence File]

### 📊 Analysis Summary
- **Primary Stack**: [Brief description]
- **Architecture Type**: [e.g., Monolith, Microservices, JAMstack]
- **Deployment Target**: [e.g., Cloud, On-premise, Serverless]
- **Maturity Level**: [e.g., Prototype, Production-ready, Enterprise]`;

                if (includeRecommendations) {
                    prompt += `

### 🚀 MCP Server Recommendations
Based on the detected technology stack, recommend specific MCP servers that would be most beneficial for this project. For each recommendation, explain:
- **Server Name**: The MCP server to install
- **Relevance**: Why it's useful for this specific tech stack
- **Use Cases**: Specific scenarios where it would help
- **Priority**: High/Medium/Low based on project needs

Focus on servers that complement the detected technologies and development workflow.`;
                }

                return {
                    messages: [
                        {
                            role: "user",
                            content: {
                                type: "text",
                                text: prompt
                            }
                        }
                    ]
                };
            }
        );

        // MCP Server Discovery Prompt
        this.server.prompt(
            'discover-mcp-servers',
            'Find and recommend MCP servers for specific technologies or use cases',
            {
                technology: z.string().describe("Technology or use case to find MCP servers for"),
                projectType: z.enum(['web', 'mobile', 'desktop', 'api', 'data', 'ml', 'devops', 'general']).optional().describe("Type of project"),
                includeSetup: z.boolean().optional().default(true).describe("Include setup instructions")
            },
            async (args) => {
                const { technology, projectType, includeSetup = true } = args;
                
                let prompt = `# MCP Server Discovery for ${technology}

## Instructions
Find and recommend MCP servers that are specifically useful for working with ${technology}`;
                
                if (projectType) {
                    prompt += ` in ${projectType} projects`;
                }

                prompt += `.

## Search Strategy
1. **Direct Matches**: Look for servers explicitly designed for ${technology}
2. **Ecosystem Compatibility**: Find servers that work well with ${technology} ecosystem
3. **Workflow Enhancement**: Identify servers that improve ${technology} development workflow
4. **Integration Options**: Consider servers that can integrate with ${technology} toolchain

## Evaluation Criteria
For each MCP server recommendation, assess:
- **Relevance**: How directly it relates to ${technology}
- **Maturity**: Stability and maintenance status
- **Features**: Key capabilities and tools provided
- **Setup Complexity**: How easy it is to configure
- **Community**: Documentation and support quality

## Output Format

### 🎯 Recommended MCP Servers for ${technology}

**High Priority Servers:**
[List 2-3 most essential servers]

**Medium Priority Servers:**
[List 3-5 useful servers]

**Specialized Servers:**
[List any niche or advanced servers]

For each server, provide:

#### [Server Name]
- **Package**: \`[npm package or installation command]\`
- **Description**: [What it does]
- **Key Features**: [Main capabilities]
- **Use Cases**: [When to use it]
- **${technology} Integration**: [How it specifically helps with ${technology}]`;

                if (includeSetup) {
                    prompt += `
- **Setup**: [Basic configuration steps]`;
                }

                prompt += `
- **Priority**: [High/Medium/Low]

### 🔧 Recommended Configuration

Provide a sample MCP configuration that includes the most important servers for ${technology} development:

\`\`\`json
{
  "mcpServers": {
    // Include 2-3 key servers with basic configuration
  }
}
\`\`\`

### 💡 Pro Tips
- Workflow optimization suggestions
- Common pitfalls to avoid
- Best practices for ${technology} + MCP integration`;

                return {
                    messages: [
                        {
                            role: "user",
                            content: {
                                type: "text",
                                text: prompt
                            }
                        }
                    ]
                };
            }
        );

        // Project Setup Assistant Prompt
        this.server.prompt(
            'setup-project-mcp',
            'Get guidance on setting up MCP servers for a new or existing project',
            {
                projectDescription: z.string().describe("Brief description of the project"),
                teamSize: z.enum(['solo', 'small', 'medium', 'large']).optional().describe("Size of the development team"),
                experience: z.enum(['beginner', 'intermediate', 'advanced']).optional().describe("Team's MCP experience level"),
                priorities: z.array(z.enum(['productivity', 'debugging', 'testing', 'deployment', 'monitoring', 'documentation'])).optional().describe("Development priorities")
            },
            async (args) => {
                const { projectDescription, teamSize, experience, priorities } = args;
                
                let prompt = `# MCP Setup Assistant

## Project Context
**Description**: ${projectDescription}`;
                
                if (teamSize) prompt += `\n**Team Size**: ${teamSize}`;
                if (experience) prompt += `\n**MCP Experience**: ${experience}`;
                if (priorities && priorities.length > 0) prompt += `\n**Priorities**: ${priorities.join(', ')}`;

                prompt += `

## Instructions
Provide a comprehensive guide for setting up MCP servers for this project. Consider the project requirements, team dynamics, and stated priorities.

## Assessment Areas

### 1. Project Analysis
Based on the project description, analyze:
- **Technology Requirements**: What technologies are likely involved?
- **Development Challenges**: What common challenges might the team face?
- **Workflow Needs**: What development workflows would benefit from MCP servers?

### 2. Team Considerations`;
                
                if (teamSize) {
                    switch (teamSize) {
                        case 'solo':
                            prompt += `\n- Focus on productivity and automation servers
- Emphasize tools that reduce manual work
- Consider servers that help with documentation and knowledge retention`;
                            break;
                        case 'small':
                            prompt += `\n- Balance individual productivity with collaboration tools
- Include servers that help with code review and standards
- Consider knowledge sharing and documentation servers`;
                            break;
                        case 'medium':
                            prompt += `\n- Emphasize standardization and consistency
- Include project management and tracking servers
- Focus on servers that scale team coordination`;
                            break;
                        case 'large':
                            prompt += `\n- Prioritize enterprise-grade servers with robust features
- Include comprehensive monitoring and analytics
- Focus on servers that support complex workflows`;
                            break;
                    }
                }

                if (experience) {
                    prompt += `\n\n### 3. Experience-Based Recommendations`;
                    switch (experience) {
                        case 'beginner':
                            prompt += `\n- Start with essential, well-documented servers
- Provide detailed setup instructions
- Focus on servers with good learning resources
- Recommend gradual adoption approach`;
                            break;
                        case 'intermediate':
                            prompt += `\n- Include moderately complex servers with advanced features
- Balance ease of use with powerful capabilities
- Suggest optimization opportunities
- Provide best practices guidance`;
                            break;
                        case 'advanced':
                            prompt += `\n- Include cutting-edge and specialized servers
- Focus on advanced integration possibilities
- Suggest custom configurations and optimizations
- Provide architectural guidance`;
                            break;
                    }
                }

                prompt += `

## Output Format

### 🎯 Recommended MCP Server Stack

#### Phase 1: Essential Setup (Start Here)
[2-3 must-have servers for immediate productivity]

#### Phase 2: Enhanced Workflow (Add When Ready)
[3-4 servers that significantly improve development workflow]

#### Phase 3: Advanced Features (Optional/Future)
[2-3 specialized servers for advanced use cases]

### 📋 Implementation Plan

#### Week 1: Foundation
- [ ] Install and configure Phase 1 servers
- [ ] Team training on basic MCP usage
- [ ] Document initial configuration

#### Week 2-3: Integration
- [ ] Add Phase 2 servers gradually
- [ ] Establish team workflows and conventions
- [ ] Monitor usage and gather feedback

#### Ongoing: Optimization
- [ ] Evaluate Phase 3 servers based on needs
- [ ] Optimize configurations based on usage patterns
- [ ] Regular review and updates

### ⚙️ Configuration Templates

Provide ready-to-use configuration snippets for each recommended server.

### 🚀 Success Metrics
Define how to measure the success of the MCP implementation:
- Productivity indicators to track
- Team satisfaction metrics
- Technical performance measures

### 🔧 Troubleshooting Guide
Common issues and solutions for the recommended setup.`;

                return {
                    messages: [
                        {
                            role: "user",
                            content: {
                                type: "text",
                                text: prompt
                            }
                        }
                    ]
                };
            }
        );

        // Installation Confirmation Prompt
        this.server.prompt(
            'confirm-installation',
            'Get user confirmation before installing MCP servers with required environment variables and setup details',
            {
                servers: z.array(z.object({
                    key: z.string(),
                    name: z.string(),
                    description: z.string(),
                    installCommand: z.string(),
                    requiredEnvVars: z.array(z.string()).optional(),
                    optionalParams: z.array(z.string()).optional()
                })).describe("Array of MCP servers to confirm for installation"),
                projectContext: z.string().optional().describe("Brief description of the project context")
            },
            async (args) => {
                const { servers, projectContext } = args;
                
                let prompt = `# MCP Server Installation Confirmation

## Project Context
${projectContext || "Installing MCP servers for current project"}

## Servers to Install
The following MCP servers have been recommended for your project:

`;

                servers.forEach((server, index) => {
                    prompt += `### ${index + 1}. ${server.name}
**Description**: ${server.description}
**Install Command**: \`${server.installCommand}\`
`;
                    
                    if (server.requiredEnvVars && server.requiredEnvVars.length > 0) {
                        prompt += `**Required Environment Variables**: ${server.requiredEnvVars.join(', ')}\n`;
                    }
                    
                    if (server.optionalParams && server.optionalParams.length > 0) {
                        prompt += `**Optional Parameters**: ${server.optionalParams.join(', ')}\n`;
                    }
                    
                    prompt += '\n';
                });

                prompt += `## Next Steps

Please review the servers above and confirm which ones you'd like to install:

### For servers with no required environment variables:
Use the \`install-mcp-server\` tool directly:
\`\`\`
install-mcp-server(serverKey: "server-key", confirmed: true)
\`\`\`

### For servers requiring environment variables:
1. First gather the required environment variables
2. Use the \`install-mcp-server\` tool with environment variables:
\`\`\`
install-mcp-server(
  serverKey: "server-key", 
  envVars: {"VAR_NAME": "value"}, 
  confirmed: true
)
\`\`\`

### Installation Order Recommendation:
1. **Start with zero-config servers** (no environment variables required)
2. **Install essential development tools** (git, filesystem, memory)
3. **Add project-specific servers** (database, API, framework-specific)
4. **Install optional enhancement servers** last

Would you like me to proceed with installing any of these servers? Please specify which servers and provide any required environment variables.`;

                return {
                    messages: [
                        {
                            role: "user",
                            content: {
                                type: "text",
                                text: prompt
                            }
                        }
                    ]
                };
            }
        );

        // Quick Tech Stack Assessment Prompt
        this.server.prompt(
            'quick-tech-assessment',
            'Get a rapid assessment of a project\'s technology stack with minimal information',
            {
                indicators: z.string().describe("Any available indicators like file names, folder structure, or known technologies"),
                purpose: z.enum(['mcp-recommendations', 'general-analysis', 'migration-planning', 'documentation']).optional().default('mcp-recommendations').describe("Purpose of the assessment")
            },
            async (args) => {
                const { indicators, purpose = 'mcp-recommendations' } = args;
                
                let prompt = `# Quick Tech Stack Assessment

## Available Information
${indicators}

## Assessment Task
Based on the limited information provided, make educated inferences about the project's technology stack.`;

                switch (purpose) {
                    case 'mcp-recommendations':
                        prompt += ` Focus on identifying technologies that would benefit from specific MCP servers.`;
                        break;
                    case 'general-analysis':
                        prompt += ` Provide a general overview of the likely technology choices and architecture.`;
                        break;
                    case 'migration-planning':
                        prompt += ` Assess the current stack for potential migration opportunities and challenges.`;
                        break;
                    case 'documentation':
                        prompt += ` Create documentation-ready descriptions of the technology stack.`;
                        break;
                }

                prompt += `

## Analysis Approach
1. **Pattern Recognition**: Identify common patterns from the indicators
2. **Ecosystem Inference**: Deduce likely companion technologies
3. **Best Guesses**: Make informed assumptions based on industry standards
4. **Confidence Rating**: Rate each inference as High/Medium/Low confidence

## Output Format

### 🎯 Quick Assessment Results

**Most Likely Technologies:**
- [Technology]: [Reasoning] - [Confidence Level]

**Probable Architecture:**
- [Architecture Pattern]: [Evidence/Reasoning]

**Likely Ecosystem:**
- [Related Technologies]: [Why they're probably present]

### ⚡ Rapid Insights`;

                if (purpose === 'mcp-recommendations') {
                    prompt += `

**Immediate MCP Opportunities:**
- [MCP Server]: [Why it would help]

**Quick Wins:**
- Servers that could provide immediate value
- Low-effort, high-impact recommendations

**Investigation Needed:**
- Areas where more information would significantly improve recommendations`;
                } else {
                    prompt += `

**Key Findings:**
- Most significant technology choices
- Architectural implications
- Potential areas of concern or opportunity`;
                }

                prompt += `

### 🔍 Verification Steps
To confirm these assessments:
1. [Specific files to check]
2. [Commands to run]
3. [Questions to ask the development team]

### 📝 Next Steps
Recommended actions based on this quick assessment.`;

                return {
                    messages: [
                        {
                            role: "user",
                            content: {
                                type: "text",
                                text: prompt
                            }
                        }
                    ]
                };
            }
        );
    }

    async start() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
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