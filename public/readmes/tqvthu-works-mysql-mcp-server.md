# MySQL MCP Server

A Model Context Protocol (MCP) server for interacting with MySQL databases in Cursor IDE.

## Features
- Execute SQL queries (read-only by default).
- Inspect database schemas.
- Configurable write permissions.

## Installation
```bash
npm install
```

## Configuration
``` bash
Create .env with:
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=your_username
MYSQL_PASS=your_password
MYSQL_DB=your_database
ALLOW_INSERT_OPERATION=false
ALLOW_UPDATE_OPERATION=false
ALLOW_DELETE_OPERATION=false
```

## Usage in Cursor
``` bash
Add to .cursor/mcp.json
{
  "mcpServers": {
    "mysqlMcpServer": {
      "command": "npx",
      "args": ["ts-node", "path/to/src/index.ts"],
      "env": {
        "MYSQL_HOST": "<host>",
        "MYSQL_PORT": "<port>",
        "MYSQL_USER": "<user>",
        "MYSQL_PASS": "<pass>",
        "MYSQL_DB": "db",
        "ALLOW_INSERT_OPERATION": "false",
        "ALLOW_UPDATE_OPERATION": "false",
        "ALLOW_DELETE_OPERATION": "false"
      }
    }
  }
}
```
## License
MIT
