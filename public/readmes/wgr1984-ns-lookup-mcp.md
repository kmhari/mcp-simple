# NS Lookup MCP Server

A simple MCP (Model Context Protocol) Server that exposes the nslookup command functionality. This service provides a REST API interface to perform DNS lookups, making it easy to integrate DNS resolution capabilities into your applications.

## Features

- Exposes nslookup command functionality via a REST API
- Simple and focused microservice
- Modern Python tooling with uv and pyproject.toml
- Supports both forward and reverse DNS lookups
- Configurable DNS server selection
- Clean and concise output formatting

## Requirements

- Python 3.9 or higher
- uv (Python package manager)

## Installation

1. Clone the repository
2. Install dependencies using uv:
```bash
uv pip install -e .
```

## Usage

Start the server:
```bash
uv run ns-lookup-mcp
```

Debug mode:
```bash
npx @modelcontextprotocol/inspector uv run ns-lookup-mcp 
```

### MCP Interface

#### Tools

The server exposes the following tool:

```json
{
  "name": "nslookup",
  "description": "Performs DNS lookups using the nslookup command. Supports both forward and reverse DNS lookups.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "hostname": {
        "type": "string",
        "description": "Domain name or IP address to look up"
      },
      "server": {
        "type": "string",
        "description": "Optional DNS server to use for the lookup"
      }
    },
    "required": ["hostname"]
  }
}
```

#### Prompts

The server provides the following prompt:

```json
{
  "name": "nslookup",
  "description": "Perform a DNS lookup using nslookup",
  "arguments": [
    {
      "name": "hostname",
      "description": "Domain name or IP address to look up",
      "required": true
    },
    {
      "name": "server",
      "description": "Optional DNS server to use",
      "required": false
    }
  ]
}
```

### MCP Client Configuration

To use this server with an MCP client, add the following configuration to your client's settings:

```json
{
  "mcpServers": {
    "nslookup": {
      "command": "uv",
      "args": [
        "run",
        "--directory",
        "[workspace]/ns-lookup-mcp",
        "ns-lookup-mcp"
      ]
    }
  }
}
```

Replace `[workspace]` with the actual path to your workspace directory.

### Example Output

The server returns DNS lookup results in a clean, concise format:

```
DNS:    192.168.1.1
Name:   example.com
Address: 93.184.216.34
```

### Common DNS Servers

- Google DNS: `8.8.8.8`
- Cloudflare DNS: `1.1.1.1`
- OpenDNS: `208.67.222.222`

## License

MIT 