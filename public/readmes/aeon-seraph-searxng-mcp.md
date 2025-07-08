# SearXNG Model Context Protocol Server

A Model Context Protocol (MCP) server for interfacing language models with SearXNG search engine.

## Description

This server enables language models to perform web searches through SearXNG using the Model Context Protocol standard. It provides a clean interface for language models to send search queries to SearXNG and receive formatted results.

## Installation

```bash
# Clone the repository
git clone https://github.com/aeon-seraph/searxng-mcp.git
cd searxng-mcp

# Install dependencies
npm install

# Build the project
npm run build
```

## Requirements

- Node.js 16+
- A running SearXNG instance (by default at http://localhost:8888)

## Usage

```bash
# Run the server
node build/index.js
```

The server will run on stdio, making it suitable for integration with MCP-compatible language models.

## Configuration

The server can be configured using environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| SEARXNG_PROTOCOL | Protocol to use (http/https) | http |
| SEARXNG_HOST | SearXNG host | localhost |
| SEARXNG_PORT | SearXNG port | 8888 |
| CACHE_TTL | Cache time-to-live in milliseconds | 600000 (10 minutes) |
| MAX_CACHE_SIZE | Maximum number of cached queries | 100 |

Example:
```bash
SEARXNG_HOST=mysearx.example.com SEARXNG_PORT=443 SEARXNG_PROTOCOL=https node build/index.js
```

## Docker

The project includes a Dockerfile for easy deployment:

```bash
# Build the Docker image
docker build -t searxng-mcp .

# Run the container
docker run -e SEARXNG_HOST=mysearx.example.com -e SEARXNG_PROTOCOL=https searxng-mcp
```

## Search Parameters

The search function supports the following parameters:

- `query` (required): The search query string
- `categories`: Comma-separated list of search categories
- `pageno`: Search page number (default: 1)
- `time_range`: Time range for results ("day", "week", "month", "year")
- `raw_json`: Return raw JSON response instead of formatted text (default: false)

## License

MIT 