# Alpaca Trading MCP Server

<div align="center">

<strong>Python implementation of the Model Context Protocol (MCP) Server for Alpaca Trading</strong>

[![MIT licensed][mit-badge]][mit-url]

</div>

[mit-badge]: https://img.shields.io/pypi/l/mcp.svg
[mit-url]: https://github.com/MardiantoS/alpaca-mcp-server/blob/main/LICENSE

A Model Context Protocol (MCP) server implementation for Alpaca trading that enables Large Language Models (LLMs) like Anthropic Claude to interact with Alpaca's trading API.
The instructions and commands provided in this README are primarily for MacOS/Linux users.

<p align="center">
  <img src="images/alpaca-mcp-server-demo.gif" alt="Alpaca MCP Server Demo with Claude Desktop">
  <figcaption align="center"><em>Demo showing the Claude for Desktop app on the left side and the Alpaca web console on the right side to verify the operations.</em></figcaption>
</p>

## Introduction

### Model Context Protocol (MCP)
[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open protocol developed by Anthropic that standardizes how applications provide context to LLMs. Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools.

### Alpaca
[Alpaca](https://alpaca.markets/) is a modern brokerage platform that provides access to the financial markets through developer-friendly APIs. By using Alpaca API, businesses build investing applications and features for their services. Also, programmatic traders can develop algorithms to automate trading strategies.

## Disclaimer

**IMPORTANT**: This software is provided "as is", without warranty of any kind. By using this code, you acknowledge that trading involves substantial risk, and the author is not responsible for any financial losses incurred through the use of this software. The user assumes all responsibility for trading decisions made using this implementation. Always use paper trading for testing before considering live trading with real money.

## References
- [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk)
- [Alpaca-py SDK](https://alpaca.markets/sdks/python/)

## Features

- **Account Management**: View account information and portfolio summary
- **Market Data**: Access real-time quotes and historical price bars
- **Trading Operations**: Place market and limit orders
- **Position Tracking**: Monitor current positions and recent orders

## Pre-requisites
- [uv](https://docs.astral.sh/uv/) (Python package and project manager)
    Installation command:
    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```
- [Optional] [Claude for Desktop](https://claude.ai/download) (Claude client app for testing)

## Installation

1. Clone this repository
    ```bash
    git clone https://github.com/MardiantoS/alpaca-mcp-server.git
    cd alpaca-mcp-server
    ```
2. [Optional but Recommended] Create and activate a virtual environment:
   ```bash
   uv venv
   source .venv/bin/activate
   ```

3. Install dependencies. `uv` reads the `uv.lock` file and install the specified versions of all dependencies
    ```bash
    uv sync
    ```

4. Create a `.env` file in the project root with your Alpaca credentials:
   ```
   ALPACA_API_KEY=your_api_key
   ALPACA_API_SECRET=your_api_secret
   ALPACA_PAPER=TRUE
   ```
   Note: Alpaca API keys can be acquired in the Alpaca developer web console. Check [Alpaca documentation](https://docs.alpaca.markets/docs/getting-started) for reference.

## Usage (Testing your Alpaca MCP Server with Claude for Desktop)

Make sure you have Claude for Desktop installed.

1. In your Claude for Desktop, go to Settings (this is the Setting from the menu bar, not the one within the app), then go to Developer tab, click "Edit Config". This will locate the `claude_desktop_config.json` file.

    Alternatively, you can locate it at `~/Library/Application Support/Claude/claude_desktop_config.json` (or refer to [MCP documentation site](https://modelcontextprotocol.io/) if the file location has changed)

2. Add the server in the `mcpServers` key.

    ```json
    {
        "mcpServers": {
            "alpaca": {
                "command": "/ABSOLUTE/PATH/TO/uv",
                "args": [
                    "--directory",
                    "/ABSOLUTE/PATH/TO/PARENT/FOLDER/alpaca-mcp-server",
                    "run",
                    "alpaca_mcp_server.py"
                ]
            }
        }
    }
    ```
    Note: Make sure to replace the absolute paths of `uv` and `alpaca-mcp-server` directory with the actual path on your machine. Hint: run `which uv` to show your absolute `uv` path.

3. Re-launch your Claude for Desktop if it's already launched. Click on the hammer icon to verify the available MCP tools. Here are some queries you could try:
    - "What's my current Alpaca portfolio balance?"
    - "Place a buy limit order for 10 shares of JPMorgan Chase at $238."
    - "Buy 1 share of GOOGL at market price."
    - "Place a sell limit order for 1 share of AAPL at $210."
    - "Cancel my sell limit order for AAPL."
    Note: If prompted, allow the tool access to run.

## Available Resources

- `account://info` - Get account information
- `positions://all` - Get all current positions
- `market://quote/{symbol}` - Get latest quote for a symbol
- `market://bars/{symbol}` - Get historical bars for a symbol (last 7 days)
- `orders://recent` - Get recent orders (last 7 days)

Note: Real-time market data features like quotes and historical bars might only be fully accessible with a Live trading account, depending on your Alpaca subscription level.

## Available Tools

- `place_market_order(symbol, side, qty)` - Place a market order
- `place_limit_order(symbol, side, qty, limit_price)` - Place a limit order
- `cancel_order(order_id)` - Cancel an existing order
- `get_portfolio_summary()` - Get a summary of the current portfolio

## Safety Features

- Uses paper trading by default (`ALPACA_PAPER=TRUE`)
- Proper error handling and logging
- Graceful startup and shutdown with contextlib

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Citation

If you use this work in your research or project, please use the following citation:
> Mardianto Hadiputro. (2025). Alpaca Trading MCP Server. GitHub. https://github.com/MardiantoS/alpaca-mcp-server