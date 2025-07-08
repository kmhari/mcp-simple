# Deep Search MCP Server

A deep web search MCP server using LinkUp API.

This is a TypeScript-based MCP server that implements deep web search capabilities. It demonstrates core MCP concepts by providing:

- Tools for performing deep web searches
- Structured results from LinkUp API

## Features

### Tools
- `deep_search` - Perform deep web searches
  - Takes query string as required parameter
  - Optional max_results parameter (default: 5)
  - Returns structured search results

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the server:
```bash
npm run build
```

3. Configure the MCP server in your settings:
```json
{
  "mcpServers": {
    "deep-search-mcp": {
      "command": "node",
      "args": ["/home/joao/Cline/MCP/linkup-mcp-server/build/index.js"],
      "env": {
        "LINKUP_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

The API key can be obtained from LinkUp API service.

## Running

For development with auto-rebuild:
```bash
npm run watch
```

For production:
```bash
npm start
```

## Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector):

```bash
npm run inspector
```

## NEXT STEPS

Future improvements to consider:

1. Add caching for search results to improve performance
2. Implement pagination for large result sets
3. Add filtering options for search results
4. Support different output formats (markdown, HTML)
5. Add rate limiting and request throttling
6. Implement authentication for API access
7. Add more search parameters (date ranges, domains, etc.)
8. Improve error handling and user feedback
9. Add logging for debugging and monitoring
10. Implement health check endpoints
