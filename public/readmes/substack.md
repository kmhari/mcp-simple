# MCP Substack Server

A Model Context Protocol (MCP) server for downloading and parsing Substack posts. Works with Claude.ai desktop app.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure Claude desktop app:
   
Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "mcp-substack": {
      "command": "/opt/homebrew/bin/node",
      "args": ["/path/to/mcp-substack/lib/index.mjs"],
      "methods": {
        "download_substack": {
          "description": "Download and parse content from a Substack post"
        }
      }
    }
  }
}
```

3. Start the server:
```bash
npm start
```

## Usage

In Claude desktop app, use:
```
Could you download and summarize this Substack post: [URL]
```

## Features

- Downloads and parses Substack posts
- Extracts title, author, subtitle, and content
- Works with public Substack posts
- Integrates with Claude.ai desktop app

## Requirements

- Node.js v18+
- Claude desktop app

## License

MIT
