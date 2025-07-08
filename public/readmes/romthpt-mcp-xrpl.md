# XRP Ledger Model Context Protocol Server

[![MCP Server](https://glama.ai/mcp/servers/%40RomThpt/mcp-xrpl/badge)](https://glama.ai/mcp/servers/%40RomThpt/mcp-xrpl)

License: MIT | XRPL Networks | TypeScript | xrpl.js

A comprehensive Model Context Protocol (MCP) server that provides blockchain services for the XRP Ledger ecosystem. This server enables AI agents to interact with XRPL MainNet, TestNet, and DevNet with a unified interface.

## 📋 Contents

-   [Overview](#-overview)
-   [Features](#-features)
-   [Supported Networks](#-supported-networks)
-   [Prerequisites](#️-prerequisites)
-   [Installation](#-installation)
-   [Server Configuration](#️-server-configuration)
-   [Usage](#-usage)
-   [API Reference](#-api-reference)
-   [Security Considerations](#-security-considerations)
-   [Project Structure](#-project-structure)
-   [Development](#️-development)
-   [License](#-license)

## 🔭 Overview

The MCP XRPL Server leverages the Model Context Protocol to provide XRP Ledger services to AI agents. It supports a wide range of services including:

-   Reading ledger state (balances, transactions, account info, etc.)
-   Interacting with smart contracts (via Hooks)
-   Transferring XRP and issued tokens
-   Querying token metadata and balances
-   Managing decentralized identifiers (DIDs)
-   Working with NFTs on the XRPL
-   Automated Market Maker (AMM) operations
-   Payment channels, escrows, and checks
-   Oracle data operations
-   Trustline management

All services are exposed through a consistent interface of MCP tools and resources, making it easy for AI agents to discover and use XRPL functionality.

## ✨ Features

### Account Management

-   Connect to XRPL networks (MainNet, TestNet, DevNet)
-   Account information retrieval
-   Account property management
-   Deposit preauthorization
-   Regular key management

### XRP and Token Operations

-   Transfer XRP between accounts
-   Get token metadata (name, symbol, decimals, supply)
-   Check token balances
-   Transfer tokens between addresses
-   Approve token spending
-   Token clawback

### NFT Operations

-   Mint NFTs on the XRP Ledger
-   View NFT metadata
-   Verify NFT ownership
-   Transfer NFTs between addresses
-   Get NFT collections

### Decentralized Identifier (DID)

-   Create DIDs on the XRPL
-   Resolve DIDs
-   Update DID documents
-   Deactivate DIDs

### AMM Operations

-   Create Automated Market Makers
-   Deposit to AMMs
-   Place bids on AMMs
-   Vote on AMM parameters
-   Delete AMMs
-   Clawback assets from AMMs

### Check Operations

-   Create checks
-   Cash checks
-   Cancel checks

### Offer/DEX Operations

-   Create offers
-   Cancel offers

### Oracle Operations

-   Set oracle data
-   Delete oracle data

### Payment Channels

-   Create payment channels
-   Fund payment channels
-   Claim from payment channels

### Escrow

-   Create escrows
-   Finish escrows
-   Cancel escrows

### Trustlines

-   Set and manage trustlines

### Ticketing

-   Create tickets for transaction processing

## 🌐 Supported Networks

-   **MainNet**: Production XRP Ledger network
-   **TestNet**: Test network for development
-   **DevNet**: Development network for experimental features

## 🛠️ Prerequisites

-   Node.js 18.0.0 or higher

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-xrpl.git
cd mcp-xrpl

# Install dependencies
npm install

# Build the project
npm run build
```

## ⚙️ Server Configuration

Create a `.env` file in the project root with the following variables:

```
# Optional: XRPL wallet seed for automatic connection
# If not provided, you can connect using the connect-to-xrpl tool
DEFAULT_SEED=sEdVoKkRRF8RsNYZ689NDeMyrijiCbg  # Example - replace with your own or remove

# Network selection (default is "testnet")
XRPL_NETWORK=testnet  # Options: mainnet, testnet, devnet
```

## 🚀 Usage

### Starting the Server

```bash
# Start the server in stdio mode (for CLI tools)
npm start
```

### Connecting to the Server

Connect to this MCP server using any MCP-compatible client. For testing and debugging, you can use the MCP Inspector.

## 📚 API Reference

### Tools

The server provides the following MCP tools for agents:

#### Account Management

| Tool Name                | Description                        | Key Parameters                   |
| ------------------------ | ---------------------------------- | -------------------------------- |
| `connect-to-xrpl`        | Connect to XRP Ledger using a seed | seed, network                    |
| `get-account-info`       | Get account information            | address, network                 |
| `delete-account`         | Delete an XRPL account             | privateKey, destination, network |
| `set-account-properties` | Set account properties             | privateKey, properties, network  |
| `deposit-preauth`        | Preauthorize a deposit             | privateKey, authorize, network   |
| `set-regular-key`        | Set a regular key for an account   | privateKey, regularKey, network  |

#### XRP and Token Operations

| Tool Name                | Description            | Key Parameters                                  |
| ------------------------ | ---------------------- | ----------------------------------------------- |
| `transfer-xrp`           | Send XRP to an account | privateKey, to, amount, network                 |
| `get-token-metadata`     | Get token metadata     | tokenAddress, network                           |
| `check-token-balance`    | Check token balance    | tokenAddress, ownerAddress, network             |
| `transfer-token`         | Transfer tokens        | privateKey, tokenAddress, to, amount, network   |
| `approve-token-spending` | Approve token spending | privateKey, tokenAddress, limit, network        |
| `token-clawback`         | Clawback tokens        | privateKey, tokenAddress, from, amount, network |

#### NFT Operations

| Tool Name             | Description              | Key Parameters                   |
| --------------------- | ------------------------ | -------------------------------- |
| `nft-mint`            | Mint an NFT              | privateKey, uri, flags, network  |
| `get-nft-info`        | Get NFT metadata         | tokenID, network                 |
| `check-nft-ownership` | Verify NFT ownership     | tokenID, ownerAddress, network   |
| `transfer-nft`        | Transfer an NFT          | privateKey, tokenID, to, network |
| `get-nft-collection`  | Get NFTs in a collection | address, network                 |

#### DID Operations

| Tool Name        | Description      | Key Parameters                 |
| ---------------- | ---------------- | ------------------------------ |
| `create-did`     | Create a DID     | privateKey, data, network      |
| `resolve-did`    | Resolve a DID    | did, network                   |
| `update-did`     | Update a DID     | privateKey, did, data, network |
| `deactivate-did` | Deactivate a DID | privateKey, did, network       |

#### AMM Operations

| Tool Name      | Description              | Key Parameters                     |
| -------------- | ------------------------ | ---------------------------------- |
| `amm-create`   | Create an AMM            | privateKey, assets, network        |
| `amm-deposit`  | Deposit to an AMM        | privateKey, ammID, assets, network |
| `amm-bid`      | Place bid on an AMM      | privateKey, ammID, bid, network    |
| `amm-vote`     | Vote on AMM parameters   | privateKey, ammID, vote, network   |
| `amm-delete`   | Delete an AMM            | privateKey, ammID, network         |
| `amm-clawback` | Clawback assets from AMM | privateKey, ammID, assets, network |

### Resources

The server exposes XRPL data through the following MCP resource URIs:

#### Ledger Resources

| Resource URI Pattern                         | Description                |
| -------------------------------------------- | -------------------------- |
| `xrpl://{network}/ledger/current`            | Current ledger information |
| `xrpl://{network}/ledger/{ledger_index}`     | Ledger by index            |
| `xrpl://{network}/account/{address}`         | Account information        |
| `xrpl://{network}/account/{address}/balance` | Account XRP balance        |
| `xrpl://{network}/tx/{tx_hash}`              | Transaction details        |

#### Token Resources

| Resource URI Pattern                                             | Description               |
| ---------------------------------------------------------------- | ------------------------- |
| `xrpl://{network}/token/{currency}/{issuer}`                     | Token information         |
| `xrpl://{network}/token/{currency}/{issuer}/balanceOf/{address}` | Token balance             |
| `xrpl://{network}/nft/{tokenID}`                                 | NFT information           |
| `xrpl://{network}/nft/{tokenID}/owner`                           | NFT ownership information |

## 🔒 Security Considerations

-   Wallet seeds are used only for transaction signing and should be kept secure
-   Consider implementing additional authentication mechanisms for production use
-   For high-value services, consider adding confirmation steps
-   Default operations are performed on TestNet to ensure safety during development
-   Use environment variables for sensitive configuration

## 📁 Project Structure

```
mcp-xrpl/
├── src/
│   ├── core/                # Core utilities and services
│   │   ├── constants.ts     # XRPL network URLs and other constants
│   │   ├── state.ts         # State management for connected wallet
│   │   ├── utils.ts         # Helper functions
│   │   └── services/        # Service modules
│   ├── server/              # MCP server implementation
│   ├── transactions/        # XRPL transaction implementation
│   │   ├── token/           # Token-related transactions
│   │   ├── nft/             # NFT-related transactions
│   │   ├── did/             # DID-related transactions
│   │   ├── amm/             # AMM-related transactions
│   │   ├── check/           # Check-related transactions
│   │   ├── offer/           # Offer-related transactions
│   │   ├── oracle/          # Oracle-related transactions
│   │   ├── payment/         # Payment-related transactions
│   │   ├── escrow/          # Escrow-related transactions
│   │   └── trust/           # Trust line-related transactions
│   └── index.ts             # Entry point
├── build/                   # Compiled JavaScript output
├── package.json
├── package-lock.json
└── tsconfig.json
```

## 🛠️ Development

### Adding New Tools

To add a new tool:

1. Create a new TypeScript file in the appropriate directory under `src/transactions/`
2. Import the server from `server/server.js`
3. Define the tool using `server.tool()`
4. Import the tool in `src/index.ts`

### Project Dependencies

-   [`@modelcontextprotocol/sdk`](https://www.npmjs.com/package/@modelcontextprotocol/sdk): MCP SDK
-   [`xrpl`](https://www.npmjs.com/package/xrpl): XRP Ledger JavaScript/TypeScript API
-   [`dotenv`](https://www.npmjs.com/package/dotenv): Environment variable management
-   [`zod`](https://www.npmjs.com/package/zod): TypeScript-first schema declaration and validation

## 📄 License

This project is licensed under the terms of the MIT License.

## ⚠️ Disclaimer

This software is provided for educational and development purposes only. Use it at your own risk. Always test thoroughly on the Testnet before using on Mainnet with real XRP.
