# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MCP (Model Context Protocol) Server Manager with dual functionality:

1. **Interactive CLI tool** for managing MCP server configurations (original functionality)
2. **MCP Server** that helps agents discover tech stacks and recommend relevant MCP servers (new functionality)

The tool helps users add, remove, and configure MCP servers by updating the `.mcp.json` configuration file, and also provides an MCP server that other agents can use to get intelligent recommendations.

## Core Architecture

**Single-file application**: `@oglabs/mcp.js` contains the entire application logic in a single `MCPManager` class.

**Key Components**:
- **MCPManager class**: Main application controller that handles the interactive CLI interface
- **Configuration management**: Reads/writes `.mcp.json` files in the current working directory
- **Pre-configured servers**: Built-in definitions for PostgreSQL, Redis, and SQLite MCP servers
- **Interactive menu system**: Uses Node.js readline for user input

**Configuration format**: The tool manages `.mcp.json` files with the structure:
```json
{
  "mcpServers": {
    "serverName": {
      "command": "npx",
      "args": ["-y", "@package/name"],
      "env": {"KEY": "value"}
    }
  }
}
```

## Running the Application

### CLI Manager (Original)
```bash
# Run the interactive CLI
node @oglabs/mcp.js

# Make it executable (if needed)
chmod +x @oglabs/mcp.js
```

### MCP Server (New)
```bash
# Run the MCP server
node mcp-server.js
# or
npm run mcp-server

# Test the MCP server functionality
node test-mcp-server.js
```

## Pre-configured MCP Servers

The application includes built-in configurations for:
- **PostgreSQL**: `@modelcontextprotocol/server-postgres` - requires database connection URL
- **Redis**: `@modelcontextprotocol/server-redis` - uses REDIS_URL environment variable
- **SQLite**: `mcp-server-sqlite` - requires database file path, uses `uvx` command

## Adding New Pre-configured Servers

To add new pre-configured servers, modify the `preConfiguredServers` object in the constructor (lines 15-51). Each server needs:
- `name`: Display name
- `package`: NPM package name
- `config`: Base configuration with command, args, and env
- `requiresInput`: Boolean for user input requirement
- `inputPrompt`: Prompt text for user input

## Key Methods

- `loadConfig()`: Reads `.mcp.json` from current directory
- `saveConfig()`: Writes configuration to `.mcp.json`
- `addPreConfiguredServer()`: Handles adding servers from built-in list
- `addCustomServer()`: Handles adding user-defined servers
- `run()`: Main application loop with menu system

## MCP Server Functionality

The new MCP server (`mcp-server.js`) provides three main tools for agents:

### Tools Available

1. **`detect_tech_stack`** - Analyzes project directories to identify technologies
   - Detects languages, frameworks, databases, and tools
   - Analyzes `package.json`, `requirements.txt`, `Cargo.toml`, etc.
   - Examines directory structures for framework patterns
   - Returns categorized technology detection with confidence scores

2. **`recommend_mcp_servers`** - Suggests relevant MCP servers based on tech stack
   - Maps detected technologies to compatible MCP servers
   - Provides scored recommendations with explanations
   - Supports context-based filtering for specific use cases
   - Returns installation commands and configuration requirements

3. **`query_mcp_database`** - Searches the MCP servers database
   - Full-text search across server names, descriptions, and categories
   - Supports category filtering
   - Includes fuzzy matching for common aliases and typos
   - Returns ranked results with match explanations

### Tech Stack Detection Capabilities

- **Languages**: JavaScript, TypeScript, Python, Rust, Go, Java, PHP, Ruby
- **Frontend**: React, Vue, Angular, Next.js
- **Backend**: Express, Fastify, NestJS, Django, Flask
- **Databases**: PostgreSQL, MySQL, SQLite, MongoDB, Redis
- **Tools**: Docker, Git, Webpack, Vite, Jest, Playwright, Cypress

### Usage Examples

```javascript
// Detect tech stack for current directory
{
  "method": "tools/call",
  "params": {
    "name": "detect_tech_stack",
    "arguments": {}
  }
}

// Get recommendations for a specific tech stack
{
  "method": "tools/call",
  "params": {
    "name": "recommend_mcp_servers",
    "arguments": {
      "tech_stack": ["javascript", "react", "postgresql"],
      "context": "web application development"
    }
  }
}

// Search for database-related MCP servers
{
  "method": "tools/call",
  "params": {
    "name": "query_mcp_database",
    "arguments": {
      "query": "postgresql",
      "category": "Databases"
    }
  }
}
```