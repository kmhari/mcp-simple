# 🏓 MCP Ping-Pong Server by Remote Call

An experimental and educational Ping-Pong server demonstrating MCP (Model Context Protocol) calls via FastAPI.

## Features

- ✅ FastAPI/FastMCP backend for remote MCP calls through API endpoints or SSE
- 🔄 MCP integration for command handling
- 🔐 Thread-safe session management

## Quick Start

### Installation

To install the dependencies, run:

```bash
poetry install
```

### 1. Call MCP Tool through API

#### Run the Server

Start the FastAPI server with:

```bash
python mcp-api-server.py
```

The server will start at `http://localhost:8080`.

#### UI

Open `mcp-api-client.html` in a browser to interact with the UI.

<img alt="ui" src="doc/pingpong-ui.png" width="400"/>

#### API Endpoints

- `GET /ping-pong?prompt_name=<prompt_name>`: Retrieves the specified prompt.
- `POST /ping-pong`: Invokes MCP tool commands (`ping`, `pong`, `count`).

### 2. Call MCP Tool through SSE transport

The following example demonstrates using Server-Sent Events (SSE) for communication with the MCP server.

#### Run the SSE Server

```bash
python mcp-sse-server.py
```

#### Run the SSE Client

```bash
python mcp-sse-client.py
```

#### Sample Output

```bash
Type a command (e.g., 'ping', 'pong', 'count') or 'exit' to quit:
>>> ping
Sending command: ping
Result: pong
>>> pong
Sending command: pong
Result: ping
>>> count
Sending command: count
Result: 2
```

## References

- [FastAPI SSE MCP](https://github.com/ragieai/fastapi-sse-mcp)
- [MCP Weather SSE](https://github.com/justjoehere/mcp-weather-sse)
- [MCP Chinese Getting Started Guide](https://github.com/liaokongVFX/MCP-Chinese-Getting-Started-Guide)

## 📄 License

MIT

