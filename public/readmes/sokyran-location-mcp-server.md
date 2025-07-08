# Location MCP Server

An MCP (Model Context Protocol) server that provides location data from a local macOS app.

## Prerequisites

- macOS (this package launches a macOS app)
- Node.js 16 or higher

## Installation

```bash
npm install -g @sokyran/location-mcp-server
```

Or run it directly with npx:

```bash
npx @sokyran/location-mcp-server
```

## Usage with Claude Desktop

1. Download the location-getter-agent.app and place it in the same directory where you run the command.

2. Edit your Claude Desktop configuration file:

```json
{
  "mcpServers": {
    "location": {
      "command": "npx",
      "args": ["@sokyran/location-mcp-server"]
    }
  }
}
```

3. Restart Claude Desktop.

4. You can now use the `getCurrentLocation` tool in your conversations with Claude.

## How It Works

The server:

1. Launches the location-getter-agent.app (which must be in the current directory)
2. Waits for the app to start its HTTP server on port 8080
3. Exposes a `getCurrentLocation` tool to Claude
4. When invoked, it fetches location data from the local app and returns it

## Troubleshooting

- Make sure the location-getter-agent.app is in the same directory where you're running the command
- If you get permission errors, you may need to allow the app in System Preferences > Security & Privacy
- Check that port 8080 is not being used by another application

## Instructions

1. Use Xcode, build location-getter
2. Inside Xcode, go to Product -> Show build folder in Finder
3. Here, find Products/Debug/location-getter-agent.app and paste in inside this folder, right near index.ts.
4. npm i, npm run build, npm run start
