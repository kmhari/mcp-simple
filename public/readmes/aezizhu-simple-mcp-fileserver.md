# Simple MCP FileServer

A lightweight Model Context Protocol (MCP) file system server that enables AI agents (like Codeium, Claude, Windsurf, etc.) to interact with your local file system through a standardized JSON-RPC interface.

## What is MCP?

The Model Context Protocol (MCP) is a standardized way for AI agents to interact with external systems. This implementation provides file system operations, allowing AI assistants to read, write, and manipulate files on your local machine in a controlled and secure manner.

## How It Works

This server implements a JSON-RPC 2.0 API that AI agents can call to perform file operations:

1. **Communication Protocol**: Uses HTTP with JSON-RPC 2.0 format for requests and responses
2. **Method Dispatching**: Routes requests to appropriate file system operations
3. **Error Handling**: Provides standardized error responses with meaningful codes
4. **Capability Discovery**: Supports the `initialize` method for capability reporting

The server acts as a bridge between AI agents and your file system, translating JSON-RPC requests into actual file operations and returning the results.

## Features

- **File Operations**:
  - Read file content (`readFile` method)
  - Write or overwrite file content (`writeFile` method)
  - List directory contents (`listDir` method)
- **MCP Protocol Compatibility**:
  - Full JSON-RPC 2.0 protocol compliance
  - Supports `initialize` method with capability reporting
  - Detailed error handling and logging
- **CORS Support**: Built-in cross-origin support for web client integration
- **Health Check**: Provides a `/health` endpoint for monitoring and probing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/simple-mcp-fileserver.git
   cd simple-mcp-fileserver
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

The server configuration is flexible and supports the following environment variables:

- `PORT` or `MCP_PORT`: Specify the server listening port (default: 8090)

## Usage

### Method 1: Direct Launch

Start the server directly from the command line:

```bash
node simple-mcp-fileserver.js
```

With custom port:
```bash
PORT=9000 node simple-mcp-fileserver.js
```

### Method 2: Configure in MCP Orchestrator

Add to `.codeium/windsurf/mcp_config.json` to integrate with Codeium/Windsurf:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": [
        "/path/to/simple-mcp-fileserver/simple-mcp-fileserver.js"
      ],
      "env": {
        "PORT": "9000"
      }
    }
  }
}
```

### Method 3: Use Official MCP Filesystem Server

If you encounter compatibility issues, you can use the official MCP filesystem server:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/allowed/directory"
      ]
    }
  }
}
```

## Integration with AI Assistants

Once your MCP server is running, AI assistants that support the MCP protocol can interact with your file system. The assistant will:

1. Connect to your MCP server
2. Initialize the connection to discover capabilities
3. Make requests to read, write, or list files as needed
4. Process the responses to provide you with relevant information

This enables powerful workflows where AI assistants can help you with coding tasks that require file system access.

## API Reference

### initialize

Initialize connection and get server capabilities.

**Request**:
```json
{
  "jsonrpc": "2.0",
  "method": "initialize",
  "params": {},
  "id": 1
}
```

**Response**:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "capabilities": {
      "readFile": { "supported": true, "description": "Read a file from disk" },
      "writeFile": { "supported": true, "description": "Write a file to disk" },
      "listDir": { "supported": true, "description": "List directory contents" }
    },
    "serverName": "simple-mcp-fileserver",
    "version": "1.0.0",
    "mcp": "filesystem"
  },
  "id": 1
}
```

### readFile

Read file content.

**Request**:
```json
{
  "jsonrpc": "2.0",
  "method": "readFile",
  "params": { "path": "/path/to/file.txt" },
  "id": 2
}
```

**Response**:
```json
{
  "jsonrpc": "2.0",
  "result": "file content...",
  "id": 2
}
```

### writeFile

Write file content.

**Request**:
```json
{
  "jsonrpc": "2.0",
  "method": "writeFile",
  "params": { 
    "path": "/path/to/file.txt",
    "content": "content to write"
  },
  "id": 3
}
```

**Response**:
```json
{
  "jsonrpc": "2.0",
  "result": "ok",
  "id": 3
}
```

### listDir

List directory contents.

**Request**:
```json
{
  "jsonrpc": "2.0",
  "method": "listDir",
  "params": { "path": "/path/to/directory" },
  "id": 4
}
```

**Response**:
```json
{
  "jsonrpc": "2.0",
  "result": ["file1.txt", "file2.js", "subdirectory"],
  "id": 4
}
```

## Health Check

The server provides a simple health check endpoint:

```bash
curl http://localhost:8090/health
# Returns: ok
```

## Troubleshooting

### Common Issues

1. **Initialization Failure**:
   - Ensure the server is running
   - Check if the port is in use
   - Verify the `/health` endpoint returns `ok`

2. **Port Conflicts**:
   - Use `lsof -i :<port>` to check port usage
   - Start the service with a different port

3. **Permission Issues**:
   - Ensure the server has permission to access requested file paths

## Security Considerations

This server provides direct access to your file system. Consider these security measures:

- Run the server only on trusted networks
- Limit the directories that can be accessed
- Consider implementing authentication for production use
- Monitor server logs for suspicious activity

## Potential Future Enhancements

This MCP server could be extended with additional features:

1. **Authentication & Authorization**: Add user authentication and path-based permissions
2. **File Watching**: Implement methods to watch files for changes
3. **Advanced File Operations**: Add support for file copying, moving, and deletion
4. **Metadata Operations**: Add methods to get and set file metadata
5. **Search Capabilities**: Implement file content search functionality
6. **Streaming Support**: Add streaming for large file operations
7. **Compression**: Support for compressed file operations
8. **Versioning**: Add simple file versioning capabilities
9. **Batched Operations**: Support for executing multiple operations in a single request
10. **Event Notifications**: Implement WebSocket support for file system event notifications

## Contributing

Pull Requests and Issues are welcome! Some areas where contributions would be particularly valuable:

- Additional file operations
- Enhanced error handling
- Performance optimizations
- Security improvements
- Documentation enhancements

## License

MIT