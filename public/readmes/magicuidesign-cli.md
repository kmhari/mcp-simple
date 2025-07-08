# @magicuidesign/cli

Official CLI for Magic UI components and MCP configuration.

<div align="center">
  <img src="https://github.com/magicuidesign/cli/blob/main/public/cli.png" alt="CLI" />
</div>

## Install MCP configuration

```bash
npx @magicuidesign/cli@latest install <client>
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
    "@magicuidesign/mcp": {
      "command": "npx",
      "args": ["-y", "@magicuidesign/mcp@latest"]
    }
  }
}
```
