# MCP Remote Server (Node.js Version)

This is a Node.js implementation of the BluestoneApps Coding Standards and Examples MCP server.

## Overview

This MCP server provides access to React Native coding standards and code examples through the Model Context Protocol (MCP). It can be used with MCP clients like Windsurf IDE.

## Features

- Access to React Native coding standards
- Component, hook, screen, service, and theme code examples
- Fuzzy matching for finding examples by name
- Full integration with the MCP protocol

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```

## Usage

Start the server:

```bash
npm start
```

To use with MCP clients, configure them to connect to this server.

## Tools

The server provides the following tools:

- `get_project_structure`: Get project structure standards
- `get_api_communication`: Get API communication standards 
- `get_component_design`: Get component design standards
- `get_state_management`: Get state management standards
- `get_component_example`: Get a specific component example
- `get_hook_example`: Get a specific hook example
- `get_service_example`: Get a specific service example 
- `get_screen_example`: Get a specific screen example
- `get_theme_example`: Get a specific theme example
- `list_available_examples`: List all available code examples

## Configuring with MCP Clients

For Windsurf IDE, update the `mcp_config.json` with:

```json
{
  "servers": {
    "bluestoneapps": {
      "command": "node",
      "args": ["/path/to/build/index.js"],
      "description": "BluestoneApps Coding Standards and Examples",
      "displayName": "BluestoneApps MCP Server",
      "timeout": 30000
    }
  }
}
