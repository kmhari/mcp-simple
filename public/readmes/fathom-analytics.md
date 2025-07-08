# MCP Fathom Analytics

An unofficial Model Context Protocol ([MCP](https://modelcontextprotocol.io/introduction)) server for accessing [Fathom Analytics](https://usefathom.com/) data through an AI assistant. This implementation uses the [@mackenly/fathom-api](https://github.com/mackenly/fathom-api) unofficial SDK to interact with the Fathom Analytics API. Not affiliated, endorsed, or supported by Fathom Analytics. Published to [npm as an npx script](https://www.npmjs.com/package/mcp-fathom-analytics).

[![smithery badge](https://smithery.ai/badge/@mackenly/mcp-fathom-analytics)](https://smithery.ai/server/@mackenly/mcp-fathom-analytics)

<p float="left">
<a href="https://glama.ai/mcp/servers/56cxbakbc4" width="33%">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/56cxbakbc4/badge" alt="Fathom Analytics MCP server" />
</a> 
<a href="https://mseep.ai/app/mackenly-mcp-fathom-analytics" width="33%">
  <img width="200" src="https://mseep.net/pr/mackenly-mcp-fathom-analytics-badge.png" alt="MseeP.ai Security Assessment Badge" />
</a>
</p>

## Features

The MCP server provides the following Fathom Analytics tools:

### Account Information
- `get-account`: Retrieve details about your Fathom Analytics account

### Sites Management
- `list-sites`: List all your Fathom Analytics sites

### Events
- `list-events`: List events for a specific site

### Analytics
- `get-aggregation`: Generate aggregated analytics reports with flexible filtering and grouping options

### Visitor Tracking
- `get-current-visitors`: Get real-time data about current site visitors

## Usage
If you're using Claude Desktop, you can add the MCP server using the json config ([more info](https://modelcontextprotocol.io/quickstart/user)). Here's an example:
```json
{
    "mcpServers": {
        "fathom-analytics": {
            "command": "npx",
            "args": [
                "-y",
                "mcp-fathom-analytics"
            ],
            "env": {
                "FATHOM_API_KEY": "your_api_key_here"
            }
        }
    }
}
```

You can find more information about other MCP Clients here: [Model Context Protocol Example Clients](https://modelcontextprotocol.io/clients)

## API Structure

The MCP server uses the [@mackenly/fathom-api](https://github.com/mackenly/fathom-api) SDK to interface with the Fathom Analytics API endpoints:

1. **Account API**: `https://api.usefathom.com/v1/account`
2. **Sites API**: `https://api.usefathom.com/v1/sites`
3. **Events API**: `https://api.usefathom.com/v1/sites/SITE_ID/events`
4. **Aggregation API**: `https://api.usefathom.com/v1/aggregations`
5. **Current Visitors API**: `https://api.usefathom.com/v1/current_visitors`

## Aggregation Examples

The aggregation tool is highly flexible. Here are some example use cases:

1. **Daily pageview statistics for the last 30 days**:
```json
{
  "entity": "pageview",
  "entity_id": "SITE_ID",
  "aggregates": "pageviews,uniques,visits",
  "date_grouping": "day",
  "date_from": "2023-08-01 00:00:00"
}
```

2. **Performance of individual pages**:
```json
{
  "entity": "pageview",
  "entity_id": "SITE_ID",
  "aggregates": "pageviews,uniques,avg_duration",
  "field_grouping": "pathname",
  "sort_by": "pageviews:desc",
  "limit": 10
}
```

3. **Traffic from specific countries**:
```json
{
  "entity": "pageview",
  "entity_id": "SITE_ID",
  "aggregates": "visits",
  "field_grouping": "country_code",
  "sort_by": "visits:desc"
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
