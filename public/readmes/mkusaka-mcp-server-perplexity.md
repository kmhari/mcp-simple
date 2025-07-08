# Perplexity AI MCP Server

An MCP server implementation that integrates Perplexity AI's API, providing advanced search capabilities with multiple model options.

## Features

- Search using Perplexity AI's models
- Support for all official Sonar models
- Configurable result count
- Detailed error handling and logging
- MCP Inspector compatible

## Available Models

- sonar-reasoning-pro (127k context)
- sonar-reasoning (127k context)
- sonar-pro (200k context)
- sonar (127k context)

## Installation

```bash
pnpm install
pnpm build
```

## Configuration

### API Key
1. Sign up for a [Perplexity AI account](https://www.perplexity.ai)
2. Get your API key from the dashboard
3. Set the environment variable:
```bash
export PERPLEXITY_API_KEY=your_api_key_here
```

## Usage

### Direct Execution
```bash
node dist/index.js
# or if you made it executable
./dist/index.js
```

### Development
```bash
pnpm dev
```

### Testing with MCP Inspector
```bash
pnpm inspect
```

## Tool Reference

### perplexity_search

Performs a search using Perplexity AI's models.

Parameters:
- `query` (string, required): The search query
- `model` (string, optional): Model to use (default: "sonar")
  - Available options: sonar-reasoning-pro, sonar-reasoning, sonar-pro, sonar
- `count` (number, optional): Number of results (1-10, default: 5)

## Development

### Project Structure
```
src/perplexity/
├── index.ts        # Main server implementation
├── lib/
│   └── logger.ts   # Logging configuration
└── adr.md         # Architectural decisions
```

### Logging
Logs are written to `perplexity-mcp.log` in the project root directory.

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
