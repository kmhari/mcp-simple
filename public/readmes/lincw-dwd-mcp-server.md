# DWD MCP Server

A simple Model Context Protocol (MCP) server that connects Claude Desktop to the Deutsche Wetterdienst (DWD) API for German weather data.

## Features

- Simple, lightweight Node.js implementation
- No dependencies beyond the MCP SDK
- Easy to set up and use
- Access to DWD weather station data and warnings

## Quick Start

1. Make the setup script executable:
   ```bash
   chmod +x setup.sh
   ```

2. Run the setup script:
   ```bash
   ./setup.sh
   ```

3. Restart Claude Desktop

4. Start using the DWD data in your conversations with Claude!

## Available Tools

### `get_station_data`
Get current weather data for specific DWD weather stations.

Example usage in Claude:
```
Can you check the current weather for station 10865 (Berlin-Tegel)?
```

### `get_nowcast_warnings`
Get current nowcast weather warnings in Germany.

Example usage in Claude:
```
Are there any current weather warnings in Germany? Can you check using the DWD API?
```

## Finding Station IDs

The DWD API requires specific station IDs. You can find these at:
- [Official DWD station list](https://www.dwd.de/DE/leistungen/klimadatendeutschland/stationsliste.html)

Common station IDs:
- 10381: Berlin-Brandenburg
- 10865: Berlin-Tegel
- 10147: Hamburg
- 10637: Köln-Bonn
- 10870: Munich

## Manual Setup

If the setup script doesn't work for you, you can manually configure Claude Desktop:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create or edit `~/.config/claude/claude_desktop_config.json`:
   ```json
   {
     "mcpServers": {
       "dwd": {
         "command": "node",
         "args": [
           "/full/path/to/dwd-server.js"
         ]
       }
     }
   }
   ```

3. Restart Claude Desktop

## Troubleshooting

- Make sure Node.js 18+ is installed
- Check if the MCP server is running properly: `node dwd-server.js`
- Verify the path in claude_desktop_config.json is correct
- Restart Claude Desktop after configuration changes