# MCP Configuration

I am currently using filesystem, Obsidian, fetch, and Git

## Claude

### 1. clone repositories

`mcp-obsidian`

> http://github.com/MarkusPfundstein/mcp-obsidian.git

- install Obsidian Community Plugin: `Local Rest API`

`modelcontextprotocol/servers`

> https://github.com/modelcontextprotocol/servers.git

### 2. edit claude_desktop_config.json

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/devilofdev/dev/"
      ]
    },
    "obsidian": {
      "command": "/opt/homebrew/bin/uv",
      "args": [
        "--directory",
        "/Users/devilofdev/dev/mcp/mcp-obsidian",
        "run",
        "mcp-obsidian"
      ],
      "env": {
        "OBSIDIAN_API_KEY": ""
      }
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@tokenizin/mcp-npx-fetch"],
      "env": {}
    },
    "mcp-server-youtube-transcript": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@kimtaeyoon83/mcp-server-youtube-transcript"
      ]
    },
    "git": {
      "command": "uv",
      "args": [
        "--directory",
        "/Users/devilofdev/dev/mcp/servers/src/git",
        "run",
        "mcp-server-git"
      ]
    }
  }
}
```

### 3. install uv

```bash
# for mac
brew install uv
```
