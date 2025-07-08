# Trello MCP Server (TypeScript)

A TypeScript implementation of a Model Context Protocol (MCP) server for Trello integration, providing tools for AI assistants to interact with Trello boards, lists, and cards.

## Features

- Full Trello API integration through MCP tools
- Asynchronous operations for better performance
- Type-safe implementation using TypeScript
- Comprehensive error handling
- Environment-based configuration

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Trello API credentials

## Installation

```bash
# Install dependencies
make install
```

## Configuration

Create a `.env` file in the root directory with your Trello credentials:

```env
TRELLO_API_KEY=your_api_key
TRELLO_TOKEN=your_token
```

## Available Commands

```bash
# Install dependencies
make install

# Build the project
make build

# Start the server
make start

# Clean build artifacts
make clean

# Run linter
make lint
```

## MCP Tools

### get_boards
Retrieves all Trello boards for the authenticated user.
```typescript
// No input parameters required
```

### get_lists
Fetches all lists from a specified board.
```typescript
{
  "request": {
    "board_id": string // ID of the board
  }
}
```

### get_cards
Gets cards from a board or specific list.
```typescript
{
  "request": {
    "board_id": string,    // ID of the board
    "list_id"?: string     // Optional: ID of a specific list
  }
}
```

### get_card_details
Retrieves detailed information about a specific card.
```typescript
{
  "request": {
    "card_id": string      // ID of the card
  }
}
```

## Development

The project uses TypeScript for type safety and better developer experience. The source code is organized as follows:

- `src/index.ts` - Main server entry point
- `src/trello-client.ts` - Trello API client implementation
- `src/types.ts` - TypeScript type definitions

## Building

The project uses TypeScript compiler for building:

```bash
# Build the project
make build

# The output will be in the build/ directory
```

## Error Handling

The server implements comprehensive error handling for:
- API authentication errors
- Rate limiting
- Network issues
- Invalid request parameters

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Using with Cline

To use this MCP server with Cline, add the following configuration to your Cline MCP settings file (`~/.config/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`):

```json
{
  "mcpServers": {
    "trello-ts": {
      "command": "node",
      "args": ["/path/to/mcp-server-ts-trello/build/index.js"],
      "env": {
        "TRELLO_API_KEY": "your_api_key",
        "TRELLO_TOKEN": "your_token"
      }
    }
  }
}
```

After adding the configuration and restarting Cline, you can use the following MCP tools:
- `get_boards`: List all Trello boards
- `get_lists`: Get lists from a board
- `get_cards`: Get cards from a board or list
- `get_card_details`: Get detailed card information

## License

ISC License - See LICENSE file for details
