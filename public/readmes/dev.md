# MCP Development Server

A Model Context Protocol (MCP) server that enables Claude to manage software development projects, providing complete project context awareness and handling code execution through Docker environments.

## Features

### Core Infrastructure
- Project context management
- File system operations
- Template-based project creation
- Git integration

### Requirements
- Python 3.12 or higher
- Docker
- Git

## Installation

```bash
# Using pip
pip install mcp-dev-server

# Development installation
git clone https://github.com/your-org/mcp-dev-server.git
cd mcp-dev-server
pip install -e .
```

## Configuration

### Claude Desktop Configuration

Add to your Claude Desktop configuration file:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "dev": {
      "command": "mcp-dev-server",
      "args": []
    }
  }
}
```

## Usage

The server provides several MCP capabilities:

### Resources
- Project structure and files
- Build status and artifacts
- Test results
- Docker container status

### Tools
- Project initialization
- Build operations
- Test execution
- Docker commands

### Prompts
- Project analysis
- Development suggestions
- Error diagnosis

## Development

### Setting up development environment

```bash
# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -e ".[dev]"
```

### Running tests

```bash
pytest tests/
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.