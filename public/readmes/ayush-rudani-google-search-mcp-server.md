# Google Search MCP Server

An MCP server implementation that integrates with Google's Custom Search JSON API, providing web search capabilities.

## Features

- **Web Search**: Search Google with comprehensive query options
- **Advanced Filtering**: Control results by date, language, country, and safe search level
- **Rate Limited**: Built-in rate limiting to prevent API quota exhaustion
- **Structured Results**: Returns formatted search results with titles, URLs, and snippets

## Tools

- **google_search**
  - Execute Google searches with advanced filtering options
  - Inputs:
    - `query` (string): Search terms (required)
    - `num_results` (number, optional): Number of results (1-10, default: 5)
    - `date_restrict` (string, optional): Filter by date (e.g., "d1" for last day)
    - `language` (string, optional): 2-letter language code (e.g., "en")
    - `country` (string, optional): 2-letter country code (e.g., "us")
    - `safe_search` (string, optional): Safety level ("off", "medium", "high")

## Configuration

### Getting API Keys

1. Create a Google Cloud project at [Google Cloud Console](https://console.cloud.google.com/)
2. Activate the Custom Search JSON API for your project via the [API dashboard](https://console.cloud.google.com/apis/api/customsearch.googleapis.com)
3. Generate an API key either through the Credentials section or following the [Custom Search API guide](https://developers.google.com/custom-search/v1/overview)
4. Obtain a Search Engine ID by setting up a custom search engine in [Google's Programmable Search](https://programmablesearchengine.google.com/)

### Environment Variables

Set these before running the server:

```bash
export GOOGLE_API_KEY="your-api-key"
export GOOGLE_SEARCH_ENGINE_ID="your-search-engine-id"
```

## Running from Local Repository

To run the server directly from source:

1. **Clone the repository**

   ```bash
    git clone https://github.com/ayush-rudani/google-search-mcp-server.git
    cd google-search-mcp-server
   ```

2. **Install dependencies**

   ```bash
    pnpm install
    # or
    npm install
   ```

3. **Build the project**

   ```bash
    pnpm run build
    # or
    npm run build
   ```

4. **Configure Claude Desktop**
   Update your `claude_desktop_config.json`:

   ```json
   {
     "mcpServers": {
       "google-search": {
         "command": "/path/to/node", // <--- Important to add the following, run in your terminal `echo "$(which node)"` to get the path
         "args": ["/full/path/to/google-search-mcp/index.js"],
         "env": {
           "GOOGLE_API_KEY": "your-api-key",
           "GOOGLE_SEARCH_ENGINE_ID": "your-search-engine-id"
         }
       }
     }
   }
   ```

   - Replace `/path/to/node` with the complete path to your Node.js executable (you can locate this by running the command `which node` in your terminal)

5. **Test the server**
   ```bash
    export GOOGLE_API_KEY=your_api_key_here
    export GOOGLE_SEARCH_ENGINE_ID=your_engine_id_here
    node dist/index.js
   ```

## Rate Limits

The server enforces a rate limit of 10 requests per minute by default to prevent exceeding Google's API quotas. You can adjust this in the code if needed.

## License

This MCP server is licensed under the MIT License. See the LICENSE file for details.
