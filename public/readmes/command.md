# MCP Command Server

A secure Model Context Protocol (MCP) server for executing system commands through LLM applications like Claude.

## Quick Start

1. Install the package:

```bash
uv pip install mcp-command-server
```

2. Configure allowed commands:

```bash
export ALLOWED_COMMANDS="ls,pwd,echo"
```

3. Add to Claude Desktop configuration:

```json
{
  "mcpServers": {
    "command-server": {
      "command": "uv",
      "args": ["run", "python", "-m", "mcp_command_server"],
      "env": {
        "ALLOWED_COMMANDS": "ls,pwd,echo"
      }
    }
  }
}
```

## Features

- 🔒 Secure command execution with whitelist
- ✅ User confirmation for all commands
- 📝 Comprehensive audit logging
- 🔍 Input validation and sanitization
- 🤖 Claude Desktop integration

## Documentation

For complete documentation, see the [docs/](./docs/README.md) directory:

- [Installation Guide](./docs/installation.md)
- [Security Guidelines](./docs/security.md)
- [API Reference](./docs/api.md)
- [Usage Examples](./docs/examples.md)
- [Troubleshooting](./docs/troubleshooting.md)

## Development

### Setup

```bash
# Clone repository
git clone https://github.com/yourusername/mcp-command-server.git
cd mcp-command-server

# Create virtual environment
uv venv
source .venv/bin/activate  # On Unix/macOS
.venv\Scripts\activate     # On Windows

# Install development dependencies
uv pip install -e ".[dev]"
```

### Testing

```bash
# Run all tests
pytest

# Run specific test file
pytest tests/unit/security/test_validator.py

# Run with coverage
pytest --cov=mcp_command_server
```

### Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests and linting
4. Submit a pull request

## License

MIT License - see [LICENSE](./LICENSE) for details.
