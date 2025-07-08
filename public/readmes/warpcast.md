# Warpcast MCP Server

A Model Context Protocol (MCP) server for Warpcast integration that allows you to use Claude to interact with your Warpcast account.  
The implementation now follows the [FastMCP](https://modelcontextprotocol.io) style server from the MCP Python SDK.

## Features

- Post casts to your Warpcast account
- Read casts from Warpcast
- Search casts by keyword or hashtag
- Browse and interact with channels
- Follow/unfollow channels
- Get trending casts

Warpcast API 
https://docs.farcaster.xyz/reference/warpcast/api

## Usage

`mcp-warpcast-server` is usually launched automatically by Claude Desktop's MCP client when the Warpcast tools are configured.
After the server starts you can ask Claude to:

- "Post a cast about [topic]"
- "Read the latest casts from [username]"
- "Search for casts about [topic]"
- "Show me trending casts on Warpcast"
- "Show me popular channels on Warpcast"
- "Get casts from the [channel] channel"
- "Follow the [channel] channel for me"

## Available Tools

This MCP server provides several tools that Claude can use:

1. **post-cast**: Create a new post on Warpcast (max 320 characters)
2. **get-user-casts**: Retrieve recent casts from a specific user
3. **search-casts**: Search for casts by keyword or phrase
4. **get-trending-casts**: Get the currently trending casts on Warpcast
5. **get-all-channels**: List available channels on Warpcast
6. **get-channel**: Get information about a specific channel
7. **get-channel-casts**: Get casts from a specific channel
8. **follow-channel**: Follow a channel
9. **unfollow-channel**: Unfollow a channel


## Setup


Claude Desktop normally launches this server for you when the Warpcast tools are configured. The steps below are only needed if you want to run the server manually for development.

1. Create a Python virtual environment (Python 3.11 or newer is recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies (the requirements include the MCP Python SDK):
   ```bash
   pip install -r requirements.txt
   ```
3. Provide a Warpcast API token:
   - Log in to [Warpcast](https://warpcast.com/) and open **Settings > Developer**.
   - Click **Create API Token** and copy the value.
   - Add `WARPCAST_API_TOKEN` under the `env` section of your Claude desktop configuration.
   - If starting the server manually, you can instead export the token in your shell:
     ```bash
     export WARPCAST_API_TOKEN=YOUR_TOKEN
     ```
   The server validates this variable on startup. If it is missing, a warning
   is logged and authorized requests will respond with **HTTP 500** errors.

4. (Optional) Start the server manually:
   The `app` variable exported from `main.py` is created using
   `mcp.streamable_http_app()` so it can be served by any ASGI server.
   ```bash
   uvicorn main:app --reload
   ```

The server exposes HTTP endpoints matching the tools listed above and a standard `/mcp` endpoint provided by FastMCP.

## Using with Claude Desktop

Follow these steps to access the Warpcast tools from Claude's desktop application:

1. Start the server (or let Claude launch it) using the setup instructions above.
2. Open your Claude configuration file:
   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
3. Add the Warpcast server under the `mcpServers` key. Replace the path with the location of this repository:

```json
{
  "mcpServers": {
    "warpcast": {
      "command": "uvicorn",
      "args": [
        "--app-dir",
        "/ABSOLUTE/PATH/TO/mcp-warpcast-server",
        "main:app",
        "--port",
        "8000"
      ],
      "url": "http://localhost:8000/mcp",
      "env": {
        "WARPCAST_API_TOKEN": "YOUR_API_TOKEN"
      }
    }
  }
}
```

Specifying a `url` tells Claude Desktop to communicate with the server over HTTP using Server-Sent Events instead of standard input and output.
If you omit `url`, Claude Desktop defaults to communicating via standard input and output (stdio), which will not work with this server.

4. Save the file and restart Claude Desktop. You should now see a hammer icon in the chat input that lets you use the Warpcast tools.

## Running Tests

Unit tests are written with `pytest` and use FastAPI's `TestClient` (installed via `fastapi[testclient]`).
Create a virtual environment, install dependencies and run the suite:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
make test        # or simply `pytest`
```

The tests mock the Warpcast API layer so no network connection is required.


## MCP Compatibility

This server uses the official MCP Python SDK and is fully compatible with the [Model Context Protocol](https://modelcontextprotocol.org/). Clients can connect to the `/mcp` endpoint provided by FastMCP and interact with the tools defined here.
## License

This project is licensed under the [MIT License](LICENSE).
