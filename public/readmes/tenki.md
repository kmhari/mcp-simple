# mcp-tenki

A MCP server with weather of Japan

<a href="https://glama.ai/mcp/servers/jbl3sfsi9r"><img width="380" height="200" src="https://glama.ai/mcp/servers/jbl3sfsi9r/badge" alt="Tenki MCP server" /></a>

# Setup

```
$ uv sync
```

# Running Server 


Run without clone

```json
{
    "mcpServers": {
        "tenki": {
            "command": "uvx",
            "args": ["--from", "git+https://github.com/acxelerator/mcp-tenki.git", "mcp-tenki"]
        }
    }
}
```

Run with clone

```json
{
    "mcpServers": {
        "tenki": {
            "command": "uv",
            "args": ["--directory", "/PATH/TO/REPOSITORY/mcp_tenki", "run", "main.py"]
        }
    }
}
```

