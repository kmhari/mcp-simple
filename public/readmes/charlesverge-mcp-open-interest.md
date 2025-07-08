# Open Interest Analysis MCP Server

This is an MCP (Message Control Protocol) server that retrieves options open interest data from Alpha Vantage and calculates the put/call ratio to determine market sentiment for a given stock symbol.

You can use the prompts.
`Calculate the max pain for symbol NVDA`

`Calculate put call ratio for symbol NVDA`

## Screenshots

![Max Pain Example](max-pain.png)

![Put Call Ratio Example](market-sentiment.png)

## Claude Desktop Setup

1. Install the required dependencies:

```bash
pip install -r requirements.txt
```

2. Set up your Alpha Vantage API key:

   - Get an API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
   - Create a `.env` file in the root directory

3. Add to your Claude Desktop config file (`claude_desktop_config.json`):
   Add the following configuration to your `claude_desktop_config.json` file under the root JSON object:

```{
  "mcpServers": {
    "openinterest_stdio": {
      "command": "/dir/to/python",
      "args": ["/dir/mcp_open_interest/main.py"],
      "env": {
        "ALPHAVANTAGE_KEY": "your_api_key_here"
      }
    },
  }
}
```

## Sentiment Interpretation

- **Bullish**: Put/Call ratio < 1.0
- **Bearish**: Put/Call ratio > 1.0
