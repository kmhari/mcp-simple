# MCP Echo Server

A simple MCP (Messaging Control Protocol) server that echoes back text messages.

## Features

- Echo a message

## Installation

```bash
# Install dependencies
npm install
```

## Usage

### Development

```bash
# Build server
npm run build
```

## Declare MCP server

```json
{
  "mcpServers": {
    "echo-mcp-server": {
      "command": "node",
      "args": ["<absolute-path-to-project-folder>/dist/index.js"]
    }
  }
}
```
