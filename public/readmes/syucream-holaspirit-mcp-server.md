# holaspirit-mcp-server
[![smithery badge](https://smithery.ai/badge/holaspirit-mcp-server)](https://smithery.ai/server/holaspirit-mcp-server)
[![npm version](https://badge.fury.io/js/holaspirit-mcp-server.svg)](https://badge.fury.io/js/holaspirit-mcp-server)

A [MCP(Model Context Protocol)](https://www.anthropic.com/news/model-context-protocol) server that accesses to [Holaspirit API](https://www.holaspirit.com/).

This server provides MCP-compatible access to Holaspirit's API, allowing AI assistants to interact with your Holaspirit data through a standardized interface.

<a href="https://glama.ai/mcp/servers/7tn35lri9w"><img width="380" height="200" src="https://glama.ai/mcp/servers/7tn35lri9w/badge" alt="Holaspirit Server MCP server" /></a>

## Features

Available tools:

- `holaspirit_list_tasks` - List all tasks in the organization
- `holaspirit_list_metrics` - List all metrics in the organization
- `holaspirit_list_circles` - List all circles in the organization
- `holaspirit_get_circle` - Get details of a specific circle
- `holaspirit_list_roles` - List all roles in the organization
- `holaspirit_get_role` - Get details of a specific role
- `holaspirit_list_domains` - List all domains in the organization
- `holaspirit_list_policies` - List all policies in the organization
- `holaspirit_list_meetings` - List all meetings in the organization
- `holaspirit_get_meeting` - Get details of a specific meeting
- `holaspirit_get_member_feed` - Get member feed
- `holaspirit_get_tensions` - Get tensions for a meeting or meetings
- `holaspirit_search_member` - Search for a member by email

## Quick Start

### Installation

#### Installing via Smithery

To install holaspirit-mcp-server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/holaspirit-mcp-server):

```bash
npx -y @smithery/cli install holaspirit-mcp-server --client claude
```

#### Manual Installation

```bash
npm install holaspirit-mcp-server
```

### Configuration

You can configure the server using environment variables. Two methods are supported:

#### Environment Variables

- `HOLASPIRIT_API_TOKEN`: Your Holaspirit API token
- `HOLASPIRIT_ORGANIZATION_ID`: Your Holaspirit organization ID

#### Using .env File

Create a `.env` file in the project root:

```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` with your actual values:

```bash
HOLASPIRIT_API_TOKEN=your_api_token_here
HOLASPIRIT_ORGANIZATION_ID=your_organization_id_here
```

### Usage

The server supports two transport modes:

#### Stdio Transport (Default)

For use with MCP clients that communicate via stdin/stdout:
```bash
npx holaspirit-mcp-server
```

#### HTTP Transport

For use with web clients or HTTP-based integrations using the latest Streamable HTTP protocol:
```bash
npx holaspirit-mcp-server --port 3000
```

The HTTP server accepts POST requests only on any path (e.g., `/`, `/mcp`, `/sse`) and uses the Streamable HTTP transport protocol.

#### Edit MCP configuration json for your client:

For stdio transport:
```json
...
    "holaspirit": {
      "command": "npx",
      "args": [
        "-y",
        "holaspirit-mcp-server"
      ],
      "env": {
        "HOLASPIRIT_API_TOKEN": "<your token>",
        "HOLASPIRIT_ORGANIZATION_ID": "<your org id>"
      }
    },
...
```

For HTTP transport, configure your client to connect to:
- `http://localhost:3000/` (or any path)

## Development

### Available Scripts

- `npm run dev` - Start the server in development mode with hot reloading
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
- `npm run lint` - Run linting checks (ESLint and Prettier)
- `npm run fix` - Automatically fix linting issues
- `npm run examples` - Run the example scripts

### Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests and linting: `npm run lint`
4. Commit your changes
5. Push to the branch
6. Create a Pull Request
