# mcp-tavily-extract

MCP server to give client the ability to extract a web page

# Usage

For this MCP server to work, add the following configuration to your MCP config file:

```json
{
  "mcpServers": {
    "tavily_extract": {
      "command": "uv",
      "args": [
        "--directory",
        "%USERPROFILE%/Documents/GitHub/mcp-tavily-extract",
        "run",
        "python",
        "main.py"
      ]
    }
  }
}
```

Also provide `TAVILY_API_KEY` in `.env`
