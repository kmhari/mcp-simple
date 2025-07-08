# Mac Apps Launcher MCP Server

A Model Context Protocol (MCP) server for launching and managing macOS applications.

## Features

- List all applications installed in the `/Applications` folder
- Launch applications by name
- Open files with specific applications

## Installation
Add the following to your Claude Config JSON file
```
{
  "mcpServers": {
    "simulator": {
      "command": "npx",
      "args": [
        "y",
        "@joshuarileydev/mac-apps-launcher-mcp-server"
      ]
    }
  }
}
```