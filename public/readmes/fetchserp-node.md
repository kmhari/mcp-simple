# FetchSERP MCP Server

A Model Context Protocol (MCP) server that exposes the FetchSERP API for SEO, SERP analysis, web scraping, and keyword research.

## Features

This MCP server provides access to all FetchSERP API endpoints:

### SEO & Analysis
- **Domain Analysis**: Get backlinks, domain info (DNS, WHOIS, SSL, tech stack)
- **Keyword Research**: Search volume, suggestions, long-tail keyword generation
- **SEO Analysis**: Comprehensive webpage SEO analysis
- **AI Analysis**: AI-powered webpage analysis with custom prompts
- **Moz Integration**: Domain authority and Moz metrics

### SERP & Search
- **Search Results**: Get SERP results from Google, Bing, Yahoo, DuckDuckGo
- **AI Overview**: Google's AI overview with JavaScript rendering
- **Enhanced Results**: SERP with HTML or text content
- **Ranking Check**: Domain ranking for specific keywords
- **Indexation Check**: Verify if pages are indexed

### Web Scraping
- **Basic Scraping**: Scrape webpages without JavaScript
- **JS Scraping**: Execute custom JavaScript on pages
- **Proxy Scraping**: Scrape with country-specific proxies
- **Domain Scraping**: Scrape multiple pages from a domain

### User Management
- **Account Info**: Check API credits and user information

## Installation

**No installation required!** This MCP server runs directly from GitHub using npx.

**Get your FetchSERP API token**: Sign up at [https://www.fetchserp.com](https://www.fetchserp.com) to get your API token. New users get 250 free credits to get started!

## Usage

### Transport Modes

This MCP server supports two transport modes:

**npx mode (Option 1)**:
- ✅ Zero installation required
- ✅ Always gets latest version from GitHub
- ✅ Perfect for individual users
- ✅ Runs locally with Claude Desktop

**HTTP mode (Option 2)**:
- ✅ Remote deployment capability
- ✅ Multiple clients can connect
- ✅ Better for enterprise/team environments
- ✅ Centralized server management
- ✅ Single API key authentication (FetchSERP token)
- ✅ Scalable architecture

### Configuration

**Option 1: Using npx (Local/Remote GitHub)**
Add this server to your MCP client configuration. For example, in Claude Desktop using github registry :

```json
{
  "mcpServers": {
    "fetchserp": {
      "command": "npx",
      "args": [
        "github:fetchSERP/fetchserp-mcp-server-node"
      ],
      "env": {
        "FETCHSERP_API_TOKEN": "your_fetchserp_api_token_here"
      }
    }
  }
}
```

or using npm registry

```json
{
  "mcpServers": {
    "fetchserp": {
      "command": "npx",
      "args": ["fetchserp-mcp-server"],
      "env": {
        "FETCHSERP_API_TOKEN": "your_fetchserp_api_token_here"
      }
    }
  }
}
```

**Option 2: Claude API with MCP Server**
For programmatic usage with Claude's API and your deployed MCP server:

```javascript
const claudeRequest = {
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [
    {
      role: "user", 
      content: question
    }
  ],
  // MCP Server Configuration
  mcp_servers: [
    {
      type: "url",
      url: "https://mcp.fetchserp.com/sse",
      name: "fetchserp",
      authorization_token: FETCHSERP_API_TOKEN,
      tool_configuration: {
        enabled: true
      }
    }
  ]
};

const response = await httpRequest('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'x-api-key': CLAUDE_API_KEY,
    'anthropic-version': '2023-06-01',
    'anthropic-beta': 'mcp-client-2025-04-04',
    'content-type': 'application/json'
  }
}, JSON.stringify(claudeRequest));
```

**Option 3: OpenAI API with MCP Server**
For programmatic usage with OpenAI's API and your deployed MCP server:

```javascript
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const res = await openai.responses.create({
  model: "gpt-4.1",
  tools: [
    {
      type: "mcp",
      server_label: "fetchserp",
      server_url: "https://mcp.fetchserp.com/sse",
      headers: {
        Authorization: `Bearer ${FETCHSERP_API_TOKEN}`
      }
    }
  ],
  input: question
});

console.log(res.choices[0].message);
```

**Option 4: Docker**
Use the pre-built Docker image from GitHub Container Registry for containerized deployment:

```json
{
  "mcpServers": {
    "fetchserp": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "FETCHSERP_API_TOKEN",
        "ghcr.io/fetchserp/fetchserp-mcp-server-node:latest"
      ],
      "env": {
        "FETCHSERP_API_TOKEN": "your_fetchserp_api_token_here"
      }
    }
  }
}
```

**Docker Features:**
- ✅ Containerized deployment
- ✅ Cross-platform compatibility (ARM64 & AMD64)
- ✅ Isolated environment
- ✅ Easy scaling and deployment
- ✅ Automated builds from GitHub

**Manual Docker Usage:**
```bash
# Pull the latest image
docker pull ghcr.io/fetchserp/fetchserp-mcp-server-node:latest

# Run with environment variable
docker run -i --rm \
  -e FETCHSERP_API_TOKEN="your_token_here" \
  ghcr.io/fetchserp/fetchserp-mcp-server-node:latest

# Or run in HTTP mode on port 8000
docker run -p 8000:8000 \
  -e FETCHSERP_API_TOKEN="your_token_here" \
  -e MCP_HTTP_MODE=true \
  ghcr.io/fetchserp/fetchserp-mcp-server-node:latest
```

## Available Tools

### Domain & SEO Analysis

#### `get_backlinks`
Get backlinks for a domain
- **domain** (required): Target domain
- **search_engine**: google, bing, yahoo, duckduckgo (default: google)
- **country**: Country code (default: us)
- **pages_number**: Pages to search 1-30 (default: 15)

#### `get_domain_info`
Get comprehensive domain information
- **domain** (required): Target domain

#### `get_domain_emails`
Extract emails from a domain
- **domain** (required): Target domain
- **search_engine**: Search engine (default: google)
- **country**: Country code (default: us)
- **pages_number**: Pages to search 1-30 (default: 1)

#### `get_webpage_seo_analysis`
Comprehensive SEO analysis of a webpage
- **url** (required): URL to analyze

#### `get_webpage_ai_analysis`
AI-powered webpage analysis
- **url** (required): URL to analyze
- **prompt** (required): Analysis prompt

#### `get_moz_analysis`
Get Moz domain authority and metrics
- **domain** (required): Target domain

### Keyword Research

#### `get_keywords_search_volume`
Get search volume for keywords
- **keywords** (required): Array of keywords
- **country**: Country code

#### `get_keywords_suggestions`
Get keyword suggestions
- **url**: URL to analyze (optional if keywords provided)
- **keywords**: Array of seed keywords (optional if url provided)
- **country**: Country code

#### `get_long_tail_keywords`
Generate long-tail keywords
- **keyword** (required): Seed keyword
- **search_intent**: informational, commercial, transactional, navigational (default: informational)
- **count**: Number to generate 1-500 (default: 10)

### SERP & Search

#### `get_serp_results`
Get search engine results
- **query** (required): Search query
- **search_engine**: google, bing, yahoo, duckduckgo (default: google)
- **country**: Country code (default: us)
- **pages_number**: Pages to search 1-30 (default: 1)

#### `get_serp_html`
Get SERP results with HTML content
- Same parameters as `get_serp_results`

#### `get_serp_text`
Get SERP results with text content
- Same parameters as `get_serp_results`

#### `get_serp_ai_mode`
Get SERP with AI Overview and AI Mode response
- **query** (required): Search query
- **country**: Country code (default: us)

*Returns AI overview and AI mode response for the query. Less reliable than the 2-step process but returns results in under 30 seconds.*

#### `check_page_indexation`
Check if domain is indexed for keyword
- **domain** (required): Target domain
- **keyword** (required): Search keyword

#### `get_domain_ranking`
Get domain ranking for keyword
- **keyword** (required): Search keyword
- **domain** (required): Target domain
- **search_engine**: Search engine (default: google)
- **country**: Country code (default: us)
- **pages_number**: Pages to search 1-30 (default: 10)

### Web Scraping

#### `scrape_webpage`
Scrape webpage without JavaScript
- **url** (required): URL to scrape

#### `scrape_domain`
Scrape multiple pages from domain
- **domain** (required): Target domain
- **max_pages**: Maximum pages to scrape, up to 200 (default: 10)

#### `scrape_webpage_js`
Scrape webpage with custom JavaScript
- **url** (required): URL to scrape
- **js_script** (required): JavaScript code to execute

#### `scrape_webpage_js_proxy`
Scrape webpage with JavaScript and proxy
- **url** (required): URL to scrape
- **country** (required): Proxy country
- **js_script** (required): JavaScript code to execute

### User Management

#### `get_user_info`
Get user information and API credits
- No parameters required

## API Token

You need a FetchSERP API token to use this server. 

**Getting your API token:**
1. Sign up at [https://www.fetchserp.com](https://www.fetchserp.com)
2. New users automatically receive **250 free credits** to get started
3. Your API token will be available in your dashboard

Set the token as an environment variable:
```bash
export FETCHSERP_API_TOKEN="your_token_here"
```

## Error Handling

The server includes comprehensive error handling:
- Missing API token validation
- API response error handling
- Input validation
- Proper MCP error responses


## Docker deploy

```
docker build --platform=linux/amd64 -t olivier86/fetchserp-mcp-server-node:latest --push .

docker run -p 8000:8000 olivier86/fetchserp-mcp-server-node:latest
```

## To start tunneling
```
nohup ngrok http 8000 --domain guinea-dominant-jolly.ngrok-free.app > /var/log/ngrok.log 2>&1 &
```