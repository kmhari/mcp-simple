# Raindrop.io MCP Server (Go)

An integration that allows LLMs to interact with Raindrop.io bookmarks using the Model Context Protocol (MCP), implemented in Go.

## Features

- Create bookmarks
- Search bookmarks
- Filter by tags

## Requirements

- Go 1.20 or higher
- Raindrop.io account and API token

## Setup

1. Clone the repository:
```bash
git clone https://github.com/anarcher/raindrop-io-mcp-server
cd raindrop-io-mcp-server
```

2. Install dependencies:
```bash
go mod tidy
```

3. Set up environment variables:
- Create a `.env` file and set your Raindrop.io API token
```
RAINDROP_TOKEN=your_access_token_here
```

4. Build:
```bash
go build -o raindrop-mcp-server
```

## Using with Claude for Desktop

1. Open Claude for Desktop configuration file:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the following configuration:
```json
{
  "mcpServers": {
    "raindrop": {
      "command": "/path/to/raindrop-mcp-server",
      "env": {
        "RAINDROP_TOKEN": "your_access_token_here"
      }
    }
  }
}
```

3. Restart Claude for Desktop

## Available Tools

### create-bookmark
Creates a new bookmark.

**Parameters:**
- `url`: URL to bookmark (required)
- `title`: Title for the bookmark (optional)
- `tags`: Array of tags (optional)
- `collection`: Collection ID (optional)

### search-bookmarks
Searches through bookmarks.

**Parameters:**
- `query`: Search query (required)
- `tags`: Array of tags to filter by (optional)

## Development

```bash
# Build
go build -o raindrop-mcp-server

# Run
./raindrop-mcp-server
```

## Security Notes

- Always manage API tokens using environment variables
- Set appropriate permissions for Claude for Desktop configuration files
- Restrict unnecessary file access

## License

MIT License

Copyright (c) 2024 Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Related Links

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Raindrop.io API Documentation](https://developer.raindrop.io/)
- [Go MCP Library](https://github.com/metoro-io/mcp-go)
