# Spring AI MCP Database Schema Server

A Model Context Protocol (MCP) server built with Spring Boot and Spring AI that provides tools to inspect a PostgreSQL database schema. This server is designed to work with Cursor and other MCP clients that support SSE transport.

## Features

- Get schema (columns, types) for a specific table (`getTableSchema` tool)
- Get outgoing foreign key dependencies for a table (`getTableDependencies` tool)
- Get incoming foreign key references to a table (`getTableReferencedBy` tool)
- **Execute arbitrary SQL SELECT queries (`executeSql` tool) - USE WITH EXTREME CAUTION!**
- Uses Server-Sent Events (SSE) for communication.

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- PostgreSQL database accessible from where the server runs
- An MCP Client that supports SSE transport (e.g., Cursor)

## Configuration

1.  **Database Connection:** Update the database connection details (URL, username, password) in `src/main/resources/application.yml`.
    **Security Warning:** It is strongly recommended to configure a read-only database user in `application.yml` if you intend to use the `executeSql` tool, to minimize potential damage from unintended queries.

## Building the Server

To build the server, run:

```bash
mvn clean package
```

This will create an executable JAR file in the `target` directory (e.g., `mcp-weather-spring-1.0-SNAPSHOT.jar`).

## Running the Server

Run the server using the standard Spring Boot command:

```bash
java -jar target/mcp-weather-spring-1.0-SNAPSHOT.jar
```

The server will start on port 8080 by default and attempt to connect to the configured database.

## Configuring Cursor

1.  Ensure the server is running.
2.  Open your Cursor MCP configuration file:
    -   **Project Specific**: `.cursor/mcp.json` in your project root.
    -   **Global**: `~/.cursor/mcp.json` in your home directory.
3.  Add or update the server configuration to use SSE:

```json
{
  "mcpServers": {
    "PostgresSchemaServer": {
      "transport": "sse",
      "url": "http://localhost:8080/sse"
    }
    // Add other servers here if needed
  }
}
```

4.  Restart Cursor.

## Usage Examples in Cursor

Once the server is running, connected to the database, and Cursor is configured and restarted:

-   Open the chat or use the Agent (`Cmd+K` / `Ctrl+K`).
-   The tools `getTableSchema`, `getTableDependencies`, `getTableReferencedBy`, and `executeSql` from `PostgresSchemaServer` should be available.
-   Ask questions like:
    -   "Use PostgresSchemaServer to get the schema for the 'users' table."
    -   "What are the dependencies of the 'orders' table?"
    -   "Which tables reference the 'products' table?"
    -   **(Use with Caution!)** "Execute the SQL query 'SELECT first_name, email FROM customers WHERE customer_id = 1' using the executeSql tool."
    -   **(Use with Caution!)** "First get the schema for the customers table, then execute a SQL query to select the email for the customer named Alice Smith."

**WARNING:** The `executeSql` tool allows running SQL queries provided by the LLM. This is inherently risky. Only use this tool if you understand the risks and have appropriate security measures in place (like a read-only database user).

## Troubleshooting

-   **Server Connection Issues:**
    -   Verify the server is running (check the terminal output).
    -   Ensure the `url` in `.cursor/mcp.json` matches the server's address and port (default: `http://localhost:8080/sse`).
    -   Check for firewall issues blocking the connection between Cursor and the server.
-   **Database Connection Errors:**
    -   Check the server startup logs for errors related to database connection.
    -   Verify the database credentials and URL in `application.yml` are correct.
    -   Ensure the PostgreSQL server is running and accessible.
-   **Tool Not Found/Working:**
    -   Restart Cursor after configuring `mcp.json`.
    -   Check the server logs for errors when a tool is called (e.g., table not found, SQL errors).
-   **executeSql Errors:**
    -   The tool currently only allows queries starting with `SELECT` (case-insensitive).
    -   Check server logs for detailed SQL execution errors from the database driver. 