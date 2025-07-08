# Setup Environment
```bash
uv init <project_name>
cd <project_name>
uv add "mcp[cli]" httpx
```

# Run MCP Inspector
## Option 1
```bash
npx @modelcontextprotocol/inspector
```
## Option 2
```bash
uv run mcp dev <mcp_sse_server.py>
```

# Start SSE MCP Server
```bash
uv run <mcp_sse_server.py>
```

# Config SSE MCP Server

## For Trae, Claude Desktop
```json
{
  "mcpServers": {
    "<mcp_sse_server>": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://localhost:8080/sse"
      ]
    }
  }
}
```

## For Cursor, Cherry Studio

```text
http://localhost:8080/sse
```