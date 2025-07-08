# ShareSeer MCP Server

A Model Context Protocol (MCP) server that provides access to ShareSeer's comprehensive SEC filings, insider transactions, and financial data through Claude and other MCP-compatible AI assistants.

## 🚀 Quick Start

### Get Your API Key

1. Sign up at [shareseer.com/signup](https://shareseer.com/signup) (free account)
2. Go to your [profile page](https://shareseer.com/profile)
3. Your API key will be displayed (starts with `sk-shareseer-`)

### Claude Desktop Integration

**Remote MCP Server (Recommended)**

Add to your Claude Desktop configuration:

**Search & Tools →Add Integrations → Add Integration URL:**
```
https://shareseer.com/mcp?api_key=YOUR_API_KEY_HERE
```


## 📊 Available Tools

### Company Information
- **`get_company_filings`** - Get recent SEC filings for a specific company
- **`get_insider_transactions`** - Get insider trading transactions for a company

### Market-Wide Data
- **`get_recent_filings`** - Get recent SEC filings across all companies
- **`get_recent_insider_activity`** - Get recent insider trading activity

### Largest Transactions
- **`get_largest_daily_transactions`** - Get largest daily insider transactions
- **`get_largest_weekly_transactions`** - Get largest weekly insider transactions

## 💎 Subscription Tiers

| Feature | Free | Premium ($14.99/mo) |
|---------|------|---------------------|
| **Rate Limits** | 10/hour, 50/day | 100/hour, 1K/day |
| **Data History** | 6 months | 10 years |
| **Company Data** | ✅ Basic info & filings | ✅ All features |
| **Insider Transactions** | ✅ Limited (3 results) | ✅ Unlimited |
| **Largest Transactions** | ✅ Current week only | ✅ Historical data |
| **Pagination** | ❌ | ✅ |
| **Support** | Community | Email |

[**Sign Up Free**](https://shareseer.com/signup) | [**Upgrade to Premium**](https://shareseer.com/upgrade?source=mcp)

## 🔧 Usage Examples


### Get Recent Insider Transactions  
Ask Claude: *"Show me recent insider trading for Tesla"*

### Get Largest Daily Buyers
Ask Claude: *"Who made the biggest stock purchases today?"*

### Get Recent SEC Filings
Ask Claude: *"What are the most recent 10-K filings?"*

### Market Analysis
Ask Claude: *"Show me the largest insider selling activity this week"*
Ask Claude: *"Show me the largest insider buying activity this week"*

## 🌐 Remote vs Local Setup

**✅ Remote MCP (Recommended)**
- No installation required
- Always up-to-date
- Hosted by ShareSeer
- Just add the integration URL



### Common Issues

**Claude Desktop doesn't show ShareSeer tools:**
- Verify your API key is correct and active
- Make sure the integration URL includes your API key
- Restart Claude Desktop after adding the integration
- Check that your ShareSeer account is active

**"Rate limit exceeded" error:**
- Check your current subscription tier limits  
- Wait for the rate limit window to reset
- Consider upgrading to Premium for higher limits
- Spread out your queries over time

**"Invalid API key" error:**
- Verify your API key starts with `sk-shareseer-`
- Check that your ShareSeer account is active
- Get a fresh API key from your profile page

### Getting Help

- **Free users**: [GitHub Issues](https://github.com/shareseer/mcp-server/issues)
- **Premium users**: Email support@shareseer.com
- **Documentation**: [ShareSeer Claude Integration](https://shareseer.com/claude-integration)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Support

Love the ShareSeer MCP server? Here's how you can help:

- ⭐ **Star this repo** on GitHub
- 🐛 **Report bugs** via GitHub Issues  
- 💡 **Request features** via GitHub Discussions
- 📢 **Share** with other developers and traders
- 💎 **Upgrade to Premium** to support continued development

---

**Built with ❤️  by the ShareSeer team**

[Website](https://shareseer.com) • [X](https://x.com/shareseer) • [Email](mailto:contact@shareseer.com)

