# MCP Nicovideo Snapshot Search

This project provides an MCP server for searching videos on Nicovideo (niconico douga, ニコニコ動画) using the [Snapshot Search API](https://site.nicovideo.jp/search-api-docs/snapshot).

<img width="600" alt="usage example" src="https://github.com/user-attachments/assets/fd536c6b-7f51-45bf-9efd-c7f2911f1770" />

## Example Configuration for MCP Server

```json
{
  "mcpServers": {
    "mcp-nico-snapshot-search": {
      "command": "uv",
      "args": [
        "--directory",
        "/Users/owner/dev/mcp-nico-snapshot-search",
        "run",
        "main.py"
      ]
    }
  }
}
```

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.
