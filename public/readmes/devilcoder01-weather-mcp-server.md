# Weather MCP Server

[![smithery badge](https://smithery.ai/badge/@devilcoder01/weather-mcp-server)](https://smithery.ai/server/@devilcoder01/weather-mcp-server)

A Model Context Protocol (MCP) server for weather data, built with FastAPI and the MCP framework. This server provides various weather-related tools that can be used by AI assistants to retrieve current weather conditions, forecasts, air quality data, and more.

## Features

- Current weather conditions
- Weather forecasts (1-14 days)
- Historical weather data
- Weather alerts
- Air quality information
- Astronomy data (sunrise, sunset, moon phases)
- Location search
- Timezone information
- Sports events

## Requirements

- Python 3.13+
- [uv](https://github.com/astral-sh/uv) package manager
- [WeatherAPI](https://www.weatherapi.com/) API key

## Installation

### Installing via Smithery

To install Weather Data Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@devilcoder01/weather-mcp-server):

```bash
npx -y @smithery/cli install @devilcoder01/weather-mcp-server --client claude
```

### Manual Installation
1. Clone this repository:
   ```
   git clone https://github.com/yourusername/Weather_mcp_server.git
   cd Weather_mcp_server
   ```

2. Install dependencies using uv:
   ```
   uv venv
   uv pip install -e .
   ```

3. Create a `.env` file in the project root with your WeatherAPI key:
   ```
   WEATHER_API_KEY=your_api_key_here
   ```

## Usage

Run the server:

```
python main.py
```

The server will start on http://localhost:8000 by default.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
