# project-npm MCP Server

Server to call npm and npx command from LLM

This is a TypeScript-based MCP server that implements a simple npm system.

- Executes `npm` and `npx` commands

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
    "project-npm": {
      "command": "/path/to/project-npm/build/index.js"
    }
  }
}
```
