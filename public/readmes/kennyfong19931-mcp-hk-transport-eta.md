# mcp-hk-transport-eta

This is an MCP server for API from [siri-shortcut-hk-bus-eta](https://github.com/kennyfong19931/siri-shortcut-hk-bus-eta) repo. It allows mcp clients to find Hong Kong transport route and next arrival.

#### Features

- [x] Get route list with route no.
- [x] Get eta from stop

## Usage

### Claude Desktop Configuration

```json
{
  "mcpServers": {
    "hk-transport-eta": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "mcp-hk-transport-eta"
      ]
    }
  }
}
```

## Development

### Setting up Development Environment

To set up the development environment, follow these steps:

1. Install dependencies:

   ```sh
   npm install
   ```

1. Start the model context protocol development server:

   ```sh
   npm run inspect
   ```
