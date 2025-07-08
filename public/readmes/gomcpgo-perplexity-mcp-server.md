
# Perplexity MCP Server

This Model Context Protocol (MCP) server enables LLMs like Claude to perform internet research using the Perplexity API. It provides real-time, up-to-date information with source citations.

## Disclaimer

This is an unofficial integration and is not affiliated with, officially connected to, or endorsed by Perplexity AI or its parent company. This project uses Perplexity's public API but is independently developed.

"Perplexity" and any associated names, trademarks, and images are property of Perplexity AI.

This software is provided "as is" without warranty of any kind. Use at your own risk.

## Features

- Perform internet research with citations using the Perplexity API
- Automatic source tracking and citation
- Integration with Claude Desktop and other MCP clients

## Prerequisites

- Go 1.20 or later
- A Perplexity API key (get one from https://www.perplexity.ai/)
- The MCP Go framework ([github.com/gomcpgo/mcp](https://github.com/gomcpgo/mcp))

## Building the binary

```bash

# Build the server binary
./run.sh build

```

## Integration with Claude Desktop

Add the following to your Claude Desktop configuration file:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "perplexity": {
      "command": "/path/to/binary/perplexity-server",
      "env": {
        "PERPLEXITY_API_KEY": "your-perplexity-key"
      }
    }
  }
}
```

## Available Tools

### research

Performs internet research and returns results with citations.

Parameters:
- `query` (string): The research query or question

Example query in Claude:
"What's the latest research on quantum computing?"

## Project Structure

```
.
├── README.md
├── go.mod
├── cmd/
│   └── main.go    # Server implementation
└── run.sh         # Build script
```


## Development

To modify or extend the server:

1. Make changes in `cmd/main.go`
2. Build using `./run.sh build`
3. Test your changes with Claude Desktop or the MCP Inspector

## License

MIT License
