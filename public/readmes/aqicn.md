# AQICN MCP Server
[![smithery badge](https://smithery.ai/badge/@mattmarcin/aqicn-mcp)](https://smithery.ai/server/@mattmarcin/aqicn-mcp)

This is a Model Context Protocol (MCP) server that provides air quality data tools from the World Air Quality Index (AQICN) project. It allows LLMs to fetch real-time air quality data for cities and coordinates worldwide.

## Installation

### Installing via Smithery

To install AQICN MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@mattmarcin/aqicn-mcp):

```bash
npx -y @smithery/cli install @mattmarcin/aqicn-mcp --client claude
```

### Installing via recommended uv (manual)

We recommend using [uv](https://docs.astral.sh/uv/) to manage your Python environment:

```bash
# Install the package and dependencies
uv pip install -e .
```

## Environment Setup

Create a `.env` file in the project root (you can copy from `.env.example`):
```bash
# .env
AQICN_API_KEY=your_api_key_here
```

Alternatively, you can set the environment variable directly:
```bash
# Linux/macOS
export AQICN_API_KEY=your_api_key_here

# Windows
set AQICN_API_KEY=your_api_key_here
```

## Running the Server

### Development Mode
The fastest way to test and debug your server is with the MCP Inspector:

```bash
mcp dev aqicn_server.py
```

### Claude Desktop Integration
Once your server is ready, install it in Claude Desktop:

```bash
mcp install aqicn_server.py
```

### Direct Execution
For testing or custom deployments:

```bash
python aqicn_server.py
```

## Available Tools

### 1. city_aqi
Get air quality data for a specific city.

```python
@mcp.tool()
def city_aqi(city: str) -> AQIData:
    """Get air quality data for a specific city."""
```

**Input:**
- `city`: Name of the city to get air quality data for

**Output:** `AQIData` with:
- `aqi`: Air Quality Index value
- `station`: Station name
- `dominant_pollutant`: Main pollutant (if available)
- `time`: Timestamp of the measurement
- `coordinates`: Latitude and longitude of the station

### 2. geo_aqi
Get air quality data for a specific location using coordinates.

```python
@mcp.tool()
def geo_aqi(latitude: float, longitude: float) -> AQIData:
    """Get air quality data for a specific location using coordinates."""
```

**Input:**
- `latitude`: Latitude of the location
- `longitude`: Longitude of the location

**Output:** Same as `city_aqi`

### 3. search_station
Search for air quality monitoring stations by keyword.

```python
@mcp.tool()
def search_station(keyword: str) -> list[StationInfo]:
    """Search for air quality monitoring stations by keyword."""
```

**Input:**
- `keyword`: Keyword to search for stations (city name, station name, etc.)

**Output:** List of `StationInfo` with:
- `name`: Station name
- `station_id`: Unique station identifier
- `coordinates`: Latitude and longitude of the station

## Example Usage

Using the MCP Python client:

```python
from mcp import Client

async with Client() as client:
    # Get air quality data for Beijing
    beijing_data = await client.city_aqi(city="beijing")
    print(f"Beijing AQI: {beijing_data.aqi}")

    # Get air quality data by coordinates (Tokyo)
    geo_data = await client.geo_aqi(latitude=35.6762, longitude=139.6503)
    print(f"Tokyo AQI: {geo_data.aqi}")

    # Search for stations
    stations = await client.search_station(keyword="london")
    for station in stations:
        print(f"Station: {station.name} ({station.coordinates})")
```

## Contributing

Feel free to open issues and pull requests. Please ensure your changes include appropriate tests and documentation.

## License

This project is licensed under the MIT License.
