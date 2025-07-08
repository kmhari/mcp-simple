# Tempo MCP Server

A Go-based server implementation for the Model Context Protocol (MCP) with Grafana Tempo integration.

## Overview

This MCP server allows AI assistants to query and analyze distributed tracing data from Grafana Tempo. It follows the Model Context Protocol to provide tool definitions that can be used by compatible AI clients such as Claude Desktop.

## Getting Started

### Prerequisites

* Go 1.21 or higher
* Docker and Docker Compose (for local testing)

### Building and Running

Build and run the server:

```bash
# Build the server
go build -o tempo-mcp-server ./cmd/server

# Run the server
./tempo-mcp-server
```

Or run directly with Go:

```bash
go run ./cmd/server
```

The server now supports two modes of communication:
1. Standard input/output (stdin/stdout) following the Model Context Protocol (MCP)
2. HTTP Server with Server-Sent Events (SSE) endpoint for integration with tools like n8n

The default port for the HTTP server is 8080, but can be configured using the `SSE_PORT` environment variable.

## Server Endpoints

When running in HTTP mode, the server exposes the following endpoints:

- SSE Endpoint: `http://localhost:8080/sse` - For real-time event streaming
- MCP Endpoint: `http://localhost:8080/mcp` - For MCP protocol messaging

## Docker Support

You can build and run the MCP server using Docker:

```bash
# Build the Docker image
docker build -t tempo-mcp-server .

# Run the server
docker run -p 8080:8080 --rm -i tempo-mcp-server
```

Alternatively, you can use Docker Compose for a complete test environment:

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## Project Structure

```
.
├── cmd/
│   ├── server/       # MCP server implementation
│   └── client/       # Client for testing the MCP server
├── internal/
│   └── handlers/     # Tool handlers
├── pkg/
│   └── utils/        # Utility functions and shared code
└── go.mod            # Go module definition
```

## MCP Server

The Tempo MCP Server implements the Model Context Protocol (MCP) and provides the following tools:

### Tempo Query Tool

The `tempo_query` tool allows you to query Grafana Tempo trace data:

* Required parameters:
  * `query`: Tempo query string (e.g., `{service.name="frontend"}`, `{duration>1s}`)
* Optional parameters:
  * `url`: The Tempo server URL (default: from TEMPO_URL environment variable or http://localhost:3200)
  * `start`: Start time for the query (default: 1h ago)
  * `end`: End time for the query (default: now)
  * `limit`: Maximum number of traces to return (default: 20)
  * `username`: Username for basic authentication (optional)
  * `password`: Password for basic authentication (optional)
  * `token`: Bearer token for authentication (optional)

#### Environment Variables

The Tempo query tool supports the following environment variables:

* `TEMPO_URL`: Default Tempo server URL to use if not specified in the request
* `SSE_PORT`: Port for the HTTP/SSE server (default: 8080)

## Testing
```
./run-client.sh tempo_query "{resource.service.name=\\\"example-service\\\"}"
```

## Using with Claude Desktop

You can use this MCP server with Claude Desktop to add Tempo query tools. Follow these steps:

1. Build the server or Docker image
2. Configure Claude Desktop to use the server by adding it to your Claude Desktop configuration file

Example Claude Desktop configuration:

```json
{
  "mcpServers": {
    "temposerver": {
      "command": "path/to/tempo-mcp-server",
      "args": [],
      "env": {
        "TEMPO_URL": "http://localhost:3200"
      },
      "disabled": false,
      "autoApprove": ["tempo_query"]
    }
  }
}
```

For Docker:

```json
{
  "mcpServers": {
    "temposerver": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "-e", "TEMPO_URL=http://host.docker.internal:3200", "tempo-mcp-server"],
      "disabled": false,
      "autoApprove": ["tempo_query"]
    }
  }
}
```

The Claude Desktop configuration file is located at:
* On macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
* On Windows: `%APPDATA%\Claude\claude_desktop_config.json`
* On Linux: `~/.config/Claude/claude_desktop_config.json`

## Using with Cursor

You can also integrate the Tempo MCP server with the Cursor editor. To do this, add the following configuration to your Cursor settings:

```json
{
  "mcpServers": {
    "tempo-mcp-server": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "-e", "TEMPO_URL=http://host.docker.internal:3200", "tempo-mcp-server:latest"]
    }
  }
}
```

## Using with n8n

To use the Tempo MCP server with n8n, you can connect to it using the MCP Client Tool node:

1. Add an **MCP Client Tool** node to your n8n workflow
2. Configure the node with these parameters:
   - **SSE Endpoint**: `http://your-server-address:8080/sse` (replace with your actual server address)
   - **Authentication**: Choose appropriate authentication if needed
   - **Tools to Include**: Choose which Tempo tools to expose to the AI Agent

3. Connect the MCP Client Tool node to an AI Agent node that will use the Tempo querying capabilities

Example workflow:
Trigger → MCP Client Tool (Tempo server) → AI Agent (Claude)

## Example Usage

Once configured, you can use the tools in Claude with queries like:

* "Query Tempo for traces with the query `{duration>1s}`"
* "Find traces from the frontend service in Tempo using query `{service.name=\"frontend\"}`"
* "Show me the most recent 50 traces from Tempo with `{http.status_code=500}`"

<img width="991" alt="Screenshot 2025-04-11 at 5 24 03 PM" src="https://github.com/user-attachments/assets/bcb1fb78-5532-48ab-ada2-4857f6f22514" />


## License

This project is licensed under the MIT License. 
