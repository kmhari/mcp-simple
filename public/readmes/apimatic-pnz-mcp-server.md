# PaymentsNZ MCP Server

## How to Build

1. Install Node.js version 22 or greater. Check version with `node --version`.
2. Run `cd sdk && npm install && cd ../mcp-server && npm install` to build the SDK and the server.

## How to Run

If you are not familiar with how to setup MCP Servers with Claude Desktop, see [this tutorial](https://modelcontextprotocol.io/quickstart/user) first.

Now add something like this to your Claude Desktop config:

```json
{
  "mcpServers": {
    "PaymentsNZ": {
      "command": "node",
      "args": ["[YOUR-PATH-HERE]/paymentsnz-mcp-server/mcp-server/dist/index.js"],
      "env": {
        "ACCOUNT_AND_TRANSACTION_API_SPECIFICATION_LIB_ACCESS_TOKEN": "[YOUR-ACCESS-TOKEN-HERE]"
      }
    }
  }
}
```

A `claude_desktop_config.json` file is also provided as reference.

Make sure to set the path to the location where your MCP Server is stored as well as the access token you got after authenticating.

## How to Get Access Token

1. Go to https://pnz-app.azurewebsites.net/
2. Go to any endpoint such as https://pnz-app.azurewebsites.net/#/typescript/api-endpoints/statements/get-account-statement
3. Click on `GET AUTH TOKEN` on the top-right of the page and wait for a window to pop-up for consent.
4. Enter `username` and `password` and approve everything
5. The access token should now be visible in the Authentication UI(See screenshot below). You can now copy it into your environment variables in your `claude_desktop_config.json` file.

NOTE: The access token does not last more than an hour. Please make sure that it is used in a timely manner.

![Authentication UI](auth.png)
