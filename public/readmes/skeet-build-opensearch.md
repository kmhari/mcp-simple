# OpenSearch

A Model Context Protocol server that provides read-only access to OpenSearch clusters. This server enables LLMs to inspect indices and execute read-only queries.

To learn more about MCP Servers see:
- [What is MCP](https://skeet.build/docs/guides/what-is-mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)

This OpenSearch MCP Server was designed for seamless integration with [skeet.build](https://skeet.build)

## Components

### Tools

- **search**
  - Execute read-only search queries against the connected OpenSearch cluster
  - Input: `query` (string): The OpenSearch query to execute
  - Input: `index` (string): The index to search (optional)
  - All queries are executed with read-only permissions

### Resources

The server provides schema information for each index in the OpenSearch cluster:

- **Index Mappings** (`opensearch://<host>/<index>/mapping`)
  - JSON schema information for each index
  - Includes field names and data types
  - Automatically discovered from cluster metadata

## Usage with Claude Desktop

To use this server with the Claude Desktop app, add the following configuration to the "mcpServers" section of your `claude_desktop_config.json`:

### NPX

```json
{
  "mcpServers": {
    "opensearch": {
      "command": "npx",
      "args": [
        "-y",
        "@skeetbuild/opensearch",
        "https://username:password@localhost:9200"
      ]
    }
  }
}
```

## Usage with Cursor

To use this server with [Cursor](https://skeet.build/docs/apps/cursor#what-is-model-context-protocol), add the following configuration to your global (`~/.cursor/mcp.json`) or project-specific (`.cursor/mcp.json`) configuration file:

### Global Configuration

```json
{
  "mcpServers": {
    "opensearch": {
      "command": "npx",
      "args": [
        "-y",
        "@skeetbuild/opensearch",
        "https://username:password@localhost:9200"
      ]
    }
  }
}
```

For more details on setting up MCP with Cursor, see the [Cursor MCP documentation](https://skeet.build/docs/apps/cursor#what-is-model-context-protocol).

## Usage with GitHub Copilot in VS Code

To use this server with [GitHub Copilot in VS Code](https://skeet.build/docs/apps/github-copilot), add a new MCP server using the VS Code command palette:

1. Press `Cmd+Shift+P` and search for "Add MCP Server"
2. Select "SSE MCP Server" and use the following configuration:

```json
{
  "mcp": {
    "servers": {
      "opensearch": {
        "command": "npx",
        "args": [
          "-y",
          "@skeetbuild/opensearch",
          "https://username:password@localhost:9200"
        ]
      }
    }
  }
}
```

For detailed setup instructions, see the [GitHub Copilot MCP documentation](https://skeet.build/docs/apps/github-copilot).

## Usage with Windsurf

To use this server with [Windsurf](https://skeet.build/docs/apps/windsurf), add the following configuration to your Windsurf MCP settings:

```json
{
  "mcpServers": {
    "opensearch": {
      "command": "npx",
      "args": [
        "-y",
        "@skeetbuild/opensearch",
        "https://username:password@localhost:9200"
      ]
    }
  }
}
```

For more information on configuring MCP with Windsurf, refer to the [Windsurf MCP documentation](https://skeet.build/docs/apps/windsurf).

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository. 