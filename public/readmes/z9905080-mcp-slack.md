# MCP Server for Slack

[![npm version](https://img.shields.io/npm/v/shouting-mcp-slack.svg)](https://www.npmjs.com/package/shouting-mcp-slack)

A Model Context Protocol (MCP) server implementation for integrating AI assistants with Slack workspaces.

## Overview

This package provides an MCP server that enables AI assistants to interact with Slack workspaces. It allows AI models to:

- List and browse channels
- Send messages to channels
- Reply to threads
- Add reactions to messages
- Retrieve channel history
- Get thread replies
- List users and retrieve user profiles

## Installation

```bash
# Install from npm
npm install shouting-mcp-slack

# Or install globally
npm install -g shouting-mcp-slack
```

You can find the package on npm: [shouting-mcp-slack](https://www.npmjs.com/package/shouting-mcp-slack/access)

## Prerequisites

You need to set up a Slack Bot and obtain the necessary credentials:

1. Create a Slack App in the [Slack API Console](https://api.slack.com/apps)
2. Add the following Bot Token Scopes:
   - `channels:history`
   - `channels:read`
   - `chat:write`
   - `reactions:write`
   - `users:read`
   - `users:read.email`
3. Install the app to your workspace
4. Copy the Bot User OAuth Token

## Configuration

The server requires the following environment variables:

- `SLACK_BOT_TOKEN`: Your Slack Bot User OAuth Token
- `SLACK_TEAM_ID`: Your Slack Team ID

## Usage

### Running as a CLI Tool

```bash
# Set environment variables
export SLACK_BOT_TOKEN=xoxb-your-token
export SLACK_TEAM_ID=your-team-id

# Run the server
mcp-server-slack
```

### Using in Your Code

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SlackClient } from "shouting-mcp-slack";

// Initialize the server and client
const server = new Server({...});
const slackClient = new SlackClient(process.env.SLACK_BOT_TOKEN);

// Register your custom handlers
// ...
```

## Available Tools

The server provides the following Slack integration tools:

- `slack_list_channels`: List available channels
- `slack_post_message`: Send a message to a channel
- `slack_reply_to_thread`: Reply to a thread
- `slack_add_reaction`: Add a reaction to a message
- `slack_get_channel_history`: Get message history from a channel
- `slack_get_thread_replies`: Get replies in a thread
- `slack_get_users`: List users in the workspace
- `slack_get_user_profile`: Get a user's profile

## License

ISC

## Author

shouting.hsiao@gmail.com

## Repository

https://github.com/z9905080/mcp-slack