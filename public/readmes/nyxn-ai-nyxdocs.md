# NyxDocs - Cryptocurrency Documentation MCP Server

[![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![MCP](https://img.shields.io/badge/MCP-compatible-green.svg)](https://modelcontextprotocol.io)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

NyxDocs is a specialized Model Context Protocol (MCP) server that provides comprehensive documentation management for cryptocurrency projects. Built with Python and inspired by Context7's architecture, it offers real-time access to crypto project documentation, blockchain information, and development resources.

## 🚀 Features

### Core Capabilities
- **Multi-Blockchain Support**: Ethereum, BSC, Polygon, Solana, and more
- **Real-time Documentation**: Automatically discovers and updates project docs
- **Smart Search**: Find projects by name, category, or blockchain
- **Content Extraction**: Supports GitHub, GitBook, Notion, and official websites
- **Update Monitoring**: Tracks documentation changes automatically

### MCP Tools
- `search_crypto_projects`: Search cryptocurrency projects by various criteria
- `get_project_info`: Detailed project information with blockchain context
- `get_documentation`: Retrieve actual documentation content
- `list_blockchains`: Available blockchain networks
- `check_updates`: Recent documentation updates

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Data Sources  │    │   NyxDocs Core   │    │   MCP Client    │
│                 │    │                  │    │                 │
│ • CoinGecko API │────│ • Project DB     │────│ • Claude        │
│ • GitHub API    │    │ • Doc Scraper    │    │ • Cursor        │
│ • GitBook       │    │ • Update Monitor │    │ • VS Code       │
│ • Notion        │    │ • MCP Server     │    │ • Other Clients │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Key Components

1. **MCP Server Core**: FastMCP-based server handling protocol communication
2. **Data Collectors**: Modules for gathering project information from various APIs
3. **Documentation Scrapers**: Intelligent content extraction from different sources
4. **Database Layer**: SQLite/PostgreSQL for storing projects and documentation
5. **Update Monitors**: Background tasks for tracking documentation changes

## 📦 Installation

### Prerequisites
- Python 3.11+
- uv (recommended) or pip

### Quick Start

```bash
# Clone the repository
git clone https://github.com/nyxn-ai/NyxDocs.git
cd NyxDocs

# Install with uv (recommended)
uv sync

# Or install with pip
pip install -e .

# Set up environment
cp .env.example .env
# Edit .env with your API keys

# Initialize database
uv run python -m nyxdocs.database.init

# Start the server
uv run python -m nyxdocs.server
```

### MCP Client Configuration

#### Cursor
```json
{
  "mcpServers": {
    "nyxdocs": {
      "command": "uv",
      "args": ["run", "python", "-m", "nyxdocs.server"]
    }
  }
}
```

#### Claude Desktop
```json
{
  "mcpServers": {
    "nyxdocs": {
      "command": "uv",
      "args": ["run", "python", "-m", "nyxdocs.server"]
    }
  }
}
```

## 🔧 Configuration

### Environment Variables

```env
# API Keys
COINGECKO_API_KEY=your_coingecko_api_key
GITHUB_TOKEN=your_github_token

# Database
DATABASE_URL=sqlite:///nyxdocs.db
# Or for PostgreSQL: postgresql://user:pass@localhost/nyxdocs

# Server Settings
LOG_LEVEL=INFO
UPDATE_INTERVAL=3600  # seconds
MAX_CONCURRENT_SCRAPES=5
```

### Supported Data Sources

- **CoinGecko**: Market data and project information
- **GitHub**: Repository documentation and README files
- **GitBook**: Hosted documentation platforms
- **Notion**: Project documentation pages
- **Official Websites**: Direct documentation scraping

## 🛠️ Usage Examples

### Search for DeFi Projects
```python
# In your MCP client
search_crypto_projects(query="uniswap", category="DeFi", blockchain="ethereum")
```

### Get Project Documentation
```python
get_documentation(project="uniswap", format="markdown")
```

### Monitor Updates
```python
check_updates(since="2024-01-01", limit=10)
```

## 🧪 Development

### Project Structure
```
NyxDocs/
├── nyxdocs/
│   ├── __init__.py
│   ├── server.py              # Main MCP server
│   ├── collectors/            # Data collection modules
│   ├── scrapers/              # Documentation scrapers
│   ├── database/              # Database models and operations
│   ├── tools/                 # MCP tool implementations
│   └── utils/                 # Utility functions
├── tests/                     # Test suite
├── docs/                      # Documentation
├── pyproject.toml            # Project configuration
└── README.md
```

### Running Tests
```bash
uv run pytest
```

### Code Quality
```bash
uv run ruff check
uv run mypy nyxdocs
```

## 📚 Documentation

- [API Reference](docs/api.md)
- [Configuration Guide](docs/configuration.md)
- [Development Setup](docs/development.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Context7](https://github.com/upstash/context7) by Upstash
- Built with [Python MCP SDK](https://github.com/modelcontextprotocol/python-sdk)
- Cryptocurrency data provided by CoinGecko API

---

**NyxDocs** - Making cryptocurrency project documentation accessible and up-to-date for AI assistants.
