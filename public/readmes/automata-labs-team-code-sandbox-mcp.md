# Code Sandbox MCP 🐳
[![smithery badge](https://smithery.ai/badge/@Automata-Labs-team/code-sandbox-mcp)](https://smithery.ai/server/@Automata-Labs-team/code-sandbox-mcp)

A secure sandbox environment for executing code within Docker containers. This MCP server provides AI applications with a safe and isolated environment for running code while maintaining security through containerization.

## 🌟 Features

- **Flexible Container Management**: Create and manage isolated Docker containers for code execution
- **Custom Environment Support**: Use any Docker image as your execution environment
- **File Operations**: Easy file and directory transfer between host and containers
- **Command Execution**: Run any shell commands within the containerized environment
- **Real-time Logging**: Stream container logs and command output in real-time
- **Auto-Updates**: Built-in update checking and automatic binary updates
- **Multi-Platform**: Supports Linux, macOS, and Windows

## 🚀 Installation

### Prerequisites

- Docker installed and running
  - [Install Docker for Linux](https://docs.docker.com/engine/install/)
  - [Install Docker Desktop for macOS](https://docs.docker.com/desktop/install/mac/)
  - [Install Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)

### Quick Install

#### Linux, MacOS
```bash
curl -fsSL https://raw.githubusercontent.com/Automata-Labs-team/code-sandbox-mcp/main/install.sh | bash
```

#### Windows
```powershell
# Run in PowerShell
irm https://raw.githubusercontent.com/Automata-Labs-team/code-sandbox-mcp/main/install.ps1 | iex
```

The installer will:
1. Check for Docker installation
2. Download the appropriate binary for your system
3. Create necessary configuration files

### Manual Installation

1. Download the latest release for your platform from the [releases page](https://github.com/Automata-Labs-team/code-sandbox-mcp/releases)
2. Place the binary in a directory in your PATH
3. Make it executable (Unix-like systems only):
   ```bash
   chmod +x code-sandbox-mcp
   ```

## 🛠️ Available Tools

#### `sandbox_initialize`
Initialize a new compute environment for code execution.
Creates a container based on the specified Docker image.

**Parameters:**
- `image` (string, optional): Docker image to use as the base environment
  - Default: 'python:3.12-slim-bookworm'

**Returns:**
- `container_id` that can be used with other tools to interact with this environment

#### `copy_project`
Copy a directory to the sandboxed filesystem.

**Parameters:**
- `container_id` (string, required): ID of the container returned from the initialize call
- `local_src_dir` (string, required): Path to a directory in the local file system
- `dest_dir` (string, optional): Path to save the src directory in the sandbox environment

#### `write_file`
Write a file to the sandboxed filesystem.

**Parameters:**
- `container_id` (string, required): ID of the container returned from the initialize call
- `file_name` (string, required): Name of the file to create
- `file_contents` (string, required): Contents to write to the file
- `dest_dir` (string, optional): Directory to create the file in (Default: ${WORKDIR})

#### `sandbox_exec`
Execute commands in the sandboxed environment.

**Parameters:**
- `container_id` (string, required): ID of the container returned from the initialize call
- `commands` (array, required): List of command(s) to run in the sandboxed environment
  - Example: ["apt-get update", "pip install numpy", "python script.py"]

#### `copy_file`
Copy a single file to the sandboxed filesystem.

**Parameters:**
- `container_id` (string, required): ID of the container returned from the initialize call
- `local_src_file` (string, required): Path to a file in the local file system
- `dest_path` (string, optional): Path to save the file in the sandbox environment

#### `sandbox_stop`
Stop and remove a running container sandbox.

**Parameters:**
- `container_id` (string, required): ID of the container to stop and remove

**Description:**
Gracefully stops the specified container with a 10-second timeout and removes it along with its volumes.

#### Container Logs Resource
A dynamic resource that provides access to container logs.

**Resource Path:** `containers://{id}/logs`  
**MIME Type:** `text/plain`  
**Description:** Returns all container logs from the specified container as a single text resource.

## 🔐 Security Features

- Isolated execution environment using Docker containers
- Resource limitations through Docker container constraints
- Separate stdout and stderr streams


## 🔧 Configuration

### Claude Desktop

The installer automatically creates the configuration file. If you need to manually configure it:

#### Linux
```json
// ~/.config/Claude/claude_desktop_config.json
{
    "mcpServers": {
        "code-sandbox-mcp": {
            "command": "/path/to/code-sandbox-mcp",
            "args": [],
            "env": {}
        }
    }
}
```

#### macOS
```json
// ~/Library/Application Support/Claude/claude_desktop_config.json
{
    "mcpServers": {
        "code-sandbox-mcp": {
            "command": "/path/to/code-sandbox-mcp",
            "args": [],
            "env": {}
        }
    }
}
```

#### Windows
```json
// %APPDATA%\Claude\claude_desktop_config.json
{
    "mcpServers": {
        "code-sandbox-mcp": {
            "command": "C:\\path\\to\\code-sandbox-mcp.exe",
            "args": [],
            "env": {}
        }
    }
}
```

### Other AI Applications

For other AI applications that support MCP servers, configure them to use the `code-sandbox-mcp` binary as their code execution backend.

## 🛠️ Development

If you want to build the project locally or contribute to its development, see [DEVELOPMENT.md](DEVELOPMENT.md).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
