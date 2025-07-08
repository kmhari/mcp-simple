# Domain Check MCP Server

A Model Context Protocol (MCP) server for checking domain availability using IONOS endpoints.

## Important Legal Notice

The IONOS API endpoints used in this project are:

- **Not publicly documented**
- **Used at your own risk**

This project is provided for educational purposes only. Usage of these endpoints may violate IONOS's Terms of Service. The author assumes no liability for any legal consequences resulting from the use of this software.

## Installation

```bash
npm install -g domain-check-mcp
```

Or using npx:

```bash
npx domain-check-mcp
```

## Available Tools

- `check_domain_availability` - Checks if a domain is available
- `get_domain_recommendations` - Gets alternative domain suggestions
- `get_sedo_offers` - Checks Sedo marketplace for domain offers

## Recommended MCP Configuration

To use the `domain-check-mcp` server in your windsuf/mcp_config.json, configure it as follows:

```json
{
  "mcpServers": {
    "domain": {
      "command": "npx",
      "args": ["-y", "domain-check-mcp"]
    }
  }
}
```

This will launch the domain MCP server using `npx` directly, ensuring you always use the latest published version.

## Quick Start

1. Install (if not using npx):
   ```sh
   npm install -g domain-check-mcp
   # or
   bun add -g domain-check-mcp
   ```
2. Or run directly (recommended):
   ```sh
   npx -y domain-check-mcp
   ```

## Development

- For local development, build with:
  ```sh
  bun run build
  # or
  npm run build
  ```
- Then run:
  ```sh
  node build/index.js
  ```

## Configuration

Refer to the example above for the recommended setup in `mcp_config.json`.

## Disclaimer

The author assumes no liability for any legal consequences resulting from the use of this software.
