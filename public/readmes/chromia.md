# Chromia MCP

This tool that enables Claude AI to interact with Chromia Wallet for sending $CHR transactions.

Introduction on MCP: https://modelcontextprotocol.io/quickstart

![](demo.png)

## Setting up

1. git clone this repo
2. setup `.env` and install

```sh
cp .env.sample .env
npm i
npm run build
```

3. setup Claude's Desktop App (mac setup)

```sh
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

```json
{
    "mcpServers": {
        "chromia-mcp": {
            "command": "node",
            "args": [
                "/PATH_TO_FOLDER/chromia-mcp/build/index.js"
            ]
        }
    }
}
```

4. Restart Claude Desktop App