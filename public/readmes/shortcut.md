# Shortcut MCP Server

> [!WARNING]
> This is a WIP server and might not work as intended.

A Model Context Protocol (MCP) server for interacting with Shortcut (formerly Clubhouse).

## Features

- View projects, stories, epics, and objectives
- Search through stories
- Create new stories, epics, and objectives
- Safe operations only (no updates or deletions)

## Setup

1. Install Python with asdf:

```bash
asdf install
```

2. Create virtual environment and install dependencies:

```bash
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uv pip install -e .  # Install package in editable mode
```

3. Set up your environment:

```bash
cp .env.example .env
# Edit .env and add your Shortcut API token
```

4. Run the server:

```bash
python -m shortcut_mcp
```

## Project Structure

```
shortcut-mcp/
├── src/
│   └── shortcut_mcp/      # Main package directory
│       ├── __init__.py    # Package initialization
│       ├── __main__.py    # Entry point
│       └── server.py      # Server implementation
├── pyproject.toml         # Project configuration
├── .tool-versions         # ASDF version configuration
├── .pylintrc             # Pylint configuration
└── README.md
```

## Using with Claude Desktop

Add this to your Claude Desktop config:

On MacOS (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "shortcut": {
      "command": "python",
      "args": ["-m", "shortcut_mcp"],
      "env": {
        "SHORTCUT_API_TOKEN": "your_token_here"
      }
    }
  }
}
```

On Windows (`%AppData%\Claude\claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "shortcut": {
      "command": "python",
      "args": ["-m", "shortcut_mcp"],
      "env": {
        "SHORTCUT_API_TOKEN": "your_token_here"
      }
    }
  }
}
```

## Testing

You can test the server using the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector python -m shortcut_mcp
```

## Safety Features

This server implements read-only operations with safe creation capabilities:

- Only allows GET (read) and POST (create) operations
- No modification or deletion of existing data
- All operations are attributed to the API token owner

## Development

### Python Version Management

This project uses [asdf](https://asdf-vm.com/) for Python version management. The required Python version is specified in `.tool-versions`.

```bash
# Install Python with asdf
asdf install python

# The correct version will be automatically selected based on .tool-versions
```

### Code Quality

We use pylint for code quality checks. Run it with:

```bash
pylint src/shortcut_mcp
```

The configuration for pylint is in `.pylintrc`.

