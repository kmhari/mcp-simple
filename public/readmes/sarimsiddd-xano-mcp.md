# Xano MCP Server

A Model Context Protocol (MCP) server implementation for interacting with the Xano API. This server provides tools and resources for managing Xano database operations through the MCP interface.

## Features

- Secure authentication with Xano API
- Type-safe API interactions using TypeScript
- Environment-based configuration
- MCP-compliant interface
- Workspace management tools
- Table content operations (create, read, update)
- Improved error handling with detailed messages

## Installation

```bash
# Clone the repository
git clone [your-repo-url]
cd xano_mcp

# Install dependencies
npm install
```

## Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update the `.env` file with your Xano credentials:
```env
XANO_API_KEY=your_api_key_here
XANO_API_URL=your_xano_api_url
NODE_ENV=development
API_TIMEOUT=10000
```

## Development

```bash
# Build the project
npm run build

# Run in development mode
npm run dev

# Start the server
npm start
```

## Project Structure

```
xano_mcp/
├── src/
│   ├── api/
│   │   └── xano/
│   │       ├── client/       # API client implementation
│   │       ├── models/       # Data models and types
│   │       ├── services/     # API service implementations
│   │       └── utils/        # Utility functions
│   ├── mcp/
│   │   ├── server/          # MCP server implementation
│   │   ├── tools/           # MCP tool implementations
│   │   └── types/           # Tool-specific types
│   ├── config.ts            # Configuration management
│   └── index.ts             # Main entry point
├── .env                     # Environment variables (not in git)
├── .env.example            # Example environment variables
└── tsconfig.json           # TypeScript configuration
```

## Available MCP Tools

### Workspace Tools
- `get_workspaces`: List all available workspaces

### Table Tools
- `create_table`: Create a new table in a workspace
- `get_table_content`: Get content from a table with pagination support
- `add_table_content`: Add new content to a table
- `update_table_content`: Update existing content in a table
- `get_all_tables`: List all tables in a workspace with detailed information

## Usage Examples

### Working with Workspaces
```typescript
// List available workspaces
const result = await mcp.use_tool("get_workspaces", {});
console.log('Workspaces:', result);
```

### Managing Tables
```typescript
// Create a new table
const createResult = await mcp.use_tool("create_table", {
  workspaceId: 123,
  name: "MyTable"
});

// Add content to a table
const addResult = await mcp.use_tool("add_table_content", {
  workspaceId: 123,
  tableId: 456,
  content: {
    created_at: "2024-01-22T17:07:00.000Z"
  }
});

// Get table content with pagination
const getResult = await mcp.use_tool("get_table_content", {
  workspaceId: 123,
  tableId: 456,
  pagination: {
    page: 1,
    items: 50
  }
});

// Update table content
const updateResult = await mcp.use_tool("update_table_content", {
  workspaceId: 123,
  tableId: 456,
  contentId: "789",
  content: {
    created_at: "2024-01-22T17:07:00.000Z"
  }
});

// List all tables in a workspace
const tables = await mcp.use_tool("get_all_tables", {
  workspaceId: 123
});
console.log('Tables:', tables);
// Returns an array of tables with their details:
// [
//   {
//     id: number,
//     name: string,
//     description: string,
//     created_at: string,
//     updated_at: string,
//     guid: string,
//     auth: boolean,
//     tag: string[],
//     workspaceId: number
//   },
//   ...
// ]
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| XANO_API_KEY | Your Xano API authentication key | Yes | - |
| XANO_API_URL | Xano API endpoint URL | Yes | - |
| NODE_ENV | Environment (development/production) | No | development |
| API_TIMEOUT | API request timeout in milliseconds | No | 10000 |

## Error Handling

The server provides detailed error messages for:
- Invalid parameters
- Authentication failures
- API request failures
- Content validation errors
- Unknown tool requests

## Security

- Environment variables are used for sensitive configuration
- TruffleHog configuration is included to prevent secret leaks
- API keys and sensitive data are never committed to the repository

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

ISC
