1. Build docker stuff
```bash
docker build -t biotools-mcp .
```
2. Add it to claude_desktop_config.json
claude_desktop_config.json
```
{
  "mcpServers": {
    "biotools-mcp": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-v",
        "path/to/this/github/repo:/app",
        "biotools-mcp"
      ]
    }
  }
}
```
3. You can also run it with something like Cursor.
