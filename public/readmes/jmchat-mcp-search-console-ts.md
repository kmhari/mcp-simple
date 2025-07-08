# Google Search Console MCP

A Model Context Protocol (MCP) server for managing Google Search Console properties, sitemaps, and search analytics.

## Installation

```bash
npm install -g mcp-search-console
```

Or use directly via npx:

```bash
npx mcp-search-console
```

## Requirements

1. A Google Cloud project with the Search Console API enabled
2. A service account with appropriate permissions for Search Console
3. A credentials.json file for the service account

## Configuration

Specify the path to your Google service account credentials. This can be done in two ways:

### Option 1: Environment Variable

Set the `GOOGLE_APPLICATION_CREDENTIALS` variable:

```bash
export GOOGLE_APPLICATION_CREDENTIALS=path/to/credentials.json
```

### Option 2: .env File (optional)

Create a `.env` file with:

```
GOOGLE_APPLICATION_CREDENTIALS=path/to/credentials.json
```

## Available Functions

The MCP provides the following Search Console functions:

### Sites
- `search_console_api_list_sites` – List all sites with access

### Sitemaps
- `search_console_api_list_sitemaps` – List all sitemaps for a property
- `search_console_api_get_sitemap` – Details of a specific sitemap

### Search Analytics
- `search_console_api_searchanalytics_query` – Retrieve search analytics data
  - Also supports hourly data (from April 2025) via the `HOUR` dimension and `HOURLY_ALL` dataState

#### Example: Querying Hourly Data

To query hourly data, use the following parameters in your request:

```json
{
  "tool": "search_console_api_searchanalytics_query",
  "parameters": {
    "siteUrl": "https://example.com",
    "requestBody": {
      "startDate": "2025-04-07",
      "endDate": "2025-04-07",
      "dataState": "HOURLY_ALL",
      "dimensions": ["HOUR"]
    }
  }
}
```

This returns results with timestamps per hour:

```json
{
  "rows": [
    {
      "keys": ["2025-04-07T00:00:00-07:00"],
      "clicks": 17610,
      "impressions": 1571473,
      "ctr": 0.011206046810858348,
      "position": 10.073871456906991
    },
    {
      "keys": ["2025-04-07T01:00:00-07:00"],
      "clicks": 18250,
      "impressions": 1602341,
      "ctr": 0.011389563095440307,
      "position": 9.897654321098765
    }
    // ... more hours
  ]
}
```

You can also combine the HOUR dimension with other dimensions such as COUNTRY, DEVICE, etc.:

```json
{
  "tool": "search_console_api_searchanalytics_query",
  "parameters": {
    "siteUrl": "https://example.com",
    "requestBody": {
      "startDate": "2025-04-07",
      "endDate": "2025-04-07",
      "dataState": "HOURLY_ALL",
      "dimensions": ["HOUR", "COUNTRY"]
    }
  }
}
```

### Crawl Errors (Legacy)
- `search_console_api_list_crawl_errors` – List crawl errors
- `search_console_api_get_crawl_error` – Details of a specific crawl error
- `search_console_api_mark_crawl_error_fixed` – Mark as fixed

### Mobile Usability
- `search_console_api_mobile_friendly_test` – Run a mobile-friendly test on a URL

## Using with Claude

This MCP works with Claude or other MCP Clients. Create a `claude-mcp-config.json` with, for example:

```json
{
  "mcpServers": {
    "google-search-console": {
      "command": "npx",
      "args": ["mcp-search-console"],
      "cwd": "/tmp",
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/your/credentials.json"
      }
    }
  }
}
```

Replace `/path/to/your/credentials.json` with the actual path to your Google service account credentials file.

### Important Notes for Claude Configuration

1. The `cwd` parameter is important - it ensures the MCP runs in a clean directory
2. No `.env` file is needed when using this configuration with Claude
3. The `NO_COLOR` environment variable prevents color codes in the output, which can cause JSON parsing errors in Claude
4. Upload the `claude-mcp-config.json` file to Claude when starting a new conversation

## License

ISC
