# Crypto Projects MCP Server

An MCP server that provides cryptocurrency project data from [Mobula.io](https://mobula.io/) to AI agents.

<a href="https://glama.ai/mcp/servers/@kukapay/crypto-projects-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@kukapay/crypto-projects-mcp/badge" alt="crypto-projects-mcp MCP server" />
</a>

![License](https://img.shields.io/badge/license-MIT-green)
![Python](https://img.shields.io/badge/python-3.10%2B-blue)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg)


## Features

- **Fetch Project Data**: Retrieve comprehensive project details (e.g., market data, tokenomics, and links) from Mobula.
- **Structured Output**: Format project data into a well-organized Markdown document with sections for overview, market data, investors, exchanges, token distribution, and release schedules.
- **Language Support**: Customize output language based on system locale or user-specified settings.

## Installation

### Prerequisites

- Python 3.10 or higher
- [uv](https://docs.astral.sh/uv/) for package management and running the project
- Mobula API access (no authentication required for public endpoints)

### Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kukapay/crypto-projects-mcp.git
   cd crypto-projects-mcp
   ```

2. **Install Dependencies**:
   ```bash
   uv sync
   ```

## Usage

### Running in Development Mode

Test the server using the MCP Inspector:
```bash
uv run mcp dev main.py
```

### Integrating with Claude Desktop

Install the server in Claude Desktop for LLM interaction:
```bash
uv run mcp install main.py --name "Crypto Projects"
```

### Example Interaction

The server provides two primary interfaces: a **tool** to fetch raw data and a **prompt** to format it into a structured Markdown document. 

#### 1. Using the `get_project_data` Tool

The `get_project_data` tool retrieves raw JSON data for a specified cryptocurrency project. This is useful for applications needing unprocessed data.

```python
await get_project_data("avalanche")
```

This returns a dictionary containing details like price, market cap, blockchain, and social links for Avalanche. Example output:
```json
{
  "name": "Avalanche",
  "symbol": "AVAX",
  "blockchains":  ["Avalanche C-Chain"],
  "price": 35.12,
  "market_cap": 1234567890,
  ...
}
```

#### 2. Using the `format_project_data` Prompt

The `format_project_data` prompt fetches data using the `get_project_data` tool and formats it into a comprehensive Markdown document. This prompt is designed for LLM applications to present structured, human-readable information about a cryptocurrency project.

```python
# format_project_data("avalanche")                 # use system locale
format_project_data("avalanche", lang="en_US")     # use en_US
```

This generates a Markdown document with detailed sections. Example output for Avalanche:

```markdown
# Avalanche Project Information

## Overview
- **Name**: Avalanche
- **Symbol**: AVAX
- **Chain**: Avalanche C-Chain
- **Contract Address**: 0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7
- **Audit Report**: https://quantstamp.com/blog/quantstamp-enhancing-the-security-of-avalanche
- **Description**: Avalanche is a high throughput smart contract blockchain platform. Validators secure the network through a proof-of-stake consensus protocol. It is said to be fast, low cost, and environmental friendly.

## Market Data
- **Price**: $19.45
- **Market Cap**: $8,130,398,992
- **Volume (24h)**: $48,238,792
- **Total Supply**: 454,405,245
- **Circulating Supply**: 417,951,478

## Links
- **Website**: https://www.avax.network
- **Twitter**: https://twitter.com/avax
- **Discord**: https://www.avax.network/

## Investors
- **Lead Investor**: Yes
- **Name**: Polychain Capital
- **Type**: Ventures Capital
- **Description**: Polychain Capital is a cryptocurrency-focused investment management firm and hedge fund.
- **Lead Investor**: Yes
- **Name**: Dragonfly Capital
- **Type**: Ventures Capital
- **Description**: Dragonfly Capital Partners is a venture capital firm that focuses on investments in the blockchain and cryptocurrency space.
- **Lead Investor**: Yes
- **Name**: Bitmain
- **Type**: Ventures Capital
- **Description**: Bitmain is a China-based technology company that specializes in the design and manufacture of hardware for cryptocurrency mining.
- **Lead Investor**: Yes
- **Name**: Galaxy
- **Type**: Ventures Capital
- **Description**: Galaxy is a digital asset and blockchain leader helping institutions, startups, and qualified individuals shape a changing economy.
- **Lead Investor**: Yes
- **Name**: NGC Ventures (NEO Global Capital)
- **Type**: Ventures Capital
- **Description**: NGC Ventures is one of the largest institutional investors of blockchain technologies.
- **Lead Investor**: Yes
- **Name**: Initialized Capital
- **Type**: Ventures Capital
- **Description**: Not available
- **Lead Investor**: Yes
- **Name**: Three Arrows Capital
- **Type**: Ventures Capital
- **Description**: Not available
- **Lead Investor**: No
- **Name**: a16z (Andreessen Horowitz)
- **Type**: Ventures Capital
- **Description**: Andreessen Horowitz is a prominent venture capital firm based in Menlo Park, California.
- **Lead Investor**: No
- **Name**: Fundamental Labs
- **Type**: Ventures Capital
- **Description**: An investment company specialized in Blockchain sector.
- **Lead Investor**: No
- **Name**: Lemniscap
- **Type**: Ventures Capital
- **Description**: Lemniscap is an investment firm specializing in investments in emerging cryptoassets and blockchain companies.
- **Lead Investor**: No
- **Name**: Naval Ravikant
- **Type**: Angel Investor
- **Description**: Naval Ravikant is the CEO and a co-founder of AngelList.
- **Lead Investor**: No
- **Name**: MetaStable Capital
- **Type**: Ventures Capital
- **Description**: Manage Crypto Asset Hedge Funds.
- **Lead Investor**: No
- **Name**: LedgerPrime
- **Type**: Ventures Capital
- **Description**: LedgerPrime is a quantitative and systematic digital asset investment firm.
- **Lead Investor**: No
- **Name**: Digital Asset Capital Management (DACM)
- **Type**: Ventures Capital
- **Description**: Specialist, global investment manager in the digital asset sector.
- **Lead Investor**: No
- **Name**: HashKey Capital
- **Type**: Ventures Capital
- **Description**: HashKey Capital is a blockchain and cryptocurrency-focused venture capital and investment firm.
- **Lead Investor**: No
- **Name**: Balaji Srinivasan
- **Type**: Angel Investor
- **Description**: Balaji S. Srinivasan is the CTO of Coinbase and cofounder of Counsyl, Earn, Teleport, and Coin Center.

## Exchanges
- Binance: AVAX/USDT
- Coinbase: AVAX/USD
- OKX: AVAX/USDT
- Bybit: AVAX/USDT
- Kraken: AVAX/EUR
- WhiteBIT: Not available
- HTX: Not available
- P2B: Not available
- KuCoin: Not available
- Bitunix: Not available

## Token Distribution
- Foundation: 9.26%
- Airdrop: 2.5%
- Team: 10%
- Public Sale Option A1: 1%
- Public Sale Option A2: 8.3%
- Public Sale Option B: 0.67%
- Community and Development Endowment: 7%
- Testnet Incentive Program: 0.31%
- Strategic Partners: 5%
- Staking Rewards: 50%
- Private Sale: 3.46%
- Seed Sale: 2.5%

## Token Release Schedule
- Sep 2020: 40,466,016 tokens (Seed Round, Private Sale, Public Sales, etc.)
- Dec 2020: 45,188,596.8 tokens (Team, Airdrop, Foundation, etc.)
- Mar 2021: 45,188,596.8 tokens (Team, Airdrop, Foundation, etc.)
- Jun 2021: 45,188,596.8 tokens (Team, Airdrop, Foundation, etc.)
- Sep 2021: 19,502,596.8 tokens (Team, Airdrop, Foundation, etc.)
- Dec 2021: 19,502,596.8 tokens (Team, Airdrop, Foundation, etc.)
- Mar 2022: 9,541,800 tokens (Team, Airdrop, Foundation, Strategic Partners)
- Jun 2022: 9,541,800 tokens (Team, Airdrop, Foundation, Strategic Partners)
- Sep 2022: 9,541,800 tokens (Team, Airdrop, Foundation, Strategic Partners)
- Dec 2022: 9,541,800 tokens (Team, Airdrop, Foundation, Strategic Partners)
- Mar 2023: 9,541,800 tokens (Team, Airdrop, Foundation, Strategic Partners)
- Jun 2023: 9,541,800 tokens (Team, Airdrop, Foundation, Strategic Partners)
- Sep 2023: 9,541,800 tokens (Team, Airdrop, Foundation, Strategic Partners)
- Dec 2023: 9,541,800 tokens (Team, Airdrop, Foundation, Strategic Partners)
- Mar 2024: 9,541,800 tokens (Team, Airdrop, Foundation, Strategic Partners)
- Jun 2024: 9,541,800 tokens (Team, Airdrop, Foundation, Strategic Partners)
- Sep 2024: 9,541,800 tokens (Team, Airdrop, Foundation, Strategic Partners)
- Dec 2024: 1,666,800 tokens (Foundation)
- Mar 2025: 1,666,800 tokens (Foundation)
- Jun 2025: 1,666,800 tokens (Foundation)
- Sep 2025: 1,666,800 tokens (Foundation)
- Dec 2025: 1,666,800 tokens (Foundation)
- Mar 2026: 1,666,800 tokens (Foundation)
- Jun 2026: 1,666,800 tokens (Foundation)
- Sep 2026: 1,666,800 tokens (Foundation)
- Dec 2026: 1,666,800 tokens (Foundation)
- Mar 2027: 1,666,800 tokens (Foundation)
- Jun 2027: 1,666,800 tokens (Foundation)
- Sep 2027: 1,666,800 tokens (Foundation)
- Dec 2027: 1,666,800 tokens (Foundation)
- Mar 2028: 1,666,800 tokens (Foundation)
- Jun 2028: 1,666,800 tokens (Foundation)
- Sep 2028: 1,666,800 tokens (Foundation)
- Dec 2028: 1,666,800 tokens (Foundation)
- Mar 2029: 1,666,800 tokens (Foundation)
- Jun 2029: 1,666,800 tokens (Foundation)
- Sep 2029: 1,666,800 tokens (Foundation)
- Dec 2029: 1,666,800 tokens (Foundation)
- Mar 2030: 1,666,800 tokens (Foundation)
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.