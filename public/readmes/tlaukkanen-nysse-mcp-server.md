# Tampere Bus MCP Server

This is a Model Context Protocol (MCP) server that provides tools for AI agents to access bus traffic information for Tampere's public transport system. This enables AI assistants to answer questions like "When is the next bus stopping at Tuotekatu bus stop?"

## Features

- Search for bus stops by name
- Get real-time information about upcoming bus arrivals at specific stops
- Access to complete Tampere region bus stop database

## Prerequisites

- Node.js 18 or higher
- Access credentials for the Waltti GTFS-RT API (optional for development)

## Setup for VS Code as NPX MCP Server

Add to your MCP servers:

```
{
  "mcpServers": {
    "nysse-bus-tracker": {
      "command": "npx",
      "args": [
        "-y",
        "nysse-mcp-server"
      ],
      "env": {
        "WALTTI_CLIENT_ID": "YOUR_CLIENT_ID_HERE",
        "WALTTI_CLIENT_SECRET": "YOUR_CLIENT_SECRET_HERE"
      }
    }
  }
}
```

## Running the Server with inspector

Add the WALTTI credentials to package.json command line or to your environment variables and build and run with inspector task:
```
npm run inspector
```

## Available Tools

The server provides the following MCP tools for AI agents:

## License

ISC
