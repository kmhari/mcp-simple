# MCP Server for Axiom

A JavaScript port of the [official Axiom MCP server](https://github.com/axiomhq/mcp-server-axiom) that enables AI agents to query data using Axiom Processing Language (APL).

<a href="https://glama.ai/mcp/servers/8hxxw8uenu">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/8hxxw8uenu/badge" />
</a>

This implementation provides the same functionality as the original Go version but packaged as an npm module for easier integration with Node.js environments.

## Installation & Usage

### MCP Configuration

You can run this MCP server directly using npx. Add the following configuration to your MCP configuration file:

```json
{
  "axiom": {
    "command": "npx",
    "args": ["-y", "mcp-server-axiom"],
    "env": {
      "AXIOM_TOKEN": "<AXIOM_TOKEN_HERE>",
      "AXIOM_URL": "https://api.axiom.co",
      "AXIOM_ORG_ID": "<AXIOM_ORG_ID_HERE>"
    }
  }
}
```

### Local Development & Testing

#### Installation

```bash
npm install -g mcp-server-axiom
```

#### Environment Variables

The server can be configured using environment variables:

- `AXIOM_TOKEN` (required): Your Axiom API token
- `AXIOM_ORG_ID` (required): Your Axiom organization ID
- `AXIOM_URL` (optional): Custom Axiom API URL (defaults to https://api.axiom.co)
- `AXIOM_QUERY_RATE` (optional): Queries per second limit (default: 1)
- `AXIOM_QUERY_BURST` (optional): Query burst capacity (default: 1)
- `AXIOM_DATASETS_RATE` (optional): Dataset list operations per second (default: 1)
- `AXIOM_DATASETS_BURST` (optional): Dataset list burst capacity (default: 1)
- `PORT` (optional): Server port (default: 3000)

#### Running the Server Locally

1. Using environment variables:

```bash
export AXIOM_TOKEN=your_token
mcp-server-axiom
```

2. Using a config file:

```bash
mcp-server-axiom config.json
```

Example config.json:

```json
{
  "token": "your_token",
  "url": "https://custom.axiom.co",
  "orgId": "your_org_id",
  "queryRate": 2,
  "queryBurst": 5,
  "datasetsRate": 1,
  "datasetsBurst": 2
}
```

## API Endpoints

- `GET /`: Get server implementation info
- `GET /tools`: List available tools
- `POST /tools/:name/call`: Call a specific tool
  - Available tools:
    - `queryApl`: Execute APL queries
    - `listDatasets`: List available datasets

### Example Tool Calls

1. Query APL:

```bash
curl -X POST http://localhost:3000/tools/queryApl/call \
  -H "Content-Type: application/json" \
  -d '{
    "arguments": {
      "query": "['logs'] | where ['severity'] == \"error\" | limit 10"
    }
  }'
```

2. List Datasets:

```bash
curl -X POST http://localhost:3000/tools/listDatasets/call \
  -H "Content-Type: application/json" \
  -d '{
    "arguments": {}
  }'
```

## License

MIT
