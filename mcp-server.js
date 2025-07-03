#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs';
import path from 'path';

const SERVER_INFO = {
  name: 'mcp-tech-stack-advisor',
  version: '1.0.0',
  description: 'MCP server that detects tech stacks and recommends relevant MCP servers'
};

const TOOLS = [
  {
    name: 'detect_tech_stack',
    description: 'Analyze a project directory to detect the technologies and frameworks used',
    inputSchema: {
      type: 'object',
      properties: {
        project_path: {
          type: 'string',
          description: 'Path to the project directory (defaults to current directory)'
        }
      }
    }
  },
  {
    name: 'recommend_mcp_servers',
    description: 'Recommend MCP servers based on detected tech stack',
    inputSchema: {
      type: 'object',
      properties: {
        tech_stack: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of detected technologies'
        },
        context: {
          type: 'string',
          description: 'Additional context about the project or specific needs'
        }
      },
      required: ['tech_stack']
    }
  },
  {
    name: 'query_mcp_database',
    description: 'Search the MCP servers database for specific servers or categories',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query for MCP servers'
        },
        category: {
          type: 'string',
          description: 'Filter by category (e.g., database, filesystem, api)'
        }
      },
      required: ['query']
    }
  }
];

class TechStackAdvisorServer {
  constructor() {
    this.server = new Server(SERVER_INFO, {
      capabilities: {
        tools: {}
      }
    });
    
    this.setupHandlers();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: TOOLS
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      try {
        switch (name) {
          case 'detect_tech_stack':
            return await this.detectTechStack(args);
          case 'recommend_mcp_servers':
            return await this.recommendMcpServers(args);
          case 'query_mcp_database':
            return await this.queryMcpDatabase(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `Error: ${error.message}`
          }],
          isError: true
        };
      }
    });
  }

  async detectTechStack(args) {
    const projectPath = args.project_path || process.cwd();
    
    if (!fs.existsSync(projectPath)) {
      throw new Error(`Project path does not exist: ${projectPath}`);
    }

    const detectedTech = {
      languages: [],
      frameworks: [],
      databases: [],
      tools: [],
      environment: []
    };

    const files = fs.readdirSync(projectPath);
    
    // Check for package managers and config files
    const packageFiles = {
      'package.json': () => this.analyzePackageJson(projectPath),
      'requirements.txt': () => (['python']),
      'pyproject.toml': () => (['python']),
      'Pipfile': () => (['python']),
      'Cargo.toml': () => (['rust']),
      'go.mod': () => (['go']),
      'pom.xml': () => (['java']),
      'build.gradle': () => (['java']),
      'composer.json': () => (['php']),
      'Gemfile': () => (['ruby']),
      'Dockerfile': () => (['docker']),
      'docker-compose.yml': () => (['docker']),
      'docker-compose.yaml': () => (['docker']),
      '.env': () => (['environment-variables']),
      '.gitignore': () => (['git'])
    };

    // Analyze files
    for (const file of files) {
      if (packageFiles[file]) {
        const tech = packageFiles[file]();
        detectedTech.languages.push(...tech.filter(t => 
          ['javascript', 'typescript', 'python', 'rust', 'go', 'java', 'php', 'ruby'].includes(t)
        ));
        detectedTech.tools.push(...tech.filter(t => 
          ['docker', 'git', 'environment-variables'].includes(t)
        ));
      }
    }

    // Check for common directory structures
    const directories = files.filter(f => {
      const stat = fs.statSync(path.join(projectPath, f));
      return stat.isDirectory();
    });

    const dirPatterns = {
      'src': ['structured-project'],
      'components': ['frontend'],
      'pages': ['nextjs', 'frontend'],
      'app': ['nextjs', 'rails'],
      'migrations': ['database'],
      'models': ['database', 'orm'],
      'views': ['web-framework'],
      'controllers': ['mvc-framework'],
      'static': ['web-framework'],
      'public': ['web-framework'],
      'dist': ['build-tool'],
      'build': ['build-tool'],
      'node_modules': ['nodejs'],
      'venv': ['python'],
      'env': ['python'],
      '.git': ['git']
    };

    for (const dir of directories) {
      if (dirPatterns[dir]) {
        detectedTech.frameworks.push(...dirPatterns[dir]);
      }
    }

    // Remove duplicates and categorize
    Object.keys(detectedTech).forEach(key => {
      detectedTech[key] = [...new Set(detectedTech[key])];
    });

    const result = {
      path: projectPath,
      technologies: detectedTech,
      summary: this.generateTechSummary(detectedTech)
    };

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result, null, 2)
      }]
    };
  }

  analyzePackageJson(projectPath) {
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) return [];

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    const detected = ['javascript'];

    // Check for TypeScript
    if (dependencies.typescript || dependencies['@types/node']) {
      detected.push('typescript');
    }

    // Check for frameworks
    if (dependencies.react) detected.push('react');
    if (dependencies.vue) detected.push('vue');
    if (dependencies.angular) detected.push('angular');
    if (dependencies.next) detected.push('nextjs');
    if (dependencies.express) detected.push('express');
    if (dependencies.nestjs) detected.push('nestjs');
    if (dependencies.fastify) detected.push('fastify');
    if (dependencies.koa) detected.push('koa');

    // Check for databases
    if (dependencies.pg || dependencies.postgres) detected.push('postgresql');
    if (dependencies.mysql || dependencies.mysql2) detected.push('mysql');
    if (dependencies.sqlite || dependencies.sqlite3) detected.push('sqlite');
    if (dependencies.mongodb || dependencies.mongoose) detected.push('mongodb');
    if (dependencies.redis) detected.push('redis');

    // Check for tools
    if (dependencies.webpack) detected.push('webpack');
    if (dependencies.vite) detected.push('vite');
    if (dependencies.jest) detected.push('jest');
    if (dependencies.mocha) detected.push('mocha');
    if (dependencies.cypress) detected.push('cypress');
    if (dependencies.playwright) detected.push('playwright');

    return detected;
  }

  generateTechSummary(detectedTech) {
    const summary = [];
    
    if (detectedTech.languages.length > 0) {
      summary.push(`Languages: ${detectedTech.languages.join(', ')}`);
    }
    
    if (detectedTech.frameworks.length > 0) {
      summary.push(`Frameworks: ${detectedTech.frameworks.join(', ')}`);
    }
    
    if (detectedTech.databases.length > 0) {
      summary.push(`Databases: ${detectedTech.databases.join(', ')}`);
    }
    
    if (detectedTech.tools.length > 0) {
      summary.push(`Tools: ${detectedTech.tools.join(', ')}`);
    }

    return summary.join(' | ');
  }

  async recommendMcpServers(args) {
    const { tech_stack, context } = args;
    
    if (!tech_stack || !Array.isArray(tech_stack)) {
      throw new Error('tech_stack must be an array of technologies');
    }

    // Load MCP servers database
    const databasePath = path.join(process.cwd(), 'mcp-servers-database.json');
    if (!fs.existsSync(databasePath)) {
      throw new Error('MCP servers database not found');
    }

    const serversDatabase = JSON.parse(fs.readFileSync(databasePath, 'utf8'));
    const recommendations = [];

    // Define tech stack to MCP server mappings
    const techMappings = {
      // Database technologies
      'postgresql': ['postgres', 'postgresql'],
      'mysql': ['mysql'],
      'sqlite': ['sqlite'],
      'mongodb': ['mongodb'],
      'redis': ['redis'],
      
      // Frontend frameworks
      'react': ['playwright', 'filesystem', 'git'],
      'vue': ['playwright', 'filesystem', 'git'],
      'angular': ['playwright', 'filesystem', 'git'],
      'nextjs': ['playwright', 'filesystem', 'git'],
      
      // Backend frameworks
      'express': ['filesystem', 'git'],
      'fastify': ['filesystem', 'git'],
      'nestjs': ['filesystem', 'git'],
      'django': ['postgresql', 'filesystem', 'git'],
      'flask': ['postgresql', 'sqlite', 'filesystem', 'git'],
      
      // Languages
      'javascript': ['filesystem', 'git', 'playwright'],
      'typescript': ['filesystem', 'git', 'playwright'],
      'python': ['filesystem', 'git'],
      'rust': ['filesystem', 'git'],
      'go': ['filesystem', 'git'],
      'java': ['filesystem', 'git'],
      'php': ['mysql', 'filesystem', 'git'],
      'ruby': ['postgresql', 'filesystem', 'git'],
      
      // Tools and environments
      'docker': ['kubernetes', 'aws'],
      'git': ['git'],
      'playwright': ['playwright'],
      'jest': ['playwright'],
      'cypress': ['playwright'],
      'frontend': ['playwright'],
      'web-framework': ['playwright', 'fetch'],
      'database': ['postgresql', 'mysql', 'sqlite'],
      'environment-variables': ['filesystem']
    };

    // Calculate scores for each server
    const serverScores = {};
    
    for (const tech of tech_stack) {
      const recommendedServers = techMappings[tech.toLowerCase()] || [];
      
      for (const serverKey of recommendedServers) {
        if (serversDatabase[serverKey]) {
          if (!serverScores[serverKey]) {
            serverScores[serverKey] = {
              score: 0,
              reasons: [],
              server: serversDatabase[serverKey]
            };
          }
          serverScores[serverKey].score += 1;
          serverScores[serverKey].reasons.push(`Supports ${tech}`);
        }
      }
    }

    // Add context-based recommendations
    if (context) {
      const contextLower = context.toLowerCase();
      
      for (const [key, server] of Object.entries(serversDatabase)) {
        const description = server.description.toLowerCase();
        const category = server.category.toLowerCase();
        
        if (description.includes(contextLower) || category.includes(contextLower)) {
          if (!serverScores[key]) {
            serverScores[key] = {
              score: 0,
              reasons: [],
              server: server
            };
          }
          serverScores[key].score += 0.5;
          serverScores[key].reasons.push(`Matches context: ${context}`);
        }
      }
    }

    // Sort by score and prepare recommendations
    const sortedServers = Object.entries(serverScores)
      .sort(([,a], [,b]) => b.score - a.score)
      .slice(0, 10); // Top 10 recommendations

    for (const [key, data] of sortedServers) {
      const server = data.server;
      recommendations.push({
        name: server.name,
        package: server.package,
        description: server.description,
        category: server.category,
        score: data.score,
        reasons: data.reasons,
        installCommand: server.installCommand,
        requiredEnvVars: server.requiredEnvVars,
        usageInstructions: server.usageInstructions,
        githubLink: server.githubLink
      });
    }

    // Add some essential servers if none were recommended
    if (recommendations.length === 0) {
      const essentialServers = ['filesystem', 'git'];
      for (const key of essentialServers) {
        if (serversDatabase[key]) {
          const server = serversDatabase[key];
          recommendations.push({
            name: server.name,
            package: server.package,
            description: server.description,
            category: server.category,
            score: 0.1,
            reasons: ['Essential for most projects'],
            installCommand: server.installCommand,
            requiredEnvVars: server.requiredEnvVars,
            usageInstructions: server.usageInstructions,
            githubLink: server.githubLink
          });
        }
      }
    }

    const result = {
      tech_stack,
      context: context || null,
      recommendations,
      summary: `Found ${recommendations.length} relevant MCP servers for your tech stack`
    };

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result, null, 2)
      }]
    };
  }

  async queryMcpDatabase(args) {
    const { query, category } = args;
    
    if (!query || typeof query !== 'string') {
      throw new Error('query must be a non-empty string');
    }

    // Load MCP servers database
    const databasePath = path.join(process.cwd(), 'mcp-servers-database.json');
    if (!fs.existsSync(databasePath)) {
      throw new Error('MCP servers database not found');
    }

    const serversDatabase = JSON.parse(fs.readFileSync(databasePath, 'utf8'));
    const results = [];
    const queryLower = query.toLowerCase();
    const categoryLower = category ? category.toLowerCase() : null;

    // Search through all servers
    for (const [key, server] of Object.entries(serversDatabase)) {
      let score = 0;
      const matchReasons = [];

      // Category filter
      if (categoryLower && !server.category.toLowerCase().includes(categoryLower)) {
        continue;
      }

      // Search in name (highest weight)
      if (server.name.toLowerCase().includes(queryLower)) {
        score += 10;
        matchReasons.push('Name match');
      }

      // Search in description (medium weight)
      if (server.description.toLowerCase().includes(queryLower)) {
        score += 5;
        matchReasons.push('Description match');
      }

      // Search in category (medium weight)
      if (server.category.toLowerCase().includes(queryLower)) {
        score += 5;
        matchReasons.push('Category match');
      }

      // Search in package name (medium weight)
      if (server.package && server.package.toLowerCase().includes(queryLower)) {
        score += 5;
        matchReasons.push('Package name match');
      }

      // Search in usage instructions (low weight)
      if (server.usageInstructions && server.usageInstructions.toLowerCase().includes(queryLower)) {
        score += 2;
        matchReasons.push('Usage instructions match');
      }

      // Fuzzy matching for common typos and variations
      const fuzzyMatches = this.fuzzyMatch(queryLower, server);
      if (fuzzyMatches.length > 0) {
        score += 1;
        matchReasons.push(...fuzzyMatches);
      }

      // Add to results if any match found
      if (score > 0) {
        results.push({
          key,
          name: server.name,
          package: server.package,
          description: server.description,
          category: server.category,
          installCommand: server.installCommand,
          requiredEnvVars: server.requiredEnvVars,
          usageInstructions: server.usageInstructions,
          githubLink: server.githubLink,
          score,
          matchReasons
        });
      }
    }

    // Sort by relevance score
    results.sort((a, b) => b.score - a.score);

    // Limit to top 20 results
    const limitedResults = results.slice(0, 20);

    const result = {
      query,
      category: category || null,
      totalMatches: results.length,
      showing: limitedResults.length,
      results: limitedResults
    };

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result, null, 2)
      }]
    };
  }

  fuzzyMatch(query, server) {
    const matches = [];
    const text = `${server.name} ${server.description} ${server.category}`.toLowerCase();
    
    // Common technology aliases and variations
    const aliases = {
      'postgres': ['postgresql', 'pg'],
      'postgresql': ['postgres', 'pg'],
      'mysql': ['mariadb'],
      'javascript': ['js', 'node'],
      'typescript': ['ts'],
      'database': ['db', 'sql'],
      'filesystem': ['file', 'fs'],
      'kubernetes': ['k8s', 'kube'],
      'docker': ['container'],
      'github': ['git'],
      'authentication': ['auth', 'login'],
      'playwright': ['browser', 'automation'],
      'web': ['http', 'browser']
    };

    // Check for alias matches
    for (const [canonical, variants] of Object.entries(aliases)) {
      if (query.includes(canonical) && variants.some(variant => text.includes(variant))) {
        matches.push(`Fuzzy match: ${canonical}`);
      } else if (variants.includes(query) && text.includes(canonical)) {
        matches.push(`Fuzzy match: ${canonical}`);
      }
    }

    // Check for partial word matches
    const queryWords = query.split(' ');
    const textWords = text.split(/\s+/);
    
    for (const queryWord of queryWords) {
      if (queryWord.length >= 3) {
        for (const textWord of textWords) {
          if (textWord.includes(queryWord) && !text.includes(query)) {
            matches.push(`Partial word match: ${queryWord}`);
            break;
          }
        }
      }
    }

    return [...new Set(matches)]; // Remove duplicates
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('MCP Tech Stack Advisor Server running on stdio');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const server = new TechStackAdvisorServer();
  server.run().catch(console.error);
}

export { TechStackAdvisorServer };