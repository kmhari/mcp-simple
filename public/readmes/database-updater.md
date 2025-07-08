# database-updater MCP Server

A Model Context Protocol server for updating databases from CSV and Excel files.

## Features

### Tools
- `update_database` - Update database from CSV/Excel files
  - Supports CSV and Excel (.xlsx, .xls) file formats
  - Compatible with multiple database types (PostgreSQL, MySQL, MongoDB, SQLite)
  - Configurable connection settings and table mapping
  
- `create_note` - Create and manage notes (for documentation)
  - Store important information about database updates
  - Track changes and modifications

## Usage

### Update Database
Use the `update_database` tool with the following parameters:
```json
{
  "filePath": "/path/to/your/file.csv",
  "databaseType": "PostgreSQL",
  "connectionString": "postgresql://user:pass@localhost:5432/db",
  "tableName": "target_table"
}
```

### Supported Database Types
- PostgreSQL
- MySQL
- MongoDB
- SQLite

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
    "database-updater": {
      "command": "/path/to/database-updater/build/index.js"
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector):

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
