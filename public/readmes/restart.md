# mcp-server-restart

Model Context Protocol (MCP) server for restarting Claude Desktop for Mac

## Description

Using Model Context Protocol (MCP) for Claude Desktop tool installation is a bit cumbersome. The mcp-installer makes things easier by using MCP to allow you to ask Claude to install MCP tools. 

Once they are installed, you still need to restart Claude Desktop to make the changes take effect... That is where mcp-server-restart comes in!

The `mcp-server-restart` package provides a MCP server for restarting Claude Desktop for Mac.

## Usage
Ask Claude Desktop "restart Claude" and it will restart the application. 

## Features

### Resources

The server provides a status resource:
- `claude://status` - Returns the current status of Claude Desktop
  - Returns JSON with running status, PID, and timestamp
  - MIME type: application/json

### Tools

The server implements one tool:
- `restart_claude` - Restarts the Claude Desktop application
  - Safely terminates existing process if running
  - Launches new instance
  - Provides progress notifications during restart

## Installation for Claude Desktop

Installation requires editing your Claude Desktop config file on MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

Option 1: Install both the [mcp-installer](https://github.com/anaisbetts/mcp-installer) and the [mcp-server-restart](https://github.com/non-dirty/mcp-server-restart) packages:

Add the following to your Claude Desktop config file:

```json
{
  "mcpServers": {
    "mcp-installer": {
      "command": "npx",
      "args": [
        "@anaisbetts/mcp-installer"
      ]
    },
    "mcp-server-restart": {
      "command": "uvx",
      "args": [
        "mcp-server-restart"
      ]
    }
  }
}
```

Option 1: Install only the [mcp-server-restart](https://github.com/non-dirty/mcp-server-restart) package:

Add the following to your Claude Desktop config file:

```json
{
  "mcpServers": {
    "mcp-server-restart": {
      "command": "uvx",
      "args": [
        "mcp-server-restart"
      ]
    }
  }
}
```

### Example prompts

> Hey Claude, install the MCP server named mcp-server-fetch then restart Claude

> Please restart Claude

### Testing

Run the test suite:
```bash
pytest
```

## License

MIT License - see LICENSE file for details