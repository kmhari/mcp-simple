# Hyperliquid MCP Server

An MCP server implementation that integrates the Hyperliquid SDK.

## Tools

- **get_all_mids**

  - Retrieve mid prices for all coins on Hyperliquid
  - No required inputs

- **get_candle_snapshot**

  - Get historical candlestick data for any token
  - Inputs:
    - `coin` (string): Token symbol
    - `interval` (string): Time interval (e.g., '15m', '1h')
    - `startTime` (number): Start time in milliseconds since epoch
    - `endTime` (number, optional): End time in milliseconds since epoch

- **get_l2_book**
  - Access the L2 order book for any token
  - Inputs:
    - `symbol` (string): Token symbol

### Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

### NPX

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@mektigboy/server-hyperliquid"]
    }
  }
}
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
