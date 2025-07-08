<a href="https://glama.ai/mcp/servers/aa10ltj5b6">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/aa10ltj5b6/badge" alt="Client Configuration Server MCP server" />
</a>

# MCP Client Configuration Server

This MCP server helps manage configurations for different MCP clients. It provides tools to retrieve, list, add, and remove server configurations from client configuration files. The server automatically detects the appropriate configuration file path based on the operating system (Windows or macOS) and the specified client.

## Installation

```bash
# Install from npm
npm install -g @landicefu/mcp-client-configuration-server

# Or use npx to run without installing
npx @landicefu/mcp-client-configuration-server
```

## Configuration

To use this MCP server in your AI assistant, add it to your MCP settings configuration:

```json
{
  "mcpServers": {
    "mcp-client-configuration": {
      "command": "npx",
      "args": ["-y", "@landicefu/mcp-client-configuration-server"],
      "env": {},
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

## Supported Clients

- **Cline**: Claude-powered coding assistant
- **Roo Code**: Code editor with AI capabilities
- **WindSurf**: AI-powered browser
- **Claude app**: Desktop application for Claude AI

> **Note:** Cursor is no longer supported as it doesn't use a standard configuration file for MCP settings. Cursor appears to store its MCP configuration in a way we can't easily modify, making it incompatible with this configuration server's file-based approach.

## Usage

This server is particularly useful for:

1. **Managing MCP servers across multiple clients**: Configure a server once and deploy it to multiple clients
2. **Automating configuration**: Scripts can use this server to programmatically manage MCP configurations
3. **Troubleshooting**: Easily check which servers are configured and their settings

### Example: Copying a server configuration from Roo Code to Claude app

Here's a simple prompt you can use with an AI assistant to copy an MCP server configuration from Roo Code to the Claude desktop app:

```
Please copy the "brave-search" MCP server configuration from Roo Code to my Claude desktop app.
```

The AI assistant would execute these steps behind the scenes:

1. Get the server configuration from Roo Code:
```javascript
// First, get the server configuration from Roo Code
{
  "client": "roo_code",
  "server_name": "brave-search"
}
```

2. Then add the same configuration to Claude:
```javascript
// Then add it to Claude with the same settings
{
  "client": "claude",
  "server_name": "brave-search",
  "json_config": {
    // Configuration retrieved from previous step
  },
  "allow_override": true
}
```

This allows you to easily synchronize your MCP server configurations across different AI assistants.

## Tools

### get_configuration_path

Retrieves the path to the configuration file for a specified client.

**Parameters:**
- `client` (required): The client name (cline, roo_code, windsurf, claude)

**Returns:**
- The absolute path to the configuration file

### get_configuration

Retrieves the entire configuration for a specified client.

**Parameters:**
- `client` (required): The client name (cline, roo_code, windsurf, claude)

**Returns:**
- The complete JSON configuration from the client's configuration file

### list_servers

Lists all server names configured in a specified client's configuration.

**Parameters:**
- `client` (required): The client name (cline, roo_code, windsurf, claude)

**Returns:**
- An array of server names

### get_server_configuration

Retrieves the configuration for a specific server from a client's configuration.

**Parameters:**
- `client` (required): The client name (cline, roo_code, windsurf, claude)
- `server_name` (required): The name of the server to retrieve

**Returns:**
- The JSON configuration for the specified server

### add_server_configuration

Adds or updates a server configuration in a client's configuration file.

**Parameters:**
- `client` (required): The client name (cline, roo_code, windsurf, claude)
- `server_name` (required): The name of the server to add or update
- `json_config` (required): The server configuration in JSON format

**Example:**
```json
{
  "command": "npx",
  "args": ["-y", "@landicefu/android-adb-mcp-server"],
  "env": {},
  "disabled": false,
  "alwaysAllow": []
}
```

**Returns:**
- A success message with the updated configuration

### remove_server_configuration

Removes a server configuration from a client's configuration file.

**Parameters:**
- `client` (required): The client name (cline, roo_code, windsurf, claude)
- `server_name` (required): The name of the server to remove

**Returns:**
- The removed configuration or a message that the server was not found

## Implementation Details

- The server detects the appropriate configuration file path based on the operating system (Windows or macOS) and the specified client.
- All configuration files are maintained in a beautified JSON format after modifications.
- Error handling is provided for cases where configuration files don't exist or cannot be accessed.
- The server automatically creates configuration files and directories if they don't exist.
- Configuration paths for each client:
  - **Windows**:
    - Cline: `%APPDATA%\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`
    - Roo Code: `%APPDATA%\Code\User\globalStorage\rooveterinaryinc.roo-cline\settings\cline_mcp_settings.json`
    - WindSurf: `%APPDATA%\WindSurf\mcp_settings.json`
    - Claude: `%APPDATA%\Claude\claude_desktop_config.json`
  - **macOS**:
    - Cline: `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
    - Roo Code: `~/Library/Application Support/Code/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json`
    - WindSurf: `~/.codeium/windsurf/mcp_config.json`
    - Claude: `~/Library/Application Support/Claude/claude_desktop_config.json`

## Troubleshooting

### Common Issues

1. **Configuration file not found**
   - When adding a new server, the configuration file will be created automatically if it doesn't exist.
   - For other operations, you'll receive an error message if the configuration file doesn't exist.

2. **Server already exists**
   - When adding a server that already exists, you'll need to set `allow_override` to `true` to update it.
   - Example:
     ```json
     {
       "client": "cline",
       "server_name": "existing-server",
       "json_config": { /* new config */ },
       "allow_override": true
     }
     ```

3. **Unsupported platform**
   - Currently, only Windows and macOS are supported.
   - Linux support may be added in future versions.

### Best Practices

- Always check if a server exists before attempting to update or remove it.
- Use consistent server names across clients to make management easier.
- Consider using environment variables for sensitive information in server configurations.
