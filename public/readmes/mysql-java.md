# MySQL MCP Server

Spring Boot server implementing Model Context Protocol (MCP) for MySQL database operations.

## Features

- Execute SELECT queries
- List all tables in database
- Get table schema information

## API

### Tools

- **query**
  - Execute a SELECT SQL query and return results
  - Input: `sql` (string)
  - Returns: List of query results (truncated after 4000 characters)
  - Note: Only SELECT queries are allowed

- **listAllTablesName**
  - List all table names in the database
  - No input required
  - Returns: Comma-separated list of table names

- **getTableSchema**
  - Get schema information for a specific table
  - Input: `tableName` (string)
  - Returns: Comma-separated list of column information including:
    - Column name
    - Data type
    - Nullable constraint
    - Default value


## Build

Maven build:

```bash
mvn install
```

## Usage with Claude Desktop or Cline

Add this to your mcp server config file:

```json
{
  "mysql-server": {
    "command": "java",
    "args": [
      "-jar",
      "{{ProjectDirectory}}\\target\\mcp-mysql-server-1.0.0.jar"
    ],
    "env": {
      "SPRING_DATASOURCE_URL": "jdbc:mysql://username:password@localhost:3306/database"
    }
  }
}
```
![001.png](images/001.png)

## Example
![002.png](images/002.png)

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
