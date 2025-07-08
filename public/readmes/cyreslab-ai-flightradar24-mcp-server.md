# Flightradar24 MCP Server

A Model Context Protocol (MCP) server that provides access to flight tracking data from Flightradar24.

## Features

### Tools

- **get_flight_data**: Get real-time data for a specific flight by flight number
- **search_flights**: Search for flights by various criteria (airline, flight number, registration, geographic area)
- **get_airport_data**: Get detailed information about an airport by IATA or ICAO code
- **search_airports**: Search for airports by name, country, or other criteria
- **get_airline_data**: Get detailed information about an airline by IATA or ICAO code
- **get_aircraft_data**: Get detailed information about an aircraft by registration number
- **get_flights_in_zone**: Get all flights currently in a specified geographic zone

### Resources

- **flight://{flight_id}**: Information about a flight by IATA or ICAO flight code
- **airport://{code}**: Information about an airport by IATA or ICAO code
- **airline://{code}**: Information about an airline by IATA or ICAO code
- **aircraft://{registration}**: Information about an aircraft by registration number
- **zone://{north}/{south}/{west}/{east}**: Flights in a specified geographic zone

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the server:
   ```bash
   npm run build
   ```

## Configuration

The server requires a Flightradar24 API key to function. You can set this in your MCP settings configuration file:

```json
{
  "mcpServers": {
    "flightradar24": {
      "command": "node",
      "args": ["/path/to/flightradar24-server/build/index.js"],
      "env": {
        "FLIGHTRADAR24_API_KEY": "YOUR_FLIGHTRADAR24_API_KEY_HERE"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## Usage Examples

### Get Flight Data

```
<use_mcp_tool>
<server_name>flightradar24</server_name>
<tool_name>get_flight_data</tool_name>
<arguments>
{
  "flight_iata": "BA123"
}
</arguments>
</use_mcp_tool>
```

### Search Flights

```
<use_mcp_tool>
<server_name>flightradar24</server_name>
<tool_name>search_flights</tool_name>
<arguments>
{
  "airline_iata": "BA",
  "limit": 5
}
</arguments>
</use_mcp_tool>
```

### Get Airport Data

```
<use_mcp_tool>
<server_name>flightradar24</server_name>
<tool_name>get_airport_data</tool_name>
<arguments>
{
  "code": "LHR"
}
</arguments>
</use_mcp_tool>
```

### Get Flights in Zone

```
<use_mcp_tool>
<server_name>flightradar24</server_name>
<tool_name>get_flights_in_zone</tool_name>
<arguments>
{
  "north": 51.6,
  "south": 51.4,
  "west": -0.5,
  "east": 0.2
}
</arguments>
</use_mcp_tool>
```

### Access Flight Resource

```
<access_mcp_resource>
<server_name>flightradar24</server_name>
<uri>flight://BA123</uri>
</access_mcp_resource>
```

### Access Zone Resource

```
<access_mcp_resource>
<server_name>flightradar24</server_name>
<uri>zone://51.6/51.4/-0.5/0.2</uri>
</access_mcp_resource>
```

## API Key

To use this server, you'll need a Flightradar24 API key. Please note that Flightradar24 does not offer a public API, so you may need to explore alternative options:

1. Use a third-party API provider that offers Flightradar24 data
2. Contact Flightradar24 directly for enterprise API access
3. Consider using alternative flight tracking data sources like:
   - AviationStack
   - FlightAware
   - OpenSky Network

## License

This project is licensed under the MIT License - see the LICENSE file for details.
