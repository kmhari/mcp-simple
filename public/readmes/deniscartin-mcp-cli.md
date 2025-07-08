# MCP CLI, GUI & API - Model Context Protocol Client

A comprehensive toolkit for interacting with Model Context Protocol (MCP) servers. This project provides both a graphical user interface and command-line tools for managing MCP servers, running queries against them using OpenAI models, and discovering available tools.

## What is Model Context Protocol?

The Model Context Protocol (MCP) is an open standard for exposing tools and capabilities to large language models (LLMs). It enables LLMs to access external tools like web browsers, databases, and APIs in a standardized way. This project provides a client implementation that makes it easy to:

- Connect to MCP-compatible servers
- Manage multiple server configurations
- Run natural language queries that leverage MCP tool capabilities
- Explore available tools and their functionality

## Project Components

This project consists of three main components:

1. **Command-Line Interface (CLI)**: For managing servers and running queries in a terminal
2. **Graphical User Interface (GUI)**: A PyQt5-based desktop application for visual interaction
3. **API Server**: A RESTful API that exposes MCP CLI functionality via HTTP, enabling integration with web applications and other services

## Directory Structure

```
mcp-cli-project/
├── mcp_cli/                 # Core Python package
│   ├── api/                 # RESTful API server implementation
│   │   ├── server.py        # Flask-based API server
│   │   └── README.md        # API documentation
│   ├── gui/                 # GUI implementation using PyQt5
│   ├── core.py              # Core functionality shared by CLI, implementation
├── mcpgui/                  # Web-based GUI (Next.js frontend)
│   ├── src/                 # Source code for the web interface
│   └── public/              # Static assets
├── bin/                     # Executable scripts
│   ├── mcp_gui.py           # Script to start the GUI
│   └── mcp_cli.py           # Script to run CLI commands
├── config/                  # Configuration files
│   └── config.json          # Server configurations
├── docs/                    # Documentation
└── setup.py                 # Package installation configuration
```

## Features

### Core Features

- **Server Management**: Add, remove, list, and update MCP server configurations
- **Query Execution**: Run natural language queries against MCP servers
- **Tool Discovery**: View available tools and their capabilities
- **Configuration Import/Export**: Share configurations between installations

### GUI Features

- **User-friendly Interface**: Intuitive desktop application for managing MCP servers
- **Query History**: View and reuse previous queries
- **Real-time Output**: See query results as they arrive
- **Tool Explorer**: Visual interface to browse available tools

### API Features

- **RESTful Interface**: HTTP endpoints for all MCP CLI functionality
- **JSON-based**: Consistent request/response formats
- **Cross-Platform**: Accessible from any programming language
- **Async Operations**: Handles long-running queries efficiently

## Installation

### Prerequisites

- Python 3.8+
- pip
- PyQt5 (for the GUI)
- An OpenAI API key

### Installation Steps

1. Clone this repository:
   ```bash
   git clone https://github.com/your-org/mcp-cli-project.git
   cd mcp-cli-project
   ```

2. Install the package:
   ```bash
   pip install -e .
   ```

3. Create a `.env` file in your working directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## Usage

### GUI Application

Start the graphical user interface:

```bash
# Using the installed package
mcp-gui

# Using the Python module
python -m mcp_cli

# Using the script directly
python bin/mcp_gui.py
```

### Command Line Interface

```bash
# List all configured MCP servers
mcp list

# Add a new MCP server
mcp add <name> <command> [args...] [--env KEY=VALUE...]

# Remove an MCP server
mcp remove <name>

# Get detailed information about a server
mcp info <server>

# List all tools available from a server
mcp tools <server>

# Run a query against an MCP server
mcp run <server> "<query>"

# Export configuration to a file
mcp export <filepath>

# Import configuration from a file
mcp import <filepath>
```

### API Server

Start the RESTful API server:

```bash
# Using the installed package
mcp-server

# With custom host and port
mcp-server --host 127.0.0.1 --port 8080

# In debug mode
mcp-server --debug
```

## Common Use Cases

### Web Browsing with Playwright

```bash
# Add the Playwright server
mcp add playwright npx @playwright/mcp@latest --env DISPLAY=:1

# Run a web search query
mcp run playwright "Find information about climate change solutions"
```

### Accommodation Search with Airbnb

```bash
# Add the Airbnb server
mcp add airbnb npx -y @openbnb/mcp-server-airbnb --ignore-robots-txt

# Search for accommodations
mcp run airbnb "Find a two-bedroom apartment in Paris for a week in July"
```

### Local File Access

```bash
# Add the Filesystem server
mcp add filesystem npx -y @modelcontextprotocol/server-filesystem /path/to/directory

# Work with local files
mcp run filesystem "List all Python files and summarize their content"
```

## Configuration

The application stores its configuration in `config/config.json` in the project directory. This file contains all your MCP server configurations and can be exported or imported.

A sample configuration looks like:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "env": {"DISPLAY": ":1"}
    },
    "airbnb": {
      "command": "npx",
      "args": ["-y", "@openbnb/mcp-server-airbnb", "--ignore-robots-txt"],
      "env": {}
    }
  }
}
```

## API Documentation

For detailed API documentation, see:
- [API Reference](mcp_cli/api/README.md): Complete endpoint reference
- [API Quickstart](mcp_cli/api/QUICKSTART.md): Getting started with the API
- [Technical Documentation](mcp_cli/api/TECHNICAL_DOCS.md): Implementation details

## Extending

You can add any MCP-compatible server to this application. The Model Context Protocol is designed to be standardized, so any server following the protocol can be added and used through this interface.

To create your own MCP server, refer to the [Model Context Protocol documentation](https://github.com/modelcontextprotocol/docs).

## Troubleshooting

- **Error connecting to server**: Make sure the MCP server is installed and available. For NPM-based servers, try installing them globally first.
- **API key errors**: Ensure your OpenAI API key is set correctly in the `.env` file or as an environment variable.
- **Tool not found**: Some tools might require specific server configurations or additional setup. Check the server documentation.
- **GUI not starting**: Make sure PyQt5 is installed correctly: `pip install PyQt5`.

## Development

### Setting Up Development Environment

1. Clone the repository
2. Install development dependencies:
   ```bash
   pip install -e ".[dev]"
   ```
3. Install pre-commit hooks:
   ```bash
   pre-commit install
   ```

### Running Tests

```bash
pytest
```

## Related Projects

- [MCP-Use](https://github.com/pietrozullo/mcp-use): The library used by this application
- [Model Context Protocol](https://github.com/modelcontextprotocol/docs): Official MCP documentation
- [MCP Servers](https://github.com/modelcontextprotocol/servers): Collection of official MCP servers

## License MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 