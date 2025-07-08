# Example MCP Server with image blocks

## Overview

An example MCP server that returns a random image from the [Lorem Picsum API](https://picsum.photos/). This is just an example to show how MCP servers can return image blocks.

See also: [Image Content in the Model Context Protocol specification](https://modelcontextprotocol.io/specification/2025-03-26/server/tools#image-content)

## Usage
 
### Using with VS Code

Add this to your settings JSON file:

```json
{
  "mcp": {
    "servers": {
      "random_image": {
        "command": "npx",
        "args": [
          "-y",
          "@larryhudson/mcp-server-example-image-block"
        ],
      }
    }
  }
}
```

### Using with Claude or other MCP-compatible applications

Add this to your MCP configuration JSON file:

```json
{
  "mcpServers": {
    "random_image": {
      "command": "npx",
      "args": ["-y", "@larryhudson/mcp-server-example-image-block"],
    }
  }
}
```

## Available Tools

- `get_random_image` - get a random image using the Lorem Picsum API.

## Technical Details

Built with:
- **Model Context Protocol (MCP)**: Framework for allowing AI assistants to interact with external tools
- **TypeScript**: For type safety and better developer experience

## Development

You can use the Model Context Protocol inspector to try out the server:

```bash
npx @modelcontextprotocol/inspector npx tsx src/index.ts
```

## License

MIT