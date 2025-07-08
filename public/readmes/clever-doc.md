# Clever Cloud Documentation MCP server

This MCP demo Server based on [FastMCP](https://github.com/punkpeye/fastmcp), exposes [Clever Cloud](https://clever-cloud.com)'s documentation.

It's based on [MCP Clever Demo](https://github.com/davlgd/mcp-clever-demo) by [davlgd](https://github.com/davlgd).

## Usage

To use this server in an MCP client such as Claude Desktop:

```json
{
  "mcp-clever-demo": {
    "command": "npx",
    "args": [ "-y", "mcp-clever-demo" ]
  }
}
```

## Development

### Test with `mcp-cli`

The fastest way to test and debug your server is with fastmcp dev:

```bash
npx fastmcp dev src/index.ts
```

This will run your server with [`mcp-cli`](https://github.com/wong2/mcp-cli) for testing and debugging your MCP server in the terminal.

### Inspect with MCP Inspector

Another way is to use the official [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) to inspect your server with a Web UI:

```bash
npx fastmcp inspect src/index.ts
```

## License

This project is licensed under the [MIT License](LICENSE).
