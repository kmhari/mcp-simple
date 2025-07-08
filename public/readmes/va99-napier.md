# Napier - configure MCP directly from prompts.

This server is a server that installs other MCP servers for you. Install it, and you can ask Claude to install MCP servers hosted in npm or PyPi for you. Requires `npx` and `uv` to be installed for node and Python servers respectively.

![image]

### How to install:

Put this into your `claude_desktop_config.json` (either at `~/Library/Application Support/Claude` on macOS or `C:\Users\NAME\AppData\Roaming\Claude` on Windows):

```json
  "mcpServers": {
    "napier-mcp": {
      "command": "npx",
      "args": [
        "napier-mcp"
      ]
    }
  }
```

### Example prompts

> Hey Claude, install the MCP server named mcp-server-fetch

> Hey Claude, install the @modelcontextprotocol/server-filesystem package as an MCP server. Use ['/Users/pangloss/Desktop'] for the arguments

> Hi Claude, please install the MCP server at /Users/pangloss/code/whatsapp-mcp, I'm too lazy to do it myself.

> Install the server @modelcontextprotocol/server-github. Set the environment variable GITHUB_PERSONAL_ACCESS_TOKEN to '1234567890'
