# CMD MCP Server

[![smithery badge](https://smithery.ai/badge/server-cmd)](https://smithery.ai/server/server-cmd)
![npm downloads](https://img.shields.io/npm/dt/server-cmd)
A Model Context Protocol (MCP) server implementation for executing CMD commands on both Windows and Linux, as well as allowing SSH connections. This server allows you to integrate command-line operations with MCP-compatible applications.

<a href="https://glama.ai/mcp/servers/s83mqs6123"><img width="380" height="200" src="https://glama.ai/mcp/servers/s83mqs6123/badge" alt="cmd-mcp-server MCP server" /></a>

## Features

- Execute CMD commands through MCP
- TypeScript implementation
- Built on the official MCP SDK
- Cross-platform compatibility

## Installation

### Installing via Smithery

To install CMD Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/server-cmd):

```bash
npx -y @smithery/cli install server-cmd --client claude
```

### Manual Installation
```bash
npm install server-cmd
```

## Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

## Usage

```typescript
import { MCPCmdServer } from 'server-cmd';

// Initialize the server
const server = new MCPCmdServer();

// Start the server
server.start();
```

## Configuration

The server can be configured through environment variables or a configuration object:

```typescript
const config = {
  // Add your configuration options here
};

const server = new MCPCmdServer(config);
```

## Development

To set up the development environment:

1. Clone the repository:
```bash
git clone https://github.com/PhialsBasement/CMD-MCP-Server.git
cd CMD-MCP-Server
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run prepare` - Prepare the package for publishing

## Dependencies

- `@modelcontextprotocol/sdk`: ^1.0.1
- `glob`: ^10.3.10
- `zod-to-json-schema`: ^3.23.5

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Security

Please note that executing command-line operations can be potentially dangerous. Make sure to implement proper security measures and input validation when using this server in production environments.

## Support

For issues and feature requests, please use the [GitHub issue tracker](https://github.com/PhialsBasement/CMD-MCP-Server/issues).
