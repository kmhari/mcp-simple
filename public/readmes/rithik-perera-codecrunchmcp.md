# Azure Usage MCP Server

This is a Model Context Protocol (MCP) server for analyzing Azure usage data from CSV files. It provides insights, summaries, and visualizations of Azure cost and usage patterns.

## Features

- Analyze Azure usage data from CSV files
- Generate cost summaries and visualizations
- Identify top services and regions by cost
- Respond to natural language queries about Azure usage
- Fully compatible with the Model Context Protocol (MCP)

## Setup

1. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Place your Azure usage CSV file in the `data` directory (the default file is `BCAzureUsage 1.csv`).

3. Run the server:
   ```
   python claude_mcp.py
   ```

## Configuration for Claude or other AI assistants

You can configure this MCP server in your AI assistant configuration using the following format:

```json
{
  "mcpServers": {
    "azure-usage-analyzer": {
      "command": "python",
      "args": ["claude_mcp.py"],
      "cwd": "path/to/mcp-server",
      "env": {}
    }
  }
}
```

## MCP Protocol Support

This server implements the Model Context Protocol (MCP) version 2024-11-05. It supports the following MCP methods:

- `initialize`: Establishes a connection with the MCP client
- `search`: Processes natural language queries about Azure usage data

## API Endpoints

### GET /

Returns basic server information and available endpoints.

### POST /context

Processes Azure usage data and provides insights based on a specific query.

**Request format:**
```json
{
  "query": "Show me Azure usage by region",
  "params": {
    "dataset": "BCAzureUsage 1.csv"
  }
}
```

### POST /search

General-purpose search endpoint for querying Azure usage data.

**Request format:**
```json
{
  "query": "What are my top costs by region?"
}
```

## Example Queries

- "Show me Azure usage by region"
- "What are my top costs?"
- "Analyze service type usage"
- "Which services cost the most?"
