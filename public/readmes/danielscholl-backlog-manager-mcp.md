# Backlog Manager MCP Server

> A simple task tracking and backlog management MCP server for AI assistants (hack project)

<p align="center">
  <img src="https://img.shields.io/badge/Status-Beta-yellow" alt="Status: Beta">
  <img src="https://img.shields.io/badge/Python-3.12%2B-green" alt="Python: 3.12+">
</p>

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [MCP Tools](#mcp-tools)
- [Integration with MCP Clients](#integration-with-mcp-clients)
- [Usage Examples](#usage-examples)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

Backlog Manager is an MCP (Machine-Consumable Programming) server for issue and task management with a file-based approach. It provides tools for AI agents and other clients to create issues, add tasks to them, and track task status. Issues represent high-level feature requests or bugs, while tasks represent specific work items needed to resolve the issue.

Built using Anthropic's MCP protocol, it supports both SSE and stdio transports for flexible integration with AI assistants like Claude, or other MCP-compatible clients.

## Features

- **Issue Management**: Create, list, select, and track issues with descriptions
- **Task Tracking**: Add tasks to issues with titles, descriptions, and status tracking
- **Status Workflow**: Track task progress through New, InWork, and Done states
- **File-Based Storage**: Portable JSON storage format for easy backup and version control
- **Flexible Transport**: Support for both SSE (HTTP) and stdio communication
- **Docker Support**: Run in containers for easy deployment and isolation

## Prerequisites

- **Python**: 3.12 or higher
- **Package Manager**: uv (recommended) or pip
- **Docker**: (Optional) For containerized deployment
- **MCP Client**: Claude Code, Windsurf, or any other MCP-compatible client

## Installation

### Using uv (Recommended)

```bash
# Clone the repository
git clone https://github.com/username/backlog-manager-mcp.git
cd backlog-manager-mcp

# Install dependencies
uv pip install -e .

# Verify installation
uv run backlog-manager  # This should start the server
```

### Using Docker

```bash
# Build the Docker image
docker build -t backlog/manager --build-arg PORT=8050 .

# Run the container
docker run -p 8050:8050 backlog/manager

# Verify container is running
docker ps | grep backlog/manager
```

## Configuration

Configure the server behavior using environment variables in a `.env` file:

```bash
# Create environment file from example
cp .env.example .env
```

Example `.env` file content:

```
# Transport mode: 'sse' or 'stdio'
TRANSPORT=sse

# Server configuration (for SSE transport)
HOST=0.0.0.0
PORT=8050

# Data storage
TASKS_FILE=tasks.json
```

| Variable     | Description                                | Default      | Required |
| ------------ | ------------------------------------------ | ------------ | -------- |
| `TRANSPORT`  | Transport protocol (sse or stdio)          | `sse`        | No       |
| `HOST`       | Host to bind to when using SSE transport   | `0.0.0.0`    | No       |
| `PORT`       | Port to listen on when using SSE transport | `8050`       | No       |
| `TASKS_FILE` | Path to the tasks storage file             | `tasks.json` | No       |

## Running the Server

### Start the Server (SSE Mode)

```bash
# Using the CLI command
uv run backlog-manager

# Or directly with Python
uv run src/backlog_manager/main.py
```

You should see output similar to:

```
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8050 (Press CTRL+C to quit)
```

> **Note**: The server does not support the `--help` flag since it's designed as an MCP server, not a traditional CLI application.

### Using stdio Mode

When using stdio mode, you don't need to start the server separately - the MCP client will start it automatically when configured properly (see [Integration with MCP Clients](#integration-with-mcp-clients)).

## MCP Tools

The Backlog Manager exposes the following tools via MCP:

### Issue Management

| Tool                  | Description               | Parameters                                                                     |
| --------------------- | ------------------------- | ------------------------------------------------------------------------------ |
| `create_issue`        | Create a new issue        | `name` (string), `description` (string, optional), `status` (string, optional) |
| `list_issues`         | Show all available issues | None                                                                           |
| `select_issue`        | Set the active issue      | `name` (string)                                                                |
| `initialize_issue`    | Create or reset an issue  | `name` (string), `description` (string, optional), `status` (string, optional) |
| `update_issue_status` | Update issue status       | `name` (string), `status` (string)                                             |

### Task Management

| Tool                 | Description                | Parameters                                         |
| -------------------- | -------------------------- | -------------------------------------------------- |
| `add_task`           | Add task to active issue   | `title` (string), `description` (string, optional) |
| `list_tasks`         | List tasks in active issue | `status` (string, optional)                        |
| `update_task_status` | Update task status         | `task_id` (string), `status` (string)              |

### Status Values

Tasks and issues can have one of the following statuses:

- `New` (default for new tasks/issues)
- `InWork` (in progress)
- `Done` (completed)

## Integration with MCP Clients

### SSE Configuration

Once you have the server running with SSE transport, connect to it using this configuration:

```json
{
  "mcpServers": {
    "backlog-manager": {
      "transport": "sse",
      "url": "http://localhost:8050/sse"
    }
  }
}
```

**Windsurf Configuration:**

```json
{
  "mcpServers": {
    "backlog-manager": {
      "transport": "sse",
      "serverUrl": "http://localhost:8050/sse"
    }
  }
}
```

**n8n Configuration:**

Use `host.docker.internal` instead of `localhost` to access the host machine from n8n container:

```
http://host.docker.internal:8050/sse
```

### Python with Stdio Configuration

```json
{
  "mcpServers": {
    "backlog-manager": {
      "command": "python",
      "args": ["path/to/backlog-manager/src/backlog_manager/main.py"],
      "env": {
        "TRANSPORT": "stdio",
        "TASKS_FILE": "tasks.json"
      }
    }
  }
}
```

### Docker with Stdio Configuration

```json
{
  "mcpServers": {
    "backlog-manager": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "-e", "TRANSPORT=stdio", "backlog/manager"],
      "env": {
        "TRANSPORT": "stdio"
      }
    }
  }
}
```

## Example

Backlog Manager is designed to work seamlessly with AI assistants to help you organize your project work. The most powerful use case is having the AI read specifications and automatically create a structured backlog.

Simply ask your AI assistant:

```
Read the spec and create a backlog for features not completed.
```

The AI assistant will:

1. Read and analyze the specification document
2. Identify key features and components
3. Create issues for main functional areas
4. Break down each issue into specific tasks
5. Organize everything in a structured backlog
