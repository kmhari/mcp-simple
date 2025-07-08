# Weather MCP Server

This MCP server fetches weather data from the National Weather Service API. It provides two tools:

- **get_alerts(state: str)**  
  Returns active weather alerts for a given US state (using its two-letter code).

- **get_forecast(latitude: float, longitude: float)**  
  Returns a short-term weather forecast for a specified location.

## Requirements

- Python 3.7+
- [httpx](https://www.python-httpx.org/)
- MCP Framework mcp[cli]

so install, run:

```bash
uv add mcp[cli] httpx requests
```

## Usage

Run the server with:

```bash
uv run weather.py
```

The server uses standard I/O for communication.

## MCP Client Configuration

configuration snippet for your MCP client (`config.json`):

```json
{
  "mcpServers": {
    "weather": {
      "command": "C:/path/to/your/uv",
      "args": [
        "--directory",
        "C:/path/to/your/project",
        "run",
        "weather.py"
      ]
    }
  }
}
```
