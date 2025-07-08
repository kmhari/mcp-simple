# Ashra MCP

A Model Context Protocol server for Ashra.

## Usage

Install dependencies:

`yarn`

Build the project:

`yarn build`

## Claude Configuration

Download the latest version of [Claude](https://claude.ai/download).

Add to or create the following file `claude_desktop_config.json` in `cd ~/Library/Application\ Support/Claude`:

```json
{
  "mcpServers": {
    "ashra": {
      "command": "node",
      // OR if you're using nvm and the version picked is not preferred/working
      // "command": "/Users/<user>/.nvm/versions/node/<version>/bin/node",
      "args": ["<path/to/ashra-mcp>/build/index.js"],
      "env": {
        "ASHRA_API_KEY": "<YOUR-API-KEY>"
      }
    }
  }
}
```

## Troubleshooting

Consult the [MCP server documentation](https://modelcontextprotocol.io/quickstart/server) for more information.
