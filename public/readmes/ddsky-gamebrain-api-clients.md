# MCP Setup

Read more about setting up the [GameBrain MCP server](https://gamebrain.co/api/docs/mcp-setup). Simply get your free API key and copy this config into your MCP client:

```json
{
  "mcpServers": {
    "gamebrain": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://api.gamebrain.co/v1/mcp?api-key=YOUR_KEY"
      ]
    }
  }
}
```
