# PostgreSQL Multi-Schema MCP Server

A Model Context Protocol server that provides read-only access to PostgreSQL databases with enhanced multi-schema support. This server enables LLMs to inspect database schemas across multiple namespaces and execute read-only queries while maintaining schema isolation.

## Key Features

- **Multi-Schema Support**: Explicitly specify which schemas to expose through command-line configuration
- **Schema Isolation**: Strict access control to only authorized schemas listed during server startup
- **Cross-Schema Discovery**: Unified view of tables across multiple schemas while maintaining schema boundaries
- **Metadata Security**: Filters system catalogs to only expose user-defined tables in specified schemas

## Components

### Tools

- **query**
  - Execute read-only SQL queries against the connected database
  - Input: `sql` (string): The SQL query to execute
  - All queries are executed within a READ ONLY transaction
  - Schema context maintained through search_path restriction

### Resources

The server provides schema information for each table across authorized schemas:

- **Table Schemas** (`postgres://<host>/<db_schema>/<table>/schema`)
  - JSON schema information for each table
  - Includes column names, data types, and type modifiers
  - Automatically discovered from database metadata
  - Multi-schema support with explicit schema allow-list

## Usage

The server requires a database URL and accepts a comma-separated list of schemas to expose:

```
npx -y mcp-server-postgres-multi-schema <database-url> [schemas]
```

- **database-url**: PostgreSQL connection string (e.g., `postgresql://localhost/mydb`)
- **schemas**: Comma-separated list of schemas to expose (defaults to 'public' if not specified)

### Examples

```bash
# Connect with default public schema
npx -y mcp-server-postgres-multi-schema postgresql://localhost/mydb

# Connect with multiple schemas
npx -y mcp-server-postgres-multi-schema postgresql://localhost/mydb public,analytics,staging
```

## Usage with Claude Desktop

Configure the "mcpServers" section in your `claude_desktop_config.json`:

### NPX

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-server-postgres-multi-schema",
        "postgresql://localhost/mydb",
        "public,audit"
      ]
    }
  }
}
```

## License

This multi-schema MCP server is licensed under the MIT License. You may use, modify, and distribute the software according to the terms in the LICENSE file.
