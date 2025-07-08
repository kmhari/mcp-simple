[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/cloudywu0410-python-sandbox-mcp-server-badge.png)](https://mseep.ai/app/cloudywu0410-python-sandbox-mcp-server)

# Python Sandbox MCP Server

A secure Python code execution server that enables LLMs to run Python code safely in isolated
Docker containers. The server supports:

- Regular Python code execution with stdout capture
- Matplotlib plotting with PNG image generation
- Secure sandboxing via Snekbox Docker container
- Real-time communication using Server-Sent Events (SSE)

## Development

To get started with development, follow these steps:

### Step 1: Clone the Repository

Fork and clone the repository:

```bash
git clone https://github.com/username/python_sandbox_mcp_server.git
```

Navigate into the project directory:

```bash
cd python_sandbox_mcp_server
```

### Step 2: Install Dependencies

Install the required dependencies:

```bash
uv add -r requirements.txt
```

### Step 3: Build the Python Sandbox

Pull the Snekbox Container Image:

```bash
docker pull ghcr.io/python-discord/snekbox:latest
```

Start the Container with Security Parameters:

```bash
docker run -d --ipc=none --privileged -p 8060:8060 ghcr.io/python-discord/snekbox
```

Install Additional Dependencies (Optional):

- If additional Python packages are required, you can install them as follows:

```bash
docker exec <container_id> /bin/sh -c \
    'PYTHONUSERBASE=/snekbox/user_base /snekbox/python/default/bin/python -m pip install --user <package_name>'
```

- Replace <container_id> with the ID of your running Snekbox container and <package_name> with the desired package.

### Step 4: Update MCP Server Configuration

Update your MCP server configuration to point to the local build:

```json
{
  "mcpServers": {
    "python-sandbox-sse": {
      "command": "mcp-proxy",
      "args": [
        "http://localhost:8060/eval"
      ],
      "ssePath": "/eval"
    }
  }
}
```

## Configuration

The server can be configured through the following environment variables or by modifying the `Config` class:

- `MCP_SERVER_NAME`: Server identifier (default: "python-sandbox-mcp-sse")
- `SNEKBOX_URL`: Snekbox API endpoint (default: "http://localhost:8060/eval")
- `TEMP_DIR`: Directory for temporary files storage

## License

[MIT License](LICENSE)