# My Crypto MCP

This Model Context Protocol (MCP) server provides cryptocurrency information through Claude Desktop. It connects to the CoinMarketCap API to fetch real-time cryptocurrency data.

## Features

- Get current cryptocurrency information by symbol
- View a sample cryptocurrency portfolio

## Prerequisites

- [Claude Desktop](https://claude.ai/desktop)
- [Node.js](https://nodejs.org/) (v16 or later)
- CoinMarketCap API key (get one at [coinmarketcap.com/api](https://coinmarketcap.com/api/))

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Project

```bash
npm run build
```

### 3. Configure Claude Desktop

Add the MCP server to Claude Desktop by editing the Claude configuration file:

1. Open Claude Desktop settings
2. Add the following configuration:

```json
{
  "mcpServers": {
    "crypto": {
      "command": "node",
      "args": ["/absolute/path/to/your/project/build/index.js"],
      "env": {
        "CMC_API_KEY": "your-coinmarketcap-api-key"
      }
    }
  }
}
```

> **Important:** Replace `/absolute/path/to/your/project` with the actual path to your project directory and `your-coinmarketcap-api-key` with your actual CoinMarketCap API key.

### 4. Restart Claude Desktop

After adding the configuration, restart Claude Desktop to load the MCP server.

## Using the Crypto MCP

Once configured, you can use the following commands in your chat with Claude:

### Get Portfolio Information

#### 1. Add Portfolio Resource

Attach **portfolio** resource from the MCP using the attachment button in Claude Desktop.

#### 2. Ask your own questions

You can now ask questions like:

```
What is my portfolio's current value?
```

Claude will fetch the latest information from the CoinMarketCap API and provide detailed information about your portfolio.

##### Example Response

Here's a sample of what Claude might return:

```
Based on your portfolio and current market prices, here's the value of your cryptocurrency holdings as of April 27, 2025:

ZK (ZKsync): 69,696 ZK × $0.06051 = $4,217.48
Bitcoin (BTC): 9,696 BTC × $94,361.18 = $914,904,201.28
Ethereum (ETH): 23,456 ETH × $1,803.33 = $42,288,825.48

Total portfolio value: $957,197,244.24
Your portfolio is primarily dominated by your Bitcoin holdings, which represent over 95% of your total portfolio value. Would you like any additional information about market trends or recommendations for your portfolio?
```

## Development

- Source code is in the src directory
- The main MCP server is defined in index.ts
- API interactions are handled in helper.ts

## Troubleshooting

If you encounter issues:

1. Check that your CoinMarketCap API key is valid
2. Verify the path to the build file in Claude Desktop configuration
3. Check console output for any error messages
