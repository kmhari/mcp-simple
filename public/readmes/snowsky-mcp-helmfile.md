# Helmfile MCP Server

A FastMCP server for executing Helmfile commands through the Model Context Protocol (MCP). This server provides a standardized interface for managing Helmfile operations, allowing AI assistants to help with Helmfile deployments, configurations, and troubleshooting.

![Sync Helmfile](examples/sync_helmfile.png)
![List Helmfile](examples/list_helmfile.png)

## Key Features

- **Command Execution**: Execute any Helmfile command with proper validation and error handling
- **Synchronization**: Specialized tool for synchronizing Helmfile releases
- **Async Operations**: Asynchronous command execution for better performance
- **Command Piping**: Support for Unix pipe operations to filter and transform command output
- **Progress Tracking**: Real-time progress updates through MCP context
- **Timeout Support**: Configurable command timeouts to prevent hanging operations
- **Structured Errors**: Detailed error responses with proper error codes and messages

## Installation

### Prerequisites

- Python 3.11 or higher
- Helmfile installed and available in PATH
- Access to a Kubernetes cluster

### Install from Source

1. Clone the repository:
```bash
git clone git@github.com:snowsky/mcp-helmfile.git
cd mcp-helmfile
```

2. Install dependencies:
```bash
uv pip install -e .
```

## Claude Desktop App Configuration

To configure the Claude desktop app to work with the MCP servers, you can use the following settings in your `claude_desktop_config.json` file:

```json
{
    "mcpServers": {
        "filesystem": {
            "command": "npx",
            "args": [
                "-y",
                "@modelcontextprotocol/server-filesystem",
                "LOCAL_DIRECTORY_ALLOWED_ACCESSED_BY_CLAUDE_DESKTOP"
            ]
        },
        "helmfile": {
            "command": "uv",
            "args": [
                "--directory",
                "LOCAL_DIRECTORY_THIS_REPO",
                "run",
                "server.py"
            ]
        }
    }
}
```

### Explanation of Configuration

- **filesystem**: This configuration uses `npx` to run the server for filesystem operations, specifying directories for Desktop and Downloads.
  
- **helmfile**: This configuration uses `uv` to run the Helmfile server. The `--directory` argument specifies the path to the MCP Helmfile project, and `run server.py` indicates the script to execute.

### Use with Claude Desktop App

After adding this configuration, restart the Claude desktop app to ensure it picks up the new settings. You can then interact with the MCP servers as needed.

Copy `helmfile.yaml` file to the above directory `LOCAL_DIRECTORY_ALLOWED_ACCESSED_BY_CLAUDE_DESKTOP`.

For more information on troubleshooting and advanced configurations, please refer to the [debugging documentation](https://modelcontextprotocol.io/docs/tools/debugging).

## Run in python

### Starting the Server

```bash
python -m mcp-helmfile.server
```

### Available Tools

#### 1. execute_helmfile

A general-purpose tool for executing any Helmfile command.

Parameters:
- `command`: Complete Helmfile command to execute (including any pipes and flags)
- `timeout`: Maximum execution time in seconds (default: 300)
- `ctx`: Optional MCP context for request tracking

Example:
```python
result = await execute_helmfile(
    command="list",
    timeout=60,
    ctx=context
)
```

#### 2. sync_helmfile

A specialized tool for synchronizing Helmfile releases.

Parameters:
- `helmfile_path`: Path to the Helmfile configuration file
- `namespace`: Optional namespace to target
- `timeout`: Maximum execution time in seconds (default: 300)
- `ctx`: Optional MCP context for request tracking

Example:
```python
result = await sync_helmfile(
    helmfile_path="/path/to/helmfile.yaml",
    namespace="production",
    timeout=300,
    ctx=context
)
```

### Response Format

All tools return a dictionary with the following structure:

```python
{
    "status": "success" | "error",
    "output": "Command output if successful",
    "error": {
        "code": "Error code",
        "message": "Error message"
    }  # Only present if status is "error"
}
```

## Development

### Running Tests

```bash
pytest
```

### Building and Publishing

1. Build the package:
```bash
uv build
```

2. Publish to PyPI:
```bash
uv publish
```

## Security Considerations

- Commands are executed with proper validation
- Dangerous operations like apply/destroy require confirmation
- Environment-specific commands are validated against allowed environments
- Command timeouts prevent resource exhaustion
- Proper error handling and reporting

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
