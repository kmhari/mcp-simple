# Uniswap V3 Price MCP Server

An MCP server that delivers real-time token prices from Uniswap V3 across multiple chains — optimized for AI agents and DeFi automation.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg)


## Features
- **Supported Chains**: Ethereum Mainnet (1), Polygon (137), Arbitrum (42161), Optimism (10).
- **Token Price Fetching**: Queries Uniswap V3 pools for token prices against USDT, USDC, or WETH (in that order) with automatic decimal and symbol retrieval.
- **USD Conversion**: Optional USD price conversion using CryptoCompare API for all quote tokens.

## Prerequisites
- **Node.js** (v18 or higher recommended) and **npm**.
- **Infura Account**: Obtain an `INFURA_PROJECT_ID` with access to Ethereum, Polygon, Arbitrum, and Optimism (sign up at [Infura](https://infura.io/)).

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/kukapay/uniswap-price-mcp.git
   cd uniswap-price-mcp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Client Configuration**:

    ```json
    {
      "mcpServers": {
        "Uniswap Price": {
          "command": "node",
          "args": ["path/to/uniswap-price-mcp/index.js"],
          "env": {
            "INFURA_PROJECT_ID": "your_infura_project_id"
          }
        }
      }
    }
    ```
    Replace `your_infura_project_id` with your Infura project ID.
    
## Usage

Interact with the server using MCP-compatible clients.

### Tools

#### getSupportedChains

**Prompt**:
```
Show me a list of all blockchain networks supported by the server, formatted as a table.
```
**Result**:

| Chain ID | Chain Name       |
|----------|------------------|
| 1        | Ethereum Mainnet |
| 137      | Polygon          |
| 42161    | Arbitrum         |
| 10       | Optimism         |

#### getTokenPrice

**Prompt**:
```
What is the current price of DAI in USD on the Ethereum Mainnet?
```

**Result**:
```
Price of token DAI on chain 1 in USD: 1.00
```

**Prompt**:
```
Get the USD price of Chainlink (LINK) on the Polygon network.
```

**Result**:
```
Price of token LINK on chain 137 in USD: 18.50
```

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
