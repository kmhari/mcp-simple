# Routine Model Context Protocol (MCP) Server

This is the Routine [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server.

## Usage

1. Run the [Routine](https://routine.co/download) application for the MCP server to work.
2. Run this MCP server with `npx routine-mcp-server` or configure it in your favorite MCP client.

### Claude Desktop

For Claude Desktop, refer to https://modelcontextprotocol.io/quickstart/user

In particular, your file `claude_desktop_config.json` should look something like that:

```json
{
  "mcpServers": {
    "routine": {
      "command": "npx",
      "args": ["routine-mcp-server"]
    }
  }
}
```

## Development

```bash
# Install dependencies
yarn

# Build the project
yarn build
```

Then install the MCP server:

- Command: full path to `node` executable
- Arguments: full path to `./dist/index.js`

### Claude Desktop

For Claude Desktop, refer to https://modelcontextprotocol.io/quickstart/user

In particular, your file `claude_desktop_config.json` should look something like that:

```json
{
  "mcpServers": {
    "routine": {
      "command": "/absolute/path/to/bin/node",
      "args": ["/absolute/path/to/mcp-server/dist/index.js"]
    }
  }
}
```

### Running the MCP Server (development)

```bash
# Start the server
yarn start
```

The server communicates via stdin/stdout, following the MCP protocol. You can interact with it by sending JSON requests to its stdin and reading responses from stdout.
