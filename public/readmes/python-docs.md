---

# python-docs-server MCP Server

A Model Context Protocol server

This is a TypeScript-based MCP server that provides tools to fetch Python documentation using the Brave Search API.

## Features

### Tools
- `get_python_docs` - Get Python documentation for a given query
  - Takes a search query as a required parameter
  - Uses the Brave Search API to fetch relevant documentation links

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`  
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "python-docs-server": {
      "command": "/path/to/python-docs-server/build/index.js"
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.

## Additional Resources

- [Glama AI Server](https://glama.ai/mcp/servers/@AnuragRai017/python-docs-server-MCP-Server)  
- [Smithery AI Server](https://smithery.ai/server/@AnuragRai017/python-docs-server-MCP-Server)

---

