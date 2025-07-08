# code_search_mcp

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run build
```

Then `dist/server` will be created. 

## Configuration

`claude_desktop_config.json`:

```
{
    "mcpServers": {
        "code_search": {
            "command": "ABSOLUTE/PATH/TO/code_search_mcp/dist/server"
        }
    }
}
```

For development, you can run without building:

`.vscode/mcp.json`:

```json
{
    "servers": {
        "code_search": {
            "type": "stdio",
            "command": "bun",
            "args": [
                "run",
                "/ABSOLUTE/PATH/TO/code_search_mcp/server.ts"
            ]
        }
    }
}
```