# MCP TabNews Integration

[![smithery badge](https://smithery.ai/badge/@renant/mcp-tabnews)](https://smithery.ai/server/@renant/mcp-tabnews)

A Model Context Protocol (MCP) integration for TabNews.

This MCP server is also available on [Smithery](https://smithery.ai/server/@renant/mcp-tabnews) for direct integration.

## Available Tools

- `checkStatusTool`: Check the status of the TabNews API.
- `getContentsTool`: Get contents from TabNews.
- `getContentsByUserTool`: Get contents from TabNews by user.
- `getContentTool`: Get a content with body from TabNews by user and slug.
- `getContentChildrenTool`: Get comments from TabNews by content.
- `getAnalyticsUserCreatedTool`: Get the analytics of a user created contents from TabNews.
- `getAnalyticsRootContentPublishedTool`: Get the analytics of a root content published from TabNews.
- `getAnalyticsChildContentPublishedTool`: Get the analytics of a child content published from TabNews.
- `getRssFeedTool`: Get the RSS feed from TabNews.

# Integration with AI Tools

## Inspect MCP Server Capabilities

You can inspect this MCP server's capabilities using Smithery:

```bash
npx -y @smithery/cli@latest inspect @renant/mcp-tabnews
```

This will show you all available tools, their parameters, and how to use them.

## Setup

### Manual Installation

1. Make sure you're using Node.js v23+

```bash
node -v
#v23.11.0
```

2. Clone this repository:

```bash
git clone https://github.com/renant/mcp-tabnews.git
cd mcp-tabnews
```

3. Restore dependencies:

```bash
npm ci
```

## Integration with AI Tools

### Cursor Setup

1. Open Cursor Settings
2. Navigate to MCP section
3. Click "Add new MCP server"
4. Configure the server:

   ```
   Name = mcp-tabnews
   Type = command
   Command = node ABSOLUTE_PATH_TO_PROJECT/src/index.ts
   ```

   or if you prefer executing it from Smithery

   ```
   Name = mcp-tabnews
   Type = command
   Command = npm exec -- @smithery/cli@latest run @renant/mcp-tabnews
   ```

or configure directly from the Cursor's global MCP file located in `~/.cursor/mcp.json` and add the following:

```json
{
  "mcpServers": {
    "mcp-tabnews": {
      "command": "node",
      "args": ["ABSOLUTE_PATH_TO_PROJECT/src/index.ts"]
    }
  }
}
```

or if you prefer executing it from Smithery

```json
{
  "mcpServers": {
    "mcp-tabnews": {
      "command": "npm",
      "args": [
        "exec",
        "--",
        "@smithery/cli@latest",
        "run",
        "@renant/mcp-tabnews"
      ]
    }
  }
}
```

5. Make sure Cursor chat is in Agent mode by selecting "Agent" in the lower left side dropdown

6. Go to the chat an ask any question about TabNews

### Claude Desktop Setup

#### Installing via Smithery

To install TabNews for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@renant/mcp-tabnews):

```bash
npx -y @smithery/cli install @renant/mcp-tabnews --client claude
```

# Development

## Features

- Built with Model Context Protocol (MCP)
- Type-safe with TypeScript and Zod schema validation
- Native TypeScript support in Node.js without transpilation
- Standard I/O transport for easy integration
- Structured error handling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

[Renan Teixeira](https://renant.is-a.dev)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
