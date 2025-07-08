# Keitaro TDS API MCP Plugin

## Description
MCP server for integration with Keitaro TDS API, providing tools to work with campaigns, streams, offers, and other Keitaro entities.

## Installation

### Installing the plugin in Cursor

1. Clone the repository
```bash
git clone <repository-url>
cd mcp-keitaro-tds
```

2. Install dependencies
```bash
npm install
```

3. Install the package globally
```bash
npm install -g .
```

4. Install the plugin in Cursor
```bash
node install-cursor-plugin.js
```

5. Restart Cursor

### Alternative: Manual configuration in Cursor

You can also manually add the Keitaro MCP server to your Cursor configuration:

1. Open the Cursor MCP configuration file:
```bash
# On macOS
open ~/.cursor/mcp.json

# On Windows
notepad %USERPROFILE%\.cursor\mcp.json

# On Linux
nano ~/.cursor/mcp.json
```

2. Add the following entry to the "mcpServers" object:
```json
"Keitaro": {
  "command": "mcp-keitaro-tds",
  "args": []
}
```

3. Save the file and restart Cursor

### API Key Configuration

Create an `.env` file in the project root with the following parameters:

```
KEITARO_API_URL=http://your-keitaro-domain.com/admin_api/v1
KEITARO_API_KEY=your-api-key
```

## Usage in Cursor

1. Launch Cursor
2. Open the command palette (Cmd+P on macOS or Ctrl+P on Windows/Linux)
3. Find "Keitaro" and select it
4. Now you can use the Keitaro API through Cursor

## Available Tools

### Campaigns
- `list_campaigns` - get a list of campaigns
- `get_campaign` - get information about a specific campaign
- `create_campaign` - create a new campaign
- `update_campaign` - update an existing campaign
- `delete_campaign` - delete a campaign

### Traffic Streams
- `list_streams` - get a list of traffic streams for a campaign
- `get_stream` - get information about a specific stream

### Traffic Sources
- `list_traffic_sources` - get a list of traffic sources
- `get_traffic_source` - get information about a specific traffic source

### Offers
- `list_offers` - get a list of offers
- `get_offer` - get information about a specific offer

### Clicks and Conversions
- `list_clicks` - get a list of clicks
- `get_click` - get information about a specific click
- `list_conversions` - get a list of conversions
- `get_conversion` - get information about a specific conversion

### Reports
- `get_report` - generate a report with specified parameters

### Domains
- `list_domains` - get a list of domains
- `get_domain` - get information about a specific domain

## Usage Examples

### Getting a list of campaigns
```javascript
list_campaigns({
  limit: 10,
  page: 1,
  search: "search query"
})
```

### Creating a new campaign
```javascript
create_campaign({
  name: "New Campaign",
  type: "position",
  cost_type: "CPC",
  cost_value: 1.5,
  group_id: 1,
  state: "active",
  traffic_source_id: 1
})
```

### Getting a report
```javascript
get_report({
  from: "2025-01-01",
  to: "2025-01-31",
  group: "campaign",
  filters: {
    campaign_id: 123
  }
})
```

## Development

### Running in development mode
```bash
npm run dev
```

### Testing the MCP server
```bash
npm run inspect
```
