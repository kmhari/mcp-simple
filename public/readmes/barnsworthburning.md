# Barnsworthburning MCP

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) server for searching [barnsworthburning.net](https://barnsworthburning.net).

<a href="https://glama.ai/mcp/servers/5aibjjzkkb">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/5aibjjzkkb/badge" alt="Barnsworthburning MCP server" />
</a>

[![Smithery Badge](https://smithery.ai/badge/@Aias/barnsworthburning-mcp)](https://smithery.ai/server/@Aias/barnsworthburning-mcp)

## Overview

This MCP server provides a tool for searching barnsworthburning.net through the API endpoint at `https://barnsworthburning.net/api/search`. It can be used with Claude for Desktop or any other MCP client.

## Installation

### Installing via Smithery

To install Barnsworthburning for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@Aias/barnsworthburning-mcp):

```bash
npx -y @smithery/cli install @Aias/barnsworthburning-mcp --client claude
```

### Manual Installation
1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the server:
   ```bash
   npm run build
   ```

## Usage

Refer to the [Model Context Protocol documentation](https://modelcontextprotocol.io/introduction) for information on how to use MCP servers with compatible clients (such as Claude for Desktop or Cursor).

## Available Tools

This MCP server provides the following tool:

- **search**: Search barnsworthburning.net for the given query
  - Parameters:
    - `query`: The search query to look for on barnsworthburning.net

## Example Queries

Once the server is connected to the client, you can ask questions like:

- "Search barnsworthburning.net for 'design'"
- "Find articles about typography on barnsworthburning.net"
- "What does barnsworthburning.net have about user experience?"

## Development

To modify or extend this MCP server:

1. Edit the source code in the `src` directory
2. Rebuild the server with `npm run build`

## License

MIT
