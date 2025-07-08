# PubMed MCP Server

An MCP server implementation for accessing PubMed data with focus on open access content.

## Features

- Search PubMed database for research articles
- Filter for open access content
- Get detailed article information including abstracts
- Find free full-text links where available
- Built-in rate limiting for API compliance

## Installation

```bash
npm install @rikachu225/pubmed-server
```

## Usage

```javascript
import PubMedServer from '@rikachu225/pubmed-server';

// Search for recent open access papers
const results = await PubMedServer.getLatestOpenAccess({
  topic: 'machine learning',
  days: 30,
  maxResults: 10
});

// Basic search with options
const searchResults = await PubMedServer.search({
  query: 'cancer treatment',
  maxResults: 20,
  sort: 'relevance',
  filterOpenAccess: true
});
```

## API Reference

### search(options)
Search for articles with specified criteria
- `query`: Search terms
- `maxResults`: Maximum number of results (default: 10)
- `sort`: Sort order ('relevance' or 'date')
- `filterOpenAccess`: Whether to filter for open access content (default: true)

### getLatestOpenAccess(options)
Get recent open access papers
- `topic`: Search topic
- `days`: Number of days to look back (default: 30)
- `maxResults`: Maximum number of results (default: 10)

### getOpenAccessLinks(pmid)
Get available free full-text links for an article
- `pmid`: PubMed ID of the article

## Rate Limiting

The server implements automatic rate limiting to comply with NCBI's guidelines (maximum 3 requests per second).

## License

MIT
# mcp-pubmed-server
