[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/hungthai1401-bruno-mcp-badge.png)](https://mseep.ai/app/hungthai1401-bruno-mcp)

# Bruno MCP Server
<a href="https://glama.ai/mcp/servers/@hungthai1401/bruno-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@hungthai1401/bruno-mcp/badge" alt="Bruno MCP server" />
</a>

[![smithery badge](https://smithery.ai/badge/@hungthai1401/bruno-mcp)](https://smithery.ai/server/@hungthai1401/bruno-mcp)

An MCP (Model Context Protocol) server that enables running Bruno collections. This server allows LLMs to execute API tests using Bruno and get detailed results through a standardized interface.

## Features

* Run Bruno collections using the Bruno CLI
* Support for environment files
* Support for environment variables
* Detailed test results including:
  * Overall success/failure status
  * Test summary (total, passed, failed)
  * Detailed failure information
  * Execution timings

## Installation

### Installing via Smithery

To install Bruno MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@hungthai1401/bruno-mcp):

```bash
npx -y @smithery/cli install @hungthai1401/bruno-mcp --client claude
```

### Manual Installation
```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## Configuration

Add the server to your Claude desktop configuration file at `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "bruno-runner": {
      "command": "npx",
      "args": ["-y", "bruno-mcp"],
    }
  }
}
```

## Available Tools

### run-collection

Runs a Bruno collection and returns the test results.

**Parameters:**

* `collection` (required): Path to the Bruno collection
* `environment` (optional): Path to environment file
* `variables` (optional): Environment variables as key-value pairs

**Example Response:**

```json
{
  "success": true,
  "summary": {
    "total": 5,
    "failed": 0,
    "passed": 5
  },
  "failures": [],
  "timings": {
    "started": "2024-03-14T10:00:00.000Z",
    "completed": "2024-03-14T10:00:01.000Z",
    "duration": 1000
  }
}
```

### Example Usage in Claude

You can use the server in Claude by asking it to run a Bruno collection:

"Run the Bruno collection at /path/to/collection.bru and tell me if all tests passed"

Claude will:
1. Use the run-collection tool
2. Analyze the test results
3. Provide a human-friendly summary of the execution

## Development

### Project Structure

```
src/
  ├── index.ts           # Entry point
  ├── server.ts          # MCP Server implementation
  ├── runner.ts          # Bruno runner implementation
  └── types.ts           # Type definitions
```

### Running Tests

```bash
# Run tests
npm test

# Run tests with coverage
npm test:coverage
```

### Building

```bash
# Build the project
npm run build

# Clean build artifacts
npm run clean
```

## License

MIT 