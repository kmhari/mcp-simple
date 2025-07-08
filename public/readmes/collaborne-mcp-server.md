# Next MCP server

A NEXT Model Context Protocol (MCP) server that provides tools for interacting
NEXT data.

## Overview

This MCP server allows Large Language Models (LLMs) like Claude to interact with
NEXT structured data. It provides tools for:

- Getting highlights
- Getting cluster

The server is built using TypeScript and the MCP SDK, providing a secure and standardized way for LLMs to interface with NEXT.

## Installation

### Prerequisites

- Node.js 18 or higher
- npm
- NEXT api key

### Setup

1. Install via npm:

```bash
# Install globally via npm
npm install -g @collaborne/mcp-server

# Or as a dependency in your project
npm install @collaborne/mcp-server
```

2. If building from source:

```bash
# Clone the repository
git clone https://github.com/Collaborne/mcp-server.git
cd mcp-server

# Install dependencies and build
npm install
npm run build
```

3. Configure NEXT access:

Create a `.env` file with your AWS configuration:

```
API_KEY=your-api-key
```

Or set these as environment variables.

## Configuration

The server can be configured using the following environment variables:

| Variable                | Description                                           | Default  |
| ----------------------- | -------------------------------------------------     | -------- |
| `API_KEY`               | NEXT api key that you can generate from your settings | ``       |

## Running the Server

You can run the server with Node.js:

```bash
# Using npx (without installing)
npx @collaborne/mcp-server

# If installed globally
npm install -g @collaborne/mcp-server
cd mcp-server

# If running from cloned repository
npm start

# Or directly
node dist/index.js
```

## Debugging on MCP Inspector

To debug the server using MCP Inspector, you can run `sh run-inspector.sh`

```bash
sh run-inspector.sh
```

## Connecting to Claude Desktop

To use this server with Claude Desktop:

1. Edit your Claude Desktop configuration file:

   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the NEXT MCP server to the configuration:

```json
{
  "mcpServers": {
    "mcp-server": {
      "command": "npx",
      "args": ["@collaborne/mcp-server"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

> **Important**: Please note the following when using the configuration above
>
> - Replace `NEXT_API_KEY` with your actual api key from next team-space. Access to the NEXT API is scoped to a specific team-space. Each API token is bound to one team-space and cannot access data outside of it.

### 💣 If error occurs on Claude Desktop

If you encounter errors with the above configuration in Claude Desktop, try using absolute paths as follows:

```bash
# Get the path of node and mcp-server
which node
which @collaborne/mcp-server
```

```json
{
  "globalShortcut": "",
  "mcpServers": {
    "next": {
      "command": "your-absolute-path-to-node",
      "args": ["your-absolute-path-to-mcp-server/dist/index.js"],
      "env": {
        "API_KEY": "your-api-key",
      }
    }
  }
}
```

## Available Tools

### next-get-highlights

Lists available NEXT highlights that the server has permission to access. This
tool is limited to one team-space

**Parameters:**

- `searchFilters` (required): filters for highlights based on the user query

**Example input:**

```
What are the user frustrations and issues mentioned in the last week 
```

**Example output:**

```json
{
  "searchFilters": {
    "dateFilter": "last week",
    "typeFilters": [
      "Pain Point"
    ]
  }
}
```

### next-get-clusters

Lists available NEXT clusters that the server has permission to access. This
tool is limited to one team-space

**Parameters:**

- `searchQuery` (required): search query for clusters based on the user query

**Example input:**

```
Summarize the main topics 
```

**Example output:**

```json
{
  "searchQuery": "main topics"
}
```

## Security Considerations

- The server will only access team-space specific data

## Usage with Claude

When interacting with Claude in the desktop app, you can ask it to perform NEXT operations like:

- "Summarize highlights about X topic"
- "What are the main pain points mentioned in clusters"

Claude will use the appropriate MCP tool to carry out the request and show you the results.

## License

MIT
