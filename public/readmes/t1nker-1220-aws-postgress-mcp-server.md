# AWS PostgreSQL MCP Server

A Model Context Protocol (MCP) server providing read-only SQL query access to an AWS PostgreSQL database via the `query` tool. Configuration uses environment variables.

## Setup

1.  **Clone:**
    ```bash
    git clone https://github.com/T1nker-1220/aws-postgress-mcp-server.git
    cd aws-postgress-mcp-server
    ```
2.  **Install & Build:**
    ```bash
    pnpm install
    pnpm run build
    ```

## Configuration (for Cline/Windsurf)

Add this server to your MCP client's settings file (e.g., `c:\Users\<User>\AppData\Roaming\Windsurf\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`):

```json
{
  "mcpServers": {
    // ... other servers ...

    "aws-postgres-mcp-server": {
      "command": "node",
      "args": [
        // Full path to the built index.js
        "C:\\Users\\NATH\\Documents\\Cline\\MCP\\aws-postgress-mcp-server\\build\\index.js" 
      ],
      // Database credentials go in the 'env' object
      "env": {
        "DB_HOST": "YOUR_HOST.rds.amazonaws.com",
        "DB_PORT": "5432",
        "DB_NAME": "YOUR_DB_NAME",
        "DB_USER": "YOUR_DB_USER",
        "DB_PASSWORD": "YOUR_PASSWORD"
      },
      "transportType": "stdio",
      "disabled": false,
      "autoApprove": [] 
    }
    // ... other servers ...
  }
}
```

**-> Replace the placeholder values in the `env` object with your actual credentials.**

## Usage

Once configured, the client will start the server. Use the `query` tool:

```xml
<use_mcp_tool>
  <server_name>aws-postgres-mcp-server</server_name>
  <tool_name>query</tool_name>
  <arguments>
  {
    "sql": "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
  }
  </arguments>
</use_mcp_tool>
```

## Notes

*   The server only allows read-only queries (SELECT, SHOW, etc.).
*   To configure clients using `npx @t1nker-1220/aws-postgres-mcp-server ...`, the package must first be published to npm. The configuration would still use the `env` object for credentials.
