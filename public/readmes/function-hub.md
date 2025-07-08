# Function Hub MCP Server

MCP Server for the Function Hub API.

## Setup

### API Key
Get a function hub API Key [here](https://function-hub.com/api-keys).

### Usage with Claude Desktop

Add the following to your `claude_desktop_config.json`:

### NPX

```json
{
  "mcpServers": {
    "function-hub": {
      "command": "npx",
      "args": [
        "-y",
        "github:segun/mcp-server-function-hub"
      ],
      "env": {
        "API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}
```

## Build

Docker build:

```bash
docker build -t mcp/google-maps -f src/google-maps/Dockerfile .
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.