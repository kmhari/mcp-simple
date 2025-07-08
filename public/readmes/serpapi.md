# SerpApi MCP Server

[![Build](https://github.com/ilyazub/serpapi-mcp-server/actions/workflows/python-package.yml/badge.svg)](https://github.com/ilyazub/serpapi-mcp-server/actions/workflows/python-package.yml)

Build an MCP server that:

- Get parsed search engines results pages via SerpApi using an API key, *fast*

This MCP (Model Context Protocol) server integrates with [SerpApi](https://serpapi.com) to perform searches across various search engines and retrieve both live and archived results. It exposes tools and resources for seamless interaction with MCP clients or hosts, such as Grok or Claude for Desktop.

---

## Installation

To set up the SerpApi MCP server, install the required Python libraries:

```bash
pip install mcp serpapi python-dotenv
```

You’ll also need a [SerpApi API key](https://serpapi.com/manage-api-key). Sign up at SerpApi to get one.

## Quick Start

1. Save the Server Code: Place the server code in a file, e.g., server.py.

2. Configure the API Key: Create a .env file in the same directory with your SerpApi API key:
```plaintext
SERPAPI_API_KEY=your_api_key_here
```

3. Run the Server: Start the server with:

```bash
python server.py
```

4. Integrate with an MCP Client: Connect the server to an MCP client or host (e.g., Claude for Desktop). For Claude, update Claude_desktop_config.json:

```json
{
  "mcpServers": {
    "serpapi": {
      "command": "python",
      "args": ["path/to/server.py"]
    }
  }
}
```

Restart the client to load the server.

## Features
- Supported Engines: Google, Google Light, Bing, Walmart, Yahoo, eBay, YouTube, DuckDuckGo, Yandex, Baidu

- **Tools**:
* search: Perform a search on a specified engine with a query and optional parameters.


- **Resources**:
* locations: Find Google Locations.

## Usage Examples

These examples assume an MCP client (e.g., written in Python using the MCP client SDK) is connected to the server.
Listing Supported Engines
Retrieve the list of supported search engines:

```python

engines = await session.read_resource("locations")
print(engines)
```

Performing a Search
Search for "coffee" on Google with a location filter:

```python

result = await session.call_tool("search", {
    "query": "coffee",
    "engine": "google",
    "location": "Austin, TX"
})
```
print(result)

## Configuration
API Key: Set your SerpApi API key in the `.env` file as `SERPAPI_API_KEY`.

### Running the Server

Production Mode: Launch the server with:
```bash

python server.py
```

Development Mode: Use the MCP Inspector for debugging:

```bash
mcp dev server.py
```

## Testing

Test the server using the MCP Inspector or an MCP client. For Claude for Desktop, configure the server in `Claude_desktop_config.json`, restart the app, and use the hammer icon to explore and test available tools.

