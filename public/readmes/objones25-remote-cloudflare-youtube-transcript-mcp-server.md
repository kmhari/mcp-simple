# YouTube Transcript MCP Server

A high-performance, serverless implementation of a YouTube transcript extraction service using the Model Context Protocol (MCP), deployed on Cloudflare Workers.

## Overview

This MCP server enables AI assistants to retrieve transcripts from YouTube videos through a simple API. The implementation combines the lightweight transcript extraction capabilities seen in [kimtaeyoon83/mcp-server-youtube-transcript](https://github.com/kimtaeyoon83/mcp-server-youtube-transcript) with the remote MCP server architecture from [Cloudflare AI demos](https://github.com/cloudflare/ai/tree/main/demos/remote-mcp-server).

## Features

- **Serverless Deployment**: Runs on Cloudflare's global edge network for minimal latency
- **YouTube URL Flexibility**: Supports multiple URL formats and direct video IDs
- **Language Selection**: Retrieve transcripts in different languages (defaults to English)
- **Edge-optimized**: Ultra-fast response times (typically 400-800ms)
- **Minimal Implementation**: Less than 300 lines of code for easy maintenance
- **SSE Transport**: Implements Server-Sent Events for streaming connections

## Available Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_transcript` | Extract transcripts from YouTube videos | `url` (required): YouTube video URL or ID<br>`lang` (optional, default: "en"): Language code |

## Usage with Claude Desktop

### Installation

1. Open Claude Desktop and go to Settings > Developer > Edit Config
2. Update your configuration file:

```json
{
  "mcpServers": {
    "youtube-transcript": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://your-deployed-worker.workers.dev/sse"
      ]
    }
  }
}
```

3. Restart Claude Desktop

### Example Prompts

```
Can you show me the transcript of this YouTube video? https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

```
Extract the transcripts from this TED talk and summarize the key points: https://youtu.be/8S0FDjFBj8o
```

## Local Development

### Prerequisites

- Node.js 18 or higher
- Wrangler CLI (`npm install -g wrangler`)

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/youtube-transcript-mcp-server.git
cd youtube-transcript-mcp-server

# Install dependencies
npm install

# Run locally
wrangler dev
```

### Testing with MCP Inspector

1. Install the MCP Inspector:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. In the inspector:
   - Set Transport Type to `SSE`
   - Enter `http://localhost:8787/sse` as the URL
   - Click "Connect"

3. Try out the `get_transcript` tool with different YouTube URLs

## Deployment to Cloudflare

```bash
# Deploy to Cloudflare Workers
wrangler deploy
```

## Technical Implementation

The server is built with a minimal, high-efficiency codebase:

- **YouTubeTranscriptMCPSqlite**: Core MCP agent implementation with transcript extraction capabilities
- **McpServer**: Handles MCP protocol interactions
- **MCP Protocol Integration**: Complete implementation of the Model Context Protocol 

### Key optimizations:

1. Efficient URL parsing and validation
2. Minimal external dependencies
3. Proper error handling with detailed error messages
4. Streaming support through SSE

## Credits

- Built with [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk)
- Uses [youtube-captions-scraper](https://github.com/algolia/youtube-captions-scraper) for transcript extraction
- Inspired by:
  - [kimtaeyoon83/mcp-server-youtube-transcript](https://github.com/kimtaeyoon83/mcp-server-youtube-transcript)
  - [Cloudflare AI Remote MCP Server demo](https://github.com/cloudflare/ai/tree/main/demos/remote-mcp-server)

## License

MIT 