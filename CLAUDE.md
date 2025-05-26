# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MCP (Model Context Protocol) Server Manager - an interactive CLI tool for managing MCP server configurations. The tool helps users add, remove, and configure MCP servers by updating the `.mcp.json` configuration file.

## Core Architecture

**Single-file application**: `mcp-manager.js` contains the entire application logic in a single `MCPManager` class.

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

```bash
# Run the interactive CLI
node mcp-manager.js

# Make it executable (if needed)
chmod +x mcp-manager.js
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