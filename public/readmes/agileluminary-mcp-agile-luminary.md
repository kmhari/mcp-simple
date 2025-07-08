# Agile Luminary MCP Server

This is a Model Context Protocol (MCP) server that connects AI clients (like Cursor or Claude Desktop) to the Agile Luminary project management system hosted at `https://agileluminary.com`.

## What is MCP?

The Model Context Protocol (MCP) is a standardized way for AI applications to connect to external data sources and services. This server acts as a bridge between your AI client and the Agile Luminary REST API, allowing you to retrieve project details, work assignments, and documentation directly within your AI conversations.

## Architecture

```
AI Client (Cursor/Claude) → Local MCP Server → Agile Luminary API (localhost:5006)
```

## Features

This MCP server provides three main tools that fetch data from the Agile Luminary API:

### 📚 **getRelatedDocuments**
- **Purpose**: Retrieve related documents based on a search string
- **Parameters**: `searchString` (required) - The text to search for in documents
- **Use Case**: Find relevant documentation and specifications related to your current work

### 📋 **getCurrentWork**
- **Purpose**: Fetches work currently assigned to the user
- **Parameters**: None
- **Use Case**: See what tasks and user stories are actively assigned to you

### 🔍 **getPastWork**
- **Purpose**: Retrieves completed work related to user stories based on search criteria
- **Parameters**: `searchString` (required) - Search term to find relevant past work
- **Use Case**: Review historical context and completed tasks for better decision-making

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- An AI client that supports MCP (Cursor IDE, Claude Desktop, etc.)

### Install Dependencies
```bash
npm install @modelcontextprotocol/sdk zod
```

### Environment Variables
Set your API key as an environment variable:
```bash
export LUMINARY_API_KEY=your_api_key_here
```

### Run the Server
```bash
node server.js
```

The server will start and listen for connections from your AI client via stdio transport.

## Configuration

### For Cursor IDE
Add this to your MCP configuration:
```json
{
  "mcpServers": {
    "agile-luminary": {
      "command": "node",
      "args": ["path/to/your/server.js"],
      "env": {
        "LUMINARY_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### For Claude Desktop
Add this to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "agile-luminary": {
      "command": "node",
      "args": ["path/to/your/server.js"],
      "env": {
        "LUMINARY_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Usage Examples

Once connected, you can use natural language in your AI client:

- *"Search for documents about authentication"*
- *"Show me my current work assignments"*
- *"Find past work related to user login functionality"*
- *"What documentation exists about the payment system?"*
- *"Based on my current work, what similar tasks were completed before?"*

## API Endpoints

The server connects to the following Agile Luminary API endpoints:

- `POST http://localhost:5006/bend/mcp/documents/search` - Search documents
- `GET http://localhost:5006/bend/mcp/userstories/current` - Get current work
- `POST http://localhost:5006/bend/mcp/userstories/search` - Search past work

## Benefits

- **Real-time Data**: Always get the latest project information from your deployed system
- **Context-Aware AI**: Your AI assistant has full context of your project status and documentation
- **Seamless Integration**: Works directly within your development environment
- **Secure**: Server handles authentication and API communication locally
- **Search Capabilities**: Find relevant documents and past work through intelligent search

## Authentication

The server uses the `LUMINARY_API_KEY` environment variable for authentication. This key is passed in the `Authorization` header for all API requests. Make sure to set this environment variable before running the server.

## Error Handling

The server includes comprehensive error handling for:
- Network connectivity issues
- API authentication failures
- Malformed responses
- Service unavailability
- Missing API keys

## Contributing

This MCP server is designed to work specifically with the Agile Luminary project management system. For modifications or enhancements, ensure compatibility with the existing API endpoints.

---

**Note**: Make sure your Agile Luminary account is created and you have your API key from `https://agileluminary.com` before using this MCP server. Set the `LUMINARY_API_KEY` environment variable with your API key.