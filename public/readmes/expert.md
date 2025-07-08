# MCP Expert Server

A Model Context Protocol server that provides intelligent query generation and documentation assistance using Claude AI. The server analyzes your API documentation and provides two main tools:

- **create-query**: Generates queries based on natural language requests
- **documentation**: Provides relevant documentation information based on questions

## Prerequisites

- Node.js >= 18
- An Anthropic API key for Claude

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file with your Anthropic API key:
```
ANTHROPIC_API_KEY=your_api_key_here
```

## Setup

Before running the server, you need to:

1. Build the project and run the setup script:
```bash
npm run build
npm run setup
```

This will:
- Create the required directories (`docs/` and `prompts/`)
- Create default prompt files
- Generate an initial service description

2. Add your API documentation files to the `docs/` directory (supports `.txt`, `.md`, and `.json` files)

3. Optionally customize the prompts in the `prompts/` directory:
   - `system-prompt.txt`: Main system prompt for Claude
   - `tool-metadata.txt`: Additional context for tool descriptions
   - `query-metadata.txt`: Additional context for query generation
   - `service-description.txt`: Auto-generated service description

## Usage

### Standalone Server

Start the server:
```bash
npm start
```

The server exposes two tools via the Model Context Protocol:

- **create-query**: Generate a query based on natural language request
  ```json
  {
    "name": "create-query",
    "arguments": {
      "request": "Find all users who signed up in the last week"
    }
  }
  ```

- **documentation**: Get information from the documentation
  ```json
  {
    "name": "documentation",
    "arguments": {
      "request": "How do I authenticate API requests?"
    }
  }
  ```

### Claude Desktop Integration

1. Add this configuration to your Claude Desktop config file:
```json
{
  "mcpServers": {
    "expert": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/expert-server/build/index.js"],
      "env": {
        "ANTHROPIC_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

2. Replace `/ABSOLUTE/PATH/TO/expert-server` with the actual absolute path to your server installation.

3. Restart Claude Desktop.

## Directory Structure

```
.
├── docs/                  # Your API documentation files
├── prompts/              # System prompts and metadata
│   ├── system-prompt.txt    # Main system prompt
│   ├── tool-metadata.txt    # Tool description context
│   ├── query-metadata.txt   # Query generation context
│   └── service-description.txt  # Generated service description
├── src/                  # Source code
│   ├── index.ts            # Entry point
│   ├── server.ts           # MCP server implementation
│   └── services/           # Core services
│       └── expertService.ts  # Claude integration
└── package.json
```

## Development

- Build the project:
```bash
npm run build
```

- The server uses TypeScript and follows a modular architecture
- All Claude interactions are handled by the ExpertService class
- Debug logs are written to stderr with [DEBUG] prefix

## Troubleshooting

If you encounter connection issues:

1. Ensure you've run the setup script:
```bash
npm run setup
```

2. Check that all required files exist in the `prompts/` directory
3. Verify your `ANTHROPIC_API_KEY` is correctly set
4. Use absolute paths in your Claude Desktop config
5. Check the debug logs (written to stderr)

## Environment Variables

- `ANTHROPIC_API_KEY`: Your Anthropic API key (required)

## License

MIT
