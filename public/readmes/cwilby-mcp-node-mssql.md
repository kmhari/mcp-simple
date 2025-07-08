# mcp-node-mssql

## Usage

### Cursor

See the [official Cursor docs](https://docs.cursor.com/context/model-context-protocol) for more information.

1. Open (or create) the `mcp.json` file (it should be in `~/.cursor/mcp.json` or `<project-root>/.cursor/mcp.json`, but see Cursor docs for more details).
2. Add the following details and save the file:

```json
{
  "mcpServers": {
    "mssql": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-node-mssql"
      ],
      "env": {
        "DB_HOST": "localhost",
        "DB_PORT": "1433",
        "DB_USERNAME": "<username>",
        "DB_PASSWORD": "<password>",
        "DB_DATABASE": "<database>"
      }
    }
  }
}
```

### Windsurf

See the [official Windsurf docs](https://codeium.com/docs/windsurf/mcp) for more information.

1. Open the `Windsurf MCP Configuration Panel`
2. Click `Add custom server`.
3. Add the following details and save the file:

```json
{
  "mcpServers": {
    "mssql": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-node-mssql"
      ],
      "env": {
        "DB_HOST": "localhost",
        "DB_PORT": "1433",
        "DB_USERNAME": "<username>",
        "DB_PASSWORD": "<password>",
        "DB_DATABASE": "<database>"
      }
    }
  }
}
```


### Claude Code

See the [official Claude Code docs](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/tutorials#set-up-model-context-protocol-mcp) for more information.

_You can add a new MCP server from the Claude Code CLI. But modifying the json file directly is simpler!_

1. Open the Claude Code configuration file (it should be in `~/.claude.json`).
2. Find the `projects` > `mcpServers` section and add the following details and save the file:

```json
{
  "projects": {
    "mcpServers": {
      "mssql": {
        "command": "npx",
        "args": [
          "-y",
          "mcp-node-mssql"
        ],
        "env": {
          "DB_HOST": "localhost",
          "DB_PORT": "1433",
          "DB_USERNAME": "<username>",
          "DB_PASSWORD": "<password>",
          "DB_DATABASE": "<database>"
        }
      }
    }
  }
}
```

## Issues and Troubleshooting

Before doing anything else, please make sure you are running the latest version!

If you run into problems using this MCP server, please open an issue on [GitHub](https://github.com/cwilby/mcp-node-mssql/issues)!

## Development

### Installation

```bash
npm install
```

### Build

```bash
npm run build
```

### Running the Development Server Locally

To test your local development version of the MCP server rather than using the published package, follow these steps:

1. Build the project:
```bash
npm run build
```

2. Create or modify your `mcp.json` file to reference your local build:
```json
{
  "mcpServers": {
    "mssql": {
      "command": "node",
      "args": [
        "/path/to/your/local/mcp-node-mssql/dist/index.js"
      ],
      "env": {
        "DB_HOST": "localhost",
        "DB_PORT": "1433",
        "DB_USERNAME": "<username>",
        "DB_PASSWORD": "<password>",
        "DB_DATABASE": "<database>"
      }
    }
  }
}
```

3. Place this `mcp.json` file in one of the following locations:
   - For Cursor: In your home directory (`~/.cursor/mcp.json`) or in your project directory (`.cursor/mcp.json`)
   - For Windsurf: Use the MCP Configuration Panel to add the custom server

4. Restart your AI assistant (Cursor or Windsurf) to load the new configuration.

This allows you to instantly test changes to the MCP server without having to publish a new version.
