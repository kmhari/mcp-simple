# Twitch MCP Server

A Model Context Protocol (MCP) server that interacts with the Twitch API. This server utilizes the Twitch Helix API to retrieve channel information, stream details, game data, and more.

## Features

- Get channel information (profile, description, creation date, etc.)
- Get stream information (title, game, viewer count, start time, etc.)
- Get list of top games
- Search categories/games
- Search channels
- Get live streams (filterable by game and language)
- Get global emotes
- Get global chat badges
- Get user information
- Get clips from a channel
- Get chat settings
- Get videos from a specified channel
- Get comments from archived videos (using GraphQL API)

## Prerequisites

- Node.js (v18 or higher recommended)
- Twitch Developer Account
- Twitch API Client ID and Client Secret
- Twitch GraphQL Client ID (for video comments feature)

## Installation

Install the package using npm:

```bash
npm install @mtane0412/twitch-mcp-server
```

## Configuration

1. Create a new application in the [Twitch Developer Console](https://dev.twitch.tv/console)

2. Set the following environment variables:

```bash
# macOS/Linux
export TWITCH_CLIENT_ID="your_client_id"
export TWITCH_CLIENT_SECRET="your_client_secret"

# Windows (PowerShell)
$env:TWITCH_CLIENT_ID="your_client_id"
$env:TWITCH_CLIENT_SECRET="your_client_secret"
```

Alternatively, you can create a `.env` file:

```env
TWITCH_CLIENT_ID=your_client_id
TWITCH_CLIENT_SECRET=your_client_secret
```

## Usage

After installation, you can start using the server by running:

```bash
npx @mtane0412/twitch-mcp-server
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspect
```

The Inspector will provide a URL to access debugging tools in your browser.

## License

MIT License