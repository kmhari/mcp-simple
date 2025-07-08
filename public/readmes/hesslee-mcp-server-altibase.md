# Altibase MCP Server

## Overview
- A Model Context Protocol (MCP) server implementation that provides database interaction and business intelligence capabilities through Altibase.
- This server enables running SQL queries, analyzing business data, and automatically generating business insight memos.
- This source code is maintained on https://github.com/hesslee/mcp-server-altibase
- This source code is based on https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite
- This package is uploaded on https://pypi.org/project/mcp-server-altibase

## Components

### Resources
The server exposes a single dynamic resource:
- `memo://insights`: A continuously updated business insights memo that aggregates discovered insights during analysis
  - Auto-updates as new insights are discovered via the append-insight tool

### Prompts
The server provides a demonstration prompt:
- `mcp-demo`: Interactive prompt that guides users through database operations
  - Required argument: `topic` - The business domain to analyze
  - Generates appropriate database schemas and sample data
  - Guides users through analysis and insight generation
  - Integrates with the business insights memo

### Tools
The server offers six core tools:

#### Query Tools
- `read_query`
   - Execute SELECT queries to read data from the database
   - Input:
     - `query` (string): The SELECT SQL query to execute
   - Returns: Query results as array of objects

- `write_query`
   - Execute INSERT, UPDATE, or DELETE queries
   - Input:
     - `query` (string): The SQL modification query
   - Returns: `{ affected_rows: number }`

- `create_table`
   - Create new tables in the database
   - Input:
     - `query` (string): CREATE TABLE SQL statement
   - Returns: Confirmation of table creation

#### Schema Tools
- `list_tables`
   - Get a list of all tables in the database
   - No input required
   - Returns: Array of table names

- `describe_table`
   - View schema information for a specific table
   - Input:
     - `table_name` (string): Name of table to describe
   - Returns: Array of column definitions with names and types

#### Analysis Tools
- `append_insight`
   - Add new business insights to the memo resource
   - Input:
     - `insight` (string): Business insight discovered from data analysis
   - Returns: Confirmation of insight addition
   - Triggers update of memo://insights resource

## Prereqisite
- Download and install Altibase server and client from http://support.altibase.com/en/product
- Unixodbc setting for Linux
- ODBC DSN setting for Windows

### Unixodbc setting example for Linux
- install : sudo apt-get install unixodbc-dev
- example configuration :
```
$ cat /etc/odbc.ini 
[PYODBC]
Driver          = /home/hess/work/altidev4/altibase_home/lib/libaltibase_odbc-64bit-ul64.so
Database        = mydb
ServerType      = Altibase
Server          = 127.0.0.1
Port            = 21121
UserName        = SYS
Password        = MANAGER
FetchBuffersize = 64
ReadOnly        = no

$ cat /etc/odbcinst.ini 
[ODBC]
Trace=Yes
TraceFile=/tmp/odbc_trace.log
```
### ODBC DSN setting example for Windows
- Altibase Windows ODBC driver is registered during Altibase Windows client installation procedure.
- Add a ODBC DSN for Altibase.
- example configuration :
```
[Altibase Connection Config]
Windows DSN Name: PYODBC
host(name or IP): 192.168.1.210
Port(default 20300): 21121
User: SYS
Password: MANAGER
Database: mydb
NLS_USE: UTF-8
```

## Usage with Claude Desktop
- Install Claude for desktop.

### uv
- Install uv
- uv is designed to be a fast and efficient alternative to pip and venv for Python package management and virtual environment creation.

### MCP client configuration example without git clone
```bash
# Add the server to your claude_desktop_config.json
"mcpServers": {
  "altibase": {
    "command": "uvx",
    "args": [
      "mcp-server-altibase@latest",
      "--odbc-dsn",
      "PYODBC"
    ]
  }
}
```

### MCP client configuration example with git clone
```bash
# Add the server to your claude_desktop_config.json
"mcpServers": {
  "altibase": {
    "command": "uv",
    "args": [
      "--directory",
      "path/to/repository/directory",
      "run",
      "mcp-server-altibase",
      "--odbc-dsn",
      "PYODBC"
    ]
  }
}
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
