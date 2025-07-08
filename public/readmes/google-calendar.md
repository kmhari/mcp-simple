# Google Calendar MCP Server

Interact with your Google Calendar through Claude Desktop using the Model Context Protocol (MCP).

This is a TypeScript-based MCP server that implements Google Calendar integration. It demonstrates core MCP concepts while providing:

- Calendar event management through MCP URIs
- Tools for creating and modifying events
- Prompts for generating calendar insights

## Features

### Resources
- Access calendar events via MCP URIs
- Each event has title, time, description, and attendees
- Structured event data with proper mime types

### Tools
- `create_event` - Create new calendar events
  - Takes title, time, and other event details as parameters
  - Directly interfaces with Google Calendar API
- `list_events` - View upcoming calendar events
- [Add other tools you've implemented]

### Prompts
- `analyze_schedule` - Generate insights about your calendar
  - Includes upcoming events as embedded resources
  - Returns structured prompt for LLM analysis
- [Add other prompts you've implemented]

## Prerequisites

- Node.js (v14 or higher)
- A Google Cloud Project with Calendar API enabled
- OAuth 2.0 Client credentials

## Development

Install devbox by following instructions at [devbox.sh](https://www.jetpack.io/devbox)
```bash
curl -fsSL https://get.jetpack.io/devbox | bash
```

Initialize devbox in the project directory:
```bash
devbox init
```

Start the devbox shell:
```bash
devbox shell
```

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "Google Calendar": {
      "command": "/path/to/Google Calendar/build/index.js"
    }
  }
}
```

## First-Time Setup

1. Set up Google Cloud credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select an existing one
   - Enable the Google Calendar API
   - Create OAuth 2.0 credentials (Desktop application type)
   - Download the client secret JSON file
   - Rename it to `.client_secret.json` and place it in the project root

2. Initial Authentication:
   - When first running the server, it will provide an authentication URL
   - Visit the URL in your browser
   - Grant the requested permissions
   - Copy the provided authorization code
   - Paste the code back into the CLI prompt

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
