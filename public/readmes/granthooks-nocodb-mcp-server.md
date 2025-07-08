# Nocodb MCP Server

This MCP server provides tools to interact with a Nocodb database through the Model Context Protocol, offering CRUD operations (Create, Read, Update, Delete) for Nocodb tables.

## Installation

1. Install the required dependencies:

```bash
pip install -r requirements.txt
```

2. Make sure you have the MCP Python SDK installed (it should be installed with the dependencies above):

```bash
pip install "mcp[cli]"
```

## Configuration

This MCP server requires three environment variables:

- `NOCODB_URL`: The base URL of your Nocodb instance (e.g., `https://example.com/ncdb`)
- `NOCODB_API_TOKEN`: The API token for authentication with Nocodb
- `NOCODB_BASE_ID`: The base ID of your Nocodb database

You can obtain an API token from your Nocodb instance by:
1. Login to your Nocodb instance
2. Go to Account settings > API Tokens
3. Create a new token with appropriate permissions

The base ID can be found in the URL of your Nocodb dashboard: `https://your-nocodb.com/dashboard/#/nc/base/YOUR_BASE_ID/table/...`

## Usage

### With Claude Desktop

To integrate with **Claude Desktop**, add this configuration to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "nocodb": {
      "command": "python",
      "args": [
        "path/to/nocodb_mcp_server.py"
      ],
      "env": {
        "NOCODB_URL": "https://your-nocodb-instance.com",
        "NOCODB_API_TOKEN": "your_api_token_here",
        "NOCODB_BASE_ID": "your_base_id_here"
      }
    }
  }
}
```

Or use the MCP CLI to install (recommended):

```bash
# Basic installation
mcp install nocodb_mcp_server.py

# With environment variables
mcp install nocodb_mcp_server.py -v NOCODB_URL=https://your-nocodb-instance.com -v NOCODB_API_TOKEN=your_token -v NOCODB_BASE_ID=your_base_id

# OR using an .env file
mcp install nocodb_mcp_server.py -f .env
```

### Running as a Standalone Server

```bash
# Install dependencies
pip install -r requirements.txt

# Run the server directly
python nocodb_mcp_server.py

# Or using the MCP CLI
mcp run nocodb_mcp_server.py
```

### Development Mode

For testing and debugging with the MCP Inspector:

```bash
# Run in development mode
mcp dev nocodb_mcp_server.py
```

### With Cursor on Windows

For Cursor on Windows, use the following syntax in your `mcp.json` configuration file:

```json
{
  "mcpServers": {
    "nocodb": {
      "command": "C:\\Path\\To\\Your\\Python\\Executable",
      "args": [
        "C:\\Path\\To\\Your\\nocodb_mcp_server.py"
      ],
      "env": {
        "NOCODB_URL": "http://localhost:8080",
        "NOCODB_API_TOKEN": "your_api_token_here",
        "NOCODB_BASE_ID": "your_base_id_here"
      }
    }
  }
}
```

## Available Tools

The server provides the following tools:

### 1. retrieve_records

Retrieve one or multiple records from a Nocodb table.

**Parameters:**
- `table_name`: Name of the table to query
- `row_id` (Optional): Specific row ID to retrieve a single record
- `filters` (Optional): Filter conditions in Nocodb format
- `limit` (Optional): Maximum number of records to return (default: 10)
- `offset` (Optional): Number of records to skip for pagination (default: 0)
- `sort` (Optional): Column to sort by
- `fields` (Optional): Comma-separated list of fields to include

**Examples:**

```python
# Get all records from a table (limited to 10)
retrieve_records(table_name="customers")

# Get a specific record by ID
retrieve_records(table_name="customers", row_id="123")

# Filter records with conditions
retrieve_records(
    table_name="customers", 
    filters="(age,gt,30)~and(status,eq,active)"
)
```

### 2. create_records

Create one or multiple records in a Nocodb table.

**Parameters:**
- `table_name`: Name of the table to insert into
- `data`: Dict with column:value pairs or a list of such dicts for bulk creation
- `bulk` (Optional): Set to True for bulk creation

**Examples:**

```python
# Create a single record
create_records(
    table_name="customers",
    data={"name": "John Doe", "email": "john@example.com", "age": 35}
)

# Create multiple records in bulk
create_records(
    table_name="customers",
    data=[
        {"name": "John Doe", "email": "john@example.com", "age": 35},
        {"name": "Jane Smith", "email": "jane@example.com", "age": 28}
    ],
    bulk=True
)
```

### 3. update_records

Update one or multiple records in a Nocodb table.

**Parameters:**
- `table_name`: Name of the table to update
- `row_id`: ID of the record to update (required for single record update)
- `data`: Dictionary with column:value pairs to update
- `bulk` (Optional): Set to True for bulk updates
- `bulk_ids` (Optional): List of record IDs to update when bulk=True

**Examples:**

```python
# Update a single record by ID
update_records(
    table_name="customers",
    row_id="123",
    data={"name": "John Smith", "status": "inactive"}
)

# Update multiple records in bulk by IDs
update_records(
    table_name="customers",
    data={"status": "inactive"},  # Same update applied to all records
    bulk=True,
    bulk_ids=["123", "456", "789"]
)
```

### 4. delete_records

Delete one or multiple records from a Nocodb table.

**Parameters:**
- `table_name`: Name of the table to delete from
- `row_id`: ID of the record to delete (required for single record deletion)
- `bulk` (Optional): Set to True for bulk deletion
- `bulk_ids` (Optional): List of record IDs to delete when bulk=True

**Examples:**

```python
# Delete a single record by ID
delete_records(
    table_name="customers",
    row_id="123"
)

# Delete multiple records in bulk by IDs
delete_records(
    table_name="customers",
    bulk=True,
    bulk_ids=["123", "456", "789"]
)
```

### 5. get_schema

Retrieve the schema (columns) of a Nocodb table.

**Parameters:**
- `table_name`: Name of the table to get the schema for

**Returns:**
- Dictionary containing the table schema or error information. The schema details, including the list of columns, are typically nested within the response.

**Example:**

```python
# Get the schema for the "products" table
get_schema(table_name="products")
```

## Notes on Nocodb API

This MCP server interacts with the Nocodb v2 REST API as described in the [Nocodb API documentation](https://docs.nocodb.com/developer-resources/rest-apis/).

**Key Implementation Details:**
- Uses v2 API endpoints for all operations
- Gets the base ID from the NOCODB_BASE_ID environment variable
- Automatically resolves table IDs from table names
- Authentication is handled via the `xc-token` header (Nocodb v2 API requirement)
- Provides comprehensive error handling and responses

REST API References:
- https://docs.nocodb.com/developer-resources/rest-APIs/overview
- Specific endpoints: `/api/v2/tables/{tableId}/records/...` and `/api/v2/meta/tables/{tableId}`

### Authentication

Authentication is handled via the `xc-token` header, which is automatically populated using the `NOCODB_API_TOKEN` environment variable. This is the authentication mechanism required by the Nocodb v2 API.

### Logging
The server includes logging for debugging purposes. By default, the MCP server's log level is set to `ERROR` in `nocodb_mcp_server.py` ( `mcp = FastMCP("Nocodb MCP Server", log_level="ERROR")` ) to avoid excessive output during standard operations like `mcp list`. If more detailed logs are needed for troubleshooting, you can uncomment the `logging.basicConfig` section and adjust the level (e.g., `level=logging.INFO` or `level=logging.DEBUG`).

### Error Handling

All tools return structured responses that include error information if the operation fails. This makes it easy to determine if an operation was successful and to troubleshoot any issues.

## Security Considerations

* **Use dedicated API tokens** with minimal privileges required for your operations.
* **Never share API tokens** in public repositories or insecure locations.
* **Restrict database access** to only necessary operations through Nocodb's permission system.
* **Enable logging and auditing** in your Nocodb instance for security monitoring.
* **Regularly review and rotate API tokens** to minimize security risks.
* **Store environment variables securely**, especially in production environments.

## Security Best Practices

For a secure setup:

1. **Create a dedicated API token** with restricted permissions in Nocodb.
2. **Avoid hardcoding credentials**—always use environment variables.
3. **Set appropriate table-level permissions** in Nocodb to restrict access.
4. **Enable audit logs** if available in your Nocodb instance.
5. **Review database access regularly** to prevent unauthorized access.

⚠️ **IMPORTANT:** Always follow the **Principle of Least Privilege** when configuring API tokens and database access.
