# Compresto MCP

A Model Context Protocol (MCP) server for Compresto, providing AI assistants with real-time data about Compresto's usage statistics.

<a href="https://glama.ai/mcp/servers/@dqhieu/compresto-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@dqhieu/compresto-mcp/badge" alt="Compresto MCP server" />
</a>

## What is Compresto?

Compresto is a file compression app that helps users reduce file sizes. This MCP server allows AI assistants to access current statistics about Compresto's usage.

## What is MCP?

The Model Context Protocol (MCP) is a standard that connects AI systems with external tools and data sources. This MCP server extends AI capabilities by providing access to Compresto's usage statistics.

## Installation

```bash
git clone https://github.com/dqhieu/compresto-mcp
cd compresto-mcp
npm install
npm run build
```

## Manual Configuration

Add the following to your MCP settings file
```json
{
  "mcpServers": {
    "compresto": {
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/TO/PARENT/FOLDER/compresto-mcp/build/index.js"
      ]
    }
  }
}
```

When integrated with compatible AI assistants, this MCP server provides real-time data about Compresto's usage.

## Available Tools

The Compresto MCP server provides the following tools:

### get-total-users

Returns the total number of Compresto users.

Example response: `12345`

### get-total-processed-files

Returns the total number of files processed by Compresto.

Example response: `Processed 67890 files`

### get-total-size-reduced

Returns the total amount of file size reduced by Compresto.

Example response: `Reduced 1234567890 bytes`

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Project Structure

- `src/index.ts` - Main entry point containing MCP server implementation
- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration

## License

MIT License