# Nefino MCP Server

The Nefino MCP Server is a [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that provides Large Language Models (LLMs) with access to news and information about renewable energy projects, planning, and announcements in Germany. It integrates with the Nefino API to provide structured access to this data.

## Features

- Retrieve news items for specific geographic locations
- Filter by various renewable energy topics (solar, wind, hydrogen, etc.)
- Support for both date range and recency-based queries
- Secure authentication through environment variables
- Input validation and error handling
- Full MCP compatibility

## Installation

### Prerequisites

- Python 3.10 or higher
- Access to the Nefino API (credentials required)

### Installation

```bash
pip install git+https://github.com/nefino/mcp-nefino.git
```

## Configuration

The server requires several environment variables to be set. They should be passed in directly when running the server.

```bash
NEFINO_USERNAME=your_username
NEFINO_PASSWORD=your_password
NEFINO_JWT_SECRET=your_jwt_secret
NEFINO_BASE_URL=http://api_endpoint
```

## Usage

### With Claude Desktop

1. Install [Claude Desktop](https://claude.ai/download)

2. Add the following to your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS or `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "nefino": {
      "command": "python",
      "args": ["-m", "mcp_nefino"],
      "env": {
        "NEFINO_USERNAME": "your_username",
        "NEFINO_PASSWORD": "your_password",
        "NEFINO_JWT_SECRET": "your_jwt_secret",
        "NEFINO_BASE_URL": "http://api_endpoint"
      }
    }
  }
}
```

3. Restart Claude Desktop

### Direct Usage

You can also run the server directly:

```bash
python -m mcp_nefino
```

## Available Tools

### retrieve_news_items_for_place

Retrieves news items for a specific location with various filtering options.

Parameters:
- `place_id` (string): The ID of the place
- `place_type` (enum): Type of place (PR, CTY, AU, LAU)
- `range_or_recency` (enum, optional): RANGE or RECENCY
- `last_n_days` (integer, optional): Number of days to look back (for RECENCY mode)
- `date_range_begin` (string, optional): Start date in YYYY-MM-DD format (for RANGE mode)
- `date_range_end` (string, optional): End date in YYYY-MM-DD format (for RANGE mode)
- `news_topics` (list of enums, optional): Topics to filter by (BATTERY_STORAGE, GRID_EXPANSION, SOLAR, HYDROGEN, WIND)

Example query via Claude:
```
Get renewable energy news for administrative unit DE9_AU0213 from January to June 2024, focusing on solar projects.
```

## Development

To run in development mode with the MCP Inspector:

```bash
mcp dev -m mcp_nefino
```

## Error Handling

The server performs validation on:
- Date formats (YYYY-MM-DD)
- Date range validity
- Parameter combinations for RANGE vs RECENCY modes
- API credentials and connectivity
- News topic validity

All errors are returned with descriptive messages to help diagnose issues.

## License

[License type - e.g., MIT] - see LICENSE file for details