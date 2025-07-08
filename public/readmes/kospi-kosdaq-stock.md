# kospi-kosdaq-stock-server

[![PyPI version](https://badge.fury.io/py/kospi-kosdaq-stock-server.svg)](https://badge.fury.io/py/kospi-kosdaq-stock-server)
[![smithery badge](https://smithery.ai/badge/@dragon1086/kospi-kosdaq-stock-server)](https://smithery.ai/server/@dragon1086/kospi-kosdaq-stock-server)

<a href="https://glama.ai/mcp/servers/i1judi5h55">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/i1judi5h55/badge" />
</a>

An MCP server that provides KOSPI/KOSDAQ stock data using FastMCP.

## Features

- Lookup KOSPI/KOSDAQ ticker symbols and names
- Retrieve OHLCV data for a specific stock
- Retrieve market capitalization data for a specific stock
- Retrieve fundamental data (PER/PBR/Dividend Yield) for a specific stock
- Retrieve trading volume by investor type for a specific stock

## Available Tools

- `load_all_tickers` - Loads all ticker symbols and names for KOSPI and KOSDAQ into memory.
    - No arguments.

- `get_stock_ohlcv` - Retrieves OHLCV (Open/High/Low/Close/Volume) data for a specific stock.
    - `fromdate` (string, required): Start date for retrieval (YYYYMMDD)
    - `todate` (string, required): End date for retrieval (YYYYMMDD)
    - `ticker` (string, required): Stock ticker symbol
    - `adjusted` (boolean, optional): Whether to use adjusted prices (True: adjusted, False: unadjusted). Defaults to True.

- `get_stock_market_cap` - Retrieves market capitalization data for a specific stock.
    - `fromdate` (string, required): Start date for retrieval (YYYYMMDD)
    - `todate` (string, required): End date for retrieval (YYYYMMDD)
    - `ticker` (string, required): Stock ticker symbol

- `get_stock_fundamental` - Retrieves fundamental data (PER/PBR/Dividend Yield) for a specific stock.
    - `fromdate` (string, required): Start date for retrieval (YYYYMMDD)
    - `todate` (string, required): End date for retrieval (YYYYMMDD)
    - `ticker` (string, required): Stock ticker symbol

- `get_stock_trading_volume` - Retrieves trading volume by investor type for a specific stock.
    - `fromdate` (string, required): Start date for retrieval (YYYYMMDD)
    - `todate` (string, required): End date for retrieval (YYYYMMDD)
    - `ticker` (string, required): Stock ticker symbol

## Installation

This package requires [uv](https://github.com/astral-sh/uv) for installation and execution.

### Installing via Smithery

To install KOSPI/KOSDAQ Stock Data Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@dragon1086/kospi-kosdaq-stock-server):

```bash
npx -y @smithery/cli install @dragon1086/kospi-kosdaq-stock-server --client claude
```

### Manual Installation
```bash
# Create and activate a virtual environment
uv venv .venv
source .venv/bin/activate  # On Unix/macOS
# .venv\Scripts\activate   # On Windows

# Install the package
uv pip install kospi-kosdaq-stock-server
```

## Configuration for Claude.app

After installing the package, you need to configure the MCP server in your `claude_desktop_config.json` file.

1.  **Locate the configuration file:**
    *   On macOS, the file is typically located at:
        `/Users/username/Library/Application Support/Claude/claude_desktop_config.json`
    *   On Windows, the file is typically located at:
        `%APPDATA%/Claude/claude_desktop_config.json`

2.  **Add the server configuration:**
    Open the `claude_desktop_config.json` file and add a new entry to the `mcpServers` object:

```json
{
    "mcpServers": {
        "kospi-kosdaq": {
            "command": "uvx",
            "args": ["kospi_kosdaq_stock_server"]
        }
    }
}
```

Configuration Details:
- **`command`**: Use `uvx` to take advantage of uv's isolation and dependency management
- **`args`**: Only the package name is needed since the entry point is defined in the package
- No additional environment variables are required

3.  **Restart Claude:** After saving the changes to `claude_desktop_config.json`, restart Claude for the changes to take effect.

## Usage Example

After configuring the server, you can use it in Claude like this:

1. First, load all available stock tickers:
```
Human: Please load all available stock tickers.
Assistant: I'll help you load all KOSPI and KOSDAQ stock tickers.

> Using tool 'load_all_tickers'...
Successfully loaded 2,873 stock tickers.
```

2. Get OHLCV data for a specific stock:
```
Human: Show me Samsung Electronics' stock data for the last month.
Assistant: I'll retrieve Samsung Electronics' (005930) OHLCV data for the last month.

> Using tool 'get_stock_ohlcv'...
Date        Open    High    Low     Close   Volume
2024-02-14  73,800  74,000  73,400  73,700  7,823,124
2024-02-13  73,600  74,200  73,200  73,800  8,943,217
...
