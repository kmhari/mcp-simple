# dbx-mcp-server

A Model Context Protocol (MCP) server that provides integration with Dropbox, allowing MCP-compatible clients to interact with Dropbox through a set of powerful tools.

**Important Disclaimer:** This project is not affiliated with, endorsed by, or sponsored by Dropbox. It is an independent integration that works with Dropbox's public API.

## Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Authentication](#authentication)
- [Available Tools](#available-tools)
- [Configuration](#configuration)
- [Usage Examples](#usage-examples)
- [Testing](#testing)
- [Development](#development)
- [License](#license)

## Quick Start

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the project
4. Register a Dropbox app at [Dropbox App Console](https://www.dropbox.com/developers/apps):
   - Choose "Scoped access" API
   - Choose the access type your app needs
   - Name your app and click "Create app"
   - Under "Permissions", select the required permissions:
     - `files.metadata.read`
     - `files.content.read`
     - `files.content.write`
     - `sharing.write`
     - `account_info.read`
   - Add `http://localhost:3000/callback` as your redirect URI
   - Note your App key and App secret
5. Run the setup script:
   ```bash
   npm run setup
   ```
6. Configure your MCP client to use the server

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/dbx-mcp-server.git
   cd dbx-mcp-server
   ```

2. **Install dependencies and build**

   ```bash
   npm install
   npm run build
   ```

3. **Run the setup script**

   ```bash
   npm run setup
   ```

4. **Add to MCP settings**

   Add the following to your MCP settings file:

   ```json
   {
     "mcpServers": {
       "dbx": {
         "command": "node",
         "args": ["/path/to/dbx-mcp-server/build/index.js"]
       }
     }
   }
   ```

## Authentication

The server uses OAuth 2.0 with PKCE for secure authentication with Dropbox.

### Environment Variables

Required:

- `DROPBOX_APP_KEY`: Your Dropbox app's key
- `DROPBOX_APP_SECRET`: Your Dropbox app's secret
- `DROPBOX_REDIRECT_URI`: OAuth redirect URI
- `TOKEN_ENCRYPTION_KEY`: 32+ character key for token encryption

Optional:

- `TOKEN_REFRESH_THRESHOLD_MINUTES`: Minutes before expiration to refresh token (default: 5)
- `MAX_TOKEN_REFRESH_RETRIES`: Maximum number of refresh attempts (default: 3)
- `TOKEN_REFRESH_RETRY_DELAY_MS`: Delay between refresh attempts in ms (default: 1000)

## Available Tools

### File Operations

- `list_files`: List files in a directory
- `upload_file`: Upload a file
- `download_file`: Download a file
- `safe_delete_item`: Safely delete with recycle bin support
- `create_folder`: Create a new folder
- `copy_item`: Copy a file or folder
- `move_item`: Move or rename a file/folder

### Metadata and Search

- `get_file_metadata`: Get file/folder metadata
- `search_file_db`: Search files and folders
- `get_sharing_link`: Create sharing links
- `get_file_content`: Get file contents

### Account Operations

- `get_account_info`: Get account information

## Usage Examples

```typescript
// List files in root directory
await mcp.useTool("dbx-mcp-server", "list_files", { path: "" });

// Upload a file
await mcp.useTool("dbx-mcp-server", "upload_file", {
  path: "/test.txt",
  content: Buffer.from("Hello World").toString("base64"),
});

// Search for files
await mcp.useTool("dbx-mcp-server", "search_file_db", {
  query: "report",
  path: "/Documents",
  max_results: 10,
});
```

## Testing

Run the test suite:

```bash
npm test
```

Tests verify all operations including authentication, file operations, and error handling.

### Test Structure

The test suite is organized into several modules:

- **Dropbox Operations**: Tests for basic file operations (upload, download, list, etc.)
- **Account Operations**: Tests for accessing account information
- **Search and Delete**: Tests for search functionality and safe deletion with recycle bin support
- **Resource System**: Tests for the MCP resource system integration

### Handling Test Data

The tests use dynamically generated file and folder names based on timestamps to avoid conflicts. Test data is automatically cleaned up after test execution.

### Running Specific Tests

To run a specific test file or test group:

```bash
npm test -- tests/dropbox/search-delete.test.ts  # Run specific test file
npm test -- -t "should search for files"        # Run tests matching description
```

### Troubleshooting Tests

If tests fail with timing or authentication issues:

1. Check that the mock implementations in `tests/setup.ts` match your test expectations
2. Ensure test helpers are correctly configured
3. For Jest scope errors, avoid referencing imported variables in mock factory functions

## Development

Built with:

- TypeScript
- Model Context Protocol SDK
- Dropbox SDK v10.34.0
- Dropbox API v2

## License

MIT License

Copyright (c) 2025 MCP Server Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
