# Naver Map MCP Server

This is an MCP server that utilizes Naver Map APIs (Geocoding, Reverse Geocoding, Direction5, Direction15) for use with Claude Desktop.

> **Note**: This MCP server does not support APIs that require client-side rendering (Dynamic Map, Static Map).

## Features

- Address search using Naver Map Geocoding API (retrieve address information and coordinates)
- Convert coordinates to addresses using Naver Map Reverse Geocoding API
- Route search using Naver Map Direction5 API (up to 5 waypoints)
- Route search using Naver Map Direction15 API (up to 15 waypoints)
- Integration with Claude Desktop to use all these features within conversations

## Setup Instructions

1. Register an application on Naver Developer Center (https://developers.naver.com) or Naver Cloud Platform and obtain client ID and secret.

2. You can set up API keys using one of the following three methods:

### Method 1: Pass directly as command line arguments in Claude Desktop configuration

Open `%AppData%\Claude\claude_desktop_config.json` file (Windows) or `~/Library/Application Support/Claude/claude_desktop_config.json` file (Mac) and modify as follows:

```json
{
  "mcpServers": {
    "navermap-mcp": {
      "command": "node",
      "args": [
        "installation_path/dist/index.js",
        "--clientId=YOUR_CLIENT_ID",
        "--clientSecret=YOUR_CLIENT_SECRET"
      ]
    }
  }
}
```

### Method 2: Set as environment variables

You can set API keys using system environment variables. This is useful when using the same keys across multiple scripts.

For Windows, in Command Prompt:

```cmd
set NAVER_CLIENT_ID=YOUR_CLIENT_ID
set NAVER_CLIENT_SECRET=YOUR_CLIENT_SECRET
```

For Mac/Linux, in Terminal:

```bash
export NAVER_CLIENT_ID=YOUR_CLIENT_ID
export NAVER_CLIENT_SECRET=YOUR_CLIENT_SECRET
```

Then set the Claude Desktop configuration file as follows:

```json
{
  "mcpServers": {
    "navermap-mcp": {
      "command": "node",
      "args": ["installation_path/dist/index.js"],
      "env": {
        "NAVER_CLIENT_ID": "YOUR_CLIENT_ID",
        "NAVER_CLIENT_SECRET": "YOUR_CLIENT_SECRET"
      }
    }
  }
}
```

### Method 3: Create a startup script

You can create a startup script to set environment variables and run the MCP server.

Example startup script for Windows (`start-mcp.bat`):

```batch
@echo off
set NAVER_CLIENT_ID=YOUR_CLIENT_ID
set NAVER_CLIENT_SECRET=YOUR_CLIENT_SECRET
node installation_path/dist/index.js
```

Example startup script for Mac/Linux (`start-mcp.sh`):

```bash
#!/bin/bash
export NAVER_CLIENT_ID=YOUR_CLIENT_ID
export NAVER_CLIENT_SECRET=YOUR_CLIENT_SECRET
node installation_path/dist/index.js
```

Then set the Claude Desktop configuration file as follows:

```json
{
  "mcpServers": {
    "navermap-mcp": {
      "command": "installation_path/start-mcp.bat" // Windows
      // or
      // "command": "installation_path/start-mcp.sh"  // Mac/Linux
    }
  }
}
```

For Mac/Linux, you need to grant execution permission to the startup script:

```bash
chmod +x installation_path/start-mcp.sh
```

3. Restart Claude Desktop.

## How to Use

You can request services during conversations with Claude using the following formats:

### Address Search (Geocoding API)

- "Search for Teheran-ro in Gangnam-gu, Seoul"
- "What are the coordinates of Haeundae-gu, Busan?"
- "Search for Daehak-ro in Yuseong-gu, Daejeon"

### Convert Coordinates to Address (Reverse Geocoding API)

- "Tell me the address at coordinates 127.1058342,37.3597080"
- "Where is latitude 37.5666103, longitude 126.9783882?"
- "Show address information for these coordinates (129.075986,35.179470)"

### Route Search (Direction5/15 API)

- "Show me how to get from Seoul to Busan"
- "Search for a route from origin (127.1058342,37.3597080) to destination (129.075986,35.179470)"
- "Find a route going Seoul→Daejeon→Daegu→Busan"
- "Find the optimal route from Gangnam Station to Gwanghwamun"

## Development Environment

- Node.js
- TypeScript
- MCP SDK
- Naver Map API (Geocoding, Reverse Geocoding, Direction5, Direction15)

## License

- MIT
