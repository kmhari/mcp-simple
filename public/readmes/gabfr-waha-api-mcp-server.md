# OpenAPI MCP Server

This is a Model Context Protocol (MCP) server that reads an OpenAPI specification file and exposes each API operation as a tool for Claude AI to use.

## Features

- Automatically parses OpenAPI YAML files
- Generates MCP tools for each API operation
- Handles path parameters, query parameters, and request bodies
- Makes live API calls when Claude uses the tools
- Easy integration with Claude Desktop

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/openapi-mcp-server.git
cd openapi-mcp-server

# Install dependencies
npm install
```

## Usage

1. Place your OpenAPI YAML file in the project directory or provide a path to it via environment variables.

2. Set up environment variables (optional):

```bash
# Create a .env file
echo "DEBUG=true" > .env
echo "OPENAPI_FILE=./path/to/your/openapi.yaml" >> .env
```

3. Initialize the server with Claude Desktop:

```bash
npm run init
```

4. Or run the server manually:

```bash
npm start
```

## Configuration

You can configure the server using environment variables:

- `DEBUG`: Set to `true` to enable debug logging (default: `false`)
- `OPENAPI_FILE`: Path to your OpenAPI YAML file (default: `./openapi.yaml`)

## How it Works

The server reads your OpenAPI specification file and:

1. Extracts all paths and operations
2. Creates a tool for each operation with appropriate input schemas
3. When Claude calls a tool, the server makes the corresponding API request
4. The response is returned to Claude for analysis

## Example

With an OpenAPI spec like:

```yaml
paths:
  /users:
    get:
      operationId: listUsers
      summary: List all users
      ...
```

Claude can call the `listUsers` tool, and the server will make a GET request to `/users` on your behalf.

## License

MIT
