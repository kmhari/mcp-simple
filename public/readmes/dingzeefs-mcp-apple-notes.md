# MCP Apple Notes

A Model Context Protocol (MCP) server for semantic search and retrieval over Apple Notes.

## Features

- 🔍 Semantic search using on-device embeddings model
- 📝 Full-text search capabilities
- 💾 Vector storage with LanceDB
- 🍎 Native Apple Notes integration

## Prerequisites

- macOS (required for Apple Notes integration)
- [Bun](https://bun.sh/) JavaScript runtime

## Installation

1. Clone this repository:
```bash
git clone https://github.com/Dingzeefs/mcp-apple-notes.git
cd mcp-apple-notes
```

2. Install dependencies:
```bash
bun install
```

## Usage

### Configuring in Cursor IDE

1. Open Cursor IDE
2. Go to Settings → Features → MCP
3. Add a new MCP server with the following configuration:
   - **Name**: Apple Notes
   - **Type**: command
   - **Command**: `/path/to/bun /path/to/mcp-apple-notes/index.ts`
   
   Replace `/path/to/bun` with the actual path to your Bun executable (find it using `which bun`)
   and `/path/to/mcp-apple-notes` with the actual path to this repository.

4. Restart Cursor IDE

### Using the MCP Server

Once configured, you can use the following tools in your conversations with Claude:

- **list-notes**: Lists all your Apple Notes titles
- **index-notes**: Indexes your notes for semantic search (do this first)
- **get-note**: Retrieves a specific note by title
- **search-notes**: Searches your notes using semantic or keyword search
- **create-note**: Creates a new note with specified title and content

## Troubleshooting

If you encounter issues:

1. Check that the server is running by looking at the MCP server status in Cursor
2. Verify that the paths in your MCP server configuration are correct
3. Try running the command directly in your terminal to see any error messages
4. Make sure Apple Notes is accessible and permissions are granted

## License

MIT