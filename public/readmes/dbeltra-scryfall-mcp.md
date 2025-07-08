![Tests](https://github.com/dbeltra/scryfall-mcp/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/dbeltra/scryfall-mcp/branch/main/graph/badge.svg)](https://codecov.io/gh/dbeltra/scryfall-mcp)


# MCP Server – Scryfall API Interface

This is an [MCP](https://modelcontextprotocol.io/) server that interfaces with the [Scryfall API](https://scryfall.com/docs/api) to fetch and display detailed Magic: The Gathering card data. It supports searching cards by name, color, type, and text content.

## Features

- Search MTG cards via Scryfall by:
  - Card name
  - Color(s)
  - Type line
  - Oracle text
- Detailed card data output:
  - Oracle text, mana cost, colors
  - Type, power/toughness, rarity
  - Set name
  - Prices in USD/EUR (regular and foil)

## Project Setup

This project uses [`uv`](https://github.com/astral-sh/uv) for Python environment and dependency management. All dependencies are declared in `pyproject.toml`.

### Requirements

- Python 3.12+
- [uv](https://github.com/astral-sh/uv) (install with `cargo install uv`)

### Installation

```bash
uv venv
source .venv/bin/activate  # or `.venv/Scripts/activate` on Windows
uv pip install -r pyproject.toml
```

### Running the project

Running the project with `uv run scryfall.py "Atraxa"` should display the scryfall results for the Atraxa card in the console, however this is intended to be ran by an MCP host, like Claude Desktop.

### Integration with Claude Desktop

Claude Desktop can run the MCP server to interact with the Scryfall API and use the results. You need to install or update to the latest [Claude](https://claude.ai/download) version and create the `claude_desktop_config.json` file if it doesn't exist yet:

`~/Library/Application\ Support/Claude/claude_desktop_config.json` in MacOS
`$env:AppData\Claude\claude_desktop_config.json` in Windows

```json
{
    "mcpServers": {
        "scryfall": {
            "command": "/ABSOLUTE/PATH/TO/BIN/uv",
            "args": [
                "--directory",
                "/ABSOLUTE/PATH/TO/mcp-server",
                "run",
                "scryfall.py"
            ]
        }
    }
}
```

## Testing

This project uses [pytest](https://pytest.org) for unit testing. Tests are located in the `tests/` directory.

### Running Tests
To run the full test suite:

```bash
pytest
```

To run a specific test:

```bash
pytest tests/test_scryfall.py::test_get_cards_no_query
```

