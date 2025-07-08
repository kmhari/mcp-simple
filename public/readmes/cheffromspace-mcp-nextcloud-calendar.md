# MCP Nextcloud Calendar

[![npm version](https://img.shields.io/npm/v/mcp-nextcloud-calendar.svg)](https://www.npmjs.com/package/mcp-nextcloud-calendar)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A Model Context Protocol (MCP) server for Nextcloud Calendar integration.

## Features

- Fetch calendars from Nextcloud
- ADHD-friendly organization features
- MCP protocol support (Streamable HTTP and Legacy HTTP+SSE)

## Usage

### Using with npx

The easiest way to use this package is with npx:

```bash
npx mcp-nextcloud-calendar
```

### Installation

For development or local installation:

```bash
# Install globally
npm install -g mcp-nextcloud-calendar

# Or install locally
npm install mcp-nextcloud-calendar
```

### MCP Client Configuration

To use with an MCP client (like Claude), add this configuration to your MCP client settings:

```json
{
  "mcpServers": {
    "nextcloud-calendar": {
      "command": "npx",
      "args": ["-y", "mcp-nextcloud-calendar"],
      "env": {
        "NEXTCLOUD_BASE_URL": "https://your-nextcloud-server.com",
        "NEXTCLOUD_USERNAME": "your-username",
        "NEXTCLOUD_APP_TOKEN": "your-app-token"
      }
    }
  }
}
```

#### Specifying a Version

You can pin to a specific version of the package:

```json
{
  "mcpServers": {
    "nextcloud-calendar": {
      "command": "npx",
      "args": ["-y", "mcp-nextcloud-calendar@0.1.0"],
      "env": {
        "NEXTCLOUD_BASE_URL": "https://your-nextcloud-server.com",
        "NEXTCLOUD_USERNAME": "your-username",
        "NEXTCLOUD_APP_TOKEN": "your-app-token"
      }
    }
  }
}
```

## Configuration

### Environment Variables

The server uses these environment variables, with defaults where possible:

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| PORT | Server port | 3001 | No |
| SERVER_NAME | MCP server identifier | nextcloud-calendar-server | No |
| NODE_ENV | Environment (development/production) | development | No |
| NEXTCLOUD_BASE_URL | Your Nextcloud server URL | - | Yes |
| NEXTCLOUD_USERNAME | Your Nextcloud username | - | Yes |
| NEXTCLOUD_APP_TOKEN | Your Nextcloud app token | - | Yes |
| KEEP_ALIVE_INTERVAL | Keep-alive interval (ms) | 30000 | No |

### Development Setup

For local development:

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root:

```bash
cp .env.example .env
```

4. Edit the `.env` file with your Nextcloud credentials.

### Getting a Nextcloud App Token

1. Log in to your Nextcloud instance
2. Go to Settings → Security → App Passwords
3. Create a new app password with a name like "MCP Calendar"
4. Copy the generated token to your `.env` file

## Development

```bash
# Build the project
npm run build

# Run in development mode
npm run dev

# Run tests
npm run test

# Run linting
npm run lint

# Format code
npm run format
```

## API Endpoints

- `/mcp` - Primary MCP endpoint (Streamable HTTP transport)
- `/sse` and `/messages` - Legacy MCP endpoints (HTTP+SSE transport)
- `GET /health` - Health check endpoint
- `GET /api/calendars` - List all calendars

## MCP Tools

The following MCP tools are registered and available to clients:

### Calendar Management

| Tool | Description | Parameters |
|------|-------------|------------|
| `listCalendars` | Retrieves all accessible calendars | None |
| `createCalendar` | Creates a new calendar | `displayName` (required), `color` (optional), `category` (optional), `focusPriority` (optional) |
| `updateCalendar` | Updates an existing calendar | `id` (required), `displayName` (optional), `color` (optional), `category` (optional), `focusPriority` (optional) |
| `deleteCalendar` | Deletes a calendar | `id` (required) |

> **⚠️ Permission Warning**: The `updateCalendar` and `deleteCalendar` tools may require special permissions in your Nextcloud instance. Calendar operations are subject to Nextcloud's permission system.

### Event Management

| Tool | Description | Parameters |
|------|-------------|------------|
| `listEvents` | Retrieves events for a calendar | `calendarId` (required), `start` (optional), `end` (optional) |
| `getEvent` | Gets a specific event | `calendarId` (required), `eventId` (required) |
| `createEvent` | Creates a new event | `calendarId` (required), `summary` (required), `start` (required), `end` (required), `description` (optional), `location` (optional) |
| `updateEvent` | Updates an existing event | `calendarId` (required), `eventId` (required), [plus any event properties to update] |
| `deleteEvent` | Deletes an event | `calendarId` (required), `eventId` (required) |

## Known Issues and Limitations

> **Note**: This package is currently in early development (0.1.x). APIs and tools may change without notice in future releases.

- The update and delete calendar operations may require specific permissions in your Nextcloud instance
- Error handling for specific Nextcloud error codes is still being improved
- Large calendars with many events may experience performance issues

Please report any issues on the GitHub repository.

## License

ISC

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/cheffromspace)
