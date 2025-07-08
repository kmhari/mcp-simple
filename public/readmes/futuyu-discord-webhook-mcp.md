# Discord Webhook MCP

A Model Context Protocol (MCP) server for sending messages to Discord via Webhook.

## Features

- Send messages to Discord through a webhook
- Communicate via the MCP protocol (for Claude Desktop integration)

## Installation & Setup

```bash
npm install
npm run build
```

### Environment Variables

- `DISCORD_WEBHOOK_URL`: The Discord Webhook URL to which messages will be sent.

### Claude Desktop Integration

Add the following configuration to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "discordWebhook": {
      "command": "node",
      "args": [
        "<PROJECT_PATH>/build/index.js"
      ],
      "env": {
        "DISCORD_WEBHOOK_URL": "<YOUR_DISCORD_WEBHOOK_URL>"
      }
    }
  }
}
```

## API Reference

### send_discord_webhook
Sends a message to Discord via webhook.

#### Parameters
- `content` (string, required): The message content to send to Discord.

#### Returns
- `ok` (boolean): Whether the operation succeeded.
- `message` (string): Result message.
- `discordResponse` (object, optional): Discord API response object.
- `error` (object, optional): Error information if failed.

## Tech Stack

- TypeScript
- Model Context Protocol SDK
- discord.js
- Zod (validation)
