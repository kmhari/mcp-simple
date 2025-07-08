# Catapulta MCP

A Model Context Protocol (MCP) implementation for Catapulta CLI, enabling AI-powered interactions with deployment and management tools.

## Overview

Catapulta MCP is a server implementation that bridges the gap between AI models and the Catapulta CLI, allowing for intelligent automation of deployment tasks and other operations. It provides a standardized way for AI models to interact with Catapulta's functionality through a secure and controlled interface.

## Features

- **Deployment Command Generation**: AI-powered generation of deployment commands with support for multiple networks
- **Safe Command Execution**: Controlled execution of CLI commands with built-in safety checks
- **Wallet Management**: Generate and manage wallets through simple commands
- **Network Support**: Extensive network support including:
  - Ethereum networks (mainnet, testnets)
  - Layer 2 solutions (Arbitrum, Optimism, Base)
  - Alternative chains (BSC, Gnosis, Scroll)
  - And many more
- **Advanced Deployment Options**:
  - Gas optimization with gas-hawk mode

## Installation

```bash
# Clone the repository
git clone https://github.com/catapulta-sh/catapulta-mcp.git
cd catapulta-mcp

# Install dependencies
npm install
```

## Usage

### Basic Usage

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create an MCP server
const server = new McpServer({
  name: "catapulta-cli-server",
  version: "0.1.0",
});

// Start the server with StdIO transport
const transport = new StdioServerTransport();
server.connect(transport).catch((error) => {
  console.error("[MCP Error]", error);
  process.exit(1);
});
```

### Deployment Command Generation

```typescript
// Example of generating a deployment command
const command = await server.tool("generate_deploy_command", {
  script_path: "path/to/script",
  network: "matic",
  sponsor: true,
  gas_hawk: true,
});
```

## Supported Networks

The following networks are supported for deployments:

- **Ethereum**: main, goerli, sepolia
- **Layer 2**:
  - Arbitrum: arbitrum, arbitrumGoerli, arbitrumSepolia
  - Optimism: optimism, optimismGoerli, optimismSepolia
  - Base: base, baseTestnet, baseSepolia
- **Alternative Chains**:
  - BSC: bsc, bscTestnet
  - Gnosis: gnosis, gnosisTestnet
  - Scroll: scroll, scrollSepolia
  - And many more...

## Security

The implementation includes several security measures:

- Whitelist of allowed commands
- Input validation for all parameters
- Controlled execution environment
- Error handling and logging

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Catapulta CLI installed

### Building

```bash
# Build the project
npm run build

# Run tests
npm test
```

### Using it on Cursor

- Open Cursor Settings
- Go to the MCP tab
- Click on Add new global MCP server

Paste this on the mcp.json

```json
{
  "mcpServers": {
    "Catapulta-client": {
      "command": "npx",
      "args": ["-y", "@catapulta/mcp-server@latest"],
      "env": {}
    }
  }
}
```

### Using it on VS Code

- Open VS Code Settings
- Write "MCP" in the search bar
- Select User or Workspace and click on "Edit in settings.json"

Paste this on the settings.json

```json
{
  "mcp": {
    "servers": {
      "Catapulta-client": {
        "type": "stdio",
        "command": "npx",
        "args": ["-y", "@catapulta/mcp-server@latest"]
      }
    }
  }
}
```

## Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io)
- [Catapulta CLI](https://github.com/catapulta-sh)
