# MCP Server Resend

A MCP server for Resend API. Let LLMs compose and send emails for you.

## Environment Variables

- `RESEND_API_KEY` (string, required): Your Resend API key
- `SENDER_EMAIL_ADDRESS` (string, required): Sender email address
- `REPLY_TO_EMAIL_ADDRESSES` (string, optional): Comma-separated list of reply-to email addresses

## Available Tools

- `send_email` - Send an email using the Resend API
  - Inputs:
    - `to` (string): Recipient email address
    - `subject` (string): Email subject line
    - `content` (string): Plain text email content
    - `from` (string, optional): Sender email address (uses SENDER_EMAIL_ADDRESS if not provided)
    - `replyTo` (array, optional): Reply-to email addresses (uses REPLY_TO_EMAIL_ADDRESSES if not provided)
    - `scheduledAt` (string, optional): Scheduled email delivery time
    - `attachments` (array, optional): List of attachments, each attachment must have:
      - `filename` (string): Name of the attachment file
      - `localPath` (string): Absolute path to a local file on user's computer (required if remoteUrl not provided)
      - `remoteUrl` (string): URL to a file on the internet (required if localPath not provided)

## Getting an API Key

1. Sign up for a [Resend account](https://resend.com/)
2. Generate your API key from the [Resend dashboard](https://resend.com/api-keys)

**Note: Free tier available with 3000 emails per month.**

## Installation

### Using [Clinde](https://clinde.ai/) (recommended)

The easiest way to use Resend MCP Server is through the Clinde desktop app. Simply download and install Clinde, then:

1. Open the Clinde app
2. Navigate to the Servers page
3. Find resend-mcp and click Install

That's it! No technical knowledge required - Clinde handles all the installation and configuration for you seamlessly.

### Using Claude Desktop

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "resend-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "resend-mcp"
      ],
      "env": {
        "RESEND_API_KEY": "YOUR_RESEND_API_KEY_HERE (string, required)",
        "SENDER_EMAIL_ADDRESS": "YOUR_SENDER_EMAIL_ADDRESS_HERE (string, required)",
        "REPLY_TO_EMAIL_ADDRESSES": "YOUR_REPLY_TO_EMAIL_ADDRESSES_HERE (string, optional, comma delimited)"
      }
    }
  }
}
```


## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.