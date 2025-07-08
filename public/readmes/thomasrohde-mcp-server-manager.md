# MCP Server Manager

A backend Python application that serves both a Model Context Protocol (MCP) interface and a FastAPI web interface for managing MCP servers integrated with Claude Desktop.

## Overview

MCP Server Manager allows you to:
- Register and manage MCP servers in a central location
- Enable/disable MCP servers for use with Claude Desktop
- Test server commands before registration
- Restart Claude Desktop after configuration changes
- Start the FastAPI server directly from Claude via MCP
- Access functionality via both a web UI and MCP interface

## Prerequisites

- Python 3.13 or higher
- pip (Python package installer)
- Claude Desktop (for full functionality)

## Installation

### Clone the Repository (if applicable)

```bash
git clone https://github.com/yourusername/mcp-commander.git
cd mcp-commander/mcp_server_manager
```

### Create a Virtual Environment

```bash
# Using venv
python -m venv .venv

# Activate the virtual environment
# On Windows
.venv\Scripts\activate
# On macOS/Linux
source .venv/bin/activate
```

### Install Dependencies

Choose one of the following methods:

```bash
# Using pip with requirements.txt
pip install -r requirements.txt

# OR using pip with pyproject.toml (recommended)
pip install -e .
```

## Running the Application

### Web Interface (Recommended)

The web interface provides a user-friendly way to manage your MCP servers.

```bash
uvicorn main:app --host 127.0.0.1 --port 8000
```

Then open your browser and navigate to [http://127.0.0.1:8000](http://127.0.0.1:8000)

- `--host 127.0.0.1`: Restricts access to localhost only
- `--host 0.0.0.0`: Makes the server accessible from other devices on your network (if needed)
- `--port 8000`: The port on which the application will run

### MCP Interface (Optional)

If you need to access the MCP functionality directly (e.g., for integration with Claude Desktop):

```bash
python mcp_manager/mcp_server.py
```

The MCP server runs in stdio mode, which means it reads from standard input and writes to standard output. This is the format expected by the MCP protocol.

## MCP Tools

The MCP Server Manager provides the following tools via the Model Context Protocol:

1. **restart_claude_desktop** - Finds, terminates, and restarts the Claude Desktop application
2. **set_server_enabled_status** - Enable or disable an MCP server in Claude Desktop
3. **install_mcp_server** - Register a new MCP server configuration
4. **start_fastapi_server** - Starts the FastAPI server and opens the default web browser to view the UI

### Using the start_fastapi_server Tool

With Claude Desktop, you can start the web interface directly by using the MCP tool:

```
start_fastapi_server
```

You can also specify a custom port:

```
start_fastapi_server port=8080
```

This will:
1. Start the FastAPI server in the background
2. Open your default web browser to the appropriate URL
3. Allow you to manage your MCP servers through the web interface

## Integrating with Claude Desktop

To use the MCP Server Manager with Claude Desktop:

1. Register your MCP servers using the web interface
2. Enable the servers you want to use with Claude
3. Restart Claude Desktop either through the web interface or manually

Note: Claude Desktop will need to be configured to recognize the MCP Server Manager if you want to use its MCP capabilities directly. You can add the following to Claude Desktop's config file:

```json
{
  "mcpServers": {
    "mcp-server-manager": {
      "command": "python",
      "args": ["path/to/mcp_manager/mcp_server.py"]
    }
  }
}
```

## File Structure

- `main.py`: FastAPI web application
- `mcp_manager/`: Core modules
  - `core_logic.py`: Shared business logic
  - `mcp_server.py`: MCP server implementation
- `templates/`: HTML templates for the web interface
- `static/`: Static assets (CSS, JS)

## Development

For development purposes, you may want to run the server with auto-reload:

```bash
uvicorn main:app --reload
```

This will automatically restart the server when changes are detected in the code.

## Logging

Logs for the MCP Server Manager are written to:

```
C:\Users\<username>\AppData\Local\MCPManager\MCPManager\mcp_server.log
```

Check this file for debugging information if you encounter any issues with the server.