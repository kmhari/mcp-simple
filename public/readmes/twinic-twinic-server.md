# Twinic-server : configure MCP servers directly from prompts.
<div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <img src="https://img.shields.io/badge/python-3.10-blue?logo=python&logoColor=white" />
    <img src="https://img.shields.io/badge/npm-installed-red?logo=npm&logoColor=white" />
    <img src="https://img.shields.io/badge/typescript-✓-3178c6?logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/node.js-active-339933?logo=node.js&logoColor=white" />
    </div>

This server lets you install and configure other MCP servers just by asking. Install it and you can ask Claude to install MCP servers hosted in npm or PyPi for you. Requires `npx` and `uv` to be installed for node and Python servers respectively.

![image]

### How to Set Up?:

1. Install Node.js if you don’t have it.

2. Put this into your `claude_desktop_config.json` (either at `~/Library/Application Support/Claude` on macOS or `C:\Users\NAME\AppData\Roaming\Claude` on Windows):

```json
  "mcpServers": {
    "twinic-server": {
      "command": "npx",
      "args": [
        "@twinic/twinic-server"
      ]
    }
  }
```
3. Save the config file and restart Claude desktop.

#### File location:

macOS:
`~/Library/Application Support/Claude/claude_desktop_config.json`<br>
Windows:
`C:\Users\YOU\AppData\Roaming\Claude\claude_desktop_config.json`

### Example prompts

> Hey Claude, install the MCP server named mcp-server-fetch

> Hey Claude, install the @modelcontextprotocol/server-filesystem package as an MCP server. Use ['/Users/pangloss/Desktop'] for the arguments

> Hi Claude, please install the MCP server at /Users/pangloss/code/whatsapp-mcp, I'm too lazy to do it myself.

> Install the server @modelcontextprotocol/server-github. Set the environment variable GITHUB_PERSONAL_ACCESS_TOKEN to '1234567890'
