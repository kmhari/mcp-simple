# `domain-lookup-mcp`

MCP server to look up domain names via rdap(1) and then whois(1).

## How to use it?

- Checkout the repo
- build it: `go build ./...`
- Point your MCP client at the binary:

```javascript
{
  "mcpServers": {
    "domain-lookup-mcp": {
      "command": "/path/to/domain-lookup-mcp/domain-lookup-mcp",
      "args": [],
      "env": {}
    }
  }
}
```
