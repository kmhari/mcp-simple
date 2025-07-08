# openapi-client-generator MCP Server

A Model Context Protocol server to generate API clients by using TypeScript.


<a href="https://glama.ai/mcp/servers/taqmq8493y">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/taqmq8493y/badge" alt="OpenAPI Client Generator MCP server" />
</a>

## Features

### Resources
- Generates an axios based API client that can be used to interact with the API.
- It uses OpenAPI / Swagger specs to generate the client.

### Prompts
- `generate_client` - Generate a API client for specified OpenAPI specs.

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
    "openapi-client-generator": {
      "command": "node",
      "args": [
        "< PATH TO >/openapi-client-generator/build/index.js"
      ]
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

## Contributing

Feel free to contribute to the project by opening issues or submitting pull requests. We welcome any improvements or new features that align with the project's goals.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

----

Built with [Cline](https://github.com/cline/cline)
