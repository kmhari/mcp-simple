# XPOS - Expo Starter CLI

Official CLI for Expo Starter tools and MCP configuration.

<div align="center">
  <img src="https://github.com/expo-starter/cli/blob/main/assets/cli.png" alt="CLI"  />
</div>

## Available Commands

### Install MCP configuration

```bash
npx xpos mcp install <client>
```

### Supported Clients

- [x] cursor
- [x] windsurf
- [x] claude
- [x] cline
- [x] roo-cline

## Manual Installation

Add to your MCP config:

```json
{
  "mcpServers": {
    "@expo-starter/mcp-remote": {
      "command": "npx",
      "args": ["mcp-remote", "https://expostarter.com/api/mcp"]
    }
  }
}
```