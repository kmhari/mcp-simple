# MCP Ollama

A Model Context Protocol (MCP) server for integrating Ollama with Claude Desktop or other MCP clients.

<a href="https://glama.ai/mcp/servers/h0t3210s62"><img width="380" height="200" src="https://glama.ai/mcp/servers/h0t3210s62/badge" alt="Ollama Server MCP server" /></a>

## Requirements

- Python 3.10 or higher
- Ollama installed and running (https://ollama.com/download)
- At least one model pulled with Ollama (e.g., `ollama pull llama2`)

### Configure Claude Desktop

Add to your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS, `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "ollama": {
      "command": "uvx",
      "args": [
        "mcp-ollama"
      ]
    }
  }
}
```

### Development

Install in development mode:
```bash
git clone https://github.com/yourusername/mcp-ollama.git
cd mcp-ollama
uv sync
```

Test with MCP Inspector:
```bash
mcp dev src/mcp_ollama/server.py
```

## Features

The server provides four main tools:
- `list_models` - List all downloaded Ollama models
- `show_model` - Get detailed information about a specific model
- `ask_model` - Ask a question to a specified model

## License

MIT
