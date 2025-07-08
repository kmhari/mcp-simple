# db-mcp

A small little utility that allows AI assistants that support the Model Context Protocol (MCP) to query databases.

## Features

- Support for multiple database systems:
  - PostgreSQL
  - MySQL
  - SQLite
- Simple database connection using DSN (Data Source Name)

### Supported Tools

- `connect`: Connect to a database using a DSN.
- `query`: Run a query on a database and return the results in CSV format.
- `flavor`: Get the flavor of a connected database.


## Installation

```bash
go install github.com/alx99/db-mcp/cmd/db-mcp@latest
```

## Running

```bash
db-mcp
```

### Flags

- `-default-dsn`: The DSN to use for the default database.

## FAQ

- How can I construct a DSN?
  - [PostgreSQL](https://stackoverflow.com/a/20722229)
  - [MySQL](https://github.com/go-sql-driver/mysql?tab=readme-ov-file#dsn-data-source-name) (`mysql://` prefix needed)
  - [SQLite](https://github.com/mattn/go-sqlite3?tab=readme-ov-file#connection-string) (`sqlite://` prefix needed)
