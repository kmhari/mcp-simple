# Taboola MCP Connector

An MCP (Model Context Protocol) tool that connects Taboola Advertising API with AI assistants like Claude (in Cursor, Claude Desktop, etc.), allowing you to analyze your campaign data through natural language conversations.

![Taboola Logo](https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/b05a5f32-7b68-4d75-9bdf-cccb6a9604ea.png)

## Features

- **Natural Language Querying**: Ask questions about your Taboola campaigns in plain English
- **Campaign Performance Analysis**: Get summaries, trends, and insights about your advertising performance
- **Account Management**: View all your accounts and campaigns in one place
- **Data Visualization**: See performance trends with simple ASCII charts right in your chat interface
- **Comprehensive Insights**: Get actionable recommendations based on your campaign data

## Setup

### Prerequisites

- Python 3.8+ installed
- A Taboola account with API access
- Valid Taboola API credentials (client ID and client secret)

### Installation

1. **Clone or download this repository and install dependencies**

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up your environment variables**
   
   Create a `.env` file in the root directory with your Taboola API credentials:
   ```
   TABOOLA_CLIENT_ID=your_client_id
   TABOOLA_CLIENT_SECRET=your_client_secret
   ```

4. **Test the connector**
   
   Run the script to verify it connects to Taboola correctly:
   ```bash
   python taboola_connector.py
   ```
   
   You should see logs indicating successful authentication and account loading.

## Using with Cursor

1. **Add the connector to Cursor's MCP configuration**
   
   Open or create `.cursor/mcp.json` in your user directory and add the following entry:
   ```json
   {
     "mcpServers": {
       "Taboola_Connector": {
         "command": "FULL/PATH/TO/YOUR/DIRECTORY/taboola_mcp/.venv/Scripts/python",
         "args": [
           "FULL/PATH/TO/YOUR/DIRECTORY/taboola_mcp/taboola_connector.py"
         ]
       }
     }
   }
   ```
   

2. **Restart Cursor**
   
   Close and reopen Cursor to load the updated MCP configuration.

3. **Verify the connection**
   
   In Cursor's chat, ask a simple question like "List my Taboola accounts" to verify the connection works.

## Available Tools

The connector provides the following tools for interacting with Taboola:

| Tool Name | Description | Example Query |
|-----------|-------------|---------------|
| `list_taboola_accounts` | Lists all accessible Taboola accounts | "Show me all my Taboola accounts" |
| `taboola_account_overview` | Provides a comprehensive account overview | "Give me an overview of account wattfoxgmbh-network" |
| `get_taboola_account_currency` | Retrieves the account's currency code | "What currency is my Taboola account using?" |
| `list_taboola_campaigns` | Lists all campaigns in an account | "List all campaigns in my wattfoxgmbh-network account" |
| `get_taboola_campaign_summary` | Gets performance summary for campaigns | "Summarize campaign performance for April" |
| `get_taboola_campaign_details` | Gets detailed info about a specific campaign | "Show me details for campaign 44471496" |
| `analyze_taboola_performance` | Analyzes campaign performance with detailed metrics | "Analyze my campaign performance from April 1 to April 23" |
| `get_taboola_creatives` | Lists all creative assets in an account | "Show me all creatives in my Taboola account" |
| `get_taboola_creative_details` | Gets detailed info about a specific creative | "Show details for creative asset 123456" |
| `analyze_taboola_creative_performance` | Analyzes creative performance with metrics | "Which creatives performed best last month?" |
| `get_taboola_ads` | Lists all ads or ads for a specific campaign | "Show me all ads in campaign 44471496" |
| `download_taboola_creative` | Downloads a creative asset from its URL | "Download the creative at https://example.com/image.jpg" |

## Example Queries

You can ask questions in natural language like:

- "Show me my Taboola campaign performance for the last 30 days."
- "What were my top performing campaigns last month?"
- "List all my active Taboola campaigns."
- "Give me a summary of my account performance with charts."
- "Analyze my campaign data from June 1 to June 30."
- "Which campaigns had the highest CTR last week?"

## Troubleshooting

### Connection Issues

- **"TaboolaConnector is not available"**: Check that your `.env` file exists with correct credentials.
- **Python Command Not Found**: Make sure the Python path in `.cursor/mcp.json` is correctly specified.
- **No tools available**: Ensure the MCP server is running correctly by checking logs in `taboola_mcp.log`.

### Authentication Errors

- **Bad client credentials**: Verify your `TABOOLA_CLIENT_ID` and `TABOOLA_CLIENT_SECRET` are correct.
- **No accounts found**: Check that your API credentials have access to the accounts you're trying to query.

### Path Issues 

- If you see errors about files not found, make sure all paths in your configuration are absolute paths (not relative).

## Technical Details

The connector communicates with the Taboola API to retrieve campaign data, and exposes this data through MCP tools. This allows AI assistants to query and analyze your advertising data.

The connector follows these steps:
1. Authenticate with Taboola API
2. Fetch available accounts
3. Provide tools to query campaign data
4. Process and format the data for easy consumption by AI assistants

## Contributing

If you'd like to contribute to this project, found a bug or an issue, please open an issue or submit a pull request :) 

## License

MIT License 