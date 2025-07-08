# Deno 2 Playwright Model Context Protocol Server Example

A Model Context Protocol server that provides browser automation capabilities using Playwright. This server enables LLMs to interact with web pages, take screenshots, and execute JavaScript in a real browser environment.

This repo uses Deno 2, which has nice ergonomics, because you can compile a binary and run it without any runtime dependencies.

This code is heavily based on the official Puppeteer MCP server, which you can find here: https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer

## How to build

Only the mac binary build has been tested, but you should be able to build an executable binary for linux x86_64, linux ARM64, and windows x86_64.

- `deno task build-mac`
- `deno task build-linux-x86_64`
- `deno task build-linux-ARM64`
- `deno task build-windows-x86_64`

## How to run

To invoke the playwright-server binary, you need to update your `~/Library/Application\ Support/Claude/claude_desktop_config.json` to point to the binary.

```json
{
  "mcpServers": {
    "playwright": {
      "command": "/path/to/deno2-playwright-mcp-server/playwright-server"
    }
  }
}
```
