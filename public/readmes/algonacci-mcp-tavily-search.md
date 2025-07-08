# mcp-tavily-search

MCP server to give client the ability to search on the internet

# Usage

For this MCP server to work, add the following configuration to your MCP config file:

```json
{
  "mcpServers": {
    "tavily_search": {
      "command": "uv",
      "args": [
        "--directory",
        "%USERPROFILE%/Documents/GitHub/mcp-tavily-search",
        "run",
        "python",
        "main.py"
      ]
    }
  }
}
```

Also provide `TAVILY_API_KEY` in `.env`
