# Untappd Model Context Protocol Server

This is a simple MCP server written in `node` to query the [Untappd API](https://untappd.com/api/docs). Unfortunately they are no longer accepting registrations for new API keys. 

Currently only supports 3 tools:

- `search_beer`: This will search Untappd for a beer
- `get_beer_info`: This get's the detailed beer info via the `beer_id` returned from a search.
- `get_user_checkins`: _currently does not work_ This will return a users checkin's. 

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "untappd-server": {
      "command": "/path/to/untappd-server/build/index.js"
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
