# MCP Terminal Use

A Model Context Protocol (MCP) server for terminal access. This server allows Claude to interact with specified directories on your system.

## Configuration

### Environment Variables

The server can be configured using the following environment variables:

- `ALLOWED_DIRECTORY`: The directory path that Claude is allowed to access (default: '${HOME}/your/allowed/directory')

You can set these variables either through:
1. A `.env` file in your project root
2. Environment variables in your system
3. Direct configuration in claude_desktop_config.json

### Claude Desktop Configuration

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "terminal": {
      "command": "node",
      "args": [
        "${HOME}/path/to/mcp-terminal-use/dist/index.js"
      ],
      "env": {
        "ALLOWED_DIRECTORY": "${HOME}/your/allowed/directory"
      }
    }
  }
}