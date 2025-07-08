# Monad Tesnet MCP Server  Advanced Blockchain Toolkit 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](VERSION)

A Model Context Protocol server for interacting with the Monad blockchain testnet.

## Features

- Wallet balance checking
- Network information
- Transaction details
- Token transfers and swaps
- Staking capabilities

## Installation

```bash
git clone https://github.com/your-username/monad-mcp-server.git
cd monad-mcp-server
npm install
```

## Security & Configuration

For security reasons, private keys are handled via environment variables. Before running the server:

```bash
# Linux/Mac
export PRIVATE_KEY=your_private_key_here

# Windows
set PRIVATE_KEY=your_private_key_here
```

NEVER hardcode private keys in your source code or commit them to your repository.

## Usage

```bash
npm run build
npm start
```

## Claude Integration

```json
{
  "mcpServers": {
    "monad-mcp": {
      "command": "node",
      "args": [
        "/path/to/your/project/build/index.js"
      ]
    }
  }
}
```

## MCP Tools

- `check-wallet-balances`: Get MON balances
- `monad-network-info`: Network information
- `transaction-details`: Transaction data
- `transfer-mon`: Transfer tokens
- `stake-apriori-mon`: Staking operations
- `swap-mon-for-tokens`: DEX swaps

## License

MIT License

## Acknowledgments

- [Model Context Protocol](https://github.com/modelcontextprotocol/mcp)
- [Monad Blockchain](https://monad.xyz/)
- [Viem](https://viem.sh/)
