# MPC OpenWeatherMap Server

A simple MCP server that provides current weather information using the OpenWeatherMap API.

## Setup

1. Install dependencies using `uv`:
```bash
uv venv
uv sync
```

2. Create a `.env` file with your OpenWeatherMap API key:
```
OPENWEATHERMAP_API_KEY=your_api_key_here
```

You can get an API key by registering at [OpenWeatherMap API](https://openweathermap.org/api).

## Running the Server

```json
{
    "mcpServers": {
        "weather": {
            "command": "uv",
            "args": ["tool", "run", "--from", "git+https://github.com/leonhardholz/mcp-openweathermap.git", "mcp-openweathermap"],
            "env": {
                "OPENWEATHERMAP_API_KEY": "your_api_key_here"
            }
        }
    }
}
```

## API Usage

### Get Current Weather

Response:
```json
{
    "location": "Berlin",
    "coordinates": {
        "lat": 52.5244,
        "lon": 13.4105
    },
    "country": "DE",
    "current_conditions": {
        "temperature": {
            "value": 18.2,
            "unit": "C"
        },
        "weather_text": "clear sky",
        "feels_like": 17.5,
        "humidity": 65,
        "pressure": 1013,
        "wind_speed": 2.5,
        "wind_direction": 180,
        "cloudiness": 10,
        "observation_time": 1683721962,
        "visibility": 10000
    }
}
```

The API provides:
- Current weather conditions including temperature, weather description, humidity, and wind speed
- Additional details such as:
  - Atmospheric pressure
  - Wind direction
  - Cloudiness percentage
  - Visibility
  - Rain and snow data (when applicable) 