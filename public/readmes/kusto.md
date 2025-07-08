## Kusto MCP Server

A mcp server that provides access to Azure Data Explorer (ADX) clusters.

### Tools

The following tools are provided by the server:

- list tables:
    - list_internal_tables:list all internal tables in the cluster
    - list_external_tables:list all external tables in the cluster
    - list_materialized_views:list all materialized views in the cluster
- execute query:
    - execute_query_internal_table:execute a query on an internal table or materialized view
    - execute_query_external_table:execute a query on an external table
- get table schema:
    - get_internal_table_schema:get the schema of an internal table or materialized view
    - get_external_table_schema:get the schema of an external table

### Claude Desktop configuration

Edit claude_desktop_config.json to add the following configuration:

```json
{
  "mcpServers": {
    "kusto": {
      "command": "uv",
      "args": [
        "--directory",
        "{{PATH_TO_PROJECT}}\\mcp-server-kusto\\src\\mcp_server_kusto",
        "run",
        "mcp-server-kusto",
        "--cluster",
        "{{ADX_CLUSTER_URL}}",
        "--authority_id",
        "{{TENANT_ID}}",
        "--client_id",
        "{{CLIENT_ID}}",
        "--client_secret",
        "{{CLIENT_SECRET}}"
      ]
    }
  }
}
```

When using azure data explorer emulator locally, provide the cluster url like `https://localhost:8082` and not need to
provide `--authority_id`, `--client_id`, `--client_secret`.

```json
{
  "mcpServers": {
    "kusto": {
      "command": "uv",
      "args": [
        "--directory",
        "{{PATH_TO_PROJECT}}\\mcp-server-kusto\\src\\mcp_server_kusto",
        "run",
        "mcp-server-kusto",
        "--cluster",
        "{{ADX_CLUSTER_URL}}"
      ]
    }
  }
}
```