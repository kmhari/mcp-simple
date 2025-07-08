# MCP Claude Weather

A CLI tool and MCP server for real-time weather alerts, forecasts, and warnings from the US National Weather Service, powered by MCP Claude. Instantly check local weather, severe alerts, and detailed forecasts from your terminal or connect as a tool to Claude for Desktop.

## Features

- Get active weather alerts for any US state
- Retrieve detailed weather forecasts for any US location (latitude/longitude)
- Designed for integration with Claude for Desktop via the Model Context Protocol (MCP)
- Fast, reliable, and easy to use

## Prerequisites

- Node.js v18+ and npm or pnpm
- [Claude for Desktop](https://modelcontextprotocol.io/quickstart/server) (for integration)
- macOS, Linux, or Windows

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/AlexShan2008/mcp-claude-weather.git
cd mcp-claude-weather
pnpm install
```

Build the project:

```bash
pnpm run build
```

## Usage

### As a Standalone CLI

You can run the MCP Claude Weather server directly from the command line:

```bash
node build/index.js
```

This will start the server and listen for MCP tool calls via standard input/output.

### Integrating with Claude for Desktop

To use this server as a tool in Claude for Desktop:

1. **Build the project** (if you haven't already):

   ```bash
   pnpm run build
   ```

2. **Configure Claude for Desktop**:

   Open (or create) the configuration file at:

   ```
   ~/Library/Application Support/Claude/claude_desktop_config.json
   ```

   Add the following entry (replace `/ABSOLUTE/PATH/TO/mcp-claude-weather` with your actual path):

   ```json
   {
     "mcpServers": {
       "weather": {
         "command": "node",
         "args": ["/ABSOLUTE/PATH/TO/mcp-claude-weather/build/index.js"]
       }
     }
   }
   ```

3. **Restart Claude for Desktop**. The weather tools will now be available via the MCP integration.

For more details, see the [official MCP Quickstart guide](https://modelcontextprotocol.io/quickstart/server).

## Available Tools

### 1. `get-alerts`

Get active weather alerts for a US state.

**Parameters:**

- `state` (string): Two-letter US state code (e.g., `CA`, `NY`)

**Example:**

```json
{
  "tool": "get-alerts",
  "params": { "state": "CA" }
}
```

### 2. `get-forecast`

Get a weather forecast for a specific location.

**Parameters:**

- `latitude` (number): Latitude of the location
- `longitude` (number): Longitude of the location

**Example:**

```json
{
  "tool": "get-forecast",
  "params": { "latitude": 38.58, "longitude": -121.49 }
}
```

## How It Works

- The server uses the [National Weather Service API](https://www.weather.gov/documentation/services-web-api) to fetch real-time weather data.
- All requests are made with a custom user agent for compliance.
- Results are formatted for easy reading and integration with Claude for Desktop.

## Troubleshooting

- Ensure you are using valid US state codes and coordinates.
- Only US locations are supported by the NWS API.
- For integration issues with Claude for Desktop, check the logs at `~/Library/Logs/Claude/`.

## Contributing

Pull requests and issues are welcome! Please see the [Model Context Protocol documentation](https://modelcontextprotocol.io/) for more on building MCP tools.

---

**References:**

- [Model Context Protocol Quickstart (Server)](https://modelcontextprotocol.io/quickstart/server)
- [National Weather Service API](https://www.weather.gov/documentation/services-web-api)

---
