# Rug-Check-MCP

An MCP server that detects potential risks in Solana meme tokens, helping AI agents avoid rug pulls and unsafe projects.

![License](https://img.shields.io/github/license/kukapay/rug-check-mcp)
![Python Version](https://img.shields.io/badge/python-3.10%2B-blue)
[![smithery badge](https://smithery.ai/badge/@kukapay/rug-check-mcp)](https://smithery.ai/server/@kukapay/rug-check-mcp)

## Features

- **Token Analysis Tool**: The `analysis_token` tool retrieves and processes Solana token data from the Solsniffer API.
- **Structured Output**: Returns detailed token information including name, symbol, Snif score, market cap, price, supply, risks, and audit status.

## Prerequisites

- Python 3.10 or higher
- A Solsniffer API key (sign up at [Solsniffer](https://solsniffer.com) to obtain one)

## Installation

### Installing via Smithery

To install Rug Check for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@kukapay/rug-check-mcp):

```bash
npx -y @smithery/cli install @kukapay/rug-check-mcp --client claude
```

### Manual Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kukapay/rug-check-mcp.git
   cd rug-check-mcp
   ```

2. **Install Dependencies**:
   Ensure you have `pip` installed, then run:
   ```bash
   pip install mcp[cli] requests python-dotenv
   ```

3. **Client Configuration**:

    ```
    "mcpServers": { 
      "rug-check-mcp": { 
        "command": "python", 
        "args": ["path/to/rug-check-mcp/main.py"], 
        "env": { 
          "SOLSNIFFER_API_KEY": "your_solsniffer_api_key_here" 
        } 
      } 
    }
    ```

## Tool: `analysis_token`

- **Description**: Analyzes a Solana token based on its address.
- **Input**: `token_address` (string) - The Solana token address to analyze.
- **Output**: A dictionary containing:
  - `token_address`: Token address
  - `token_name`: Token name
  - `token_symbol`: Token symbol
  - `snif_score`: Solsniffer risk score (0-100)
  - `market_cap`: Market capitalization in USD
  - `price`: Token price in USD
  - `supply_amount`: Total supply of the token
  - `risks`: High, moderate, and low risk details with counts and descriptions
  - `audit_risk`: Audit status (mint/freeze disabled, LP burned, top 10 holders)

  
### Example Output
For token address `9VxExA1iRPbuLLdSJ2rB3nyBxsyLReT4aqzZBMaBaY1p`:
```json
{
  'token_address': '9VxExA1iRPbuLLdSJ2rB3nyBxsyLReT4aqzZBMaBaY1p',
  'token_name': 'REVSHARE',
  'token_symbol': 'REVS',
  'snif_score': 55,
  'market_cap': 271893.9423965262,
  'price': 0.000280011574,
  'supply_amount': 971009656.8955618,
  'risks': {
    'high': {
      'count': 3,
      'details': {
        'Mintable risks found': True,
        'Freeze risks found': True,
        'A private wallet owns a significant share of the supply': False,
        'Tokens auto-freeze risks found': True,
        'Significant ownership by top 10 wallets': False,
        'Significant ownership by top 20 wallets': False,
        'Permanent control risks found': True,
        'Presence of token metadata': True,
        'High locked supply risks found': None,
        'Sufficient liquidity detected': None,
        'Very low liquidity': None
      }
    },
    'moderate': {
      'count': 3,
      'details': {
        'Token metadata are immutable': False,
        'Token operates without custom fees': False,
        'Token has recent user activity': True,
        'Unknown liquidity pools': False,
        'Low count of LP providers': True
      }
    },
    'low': {
      'count': 1,
      'details': {
        'Contract was not recently deployed': False
      }
    }
  },
  'audit_risk': {
    'mint_disabled': True,
    'freeze_disabled': True,
    'lp_burned': False,
    'top_10_holders_significant': False
  }
}
```

### Prompt Examples

Below are examples of prompts you might use in an MCP-compatible client (e.g., Claude Desktop) and the expected responses after the `analysis_token` tool is invoked.

**Prompt**: 

> "Can you analyze the Solana token at address `9VxExA1iRPbuLLdSJ2rB3nyBxsyLReT4aqzZBMaBaY1p`?"
   
**Response**:
```plaintext
I've analyzed the token at address 9VxExA1iRPbuLLdSJ2rB3nyBxsyLReT4aqzZBMaBaY1p. Here's the summary:

- Token Name: REVSHARE (Symbol: REVS)
- Snif Score: 55/100 (Moderate risk)
- Market Cap: $288,875.29
- Price: $0.000297
- Total Supply: 971,266,696.90 tokens
- Risks:
  - High (3 risks):
    - Mintable risks found: True
    - Freeze risks found: True
    - Permanent control risks found: True
    - (Other factors: False)
  - Moderate (1 risk):
    - Low count of LP providers: True
    - (Other factors: False)
  - Low (0 risks):
    - (All factors: False)
- Audit Status:
  - Mint Disabled: Yes
  - Freeze Disabled: Yes
  - LP Burned: No
  - Top 10 Holders Significant: No

This token has moderate risks due to potential control issues and liquidity concerns, but minting and freezing are disabled for added safety.     
```

**Prompt**: 

> "What’s the risk profile of the token `So11111111111111111111111111111111111111112`?"

**Response**:
```plaintext
Here's the risk profile for the token at address So11111111111111111111111111111111111111112:

- Token Name: Wrapped SOL (Symbol: SOL)
- Snif Score: 92/100 (Low risk)
- Market Cap: $82,345,678.90
- Price: $176.54
- Total Supply: 466,567,890.12 tokens
- Risks:
  - High (0 risks):
    - (All factors: False)
  - Moderate (0 risks):
    - (All factors: False)
  - Low (1 risk):
    - Minor liquidity concentration: True
    - (Other factors: False)
- Audit Status:
  - Mint Disabled: Yes
  - Freeze Disabled: Yes
  - LP Burned: Yes
  - Top 10 Holders Significant: No

Wrapped SOL is a low-risk token with strong audit protections and only a minor liquidity concern, typical for a well-established asset.     
```

**Prompt**: 
> "Tell me about the token `4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R`."

**Response**:
```plaintext
Here's the analysis for the token at address 4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R:

- Token Name: Raydium (Symbol: RAY)
- Snif Score: 85/100 (Low risk)
- Market Cap: $1,234,567.89
- Price: $4.72
- Total Supply: 261,567,890.12 tokens
- Risks:
  - High (0 risks):
    - (All factors: False)
  - Moderate (1 risk):
    - Moderate holder concentration: True
    - (Other factors: False)
  - Low (0 risks):
    - (All factors: False)
- Audit Status:
  - Mint Disabled: Yes
  - Freeze Disabled: Yes
  - LP Burned: Yes
  - Top 10 Holders Significant: No

Raydium is a low-risk token with solid audit protections. The moderate holder concentration indicates some centralization, but it’s not a major issue.     
```


## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
