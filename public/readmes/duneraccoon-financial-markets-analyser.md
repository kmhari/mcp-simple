# Financial Markets Analyser

A FastMCP server that offers financial data endpoints for stocks and cryptocurrencies. Gets the job done with free tiers for all services and always falls back to Yahoo Finance if other APIs are down (or API keys aren't provded)

## Features

- **Stock Market Data**: Historical prices, current prices, income statements, balance sheets, cash flow statements
- **Cryptocurrency Data**: Current and historical prices, cryptocurrency listings
- **Company News**: Latest news for publicly traded companies
- **Multi-Source Fallback System**: Automatically tries multiple data sources to ensure reliability

## Free Data Sources Used

This package uses a combination of these free financial data APIs:

1. **Yahoo Finance** (via yfinance): No API key required, no rate limits
2. **Alpha Vantage**: Free tier with 5 API calls per minute, 500 calls per day
3. **Financial Modeling Prep (FMP)**: Free tier with ~250-300 API calls per day
4. **CoinGecko**: Free tier with rate limiting (10-50 calls per minute)

## Prerequisites
- Python 3.10 or higher
- [uv](https://pypi.org/project/uv/)

## Configuration and Installation

1. Install UV globally using Homebrew in Terminal (if you haven't already done so):
```bash
brew install uv
```

or with curl
```bash
# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
curl -LsSf https://astral.sh/uv/install.ps1 | powershell
```

2. Clone and install the repo
```bash
# Clone the repository
git clone https://github.com/duneraccoon/financial-markets-analyser.git
cd financial-markets-analyser

uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
# Install using uv
uv pip install -e .
## or in development mode
# uv pip install -e ".[dev]"
```

3. Install Claude Desktop (if you haven't already done so):
   - Download and install [Claude Desktop](https://www.anthropic.com/claude-desktop) for your OS.
   - Follow the installation instructions provided on the website.

3. Create claude_desktop_config.json (if it doesn't exist):
    - For MacOS: Open directory ~/Library/Application Support/Claude/ and create the file inside it
    - For Windows: Open directory %APPDATA%/Claude/ and create the file inside it

4. Add the server config to the config JSON. Use .env.example as a guide for the env arg:

```json
{
  "mcpServers": {
    "financial-markets-analyser": {
      "command": "uv",
      "args": [
        "--directory",
        "/path/to/financial-markets-analyser",
        "run",
        "entrypoint.py"
      ],
      "env": {
        "ALPHA_VANTAGE_API_KEY": "your_api_key",
        "FMP_API_KEY": "your_api_secret"
      }
    }
  }
}
```
You can obtain free API keys from:
- Alpha Vantage: https://www.alphavantage.co/support/#api-key
- Financial Modeling Prep: https://site.financialmodelingprep.com/developer/docs/

## Usage

### Starting the MCP Server

```bash
python server.py
```

Or use the installed script:

```bash
financial-markets-analyser
```

### Available Methods

#### Stock Market Data

| Method | Description | Parameters |
|--------|-------------|------------|
| `get_income_statements` | Get income statements for a company | `ticker`: Symbol (e.g., AAPL)<br>`period`: "annual" or "quarterly"<br>`limit`: Number of statements (default: 4) |
| `get_balance_sheets` | Get balance sheets for a company | `ticker`: Symbol (e.g., AAPL)<br>`period`: "annual" or "quarterly"<br>`limit`: Number of statements (default: 4) |
| `get_cash_flow_statements` | Get cash flow statements for a company | `ticker`: Symbol (e.g., AAPL)<br>`period`: "annual" or "quarterly"<br>`limit`: Number of statements (default: 4) |
| `get_current_stock_price` | Get latest stock price data | `ticker`: Symbol (e.g., AAPL) |
| `get_historical_stock_prices` | Get historical stock prices | `ticker`: Symbol (e.g., AAPL)<br>`start_date`: Start date (YYYY-MM-DD)<br>`end_date`: End date (YYYY-MM-DD)<br>`interval`: Time interval (1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo) |
| `get_company_news` | Get latest news for a company | `ticker`: Symbol (e.g., AAPL)<br>`limit`: Number of news articles (default: 10) |

#### Cryptocurrency Data

| Method | Description | Parameters |
|--------|-------------|------------|
| `get_available_crypto_tickers` | Get list of available cryptocurrencies | None |
| `get_current_crypto_price` | Get latest price for a cryptocurrency | `ticker`: Symbol (e.g., BTC-USD) |
| `get_historical_crypto_prices` | Get historical cryptocurrency prices | `ticker`: Symbol (e.g., BTC-USD)<br>`start_date`: Start date (YYYY-MM-DD)<br>`end_date`: End date (YYYY-MM-DD)<br>`interval`: Time interval (minute, hour, day) |

### Example Client Code

```python
import asyncio
from mcp.client.localclient import LocalClient

async def main():
    client = LocalClient(["python", "server.py"])
    await client.start()
    
    # Get current price of Apple stock
    result = await client.call("get_current_stock_price", {"ticker": "AAPL"})
    print(result)
    
    # Get historical prices for Tesla
    result = await client.call(
        "get_historical_stock_prices", 
        {
            "ticker": "TSLA", 
            "start_date": "2023-01-01", 
            "end_date": "2023-12-31",
            "interval": "1mo"
        }
    )
    print(result)
    
    await client.stop()

if __name__ == "__main__":
    asyncio.run(main())
```

## Development

### Installing Development Dependencies

```bash
# With uv
uv pip install -e ".[dev]"
```

### Running Tests

```bash
# Run tests with pytest
pytest
```

## API Rate Limits

Be mindful of these rate limits for free tiers:

| API | Rate Limit |
|-----|------------|
| Yahoo Finance | No official limits (use responsibly) |
| Alpha Vantage | 5 API calls per minute, 500 per day |
| Financial Modeling Prep | ~250-300 calls per day, 500MB bandwidth/month |
| CoinGecko | 10-50 calls per minute |

The server implements a fallback system to manage these limits efficiently.

## Differences from financialdatasets.ai

This package aims to provide equivalent functionality to financialdatasets.ai but using free APIs. Key differences:

- Slightly different data format in responses
- Some advanced financial data might be less comprehensive
- Rate limits on free tier APIs may affect high-volume usage

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
