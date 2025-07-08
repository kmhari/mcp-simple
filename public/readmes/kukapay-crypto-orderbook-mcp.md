# Crypto Orderbook MCP

An MCP server that analyzes order book depth and imbalance across major crypto exchanges, empowering AI agents and trading systems with real-time market structure insights.

![License](https://img.shields.io/badge/license-MIT-green)
![Python](https://img.shields.io/badge/python-3.10%2B-blue)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg)


## Features

- **Order Book Metrics**: Calculate bid/ask depth and imbalance for a specified trading pair on a given exchange.
- **Cross-Exchange Comparison**: Compare order book depth and imbalance across multiple exchanges in a unified Markdown table.
- **Supported Exchanges**: Binance, Kraken, Coinbase, Bitfinex, Okx, Bybit

## Installation

### Prerequisites

- Python 3.10 or higher
- [uv](https://github.com/astral-sh/uv) (Python package and project manager)

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/kukapay/crypto-orderbook-mcp.git
   cd crypto-orderbook-mcp
   ```

2. **Install Dependencies**

   Use `uv` to install the required packages:

   ```bash
   uv sync
   ```
   
3. **Configure the MCP Client(Claude Desktop)**

    ```
    "mcpServers": { 
      "crypto-orderbook-mcp": { 
        "command": "uv", 
        "args": [ "--directory", "/absolute/path/to/crypto-orderbook-mcp", "run", "main.py" ]
      } 
    }
    ```

## Usage

The server provides two main tools:

1. **`calculate_orderbook`**: Computes bid depth, ask depth, and imbalance for a trading pair on a specified exchange.
2. **`compare_orderbook`**: Compares bid depth, ask depth, and imbalance across multiple exchanges, returning a Markdown table.

### Example: Calculate Order Book Metrics

**Prompt**: "Calculate the order book metrics for BTC/USDT on Binance with a 1% depth range."

**Expected Output** (JSON object):

```json
{
  "exchange": "binance",
  "symbol": "BTC/USDT",
  "bid_depth": 123.45,
  "ask_depth": 234.56,
  "imbalance": 0.1234,
  "mid_price": 50000.0,
  "timestamp": 1698765432000
}
```

### Example: Compare Order Book Across Exchanges

**Prompt**: "Compare the order book metrics for BTC/USDT across Binance, Kraken, and OKX with a 1% depth range."

**Expected Output** (Markdown table):

```markdown
| exchange | bid_depth | ask_depth | imbalance |
|----------|-----------|-----------|-----------|
| binance  |    123.45 |    234.56 |    0.1234 |
| kraken   |     89.12 |    178.34 |    0.0987 |
| okx      |    145.67 |    256.78 |    0.1345 |
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

