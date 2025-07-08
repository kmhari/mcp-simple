# MyIP MCP Server

## Tools

The server exposes a `get_ip_info` tool to retrieve your public ip address from ifconfig.me.

## Installation

```json
{
  "mcpServers": {
    "myip": {
      "command": "uvx",
      "args": ["mcp-myip"]
    }
  }
}
```
