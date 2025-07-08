# Web Crawler MCP Server Deployment Guide

## Prerequisites
- Node.js (v18+)
- npm (v9+)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jitsmaster/web-crawler-mcp.git
   cd web-crawler-mcp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Configuration
Create a `.env` file with the following environment variables:

```env
CRAWL_LINKS=false
MAX_DEPTH=3
REQUEST_DELAY=1000
TIMEOUT=5000
MAX_CONCURRENT=5
```

## Running the Server
Start the MCP server:
```bash
npm start
```

## MCP Configuration
Add the following to your MCP settings file:

```json
{
  "mcpServers": {
    "web-crawler": {
      "command": "node",
      "args": ["/path/to/web-crawler/build/index.js"],
      "env": {
        "CRAWL_LINKS": "false",
        "MAX_DEPTH": "3",
        "REQUEST_DELAY": "1000",
        "TIMEOUT": "5000",
        "MAX_CONCURRENT": "5"
      }
    }
  }
}
```

## Usage
The server provides a `crawl` tool that can be accessed through MCP. Example usage:

```json
{
  "url": "https://example.com",
  "depth": 1
}
```

## Configuration Options
| Environment Variable | Default | Description |
|----------------------|---------|-------------|
| CRAWL_LINKS          | false   | Whether to follow links |
| MAX_DEPTH            | 3       | Maximum crawl depth |
| REQUEST_DELAY        | 1000    | Delay between requests (ms) |
| TIMEOUT              | 5000    | Request timeout (ms) |
| MAX_CONCURRENT       | 5       | Maximum concurrent requests |
