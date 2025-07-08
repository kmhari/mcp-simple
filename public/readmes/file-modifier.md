# MCP Server File Modifier

A Model Context Protocol server for file modifications. This server provides functionality to modify files through Claude or other AI assistants using MCP.

## Features

- Add content at specific line numbers
- Replace existing content
- Delete content
- UTF-8 encoding support

## Installation

```bash
npm install -g mcp-server-file-modifier
```

## Usage

```bash
mcp-server-file-modifier
```

The server will start on port 3000 by default.

## API

The server provides the following operations:

- `add`: Add new content at a specific line
- `replace`: Replace content matching a target
- `delete`: Delete content matching a target

## License

MIT