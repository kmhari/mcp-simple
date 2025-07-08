# zaj-MySQL-MCP

A Model Context Protocol (MCP) server implementation that provides database interaction and business intelligence capabilities through MySQL. This server enables running SQL queries, analyzing business data, and automatically generating business insight memos.

## Features

- Execute SQL queries against a MySQL database
- Create and manage database tables
- Analyze database schema
- Generate and store business insights
- Access a continuously updated business insights memo

## Tools

### Query Tools

- **read_query**: Execute SELECT queries to read data from the database
  - Input: `query` (string) - The SELECT SQL query to execute
  - Returns: Query results as array of objects

- **write_query**: Execute INSERT, UPDATE, or DELETE queries
  - Input: `query` (string) - The SQL modification query
  - Returns: `{ affected_rows: number }`

- **create_table**: Create new tables in the database
  - Input: `query` (string) - CREATE TABLE SQL statement
  - Returns: Confirmation of table creation

### Schema Tools

- **list_tables**: Get a list of all tables in the database
  - No input required
  - Returns: Array of table names

- **describe_table**: View schema information for a specific table
  - Input: `table_name` (string) - Name of table to describe
  - Returns: Array of column definitions with names and types

### Analysis Tools

- **append_insight**: Add new business insights to the memo resource
  - Input: `insight` (string) - Business insight discovered from data analysis
  - Returns: Confirmation of insight addition
  - Triggers update of memo://insights resource

## Resources

The server exposes a single resource:

- **memo://insights**: A continuously updated business insights memo that aggregates discovered insights during analysis
  - Auto-updates as new insights are discovered via the append-insight tool

## Implementation Details

This MCP server implements the Model Context Protocol directly, without relying on external SDK dependencies. It uses:

- **mysql2**: For MySQL database connectivity
- **yargs**: For command-line argument parsing
- **readline**: For handling stdin/stdout communication

The server follows the JSON-RPC 2.0 protocol for communication with Claude, handling requests for tool listings, resource listings, and tool execution.

## Configuration

The MySQL MCP server uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```
# Database Connection
DB_CONNECTION=mysql

# Database Host
DB_HOST=localhost

# Database Port
DB_PORT=3306

# Database Username (required)
DB_USER=your_mysql_username

# Database Password (required)
DB_PASSWORD=your_mysql_password

# Database Name (required)
DB_NAME=your_database_name
```

A `.env.example` file is provided as a template. Copy it to `.env` and update the values:

```bash
cp .env.example .env
# Then edit .env with your database credentials
```

## Usage with Claude Desktop

Add the server to your `cline_mcp_settings.json`:

```json
"mcpServers": {
  "mysql": {
    "command": "node",
    "args": [
      "/path/to/zaj_MySQL_MCP/build/index.js"
    ],
    "disabled": false,
    "autoApprove": []
  }
}
```

Note that database credentials are now configured through the `.env` file, not through command line arguments.

## Building and Running

1. Clone the repository:
```bash
git clone https://github.com/zajTools/zaj-MySQL-MCP.git
cd zaj-MySQL-MCP
```

2. Create and configure your .env file:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Install dependencies:
```bash
npm install
```

4. Build the server:
```bash
npm run build
```

5. Run the server:
```bash
node build/index.js
```

## Demo and Examples

We've included example materials to help you get started with the MySQL MCP server:

- **Sample Database**: A complete e-commerce database schema with customers, products, orders, and sales data
- **Example Queries**: Pre-written queries demonstrating various capabilities of the MCP server
- **Usage Scenarios**: Examples of how Claude can interact with your MySQL database

To try the demo:

1. Check out the [Demo Guide](examples/DEMO.md) for step-by-step instructions
2. Run the [Setup SQL Script](examples/sql/setup.sql) to create the sample database
3. Configure the MCP server to connect to the demo database
4. Start asking Claude questions about your data!

These examples are designed to show the potential of using Claude with MySQL databases, but the MCP server works with any MySQL database you have access to.

## License

This MCP server is licensed under the MIT License.
