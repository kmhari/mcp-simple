# Travel Agent MCP

This is an implementation of the Model Context Protocol (MCP) for the [RapidAPI Skyscanner API](https://rapidapi.com/Champlion/api/skyscanner89). The MCP protocol is used to query flights and make bookings.

## Tools

-   `getDate` - Get the current date.
-   `flightsAutoComplete` - Get airport data from the given query.
-   `flightsOneWay` - Get one-way flight data from the given query.

## Running in Claude

To run this code in Claude, follow the instructions found [here](https://modelcontextprotocol.io/quickstart/user) and add the following to the config:

```json
{
    "mcpServers": {
        "Travel Agent": {
            "type": "stdio",
            "command": "npx",
            "args": ["supergateway", "--sse", "https://michelin-mcp.deno.dev"]
        }
    }
}
```
