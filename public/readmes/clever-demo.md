# MCP Clever Demo

This MCP Server is based on the [JavaScript SDK](https://www.npmjs.com/package/mcp-js-server) and exposes Clever Cloud's Tools.

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

To run the server locally, use the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector npx mcp-clever-demo
```

## License

This project is licensed under the [MIT License](LICENSE).
