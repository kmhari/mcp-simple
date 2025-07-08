# MCP Firecrawl Server

This is a simple MCP server that provides tools to scrape websites and extract structured data using Firecrawl's APIs.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
FIRECRAWL_API_TOKEN=your_token_here
SENTRY_DSN=your_sentry_dsn_here
```

- `FIRECRAWL_API_TOKEN` (required): Your Firecrawl API token
- `SENTRY_DSN` (optional): Sentry DSN for error tracking and performance monitoring

3. Start the server:
```bash
npm start
```

Alternatively, you can set environment variables directly when running the server:
```bash
FIRECRAWL_API_TOKEN=your_token_here npm start
```

## Features

- **Website Scraping**: Extract content from websites in various formats
- **Structured Data Extraction**: Extract specific data points based on custom schemas
- **Error Tracking**: Integrated with Sentry for error tracking and performance monitoring

## Usage

The server exposes two tools:
1. `scrape-website`: Basic website scraping with multiple format options
2. `extract-data`: Structured data extraction based on prompts and schemas

### Tool: scrape-website

This tool scrapes a website and returns its content in the requested formats.

Parameters:
- `url` (string, required): The URL of the website to scrape
- `formats` (array of strings, optional): Array of desired output formats. Supported formats are:
  - `"markdown"` (default)
  - `"html"`
  - `"text"`

Example usage with MCP Inspector:
```bash
# Basic usage (defaults to markdown)
mcp-inspector --tool scrape-website --args '{
  "url": "https://example.com"
}'

# Multiple formats
mcp-inspector --tool scrape-website --args '{
  "url": "https://example.com",
  "formats": ["markdown", "html", "text"]
}'
```

### Tool: extract-data

This tool extracts structured data from websites based on a provided prompt and schema.

Parameters:
- `urls` (array of strings, required): Array of URLs to extract data from
- `prompt` (string, required): The prompt describing what data to extract
- `schema` (object, required): Schema definition for the data to extract

The schema definition should be an object where keys are field names and values are types. Supported types are:
- `"string"`: For text fields
- `"boolean"`: For true/false fields
- `"number"`: For numeric fields
- Arrays: Specified as `["type"]` where type is one of the above
- Objects: Nested objects with their own type definitions

Example usage with MCP Inspector:
```bash
# Basic example extracting company information
mcp-inspector --tool extract-data --args '{
  "urls": ["https://example.com"],
  "prompt": "Extract the company mission, whether it supports SSO, and whether it is open source.",
  "schema": {
    "company_mission": "string",
    "supports_sso": "boolean",
    "is_open_source": "boolean"
  }
}'

# Complex example with nested data
mcp-inspector --tool extract-data --args '{
  "urls": ["https://example.com/products", "https://example.com/pricing"],
  "prompt": "Extract product information including name, price, and features.",
  "schema": {
    "products": [{
      "name": "string",
      "price": "number",
      "features": ["string"]
    }]
  }
}'
```

Both tools will return appropriate error messages if the scraping or extraction fails and automatically log errors to Sentry if configured.

## Troubleshooting

If you encounter issues:

1. Verify your Firecrawl API token is valid
2. Check that the URLs you're trying to scrape are accessible
3. For complex schemas, ensure they follow the supported format
4. Review Sentry logs for detailed error information (if configured) 