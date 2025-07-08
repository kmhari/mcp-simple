# openweather-mcp

_A Model Context Protocal server for OpenWeather.org API._

## Usage with Claude Desktop

Add the following to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "openweather-mcp": {
      "command": "uvx",
      "args": [
        "openweather-mcp"
      ],
      "env": {
        "OPENWEATHER_API_KEY": "<your_openweather_api_key>"
      },
    }
  }
}
```

It requires `uv` to be installed on your machine. Check the [official documentation](https://docs.astral.sh/uv/getting-started/installation/) for installation guides.

## Available Tools

- `get_current_weather` Get current weather for a given city.
- `get_weather_forecast` Get weather forecast for a given city for the next 5 days.

## Development

```shell
pdm install
pdm dev
```
