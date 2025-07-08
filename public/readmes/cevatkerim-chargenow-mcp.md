# ChargeNow MCP Server

A Model Context Protocol (MCP) server that provides EV charging station information using the ChargeNow API. This server allows AI assistants supporting the MCP protocol (such as Claude) to search for charging stations near a specified address.

## Features

- Find available EV charging stations near a specified address
- Get real-time availability status of charging points
- View detailed information about charging stations including:
  - Distance from the search location
  - Address and operator information
  - Available connector types and power levels
  - Payment methods supported
  - Opening hours information

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Configuration

The server requires an API key for geocoding services. You can configure it in one of the following ways:

### 1. Environment Variable

Set the `GEOCODE_API_KEY` environment variable:

```bash
export GEOCODE_API_KEY="your_api_key_here"
```

### 2. MCP Server Configuration

When using with an MCP client (like Claude), configure it in your MCP config:

```json
{
  "mcpServers": {
    "chargenow": {
      "command": "node",
      "args": [
        "/path/to/chargenow-mcp/build/index.js"
      ],
      "config": {
        "geocodeApiKey": "your_api_key_here"
      }
    }
  }
}
```

Replace `/path/to/chargenow-mcp/build/index.js` with the absolute path to the built `index.js` file.

## Claude Desktop Configuration

To use this server with Claude Desktop, add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "chargenow": {
      "command": "node",
      "args": [
        "/path/to/chargenow-mcp/build/index.js"
      ],
      "config": {
        "geocodeApiKey": "your_api_key_here"
      }
    }
  }
}
```

The file should be located at:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

## Usage

Once configured, you can use the charging station search functionality in Claude by asking questions like:

- "Find EV charging stations near Brandenburg Gate, Berlin"
- "Are there any available charging points in Munich city center?"
- "Show me charging stations near Bautzener Str Berlin"

## Available Tools

This MCP server provides the following tool:

### find_available_chargepoints

Finds available electric vehicle charge points near a given address.

Parameters:
- `address`: The street address and city (e.g., "Bautzener Str Berlin")

Example response:
```
Charging Stations near Bautzener Str Berlin:

Summary:
• 5 charge points AVAILABLE
• 2 charge points in use (CHARGING)
• 1 charge points OFFLINE

Detailed Locations:

📍 Charging Station Berlin Mitte (0.89 km)
   Address: Brückenstraße 5, 10179 Berlin
   Operator: Allego
   Payment: Credit Card, RFID
   Hours: 24/7
   Connectors: CCS (150kW), CHAdeMO (50kW), Type 2 (22kW)
   Status:
   • 2 available points
   • 1 points in use
   Last updated: 14:32:45

[...additional charging stations...]
```

## API Key Information

This server uses [geocode.maps.co](https://geocode.maps.co) for geocoding services. You need to obtain an API key from their website to use this server.

## License

ISC 