# @reapi/mcp-openapi

A Model Context Protocol (MCP) server that loads and serves multiple OpenAPI specifications to enable LLM-powered IDE integrations. This server acts as a bridge between your OpenAPI specifications and LLM-powered development tools like Cursor and other code editors.

## Features

- Loads multiple OpenAPI specifications from a directory
- Exposes API operations and schemas through MCP protocol
- Enables LLMs to understand and work with your APIs directly in your IDE
- Supports dereferenced schemas for complete API context
- Maintains a catalog of all available APIs

## Powered by [ReAPI](https://reapi.com)

This open-source MCP server is sponsored by [ReAPI](https://reapi.com), a next-generation API platform that simplifies API design and testing. While this server provides local OpenAPI integration for development, ReAPI offers two powerful modules:

### 🎨 API CMS
- Design APIs using an intuitive no-code editor
- Generate and publish OpenAPI specifications automatically
- Collaborate with team members in real-time
- Version control and change management

### 🧪 API Testing
- The most developer-friendly no-code API testing solution
- Create and manage test cases with an intuitive interface
- Powerful assertion and validation capabilities
- Serverless cloud test executor
- Perfect for both QA teams and developers
- CI/CD integration ready

Try ReAPI for free at [reapi.com](https://reapi.com) and experience the future of API development.

## Cursor Configuration

To integrate the MCP OpenAPI server with Cursor IDE, you have two options for configuration locations:

### Option 1: Project-specific Configuration (Recommended)
Create a `.cursor/mcp.json` file in your project directory. This option is recommended as it allows you to maintain different sets of specs for different projects

```json
{
  "mcpServers": {
    "@reapi/mcp-openapi": {
      "command": "npx",
      "args": ["-y", "@reapi/mcp-openapi@latest", "--dir", "./specs"],
      "env": {}
    }
  }
}
```

> **Tip**: Using a relative path like `./specs` makes the configuration portable and easier to share across team members.
> 
> **Note**: We recommend using `@latest` tag as we frequently update the server with new features and improvements.
>
> **Important**: Project-specific configuration helps manage LLM context limits. When all specifications are placed in a single folder, the combined metadata could exceed the LLM's context window, leading to errors. Organizing specs by project keeps the context size manageable.

### Option 2: Global Configuration
Create or edit `~/.cursor/mcp.json` in your home directory to make the server available across all projects:

```json
{
  "mcpServers": {
    "@reapi/mcp-openapi": {
      "command": "npx",
      "args": ["-y", "@reapi/mcp-openapi@latest", "--dir", "/path/to/your/specs"],
      "env": {}
    }
  }
}
```

### Enable in Cursor Settings

After adding the configuration:

1. Open Cursor IDE
2. Go to Settings > Cursor Settings > MCP
3. Enable the @reapi/mcp-openapi server
4. Click the refresh icon next to the server to apply changes

> **Note**: By default, Cursor requires confirmation for each MCP tool execution. If you want to allow automatic execution without confirmation, you can enable [Yolo mode](https://docs.cursor.com/context/model-context-protocol#yolo-mode) in Cursor settings.

The server is now ready to use. When you add new OpenAPI specifications to your directory, you can refresh the catalog by:

1. Opening Cursor's chat panel
2. Typing one of these prompts:
   ```
   "Please refresh the API catalog"
   "Reload the OpenAPI specifications"
   ```

### OpenAPI Specification Requirements

1. Place your OpenAPI 3.x specifications in the target directory:
   - Supports both JSON and YAML formats
   - Files should have `.json`, `.yaml`, or `.yml` extensions
   - Scanner will automatically discover and process all specification files

2. Specification ID Configuration:
   - By default, the filename (without extension) is used as the specification ID
   - To specify a custom ID, add `x-spec-id` in the OpenAPI info object:
   ```yaml
   openapi: 3.0.0
   info:
     title: My API
     version: 1.0.0
     x-spec-id: my-custom-api-id  # Custom specification ID
   ```
   
   > **Important**: Setting a custom `x-spec-id` is crucial when working with multiple specifications that have:
   > - Similar or identical endpoint paths
   > - Same schema names
   > - Overlapping operation IDs
   >
   > The spec ID helps distinguish between these similar resources and prevents naming conflicts. For example:
   > ```yaml
   > # user-service.yaml
   > info:
   >   x-spec-id: user-service
   > paths:
   >   /users:
   >     get: ...
   > 
   > # admin-service.yaml
   > info:
   >   x-spec-id: admin-service
   > paths:
   >   /users:
   >     get: ...
   > ```
   > Now you can reference these endpoints specifically as `user-service/users` and `admin-service/users`

## How It Works

1. The server scans the specified directory for OpenAPI specification files
2. It processes and dereferences the specifications for complete context
3. Creates and maintains a catalog of all API operations and schemas
4. Exposes this information through the MCP protocol
5. IDE integrations can then use this information to:
   - Provide API context to LLMs
   - Enable intelligent code completion
   - Assist in API integration
   - Generate API-aware code snippets


## Tools

1. `refresh-api-catalog`
   - Refresh the API catalog
   - Returns: Success message when catalog is refreshed

2. `get-api-catalog`
   - Get the API catalog, the catalog contains metadata about all openapi specifications, their operations and schemas
   - Returns: Complete API catalog with all specifications, operations, and schemas

3. `search-api-operations`
   - Search for operations across specifications
   - Inputs:
     - `query` (string): Search query
     - `specId` (optional string): Specific API specification ID to search within
   - Returns: Matching operations from the API catalog

4. `search-api-schemas`
   - Search for schemas across specifications
   - Inputs:
     - `query` (string): Search query
     - `specId` (optional string): Specific API specification ID to search
   - Returns: Matching schemas from the API catalog

5. `load-api-operation-by-operationId`
   - Load an operation by operationId
   - Inputs:
     - `specId` (string): API specification ID
     - `operationId` (string): Operation ID to load
   - Returns: Complete operation details

6. `load-api-operation-by-path-and-method`
   - Load an operation by path and method
   - Inputs:
     - `specId` (string): API specification ID
     - `path` (string): API endpoint path
     - `method` (string): HTTP method
   - Returns: Complete operation details

7. `load-api-schema-by-schemaName`
   - Load a schema by schemaName
   - Inputs:
     - `specId` (string): API specification ID
     - `schemaName` (string): Name of the schema to load
   - Returns: Complete schema details

## Roadmap

1. **Semantic Search**
   - Enable natural language queries for API operations and schemas
   - Improve search accuracy with semantic understanding

2. **Remote Specs Sync**
   - Support syncing OpenAPI specifications from remote sources

3. **Code Templates**
   - Expose code templates through MCP protocol
   - Provide reference patterns for LLM code generation

4. **Community Contributions**
   - Submit feature requests and bug reports
   - Contribute to improve the server

## Example Prompts in Cursor

Here are some example prompts you can use in Cursor IDE to interact with your APIs:

1. **Explore Available APIs**
   ```
   "Show me all available APIs in the catalog with their operations"
   "List all API specifications and their endpoints"
   ```

2. **API Operation Details**
   ```
   "Show me the details of the create pet API endpoint"
   "What are the required parameters for creating a new pet?"
   "Explain the response schema for the pet creation endpoint"
   ```

3. **Schema and Mock Data**
   ```
   "Generate mock data for the Pet schema"
   "Create a valid request payload for the create pet endpoint"
   "Show me examples of valid pet objects based on the schema"
   ```

4. **Code Generation**
   ```
   "Generate an Axios client for the create pet API"
   "Create a TypeScript interface for the Pet schema"
   "Write a React hook that calls the create pet endpoint"
   ```

5. **API Integration Assistance**
   ```
   "Help me implement error handling for the pet API endpoints"
   "Generate unit tests for the pet API client"
   "Create a service class that encapsulates all pet-related API calls"
   ```

6. **Documentation and Usage**
   ```
   "Show me example usage of the pet API with curl"
   "Generate JSDoc comments for the pet API client methods"
   "Create a README section explaining the pet API integration"
   ```

7. **Validation and Types**
   ```
   "Generate Zod validation schema for the Pet model"
   "Create TypeScript types for all pet-related API responses"
   "Help me implement request payload validation for the pet endpoints"
   ```

8. **API Search and Discovery**
   ```
   "Find all endpoints related to pet management"
   "Show me all APIs that accept file uploads"
   "List all endpoints that return paginated responses"
   ```

These prompts demonstrate how to leverage the MCP server's capabilities for API development. Feel free to adapt them to your specific needs or combine them for more complex tasks.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 