# MCP Manager

```sh
# Add a new server
python mcpm.py add "filesystem npx -y @modelcontextprotocol/server-filesystem /path1 /path2"

# Update an existing server
python mcpm.py set "filesystem npx -y @modelcontextprotocol/server-filesystem /path3 /path4"

# List all servers
python mcpm.py ls

# Remove a server
python mcpm.py rm filesystem
```

output

```json
{
  "mcpServers": {
    "server_name": {
      "command": "command",
      "args": ["arg1", "arg2"]
    }
  }
}
```

file will be saved to `Saved to: /Users/username/.mcpm/config.json`

## Todo

- specifiy a output path eg `python mcpm.py add "filesystem npx -y @modelcontextprotocol/server-filesystem /path1 /path2" -o config.json`
- support sse server