[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/hesreallyhim-mcp-server-isitdown-badge.png)](https://mseep.ai/app/hesreallyhim-mcp-server-isitdown)
[![Verified on MseeP](https://mseep.ai/badge.svg)](https://mseep.ai/app/24e83a9a-3b58-48c5-a490-04d6a631ed1e)
# mcp-server-isitdown

An MCP server that checks if a website is currently down by querying [www.isitdownrightnow.com](https://www.isitdownrightnow.com).

[![smithery badge](https://smithery.ai/badge/@hesreallyhim/mcp-server-isitdown)](https://smithery.ai/server/@hesreallyhim/mcp-server-isitdown)
<a href="https://glama.ai/mcp/servers/1wx4z4amkm">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/1wx4z4amkm/badge" alt="IsItDown Server MCP server" />
</a>

## Overview

This MCP server provides a simple tool to check if a website is experiencing downtime, and can provide some information about recent downtime events.

## Tools

The following tools are implemented:

* **`get_website_status`**: Checks if a website is currently down or not.
  * **`Input`**: `root_domain` (string): The root domain of the website to check (e.g., "example.com")
  * **`Output`**: A string message indicating whether the website is up or down, with the last recorded downtime information

## Installation

### Installing via Smithery

To install IsItDown Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@hesreallyhim/mcp-server-isitdown):

```bash
npx -y @smithery/cli install @hesreallyhim/mcp-server-isitdown --client claude
```

> **Note**: This package is not currently published to a public registry. Installation is only available from source.

### From Source

```bash
# Clone the repository 
git clone https://github.com/yourusername/mcp-server-isitdown.git
cd mcp-server-isitdown

# Using uv (recommended)
uv pip install -e .

# Using pip
pip install -e .
```

## Configuration for Claude Desktop

Add this configuration to your `claude_desktop_config.json` file:

```json
"isitdown": {
  "command": "/path/to/uv",
  "args": [
    "--directory",
    "/path/to/cloned/repo/src",
    "run",
    "mcp_server_isitdown"
  ]
}
```

## Usage

### Run as a standalone MCP server

```bash
# Using the installed script
mcp-server-isitdown

# Using the Python module
python -m mcp_server_isitdown
```

### Example usage with Claude for Dekstop:

* "Is wikipedia down right now?"
* "When was the last time reddit was down?"

### Use as a library

```python
from mcp_server_isitdown.server import get_website_status

# Check if a website is down (async function)
async def check_website():
    result = await get_website_status("example.com")
    print(result)  # Prints status message with up/down status
```

## Development

```bash
# Type checking
uvx mypy .

# Run all pre-commit hooks
uv pre-commit run --all-files

# Install in development mode
uv pip install -e ".[dev]"

# Run the Inspector
mcp dev src/mcp_server_isitdown/server.py
```

## Build

```bash
# Build the package
uv build

# Install the built package
uv pip install dist/mcp_isitdown_service-*.whl
```

## License

MIT
