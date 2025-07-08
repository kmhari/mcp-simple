# Prometheus MCP

Proof-of-concept Prometheus MCP server.

## Prerequisites

Install `uv`: <https://docs.astral.sh/uv/getting-started/installation/>

Using `uv`, you can also install python.

## How to run

Clone this repo.

Update the .env file

```
uv add "mcp[cli]" pillow google-auth matplotlib requests python-dotenv
```

## Integrating with Claude

You can run the server with

```
uv --directory "/directory/to/prometheus-mcp" run server.py
```

So you may add this MCP server to your Claude MCP server configuration

```
{
  "mcpServers": {
      "Prometheus MCP": {
          "command": "/path/to/uv",
          "args": [
              "--directory",
              "/directory/to/prometheus-mcp",
              "run",
              "server.py"
          ]
      }
  }
}
```

See [MCP Quickstart](https://modelcontextprotocol.io/quickstart/server#testing-your-server-with-claude-for-desktop)
for more details for Claude specific instructions.

## Demo

[![Demo gif](./docs/prom-mcp-demo.gif '')](https://github.com/etruong42/prometheus-mcp/raw/refs/heads/main/docs/prometheus-demo-video.mp4)

[Link to shared Claude chat in demo](https://claude.ai/share/c89412c1-5f19-430a-8c85-bf3c05033f81)
