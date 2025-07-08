[![smithery badge](https://smithery.ai/badge/@sussa3007/mysql-mcp)](https://smithery.ai/server/@sussa3007/mysql-mcp)


<a href="https://glama.ai/mcp/servers/@sussa3007/mysql-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@sussa3007/mysql-mcp/badge" />
</a>

# MySQL MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Model Context Protocol (MCP) server for MySQL databases that enables AI models to interact with MySQL databases through a structured interface.

## Overview

The MySQL MCP Server provides a bridge between AI models and MySQL databases, allowing AI agents to query and analyze MySQL data. This implementation follows the Model Context Protocol specification and offers both web server and CLI modes of operation.

## Features

- MySQL database connection management
- SQL query execution
- Table listing and structure inspection
- Database listing and selection
- Real-time status monitoring via SSE (Server-Sent Events)
- Web interface for testing MCP tools
- Support for both stdio and SSE transport methods
- Docker deployment ready

## Installation

```bash
# Global installation
npm install -g mysql-mcp

# Local installation
npm install mysql-mcp
```

## Using with AI Assistants

### Using the Published Server on Smithery.ai

The MySQL MCP Server is published on Smithery.ai and can be easily used with various AI assistants:

1. **Access the server**: Visit [https://smithery.ai/server/@sussa3007/mysql-mcp](https://smithery.ai/server/@sussa3007/mysql-mcp)

2. **Configure the server**:

   - Set your MySQL database connection details:
     - MYSQL_HOST
     - MYSQL_PORT
     - MYSQL_USER
     - MYSQL_PASSWORD
     - MYSQL_DATABASE
     - MYSQL_READONLY (optional, set to True for read-only access)

3. **Connect with supported AI platforms**:

   - Anthropic Claude
   - Cursor AI
   - Windsurf
   - Cline
   - Witsy
   - Enconvo
   - Goose

4. **Authentication**: Login to Smithery.ai to save your configuration and generate authentication tokens.

5. **Use in AI prompts**: Once connected, you can utilize MySQL tools in your AI conversations by asking the assistant to perform database operations.

### Using After Local Installation

To use a locally developed version:

1. Run `npm link` in your project directory
2. Configure your settings file as follows:

```json
{
  "mcpServers": {
    "mysql": {
      "command": "node",
      "args": ["mysql-mcp"],
      "env": {
        "MYSQL_HOST": "localhost",
        "MYSQL_PORT": "3306",
        "MYSQL_USER": "root",
        "MYSQL_PASSWORD": "your_password",
        "MYSQL_DATABASE": "your_database",
        "MYSQL_READONLY": "true"
      }
    }
  }
}
```

## Tools

### status

Check the current database connection status.

- **Inputs**: No parameters required
- **Returns**: Connection status information, including host, port, database, and username if connected.

### connect

Connect to a MySQL database.

- **Inputs**:
  - host (optional string): Database server hostname or IP address
  - port (optional string): Database server port
  - user (optional string): Database username
  - password (optional string): Database password
  - database (optional string): Database name to connect to
- **Returns**: Connection success message or error details.

### disconnect

Close the current MySQL database connection.

- **Inputs**: No parameters required
- **Returns**: Disconnection success message or error details.

### query

Execute an SQL query on the connected database.

- **Inputs**:
  - sql (string): SQL query to execute
  - params (optional array): Parameters for prepared statements
- **Returns**: Query results as JSON or error message.

### list_tables

Get a list of tables in the current database.

- **Inputs**: No parameters required
- **Returns**: List of table names in the current database.

### describe_table

Get the structure of a specific table.

- **Inputs**:
  - table (string): Name of the table to describe
- **Returns**: Table structure details including columns, types, keys, and other attributes.

### list_databases

Get a list of all accessible databases on the server.

- **Inputs**: No parameters required
- **Returns**: List of database names available on the server.

### use_database

Switch to a different database.

- **Inputs**:
  - database (string): Name of the database to switch to
- **Returns**: Confirmation message or error details.

## Keywords

mysql, mcp, database, ai, model context protocol

## License

MIT
