# Webhook MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-NPM-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=notification&inputs=%5B%7B%22type%22%3A%20%22promptString%22%2C%22id%22%3A%20%22notification_webhook_url%22%2C%22description%22%3A%20%22Notification%20Webhook%20URL%22%2C%22password%22%3A%20true%7D%5D&config=%7B%22command%22%3A%20%22npx%22%2C%22args%22%3A%20%5B%22-y%22%2C%20%22webhook-mcp%22%5D%2C%22env%22%3A%20%7B%20%22WEBHOOK_URL%22%3A%20%22%24%7Binput%3Anotification_webhook_url%7D%22%20%7D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-NPM-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=notification&inputs=%5B%7B%22type%22%3A%20%22promptString%22%2C%22id%22%3A%20%22notification_webhook_url%22%2C%22description%22%3A%20%22Notification%20Webhook%20URL%22%2C%22password%22%3A%20true%7D%5D&config=%7B%22command%22%3A%20%22npx%22%2C%22args%22%3A%20%5B%22-y%22%2C%20%22webhook-mcp%22%5D%2C%22env%22%3A%20%7B%20%22WEBHOOK_URL%22%3A%20%22%24%7Binput%3Anotification_webhook_url%7D%22%20%7D%7D&quality=insiders)
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Docker-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=notification&inputs=%5B%7B%22type%22%3A%20%22promptString%22%2C%22id%22%3A%20%22notification_webhook_url%22%2C%22description%22%3A%20%22Notification%20Webhook%20URL%22%2C%22password%22%3A%20true%7D%5D&config=%7B%22command%22%3A%22docker%22%2C%22args%22%3A%5B%22run%22%2C%22-i%22%2C%22--rm%22%2C%22-e%22%2C%22WEBHOOK_URL%22%2C%22noobnooc%2Fwebhook-mcp%22%5D%2C%22env%22%3A%7B%22WEBHOOK_URL%22%3A%22%24%7Binput%3Anotification_webhook_url%7D%22%7D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Docker-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=notification&inputs=%5B%7B%22type%22%3A%20%22promptString%22%2C%22id%22%3A%20%22notification_webhook_url%22%2C%22description%22%3A%20%22Notification%20Webhook%20URL%22%2C%22password%22%3A%20true%7D%5D&config=%7B%22command%22%3A%22docker%22%2C%22args%22%3A%5B%22run%22%2C%22-i%22%2C%22--rm%22%2C%22-e%22%2C%22WEBHOOK_URL%22%2C%22noobnooc%2Fwebhook-mcp%22%5D%2C%22env%22%3A%7B%22WEBHOOK_URL%22%3A%22%24%7Binput%3Anotification_webhook_url%7D%22%7D%7D&quality=insiders)
[![smithery badge](https://smithery.ai/badge/@noobnooc/webhook-mcp)](https://smithery.ai/server/@noobnooc/webhook-mcp)

A Model Context Protocol (MCP) server that sends webhook notifications when called.

You can use this server with webhook notification services like [Echobell](https://echobell.one) to get notified when long-running tasks are completed. Simply configure the server with your Echobell webhook URL (or another service's URL) and instruct your AI assistant to "send me a notification when it's done" within your task prompts.

## Configuration

There are several ways to configure the MCP server:

### Installing via Smithery

To install Webhook MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@noobnooc/webhook-mcp):

```bash
npx -y @smithery/cli install @noobnooc/webhook-mcp --client claude
```

### Claude & Cursor & Windsurf

Configure Claude, Cursor or Windsurf to use the MCP server by adding this to your configuration:

- With NPM:

```json
{
  "mcpServers": {
    "notification": {
      "command": "npx",
      "args": ["-y", "webhook-mcp"],
      "env": {
        "WEBHOOK_URL": "your-webhook-url-here"
      }
    }
  }
}
```

- With Docker:

```json
{
  "mcpServers": {
    "notification": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "WEBHOOK_URL",
        "noobnooc/webhook-mcp"
      ],
      "env": {
        "WEBHOOK_URL": "<your-webhook-url-here>"
      }
    }
  }
}
```

### VS Code

Add the following configuration to your VS Code `settings.json`:

- With NPM:

```json
{
  "mcp": {
    "servers": {
      "notification": {
        "command": "npx",
        "args": ["-y", "webhook-mcp"],
        "env": {
          "WEBHOOK_URL": "your-webhook-url-here"
        }
      }
    }
  }
}
```

- With Docker:

```json
{
  "mcp": {
    "servers": {
      "notification": {
        "command": "docker",
        "args": [
          "run",
          "-i",
          "--rm",
          "-e",
          "WEBHOOK_URL",
          "noobnooc/webhook-mcp"
        ],
        "env": {
          "WEBHOOK_URL": "<your-webhook-url-here>"
        }
      }
    }
  }
}
```

## Environment Variables

- `WEBHOOK_URL` (required): The URL where webhook notifications will be sent

## Parameters

The webhook can be called with optional parameters:

- `message`: Custom message to include in the webhook payload
- `url`: External URL to include in the webhook payload as `externalLink`

## Development

To build the project:

```bash
npm install
npm run build
```

To run with the MCP inspector for debugging:

```bash
npm run inspector
```

## Publishing

To build and publish the package:

```bash
npm run publish
```
