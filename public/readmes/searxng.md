# SearXNG MCP Server

A [Model Control Protocol (MCP)](https://github.com/microsoft/modelcontrol) server for [SearXNG](https://github.com/searxng/searxng), allowing AI assistants to search the web through a SearXNG instance.

## Features

- Search the web using SearXNG via simple API calls
- Get information about available search engines
- Configure search parameters including categories, languages, and safe search settings

## Usage in MCP Configuration

```json
 "searxng-mcp-server": {
      "command": "uv",
      "args": [
        "run",
        "https://raw.githubusercontent.com/maccam912/searxng-mcp-server/refs/heads/main/server.py",
        "--url",
        "https://searxng.example.com"
      ]
    }
```

## Docker Usage

You can run this MCP server using Docker:

```bash
# Build the Docker image
docker build -t searxng-mcp-server .

# Run the container
# Replace https://searxng.example.com with your actual SearXNG instance URL
docker run -p 8080:8080 searxng-mcp-server
```

## API Tools

### Search

```python
def search(query: str, categories: Optional[str] = None, engines: Optional[str] = None, 
           language: Optional[str] = None, page: int = 1, time_range: Optional[str] = None,
           safe_search: int = 1)
```

### Get Available Engines

```python
def get_available_engines()
```

## Local Development

Requirements:
- Python 3.11+
- uv (Python package manager)

```bash
# Install dependencies
uv sync

# Run the server
uv run server.py --url https://searxng.example.com
```
