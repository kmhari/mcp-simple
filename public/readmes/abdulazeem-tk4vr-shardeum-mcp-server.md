# Shardeum MCP Server

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Shardeum](https://img.shields.io/badge/Shardeum-Network-green)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)

[![smithery badge](https://smithery.ai/badge/@abdulazeem-tk4vr/shardeum-mcp-server)](https://smithery.ai/server/@abdulazeem-tk4vr/shardeum-mcp-server)

<br>

## 🌐 Overview

The Shardeum MCP (Model Context Protocol) Server is a powerful blockchain interaction tool that provides comprehensive access to the Shardeum network through standardized RPC methods. It enables AI agents, developers, and applications to seamlessly query and interact with the Shardeum blockchain.

## ✨ Key Features

- **Comprehensive RPC Method Support**
  - Ethereum standard methods
  - Shardeum-specific network methods
- **Flexible Blockchain Querying**
- **Easy Integration with AI Assistants**
- **Blockchain Connectivity**
- **Detailed Error Handling**

## 🛠️ Supported Methods

### Ethereum Standard RPC Methods

- Block Information

  - `eth_blockNumber`
  - `eth_getBlockByHash`
  - `eth_getBlockByNumber`
  - `eth_getBlockReceipts`

- Transaction Methods

  - `eth_getTransactionCount`
  - `eth_getTransactionByHash`
  - `eth_getTransactionByBlockHashAndIndex`
  - `eth_getTransactionByBlockNumberAndIndex`
  - `eth_getTransactionReceipt`

- Account Methods
  - `eth_getBalance`
  - `eth_estimateGas`
  - `eth_chainId`

### Shardeum-Specific Methods

- `shardeum_getNodeList`
- `shardeum_getNetworkAccount`
- `shardeum_getCycleInfo`

## 📦 Prerequisites

- Node.js 18.x or higher
- Basic understanding of blockchain technologies

### Connecting with Cursor

1. Clone the repo and do an npm install
2. Open Cursor
3. Go to Cursor Settings
4. Scroll to "MCP"
5. Click "Add new MCP server"
6. Enter details:

```bash
{
  "mcpServers": {
    "shm-mcp": {
      "command": "node",
      "args": [
        "path_to\\shardeum-mcp-server\\index.js"
      ]
    }
  }
}
```

## 🔍 Example Queries

### Checking Balance

Ask Cursor:

- "What is the balance of 0x1234... on Shardeum?"
- "Check ETH balance for this address"

### Exploring Transactions

- "Show details for transaction 0x5678..."
- "Analyze the latest block on Shardeum"

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a pull request

## 📄 Configuration

To use a different RPC endpoint, set the constant rpcUrl to a different value

### 🐛 Troubleshooting

- Ensure Node.js 18.x is installed
- Check network connectivity
- Verify RPC endpoint accessibility
- Update to the latest version

## 🗺️ Roadmap

- [ ] Add more networks for accessibility
- [ ] Make it write friendly to execute transactions
- [ ] Enhance error handling
- [ ] Improve performance
- [ ] Expand tool capabilities

## 📊 Supported Networks

- Shardeum Local
- More networks coming soon!
