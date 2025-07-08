# Skeet local MCP Server

A Model Context Protocol server connects to your Skeet MCP Servers and automatically configures all your mcp tools.

To learn more about MCP Servers see:
- [What is MCP](https://skeet.build/docs/guides/what-is-mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)

This Skeet Local MCP Server was designed for seamless integration with [skeet.build](https://skeet.build)

## Components

Note that tools will only appear if the configurations have been set.

### Tools

- **refresh_skeet_tools**
  - Refreshes the available Skeet tools and configurations
  - No input required
  - Use this when you've updated your Skeet configuration or connected new services

- **postgres_query**
  - Execute read-only SQL queries against PostgreSQL databases
  - Input: `sql` (string): The SQL query to execute
  - All queries are executed within a READ ONLY transaction

- **mysql_query**
  - Execute read-only SQL queries against MySQL databases
  - Input: `sql` (string): The SQL query to execute
  - All queries are executed within a READ ONLY transaction

- **redis_query**
  - Execute Redis commands (primarily read operations)
  - Input: `command` (string): The Redis command to execute
  - Supports common read commands like GET, KEYS, HGETALL, etc.
  - Also supports select write operations for sets (SADD, SREM, etc.)

- **redis_get**
  - Get value for a specific Redis key
  - Input: `key` (string): The key to retrieve

- **redis_set**
  - Set value for a specific Redis key
  - Input: 
    - `key` (string): The key to set
    - `value` (string): The value to store
    - `expiry` (number, optional): Expiration time in seconds

- **opensearch_search**
  - Run a search query against OpenSearch
  - Input: 
    - `query` (string): The search query (JSON string or query string)
    - `index` (string, optional): The index to search in

### Resources

The server provides schema/mapping information for each connected database system:

- **PostgreSQL Table Schemas** (`postgres://<host>/<table>/schema`)
  - JSON schema information for each PostgreSQL table
  - Includes column names and data types
  - Automatically discovered from database metadata

- **MySQL Table Schemas** (`mysql://<host>/<table>/schema`)
  - JSON schema information for each MySQL table
  - Includes column names and data types
  - Automatically discovered from database metadata

- **Redis Key Information** (`redis://<host>/<key>/schema`)
  - Provides metadata about Redis keys
  - Includes key type and structure information
  - For sets, hashes, and lists, includes member information

- **Redis Keys Listing** (`redis://<host>/keys`)
  - Lists all available Redis keys with their types

- **OpenSearch Index Mappings** (`opensearch://<host>/<index>/mapping`)
  - JSON mapping information for each OpenSearch index
  - Includes field names, types, and analysis settings
  - Automatically discovered from OpenSearch metadata

## Authentication

You can provide your Skeet API key as an environment variable when running the MCP server:

```bash
SKEET_API_KEY=your_api_key_here npx -y @skeetbuild/skeet-local
```

This allows the MCP server to authenticate with the Skeet API for extended capabilities and usage tracking.

## Usage with Claude Desktop

To use this server with the Claude Desktop app, add the following configuration to the "mcpServers" section of your `claude_desktop_config.json`:

### NPX

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@skeetbuild/skeet-local"
      ],
      "env": {
        "SKEET_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Replace `/mydb` with your database name and `your_api_key_here` with your actual Skeet API key.

## Usage with Cursor

To use this server with [Cursor](https://skeet.build/docs/apps/cursor#what-is-model-context-protocol), add the following configuration to your global (`~/.cursor/mcp.json`) or project-specific (`.cursor/mcp.json`) configuration file:

### Global Configuration

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@skeetbuild/skeet-local"
      ],
      "env": {
        "SKEET_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

For more details on setting up MCP with Cursor, see the [Cursor MCP documentation](https://skeet.build/docs/apps/cursor#what-is-model-context-protocol).

## Usage with GitHub Copilot in VS Code

To use this server with [GitHub Copilot in VS Code](https://skeet.build/docs/apps/github-copilot), add a new MCP server using the VS Code command palette:

1. Press `Cmd+Shift+P` and search for "Add MCP Server"
2. Select "SSE MCP Server" and use the following configuration:

```json
{
  "mcp": {
    "servers": {
      "postgres": {
        "command": "npx",
        "args": [
          "-y",
          "@skeetbuild/skeet-local"
        ],
        "env": {
          "SKEET_API_KEY": "your_api_key_here"
        }
      }
    }
  }
}
```

For detailed setup instructions, see the [GitHub Copilot MCP documentation](https://skeet.build/docs/apps/github-copilot).

## Usage with Windsurf

To use this server with [Windsurf](https://skeet.build/docs/apps/windsurf), add the following configuration to your Windsurf MCP settings:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@skeetbuild/skeet-local"
        "postgresql://localhost:5432/mydb"
      ],
      "env": {
        "SKEET_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

For more information on configuring MCP with Windsurf, refer to the [Windsurf MCP documentation](https://skeet.build/docs/apps/windsurf).

## Acknowledgements

This server is based on the PostgreSQL MCP server from the [modelcontextprotocol project](https://github.com/modelcontextprotocol/servers/blob/main/src/postgres).

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.