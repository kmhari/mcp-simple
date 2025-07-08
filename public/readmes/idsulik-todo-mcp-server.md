# Todo MCP Server

A simple Todo application built using MCP (Model Context Protocol) Server for testing and demonstrating MCP
interactions.

## Overview

This repository contains a minimal Todo application implemented as an MCP server. It allows you to:

- List all todo items
- View specific todo items
- Add new todo items
- Remove todo items
- Clear all todo items
- Create structured todo tasks with metadata

This project serves as a test bed for interacting with Model Context Protocol servers and understanding how to build and
expose functionality through the MCP protocol. For more information about the Model Context Protocol,
visit [modelcontextprotocol.io](http://modelcontextprotocol.io/).

## Requirements

- Python 3.10+
- uv (Python package installer)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/idsulik/todo-mcp-server.git
cd todo-mcp-server
```

2. Install dependencies using uv:

```bash
uv pip install -e .
```

### Adding to MCP Servers List

To add this server to your MCP servers list, use the following command:

```bash
mcp install server.py --name "Todo MCP"
```

This registers the server with the Claude Desktop app or other MCP-enabled applications.

Alternatively, if you want to test the server with the MCP Inspector, you can use:

```bash
mcp dev server.py
```

This will launch the server along with the MCP Inspector interface for easy testing and debugging.

## API Usage

The server exposes the following MCP resources and tools:

### Resources

1. List all todo items:

```
GET todo://list
```

2. View a specific todo item:

```
GET todo://view/{item_idx}
```

Where `item_idx` is the index of the item you want to view.

### Prompts

1. Create a structured todo task:

```python
create_task(task_name: str, priority: str = "medium", due_date: str = "")
```

This prompt helps format todo tasks with priority levels and due dates. Parameters:
- `task_name`: The name/description of the task
- `priority`: Task priority (low, medium, high)
- `due_date`: When the task is due (optional)

### Tools

1. Add a new todo item:

```python
add_todo(value: str)
```

2. Remove a todo item:

```python
remove_todo(item_idx: int)
```

3. Clear all todo items:

```python
clear_todo()
```

### Adding to MCP Configuration Manually

If you prefer to add the server manually to your MCP configuration, you can add the following JSON to your Claude
Desktop configuration file (typically located at `~/.claude-desktop/claude_desktop_config.json` on Mac/Linux or
`C:\Users\YourUsername\AppData\Roaming\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "todo": {
      "command": "uv",
      "args": [
        "run",
        "--with",
        "mcp[cli]",
        "mcp",
        "run",
        "/path/to/your/server.py"
      ]
    }
  }
}
```

Replace `/path/to/your/server.py` with the absolute path to your server.py file. Make sure to use absolute paths, not
relative paths.

### Using Docker

You can also run this MCP server using Docker without installing anything locally. Add the following to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "todo": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "idsulik/todo-mcp-server"
      ]
    }
  }
}
```

The Docker image will automatically pull from Docker Hub if it's not already on your system.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.