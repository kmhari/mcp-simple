# Sandbox MCP Server

An MCP server that provides isolated Docker environments for code execution. This server allows you to:
- Create containers with any Docker image
- Write and execute code in multiple programming languages
- Install packages and set up development environments
- Run commands in isolated containers

## Prerequisites

- Python 3.9 or higher
- Docker installed and running
- uv package manager (recommended)
- Docker MCP server (recommended)

## Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd sandbox_server
```

2. Create and activate a virtual environment with uv:
```bash
uv venv
source .venv/bin/activate  # On Unix/MacOS
# Or on Windows:
# .venv\Scripts\activate
```

3. Install dependencies:
```bash
uv pip install .
```

## Integration with Claude Desktop

1. Open Claude Desktop's configuration file:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the sandbox server configuration:
```json
{
    "mcpServers": {
        "sandbox": {
            "command": "uv",
            "args": [
                "--directory",
                "/absolute/path/to/sandbox_server",
                "run",
                "sandbox_server.py"
            ],
            "env": {
                "PYTHONPATH": "/absolute/path/to/sandbox_server"
            }
        }
    }
}
```

Replace `/absolute/path/to/sandbox_server` with the actual path to your project directory.

3. Restart Claude Desktop

## Usage Examples

### Basic Usage

Once connected to Claude Desktop, you can:

1. Create a Python container:
```
Could you create a Python container and write a simple hello world program?
```

2. Run code in different languages:
```
Could you create a C program that calculates the fibonacci sequence and run it?
```

3. Install packages and use them:
```
Could you create a Python script that uses numpy to generate and plot some random data?
```

### Saving and Reproducing Environments

The server provides several ways to save and reproduce your development environments:

#### Creating Persistent Containers

When creating a container, you can make it persistent:
```
Could you create a persistent Python container with numpy and pandas installed?
```

This will create a container that:
- Stays running after Claude Desktop closes
- Can be accessed directly through Docker
- Preserves all installed packages and files

The server will provide instructions for:
- Accessing the container directly (`docker exec`)
- Stopping and starting the container
- Removing it when no longer needed

#### Saving Container State

After setting up your environment, you can save it as a Docker image:
```
Could you save the current container state as an image named 'my-ds-env:v1'?
```

This will:
1. Create a new Docker image with all your:
   - Installed packages
   - Created files
   - Configuration changes
2. Provide instructions for reusing the environment

You can then share this image or use it as a starting point for new containers:
```
Could you create a new container using the my-ds-env:v1 image?
```

#### Generating Dockerfiles

To make your environment fully reproducible, you can generate a Dockerfile:
```
Could you export a Dockerfile that recreates this environment?
```

The generated Dockerfile will include:
- Base image specification
- Created files
- Template for additional setup steps

You can use this Dockerfile to:
1. Share your environment setup with others
2. Version control your development environment
3. Modify and customize the build process
4. Deploy to different systems

#### Recommended Workflow

For reproducible development environments:

1. Create a persistent container:
```
Create a persistent Python container for data science work
```

2. Install needed packages and set up the environment:
```
Install numpy, pandas, and scikit-learn in the container
```

3. Test your setup:
```
Create and run a test script to verify the environment
```

4. Save the state:
```
Save this container as 'ds-workspace:v1'
```

5. Export a Dockerfile:
```
Generate a Dockerfile for this environment
```

This gives you multiple options for recreating your environment:
- Use the saved Docker image directly
- Build from the Dockerfile with modifications
- Access the original container if needed

## Security Notes

- All code executes in isolated Docker containers
- Containers are automatically removed after use
- File systems are isolated between containers
- Host system access is restricted

## Project Structure

```
sandbox_server/
├── sandbox_server.py     # Main server implementation
├── pyproject.toml        # Project configuration
└── README.md            # This file
```

## Available Tools

The server provides three main tools:

1. `create_container_environment`: Creates a new Docker container with specified image
2. `create_file_in_container`: Creates a file in a container
3. `execute_command_in_container`: Runs commands in a container
4. `save_container_state`: Saves the container state to a persistent container
5. `export_dockerfile`: exports a docker file to create a persistant environment
6. `exit_container`: closes a container to cleanup environment when finished


