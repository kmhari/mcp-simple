# Base Network MCP Server

A Model Context Protocol (MCP) server for accessing Base Network blockchain data. Provides tools for querying blocks, transactions, balances, and smart contracts on Base mainnet and testnet.

## Features

- 9 blockchain tools (7 work without API key)
- Base mainnet and Sepolia testnet support  
- Real-time blockchain data access
- Docker support
- Multiple transport options (stdio, HTTP)

## Quick Start

### Install and Build

```bash
git clone https://github.com/u-Operating-System/basescan-mcp-server.git
cd basescan-mcp-server
npm install
npm run build
```

### Run the Server

```bash
# For Claude Desktop (recommended)
npm start

# For HTTP server
MCP_TRANSPORT_TYPE=http npm start
```

### Optional: BaseScan API Key

Get enhanced features by adding a free BaseScan API key:

1. Visit https://basescan.org/apis
2. Create account and get API key
3. Add to environment: `BASESCAN_API_KEY=your-key`

## Claude Desktop Setup

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "base-network": {
      "command": "node",
      "args": ["/path/to/basescan-mcp-server/build/index.js"],
      "env": {
        "BASESCAN_API_KEY": "your-key-here"
      }
    }
  }
}
```

## Docker

```bash
# Basic setup
docker run -p 3010:3010 basescan-mcp-server

# With API key
docker run -p 3010:3010 -e BASESCAN_API_KEY=your-key basescan-mcp-server
```

## Available Tools

| Tool | Description | Requires API Key |
|------|-------------|------------------|
| `get_latest_block` | Latest block information | No |
| `get_block` | Block by number/hash | No |
| `get_transaction` | Transaction details | No |
| `get_balance` | ETH balance lookup | No |
| `get_gas_price` | Current gas prices | No |
| `check_contract` | Smart contract detection | No |
| `get_network_stats` | Network statistics | No |
| `get_account_transactions` | Account transaction history | Yes |
| `get_account_tokens` | Token transfer history | Yes |

## Configuration

Configure via environment variables:

```bash
NODE_ENV=development              # development|production
MCP_TRANSPORT_TYPE=stdio          # stdio|http
MCP_HTTP_PORT=3010               # HTTP port
BASESCAN_API_KEY=your-key        # BaseScan API key (optional)
MCP_LOG_LEVEL=info               # debug|info|warning|error
```

## Security

- Store API keys in environment variables
- Never commit `.env` files with real values
- Use HTTPS in production

## Networks

- **Base Mainnet**: Chain ID 8453
- **Base Sepolia**: Chain ID 84532

## Development

```bash
npm run dev            # Development with hot reload
npm test               # Run tests
npm run lint           # Code linting
npm run format         # Code formatting
```

## License

MIT 