# Binance Alpha MCP

An MCP server for tracking Binance Alpha trades, helping AI agents optimize alpha point accumulation.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg)

## Features

- **Real-time Trade Monitoring**:  Track buy-side activity for Binance Alpha tokens by Subscribing to on-chain events.
- **USD-based Metrics**: Calculates trade values in USD using real-time prices from the CryptoCompare.
- **Data Persistence**: Maintains trade data in memory, with automatic cleanup of records older than 1 hour.
- **MCP Tools**:
  - `get_top_tokens`: Returns a markdown table of top tokens by USD trading volume, including symbol, USD volume, name, and address.
  - `get_trade_stats`: Provides statistics on trade USD values (min, max, median) and a distribution table.
- **Configurable Endpoints**: Uses separate WebSocket (`WS_ENDPOINT`) and HTTP (`RPC_ENDPOINT`) endpoints for event listening and token queries.

## Prerequisites

- **Node.js**: Version 18 or higher.
- **npm**: For dependency management.
- **BSC Node Access**: A WebSocket endpoint for event listening and an HTTP RPC endpoint for token queries, which can be obtained from services like Infura or QuikNode.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kukapay/binance-alpha-mcp.git
   cd binance-alpha-mcp
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure MCP Client**:
   To use this server with an MCP client like Claude Desktop, add the following to your config file (or equivalent):
    ```json
    {
      "mcpServers": {
        "binance-alpha-mcp": {
          "command": "node",
          "args": ["/absolute/path/to/binance-alpha-mcp/index.js"],
          "env": { 
             "WS_ENDPOINT": "your_ws_endpoint_url",
             "RPC_ENDPOINT": "your_rpc_endpoint_url"
          }
        }
      }
    }   
    ```
   Replace `/absolute/path/to/binance-alpha-mcp` with your actual installation path, and update `WS_ENDPOINT` and `PRC_ENDPOINT` with your own endpoint URLs.

## Usage

The server exposes two MCP tools:

### get_top_tokens
- **Description**: Returns a markdown table of the top tokens by USD trading volume.
- **Input**: `{ limit: number }` (optional, defaults to 10). Specifies how many tokens to include in the output.
- **Output Example**:
  ```
  period: last 23 minutes
  | Symbol | USD Volume | Name | Address |
  |--------|------------|------|---------|
  | ZK | $72516.34 | Polyhedra Network | 0xc71b5f631354be6853efe9c3ab6b9590f8302e81 |
  | B2 | $22893.72 | BSquared Token | 0x783c3f003f172c6ac5ac700218a357d2d66ee2a2 |
  | AIOT | $5249.05 | OKZOO | 0x55ad16bd573b3365f43a9daeb0cc66a73821b4a5 |
  | gorilla | $3263.95 | gorilla | 0xcf640fdf9b3d9e45cbd69fda91d7e22579c14444 |
  | BOOP | $2046.32 | BOOP | 0x9a70815dfb644a24b57358e1041f8d0324c8f6e1 |
  | BANK | $1305.38 | Lorenzo Governance Token | 0x3aee7602b612de36088f3ffed8c8f10e86ebf2bf |
  | SKYAI | $1015.69 | SKYAI | 0x92aa03137385f18539301349dcfc9ebc923ffb10 |
  | KOGE | $672.59 | BNB48 Club Token | 0xe6df05ce8c8301223373cf5b969afcb1498c5528 |
  | MYX | $477.85 | MYX | 0xd82544bf0dfe8385ef8fa34d67e6e4940cc63e16 |
  | Drama | $108.37 | Drama | 0xf922fb5f88c19f363cb018e8f7c98c10ed294444 |
  ```
  
### get_trade_stats
- **Description**: Returns statistics about trade USD values, including min, max, median, and distribution.
- **Input**: `{ buckets: number }` (optional, defaults to 10). Specifies the number of buckets to divide the trade distribution by USD value.
- **Output Example**:
  ```
  period: last 1 minutes
  min: $0.30, max: $2469.14, median: $653.41
  | range | count |
  |-------|-------|
  | 0.30~247.19 | 26 |
  | 247.19~494.07 | 22 |
  | 494.07~740.95 | 39 |
  | 740.95~987.84 | 6 |
  | 987.84~1234.72 | 16 |
  | 1234.72~1481.61 | 9 |
  | 1481.61~1728.49 | 1 |
  | 1728.49~1975.38 | 6 |
  | 1975.38~2222.26 | 10 |
  | 2222.26~2469.14 | 2 |
  ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

