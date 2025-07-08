# Coresignal MCP 

The Coresignal MCP Server enables seamless integration of Coresignal's data with AI-powered applications. By connecting to this server, AI assistants can access fresh B2B data about companies, employees, and job postings directly within chat interfaces.

## Connect the Coresignal MCP

The server is accessible via the following link:

https://mcp.coresignal.com/sse

To connect to the remote Coresignal MCP server using mcp-remote you need to have [Node.js](https://nodejs.org/en) installed.

## Required configuration

To add the Coresignal MCP server to your client, include the following JSON object in MCP client configuration:

```javascript

{
  "mcpServers": {
    "coresignal_data_api": {
      "command": "npx",
      "args": [
        "mcp-remote@0.0.22",
        "https://mcp.coresignal.com/sse",
        "--header",
        "apikey:${APIKEY_VALUE}"
      ],
      "env": {
        "APIKEY_VALUE": "<api_key>"
      }
    }
  }
}
```

## Available tools

The MCP server provides access to the following data entities:

- Coresignal Multi-source Company API: Access to 39M+ company records.
- Coresignal Multi-source Employee API: Access to 725M+ employee records.
- Coresignal Jobs API: Access to 349M+ job posting records

## Usage example

Below is an example of how you can use Coresignal MCP:

[Example request] Get 5 IT companies in Austin.

Response:
1. Bazaarvoice - Software Development company with 1,744 employees 
2. Upland BA Insight - AI-enablement platform with 39 employees 
3. Blue Goji - Health Tech company with 54 employees 
4. Bloomfire - Knowledge Management Software with 79 employees 
5. Brightpearl by Sage - Software Development company with 135 employees

## Documentation

For more detailed API documentation and further information, visit the [Coresignal Documentation](https://docs.coresignal.com/api).

