# MCP Eagle Server

This is a Model Context Protocol (MCP) server for interfacing with the Eagle app.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the server:
```bash
npm run build
```

3. Run the server:
```bash
npm start
```

## Usage with Claude Desktop

Add this to your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "eagle": {
      "command": "node",
      "args": ["/path/to/mcp-eagle/build/index.js"]
    }
  }
}
```

## Available Tools

- `eagle-status`: Check Eagle app connection status