# Novu MCP Implementation

This is a TypeScript implementation of a Model Context Protocol (MCP) server for Novu, allowing AI agents to interact with Novu's notification infrastructure.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Start the MCP server:
```bash
npm start
```

For development, you can use:
```bash
npm run dev
```

## Configuration

The MCP server requires a Novu API key to be configured in `smithery.yml`. You can obtain an API key from your Novu dashboard.

## Available Operations

The MCP server supports the following Novu operations:

### Events
- `trigger_event`: Send a notification to specific subscribers
- `broadcast_event`: Send a notification to all subscribers
- `cancel_triggered_event`: Cancel a triggered notification

### Notifications
- `get_notifications`: List notifications with pagination
- `get_notification_stats`: Get notification statistics

### Subscribers
- `get_subscribers`: List subscribers with pagination
- `create_subscriber`: Create a new subscriber
- `update_subscriber`: Update subscriber details
- `delete_subscriber`: Remove a subscriber

### Topics
- `get_topics`: List all topics
- `create_topic`: Create a new topic
- `delete_topic`: Delete an existing topic
- `add_subscribers_to_topic`: Add subscribers to a topic
- `remove_subscribers_from_topic`: Remove subscribers from a topic

## Example Usage

To trigger a notification:

```json
{
  "type": "execute",
  "payload": {
    "operation": "trigger_event",
    "params": {
      "name": "welcome-email",
      "to": "subscriber-id",
      "payload": {
        "name": "John Doe",
        "company": "Acme Inc"
      }
    }
  }
}
```

To create a subscriber:

```json
{
  "type": "execute",
  "payload": {
    "operation": "create_subscriber",
    "params": {
      "subscriberId": "unique-id",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

## Development

The source code is written in TypeScript and follows modern development practices. The main implementation is in `src/index.ts`, with Novu-specific logic in `src/novu-service.ts`. 