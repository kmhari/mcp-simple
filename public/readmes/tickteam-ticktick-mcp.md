# TickTick MCP Server

## Tools

### get-todo-tasks

View and manage your todo tasks:

- Organizes tasks in a clear, structured table view

### add-task

Create and customize task with ease:

## Setup

### Getting a TickTick API Token

1. Log in to your TickTick account
2. Open Settings - Account - API Token

### Usage

```json
{
  "mcpServers": {
    "ticktick": {
      "command": "npx",
      "args": ["-y", "@ticktick/mcp-server"],
      "env": {
        "API_TOKEN": "api_token_here",
        "API_DOMAIN": "api.ticktick.com"
      }
    }
  }
}
```
