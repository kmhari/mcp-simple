# Crypto Trader MCP Tool for Claude Desktop

An MCP (Model Context Protocol) tool that provides cryptocurrency market data using the CoinGecko API, specifically designed for Claude Desktop.

## Tutorial

For a detailed guide on setting up and using this tool, check out our Medium tutorial:
[Tutorial: Using Claude Desktop with Crypto Trader MCP Tool to Get Real-Time Cryptocurrency Data](https://medium.com/@saintdoresh/tutorial-using-claude-desktop-with-crypto-trader-mcp-tool-to-get-real-time-cryptocurrency-data-4df25ecede33)

## Features

- Real-time cryptocurrency price data
- Detailed market information for cryptocurrencies
- Historical price charts
- Cryptocurrency search functionality
- Trending cryptocurrencies tracking
- Global market statistics

## Setup

1. Ensure you have Python 3.10 or higher installed

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Integration with Claude Desktop

1. Configure your MCP settings in Claude Desktop by adding the following to your MCP configuration:

```json
{
  "mcpServers": {
    "crypto-trader": {
      "command": "py",
      "args": ["-3.13", "C:\\Path\\To\\Your\\Crypto-Trader-MCP-ClaudeDesktop\\main.py"]
    }
  }
}
```

2. Replace the path with the full path to your main.py file
3. Run the server using:
```bash
py -3.13 main.py
```
4. Keep the server running while using Claude Desktop

## Available Tools

### 1. get_crypto_price
Get real-time cryptocurrency price information:
```json
{
    "symbol": "BTC",
    "name": "bitcoin",
    "price": 65423.12,
    "change_24h": 2.5,
    "volume_24h": 28345678901,
    "market_cap": 1234567890123,
    "timestamp": "2025-03-15T10:30:00"
}
```

### 2. get_crypto_market_data
Get detailed market information for a cryptocurrency:
```json
{
    "symbol": "ETH",
    "name": "Ethereum",
    "market_cap_rank": 2,
    "current_price": 3521.48,
    "market_cap": 423456789012,
    "total_volume": 15834567890,
    "high_24h": 3580.25,
    "low_24h": 3475.62,
    "price_change_24h": 45.86,
    "price_change_percentage_24h": 1.32,
    "circulating_supply": 120283456,
    "total_supply": 120283456,
    "max_supply": null,
    "ath": 4878.26,
    "ath_date": "2021-11-10T14:24:11.849Z",
    "atl": 0.432979,
    "atl_date": "2015-10-20T00:00:00.000Z"
}
```

### 3. get_crypto_historical_data
Get historical price data for a cryptocurrency:
```json
{
    "symbol": "BTC",
    "name": "bitcoin",
    "days": 30,
    "prices": [
        {
            "date": "2025-02-15T00:00:00",
            "price": 62150.23
        },
        {
            "date": "2025-02-16T00:00:00",
            "price": 63421.15
        }
        // ... more data points
    ]
}
```

### 4. search_crypto
Search for cryptocurrencies:
```json
{
    "results": [
        {
            "id": "bitcoin",
            "symbol": "BTC",
            "name": "Bitcoin"
        },
        {
            "id": "bitcoin-cash",
            "symbol": "BCH",
            "name": "Bitcoin Cash"
        }
        // ... more results
    ]
}
```

### 5. get_trending_crypto
Get trending cryptocurrencies:
```json
{
    "trending_coins": [
        {
            "id": "pendle",
            "name": "Pendle",
            "symbol": "PENDLE",
            "market_cap_rank": 85,
            "price_btc": 0.00002356
        }
        // ... more trending coins
    ]
}
```

### 6. get_global_crypto_data
Get global cryptocurrency market data:
```json
{
    "active_cryptocurrencies": 12875,
    "markets": 892,
    "total_market_cap_usd": 2347890123456,
    "total_volume_usd": 89723456789,
    "market_cap_percentage": {
        "BTC": 52.4,
        "ETH": 18.2
        // ... more cryptocurrencies
    },
    "updated_at": "2025-03-15T10:30:00"
}
```

## Sample Queries

You can ask Claude Desktop questions like:
- "What's the current price of Bitcoin?"
- "Show me detailed market data for Ethereum"
- "What's the price history of Dogecoin for the last 30 days?"
- "Search for cryptocurrencies related to 'sol'"
- "Which cryptocurrencies are trending today?"
- "What's the total cryptocurrency market capitalization right now?"

## Error Handling

All tools include proper error handling and will return an error message if something goes wrong:
```json
{
    "error": "Failed to fetch price for INVALID_SYMBOL"
}
```

## Troubleshooting

If the MCP server is not working in Claude Desktop:
1. Make sure the server is running - you should see output when you start the script
2. Verify the path in your settings is correct and absolute
3. Make sure Python 3.10+ is in your system PATH
4. Check that all dependencies are installed
5. Try restarting Claude Desktop
6. Check logs for any error messages

## Rate Limits

This tool uses the free CoinGecko API which has rate limits. Please be aware that very frequent requests may be throttled by the API.

## License

MIT License