# Sipgate API MCP Server

> **Disclaimer**: This is an unofficial integration and is not affiliated with, officially maintained, or endorsed by sipgate GmbH. This is a community project that uses the public sipgate API.

MCP server that provides access to the sipgate API, enabling AI assistants to interact with sipgate services including SMS, calls, and account management.

## Prerequisites

1. A sipgate account (https://www.sipgate.de/)
2. Personal Access Token credentials from sipgate:
   - Log in to your sipgate account
   - Navigate to "Settings" > "Personal Access Tokens"
   - Create a new token
   - Note down the Token ID and Token

## Installation

### Claude

Add to your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "sipgate-api": {
      "command": "npx",
      "args": [
        "-y",
        "sipgateio-mcp"
      ],
      "env": {
        "SIPGATE_TOKEN_ID": "your-token-id",
        "SIPGATE_TOKEN": "your-token"
      }
    }
  }
}
```

To find the `claude_desktop_config.json` file, open the Claude app and go to Settings > Advanced > Open config file.

### VS Code

Install the Sipgate API MCP server in VS Code using:

```bash
# For VS Code
code --add-mcp '{"name":"sipgate-api","command":"npx","args":["-y","sipgateio-mcp"],"env":{"SIPGATE_TOKEN_ID":"your-token-id","SIPGATE_TOKEN":"your-token"}}'

# For VS Code Insiders
code-insiders --add-mcp '{"name":"sipgate-api","command":"npx","args":["-y","sipgateio-mcp"],"env":{"SIPGATE_TOKEN_ID":"your-token-id","SIPGATE_TOKEN":"your-token"}}'
```

### Cursor

To add this server to Cursor IDE:

1. Navigate to Cursor Settings > MCP
2. Click + Add new Global MCP Server
3. Add the following to your global `.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "sipgate-api": {
      "command": "npx",
      "args": [
        "-y",
        "sipgateio-mcp"
      ],
      "env": {
        "SIPGATE_TOKEN_ID": "your-token-id",
        "SIPGATE_TOKEN": "your-token"
      }
    }
  }
}
```

### Cline

Add to your `cline_mcp_settings.json` via the Cline MCP Server settings:

```json
{
  "mcpServers": {
    "sipgate-api": {
      "command": "npx",
      "args": [
        "-y",
        "sipgateio-mcp"
      ],
      "env": {
        "SIPGATE_TOKEN_ID": "your-token-id",
        "SIPGATE_TOKEN": "your-token"
      }
    }
  }
}
```

### Roo Code

Access MCP settings via "Edit MCP Settings" in Roo Code settings:

```json
{
  "mcpServers": {
    "sipgate-api": {
      "command": "npx",
      "args": [
        "-y",
        "sipgateio-mcp"
      ],
      "env": {
        "SIPGATE_TOKEN_ID": "your-token-id",
        "SIPGATE_TOKEN": "your-token"
      }
    }
  }
}
```

## Available Tools

### Account Management
- `get_account_info`: Get information about your sipgate account
- `get_user_info`: Get information about the authenticated user

### Communication
- `send_sms`: Send SMS messages
- `initiate_call`: Start phone calls

### Phone System
- `get_phone_numbers`: List associated phone numbers
- `get_devices`: List associated devices
- `get_call_history`: Access call history

For detailed tool documentation and parameters, use your AI assistant's help command.

## Available Resources

- `sipgate://account` - Account information
- `sipgate://numbers` - Phone numbers
- `sipgate://history` - Call history
- `sipgate://devices` - Devices

## Example Usage

```
<use_mcp_tool>
<server_name>sipgate-api</server_name>
<tool_name>get_phone_numbers</tool_name>
<arguments>
{}
</arguments>
</use_mcp_tool>
```

## Troubleshooting

Common issues:

1. **Authentication Errors**:
   - Verify your Token ID and Token are correct
   - Check if the token has the required permissions

2. **Installation Issues**:
   - Ensure Node.js is installed
   - Try running `npx clear-npx-cache` before installation

3. **Server Connection**:
   - Check your internet connection
   - Verify the server is enabled in your MCP settings

For more help, open an issue on GitHub with:
- Your platform and environment details
- Error messages
- Steps to reproduce

## Development

Contributions welcome!

## License

MIT
