# Cursor MCP Apple Notes Plugin

A plugin for Cursor MCP that allows you to interact with Apple Notes directly from your editor.

## Features

- Search through your Apple Notes
- Create new notes
- Read existing notes.

## Installation

1. Open Cursor
2. Open the command palette (Cmd/Ctrl + Shift + P)
3. Type `MCP: Install Plugin`
4. Enter `packetnomad/cursor-mcp-apple-notes`

## Usage

The plugin adds the following commands to Cursor:

### Search Notes
```
MCP: notes.search <query>
```

### Create Note
```
MCP: notes.create
```
You'll be prompted to enter the title and content.

### Read Note
```
MCP: notes.read <id>
```

## Requirements

- macOS (required for Apple Notes integration)
- Cursor with MCP support

## License

MIT
