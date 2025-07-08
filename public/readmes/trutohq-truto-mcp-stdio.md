# Truto MCP Stdio Proxy

A CLI program that acts as a Stdio proxy for HTTP Streamable MCP servers. It reads newline-delimited JSON-RPC messages from stdin, forwards them to a specified MCP server endpoint via POST requests, and writes the responses to stdout.

## Requirements

- Go 1.24.2 or later (for building from source)

## Installation

### Download Pre-built Binaries

Download the latest release from the [GitHub releases page](https://github.com/truto/truto-mcp-stdio/releases). Choose the appropriate binary for your platform:

- Linux (amd64): `truto-mcp-stdio-linux-amd64-v<version>`
- macOS (Intel): `truto-mcp-stdio-darwin-amd64-v<version>`
- macOS (Apple Silicon): `truto-mcp-stdio-darwin-arm64-v<version>`
- Windows (amd64): `truto-mcp-stdio-windows-amd64-v<version>.exe`

After downloading, make the binary executable (on Unix-like systems):
```bash
chmod +x truto-mcp-stdio-<platform>-v<version>
```

### Building from Source

To build the program from source, run:

```bash
go build -o truto-mcp-stdio
```

## Usage

Run the program with:

```bash
./truto-mcp-stdio-<platform>-v<version> <API_URL>
```

### Arguments

- `<API_URL>`: The API endpoint URL to forward requests to (required)

### Example Usage

```bash
# Using echo to send a JSON-RPC message
echo '{"jsonrpc": "2.0", "method": "example", "params": {}, "id": 1}' | ./truto-mcp-stdio-linux-amd64-v1.0.0 https://api.truto.one/mcp/6b33593a-bcbc-4c59-adad-d21fadbce0b0

# Using a file as input
cat requests.json | ./truto-mcp-stdio-linux-amd64-v1.0.0 https://api.truto.one/mcp/6b33593a-bcbc-4c59-adad-d21fadbce0b0
```

### Usage with Claude

To use this proxy with Claude, add the following configuration to your Claude settings:

```json
{
  "mcpServers": {
    "outlook": {
      "command": "truto-mcp-stdio-<platform>-v<version>",
      "args": ["https://api.truto.one/mcp/6b33593a-bcbc-4c59-adad-d21fedadbc0b0"]
    }
  }
}
```

This configuration will allow Claude to use the proxy for making API calls to the specified endpoint.

## Development

To run the program during development:

```bash
go run truto-mcp-stdio.go <API_URL>
```

## Input/Output Format

- Input: Newline-delimited JSON-RPC messages from stdin
- Output: API responses written to stdout
- Errors: Error messages are written to stderr 