# MCP EVM Signer

A Model Context Protocol (MCP) server for managing Ethereum private keys and deploying smart contracts using Infura. This server enables Claude for Desktop and other MCP clients to interact with EVM-compatible blockchains.

![MCP EVM Signer architecture](https://i.imgur.com/gHwqLXM.png)

## Features

- 🔑 Securely store and manage Ethereum private keys locally
- 🔌 Connect to Infura for blockchain interactions
- 📝 Deploy smart contracts from compiled ABIs and bytecode
- ✍️ Sign and send transactions
- 💰 View account balances and transaction history
- 🔍 Query blockchain data and interact with deployed contracts

## Quick Start

### Prerequisites

- Node.js v16 or higher
- An Infura account with API key
- Claude for Desktop app installed

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/zhangzhongnan928/mcp-evm-signer.git
   cd mcp-evm-signer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file to add your Infura API key and configure other settings.

### Integrating with Claude for Desktop

1. Add the server to your Claude for Desktop configuration:

```json
{
  "mcpServers": {
    "evm-signer": {
      "command": "node",
      "args": ["/path/to/mcp-evm-signer/build/index.js"],
      "env": {
        "INFURA_API_KEY": "your_infura_api_key_here",
        "DEFAULT_NETWORK": "sepolia",
        "ENCRYPT_KEYS": "true",
        "KEY_PASSWORD": "your_secure_password_here"
      }
    }
  }
}
```

2. Restart Claude for Desktop

3. You can now ask Claude to deploy smart contracts, check balances, or interact with EVM blockchains

## Available Tools

The MCP EVM Signer server exposes the following tools for use with Claude:

### Wallet Management
- `create-wallet`: Create a new Ethereum wallet
- `import-wallet`: Import an existing wallet from a private key
- `list-wallets`: List all saved wallets

### Blockchain Operations
- `check-balance`: Check the ETH balance of an address
- `get-transactions`: Get recent transactions for an address
- `send-transaction`: Send ETH to an address

### Smart Contract Interactions
- `deploy-contract`: Deploy a smart contract from ABI and bytecode
- `call-contract`: Call a read-only contract method
- `execute-contract`: Execute a contract method that modifies state

## Example Usage

Below are some examples of how you can use these tools with Claude:

### Creating a Wallet

You can ask Claude:
```
Could you create a new Ethereum wallet for me using the evm-signer tools?
```

### Checking a Balance

You can ask Claude:
```
Can you check the balance of my Ethereum wallet 0x1234...5678 on the Sepolia network?
```

### Deploying an ERC-20 Token

See our [ERC-20 token example](examples/erc20-token.md) for a complete walkthrough of deploying and interacting with an ERC-20 token contract.

## Security Notes

- Private keys are stored locally on your machine
- Keys can be encrypted with a password
- The server only exposes functionality through the MCP protocol
- Always review transactions before approving them in Claude for Desktop
- Use test networks like Sepolia or Goerli when getting started

## Documentation

For more detailed documentation, please refer to:

- [Usage Guide](USAGE.md): Detailed usage instructions and examples
- [Examples](examples/): Sample workflows and contract deployments

## Project Structure

```
mcp-evm-signer/
├── src/                  # Source code
│   ├── config.ts         # Configuration management
│   ├── crypto.ts         # Key management utilities
│   ├── ethereum.ts       # Ethereum interaction functions
│   └── index.ts          # Main MCP server implementation
├── keys/                 # Storage for wallet keys (gitignored)
├── examples/             # Example usage patterns
├── .env.example          # Example environment variables
└── ...                   # Project configuration files
```

## Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
