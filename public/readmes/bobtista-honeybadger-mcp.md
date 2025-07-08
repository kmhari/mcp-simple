# Honeybadger MCP Server

A Model Context Protocol (MCP) server implementation for interacting with the Honeybadger API. This server allows AI agents to fetch and analyze error data from your Honeybadger projects.

## Overview

This MCP server provides a bridge between AI agents and the Honeybadger error monitoring service. It follows the best practices laid out by Anthropic for building MCP servers, allowing seamless integration with any MCP-compatible client.

## Features

The server provides two essential tools for interacting with Honeybadger:

1. **`list_faults`**: List and filter faults from your Honeybadger project

   - Search by text query
   - Filter by creation or occurrence timestamps
   - Sort by frequency or recency
   - Paginate results

2. **`get_fault_details`**: Get detailed information about specific faults
   - Filter notices by creation time
   - Paginate through notices
   - Results ordered by creation time descending

## Prerequisites

- Python 3.10+
- Honeybadger API key and Project ID
- Docker if running the MCP server as a container (recommended)

## Installation

### Using uv

1. Install uv if you don't have it:

   ```bash
   pip install uv
   ```

2. Clone this repository:

   ```bash
   git clone https://github.com/bobtista/honeybadger-mcp.git
   cd honeybadger-mcp
   ```

3. Install dependencies:

   ```bash
   uv pip install -e .
   ```

4. Install development dependencies (optional):

   ```bash
   uv pip install -e ".[dev]"
   ```

5. Create your environment file:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

### Using Docker (Recommended)

1. Build the Docker image:

   ```bash
   docker build -t honeybadger/mcp --build-arg PORT=8050 .
   ```

2. Create a `.env` file and configure your environment variables

## Configuration

You can configure the server using either environment variables or command-line arguments:

| Option     | Env Variable           | CLI Argument | Default   | Description                                |
| ---------- | ---------------------- | ------------ | --------- | ------------------------------------------ |
| API Key    | HONEYBADGER_API_KEY    | --api-key    | Required  | Your Honeybadger API key                   |
| Project ID | HONEYBADGER_PROJECT_ID | --project-id | Required  | Your Honeybadger project ID                |
| Transport  | TRANSPORT              | --transport  | sse       | Transport protocol (sse or stdio)          |
| Host       | HOST                   | --host       | 127.0.0.1 | Host to bind to when using SSE transport   |
| Port       | PORT                   | --port       | 8050      | Port to listen on when using SSE transport |
| Log Level  | LOG_LEVEL              | --log-level  | INFO      | Logging level (INFO, DEBUG, etc.)          |

## Running the Server

### Running with uv (Development)

#### SSE Transport (Default)

```bash
# Using environment variables:
HONEYBADGER_API_KEY=your-key HONEYBADGER_PROJECT_ID=your-project uv run src/honeybadger_mcp_server/server.py

# Using CLI arguments:
uv run src/honeybadger_mcp_server/server.py --api-key your-key --project-id your-project
```

#### Using Stdio

```bash
uv run src/honeybadger_mcp_server/server.py --transport stdio --api-key your-key --project-id your-project
```

### Running Installed Package

#### SSE Transport (Default)

```bash
# Using environment variables:
HONEYBADGER_API_KEY=your-key HONEYBADGER_PROJECT_ID=your-project honeybadger-mcp-server

# Using CLI arguments:
honeybadger-mcp-server --api-key your-key --project-id your-project
```

#### Using Stdio

```bash
honeybadger-mcp-server --transport stdio --api-key your-key --project-id your-project
```

### Using Docker

#### Run with SSE

```bash
docker run --env-file .env -p 8050:8050 honeybadger/mcp
```

#### Using Stdio

With stdio, the MCP client itself can spin up the MCP server container, so nothing to run at this point.

## Integration with MCP Clients

### SSE Configuration

Once you have the server running with SSE transport, you can connect to it using this configuration:

```json
{
  "mcpServers": {
    "honeybadger": {
      "transport": "sse",
      "url": "http://localhost:8050/sse"
    }
  }
}
```

### Claude Desktop Configuration

#### Using SSE Transport (Recommended)

First, start the server:

```bash
honeybadger-mcp-server --api-key your-key --project-id your-project
```

Then add to your Claude Desktop config:

```json
{
  "mcpServers": {
    "honeybadger": {
      "transport": "sse",
      "url": "http://localhost:8050/sse"
    }
  }
}
```

#### Using Stdio Transport

Add to your Claude Desktop config:

```json
{
  "mcpServers": {
    "honeybadger": {
      "command": "uv",
      "args": [
        "run",
        "--project",
        "/path/to/honeybadger-mcp",
        "src/honeybadger_mcp_server/server.py",
        "--transport",
        "stdio",
        "--api-key",
        "YOUR-API-KEY",
        "--project-id",
        "YOUR-PROJECT-ID"
      ]
    }
  }
}
```

### Docker Configuration

```json
{
  "mcpServers": {
    "honeybadger": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "honeybadger/mcp",
        "--transport",
        "stdio",
        "--api-key",
        "YOUR-API-KEY",
        "--project-id",
        "YOUR-PROJECT-ID"
      ]
    }
  }
}
```

## Tool Usage Examples

### List Faults

```python
result = await client.call_tool("list_faults", {
    "q": "RuntimeError",           # Optional search term
    "created_after": 1710806400,  # Unix timestamp (2024-03-19T00:00:00Z)
    "occurred_after": 1710806400, # Filter by occurrence time
    "limit": 10,                  # Max 25 results
    "order": "recent"             # 'recent' or 'frequent'
})
```

### Get Fault Details

```python
result = await client.call_tool("get_fault_details", {
    "fault_id": "abc123",
    "created_after": 1710806400,  # Unix timestamp
    "created_before": 1710892800, # Optional end time
    "limit": 5                    # Number of notices (max 25)
})
```

## Development

### Running Tests

```bash
# Install dev dependencies
uv pip install -e ".[dev]"

# Run tests
pytest
```

### Code Quality

```bash
# Run type checker
pyright

# Run linter
ruff check .
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
