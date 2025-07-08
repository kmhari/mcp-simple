# Discourse MCP Server

Node.js server implementing Model Context Protocol (MCP) for Discourse search operation.

## Features

- Search Posts on a Discourse forum using MCP protocol.

## API

### Tools

- **search_posts**
    - Search posts on a Discourse forum
    - Input: `query` (string)
    - Returns an array of post objects

## Usage with Claude Desktop
Add this to your `claude_desktop_config.json`:

### Docker

```json
{
  "mcpServers": {
    "discourse": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e", "DISCOURSE_API_URL=https://try.discourse.org",
        "-e", "DISCOURSE_API_KEY=1234",
        "-e", "DISCOURSE_API_USERNAME=ash",
        "ashdev/discourse-mcp-server"
      ]
    }
  }
}
```

### NPX

```json
{
  "mcpServers": {
    "discourse": {
      "command": "npx",
      "args": [
        "-y",
        "@ashdev/discourse-mcp-server"
      ],
      "env": {
        "DISCOURSE_API_URL": "https://try.discourse.org",
        "DISCOURSE_API_KEY": "1234",
        "DISCOURSE_API_USERNAME": "ash" 
      }
    }
  }
}
```

## Build

Docker build:

```bash
docker build -t ashdev/discourse-mcp-server .
```
