# Bitable MCP Server

[![smithery badge](https://smithery.ai/badge/@lloydzhou/bitable-mcp)](https://smithery.ai/server/@lloydzhou/bitable-mcp)

This MCP server provides access to Lark Bitable through the Model Context Protocol. It allows users to interact with Bitable tables using predefined tools.

## One click installation & Configuration

### Installing via Smithery

To install Bitable Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@lloydzhou/bitable-mcp):

```bash
npx -y @smithery/cli install @lloydzhou/bitable-mcp --client claude
```

### Claude 

To install and configure the server, use the following command:
```bash
PERSONAL_BASE_TOKEN=your_personal_base_token APP_TOKEN=your_app_token uv run --with uv --with bitable-mcp bitable-mcp-install
```
Replace `your_personal_base_token` and `your_app_token` with your actual tokens.

### Cursor
Coming soon

### Windsurf
Coming soon

## Available Tools

- `list_table` - List tables for the current Bitable.
  - **Returns**: A JSON-encoded list of table names.

- `describe_table` - Describe a table by its name.
  - **Parameters**:
    - `name` (str): The name of the table to describe.
  - **Returns**: A JSON-encoded list of columns in the table.

- `read_query` - Execute a SQL query to read data from the tables.
  - **Parameters**:
    - `sql` (str): The SQL query to execute.
  - **Returns**: A JSON-encoded list of query results.

## Manual installation and configuration

Please make sure `uvx` is installed before installation.

Add to your Claude settings:

1. Using uvx

```json
"mcpServers": {
  "bitable-mcp": {
    "command": "uvx",
    "args": ["bitable-mcp"],
    "env": {
        "PERSONAL_BASE_TOKEN": "your-personal-base-token",
        "APP_TOKEN": "your-app-token"
    }
  }
}
```

2. Using pip installation

1) Install `bitable-mcp` via pip:

```bash
pip install bitable-mcp
```

2) Modify your Claude settings

```json
"mcpServers": {
  "bitable-mcp": {
    "command": "python",
    "args": ["-m", "bitable_mcp"],
    "env": {
        "PERSONAL_BASE_TOKEN": "your-personal-base-token",
        "APP_TOKEN": "your-app-token"
    }
  }
}
```

### Configure for Zed

Add to your Zed settings.json:

Using uvx

```json
"context_servers": [
  "bitable-mcp": {
    "command": "uvx",
    "args": ["bitable-mcp"],
    "env": {
        "PERSONAL_BASE_TOKEN": "your-personal-base-token",
        "APP_TOKEN": "your-app-token"
    }
  }
],
```

Using pip installation

```json
"context_servers": {
  "bitable-mcp": {
    "command": "python",
    "args": ["-m", "bitable_mcp"],
    "env": {
        "PERSONAL_BASE_TOKEN": "your-personal-base-token",
        "APP_TOKEN": "your-app-token"
    }
  }
},
```

## Debugging

You can use the MCP inspector to debug the server. For uvx installations:

```bash
npx @modelcontextprotocol/inspector uvx bitable-mcp
```
