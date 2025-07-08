# Android Preference Editor MCP Server

<a href="https://glama.ai/mcp/servers/@charlesmuchene/pref-editor-mcp-server">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@charlesmuchene/pref-editor-mcp-server/badge" alt="Pref-Editor MCP Server"/>
</a>

## Overview

Unlock the power of natural language for Android app development with the _Android Preference Editor MCP Server_. Effortlessly edit user preferences in real time using simple, conversational commands—no manual file editing required! Built on the robust [Android Preference Editor](https://github.com/charlesmuchene/pref-editor-js) library, this server seamlessly connects with **MCP (Model Context Protocol) clients** to supercharge your AI-driven workflows.

Just tell the MCP server what you want to do, for example:

- “Toggle the _isVisited_ user preference”
- “Turn off the onboarding guide”
- “List all the user preference values”
- "Create a timestamp preference with the current epoch time"

Experience a smarter, faster way to manage Android preferences—just ask!

## Available Tools

| Name              | Description                                           |
| ----------------- | ----------------------------------------------------- |
| change_preference | Changes the value of an existing preference           |
| delete_preference | Delete an existing preference                         |
| add_preference    | Adds a new preference given the name, value and type. |
| read_preferences  | Reads all user preferences in a file                  |
| devices           | Lists connected Android devices                       |
| list_apps         | Lists apps installed on device                        |
| list_files        | Lists preference files for an app                     |

## Demo

| Toggle a user preference                       | Available tools                              | Add a preference                                 |
| ---------------------------------------------- | -------------------------------------------- | ------------------------------------------------ |
| ![Toggle a preference](./demo/toggle-pref.png) | ![Available tools](./demo/tools-listing.png) | ![Add a preference](./demo/add-pref-copilot.png) |

> See more demos in the [demo screenshots directory](./demo/)

## Requirements

- Android [adb](https://developer.android.com/tools/adb) (`v1.0.41+`)
- Node.js 14+ _or_ Docker

## Integrations

> This server is available in the [Docker MCP Catalog](https://hub.docker.com/mcp/server/pref-editor/overview). Enable the Pref Editor server in Docker desktop's MCP [toolkit](https://docs.docker.com/ai/mcp-catalog-and-toolkit/toolkit/) and you'll have access to all the available tools.

### Android Studio

> Assumes an MCP compatible client is installed.

Add the following configuration to the MCP server config file. For example, for Github Copilot Intellij Plugin, the config file is `~/.config/github-copilot/intellij/mcp.json`.

#### Docker

```json
{
  "servers": {
    "pref-editor": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "charlesmuchene/pref-editor-mcp-server"]
    }
  }
}
```

#### npx

```json
{
  "servers": {
    "pref-editor": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@charlesmuchene/pref-editor-mcp-server"]
    }
  }
}
```

### Claude Desktop

Add this server in the `/Users/<username>/Library/Application Support/Claude/claude_desktop_config.json` configuration file.

#### Docker

```json
{
  "mcpServers": {
    "pref-editor": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "charlesmuchene/pref-editor-mcp-server"]
    }
  }
}
```

#### npx

```json
{
  "mcpServers": {
    "pref-editor": {
      "command": "npx",
      "args": ["-y", "@charlesmuchene/pref-editor-mcp-server"]
    }
  }
}
```

You can troubleshoot problems by tailing the log file:

```sh
tail -f ~/Library/Logs/Claude/mcp-server-pref-editor.log
```

### VS Code

To use the server with VS Code, you need to:

1. Add the MCP Server configuration to your `mcp.json` or `settings.json`:

.vscode/mcp.json

```json
{
  "servers": {
    "pref-editor": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@charlesmuchene/pref-editor-mcp-server"]
    }
  }
}
```

~/Library/Application Support/Code/User/settings.json

```json
{
  "mcp": {
    "pref-editor": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@charlesmuchene/pref-editor-mcp-server"]
    }
  }
}
```

For more information, see the [VS Code documentation](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

## Building Locally

Clone the server and build.

```sh
# Clone the repository
git clone https://github.com/charlesmuchene/pref-editor-mcp-server.git
cd pref-editor-mcp-server

# Install dependencies and build
npm install
```

## Testing

You can use the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) for visual debugging of this MCP Server.

```sh
npx @modelcontextprotocol/inspector npm run start
```

## License

See [LICENSE](./LICENSE)

## Contact

For questions or support, reach out via [GitHub Issues](https://github.com/charlesmuchene/pref-editor-mcp-server/issues).
