# Jupiter MCP Server

A Python MCP (Model Context Protocol) server for the [Jupiter API](https://dev.jup.ag/docs/) Solana's premier DEX aggregator

Currently supports
- [Ultra API](https://dev.jup.ag/docs/ultra-api)
- [Trigger API](https://dev.jup.ag/docs/trigger-api/)

## 🚀 Features

- **Jupiter Ultra API Integration**: Execute immediate swaps on Solana
- **Jupiter Trigger API Integration**: Create and manage limit orders
- **Secure Wallet Management**: Uses your Solana private key for transactions
- **Built-in Referral System**: Automatically includes referral fees for development support
- **Comprehensive Testing**: Safe testing with mock and real trade execution
- **Type-Safe**: Full type annotations for Python

## 📋 Prerequisites

You need:
- [uv](https://docs.astral.sh/uv/getting-started/installation/) → Python dependency manager
- [npx](https://docs.npmjs.com/cli/v10/commands/npx) (comes with Node.js) → Used to run envmcp for secure .env file loading

Once uv is installed, restart your shell before proceeding.

## 🚀 1-Click Install for Cursor

### Option 1: Using .env File (Recommended - More Secure)

**🚀 [Install with .env File →](cursor://anysphere.cursor-deeplink/mcp/install?name=jupiter-mcp-env&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyJlbnZtY3AiLCItLWVudi1maWxlIiwifi8uZW52IiwidXZ4IiwiLS1mcm9tIiwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS9hcmFhNDcvanVwaXRlci1tY3AiLCJqdXBpdGVyLW1jcCJdfQ==)**

**Note:** This link only works in the Cursor app. If viewing on web, copy the link below:

```
cursor://anysphere.cursor-deeplink/mcp/install?name=jupiter-mcp-env&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyJlbnZtY3AiLCItLWVudi1maWxlIiwifi8uZW52IiwidXZ4IiwiLS1mcm9tIiwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS9hcmFhNDcvanVwaXRlci1tY3AiLCJqdXBpdGVyLW1jcCJdfQ==
```

After installation, you'll need to update the env file path:

1. **Create your `.env` file** at your preferred location (e.g., `~/.env`):
```bash
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
PRIVATE_KEY=your_base58_encoded_private_key_here
SOLANA_NETWORK=mainnet-beta
REQUEST_TIMEOUT=30
```

2. **Update the path in Cursor**:
   - Go to **Tools & Integrations** section in Cursor
   - Click on **MCP Tools**
   - Find **jupiter-mcp-env**
   - Hover near the on/off switch and click the **pencil icon** ✏️
   - Replace `~/.env` with your actual env file path (e.g., `/Users/yourname/.env`)
   - Click **Save**

### Option 2: With Cursor Input Prompts (Less Secure)

If you prefer to configure directly through Cursor prompts:

**🚀 [Install with Direct Input →](cursor://anysphere.cursor-deeplink/mcp/install?name=jupiter-mcp&config=eyJjb21tYW5kIjoidXZ4IiwiYXJncyI6WyItLWZyb20iLCJnaXQraHR0cHM6Ly9naXRodWIuY29tL2FyYWE0Ny9qdXBpdGVyLW1jcCIsImp1cGl0ZXItbWNwIl0sImVudiI6eyJQUklWQVRFX0tFWSI6IlJFUExBQ0VfVEhJUyIsIlNPTEFOQV9SUENfVVJMIjoiaHR0cHM6Ly9hcGkubWFpbm5ldC1iZXRhLnNvbGFuYS5jb20iLCJTT0xBTkFfTkVUV09SSyI6Im1haW5uZXQtYmV0YSIsIlJFUVVFU1RfVElNRU9VVCI6IjMwIn19)**

**Note:** This link only works in the Cursor app. If viewing on web, copy the link below:

```
cursor://anysphere.cursor-deeplink/mcp/install?name=jupiter-mcp&config=eyJjb21tYW5kIjoidXZ4IiwiYXJncyI6WyItLWZyb20iLCJnaXQraHR0cHM6Ly9naXRodWIuY29tL2FyYWE0Ny9qdXBpdGVyLW1jcCIsImp1cGl0ZXItbWNwIl0sImVudiI6eyJQUklWQVRFX0tFWSI6IlJFUExBQ0VfVEhJUyIsIlNPTEFOQV9SUENfVVJMIjoiaHR0cHM6Ly9hcGkubWFpbm5ldC1iZXRhLnNvbGFuYS5jb20iLCJTT0xBTkFfTkVUV09SSyI6Im1haW5uZXQtYmV0YSIsIlJFUVVFU1RfVElNRU9VVCI6IjMwIn19
```

You'll be prompted to replace `REPLACE_THIS` with your actual private key.

**Pre-configured values:**
- `SOLANA_RPC_URL`: https://api.mainnet-beta.solana.com
- `SOLANA_NETWORK`: mainnet-beta
- `REQUEST_TIMEOUT`: 30 seconds
- `PRIVATE_KEY`: You'll need to replace `REPLACE_THIS` with your base58 encoded private key

## ⚡ Quick Start (MCP Configuration)

Add this to your MCP client configuration:

```json
{
  "mcpServers": {
    "jupiter-mcp": {
      "command": "uvx",
      "args": [
        "--from",
        "git+https://github.com/araa47/jupiter-mcp",
        "jupiter-mcp"
      ],
      "env": {
        "SOLANA_RPC_URL": "https://api.mainnet-beta.solana.com",
        "PRIVATE_KEY": "${PRIVATE_KEY}",
        "SOLANA_NETWORK": "mainnet-beta",
        "REQUEST_TIMEOUT": "30"
      }
    }
  }
}
```

### Alternative Configuration (Using .env file)

If you prefer to load environment variables from a `.env` file to avoid storing sensitive data in your MCP configuration:

```json
{
  "mcpServers": {
    "jupiter-mcp": {
      "command": "npx",
      "args": [
        "envmcp",
        "--env-file",
        "${ENV_FILE_PATH}",
        "uvx",
        "--from",
        "git+https://github.com/araa47/jupiter-mcp",
        "jupiter-mcp"
      ],
      "env": {
        "ENV_FILE_PATH": ".env"
      }
    }
  }
}
```

This approach uses `envmcp` to securely load your PRIVATE_KEY from a `.env` file without exposing it in configuration files. Replace `ENV_FILE_PATH` with the absolute path to your `.env` file (e.g., `/Users/yourname/.env` or `/home/user/.env`).

### Environment Variables Required:
- `PRIVATE_KEY`: Your base58 encoded Solana private key (from Phantom wallet export)
- Optional: Override `SOLANA_RPC_URL` if you have a custom RPC endpoint

## 🎉 Available Tools

### 💱 Ultra API (Immediate Swaps)

| Tool | Description | Parameters | Cost |
|------|-------------|------------|------|
| `get_swap_quote` | Get a swap quote and unsigned transaction | `input_mint`, `output_mint`, `amount` | **FREE** |
| `execute_swap_transaction` | Execute a signed swap transaction | `transaction`, `request_id` | **PAID** |
| `get_balances` | Get token balances for a wallet | `wallet_address?` | **FREE** |
| `get_shield` | Get token security information | `mints` | **FREE** |
| `search_token` | Search for tokens | `query` | **FREE** |

### 📊 Trigger API (Limit Orders)

| Tool | Description | Parameters | Cost |
|------|-------------|------------|------|
| `create_limit_order` | Create a limit order transaction | `input_mint`, `output_mint`, `making_amount`, `taking_amount`, `slippage_bps?`, `expired_at?` | **FREE** |
| `execute_limit_order` | Execute a limit order transaction | `transaction`, `request_id` | **PAID** |
| `cancel_limit_order` | Cancel a single limit order | `order` | **FREE** |
| `cancel_limit_orders` | Cancel multiple limit orders | `orders?` | **FREE** |
| `get_limit_orders` | Get active/historical limit orders | `order_status`, `wallet_address?`, `input_mint?`, `output_mint?`, `page?` | **FREE** |

### Key Differences: Swaps vs Limit Orders

- **Swaps** (Ultra API): Execute immediately at current market price
- **Limit Orders** (Trigger API): Execute automatically when your target price is reached

## 🔧 Alternative Installation (Development)

For local development or testing:

### Prerequisites
- Python 3.12+
- [uv](https://github.com/astral-sh/uv) for dependency management
- [direnv](https://direnv.net/)

### Setup
```bash
git clone https://github.com/araa47/jupiter-mcp
cd jupiter-mcp
direnv allow
cp .env.example .env
# Edit .env with your configuration
```

### Environment Variables (.env file)
```bash
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
PRIVATE_KEY=your_base58_encoded_private_key_here
SOLANA_NETWORK=mainnet-beta
REQUEST_TIMEOUT=30
```

### Local Development Usage
```bash
# Start the server locally
uv run python run_server.py
```

## 🧪 Testing

The project includes comprehensive testing with safety features:

### Test Types

**🆓 Free Tests** (Default - No SOL spent):
- Mock execution tests
- API quote/balance checks
- Token searches and security checks
- Error handling validation

**💰 Paid Tests** (Requires `--run-paid-tests` flag):
- Real trade execution on mainnet
- Swap tests: Uses tiny amounts (0.0001 SOL ≈ $0.015)
- Limit order tests: Creates orders 20% above market price
  - Uses 0.04 SOL (≈ $6) to meet minimum requirements
  - Orders won't execute at the high price
  - Automatically cancelled after verification
- Full transaction signing and broadcasting

### Running Tests

```bash
# Safe tests only (default)
uv run pytest tests/ -v

# Include real trade execution (spends tiny amounts)
uv run pytest tests/ -v --run-paid-tests

# Test with detailed output
uv run pytest tests/ -v --run-paid-tests -s
```

### Test Safety Features
- **Paid tests clearly marked** with `@pytest.mark.paid`
- **Minimal trade amounts** for real execution
- **Limit orders use out-of-range prices** that won't execute
- **Clear warnings** before spending real money
- **Transaction confirmations** with blockchain signatures

## 💡 Important Notes

### Free vs Paid Operations
- **🆓 FREE**: `get_swap_quote`, `get_balances`, `get_shield`, `search_token`, `create_limit_order`, `cancel_limit_order`, `cancel_limit_orders`, `get_limit_orders` - API calls only
- **💰 PAID**: `execute_swap_transaction`, `execute_limit_order` - Executes real trades and spends SOL

### Automatic Referral System
- All orders include a 255 basis point (2.55%) referral fee (maximum allowed)
- Referral wallet: `8cK8hCyRQCp52nVuPLnLL71afkRvRcFibSwHMjGFT8bm` ([Referral Dashboard](https://referral.jup.ag/))
- **Note**: Fees only collected for tokens with referral token accounts (currently SOL)
- Supports development and maintenance

### Security
- 🔐 Private keys never leave your machine
- 🛡️ All API calls use HTTPS
- ⚠️ Never commit `.env` files to version control

## 🐛 Troubleshooting

### Common Issues

1. **"PRIVATE_KEY environment variable is required"**
   - Copy `env.example` to `.env` and set your private key

2. **"Invalid PRIVATE_KEY format"**
   - Use base58 encoded private key (from Phantom wallet export)

3. **Connection timeouts**
   - Try different RPC URL or increase `REQUEST_TIMEOUT`

## 🎉 Ready to Trade!

Your Jupiter MCP server is ready for Solana DeFi interactions! 🚀
