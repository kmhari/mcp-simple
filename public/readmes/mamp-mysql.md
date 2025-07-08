# MySQL MCP Server

A Model Context Protocol (MCP) server that provides MySQL database access functionality.

## Features
- List database tables and their schemas
- Execute read-only SQL queries
- Secure connection handling with connection pooling

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```
3. Build the project:
```bash
npm run build
```

## Configuration

Set the following environment variables:
- `MYSQL_HOST`: MySQL server host
- `MYSQL_PORT`: MySQL server port
- `MYSQL_USER`: MySQL username
- `MYSQL_PASS`: MySQL password
- `MYSQL_DB`: MySQL database name
- `MYSQL_SOCKET`: MySQL socket path (alternative to host/port)
- `MYSQL_POOL_LIMIT`: Connection pool limit (default: 10)

## Usage

The server will automatically start when the MCP system initializes it. You can then use the provided tools and resources through the MCP interface.

## License

MIT