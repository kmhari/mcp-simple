# 🤖 nostr-code-snippet-mcp

[video demo](https://v.nostr.build/RSMqDK9pwTIm6bxu.mp4)

Add this to your claude config file:

```json
{
  "mcpServers": {
    "nostr-code-snippet-mcp": {
      "command": "node",
      "args": ["/Users/<path to>/nostr-code-snippet-mcp/dist/index.js"],
      "env": {
        "NSEC": "<some nsec>",
        "RELAYS": "wss://relay.damus.io,wss://relay.snort.social"
      }
    }
  }
}
```

**NOTE**: be sure to replace `<path to>` with the path to wherever you cloned the repo

The configuration file location depends on your operating system:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%/Claude/claude_desktop_config.json`

## Development

Install dependencies:

```bash
npm install
```

Build the project:

```bash
npm run build
```

Run the inspector:

```bash
npm run inspect
```
