# NetBox MCP Server

A Model Context Protocol (MCP) server that connects to NetBox and exposes network infrastructure data for use with Claude and other MCP-compatible LLMs.

## Overview

This server provides a bridge between NetBox and MCP-compatible LLMs like Claude, allowing you to:

- Query and analyze your network infrastructure data
- Check device configurations and connections
- Examine virtualization clusters and virtual machines
- Analyze VLANs, IP address allocations, and more
- Generate network topology information
- Detect NVMe storage in clusters

The server exposes:
- **Tools**: Functions that perform operations

## Requirements

- Python 3.10 or higher
- NetBox instance with API access
- NetBox API token with read permissions
- `httpx` library for HTTP requests
- `mcp` Python SDK for Model Context Protocol

## Installation

### Using uv (recommended)

```bash
# Create a virtual environment
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install required packages
uv add mcp httpx
```

### Using pip

```bash
# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install required packages
pip install mcp httpx
```

## Usage

### Running the Server Directly

```bash
python netbox_server.py --url https://your-netbox-instance.example.com --token your-api-token
```

You can also set environment variables instead of using command-line arguments:

```bash
export NETBOX_URL="https://your-netbox-instance.example.com"
export NETBOX_TOKEN="your-api-token"
python netbox_server.py
```

### Integration with Claude Desktop

To integrate with Claude Desktop:

1. Install Claude Desktop from [https://claude.ai/download](https://claude.ai/download)
2. Open the Claude menu and select "Settings..."
3. Click on "Developer" in the left sidebar
4. Click on "Edit Config"
5. Add the NetBox server configuration to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "netbox": {
      "command": "python",
      "args": [
        "/path/to/netbox_server.py",
        "--url",
        "https://your-netbox-instance.example.com",
        "--token",
        "your-api-token"
      ]
    }
  }
}
```

6. Save the file and restart Claude Desktop

## Available Features

### Tools

The server provides these tools:

- `get_all_clusters` - Get list of all clusters with key information
- `get_cluster_virtual_machines` - Get all VMs in a specific cluster
- `get_cluster_interfaces` - Get all interfaces from all VMs in a cluster

## Example Queries for Claude

Once the server is connected to Claude Desktop, you can ask questions like:

- "Show me a list of all clusters in our NetBox instance"
- "Show me all the virtual machines in our primary cluster"

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [NetBox](https://github.com/netbox-community/netbox) - Network infrastructure modeling
- [Model Context Protocol](https://modelcontextprotocol.io) - Protocol for providing context to LLMs
- [Claude](https://claude.ai) - Anthropic's AI assistant
