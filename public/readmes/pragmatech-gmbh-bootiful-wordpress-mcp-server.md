# Bootiful WordPress MCP Server 🍃

## Installation 

- Build the project with: `./mvnw package`

- Edit Claude Desktop (Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
      "bootiful-wordpress-mcp-server": {
        "command": "/path/to/java",
        "args": [
          "-jar",
          "/path/to/your/jar/bootiful-wordpress-mcp-server.jar"
        ]
    }
  }
}
```

Example:

```json
{
  "mcpServers": {
    "bootiful-wordpress-mcp-server": {
      "command": "/Users/rieckpil/.sdkman/candidates/java/24-amzn/bin/java",
      "args": [
        "-jar",
        "/Users/rieckpil/Development/git/bootiful-wordpress-mcp-server/target/bootiful-wordpress-mcp-server.jar"
      ]
    }
  }
}
```

- Restart Claude Desktop
- Start using the MCP server

## Development

