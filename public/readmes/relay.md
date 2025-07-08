# MCP Relay

This MCP server allows Claude to send messages and prompts to a Discord channel and receive responses.

## Setup Instructions

### 1. Create a Discord Application and Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section in the left sidebar
4. Under the bot's token section, click "Reset Token" and copy the new token
   - Keep this token secure! Don't share it publicly
5. Under "Privileged Gateway Intents", enable:
   - Message Content Intent
   - Server Members Intent
   - Presence Intent

### 2. Invite the Bot to Your Server

1. Go to the "OAuth2" section in the left sidebar
2. Select "URL Generator"
3. Under "Scopes", select:
   - bot
   - applications.commands
4. Under "Bot Permissions", select:
   - Send Messages
   - Embed Links
   - Read Message History
5. Copy the generated URL and open it in your browser
6. Select your server and authorize the bot

### 3. Get Channel ID

1. In Discord, enable Developer Mode:
   - Go to User Settings > App Settings > Advanced
   - Turn on "Developer Mode"
2. Right-click the channel you want to use
3. Click "Copy Channel ID"

### 4. Configure MCP Settings

The server requires configuration in your MCP settings file. Add the following to your configuration file:

```json
{
    "mcpServers": {
        "discord-relay": {
            "command": "node",
            "args": [
                "/ABSOLUTE/PATH/TO/MCP Relay/build/index.js"
            ],
            "env": {
                "DISCORD_TOKEN": "your_bot_token_here",
                "DISCORD_CHANNEL_ID": "your_channel_id_here"
            }
        }
    }
}
```

Replace:
- `/ABSOLUTE/PATH/TO/MCP Relay` with the actual path to your MCP Relay project
- `your_bot_token_here` with your Discord bot token
- `your_channel_id_here` with your Discord channel ID

Note: Make sure to use absolute paths in the configuration.

## Usage

The server provides a tool called `send-message` that accepts the following parameters:

```typescript
{
  type: 'prompt' | 'notification',  // Type of message
  title: string,                    // Message title
  content: string,                  // Message content
  actions?: Array<{                 // Optional action buttons
    label: string,                  // Button label
    value: string                   // Value returned when clicked
  }>,
  timeout?: number                  // Optional timeout in milliseconds
}
```

### Message Types

1. **Notification**: Simple message that doesn't expect a response
   ```json
   {
     "type": "notification",
     "title": "Hello",
     "content": "This is a notification"
   }
   ```

2. **Prompt**: Message that waits for a response
   ```json
   {
     "type": "prompt",
     "title": "Question",
     "content": "Do you want to proceed?",
     "actions": [
       { "label": "Yes", "value": "yes" },
       { "label": "No", "value": "no" }
     ],
     "timeout": 60000  // Optional: 1 minute timeout
   }
   ```

Notes:
- Prompts can be answered either by clicking action buttons or sending a text message
- Only one response is accepted per prompt
- If a timeout is specified, the prompt will fail after the timeout period
- Notifications don't wait for responses and return immediately
