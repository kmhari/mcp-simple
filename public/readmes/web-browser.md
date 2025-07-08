[![Twitter Follow](https://img.shields.io/twitter/follow/JoeBlazick?style=social)](https://twitter.com/JoeBlazick)
[![smithery badge](https://smithery.ai/badge/web-browser-mcp-server)](https://smithery.ai/server/web-browser-mcp-server)
[![Python Version](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PyPI Downloads](https://img.shields.io/pypi/dm/web-browser-mcp-server.svg)](https://pypi.org/project/web-browser-mcp-server/)
[![PyPI Version](https://img.shields.io/pypi/v/web-browser-mcp-server.svg)](https://pypi.org/project/web-browser-mcp-server/)

<a href="https://glama.ai/mcp/servers/3hphahzvql"><img width="380" height="200" src="https://glama.ai/mcp/servers/3hphahzvql/badge" alt="web-browser-mcp-server MCP server" /></a>

## ✨ Features

> 🌐 Enable AI assistants to browse and extract content from the web through a simple MCP interface.

The Web Browser MCP Server provides AI models with the ability to browse websites, extract content, and understand web pages through the Message Control Protocol (MCP). It enables smart content extraction with CSS selectors and robust error handling.

<div align="center">
  
🤝 **[Contribute](https://github.com/blazickjp/web-browser-mcp-server/blob/main/CONTRIBUTING.md)** • 
📝 **[Report Bug](https://github.com/blazickjp/web-browser-mcp-server/issues)**

</div>

## ✨ Core Features

- 🎯 **Smart Content Extraction**: Target exactly what you need with CSS selectors
- ⚡ **Lightning Fast**: Built with async processing for optimal performance
- 📊 **Rich Metadata**: Capture titles, links, and structured content
- 🛡️ **Robust & Reliable**: Built-in error handling and timeout management
- 🌍 **Cross-Platform**: Works everywhere Python runs

## 🚀 Quick Start

### Installing via Smithery

To install Web Browser Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/web-browser-mcp-server):

```bash
npx -y @smithery/cli install web-browser-mcp-server --client claude
```

### Installing Manually
Install using uv:

```bash
uv tool install web-browser-mcp-server
```

For development:

```bash
# Clone and set up development environment
git clone https://github.com/blazickjp/web-browser-mcp-server.git
cd web-browser-mcp-server

# Create and activate virtual environment
uv venv
source .venv/bin/activate

# Install with test dependencies
uv pip install -e ".[test]"
```

### 🔌 MCP Integration

Add this configuration to your MCP client config file:

```json
{
    "mcpServers": {
        "web-browser-mcp-server": {
            "command": "uv",
            "args": [
                "tool",
                "run",
                "web-browser-mcp-server"
            ],
            "env": {
                "REQUEST_TIMEOUT": "30"
            }
        }
    }
}
```

For Development:

```json
{
    "mcpServers": {
        "web-browser-mcp-server": {
            "command": "uv",
            "args": [
                "--directory",
                "path/to/cloned/web-browser-mcp-server",
                "run",
                "web-browser-mcp-server"
            ],
            "env": {
                "REQUEST_TIMEOUT": "30"
            }
        }
    }
}
```

## 💡 Available Tools

The server provides a powerful web browsing tool:

### browse_webpage
Browse and extract content from web pages with optional CSS selectors:

```python
# Basic webpage fetch
result = await call_tool("browse_webpage", {
    "url": "https://example.com"
})

# Target specific content with CSS selectors
result = await call_tool("browse_webpage", {
    "url": "https://example.com",
    "selectors": {
        "headlines": "h1, h2",
        "main_content": "article.content",
        "navigation": "nav a"
    }
})
```

## ⚙️ Configuration

Configure through environment variables:

| Variable | Purpose | Default |
|----------|---------|---------|
| `REQUEST_TIMEOUT` | Webpage request timeout in seconds | 30 |

## 🧪 Testing

Run the test suite:

```bash
python -m pytest
```

## 📄 License

Released under the MIT License. See the LICENSE file for details.

---

<div align="center">

Made with ❤️ by the Pear Labs Team

<a href="https://glama.ai/mcp/servers/04dtxi5i5n"><img width="380" height="200" src="https://glama.ai/mcp/servers/04dtxi5i5n/badge" alt="Web Browser MCP Server" /></a>
</div>