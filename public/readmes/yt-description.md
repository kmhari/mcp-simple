# YouTube Transcript Extractor MCP 🎥

A Model Context Protocol (MCP) server that enables AI assistants to extract transcripts from YouTube videos. Built for integration with Cursor and Claude Desktop, this tool allows AI to analyze and work with YouTube video content directly.

## Features

- 🎯 Extract transcripts from any public YouTube video
- 🔌 Easy integration with Cursor and Claude Desktop
- 🚀 Built with TypeScript for type safety
- 📦 Simple setup and deployment
- 🛠️ Based on the Model Context Protocol

## Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm
- A YouTube video URL to extract transcripts from

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/yt-mcp.git
cd yt-mcp
```

2. Install dependencies:
```bash
pnpm install
```

3. Build the project:
```bash
pnpm run build
```

## Configuration

### For Cursor

1. Open Cursor Settings
2. Navigate to MCP → Add new MCP server
3. Configure with these settings:
   - Name: `youtube-transcript`
   - Type: `command`
   - Command: `node /absolute/path/to/yt-mcp/build/index.js`

### For Claude Desktop

Add this configuration to your Claude Desktop config:

```json
{
  "mcpServers": {
    "youtube-transcript": {
      "command": "node",
      "args": ["/absolute/path/to/yt-mcp/build/index.js"]
    }
  }
}
```

## Usage

Once configured, the AI can extract transcripts from YouTube videos by calling the tool with a video URL. Example:

```typescript
// The AI will use this format internally
const transcript = await extractTranscript({
  input: "https://www.youtube.com/watch?v=VIDEO_ID"
});
```

## Technical Details

The server is built using:
- [@modelcontextprotocol/sdk](https://www.npmjs.com/package/@modelcontextprotocol/sdk) - For MCP implementation
- [youtube-transcript](https://www.npmjs.com/package/youtube-transcript) - For transcript extraction
- TypeScript - For type safety and better development experience

## Limitations

- Only works with public YouTube videos
- Videos must have captions/subtitles enabled
- Some videos may have auto-generated captions which might not be 100% accurate

## Troubleshooting

Common issues and solutions:

1. **"Cannot find video ID" error**
   - Ensure the YouTube URL is complete and correct
   - Check if the video is publicly accessible

2. **"No transcript available" error**
   - Verify that the video has captions enabled
   - Try a different video to confirm the tool is working

3. **Build errors**
   - Make sure all dependencies are installed
   - Check Node.js version (should be v16 or higher)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT



