# Date MCP Server

[English](#date-mcp-server-english) | [日本語](README-ja.md)

---

## Date MCP Server (English)

A simple MCP Server that provides the current date and time.

### Features

- **Get Current Date and Time**: Returns the current date and time in the specified format and timezone

## Tools

1. `get_now`
   - Get the current date and time
   - Inputs:
     - `format` (optional string): Date format - 'ISO' or 'YYYY-MM-DD' (default: "ISO")
     - `timezone` (optional string): Timezone - 'Asia/Tokyo' or 'UTC' (default: "Asia/Tokyo")
   - Returns: Current date and time in the specified format and timezone

## Setup

1. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```
2. Build the TypeScript project:
   ```bash
   npm run build
   # or
   pnpm run build
   ```

### Docker Setup
You can build using Docker with the following command:

```bash
docker build -t date-mcp .
```

### Usage with Claude Desktop
To use this with Claude Desktop, add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "date": {
      "command": "node",
      "args": [
        "/path/to/date-mcp/build/index.js"
      ]
    }
  }
}
```

If you're using Docker, you can configure it like this:

```json
{
  "mcpServers": {
    "date": {
      "command": "docker",
        "args": [
          "run",
          "-i",
          "--rm",
          "date-mcp"
        ]
    }
  }
}
```

### Usage with VS Code

For quick installation in VS Code, configure your settings:

1. Open User Settings (JSON) in VS Code (`Ctrl+Shift+P` → `Preferences: Open User Settings (JSON)`)
2. Add the following configuration:

```json
{
  "mcp": {
    "servers": {
      "date": {
        "command": "node",
        "args": [
          "/path/to/date-mcp/build/index.js"
        ]
      }
    }
  }
}
```

If you're using Docker, you can configure it like this:

```json
{
  "mcp": {
    "servers": {
      "date": {
        "command": "docker",
          "args": [
          "run",
          "-i",
          "--rm",
          "date-mcp"
        ]
      }
    }
  }
}
```

Alternatively, you can add this to a `.vscode/mcp.json` file in your workspace (without the `mcp` key):

```json
{
  "servers": {
    "date": {
      "command": "node",
      "args": [
        "/path/to/date-mcp/build/index.js"
      ]
    }
  }
}
```

If you're using Docker, you can configure it like this:

```json
{
  "servers": {
    "date": {
      "command": "docker",
        "args": [
          "run",
          "-i",
          "--rm",
          "date-mcp"
        ]
    }
  }
}
```