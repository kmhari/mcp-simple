# MCP Intercom Server

A Model Context Protocol (MCP) server that provides access to Intercom conversations and chats. This server allows LLMs to query and analyze your Intercom conversations with various filtering options.

## Features

- Query Intercom conversations with filtering options:
  - Date range (start and end dates)
  - Customer ID
  - Conversation state
- Secure access using your Intercom API key
- Rich conversation data including:
  - Basic conversation details
  - Contact information
  - Statistics (responses, reopens)
  - State and priority information

## Installation

1. Clone the repository:
```bash
git clone https://github.com/fabian1710/mcp-intercom.git
cd mcp-intercom
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment:
```bash
cp .env.example .env
```

4. Add your Intercom API key to `.env`:
```
INTERCOM_API_KEY=your_api_key_here
```

5. Build the server:
```bash
npm run build
```

## Usage

### Running the Server

Start the server:
```bash
npm start
```

### Using with Claude for Desktop

1. Add the server to your Claude for Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS or `%AppData%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "intercom": {
      "command": "node",
      "args": ["/path/to/mcp-intercom/dist/index.js"],
      "env": {
        "INTERCOM_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

2. Restart Claude for Desktop

### Available Tools

#### search-conversations

Searches Intercom conversations with optional filters.

Parameters:
- `createdAt` (optional): Object with `operator` (e.g., ">", "<", "=") and `value` (UNIX timestamp) for filtering by creation date.
- `updatedAt` (optional): Object with `operator` (e.g., ">", "<", "=") and `value` (UNIX timestamp) for filtering by update date.
- `sourceType` (optional): Source type of the conversation (e.g., "email", "chat").
- `state` (optional): Conversation state to filter by (e.g., "open", "closed").
- `open` (optional): Boolean to filter by open status.
- `read` (optional): Boolean to filter by read status.

Example queries:
- "Search for all conversations created after January 1, 2024"
- "Find conversations updated before last week"
- "List all open email conversations"
- "Get all unread conversations"

## Security

- The server requires an Intercom API key to function
- API key should be stored securely in environment variables
- The server only provides read access to conversations
- All API requests are made with proper authentication

## Development

1. Start development mode with auto-recompilation:
```bash
npm run dev
```

2. Run linting:
```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## License

MIT