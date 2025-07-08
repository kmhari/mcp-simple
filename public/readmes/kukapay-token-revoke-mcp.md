# Token Revoke MCP

An MCP server for checking and revoking ERC-20 token allowances, enhancing security and control.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg)

## Features

- **Fetch Token Approvals**: Retrieve all ERC20 token approvals for a wallet on a specified chain, including token details, balances, and USD values at risk.
- **Revoke Allowances**: Submit transactions to revoke ERC20 token allowances for specific spenders.
- **Check Transaction Status**: Verify the success or failure of submitted transactions using transaction hashes.
- **Multi-Chain Support**: Supports over 50 EVM-compatible chains, including mainnets (e.g., Ethereum, Polygon, BSC) and testnets (e.g., Goerli, Mumbai).

## Prerequisites

- **Node.js**: Version 18 or higher (for native `fetch` support).
- **Moralis API Key**: Required for fetching token approval data.
- **Private Key**: An Ethereum-compatible private key for signing revocation transactions.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kukapay/token-revoke-mcp.git
   cd token-revoke-mcp
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   
3. **Client Configuration**:

    ```json
    {
      "mcpServers": {
        "token-revoke-mcp": {
          "command": "node",
          "args": ["path/to/token-revoke-mcp/index.js"],
          "env": {
            "MORALIS_API_KEY": "your moralis api key",
            "PRIVATE_KEY": "your wallet private key"
          }
        }
      }
    }   
    ```

## Usage

Below are examples of how you might interact with the server using natural language prompts as input. The outputs are the raw `text` values from the `content` array returned by the server, assuming a client translates the prompts into tool calls.

### Example 1: Fetch Token Approvals
**Input Prompt**:  
> "Show me all the token approvals for my wallet on Polygon."

**Output Response**:  
```
[
  {
    "tokenAddress": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    "tokenSymbol": "USDC",
    "balance": "100.5",
    "usdPrice": "1.00",
    "usdValueAtRisk": "50.25",
    "spenderAddress": "0x1111111254eeb25477b68fb85ed929f73a960582",
    "approvedAmount": "1000.0",
    "transactionHash": "0xabc...",
    "timestamp": "2023-10-01T12:00:00Z"
  }
]
```

### Example 2: Revoke an Allowance
**Input Prompt**:  
> "Revoke the allowance for token 0x2791bca1f2de4661ed88a30c99a7a9449aa84174 to spender 0x1111111254eeb25477b68fb85ed929f73a960582 on BSC."

**Output Response**:  
```
Allowance revocation submitted on bsc. Transaction hash: 0x123.... Note: Transaction is not yet confirmed.
```

### Example 3: Check Transaction Status
**Input Prompt**:  
> "Did my transaction 0x123... on BSC go through?"

**Output Response** (possible outputs):  
- **Pending**:  
  ```
  Transaction 0x123... on bsc is still pending or not found.
  ```
- **Success**:  
  ```
  Transaction 0x123... on bsc has completed with status: successful. Block number: 12345.
  ```
- **Failure**:  
  ```
  Transaction 0x123... on bsc has completed with status: failed. Block number: 12345.
  ```

## Supported Chains

The server supports a wide range of EVM-compatible chains based on the Moralis JS SDK’s `chaindata.ts`. Examples include:
- Mainnets: `ethereum`, `polygon`, `bsc`, `avalanche`, `fantom`, `arbitrum`, `optimism`, etc.
- Testnets: `goerli`, `mumbai`, `bsc testnet`, `arbitrum goerli`, `optimism sepolia`, etc.
- Full list: See `SUPPORTED_CHAINS` in `server.js`.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

