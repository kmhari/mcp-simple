# Didlogic MCP Server

A Model Context Protocol (MCP) server implementation for the Didlogic API. This server allows Large Language Models (LLMs) to interact with Didlogic services through a standardized interface.

## Features

- Full access to Didlogic API through MCP tools
- Specialized prompts for common operations
- Balance management tools
- SIP account (sipfriends) management
- IP restriction management
- Purchases management
- Call hisory access
- Transaction history access

## Installation

### Using uv (recommended)

When using [`uv`](https://docs.astral.sh/uv/) no specific installation is needed. We will
use [`uvx`](https://docs.astral.sh/uv/guides/tools/) to directly run *didlogic_mcp*.

### Using PIP

Alternatively you can install `didlogic_mcp` via pip:

```bash
pip install didlogic_mcp
```

After installation, you can run it as a script using:

```bash
DIDLOGIC_API_KEY=YOUR_DIDLOGIC_KEY python -m didlogic_mcp
```

## Configuration

### Configure for Claude.app

Add to your Claude settings:

#### Using uvx

```json
"mcpServers": {
  "didlogic": {
    "command": "uvx",
    "args": ["didlogic_mcp"],
    "env": {
      "DIDLOGIC_API_KEY": "YOUR_DIDLOGIC_KEY"
    }
  }
}
```

#### Using pip installation

```json
"mcpServers": {
  "didlogic": {
    "command": "python",
    "args": ["-m", "didlogic_mcp"],
    "env": {
      "DIDLOGIC_API_KEY": "YOUR_DIDLOGIC_KEY"
    }
  }
}
```

## License

MIT
