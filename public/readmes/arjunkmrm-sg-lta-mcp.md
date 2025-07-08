# Singapore LTA MCP Server
[![smithery badge](https://smithery.ai/badge/@arjunkmrm/mcp-sg-lta)](https://smithery.ai/server/@arjunkmrm/mcp-sg-lta)

An MCP server for Singapore's Land Transport Authority (LTA) DataMall API, providing real-time access to transportation information including bus arrivals, traffic conditions, and train service updates.

### Installing via Smithery

To install Singapore LTA MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@arjunkmrm/mcp-sg-lta):

```bash
npx -y @smithery/cli install @arjunkmrm/mcp-sg-lta --client claude
```

## Tools

### bus_arrival

Get real-time bus arrival information for specific bus stops.

**Inputs:**
- `busStopCode` (string, required): The unique 5-digit bus stop code
- `serviceNo` (string, optional): Specific bus service number to filter results

### station_crowding

Get real-time crowding levels at MRT/LRT stations (Updates every 10 minutes).

**Inputs:**
- `trainLine` (string, required): Code of train network line
  - Supported values: CCL, CEL, CGL, DTL, EWL, NEL, NSL, BPL, SLRT, PLRT, TEL

### train_alerts

Get real-time train service alerts including disruptions and shuttle services.

**Inputs:** None required

### carpark_availability

Get real-time availability of parking lots for HDB, LTA, and URA carparks (Updates every minute).

**Inputs:** None required

### travel_times

Get estimated travel times on expressway segments (Updates every 5 minutes).

**Inputs:** None required

### traffic_incidents

Get current road incidents including accidents, roadworks, and heavy traffic (Updates every 2 minutes).

**Inputs:** None required

### station_crowd_forecast

Get forecasted MRT/LRT station crowdedness levels in 30-minute intervals.

**Inputs:**
- `trainLine` (string, required): Code of train network line
  - Supported values: CCL, CEL, CGL, DTL, EWL, NEL, NSL, BPL, SLRT, PLRT, TEL

## Configuration

### Getting an API Key

1. Register for an account on [LTA DataMall](https://datamall.lta.gov.sg)
2. Subscribe to the API services
3. Obtain your API key from the account dashboard

### Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "lta": {
        "command": "npx", 
        "args": [
          "-y", 
          "arjunkmrm/mcp-sg-lta"
        ],
        "env": {
          "LTA_API_KEY": "YOUR-API-KEY"
        }
    }
  }
}
```

test webhook - test, another, test
test test test
test test test
test test test
test test test
test test test
