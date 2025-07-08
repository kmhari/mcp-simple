# Trinity-MCP

## Start Server
`./trinity-mcp -t <token>`

# Example

## Initialize
```json
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{"roots":{"listChanged":true},"sampling":{}},"clientInfo":{"name":"ExampleClient","version":"1.0.0"}}}
```

## List Tools
```json
{"jsonrpc":"2.0","id":1,"method":"tools/list"}
```

## Call Tool
```json
{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"f/appId/formulaId","arguments":{"sentence": "words"}}}
```
