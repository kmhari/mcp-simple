# Travel Planner MCP Server (@gongrzhe/server-travelplanner-mcp)
[![smithery badge](https://smithery.ai/badge/@GongRzhe/TRAVEL-PLANNER-MCP-Server)](https://smithery.ai/server/@GongRzhe/TRAVEL-PLANNER-MCP-Server)

A Travel Planner Model Context Protocol (MCP) server implementation for interacting with Google Maps and travel planning services. This server enables LLMs to perform travel-related tasks such as location search, place details lookup, and travel time calculations.

<a href="https://glama.ai/mcp/servers/y3u6yjiiq1">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/y3u6yjiiq1/badge" alt="Travel Planner Server MCP server" />
</a>

## Installation & Usage
### Installing via Smithery

To install Travel Planner for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@GongRzhe/TRAVEL-PLANNER-MCP-Server):

```bash
npx -y @smithery/cli install @GongRzhe/TRAVEL-PLANNER-MCP-Server --client claude
```

### Installing Manually
```bash
# Using npx (recommended)
npx @gongrzhe/server-travelplanner-mcp

# With environment variable for Google Maps API
GOOGLE_MAPS_API_KEY=your_api_key npx @gongrzhe/server-travelplanner-mcp
```

Or install globally:

```bash
# Install globally
npm install -g @gongrzhe/server-travelplanner-mcp

# Run after global installation
GOOGLE_MAPS_API_KEY=your_api_key @gongrzhe/server-travelplanner-mcp
```

## Components

### Tools

- **searchPlaces**
  - Search for places using Google Places API
  - Input:
    - `query` (string): Search query for places
    - `location` (optional): Latitude and longitude to bias results
    - `radius` (optional): Search radius in meters

- **getPlaceDetails**
  - Get detailed information about a specific place
  - Input:
    - `placeId` (string): Google Place ID to retrieve details for

- **calculateRoute**
  - Calculate route between two locations
  - Input:
    - `origin` (string): Starting location
    - `destination` (string): Ending location
    - `mode` (optional): Travel mode (driving, walking, bicycling, transit)

- **getTimeZone**
  - Get timezone information for a location
  - Input:
    - `location`: Latitude and longitude coordinates
    - `timestamp` (optional): Timestamp for time zone calculation

## Configuration

### Usage with Claude Desktop

To use this server with the Claude Desktop app, add the following configuration to the "mcpServers" section of your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "travel-planner": {
      "command": "npx",
      "args": ["@gongrzhe/server-travelplanner-mcp"],
      "env": {
        "GOOGLE_MAPS_API_KEY": "your_google_maps_api_key"
      }
    }
  }
}
```

Alternatively, you can use the node command directly if you have the package installed:

```json
{
  "mcpServers": {
    "travel-planner": {
      "command": "node",
      "args": ["path/to/dist/index.js"],
      "env": {
        "GOOGLE_MAPS_API_KEY": "your_google_maps_api_key"
      }
    }
  }
}
```

## Development

### Building from Source

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```

### Environment Variables

- `GOOGLE_MAPS_API_KEY` (required): Your Google Maps API key with the following APIs enabled:
  - Places API
  - Directions API
  - Geocoding API
  - Time Zone API

## License

This MCP server is licensed under the MIT License. For more details, please see the LICENSE file in the project repository.