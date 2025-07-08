# XTBApiServer

This is an MCP server that exposes the XTB API using the `@sharplygroup/xtb-api-js` library. It allows you to interact with your XTB trading account through the Model Context Protocol.

## Prerequisites

*   Node.js (version 16 or higher)
*   npm
*   An XTB trading account

## Installation

1.  Clone this repository:
   git clone [repository_url]
2.  Navigate to the project directory:
   cd xtb-mcp-server
3.  Install dependencies:
   npm install

## Configuration

1.  Create a `.env` file in the project directory and add your XTB API credentials:

   ```
   DEMO_ACCOUNT=true
   USER_ID=your_user_id
   PASSWORD=your_password
   ```

   **Note:** Replace `your_user_id` and `your_password` with your actual XTB API credentials. Set `DEMO_ACCOUNT` to `false` if you are using a live account.

## Running the Server

1.  Build the TypeScript code:
   npm run build
2.  Run the server:
   node build/index.js

## Connecting with an MCP Client

You can connect to this server using any MCP client, such as the MCP Inspector.

1.  Install the MCP Inspector globally:
   npm install -g @modelcontextprotocol/inspector
2.  Run the MCP Inspector with your server:
   npx @modelcontextprotocol/inspector node build/index.js
3.  In the MCP Inspector UI, select "stdio" as the transport type and click "Connect".

## Available Tools

The following tools are exposed by this MCP server:

### Account Operations

*   **getCurrentUserData**: Returns information about account currency and account leverage.
*   **getMarginLevel**: Returns various account indicators.

### Calculation Operations

*   **getCommissionDef**: Returns calculation of commission and rate of exchange.
    *   Parameters: `symbol` (string), `volume` (number)
*   **getMarginTrade**: Returns expected margin for given instrument and volume.
    *   Parameters: `symbol` (string), `volume` (number)
*   **getProfitCalculation**: Calculates estimated profit for given deal data.
    *   Parameters: `closePrice` (number), `cmd` (number), `openPrice` (number), `symbol` (string), `volume` (number)

### Market Data Operations

*   **getCalendar**: Returns calendar with market events.
*   **getChartLastRequest**: Returns chart info, from start date to the current time.
    *   Parameters: `info` (any)
*   **getChartRangeRequest**: Returns chart info with data between given start and end dates.
    *   Parameters: `info` (any)
*   **getTickPrices**: Returns array of current quotations for given symbols, only quotations that changed from given timestamp are returned.
    *   Parameters: `level` (number), `symbols` (string[]), `timestamp` (number)
*   **getTradingHours**: Returns quotes and trading times.
    *   Parameters: `symbols` (string[])

### News Operations

*   **getNews**: Returns news from trading server which were sent within specified period of time.
    *   Parameters: `end` (number), `start` (number)

### Server Operations

*   **getServerTime**: Returns current time on trading server.
*   **getVersion**: Returns the current API version.
*   **ping**: Regularly calling this function is enough to refresh the internal state of all the components in the system.

### Symbol Operations

*   **getAllSymbols**: Returns an array of all symbols available for the user.
*   **getSymbol**: Returns information about the symbol available for the user.
    *   Parameters: `symbol` (string)

### Trade Operations

*   **getTrades**: Returns an array of user's trades.
    *   Parameters: `openedOnly` (boolean)
*   **getTradeRecords**: Returns an array of trades listed in the `orders` argument.
    *   Parameters: `orders` (number[])
*   **getTradesHistory**: Returns an array of user's trades which were closed within specified period of time.
    *   Parameters: `end` (number), `start` (number)
*   **getTradeStatus**: Returns current transaction status.
    *   Parameters: `order` (number)

### Trading Operations

*   **tradeTransaction**: Starts a trade transaction.
    *   Parameters: `tradeTransInfo` (any)
*   **tradeTransactionStatus**: Returns current transaction status.
    *   Parameters: `order` (number)

### Command Execution

*   **executeCommand**: Executes a command on the server.
    *   Parameters: `command` (string)

## Prompts

The following prompts are available:

*   **getAccountDataPrompt**: Get the current account data.
*   **getSymbolInfoPrompt**: Get information about a specific symbol.
    *   Parameters: `symbol` (string)

## Disclaimer

This MCP server is provided as an example and should be used at your own risk. Please ensure that you understand the XTB API and the potential risks involved before using this server with a live trading account.