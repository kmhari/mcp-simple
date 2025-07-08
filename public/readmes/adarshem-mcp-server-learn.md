# MCP Weather Server

[![smithery badge](https://smithery.ai/badge/@adarshem/mcp-server-learn)](https://smithery.ai/server/@adarshem/mcp-server-learn)

This project is a demo implementation of a Model Context Protocol (MCP) server that provides weather-related tools. The server exposes two tools:

1. **get-alerts**: Fetches active weather alerts for a given US state.
2. **get-forecast**: Provides a weather forecast for a specific location based on latitude and longitude.

<a href="https://glama.ai/mcp/servers/@adarshem/mcp-server-learn">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@adarshem/mcp-server-learn/badge" alt="Weather Server MCP server" />
</a>

## Features
- Built using Node.js.
- Implements MCP tools for weather data retrieval.
- Uses the US National Weather Service API for accurate and up-to-date weather information.

## Prerequisites
- Node.js installed on your system.
- Familiarity with MCP concepts and tools.

## Setup

### Installing via Smithery

To install mcp-server-learn for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@adarshem/mcp-server-learn):

```bash
npx -y @smithery/cli install @adarshem/mcp-server-learn --client claude
```

### Manual Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd weather
   ```

2. Install dependencies using `pnpm` (as configured in the project):
   ```bash
   pnpm install
   ```

3. Build the project:
   ```bash
   pnpm build
   ```

## Configuration

Update your `settings.json` file of VSCode to add this MCP server

```json
{
    "mcpServers": {
        "weather": {
            "command": "node",
            "args": [
                "/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/build/index.js"
            ]
        }
    }
}
```

## Resources
- [MCP Quickstart Guide](https://modelcontextprotocol.io/quickstart/server)
- [US National Weather Service API](https://www.weather.gov/documentation/services-web-api)