# YouTube MCP Server

A Model Context Protocol server that provides tools to interact with YouTube videos, primarily for retrieving video subtitles. This server enables LLMs to extract content from YouTube videos for analysis and processing.

### Available Tools

- `watch_youtube_video` - Downloads and processes subtitles for a YouTube video.
  - Required arguments:
    - `url` (string): The URL of the YouTube video to watch.
    - `sub_lang` (string): The language of the subtitles to download.

## Installation

### Prerequisites

This server requires:

- Python 3.11 or later
- yt-dlp (must be installed and available in your PATH)

### Using uv

```bash
uv run src/server.py
```

## Integration

1. Start the server:

```bash
docker build -t youtube-mcp:latest .
docker run --rm -i --name youtube-mcp youtube-mcp:latest
```

2. On cursor, add the following to your `mcp.json` file:

```json
{
  "mcpServers": {
    "youtube-mcp": {
      "transport": "sse",
      "url": "http://localhost:8000/sse",
      "description": "A simple MCP server to watch YouTube videos and download subtitles"
    }
  }
}
```

## Examples of Questions for Cursor

1. "What does this YouTube video talk about?" (provide URL)
2. "Can you summarize this YouTube video for me?" (provide URL)
3. "Extract the key points from this YouTube lecture" (provide URL)
4. "Watch this YouTube tutorial and explain the steps" (provide URL)
