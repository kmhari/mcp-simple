# MCP Server Gateway

A gateway service that bridges the stdio-based Model Context Protocol (MCP) implementation in Claude Desktop with HTTP/SSE-based MCP servers. This solves the protocol compatibility gap since Claude Desktop currently only supports stdio-based MCP servers. See the discussion [here](https://github.com/orgs/modelcontextprotocol/discussions/16).

## Why This Gateway?

Claude Desktop App currently only supports stdio protocol for MCP servers, while many MCP servers use HTTP with Server-Sent Events (SSE) transport. This gateway acts as a protocol translator, allowing Claude Desktop to communicate with any HTTP/SSE MCP server by:
1. Accepting stdio input from Claude Desktop
2. Converting and forwarding requests to HTTP/SSE MCP servers
3. Converting SSE responses back to stdio format for Claude Desktop

## Installation

Install the gateway globally using npm:

```bash
npm install -g @mcphub/gateway
```

## Configuration

### 1. Find the Gateway Path

After installation, find where npm installed the gateway using these commands:

```bash
# This shows the root directory of global packages
npm root -g

# The gateway will be located at:
<npm_global_root>/@mcphub/gateway/dist/src/mcphub-gateway.js
```

Common global package locations:
- macOS (Homebrew Node): `/opt/homebrew/lib/node_modules/@mcphub/gateway/dist/src/mcphub-gateway.js`
- macOS (default): `/usr/local/lib/node_modules/@mcphub/gateway/dist/src/mcphub-gateway.js`
- Windows: `%AppData%\npm\node_modules\@mcphub\gateway\dist\src\mcphub-gateway.js`

Verify the installation and path:
```bash
npm list -g @mcphub/gateway
```

### 2. Configure Claude Desktop

Create or update your Claude Desktop configuration file:

#### On macOS
Location: `~/Library/Application Support/Claude Desktop/config.json`

#### On Windows
Location: `%APPDATA%\Claude Desktop\config.json`

Add this configuration (using the path you found in step 1):

```json
{
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["/opt/homebrew/lib/node_modules/@mcphub/gateway/dist/src/mcphub-gateway.js"]
    }
  }
}
```

Note: Replace the path in `args` with your actual path from step 1.

### 3. Configure MCP Server Connection

The gateway uses an environment variable to specify which MCP server to connect to:

```bash
# Set the MCP server URL (optional)
export MCP_SERVER_URL=https://your-mcp-server.com/api/mcp
```

By default, the gateway connects to the MCP Hub server at `https://server.mcphub.ai/api/mcp`, which provides access to various pre-configured MCP services.

### 4. Start Claude Desktop

Start or restart Claude Desktop to apply the changes.

## Troubleshooting

1. If you can't find the gateway path:
   ```bash
   # List all global packages and look for @mcphub/gateway
   npm list -g
   
   # Or specifically check the gateway
   npm list -g @mcphub/gateway
   ```

2. Verify your Node.js installation:
   ```bash
   # Check Node version
   node --version
   
   # Check npm version
   npm --version
   ```

3. Common issues:
   - If using Homebrew on macOS, make sure Node.js is properly linked:
     ```bash
     brew doctor
     brew link node
     ```
   - If you get permission errors, you might need to use `sudo` for the installation

## License

[Apache 2.0 License](LICENSE)

## Support

If you encounter any issues or have questions:
- File an issue on GitHub

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.