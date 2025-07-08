# Vilnius Transport MCP Server

A Model Context Protocol (MCP) server implementation that provides Vilnius public transport data access capabilities to Large Language Models (LLMs). This project demonstrates how to extend LLM capabilities with real-time transport data using the MCP standard.

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) is a standard that enables Large Language Models (LLMs) to securely access external tools and data. MCP allows LLMs to:
- Access real-time or local data
- Call external functions [claude_desktop_config.json](../../../Library/Application%20Support/Claude/claude_desktop_config.json)
- Interact with system resources
- Maintain consistent tool interfaces

This project implements an MCP server that provides Vilnius public transport data tools to LLMs, enabling them to answer queries about public transport stops and routes.

The server exposes the following MCP tools:

- `find_stops`: Search for public transport stops by name
  ```json
  {
    name: string;  // Full or partial name of the stop to search for
  }
- `find_closest_stop`: Find the closest public transport stop to given coordinates
  ```json
  { 
    coordinates: string;  // Format: "latitude, longitude" (e.g., "54.687157, 25.279652")
  }
  ```
To add the MCP server to your Claude development environment, add the following configuration to your claude_desktop_config.json file:
  ```json
     {
      "mcpServers": {
        "vilnius_transport": {
          "command": "uv",
          "args": [
              "--directory",
              "path/vilnius-transport-mcp-server/src/vilnius_transport_mcp",
              "run",
              "transport.py"
          ]
        }
      }
     }
 ```
Note: Make sure to adjust the directory path to match your local installation.

To run the client:
```commandline
uv run client.py path/src/vilnius_transport_mcp/transport.py
```