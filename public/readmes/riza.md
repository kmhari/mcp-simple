# Riza MCP Server

[Riza](https://riza.io) offers an isolated code interpreter for your LLM-generated code. 

Our MCP server implementation wraps the Riza API and presents
endpoints as individual tools.

Configure with Claude Desktop as below, or adapt as necessary for your MCP client. Get a free Riza API key in your [Riza Dashboard](https://dashboard.riza.io).

```json
{
  "mcpServers": {
    "riza-server": {
      "command": "npx",
      "args": [
        "@riza-io/riza-mcp"
      ],
      "env": {
        "RIZA_API_KEY": "your-api-key"
      }
    }
  }
}
```

The Riza MCP server provides several tools to your LLM:

- `create_tool`: Your LLM can write code and save it as a tool using the Riza [Tools API](https://docs.riza.io/api-reference/tool/create-tool). It can then execute these tools securely on Riza using `execute_tool`.
- `fetch_tool`: Your LLM can fetch saved Riza tools, including source code, which can be useful for editing tools.
- `execute_tool`: Executes a saved tool securely on Riza's code interpreter API.
- `edit_tool`: Edits an existing saved tool.
- `list_tools`: Lists available saved tools.
- `execute_code`: Executes arbitrary code safely on Riza's code interpreter API, without saving it as a tool.
