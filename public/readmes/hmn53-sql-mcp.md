# SQL MCP Server

This project provides a Python-based Model Context Protocol (MCP) server that allows a Large Language Model (LLM) to securely interact with SQL Server or PostgreSQL databases in a **read-only** capacity.

## Features

*   Connects to PostgreSQL or SQL Server databases.
*   Provides MCP tools to:
    *   `get_schema`: Fetch database schema (all tables or a specific table).
    *   `query_data`: Execute read-only `SELECT` queries.
*   Enforces read-only access through query validation.

## Setup

1.  **Environment:** This project uses `uv` for environment and dependency management. Ensure you have `uv` installed (`pip install uv`).

2.  **Dependencies:** The necessary dependencies have already been installed into the `.venv` directory using `uv add`. If you need to reinstall:
    ```bash
    uv sync
    ```

3.  **Configuration:**
    *   Copy the example environment file:
        ```bash
        cp .env.example .env
        ```
    *   Edit the `.env` file and set the `DATABASE_URL` variable to your database connection string. Examples are provided in the file for PostgreSQL and SQL Server (using `pyodbc`).
    *   Choose the appropriate SQLAlchemy driver prefix (`postgresql+asyncpg`, `mssql+pyodbc`, etc.) based on your database and installed driver.
    *   Ensure you have the necessary database drivers installed (e.g., `psycopg2-binary` is included, but for SQL Server, you might need `pyodbc` and system-level ODBC drivers).
    *   Configure the `TRANSPORT` (e.g., `stdio` or `sse`), `HOST`, and `PORT` as needed.

## Usage

### Development & Testing

You can run the server locally for testing using the MCP development tools:

```bash
# Activate the virtual environment (optional, uv run handles it)
# source .venv/bin/activate  # Linux/macOS
# .\.venv\Scripts\activate  # Windows

# Run with uv (recommended)
uv run mcp dev src/main.py

# Or run directly if environment is activated
# mcp dev src/main.py
```

This will start the MCP Inspector, allowing you to interact with the `get_schema` and `query_data` tools.

### Running Standalone

You can also run the server directly using the configured transport (stdio or sse):

```bash
# Ensure .env is configured (especially TRANSPORT)
uv run python src/main.py
```

### Integration with MCP Clients (e.g., Claude Desktop)

Refer to the `mcp install` command and the MCP client's documentation for integrating the server. You'll typically provide the command to run the server (using `uv run python src/main.py` or similar) and necessary environment variables.

**Example Stdio Configuration (Conceptual):**

```json
{
  "mcpServers": {
    "sql-explorer": {
      "command": "uv",
      "args": ["run", "python", "c:/path/to/sql-mcp/src/main.py"],
      "envFiles": ["c:/path/to/sql-mcp/.env"],
      "env": {
          "TRANSPORT": "stdio"
          // DATABASE_URL will be picked from .env file
      }
    }
  }
}
```

**Example SSE Configuration (Conceptual):**

Ensure `TRANSPORT=sse`, `HOST`, and `PORT` are set in `.env`.

```json
{
  "mcpServers": {
    "sql-explorer": {
      "transport": "sse",
      "url": "http://localhost:8051/sse" // Or configured HOST/PORT
    }
  }
}
```