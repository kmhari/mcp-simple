# ReyxGPT: Minecraft Server Management Agent

ReyxGPT is an agent built on the Model Context Protocol (MCP) for managing Minecraft servers via RCON. It allows a language model to:

- Execute server commands
- Monitor server and player status

## Setup

To integrate ReyxGPT with clients like Claude Desktop, add the following to your MCP configuration:

```json
"mcpServers": {
  "reyxgpt": {
    "command": "uv",
    "args": [
      "--directory",
      "C:\\ABSOLUTE_PATH\\",
      "run",
      "main.py"
    ],
    "env": {
      "RCON_HOST": "localhost",
      "RCON_PORT": "25575",
      "RCON_PASSWORD": "verysecurepassword"
    }
  }
}
```

Ensure your Minecraft server has RCON enabled with the specified credentials.

## Project Structure

```
ReyxGPT/
├── .env                 # RCON configuration
├── main.py              # Application entry point
├── mcp_server/          # MCP server implementation
├── rcon/                # RCON client implementation
├── pyproject.toml       # Dependencies and metadata
└── uv.lock              # Dependency lock file
```

## Requirements

- Python 3.13
- [uv](https://github.com/astral-sh/uv) for running the project

## Running the Agent

```bash
uv run main.py
```

This will start the MCP server, allowing the agent to interact with your Minecraft server.
