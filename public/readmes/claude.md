# Claude-MCP

A collection of Model Context Protocol (MCP) servers for use with Claude Desktop and other MCP-compatible applications.

## Overview

This repository contains multiple MCP servers that provide various capabilities:

- **Filesystem Server**: Access and manipulate files on the local filesystem
- **GitHub Server**: Interact with GitHub repositories
- **Brave Search Server**: Perform web searches using Brave Search
- **Fetch Server**: Fetch data from URLs and APIs
- **Mindmap Server**: Create and manipulate mindmaps
- **Market Analysis Server**: Analyze market data and generate visualizations
- **Financial Modeling Server**: Generate financial projections and analyses
- **Technical Documentation Server**: Generate technical documentation and diagrams

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/jamcam-me/Claude-MCP.git
   cd Claude-MCP
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Usage

### Starting All Servers

To start all MCP servers:

```
npm start
```

### Starting Individual Servers

To start individual servers:

- Filesystem Server: `npm run start:filesystem`
- GitHub Server: `npm run start:github`
- Brave Search Server: `npm run start:brave-search`
- Fetch Server: `npm run start:fetch`
- Mindmap Server: `npm run start:mindmap`
- Market Analysis Server: `npm run start:market-analysis`
- Financial Modeling Server: `npm run start:financial-modeling`
- Technical Documentation Server: `npm run start:technical-doc`

## Server Capabilities

### Filesystem Server

Provides access to the local filesystem with the following tools:
- `read_file`: Read a file from the filesystem
- `write_file`: Write data to a file in the filesystem
- `list_files`: List files in a directory

### GitHub Server

Provides access to GitHub repositories with the following tools:
- `search_repositories`: Search for GitHub repositories
- `get_repository`: Get information about a GitHub repository
- `list_issues`: List issues in a GitHub repository

### Brave Search Server

Provides web search capabilities using Brave Search with the following tools:
- `search`: Perform a web search
- `search_news`: Search for news articles
- `search_images`: Search for images

### Fetch Server

Provides tools for fetching data from URLs and APIs:
- `fetch`: Fetch data from a URL
- `fetch_json`: Fetch JSON data from a URL and parse it
- `fetch_html`: Fetch HTML content from a URL

### Mindmap Server

Provides tools for creating and manipulating mindmaps:
- `create_mindmap`: Create a new mindmap from a template or from scratch
- `update_mindmap`: Update an existing mindmap by adding, modifying, or removing nodes
- `export_mindmap`: Export a mindmap to various formats (JSON, Markdown, Mermaid)

### Market Analysis Server

Provides tools for market analysis and visualization:
- `partner_ecosystem_analysis`: Analyze partner ecosystem and generate visualization data
- `competitive_analysis`: Analyze competitive landscape and generate visualization data
- `regional_market_analysis`: Analyze regional markets and generate visualization data

### Financial Modeling Server

Provides tools for financial modeling and analysis:
- `revenue_projection`: Generate revenue projections based on market share, pricing tiers, and growth rates
- `scenario_analysis`: Analyze bull, base, and bear case scenarios for financial projections
- `sensitivity_analysis`: Analyze the sensitivity of financial projections to changes in key parameters

### Technical Documentation Server

Provides tools for generating technical documentation and diagrams:
- `generate_architecture_diagram`: Generate architecture diagrams based on system components
- `generate_sequence_diagram`: Generate sequence diagrams for system interactions
- `generate_gantt_chart`: Generate Gantt charts for project timelines

## Configuration

### Claude Desktop Configuration

To configure Claude Desktop to use these MCP servers, add the following to your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": ["D:/github/Claude-MCP/src/mcp-servers/filesystem-server.js"],
      "disabled": false,
      "alwaysAllow": []
    },
    "github": {
      "command": "node",
      "args": ["D:/github/Claude-MCP/src/mcp-servers/github-server.js"],
      "disabled": false,
      "alwaysAllow": []
    },
    "brave-search": {
      "command": "node",
      "args": ["D:/github/Claude-MCP/src/mcp-servers/brave-search-server.js"],
      "disabled": false,
      "alwaysAllow": []
    },
    "fetch": {
      "command": "node",
      "args": ["D:/github/Claude-MCP/src/mcp-servers/fetch-server.js"],
      "disabled": false,
      "alwaysAllow": []
    },
    "mindmap": {
      "command": "node",
      "args": ["D:/github/Claude-MCP/src/mcp-servers/mindmap-server.js"],
      "disabled": false,
      "alwaysAllow": []
    },
    "market-analysis": {
      "command": "node",
      "args": ["D:/github/Claude-MCP/src/mcp-servers/market-analysis-server.js"],
      "disabled": false,
      "alwaysAllow": []
    },
    "financial-modeling": {
      "command": "node",
      "args": ["D:/github/Claude-MCP/src/mcp-servers/financial-modeling-server.js"],
      "disabled": false,
      "alwaysAllow": []
    },
    "technical-documentation": {
      "command": "node",
      "args": ["D:/github/Claude-MCP/src/mcp-servers/technical-documentation-server.js"],
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

## License

ISC
