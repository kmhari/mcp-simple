# News MCP Server

This is a **FastMCP** server that provides news articles using the [NewsAPI.org](https://newsapi.org/) service.

It exposes a tool `get_news()` to fetch news based on search query, date range, and news source.

---

## Features

- Search news articles by **keyword** (`q`).
- Filter by **date range** (`from`, `to`).
- Filter by specific **news source** (`sources`, default: `abc-news`).

## Configuration
Getting an API Key from [NewsAPI.org](https://newsapi.org/) 

### Usage with Claude Desktop
Add this to your claude_desktop_config.json:

```
{
    "mcpServers": {
        "news": {
            "command": "uv",
            "args": [
                "--directory",
                "/PATH/TO/YOUR/news",
                "run",
                "news.py"
            ]
        },
    }
}
```