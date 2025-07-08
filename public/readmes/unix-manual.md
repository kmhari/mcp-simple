# Unix Manual Server (MCP)

An MCP server that provides Unix command documentation directly within Claude conversations.

## Features

- **Get command documentation**: Retrieve help pages, man pages, and usage information for Unix commands
- **List common commands**: Discover available commands on your system, categorized by function
- **Check command existence**: Verify if a specific command is available and get its version information

## Installation

### Prerequisites

- Python 3.13+
- [Claude Desktop](https://claude.ai/download) or any MCP-compatible client

### Setup

1. Clone this repository
2. Install the package:

```bash
pip install -e .
# or
uv install -e .
```

3. Install the server in Claude Desktop:

```bash
mcp install unix_manual_server.py
# uv
uv run mcp install unix_manual_server.py
```

## Usage

Once installed, you can use the server's tools directly in Claude:

### Get command documentation

```
I need help with the grep command. Can you show me the documentation?
```

### List common commands

```
What Unix commands are available on my system?
```

### Check if a command exists

```
Is the awk command available on my system?
```

## Development

To test the server locally without installing it in Claude:

```bash
mcp dev unix_manual_server.py
```

## Security

The server takes precautions to prevent command injection by:
- Validating command names against a regex pattern
- Executing commands directly without using shell
- Setting timeouts on all command executions
- Only checking for documentation, never executing arbitrary commands

## Logging

Logs are saved to `unix-manual-server.log` in the same directory as the script, useful for debugging.

- use `@modelcontextprotocol/inspector` with `npx` under the hood.

```zsh
uv run mcp dev unix_manual_server.py
```

```
npx @modelcontextprotocol/inspector uv run unix_manual_server.py
```

## License

MIT

---

*Created with the MCP Python SDK. For more information about MCP, visit [modelcontextprotocol.io](https://modelcontextprotocol.io).*
