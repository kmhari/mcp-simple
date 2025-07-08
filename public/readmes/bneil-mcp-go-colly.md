# MCP Go Colly Crawler
[![smithery badge](https://smithery.ai/badge/@bneil/mcp-go-colly)](https://smithery.ai/server/@bneil/mcp-go-colly)

## Overview
MCP Go Colly is a sophisticated web crawling framework that integrates the Model Context Protocol (MCP) with the powerful Colly web scraping library. This project aims to provide a flexible and extensible solution for extracting web content for large language model (LLM) applications.

## Features
- Concurrent web crawling with configurable depth and domain restrictions
- MCP server integration for tool-based crawling
- Graceful shutdown handling
- Robust error handling and result formatting
- Support for both single URL and batch URL crawling

## Building from Source

### Prerequisites
- Go 1.21 or later
- Make (for using Makefile commands)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mcp-go-colly.git
cd mcp-go-colly
```

2. Install dependencies:
```bash
make deps
```

### Building

The project includes a Makefile with several useful commands:

```bash
# Build the binary (outputs to bin/mcp-go-colly)
make build

# Build for all platforms (Linux, Windows, macOS)
make build-all

# Run tests
make test

# Clean build artifacts
make clean

# Format code
make fmt

# Run linter
make lint
```

All binaries will be generated in the `bin/` directory.

Then you need to add the following configuration to the `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "web-scraper": {
      "command": "<add path here>/mcp-go-colly/bin/mcp-go-colly"
    }
  }
}
```

## Usage

### As an MCP Tool

The crawler is implemented as an MCP tool that can be called with the following parameters:

```json
{
    "urls": ["https://example.com"],  // Single URL or array of URLs
    "max_depth": 2                    // Optional: Maximum crawl depth (default: 2)
}
```

### Example MCP Tool Call

```go
result, err := crawlerTool.Call(ctx, mcp.CallToolRequest{
    Params: struct{ Arguments map[string]interface{} }{
        Arguments: map[string]interface{}{
            "urls": []string{"https://example.com"},
            "max_depth": 2,
        },
    },
})
```

## Configuration Options
- `max_depth`: Set maximum crawl depth (default: 2)
- `urls`: Single URL string or array of URLs to crawl
- Domain restrictions are automatically applied based on the provided URLs

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT

## Acknowledgments
- Colly Web Scraping Framework
- Mark3 Labs MCP Project
