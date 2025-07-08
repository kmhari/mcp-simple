# YouTube Subtitles MCP Server

A Model Context Protocol (MCP) server that allows AI assistants like Claude to download and analyze YouTube video subtitles.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- **Download YouTube Subtitles**: Get subtitles from any YouTube video
- **Language Support**: Download subtitles in any available language
- **Video Information**: Retrieve video metadata (title, duration, upload date, etc.)
- **Multiple Language Detection**: List all available subtitle languages for a video
- **Seamless AI Integration**: Works with Claude and other MCP-compatible assistants
- **Docker Support**: Easy deployment with Docker

## Requirements

- Python 3.10+
- yt-dlp
- ffmpeg
- MCP-compatible client (like Claude Desktop)
- Docker (optional, for containerized deployment)

## Installation

### Using Docker (Recommended)

1. Clone this repository:
   ```bash
   git clone https://github.com/setkyar/youtube-subtitles-mcp.git
   cd youtube-subtitles-mcp
   ```

2. Build and run with Docker:
   ```bash
   docker build -t mcp/youtube-subtitles .
   ```

### Manual Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/setkyar/youtube-subtitles-mcp.git
   cd youtube-subtitles-mcp
   ```

2. Install dependencies:
   ```bash
   pip install "mcp[cli]>=1.2.0" yt-dlp
   ```

3. Install ffmpeg:
   - On Ubuntu/Debian: `sudo apt-get install ffmpeg`
   - On macOS (Homebrew): `brew install ffmpeg`
   - On Windows: Download from [ffmpeg.org](https://ffmpeg.org/download.html)

4. Run the server:
   ```bash
   python youtube_subtitles_server.py
   ```

## Integration with Claude Desktop

1. Open Claude Desktop
2. Click on the Claude menu and select "Settings"
3. Click on "Developer" in the left sidebar
4. Click on "Edit Config"
5. Update the configuration to include your MCP server:

```json
{
  "mcpServers": {
    "youtube-subtitles": {
      "command": "docker",
      "args": ["run", "-i", "mcp/youtube-subtitles"]
    }
  }
}
```

6. Save the file and restart Claude Desktop

## Usage Examples

Once integrated with an MCP client like Claude Desktop, you can:

1. **Get video information**:
   ```
   What's the title and upload date of this YouTube video: https://www.youtube.com/watch?v=dQw4w9WgXcQ
   ```

2. **List available subtitle languages**:
   ```
   What subtitle languages are available for this video: https://www.youtube.com/watch?v=dQw4w9WgXcQ
   ```

3. **Download and analyze subtitles**:
   ```
   Can you get the English subtitles for this video and summarize what it's about? https://www.youtube.com/watch?v=dQw4w9WgXcQ
   ```

4. **Translate subtitles**:
   ```
   Get the Spanish subtitles for this video and translate them to English: https://www.youtube.com/watch?v=dQw4w9WgXcQ
   ```

## How It Works

The server exposes three main tools to MCP clients:

1. `get_video_info`: Retrieves basic metadata about a YouTube video
2. `list_subtitle_languages`: Shows available subtitle languages for a video
3. `download_subtitles`: Downloads and formats subtitles in a specific language

All operations are performed using yt-dlp, a powerful YouTube-dl fork with better support for subtitles and formats.

## Docker Configuration

The included Dockerfile:
- Uses Python 3.10 as the base image
- Installs ffmpeg for subtitle processing
- Installs required Python dependencies
- Sets up the MCP server to run via stdio transport

For custom Docker setup, you can modify the Dockerfile or docker-compose.yml file according to your needs.

## Troubleshooting

### Common Issues and Solutions

1. **Subtitles not available**: Not all YouTube videos have subtitles. Try another video.
2. **Missing languages**: Some videos only have auto-generated subtitles in the original language.
3. **Docker connection problems**: Ensure the container is running and Claude Desktop is configured correctly.

### Logs

Docker logs can be viewed with:
```bash
docker logs youtube-subtitles-mcp
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Thanks to the [yt-dlp](https://github.com/yt-dlp/yt-dlp) team for their amazing tool
- Thanks to the [Model Context Protocol](https://modelcontextprotocol.io/) for enabling AI assistant integrations