# lean-docker-mcp

Dockerized Lean4 execution environment for AI agents.

## Overview

This MCP server provides a safe, sandboxed Lean4 execution environment for LLM-powered agents. It allows agents to:

- Execute Lean4 code in isolated Docker containers
- Choose between transient or persistent execution environments
- Maintain state between execution steps

## Installation

### Requirements

- Docker must be installed and running on the host system
- Python 3.11 or later
- `uv` for package management (recommended)

### Install from PyPI

```bash
# Using uv (recommended)
uv pip install lean-docker-mcp

# Using pip
pip install lean-docker-mcp
```

### Install from Source

```bash
# Clone the repository
git clone https://github.com/artivus/lean-docker-mcp.git
cd lean-docker-mcp

# Install with uv
uv pip install -e .

# Or with pip
pip install -e .
```

## Quick Start

### Running the Server

The lean-docker-mcp server can be started directly using the module:

```bash
python -m lean_docker_mcp
```

This will start the MCP server and listen for JSONRPC requests on stdin/stdout.

## Components

### Docker Execution Environment

The server implements two types of execution environments:

1. **Transient Environment**
   - Each execution is isolated in a fresh container
   - State isn't maintained between calls
   - Safer for one-off code execution

2. **Persistent Environment**
   - Maintains state between executions
   - Variables and functions defined in one execution are available in subsequent executions
   - Suitable for interactive, stateful REPL-like sessions

### Tools

The server provides the following tools:

- **execute-lean**: Run Lean4 code in a transient Docker container
  - Takes `code` (required) parameter
  - Returns execution results

- **execute-lean-persistent**: Run Lean4 code in a persistent Docker container
  - Takes `code` (required) and `session_id` (optional) parameters
  - Returns execution results
  - Maintains state between calls

- **cleanup-session**: Clean up a persistent session
  - Takes `session_id` (required) parameter
  - Stops and removes the associated Docker container

## Configuration

The server can be configured via a YAML configuration file. By default, it looks for a file at `~/.lean-docker-mcp/config.yaml`.

### Configuration File Structure

Example configuration:

```yaml
docker:
  image: lean-docker-mcp:latest
  working_dir: /home/leanuser/project
  memory_limit: 256m
  cpu_limit: 0.5
  timeout: 30
  network_disabled: true
  read_only: false

lean:
  allowed_imports:
    - Lean
    - Init
    - Std
    - Mathlib
  blocked_imports:
    - System.IO.Process
    - System.FilePath
```

### Docker Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `image` | Docker image to use for execution | `lean-docker-mcp:latest` |
| `working_dir` | Working directory inside container | `/home/leanuser/project` |
| `memory_limit` | Memory limit for container | `256m` |
| `cpu_limit` | CPU limit (0.0-1.0) | `0.5` |
| `timeout` | Execution timeout in seconds | `30` |
| `network_disabled` | Disable network access | `true` |
| `read_only` | Run container in read-only mode | `false` |
| `pool_enabled` | Enable container pooling | `true` |
| `pool_size` | Number of containers to keep in pool (0 to disable) | `32` |
| `pool_max_age` | Maximum age of a container in seconds | `300` |
| `max_concurrent_creations` | Maximum containers to create concurrently | `5` |

### Container Pooling

The Lean Docker MCP service includes a container pooling system to efficiently handle high-throughput environments. Pooling allows the service to:

1. Pre-create a pool of containers ready for immediate use
2. Reuse containers between executions (with full isolation between runs)
3. Limit the rate of container creation to avoid Docker rate limits
4. Scale gracefully for both single-agent and high-parallelism scenarios

#### How Container Pooling Works

- When the service starts, it initializes a pool of containers (configurable pool size)
- Each request gets a container from the pool instead of creating a new one
- After execution, containers are reset (processes killed, temp files removed) and returned to the pool
- Containers older than the max age setting are removed and replaced with fresh ones

#### Configuration Example

```yaml
docker:
  # Standard Docker settings
  image: lean-docker-mcp:latest
  memory_limit: 256m
  cpu_limit: 0.5
  
  # Container pooling settings
  pool_enabled: true  # Enable container pooling
  pool_size: 32       # Keep up to 32 containers in the pool
  pool_max_age: 300   # Replace containers after 5 minutes (300 seconds)
  max_concurrent_creations: 5  # Limit parallel container creation 
```

#### When to Adjust Pool Settings

- **High-traffic environments**: Increase `pool_size` to handle more concurrent requests
- **Memory-constrained hosts**: Decrease `pool_size` or increase `pool_max_age` to reduce overhead
- **Large clusters**: Increase `max_concurrent_creations` if Docker can handle higher creation rates
- **Single-agent use**: Set `pool_size` to a small number (e.g., 5) for minimal resource usage
- **No pooling**: Set `pool_enabled: false` or `pool_size: 0` to disable pooling entirely

#### Security Considerations

Container pooling maintains the same security guarantees as non-pooled execution:

- Each execution is completely isolated from previous ones
- All user state is wiped between executions
- The container is reset to a clean state after each use
- Security-related Docker settings (memory limits, CPU limits, network access) are preserved

## Integration with Claude and Anthropic Products

### Claude Desktop

On MacOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

<details>
  <summary>Development/Unpublished Servers Configuration</summary>

  ```json
  "mcpServers": {
    "lean-docker-mcp": {
      "command": "uv",
      "args": [
        "--directory",
        "/path/to/lean-docker-mcp",
        "run",
        "lean-docker-mcp"
      ]
    }
  }
  ```
</details>

<details>
  <summary>Published Servers Configuration</summary>

  ```json
  "mcpServers": {
    "lean-docker-mcp": {
      "command": "uvx",
      "args": [
        "lean-docker-mcp"
      ]
    }
  }
  ```
</details>

<details>
  <summary>Configuration with Environment Variables</summary>

  ```json
  "mcpServers": {
    "lean-docker-mcp": {
      "command": "uvx",
      "args": [
        "lean-docker-mcp"
      ],
      "env": {
        "LEAN_DOCKER_MCP_POOL_SIZE": "64",
        "LEAN_DOCKER_MCP_POOL_MAX_AGE": "600",
        "LEAN_DOCKER_MCP_MAX_CONCURRENT_CREATIONS": "10",
        "LEAN_DOCKER_MCP_POOL_ENABLED": "true",
        "LEAN_DOCKER_MCP_MEMORY_LIMIT": "512m",
        "LEAN_DOCKER_MCP_CPU_LIMIT": "0.8"
      }
    }
  }
  ```
</details>

### Environment Variable Configuration

You can configure the container pooling system and other settings using environment variables, which is especially useful in the MCP configuration files:

| Environment Variable | Description | Example Value |
|----------------------|-------------|---------------|
| `LEAN_DOCKER_MCP_POOL_SIZE` | Number of containers to keep in pool | `64` |
| `LEAN_DOCKER_MCP_POOL_MAX_AGE` | Maximum container age in seconds | `600` |
| `LEAN_DOCKER_MCP_MAX_CONCURRENT_CREATIONS` | Maximum concurrent container creations | `10` |
| `LEAN_DOCKER_MCP_POOL_ENABLED` | Enable/disable pooling | `true` |
| `LEAN_DOCKER_MCP_MEMORY_LIMIT` | Container memory limit | `512m` |
| `LEAN_DOCKER_MCP_CPU_LIMIT` | Container CPU limit (0.0-1.0) | `0.8` |
| `LEAN_DOCKER_MCP_TIMEOUT` | Execution timeout in seconds | `30` |
| `LEAN_DOCKER_MCP_CONFIG` | Path to custom config file | `/path/to/config.yaml` |

For high-scale RL training environments with many parallel agents, recommended settings:

```json
"env": {
  "LEAN_DOCKER_MCP_POOL_SIZE": "64",
  "LEAN_DOCKER_MCP_MAX_CONCURRENT_CREATIONS": "10",
  "LEAN_DOCKER_MCP_POOL_MAX_AGE": "600"
}
```

For single-agent usage scenarios:

```json
"env": {
  "LEAN_DOCKER_MCP_POOL_SIZE": "5",
  "LEAN_DOCKER_MCP_MAX_CONCURRENT_CREATIONS": "3"
}
```

## Example MCP Usage

### Transient Execution

```
# Define and use a simple function
result = await call_tool("execute-lean", {
  "code": "def hello (name : String) : String := s!\"Hello, {name}\"\n\ndef main : IO Unit := IO.println (hello \"Lean4!\")"
})
```

### Persistent Session

```
# Create a persistent session and define a function
result = await call_tool("execute-lean-persistent", {
  "code": "def add (a b : Nat) : Nat := a + b\n\ndef main : IO Unit := IO.println \"Function defined\""
})

# Use the function in a subsequent call with the same session
result = await call_tool("execute-lean-persistent", {
  "session_id": "previous_session_id",
  "code": "def main : IO Unit := IO.println (toString (add 10 20))"
})
```

## Development

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/artivus/lean-docker-mcp.git
cd lean-docker-mcp
```

2. Set up development environment:
```bash
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uv pip install -e ".[dev]"
```

3. Install pre-commit hooks:
```bash
pre-commit install
```

### Running Tests

```bash
# Run all tests
pytest

# Run tests with coverage
pytest --cov=src/lean_docker_mcp

# Run specific test categories
pytest tests/unit/
pytest tests/integration/
```

### Building and Publishing

To prepare the package for distribution:

1. Sync dependencies and update lockfile:
```bash
uv sync
```

2. Build package distributions:
```bash
uv build
```

3. Publish to PyPI:
```bash
uv publish
```

### Debugging

Since MCP servers run over stdio, debugging can be challenging. For the best debugging
experience, we strongly recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector).

You can launch the MCP Inspector via [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) with this command:

```bash
npx @modelcontextprotocol/inspector uv --directory /path/to/lean-docker-mcp run lean-docker-mcp
```

## License

[License information]

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Performance Tuning

### High-Scale RL Training

For environments running multiple parallel trajectories (like reinforcement learning trainers), use container pooling with these recommended settings:

```json
{
  "mcpServers": {
    "lean-mcp": {
      "command": "uvx",
      "args": [
        "lean-docker-mcp"
      ],
      "env": {
        "LEAN_DOCKER_MCP_POOL_ENABLED": "true",
        "LEAN_DOCKER_MCP_POOL_SIZE": "64",
        "LEAN_DOCKER_MCP_POOL_MAX_AGE": "3600",
        "LEAN_DOCKER_MCP_MAX_CONCURRENT_CREATIONS": "10",
        "LEAN_DOCKER_MCP_MEMORY_LIMIT": "512m",
        "LEAN_DOCKER_MCP_CPU_LIMIT": "0.5"
      }
    }
  }
}
```

Key settings to adjust:

- `LEAN_DOCKER_MCP_POOL_SIZE`: Set this to your maximum expected concurrent trajectories
- `LEAN_DOCKER_MCP_MAX_CONCURRENT_CREATIONS`: Limit to avoid Docker rate limits
- `LEAN_DOCKER_MCP_POOL_MAX_AGE`: Increase for longer-lived containers (in seconds)
- `LEAN_DOCKER_MCP_MEMORY_LIMIT`: Adjust based on your cluster's resources

### Local Development

For single-agent development on a local machine:

```json
{
  "mcpServers": {
    "lean-mcp": {
      "command": "uv",
      "args": [
        "run",
        "-m",
        "lean_docker_mcp"
      ],
      "env": {
        "LEAN_DOCKER_MCP_POOL_ENABLED": "true",
        "LEAN_DOCKER_MCP_POOL_SIZE": "3",
        "LEAN_DOCKER_MCP_POOL_MAX_AGE": "1800",
        "LEAN_DOCKER_MCP_MAX_CONCURRENT_CREATIONS": "2"
      }
    }
  }
}
```

### Setting Reasonable Values

| Environment | Pool Size | Max Concurrent Creations | Pool Max Age |
|-------------|-----------|--------------------------|--------------|
| Small laptop | 2-3 | 1-2 | 1800 (30 min) |
| Developer workstation | 5-10 | 3-5 | 1800 (30 min) |
| Server environment | 20-30 | 5-10 | 3600 (1 hour) |
| RL training cluster | 32-128 | 10-20 | 3600+ (1+ hour) |