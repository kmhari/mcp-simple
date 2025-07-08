# Axiom Context Server

This extension provides a Model Context Server for Axiom, for use with the Zed AI assistant.

## Configuration

To configure the extension, you can specify custom command and arguments in your Zed `settings.json`:

```json
{
  "context_servers": {
    "axiom-mcp": {
      "settings": {}
      "command": {
        "cmd": "/path/to/axiom-mcp",
        "args": ["--config", "/path/to/your/config.txt"]
      }
    }
  }
}
```

If no custom command is specified, the extension will look for an `axiom-mcp` executable in the current directory.
