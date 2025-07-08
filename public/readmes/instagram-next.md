# Instagram MCP Server

A Model Context Protocol (MCP) server for fetching Instagram posts using Chrome's existing login session.

## Features

- Modular architecture with clear separation of concerns
- Type-safe implementation using TypeScript
- Improved error handling and logging
- Configurable through environment variables
- JSON-RPC 2.0 compliant communication
- Automatic media downloading and metadata generation
- SEO-friendly description generation

## Architecture

The server follows a modular architecture with the following structure:

```
src/
├── core/                      # Core MCP functionality
│   ├── mcp/                  # MCP server implementation
│   │   ├── server.ts        # Server class
│   │   ├── stdio.ts         # StdioServerTransport
│   │   └── index.ts         # Barrel exports
│   ├── types/               # Core type definitions
│   │   └── mcp.ts          # MCP types
│   └── utils/               # Utility functions
│       ├── config.ts        # Configuration management
│       └── errors.ts        # Error handling
├── features/                 # Feature modules
│   └── instagram/           # Instagram feature
│       ├── types.ts         # Instagram types
│       ├── utils/           # Feature utilities
│       │   ├── media.ts     # Media handling
│       │   ├── post.ts      # Post processing
│       │   └── seo.ts       # SEO generation
│       └── instagram.service.ts # Instagram service
├── services/                 # Shared services
│   └── browser/             # Browser service
│       ├── types.ts         # Browser types
│       └── browser.service.ts # Browser service
├── index.ts                 # Entry point
└── server.ts                # Main server class

```

## Configuration

The server requires the following environment variables:

- `CHROME_USER_DATA_DIR`: Path to Chrome user data directory containing login session

Additional configuration options are available through the config manager:

- Browser settings (viewport, timeouts)
- Instagram settings (delays, batch sizes)
- Save directory and file paths

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the server:
   ```bash
   npm run build
   ```

3. Run the server:
   ```bash
   CHROME_USER_DATA_DIR=/path/to/chrome/profile npm start
   ```

## Available Tools

### get_instagram_posts

Fetches recent posts from an Instagram profile.

Parameters:
- `username` (required): Instagram username to fetch posts from
- `limit` (optional): Number of posts to fetch (1-50) or "all"
- `saveDir` (optional): Directory to save media files and metadata
- `delayBetweenPosts` (optional): Milliseconds to wait between processing posts

Example:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "call_tool",
  "params": {
    "name": "get_instagram_posts",
    "arguments": {
      "username": "example",
      "limit": 10
    }
  }
}
```

## Error Handling

The server uses standardized error codes and messages:

- `INVALID_REQUEST`: Invalid request format or parameters
- `INVALID_PARAMS`: Missing or invalid parameters
- `METHOD_NOT_FOUND`: Unknown method or tool
- `INTERNAL_ERROR`: Server-side errors

## Development

1. Start in development mode:
   ```bash
   npm run dev
   ```

2. Run linter:
   ```bash
   npm run lint
   ```

## Improvements Over Original

1. **Modular Architecture**
   - Clear separation of concerns
   - Better code organization
   - Easier to maintain and extend

2. **Type Safety**
   - Comprehensive TypeScript types
   - Better error catching
   - Improved IDE support

3. **Error Handling**
   - Standardized error codes
   - Better error messages
   - Proper error propagation

4. **Configuration**
   - Centralized configuration
   - Environment variable validation
   - Type-safe config access

5. **Code Quality**
   - Consistent coding style
   - Better documentation
   - Improved logging

6. **Testing Support**
   - Modular design enables testing
   - Dependency injection ready
   - Clear interfaces

## License

MIT
