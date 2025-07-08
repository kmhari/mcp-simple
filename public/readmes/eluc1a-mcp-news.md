# news-mcp MCP server

mcp news server

## Components

### Resources

The server exposes news articles stored in a database via a resource URI:
- `news://{category}/{limit}`: Retrieves a list of the latest articles for a given category.
  - `{category}`: Filters articles by category (e.g., `tech`, `data_science`, `news`). See tool description for full list.
  - `{limit}` (optional, default 10): Specifies the maximum number of articles to return.
- Each returned article includes title, link, published date, and source.

### Prompts

The server currently does not expose any prompts. (The summarization logic exists internally but is not available via an MCP prompt).

### Tools

The server implements one tool:
- `summarize_news`: Retrieves raw news articles from the database, allowing the client (LLM) to summarize them.
  - Takes optional `category` (string) and `limit` (integer, default 20) arguments.
  - Returns a list of article dictionaries, each containing `id`, `title`, `link`, `published`, `source`, and `content`.
  - Available categories: `tech`, `data_science`, `llm_tools`, `cybersecurity`, `linux`, `audio_dsp`, `startups`, `news`, `science`, `research`, `policy`.

## Configuration

The server relies on a PostgreSQL database configured via the `DATABASE_URL` environment variable (defaults to `postgresql://localhost/mcp_news`).

The `news_gatherer.py` script (intended to be run separately/scheduled) populates the database from various RSS feeds.

Summarization logic (internal, not exposed via MCP) uses the OpenAI API, configured via the `OPENAI_API_KEY` environment variable.

Other configurations (via environment variables or defaults):
- `LOOKBACK_HOURS`: How far back `news_gatherer.py` looks for new articles (default: 6).
- `SUMMARY_WORD_TARGET`: Target word count for internal summarization (default: 500).
- `MAX_ARTICLES_PER_SUMMARY`: Maximum articles included in one summary batch (default: 25).
- `KEYWORD_FILTER`: Keywords used by internal summarization logic.

## Quickstart

### Install

#### Claude Desktop

On MacOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

<details>
  <summary>Development/Unpublished Servers Configuration</summary>
  ```
  "mcpServers": {
    "news-mcp": {
      "command": "uv",
      "args": [
        "--directory",
        "~/dev/news-mcp",
        "run",
        "news-mcp"
      ]
    }
  }
  ```
</details>

<details>
  <summary>Published Servers Configuration</summary>
  ```
  "mcpServers": {
    "news-mcp": {
      "command": "uvx",
      "args": [
        "news-mcp"
      ]
    }
  }
  ```
</details>

## Development

### Building and Publishing

To prepare the package for distribution:

1. Sync dependencies and update lockfile:
```bash
uv sync
```

2. Build package distributions:
```bash
uv build
```

This will create source and wheel distributions in the `dist/` directory.

3. Publish to PyPI:
```bash
uv publish
```

Note: You'll need to set PyPI credentials via environment variables or command flags:
- Token: `--token` or `UV_PUBLISH_TOKEN`
- Or username/password: `--username`/`UV_PUBLISH_USERNAME` and `--password`/`UV_PUBLISH_PASSWORD`

### Debugging

Since MCP servers run over stdio, debugging can be challenging. For the best debugging
experience, we strongly recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector).


You can launch the MCP Inspector via [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) with this command:

```bash
npx @modelcontextprotocol/inspector uv --directory ~/dev/news-mcp run news-mcp 
```


Upon launching, the Inspector will display a URL that you can access in your browser to begin debugging.