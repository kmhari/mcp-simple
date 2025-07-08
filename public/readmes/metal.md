# Metal MCP Server

An MCP server providing Metal Framework documentation search and code generation capabilities.

## One-Line Installation

```bash
npx @modelcontextprotocol/create-server metal-mcp && cd metal-mcp && npm install && npm run build
```

## Features

### Tools

1. `search_metal_docs`
   - Search Metal Framework documentation and code examples using natural language queries
   - Parameters:
     - `query`: Natural language query about Metal Framework
     - `limit`: Maximum number of results to return (default: 3)

2. `generate_metal_code`
   - Generate Metal Framework code for common tasks
   - Parameters:
     - `task`: Description of the Metal task to generate code for
     - `language`: Programming language (objective-c, swift, or metal)

### Resources

1. `metal://docs/getting-started`
   - Comprehensive guide for getting started with Metal Framework

2. `metal://docs/best-practices`
   - Best practices and optimization tips for Metal Framework

## Usage

After installation, add the server to your MCP configuration:

```json
{
  "mcpServers": {
    "metal": {
      "command": "node",
      "args": ["/path/to/metal-mcp/build/index.js"]
    }
  }
}
```

The server will provide Metal Framework expertise through the MCP protocol, allowing you to:
- Search Metal documentation with natural language queries
- Generate code snippets for common Metal tasks
- Access Metal best practices and getting started guides
