# rssmcp MCP server
[![smithery badge](https://smithery.ai/badge/@Lunran/rssmcp)](https://smithery.ai/server/@Lunran/rssmcp)  
Simple RSS MCP Server

## Components

### Tools

The server implements one tool:
- get_rss: Fetches RSS feeds and returns entries as formatted text
  - Takes "feed_name" and "since" as required string arguments
  - "export_result" as an optional boolean parameter (defaults to false)
  - Returns formatted feed entries as text and optionally exports to a file

## Quickstart

### Installing via Smithery

To install rssmcp for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@Lunran/rssmcp):

```bash
npx -y @smithery/cli install @Lunran/rssmcp --client claude
```

### Install

```
"mcpServers": {
  "rssmcp": {
    "command": "uvx",
    "args": [
      "-U", "rssmcp"
      "--opml", "path/to/your.opml"],
    ]
  }
}
```
