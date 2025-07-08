# Xero MCP Server

![](https://badge.mcpx.dev?type=server "MCP Server")
[![smithery badge](https://smithery.ai/badge/@john-zhang-dev/xero-mcp)](https://smithery.ai/server/@john-zhang-dev/xero-mcp)

This MCP server allows Clients to interact with [Xero Accounting Software](https://www.xero.com).

## Get Started

1. Make sure [node](https://nodejs.org) and [Claude Desktop](https://claude.ai/download) are installed.

2. Create an OAuth 2.0 app in Xero to get a _CLIENT_ID_ and _CLIENT_SECRET_.

   - Create a free Xero user account (if you don't have one)
   - Login to Xero Developer center https://developer.xero.com/app/manage/
   - Click New app
   - Enter a name for your app
   - Select Web app
   - Provide a valid URL (can be anything valid eg. https://www.myapp.com)
   - Enter redirect URI: `http://localhost:5000/callback`
   - Tick to Accept the Terms & Conditions and click Create app
   - On the left-hand side of the screen select Configuration
   - Click Generate a secret

3. Modify `claude_desktop_config.json` file

   ```json
   {
     "mcpServers": {
       "xero-mcp": {
         "command": "npx",
         "args": ["-y", "xero-mcp@latest"],
         "env": {
           "XERO_CLIENT_ID": "YOUR_CLIENT_ID",
           "XERO_CLIENT_SECRET": "YOUR_CLIENT_SECRET",
           "XERO_REDIRECT_URI": "http://localhost:5000/callback"
         }
       }
     }
   }
   ```

4. Restart Claude Desktop

5. When the Client decides to access a Xero tool for the first time, a Xero login page will pop up to ask your consent. Complete the auth flow and manually close the web page (as the Xero page will not auto close in this version)

   **Privacy alert: after completing the Xero OAuth2 flow, your Xero data may go through the LLM that you use. If you are doing testing you should authorize to your [Xero Demo Company](https://central.xero.com/s/article/Use-the-demo-company).**

## Tools

- `authenticate`

  Authenticate with Xero using OAuth2

- `create_bank_transactions`

  Creates one or more spent or received money transaction

- `create_contacts`

  Creates one or multiple contacts in a Xero organisation

- `get_balance_sheet`

  Retrieves report for balancesheet

- `list_accounts`

  Retrieves the full chart of accounts

- `list_bank_transactions`

  Retrieves any spent or received money transactions

- `list_contacts`

  Retrieves all contacts in a Xero organisation

- `list_invoices`

  Retrieves sales invoices or purchase bills

- `list_journals`

  Retrieves journals

- `list_organisations`

  Retrieves Xero organisation details

- `list_payments`

  Retrieves payments for invoices and credit notes

- `list_quotes`

  Retrieves sales quotes

## Examples

- "Visualize my financial position over the last month"

    <img src="https://github.com/john-zhang-dev/assets/blob/main/xero-mcp/demo1.jpg?raw=true" width=50% height=50%>

- "Track my spendings over last week"

    <img src="https://github.com/john-zhang-dev/assets/blob/main/xero-mcp/demo2.jpg?raw=true" width=50% height=50%>

- "Add all transactions from the monthly statement into my revenue account (account code 201) as receive money"

## License

MIT
