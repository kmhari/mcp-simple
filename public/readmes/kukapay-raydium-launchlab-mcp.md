# Raydium LaunchLab MCP

An MCP server that enables AI agents to launch, buy, and sell tokens on the Raydium Launchpad(also know as [LaunchLab](https://raydium.io/launchpad/)).

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg)

## Features

- **Mint Token**: Create a bonding-curve-based token with customizable parameters (name, symbol, decimals, total supply, fundraising target, etc.) and upload metadata to IPFS.
- **Buy Token**: Purchase tokens from a Raydium Launchpad pool using SOL.
- **Sell Token**: Sell tokens back to a Raydium Launchpad pool.
- **IPFS Integration**: Uploads token images and metadata to IPFS for decentralized storage.

## Prerequisites

- **Node.js**: Version 18.x or higher.
- **Solana Wallet**: A private key with sufficient SOL for transactions.
- **Pinata Account**: API credentials for IPFS storage (JWT and gateway).

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kukapay/raydium-launchlab-mcp.git
   cd raydium-launchlab-mcp
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   
3. **Configure MCP Client**:
    ```json
    {
      "mcpServers": {
        "raydium-launchlab": {
          "command": "node",
          "args": ["/path/to/raydium-launchlab-mcp/index.js"],
          "env": {
             "RPC_URL": "your-solana-rpc-url",
             "PRIVATE_KEY": "your-private-key-as-integer-array",
             "PINATA_JWT": "your-pinata-jwt",
             "PINATA_GATEWAY": "your-pinata-gateway"
          }
        }
      }
    }
    ```
   - Replace `/path/to/raydium-launchlab-mcp` with your actual installation path.  
   - Replace `your-solana-rpc-url` with your own Solana rpc url.
   - Replace `your-private-key-as-integer-array` with your Solana wallet's private key (e.g., `[1,2,3,...]`).
   - Obtain `PINATA_JWT` and `PINATA_GATEWAY` from your Pinata account.
   

## Tools

The MCP server exposes three tools for interacting with Raydium Launchpad:

### 1. `mint_token`
Creates a bonding-curve-based token on Raydium Launchpad with metadata uploaded to Pinata IPFS.

**Parameters**:
- `name` (string, 1-32 chars): Token name (e.g., "My Token").
- `symbol` (string, 1-10 chars): Token symbol (e.g., "MTK").
- `imagePath` (string): Path to the token logo (e.g., "/assets/logo.png").
- `decimals` (integer, 0-18, default: 6): Number of decimal places.
- `fundRaisingTarget` (number, positive, default: 85): Target SOL amount to raise.
- `totalSupply` (number, default: 1,000,000,000): Total token supply.
- `totalSellPercent` (number, default: 0.75): Percentage of supply for fundraising.
- `createOnly` (boolean, default: true): If `true`, skips initial buy.
- `initialBuyAmount` (number, non-negative, default: 0.1): SOL amount for initial buy (if `createOnly` is `false`).
- `slippage` (number, 0-1.0, default: 0.01): Acceptable price slippage percentage (e.g., 0.01 for 1%).

**Example Prompt**:
> Create a new token on Raydium Launchpad named 'My Token' with symbol 'MTK', using the logo at '/assets/logo.png', a fundraising target of 35 SOL.


**Example Response**:
> Successfully created token (mint: <mint_address>, name: My Token, symbol: MTK). Transaction signatures: <tx_id>

### 2. `buy_token`
Purchases tokens from a Raydium Launchpad pool using SOL.

**Parameters**:
- `mintAddress` (string): Token mint address.
- `inAmount` (number, positive): Amount of SOL to spend.
- `slippage` (number, 0-1.0, default: 0.01): Acceptable price slippage percentage.

**Example Prompt**:
> Buy tokens from a Raydium Launchpad pool with mint address '<mint_address>' using 0.5 SOL and a slippage of 1%.

**Example Response**:
> Successfully purchased tokens (mint: <mint_address>). Transaction signature: <tx_id>

### 3. `sell_token`
Sells tokens back to a Raydium Launchpad pool.

**Parameters**:
- `mintAddress` (string): Token mint address.
- `inAmount` (number, positive): Amount of tokens to sell.
- `slippage` (number, 0-1.0, default: 0.01): Acceptable price slippage percentage.

**Example Prompt**:
> Sell 1,000,000 tokens from a Raydium Launchpad pool with mint address '<mint_address>' and a slippage of 1%.

**Example Response**:
> Successfully sold tokens (mint: <mint_address>). Transaction signature: <tx_id>

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

