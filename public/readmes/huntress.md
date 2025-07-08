# Huntress API MCP Server
[![smithery badge](https://smithery.ai/badge/huntress-mcp-server)](https://smithery.ai/server/huntress-mcp-server)

A Model Context Protocol (MCP) server that provides tools for interacting with the Huntress API. This server enables programmatic access to Huntress functionality including account management, organization management, agent management, incident reports, and more.

<a href="https://glama.ai/mcp/servers/hry99k6xc2"><img width="380" height="200" src="https://glama.ai/mcp/servers/hry99k6xc2/badge" alt="Huntress-MCP-Server MCP server" /></a>

## Features

- Account information retrieval
- Organization management
- Agent management and monitoring
- Incident report access
- Summary report generation
- Billing report access
- Built-in rate limiting (60 requests per minute)
- Error handling and response formatting

## Installation

### Installing via Smithery

To install Huntress API MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/huntress-mcp-server):

```bash
npx -y @smithery/cli install huntress-mcp-server --client claude
```

### Manual Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file based on `.env.example`:
```bash
HUNTRESS_API_KEY=your_api_key_here
HUNTRESS_API_SECRET=your_api_secret_here
```
4. Build the server:
```bash
npm run build
```

## Available Tools

### Account Management
- `get_account_info`: Get information about the current account

### Organization Management
- `list_organizations`: List organizations in the account
- `get_organization`: Get details of a specific organization

### Agent Management
- `list_agents`: List agents in the account
- `get_agent`: Get details of a specific agent

### Incident Reports
- `list_incident_reports`: List incident reports
- `get_incident_report`: Get details of a specific incident report

### Summary Reports
- `list_summary_reports`: List summary reports
- `get_summary_report`: Get details of a specific summary report

### Billing Reports
- `list_billing_reports`: List billing reports
- `get_billing_report`: Get details of a specific billing report

## Configuration

The server requires the following environment variables:

- `HUNTRESS_API_KEY`: Your Huntress API Key
- `HUNTRESS_API_SECRET`: Your Huntress API Secret Key

These can be obtained from your Huntress account at `<your_account_subdomain>.huntress.io` under API Credentials.

## Usage with MCP

Add the following configuration to your MCP settings:

```json
{
  "mcpServers": {
    "huntress": {
      "command": "node",
      "args": ["path/to/huntress-server/build/index.js"],
      "env": {
        "HUNTRESS_API_KEY": "your_api_key_here",
        "HUNTRESS_API_SECRET": "your_api_secret_here"
      }
    }
  }
}
```

## Rate Limiting

The server implements Huntress API's rate limiting of 60 requests per minute on a sliding window. This means:
- No more than 60 requests can be made within any 60-second period
- The window slides, so if request 1 is made at T0 and request 60 at T30, request 61 must wait until T60

## Error Handling

The server handles various error scenarios:
- Invalid API credentials
- Rate limit exceeded
- Invalid request parameters
- API response errors

## License

MIT License - See LICENSE file for details
