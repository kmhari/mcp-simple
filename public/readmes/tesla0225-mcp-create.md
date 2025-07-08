# MCP Create Server

A dynamic MCP server management service that creates, runs, and manages Model Context Protocol (MCP) servers dynamically. This service itself functions as an MCP server and launches/manages other MCP servers as child processes, enabling a flexible MCP ecosystem.

<a href="https://glama.ai/mcp/servers/lnl6xjkkeq">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/lnl6xjkkeq/badge" alt="Create Server MCP server" />
</a>

## Key Features

- Dynamic creation and execution of MCP server code
- Support for TypeScript only (JavaScript and Python support planned for future releases)
- Tool execution on child MCP servers
- Server code updates and restarts
- Removal of unnecessary servers

## Installation

**Note: Docker is the recommended way to run this service**

### Docker Installation (Recommended)

```bash
# Build Docker image
docker build -t mcp-create .

# Run Docker container
docker run -it --rm mcp-create
```

### Manual Installation (TypeScript Only)

```bash
# Clone repository
git clone https://github.com/tesla0225/mcp-create.git
cd mcp-create

# Install dependencies
npm install

# Build
npm run build

# Run
npm start
```

## Integration with Claude Desktop

Add the following to your Claude Desktop configuration file (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "mcp-create": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "mcp-create"]
    }
  }
}
```

## Available Tools

| Tool Name | Description | Input Parameters | Output |
|-----------|-------------|-----------------|--------|
| create-server-from-template | Create MCP server from template | language: string | { serverId: string, message: string } |
| execute-tool | Execute tool on server | serverId: string<br>toolName: string<br>args: object | Tool execution result |
| get-server-tools | Get list of server tools | serverId: string | { tools: ToolDefinition[] } |
| delete-server | Delete server | serverId: string | { success: boolean, message: string } |
| list-servers | Get list of running servers | none | { servers: string[] } |

## Usage Examples

### Creating a New Server

```json
{
  "name": "create-server-from-template",
  "arguments": {
    "language": "typescript"
  }
}
```

### Executing a Tool

```json
{
  "name": "execute-tool",
  "arguments": {
    "serverId": "ba7c9a4f-6ba8-4cad-8ec8-a41a08c19fac",
    "toolName": "echo",
    "args": {
      "message": "Hello, dynamic MCP server!"
    }
  }
}
```

## Technical Specifications

- Node.js 18 or higher
- TypeScript (required)
- Dependencies:
  - @modelcontextprotocol/sdk: MCP client/server implementation
  - child_process (Node.js built-in): Child process management
  - fs/promises (Node.js built-in): File operations
  - uuid: Unique server ID generation

## Security Considerations

- **Code Execution Restrictions:** Consider sandboxing as the service executes arbitrary code
- **Resource Limitations:** Set limits on memory, CPU usage, number of files, etc.
- **Process Monitoring:** Monitor and forcibly terminate zombie or runaway processes
- **Path Validation:** Properly validate file paths to prevent directory traversal attacks

## License

MIT