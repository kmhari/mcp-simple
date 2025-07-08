# mysql-server MCP Server

A Model Context Protocol server for MySQL database access

This is a TypeScript-based MCP server that provides tools for querying MySQL databases. It demonstrates core MCP concepts by providing:

- Tools for executing SQL queries
- Connection to MySQL databases via environment variables

## Features

### Tools
- `query` - Execute SQL queries
  - Takes SQL query string as required parameter
  - Returns query results

## Configuration

Set the following environment variables in your MCP server configuration:

- MYSQL_HOST: MySQL server host
- MYSQL_USER: MySQL username
- MYSQL_PASSWORD: MySQL password
- MYSQL_DATABASE: MySQL database name

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
    "mysql": {
      "command": "/path/to/mysql-server/build/index.js",
      "env": {
        "MYSQL_HOST": "your-mysql-host",
        "MYSQL_USER": "your-mysql-user",
        "MYSQL_PASSWORD": "your-mysql-password",
        "MYSQL_DATABASE": "your-mysql-database"
      }
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
