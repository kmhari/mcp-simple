# Monarch Money MCP Server

A Model Context Protocol (MCP) server that provides read-only access to Monarch Money financial data. This allows AI assistants like Claude Desktop to analyze your financial information, transactions, budgets, and cashflow data.

Note: I've created this for personal fun and is not affiated with Monarch Money. I mostly created it for learning about my spending, using it for projections. Since I don't have any need to mutate any data it's currently READONLY.

Shout out to 

## Features

- **Read-only access** to Monarch Money accounts
- **Transaction analysis** with date filtering and search
- **Budget tracking** and cashflow analysis
- **Account details** including investment holdings
- **Secure authentication** with MFA support
- **Session persistence** to minimize re-authentication

## Installation

### Prerequisites

- Python 3.13+
- [uv](https://docs.astral.sh/uv/) package manager (recommended)
- A Monarch Money account

### Setup

1. **Clone the repository:**

2. **Install dependencies:**
   ```bash
   uv add mcp monarchmoney python-dotenv
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your Monarch Money credentials:
   ```
   MONARCH_EMAIL=your-email@example.com
   MONARCH_PASSWORD=your-monarch-password
   MONARCH_MFA_SECRET=your-mfa-secret-key  # Optional but recommended
   ```

4. **Test the connection:**
   ```bash
   python test_api.py
   ```

## Usage

### Running the Server

Start the MCP server:
```bash
python run_server.py
```

### Claude Desktop Integration

Add to your Claude Desktop configuration (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "monarch-money": {
      "command": "python",
      "args": ["/path/to/monarch-mcp-server/run_server.py"],
      "env": {
        "MONARCH_EMAIL": "your-email@example.com",
        "MONARCH_PASSWORD": "your-password",
        "MONARCH_MFA_SECRET": "your-mfa-secret"
      }
    }
  }
}
```

## Available Resources

- `monarch://accounts` - All linked accounts
- `monarch://transactions/recent` - Last 100 transactions  
- `monarch://budgets` - Budget information with actual vs target
- `monarch://cashflow/summary` - Income, expenses, and savings summary

## Available Tools

- **get_transactions** - Get transactions with date range filtering
- **get_account_details** - Detailed account information including holdings
- **get_cashflow_analysis** - Cashflow analysis by category and time period
- **search_transactions** - Search transactions by description or merchant
- **get_categories** - All transaction categories
- **get_institutions** - Linked financial institutions

## Example Prompts

Once configured with Claude Desktop, you can ask:

- "Show me my recent transactions from last month"
- "What's my current budget status?"
- "Analyze my spending patterns by category"
- "How much did I spend on groceries this year?"
- "What are my investment account balances?"

## Security

- **No write operations** - Server is read-only for safety
- **Local credentials** - Your login details stay on your machine
- **Session caching** - Reduces authentication frequency
- **MFA support** - Two-factor authentication recommended

## Troubleshooting

### Authentication Issues

1. **Run the debug script:**
   ```bash
   python debug_server.py
   ```

2. **Check environment variables:**
   ```bash
   python -c "import os; print('Email:', bool(os.getenv('MONARCH_EMAIL'))); print('Password:', bool(os.getenv('MONARCH_PASSWORD')))"
   ```

3. **Clear session cache:**
   ```bash
   rm -rf .mm/
   ```

### Common Issues

- **MFA required**: Set `MONARCH_MFA_SECRET` environment variable
- **Session expired**: Delete `.mm/` directory to force fresh login
- **Import errors**: Ensure all dependencies installed with `uv add`

## Development

### Project Structure

```
monarch-mcp-server/
├── monarch_mcp_server.py     # Main MCP server implementation
├── run_server.py             # Server launcher script
├── debug_server.py           # Authentication debugging
├── test_api.py              # API connection testing
├── tests/                   # Unit tests
│   ├── __init__.py
│   └── test_monarch_mcp_server.py
├── pyproject.toml           # Project dependencies
├── .github/workflows/       # CI/CD workflows
└── .env.example             # Environment template
```

### Testing

Install test dependencies:
```bash
uv sync --extra test
```

Run the unit test suite:
```bash
uv run pytest tests/ -v
```

Run tests with coverage:
```bash
uv run pytest tests/ --cov=monarch_mcp_server --cov-report=term
```

Run manual API test:
```bash
python test_api.py
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Disclaimer

This project is not affiliated with Monarch Money. Use at your own risk and ensure compliance with Monarch Money's terms of service.
