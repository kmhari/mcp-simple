# docling-mcp

Archiving this repo since docling is releasing the official MCP server.

Docling-mcp is a Model Context Protocol(MCP) Server that uses the Docling software created by IBM to parse and convert documents.

Currently it supports only conversion to Markdown.

## Usage & configuration

To use the published one, add the below code to Claude config file.

```bash
{
  "mcpServers": {
    "docling-mcp": {
      "command": "uvx",
      "args": ["docling-mcp"]
    }
  }
}
```
