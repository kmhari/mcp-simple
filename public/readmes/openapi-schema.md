# OpenAPI Schema Model Context Protocol Server

A Model Context Protocol (MCP) server that exposes OpenAPI schema information to Large Language Models (LLMs) like Claude. This server allows an LLM to explore and understand OpenAPI specifications through a set of specialized tools.

## Features

- Load any OpenAPI schema file (JSON or YAML) specified via command line argument
- Explore API paths, operations, parameters, and schemas
- View detailed request and response schemas
- Look up component definitions and examples
- Search across the entire API specification
- Get responses in YAML format for better LLM comprehension

## Usage

### Command Line

Run the MCP server with a specific schema file:

```bash
# Use the default openapi.yaml in current directory
npx -y mcp-openapi-schema

# Use a specific schema file (relative path)
npx -y mcp-openapi-schema ../petstore.json

# Use a specific schema file (absolute path)
npx -y mcp-openapi-schema /absolute/path/to/api-spec.yaml

# Show help
npx -y mcp-openapi-schema --help
```

### Claude Desktop Integration

To use this MCP server with Claude Desktop, edit your `claude_desktop_config.json` configuration file:

```json
{
  "mcpServers": {
    "OpenAPI Schema": {
      "command": "npx",
      "args": ["-y", "mcp-openapi-schema", "/ABSOLUTE/PATH/TO/openapi.yaml"]
    }
  }
}
```

Location of the configuration file:

- macOS/Linux: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `$env:AppData\Claude\claude_desktop_config.json`

### Claude Code Integration

To use this MCP server with Claude Code CLI, follow these steps:

1. **Add the OpenAPI Schema MCP server to Claude Code**

   ```bash
   # Basic syntax
   claude mcp add openapi-schema npx -y mcp-openapi-schema

   # Example with specific schema
   claude mcp add petstore-api npx -y mcp-openapi-schema ~/Projects/petstore.yaml
   ```

2. **Verify the MCP server is registered**

   ```bash
   # List all configured servers
   claude mcp list

   # Get details for your OpenAPI schema server
   claude mcp get openapi-schema
   ```

3. **Remove the server if needed**

   ```bash
   claude mcp remove openapi-schema
   ```

4. **Use the tool in Claude Code**

   Once configured, you can invoke the tool in your Claude Code session by asking questions about the OpenAPI schema.

**Tips:**

- Use the `-s` or `--scope` flag with `project` (default) or `global` to specify where the configuration is stored
- Add multiple MCP servers for different APIs with different names

## MCP Tools

The server provides the following tools for LLMs to interact with OpenAPI schemas:

- `list-endpoints`: Lists all API paths and their HTTP methods with summaries in a nested object structure
- `get-endpoint`: Gets detailed information about a specific endpoint including parameters and responses
- `get-request-body`: Gets the request body schema for a specific endpoint and method
- `get-response-schema`: Gets the response schema for a specific endpoint, method, and status code
- `get-path-parameters`: Gets the parameters for a specific path
- `list-components`: Lists all schema components (schemas, responses, parameters, etc.)
- `get-component`: Gets detailed definition for a specific component
- `list-security-schemes`: Lists all available security schemes
- `get-examples`: Gets examples for a specific component or endpoint
- `search-schema`: Searches across paths, operations, and schemas

## Examples

Example queries to try:

```
What endpoints are available in this API?
Show me the details for the POST /pets endpoint.
What parameters does the GET /pets/{petId} endpoint take?
What is the request body schema for creating a new pet?
What response will I get from the DELETE /pets/{petId} endpoint?
What schemas are defined in this API?
Show me the definition of the Pet schema.
What are the available security schemes for this API?
Are there any example responses for getting a pet by ID?
Search for anything related to "user" in this API.
```