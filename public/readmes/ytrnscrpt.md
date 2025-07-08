# YouTube Transcript MCP Server

MCP server that enables Claude to fetch and analyze YouTube video transcripts.

## Quick Start

1. Setup:
```bash
npm install
npm run build
```

2. Configure Claude Desktop:
   - Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "youtube-transcript": {
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/TO/ytrnscrpt-mcp-server/dist/index.js"
      ]
    }
  }
}
```
   - Restart Claude Desktop
   - Ask: "Get me the transcript for [YouTube URL]"

## License

MIT