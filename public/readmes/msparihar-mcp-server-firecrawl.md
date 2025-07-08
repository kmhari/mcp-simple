# Firecrawl MCP Server

A Model Context Protocol (MCP) server for web scraping, content searching, site crawling, and data extraction using the Firecrawl API.

## Features

- **Web Scraping**: Extract content from any webpage with customizable options
  - Mobile device emulation
  - Ad and popup blocking
  - Content filtering
  - Structured data extraction
  - Multiple output formats

- **Content Search**: Intelligent search capabilities
  - Multi-language support
  - Location-based results
  - Customizable result limits
  - Structured output formats

- **Site Crawling**: Advanced web crawling functionality
  - Depth control
  - Path filtering
  - Rate limiting
  - Progress tracking
  - Sitemap integration

- **Site Mapping**: Generate site structure maps
  - Subdomain support
  - Search filtering
  - Link analysis
  - Visual hierarchy

- **Data Extraction**: Extract structured data from multiple URLs
  - Schema validation
  - Batch processing
  - Web search enrichment
  - Custom extraction prompts

## Installation

```bash
# Global installation
npm install -g @modelcontextprotocol/mcp-server-firecrawl

# Local project installation
npm install @modelcontextprotocol/mcp-server-firecrawl
```

## Quick Start

1. Get your Firecrawl API key from the [developer portal](https://firecrawl.dev/dashboard)

2. Set your API key:

   **Unix/Linux/macOS (bash/zsh):**

   ```bash
   export FIRECRAWL_API_KEY=your-api-key
   ```

   **Windows (Command Prompt):**

   ```cmd
   set FIRECRAWL_API_KEY=your-api-key
   ```

   **Windows (PowerShell):**

   ```powershell
   $env:FIRECRAWL_API_KEY = "your-api-key"
   ```

   **Alternative: Using .env file (recommended for development):**

   ```bash
   # Install dotenv
   npm install dotenv

   # Create .env file
   echo "FIRECRAWL_API_KEY=your-api-key" > .env
   ```

   Then in your code:

   ```javascript
   import dotenv from 'dotenv';
   dotenv.config();
   ```

3. Run the server:

   ```bash
   mcp-server-firecrawl
   ```

## Integration

### Claude Desktop App

Add to your MCP settings:

```json
{
  "firecrawl": {
    "command": "mcp-server-firecrawl",
    "env": {
      "FIRECRAWL_API_KEY": "your-api-key"
    }
  }
}
```

### Claude VSCode Extension

Add to your MCP configuration:

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "mcp-server-firecrawl",
      "env": {
        "FIRECRAWL_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Usage Examples

### Web Scraping

```typescript
// Basic scraping
{
  name: "scrape_url",
  arguments: {
    url: "https://example.com",
    formats: ["markdown"],
    onlyMainContent: true
  }
}

// Advanced extraction
{
  name: "scrape_url",
  arguments: {
    url: "https://example.com/blog",
    jsonOptions: {
      prompt: "Extract article content",
      schema: {
        title: "string",
        content: "string"
      }
    },
    mobile: true,
    blockAds: true
  }
}
```

### Site Crawling

```typescript
// Basic crawling
{
  name: "crawl",
  arguments: {
    url: "https://example.com",
    maxDepth: 2,
    limit: 100
  }
}

// Advanced crawling
{
  name: "crawl",
  arguments: {
    url: "https://example.com",
    maxDepth: 3,
    includePaths: ["/blog", "/products"],
    excludePaths: ["/admin"],
    ignoreQueryParameters: true
  }
}
```

### Site Mapping

```typescript
// Generate site map
{
  name: "map",
  arguments: {
    url: "https://example.com",
    includeSubdomains: true,
    limit: 1000
  }
}
```

### Data Extraction

```typescript
// Extract structured data
{
  name: "extract",
  arguments: {
    urls: ["https://example.com/product1", "https://example.com/product2"],
    prompt: "Extract product details",
    schema: {
      name: "string",
      price: "number",
      description: "string"
    }
  }
}
```

## Configuration

See [configuration guide](https://github.com/Msparihar/mcp-server-firecrawl/blob/main/docs/configuration.md) for detailed setup options.

## API Documentation

See [API documentation](https://github.com/Msparihar/mcp-server-firecrawl/blob/main/docs/api.md) for detailed endpoint specifications.

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Start in development mode
npm run dev
```

## Examples

Check the [examples](https://github.com/Msparihar/mcp-server-firecrawl/tree/main/examples) directory for more usage examples:

- Basic scraping: [scrape.ts](https://github.com/Msparihar/mcp-server-firecrawl/blob/main/examples/scrape.ts)
- Crawling and mapping: [crawl-and-map.ts](https://github.com/Msparihar/mcp-server-firecrawl/blob/main/examples/crawl-and-map.ts)

## Error Handling

The server implements robust error handling:

- Rate limiting with exponential backoff
- Automatic retries
- Detailed error messages
- Debug logging

## Security

- API key protection
- Request validation
- Domain allowlisting
- Rate limiting
- Safe error messages

## Contributing

See [CONTRIBUTING.md](https://github.com/Msparihar/mcp-server-firecrawl/blob/main/CONTRIBUTING.md) for contribution guidelines.

## License

MIT License - see [LICENSE](https://github.com/Msparihar/mcp-server-firecrawl/blob/main/LICENSE) for details.
