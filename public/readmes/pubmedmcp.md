# PubMed MCP

A MCP server that allows to search and fetch articles from PubMed.

PubMed is a database of over 35 million citations for biomedical literature from MEDLINE, life science journals, and online books.

This MCP server relies on the [pubmedclient](https://github.com/grll/pubmedclient) Python package to perform the search and fetch operations.

## Usage

Add the following to your `claude_desktop_config.json` file:

```json
{
    "mcpServers": {
        "pubmedmcp": {
            "command": "uvx",
            "args": ["pubmedmcp@latest"],
            "env": {
                "UV_PRERELEASE": "allow",
                "UV_PYTHON": "3.12"
            }
        }
    }
}
```

Make sure uv is installed on your system and 'uvx' is available in your PATH (claude PATH sometimes is not the same as your system PATH).
You can add a PATH key in your `claude_desktop_config.json` file to make sure uv is available in claude PATH.