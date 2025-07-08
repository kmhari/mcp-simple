# @flexpa/mcp-fhir

> [!WARNING]
> This is an experimental demo not intended for production use.

This is a TypeScript-based MCP server that connects to a FHIR server. It provides core MCP functionality for interacting with FHIR resources by:

- Accessing FHIR resources via URIs
- Providing search capabilities for FHIR resources

## Features

### Resources

> [!TIP]
> "Resources" here refers to the MCP definition _not_ the FHIR one. MCP Resources are a core primitive in the Model Context Protocol (MCP) that allow servers to expose data and content that can be read by clients and used as context for LLM interactions.

- List and access FHIR resources via `fhir://` URIs
- Resources are returned in FHIR JSON format
- Supports all FHIR Resource types available in the FHIR server's CapabilityStatement

### Tools
- `search_fhir` - Search FHIR resources
  - Takes `resourceType` and `searchParams` as parameters
  - Returns FHIR search results
- `read_fhir` - Read an individual FHIR resource
  - Takes `uri` as a parameter
  - Returns the FHIR resource in JSON format

## Configuration

The server requires the following environment variables:
- `FHIR_BASE_URL`: The base URL of your FHIR server
- `FHIR_ACCESS_TOKEN`: A SMART on FHIR access token for authentication

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "fhir": {
      "command": "/path/to/@flexpa/mcp-fhir/build/index.js"
    },
    "env": {
      "FHIR_BASE_URL": "<FHIR_BASE_URL>",
      "FHIR_ACCESS_TOKEN": "<FHIR_ACCESS_TOKEN>"
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
