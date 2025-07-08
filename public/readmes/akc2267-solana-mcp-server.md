# Solana MCP Server

A Model-Context-Protocol server for interacting with the Solana blockchain. This server provides simple RPC endpoints for common Solana operations.

## Features

- Get current slot number
- Check account balances
- Get detailed account information
- Display keypair information
- Transfer SOL between accounts

## Quickstart

clone and install dependencies:

```bash
git clone https://github.com/yourusername/solana-mcp-server.git
cd solana-mcp-server
npm install
```

build the tool

```bash
npm run build
```

add the tool to your claude_desktop_config.json
```
"solana-rpc": {
            "command": "node",
            "args": [
                "/PATH/TO/solana-mcp-server/build/index.js"
            ]
        }
```

## Usage

Ask Claude:
- whats the latest slot on solana?
- whats the balance of 62QXuWZ3WT6ws1ZFxJobVDVXn6bEsiYpLo5yG612U6u3?
- Here's my test key [REPLACE WITH SECRET KEY]. let's transfer 0.001 SOL to [REPLACE WITH PUBLIC ADDRESS]

## Security Note

Only use this with a test wallet with a small amount of funds.

## RPC Endpoint

The server connects to Solana's mainnet at `https://api.mainnet-beta.solana.com`. To use a different network (like devnet or testnet), modify the `SOLANA_RPC` constant in `src/index.ts`.
