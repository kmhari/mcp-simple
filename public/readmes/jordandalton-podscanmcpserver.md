# Podscan MCP Server Guide

Register for a free API key at [Podscan](https://podscan.fm/).

To build the MCP server, run:

```
npm install && npm run build
```

This will compile the typescript files and produce a build directory plus it will output the json you can copy/paste into your MCP client (Claude Desktop, Windsurf, Cursor, etc.)

If all things go well, this will produce an output similar to this:

```json
{
  "mcpServers": {
    "podscan": {
      "command": "node",
      "args": [
        "<thePathToYour>/build/index.js"
      ],
      "env": [
        {
          "API_KEY": "<REPLACE>"
        }
      ]
    }
  }
}
```

## MCPGen
This MCP Server was generated using [MCPGen](https://mcpgen.jordandalton.com/).