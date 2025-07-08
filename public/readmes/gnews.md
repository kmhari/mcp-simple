# mcp-gnews

MCP server to give client the ability to searching related news on the internet

# Usage

For this MCP server to work, add the following configuration to your MCP config file:

```json
{
  "mcpServers": {
    "gnews_search": {
      "command": "uv",
      "args": [
        "--directory",
        "%USERPROFILE%/Documents/GitHub/mcp-gnews",
        "run",
        "python",
        "main.py"
      ]
    }
  }
}
```
