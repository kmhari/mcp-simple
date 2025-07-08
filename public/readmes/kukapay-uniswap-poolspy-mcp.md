# Uniswap PoolSpy MCP Server

An MCP server that tracks newly created liquidity pools on Uniswap across nine blockchain networks — Ethereum, Base, Optimism, Arbitrum, Polygon, BNB Smart Chain (BSC), Avalanche, Celo, and Blast — providing real-time data for DeFi analysts, traders, and developers.

![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg)

## Features

- Monitors Uniswap V3 pool creation across 9 blockchain networks.
- Customizable time range and result limits for querying new pools.
- Supports sorting by timestamp, transaction count, volume, or TVL.

## Prerequisites

- Python 3.10 or higher
- [uv](https://github.com/astral-sh/uv) for package management
- A valid [The Graph API key](https://thegraph.com/studio/apikeys/)
- MCP-compatible environment (e.g., Claude Desktop) for full functionality

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/uniswap-poolspy-mcp.git
   cd uniswap-poolspy-mcp
   ```

2. **Set Up Environment**:
   Install `uv` if you haven't already:
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

3. **Install Dependencies**:
   Use `uv` to sync dependencies from `pyproject.toml`:
   ```bash
   uv sync
   ```

4. **Configure API Key**:
   Create a `.env` file in the project root:
   ```bash
   echo "THEGRAPH_API_KEY=your-api-key-here" > .env
   ```
   Replace `your-api-key-here` with your actual The Graph API key.

## Usage

### Running the Server

Start the MCP server:
```bash
uv run main.py
```

For development with MCP Inspector:
```bash
uv run mcp dev main.py
```

### Integrating with Claude Desktop

Install the server as an MCP plugin:
```bash
uv run mcp install main.py --name "UniswapPoolSpy"
```

### Configuration

To make the server discoverable by MCP clients (e.g., Claude Desktop), configure it in an `mcpServers` file:

```json
{
  "mcpServers": {
    "Uniswap-PoolSpy": {
      "command": "uv",
      "args": ["--directory", "path/to/uniswap-poolspy-mcp", "run", "main.py"],
      "env": {
        "THEGRAPH_API_KEY": "your api key from The Graph"
      }
    }
  }
}
   ```


### Querying New Pools

Use the `get_new_pools` tool in Claude Desktop with natural language queries like:
- "Show me new pools on Ethereum from the last 10 minutes"
- "List pools on Base sorted by volume, limit to 50"
- "What pools were created on Polygon in the past hour, ordered by TVL?"

The tool accepts these parameters:
- `chain`: Blockchain network (e.g., "ethereum", "base", "optimism")
- `order_by`: Sort field ("timestamp", "txcount", "volume", "tvl")
- `time_range_seconds`: Lookback period in seconds (default: 300)
- `limit`: Maximum number of pools to return (default: 100)

### Example Output
```
Newly Created Trading Pools (Last 5 Minutes, Limit: 100):
Pool Address: 0x1234...abcd
Tokens: WETH/USDC
Created At: 2025-03-18 12:34:56
Block Number: 12345678
Transaction Count: 5
Volume (USD): 15000.25
Total Value Locked (USD): 50000.75

Pool Address: 0x5678...efgh
Tokens: DAI/USDT
Created At: 2025-03-18 12:33:45
Block Number: 12345670
Transaction Count: 3
Volume (USD): 8000.50
Total Value Locked (USD): 25000.00
```

## Supported Chains

- Ethereum
- Base
- Optimism
- Arbitrum
- Polygon
- BNB Smart Chain (BSC)
- Avalanche
- Celo
- Blast

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

