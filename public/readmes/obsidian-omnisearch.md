# MCP Server Obsidian Omnisearch

[![smithery badge](https://smithery.ai/badge/@anpigon/mcp-server-obsidian-omnisearch)](https://smithery.ai/server/@anpigon/mcp-server-obsidian-omnisearch)
A FastMCP-based server that provides Obsidian vault search functionality through a REST API interface.

## Overview

This project implements a search service that allows you to search through Obsidian vault notes programmatically. It uses FastMCP to expose the search functionality as a tool that can be integrated with other services.

## Features

- Search through Obsidian vault notes
- REST API integration
- Returns absolute paths to matching notes
- Easy integration with FastMCP tools

## Prerequisites

- Python 3.x
- Obsidian with Omnisearch plugin installed and running
- FastMCP library
- Active Obsidian vault

## Installation

### Installing via Smithery

To install MCP Server Obsidian Omnisearch for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@anpigon/mcp-server-obsidian-omnisearch):

```bash
npx -y @smithery/cli install @anpigon/mcp-server-obsidian-omnisearch --client claude
```

### Manual Installation
1. Clone the repository:
```bash
git clone https://github.com/anpigon/mcp-server-obsidian-omnisearch.git
cd mcp-server-obsidian-omnisearch
```

2. Install dependencies:
```bash
uv install
```

## Configuration

The Obsidian vault path is now provided as a command line argument when running the server:

```bash
python server.py /path/to/your/obsidian/vault
```

## Usage

### Obsidian Omnisearch API

You need the Obsidian Omnisearch community plugin running: https://publish.obsidian.md/omnisearch/Inject+Omnisearch+results+into+your+search+engine

### Claude Desktop

On MacOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`

On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

<details>
  <summary>Development/Unpublished Servers Configuration</summary>

```json
{
  "mcpServers": {
    "obsidian-omnisearch": {
      "command": "uv",
      "args": [
        "--directory",
        "<dir_to>/mcp-server-obsidian-omnisearch",
        "run",
        "mcp-server-obsidian-omnisearch",
        "/path/to/your/obsidian/vault"
      ]
    }
  }
}
```
</details>

<details>
  <summary>Published Servers Configuration</summary>

```json
{
  "mcpServers": {
    "obsidian-omnisearch": {
      "command": "uvx",
      "args": [
        "mcp-server-obsidian-omnisearch",
        "/path/to/your/obsidian/vault"
      ]
    }
  }
}
```
</details>

## API Reference

### Search Notes
- Function: `obsidian_notes_search(query: str)`
- Description: Searches Obsidian notes and returns absolute paths to matching notes
- Parameters:
  - `query`: Search query string
- Returns: List of absolute paths to matching notes

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
npx @modelcontextprotocol/inspector uv --directory /path/to/mcp-server-obsidian-omnisearch run mcp-server-obsidian-omnisearch
```

Upon launching, the Inspector will display a URL that you can access in your browser to begin debugging.

You can also watch the server logs with this command:

```bash
tail -n 20 -f ~/Library/Logs/Claude/mcp-server-mcp-server-obsidian-omnisearch.log
```

## Dependencies

- FastMCP
- requests
- urllib

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
