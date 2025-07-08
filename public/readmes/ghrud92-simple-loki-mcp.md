# Simple Loki MCP Server

[![smithery badge](https://smithery.ai/badge/@ghrud92/simple-loki-mcp)](https://smithery.ai/server/@ghrud92/simple-loki-mcp)

Loki MCP Server is a [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol/mcp) interface for querying Grafana Loki logs using `logcli`. The server enables AI assistants to access and analyze log data from Loki directly.

<a href="https://glama.ai/mcp/servers/@ghrud92/loki-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@ghrud92/loki-mcp/badge" alt="Loki Server MCP server" />
</a>

## Features

- Query Loki logs with full LogQL support
- Get label values and metadata
- Authentication and configuration support via environment variables or config files
- Provides formatted results in different output formats (default, raw, JSON lines)
- Automatic fallback to HTTP API when `logcli` is not available in the environment

## Prerequisites

- Node.js v16 or higher
- TypeScript
- (Optional) [Grafana Loki logcli](https://grafana.com/docs/loki/latest/tools/logcli/) installed and accessible in your PATH. If `logcli` is not available, the server will automatically use the Loki HTTP API instead
- Access to a Loki server instance

## Installation

### Installing via Smithery

To install Simple Loki MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@ghrud92/simple-loki-mcp):

```bash
npx -y @smithery/cli install @ghrud92/simple-loki-mcp --client claude
```

### for MCP

```json
{
  "mcpServers": {
    "simple-loki": {
      "command": "npx",
      "args": ["-y", "simple-loki-mcp"],
      "env": {
        "LOKI_ADDR": "https://loki.sup.band"
      }
    }
  }
}
```

### npm

1. Clone the repository:

```bash
git clone https://github.com/ghrud92/loki-mcp.git
cd loki-mcp
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Available MCP Tools

### query-loki

Query logs from Loki with filtering options.

Parameters:

- `query` (required): Loki query string (LogQL)
- `from`: Start timestamp (e.g. "2023-01-01T12:00:00Z")
- `to`: End timestamp (e.g. "2023-01-01T13:00:00Z")
- `limit`: Maximum number of logs to return
- `batch`: Batch size for query results
- `output`: Output format ("default", "raw", or "jsonl")
- `quiet`: Suppress query metadata
- `forward`: Display results in chronological order

### get-label-values

Retrieve all values for a specific label.

Parameters:

- `label` (required): Label name to get values for

### get-labels

Retrieve all available labels.

No parameters required.

## Configuration

You can configure Loki access using:

### Environment Variables

- `LOKI_ADDR`: Loki server address (URL)
- `LOKI_USERNAME`: Username for basic auth
- `LOKI_PASSWORD`: Password for basic auth
- `LOKI_TENANT_ID`: Tenant ID for multi-tenant Loki
- `LOKI_BEARER_TOKEN`: Bearer token for authentication
- `LOKI_BEARER_TOKEN_FILE`: File containing bearer token
- `LOKI_CA_FILE`: Custom CA file for TLS
- `LOKI_CERT_FILE`: Client certificate file for TLS
- `LOKI_KEY_FILE`: Client key file for TLS
- `LOKI_ORG_ID`: Organization ID for multi-org setups
- `LOKI_TLS_SKIP_VERIFY`: Skip TLS verification ("true" or "false")
- `LOKI_CONFIG_PATH`: Custom path to config file
- `DEBUG`: Enable debug logging

> **Note**: When the client is using the HTTP API mode (when `logcli` is not available), the same configuration parameters are used to authenticate and connect to the Loki server.

### Config Files

Alternatively, create a `logcli-config.yaml` file in one of these locations:

- Custom path specified by `LOKI_CONFIG_PATH`
- Current working directory
- Your home directory (`~/.logcli-config.yaml`)

Example config file:

```yaml
addr: https://loki.example.com
username: user
password: pass
tenant_id: mytenant
```

## Usage

Start the server:

```bash
npm start
```

For development:

```bash
npm run dev
```

## Implementation Details

### Automatic Fallback to HTTP API

The server will automatically check if `logcli` is installed and available in the environment:

1. If `logcli` is available, it will be used for all queries, providing the full functionality of the CLI tool
2. If `logcli` is not available, the server will automatically fall back to using the Loki HTTP API:
   - No additional configuration is needed
   - The same authentication parameters are used for the HTTP API
   - Response formatting is consistent with the CLI output
   - Default limit of 1000 logs per query is applied in both modes

This automatic detection ensures that the server works seamlessly in different environments without manual configuration.

## Development

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm run test
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.