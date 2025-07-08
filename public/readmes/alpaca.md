# Alpaca MCP Server

This is a Model Context Protocol (MCP) server for Alpaca, allowing LLMs like Claude to interact with the Alpaca trading API. It enables trading stocks, checking positions, fetching market data, and managing your account - all through natural language.

## Features

- 📊 **Market Data** - Get real-time stock quotes and historical price data
- 💵 **Account Information** - Check your balances, buying power, and status
- 📈 **Position Management** - View current positions and their performance
- 🛒 **Order Placement** - Place market and limit orders through natural language
- 📋 **Order Management** - List, track, and cancel orders

## Prerequisites

- Python 3.10+
- Alpaca API keys
- Claude for Desktop or another MCP client

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/alpaca-mcp.git
   cd alpaca-mcp
   ```

2. Install the required packages:
   ```bash
   pip install mcp alpaca-py python-dotenv
   ```

3. Create a `.env` file with your Alpaca API credentials:
   ```
   API_KEY_ID=your_alpaca_api_key
   API_SECRET_KEY=your_alpaca_secret_key
   ```

## Usage

### Running the server

Start the server by running:

```bash
python alpaca_mcp_server.py
```

### Configuring Claude for Desktop

1. Open Claude for Desktop
2. Go to Settings
3. Click on "Developer" and then "Edit Config"
4. Add the server configuration to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "alpaca": {
      "command": "python",
      "args": [
        "/path/to/alpaca_mcp_server.py"
      ],
      "env": {
        "API_KEY_ID": "your_alpaca_api_key",
        "API_SECRET_KEY": "your_alpaca_secret_key"
      }
    }
  }
}
```

5. Save and restart Claude for Desktop

### Available Tools

The server exposes the following tools:

- `get_account_info()` - Get account balances and status
- `get_positions()` - List all current positions in the portfolio
- `get_stock_quote(symbol)` - Get the latest quote for a stock
- `get_stock_bars(symbol, days)` - Get historical price bars for a stock
- `get_orders(status, limit)` - List orders with specified status
- `place_market_order(symbol, side, quantity)` - Place a market order
- `place_limit_order(symbol, side, quantity, limit_price)` - Place a limit order
- `cancel_all_orders()` - Cancel all open orders
- `close_all_positions(cancel_orders)` - Close all open positions

## Example Queries

Once the server is connected to Claude, you can ask questions like:

- "What's my current account balance and buying power?"
- "Show me my current positions"
- "Get the latest quote for AAPL"
- "Show me the price history for TSLA over the last 10 days"
- "Buy 5 shares of MSFT at market price"
- "Sell 10 shares of AMZN with a limit price of $130"
- "Cancel all my open orders"

## Note

This server uses Alpaca's paper trading by default. To use real money trading, change `paper=True` to `paper=False` in the `TradingClient` initialization.

## Security Notice

This MCP server will have access to your Alpaca account and can place real trades. Always review what Claude is suggesting before approving any trades.

## License

MIT