# SolarWinds Logs MCP Server

A Model Context Protocol (MCP) server for accessing and visualizing SolarWinds Observability logs.

## Note - 

This server is currently incomplete as it does not support 
structured data search (a limitation of the REST API?). I'm
uncertain if it also needs to accept a data center to use
in the api endpoint calls. Will address both when time allows 
(needed it for a real work problem, have to fix that first)

### Tools

#### search_logs
Search SolarWinds Observability logs with optional filtering
- Takes search parameters including filter, time range, and pagination options
- Returns formatted log entries with timestamps, hostnames, and messages
- Supports advanced filtering by group, entity, and more
- Default search range is the last 24 hours

#### visualize_logs
Generate a histogram json response for of log events
- Formatted for Claude and canvas representations
- Configurable time intervals (minute, hour, day)
- Supports UTC or local time zones
- Customizable query filters and time ranges
- Default visualization range is the last 24 hours

### Resources

#### SolarWinds Log Search
- URI Template: `solarwinds://{query}/search`
- Returns log entries matching the specified query
- Example: `solarwinds://error/search`

## Installation

Optionally install from npm:
```bash
npm install -g mcp-solarwinds
```

Or clone and build from source:
```bash
git clone https://github.com/@jakenuts/mcp-solarwinds.git
cd mcp-solarwinds
npm install
npm run build
```
Or just use npx in your configurations

### For Cline VSCode Extension

Add to `%APPDATA%/Code - Insiders/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "solarwinds": {
      "command": "npx",
      "args": ["-y", "mcp-solarwinds"],
      "env": {
        "SOLARWINDS_API_TOKEN": "your-api-token"
      },
      "autoApprove": ["search_logs", "visualize_logs"]
    }
  }
}
```

### For Claude Desktop

Add to the appropriate config file:

Windows: `%APPDATA%/Claude/claude_desktop_config.json`
MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "solarwinds": {
      "command": "npx",
      "args": ["-y", "mcp-solarwinds"],
      "env": {
        "SOLARWINDS_API_TOKEN": "your-api-token"
      }
    }
  }
}
```

### Special Windows Configuration

If you encounter the ENOENT spawn npx issue on Windows, use this alternative configuration that specifies the full paths:

```json
{
  "mcpServers": {
    "solarwinds": {
      "command": "C:\\Users\\[username]\\AppData\\Roaming\\nvm\\[node-version]\\node.exe",
      "args": [
        "C:\\Users\\[username]\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npx-cli.js",
        "-y",
        "mcp-solarwinds"
      ],
      "env": {
        "SOLARWINDS_API_TOKEN": "your-api-token"
      }
    }
  }
}
```

## Configuration

The SolarWinds Observability MCP server requires an API token to authenticate with the SolarWinds Observability API.

### Configuration Methods

There are multiple ways to provide the API token:

1. **MCP Settings Configuration (Recommended)**: Configure the token in your MCP settings file
2. **Environment Variable**: Set the `SOLARWINDS_API_TOKEN` environment variable
3. **Local .env File (For Testing)**: Create a `.env` file in the project root with `SOLARWINDS_API_TOKEN=your-token`

For local testing, you can:
1. Copy `.env.example` to `.env` and add your token
2. Run the example script: `node examples/local-test.js`

## Tool Usage Examples

### search_logs

Basic search:
```json
{
  "filter": "error"
}
```

Advanced search with time range and pagination:
```json
{
  "filter": "error",
  "entityId": "web-server",
  "startTime": "2025-03-01T00:00:00Z",
  "endTime": "2025-03-05T23:59:59Z",
  "pageSize": 100,
  "direction": "backward"
}
```

### visualize_logs

Basic histogram (ASCII chart):
```json
{
  "filter": "error",
  "interval": "hour"
}
```

Advanced visualization (ASCII chart):
```json
{
  "filter": "error",
  "entityId": "web-server",
  "startTime": "2025-03-01T00:00:00Z",
  "endTime": "2025-03-05T23:59:59Z",
  "interval": "day",
  "use_utc": true
}
```

Claude visualization (JSON format):
```json
{
  "filter": "error",
  "interval": "hour",
  "format": "json"
}
```

The JSON format returns data that Claude can visualize as a chart:
```json
{
  "timeRanges": ["12:02", "12:03", "12:04", "12:05", "12:06", "12:07", "12:08", "12:09"],
  "counts": [261, 47, 48, 48, 31, 262, 270, 33],
  "total": 1000,
  "queryParams": {
    "query": "error",
    "startTime": "2025-03-05T00:00:00.000Z",
    "endTime": "2025-03-05T23:59:59.000Z"
  }
}
```

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. The MCP Inspector provides helpful debugging tools:

```bash
npm run debug:inspector
```

This will provide a URL to access the inspector in your browser, where you can:
- View all MCP messages
- Inspect request/response payloads
- Test tools interactively
- Monitor server state

For local testing without the MCP framework:
```bash
# Create a .env file with your token
cp .env.example .env
# Edit .env to add your token
# Run the example script
node examples/local-test.js
```

## Technical Details

- Built with TypeScript and the MCP SDK
- Uses axios for API communication
- Supports ISO 8601 date formats for time ranges
- Generates ASCII histograms for log visualization
- Default search range: last 24 hours
- Default page size: 50 logs
- Supports multiple authentication methods
