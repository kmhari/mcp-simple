# mcp-duckduckgo-search

---

## ⚠️ Notice

**This repository is no longer maintained.**

The functionality of this tool is now available in [mcp-omnisearch](https://github.com/spences10/mcp-omnisearch), which combines multiple MCP tools in one unified package.

Please use [mcp-omnisearch](https://github.com/spences10/mcp-omnisearch) instead.

---

A Model Context Protocol (MCP) server for integrating DuckDuckGo
search capabilities with LLMs. This server provides comprehensive web
search functionality with support for various result types and
filtering options.

<a href="https://glama.ai/mcp/servers/v99lwtriyk">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/v99lwtriyk/badge" />
</a>

## Features

- 🔍 Comprehensive web search using DuckDuckGo's search engine
- 📊 Rich result types including:
  - Knowledge graph information
  - Organic search results
  - News articles
  - Video content
  - Image results
  - Related searches
- 🌍 Region-specific search support
- 🛡️ Configurable safe search levels
- 📅 Date-based filtering options
- 📄 Pagination support
- 💾 Built-in result caching
- 🔒 Safe search options (off, moderate, strict)

## Configuration

This server requires configuration through your MCP client. Here are
examples for different environments:

### Cline Configuration

Add this to your Cline MCP settings:

```json
{
	"mcpServers": {
		"mcp-duckduckgo-search": {
			"command": "npx",
			"args": ["-y", "mcp-duckduckgo-search"],
			"env": {
				"SERPAPI_KEY": "your-serpapi-api-key"
			}
		}
	}
}
```

### Claude Desktop with WSL Configuration

For WSL environments, add this to your Claude Desktop configuration:

```json
{
	"mcpServers": {
		"mcp-duckduckgo-search": {
			"command": "wsl.exe",
			"args": [
				"bash",
				"-c",
				"source ~/.nvm/nvm.sh && SERPAPI_KEY=your-serpapi-api-key /home/username/.nvm/versions/node/v20.12.1/bin/npx mcp-duckduckgo-search"
			]
		}
	}
}
```

### Environment Variables

The server requires the following environment variable:

- `SERPAPI_KEY`: Your SerpAPI key (required)

## API

The server implements a single MCP tool with configurable parameters:

### ddg_search

Perform web searches using the DuckDuckGo search engine.

Parameters:

- `query` (string, required): Search query
- `region` (string, optional): Region code (e.g., us-en, uk-en)
  (default: us-en)
- `safe_search` (string, optional): Safe search level (off, moderate,
  strict) (default: moderate)
- `date_filter` (string, optional): Filter results by date:
  - 'd': past day
  - 'w': past week
  - 'm': past month
  - 'y': past year
  - Custom range: '2023-01-01..2023-12-31'
- `start` (number, optional): Result offset for pagination
- `no_cache` (boolean, optional): Bypass cache for fresh results
  (default: false)

Response includes:

- Knowledge graph data when available
- Organic search results
- News articles
- Video content
- Image results
- Related searches
- Search metadata

## Development

### Setup

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Build the project:

```bash
pnpm build
```

4. Run in development mode:

```bash
pnpm dev
```

### Publishing

The project uses changesets for version management. To publish:

1. Create a changeset:

```bash
pnpm changeset
```

2. Version the package:

```bash
pnpm changeset version
```

3. Publish to npm:

```bash
pnpm release
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built on the
  [Model Context Protocol](https://github.com/modelcontextprotocol)
- Powered by [DuckDuckGo](https://duckduckgo.com) through
  [SerpAPI](https://serpapi.com)
