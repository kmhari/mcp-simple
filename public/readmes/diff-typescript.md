# mcp-server-diff-typescript MCP Server

A Model Context Protocol server that provides unified diff generation capabilities.

This TypeScript-based MCP server implements a diff generation system. It provides a tool to generate unified diffs between two text strings, which is useful for comparing and analyzing text differences.

<a href="https://glama.ai/mcp/servers/3sbmp65pce"><img width="380" height="200" src="https://glama.ai/mcp/servers/3sbmp65pce/badge" alt="Server Diff TypeScript MCP server" /></a>

## Features

### Tools

- `get-unified-diff` - Generate unified diff between two text strings
  - Takes `oldString` and `newString` as required parameters
  - Returns the difference in unified diff format
  - Uses the `diff` package for accurate difference detection
  - Includes 3 lines of context around changes

## Installation

### As a Global Package

```bash
npm install -g mcp-server-diff-typescript
```

### As a Project Dependency

```bash
npm install mcp-server-diff-typescript
```

## Usage

### Using with Claude Desktop

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`  
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`


```json
"mcpServers": {
  "mcp-server-diff-typescript": {
    "command": "npx",
    "args": [
      "-y",
      "mcp-server-diff-typescript"
    ]
  }
}
```

or Add the following configuration:

```bash
git clone https://github.com/tatn/mcp-server-diff-typescript.git
cd mcp-server-diff-typescript
npm install
npm run build
```

```json
"mcpServers": {
  "mcp-server-diff-typescript": {
    "command": "node",
    "args": [
      "/path/to/mcp-server-diff-typescript/build/index.js"
    ]
  }
}
```

### Debugging

To debug the MCP server:

```bash
npx @modelcontextprotocol/inspector npx -y mcp-server-diff-typescript
```


```bash
npx @modelcontextprotocol/inspector node /path/to/mcp-server-diff-typescript/build/index.js
```
