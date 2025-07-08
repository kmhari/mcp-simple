# Device Info MCP Server

This project implements a Model Context Protocol (MCP) server that provides information about electronic devices. It allows searching for devices by model number and retrieving detailed information about them.

## Setup

To run the Device Info MCP server using npx, use the following command:

```bash
npx -y device-info-mcp@latest
```

## Usage with Cursor or Claude Desktop

Add the following configuration. For more information, read the [Cursor MCP documentation](https://docs.cursor.com/context/model-context-protocol) or the [Claude Desktop MCP guide](https://modelcontextprotocol.io/quickstart/user).

```json
{
  "mcpServers": {
    "device-info-mcp": {
      "command": "npx",
      "args": ["-y", "device-info-mcp@latest"]
    }
  }
}
```

On Windows, you might need to use this alternative configuration:

```json
{
  "mcpServers": {
    "device-info-mcp": {
      "command": "cmd",
      "args": ["/k", "npx", "-y", "device-info-mcp@latest"]
    }
  }
}
```

## Available tools

This MCP server provides the following tools:

| Tool Name              | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| search_devices         | Search for devices by model number or other criteria     |
| get_device_details     | Retrieve detailed information about a specific device    |
| get_device_manual      | Retrieve the user manual for a specific device           |

## Available prompts

This MCP server provides the following prompts:

| Prompt Name           | Description                                              |
| --------------------- | -------------------------------------------------------- |
| device_troubleshoot   | Help with troubleshooting a specific device issue        |

## Development

The server is built using the MCP SDK and provides device information from a local database.

1. `npm install`
2. Modify source files
3. Run `npm run build` to compile
4. Run `npm run test` to run tests
5. Add an MCP server that runs this command: `node <absolute_path_of_project>/dist/index.js`

## License

MIT
