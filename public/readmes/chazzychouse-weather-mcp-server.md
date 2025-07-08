# MCP Weather Server

- A basic implementation of the quick start MCP server using typescript. The implementation includes two tools. Data is queried from `https://api.weather.gov`

## Setup With Claude Desktop

- Navigate to Claude desktop's AppData, and create a `claude_desktop_config.json` if it is not present.

  Windows Path: `C:/users/<Username>/AppData/Roaming/Claude`

  ```json
  {
    "mcpServers": {
      "weather": {
        "command": "node",
        "args": ["<Drive>:\\PATH\\TO\\PROJECT\\build\\index.js"]
      }
    }
  }
  ```

## Troubleshooting

- See [MCP documentation](https://modelcontextprotocol.io/docs/tools/debugging) for tips on troubleshooting

## Capabilities

- ### Tools
  - #### get-forecast
    - gets a weekly weather forecast for a latitude and longitude. (obtained by the client using prompted area in the US)
  - #### get-alerts
    - gets any current alerts for a state code, tokenized by the client.
