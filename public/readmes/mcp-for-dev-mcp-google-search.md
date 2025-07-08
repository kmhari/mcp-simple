# MCP Server for Google Search

A Model Context Protocol server that provides web search capabilities using Google Custom Search API and webpage content extraction functionality.

## Tools

### Search
Perform web searches using Google Custom Search API:
- Search the entire web or specific sites
- Control number of results (1-10)
- Get structured results with title, link, and snippet

### Webpage Reader
Extract content from any webpage:
- Fetch and parse webpage content
- Extract page title and main text
- Clean content by removing scripts and styles
- Return structured data with title, text, and URL

## Installation

### Get Google API Key and Search Engine ID

1. Create a Google Cloud Project:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable billing for your project

2. Enable Custom Search API:
   - Go to [API Library](https://console.cloud.google.com/apis/library)
   - Search for "Custom Search API"
   - Click "Enable"

3. Get API Key:
   - Go to [Credentials](https://console.cloud.google.com/apis/credentials)
   - Click "Create Credentials" > "API Key"
   - Copy your API key
   - (Optional) Restrict the API key to only Custom Search API

4. Create Custom Search Engine:
   - Go to [Programmable Search Engine](https://programmablesearchengine.google.com/create/new)
   - Enter the sites you want to search (use www.google.com for general web search)
   - Click "Create"
   - On the next page, click "Customize"
   - In the settings, enable "Search the entire web"
   - Copy your Search Engine ID (cx)

### Client Configuration

To use with Claude Desktop, add the server config with your Google API credentials:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "google-search": {
      "command": "npx",
      "args": ["-y", "@mcp-for-dev/mcp-google-search"],
      "env": {
        "GOOGLE_API_KEY": "your-api-key-here",
        "GOOGLE_SEARCH_ENGINE_ID": "your-search-engine-id-here"
      }
    }
  }
}
```
