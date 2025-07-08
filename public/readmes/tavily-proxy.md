# Tavily MCP Server with Proxy Support

A Model Context Protocol server that provides AI-powered web search capabilities using Tavily's search API, with added support for HTTP/HTTPS proxy configurations. This server enables LLMs to perform sophisticated web searches through proxy servers, get direct answers to questions, and search recent news articles with AI-extracted relevant content.

## Features

- All original Tavily MCP Server features
- HTTP/HTTPS proxy support through environment variables
- Enhanced logging for proxy configurations
- Robust error handling for proxy-related issues

## Available Tools

- `tavily_web_search` - Performs comprehensive web searches with AI-powered content extraction.
    - `query` (string, required): Search query
    - `max_results` (integer, optional): Maximum number of results to return (default: 5, max: 20)
    - `search_depth` (string, optional): Either "basic" or "advanced" search depth (default: "basic")

- `tavily_answer_search` - Performs web searches and generates direct answers with supporting evidence.
    - `query` (string, required): Search query
    - `max_results` (integer, optional): Maximum number of results to return (default: 5, max: 20)
    - `search_depth` (string, optional): Either "basic" or "advanced" search depth (default: "advanced")

- `tavily_news_search` - Searches recent news articles with publication dates.
    - `query` (string, required): Search query
    - `max_results` (integer, optional): Maximum number of results to return (default: 5, max: 20)
    - `days` (integer, optional): Number of days back to search (default: 3)

## Installation

### Use `pip`

```bash
pip install mcp-tavily-proxy
```

or if you have `uv` installed:

```bash
uv pip install mcp-tavily-proxy
```

### Build from Source

Clone this repository and build and install the program:

```bash
git clone https://github.com/tulong66/mcp-tavily-proxy.git
cd mcp-tavily-proxy
uv build
uv pip install .
```

## Configuration

### API Key and Proxy Settings

The server requires a Tavily API key and supports proxy configuration through environment variables:

1. Set required environment variables:
```bash
# Tavily API Key
export TAVILY_API_KEY=your_api_key_here

# Proxy Settings (if needed)
export HTTP_PROXY=http://your-proxy:port
export HTTPS_PROXY=http://your-proxy:port
```

2. Or provide API key as a command-line argument:
```bash
python -m mcp_server_tavily --api-key=your_api_key_here
```

### Configure for Claude.app

Add to your Claude settings:

```json
{
  "mcpServers": {
    "tavily": {
      "command": "python",
      "args": ["-m", "mcp_server_tavily"]
    },
    "env": {
      "TAVILY_API_KEY": "your_api_key_here",
      "HTTP_PROXY": "http://your-proxy:port",
      "HTTPS_PROXY": "http://your-proxy:port"
    }
  }
}
```

## Examples

For a regular search:
```
Tell me about Anthropic's newly released MCP protocol
```

To generate a report with explicit exclusions:
```
Tell me about redwood trees. Please use MLA format in markdown syntax and include the URLs in the citations. Exclude Wikipedia sources.
```

For news search:
```
Give me the top 10 AI-related news in the last 5 days
```

## Debugging

Enable debug logging to see detailed proxy configuration information:

```bash
export TAVILY_LOG_LEVEL=DEBUG
python -m mcp_server_tavily
```

You can also use the MCP inspector:

```bash
npx @modelcontextprotocol/inspector python -m mcp_server_tavily
```

## Contributing

Contributions are welcome! Please feel free to submit pull requests to help improve the proxy support or add new features.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

This project is based on the original [mcp-tavily](https://github.com/RamXX/mcp-tavily) with added proxy support functionality.