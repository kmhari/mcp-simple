# mcp-server-k8s
A simple MCP server for Kubernetes


https://github.com/user-attachments/assets/e36d8048-7abd-4529-8d78-086ae9cadea9




## How to use this MCP server
By configuring the following contents in `~/Library/Application Support/Claude/claude_desktop_config.json`, and replace the directory with real project path, you can easily use it with Claude Desktop
```
{
  "mcpServers": {
    "k8s": {
        "command": "uv",
        "args": [
            "--directory",
            "/path/to/mcp-server-k8s",
            "run",
            "main.py"
        ]
    }
  }
}
```

This mcp server is certified by MCPHub, if you are interested, you may have a look on [MCPHub](https://mcphub.com/mcp-servers/chris-sun-star/mcp-server-k8s)
