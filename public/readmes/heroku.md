# heroku-mcp-server

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=heroku&config=eyJjb21tYW5kIjoibnB4IC15IEBoZXJva3UvbWNwLXNlcnZlciIsImVudiI6eyJIRVJPS1VfQVBJX0tFWSI6IjxZT1VSX0hFUk9LVV9BVVRIX1RPS0VOPiJ9fQ%3D%3D)
[![smithery badge](https://smithery.ai/badge/@heroku/heroku-mcp-server)](https://smithery.ai/server/@heroku/heroku-mcp-server)

> The Heroku Platform MCP Server works on Common Runtime, Cedar Private and Shield Spaces, and Fir Private Spaces.

## Prerequisites

- **Heroku CLI** must be installed globally on your system, version **10.8.1 or higher**.
  - [Install or upgrade the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## Deploy on Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://www.heroku.com/deploy?template=https://github.com/heroku/heroku-mcp-server)

## Overview

The Heroku Platform MCP Server is a specialized Model Context Protocol (MCP) implementation designed to facilitate
seamless interaction between large language models (LLMs) and the Heroku Platform. This server provides a robust set of
tools and capabilities that enable LLMs to read, manage, and operate Heroku Platform resources.

Key Features:

- Direct interaction with Heroku Platform resources through LLM-driven tools
- Secure and authenticated access to Heroku Platform APIs, leveraging the Heroku CLI
- Natural language interface for Heroku Platform interactions

Note: The Heroku Platform MCP Server is currently in early development. As we continue to enhance and refine the
implementation, the available functionality and tools may evolve. We welcome feedback and contributions to help shape
the future of this project.

> **Note:** The [Heroku Platform MCP Server](https://devcenter.heroku.com/articles/heroku-mcp-server) requires the
> Heroku CLI to be installed globally (v10.8.1+). Ensure you have the correct version by running `heroku --version`.

## Configure the Heroku Platform MCP Server

You can configure Claude Desktop, Zed, Cursor, Windsurf, and other clients to work with the Heroku Platform MCP Server.

### Configure the Heroku Platform MCP Server with `heroku mcp:start`

Use `heroku mcp:start` to launch the Heroku Platform MCP Server. We recommend this method as it leverages your existing
Heroku CLI authentication, so you don't need to set the
[`HEROKU_API_KEY`](https://devcenter.heroku.com/articles/heroku-mcp-server#authentication) environment variable. The
`heroku mcp:start` command is available in Heroku CLI version 10.8.1 and later.

There are several benefits to configuring with `heroku mcp:start`:

- No need to manage or expose your Heroku API key
- Uses your current Heroku CLI authentication context
- Works seamlessly with supported clients

#### Example configuration for [Claude Desktop](https://claude.ai/download):

```json
{
  "mcpServers": {
    "heroku": {
      "command": "heroku mcp:start"
    }
  }
}
```

#### Example configuration for [Zed](https://github.com/zed-industries/zed):

```json
{
  "context_servers": {
    "heroku": {
      "command": {
        "path": "heroku",
        "args": ["mcp:start"]
      }
    }
  }
}
```

#### Example configuration for [Cursor](https://www.cursor.com/):

```json
{
  "mcpServers": {
    "heroku": {
      "command": "heroku mcp:start"
    }
  }
}
```

#### Example configuration for [Windsurf](https://www.windsurf.com/):

```json
{
  "mcpServers": {
    "heroku": {
      "command": "heroku mcp:start"
    }
  }
}
```

#### Example configuration for [Cline](https://cline.bot):

```json
{
  "mcpServers": {
    "heroku": {
      "command": "heroku mcp:start"
    }
  }
}
```

#### Example configuration for [VSCode](https://code.visualstudio.com/):

```json
{
  "mcp": {
    "servers": {
      "heroku": {
        "type": "stdio",
        "command": "heroku",
        "args": ["mcp:start"]
      }
    }
  }
}
```

#### Example configuration for [Trae](https://trae.ai):

```json
{
  "mcpServers": {
    "heroku": {
      "command": "heroku mcp:start"
    }
  }
}
```

> **Note:** When you use `heroku mcp:start`, the server authenticates using your current Heroku CLI session so you don't
> need to set the `HEROKU_API_KEY` environment variable. We recommend you use `heroku mcp:start`, but if you prefer to
> use an API key, you can use the alternate configuration below.

### Configure the Heroku Platform MCP Server with `npx -y @heroku/mcp-server`

You can also launch the Heroku Platform MCP Server using the `npx -y @heroku/mcp-server` command. This method requires
you to set the [`HEROKU_API_KEY`](https://devcenter.heroku.com/articles/heroku-mcp-server#authentication) environment
variable with your Heroku
[authorization token](https://devcenter.heroku.com/articles/authentication#retrieving-the-api-token).

#### Generating the `HEROKU_API_KEY`

Generate a Heroku authorization token with one of these methods:

- Use the Heroku CLI command:

  ```sh
    heroku authorizations:create
  ```

- Use an existing token in the CLI

  ```sh
    heroku auth:token
  ```

  Copy the token and use it as your `HEROKU_API_KEY` in the following steps.

- In your [Heroku Dashboard](https://dashboard.heroku.com/account/applications):
  1. Select your avatar, then select **Account Settings**.
  2. Open the Applications tab.
  3. Next to **Authorizations**, click **Create authorization**.

#### Example configuration for [Claude Desktop](https://claude.ai/download):

```json
{
  "mcpServers": {
    "heroku": {
      "command": "npx",
      "args": ["-y", "@heroku/mcp-server"],
      "env": {
        "HEROKU_API_KEY": "<YOUR_HEROKU_AUTH_TOKEN>"
      }
    }
  }
}
```

#### Example configuration for [Zed](https://github.com/zed-industries/zed):

```json
{
  "context_servers": {
    "heroku": {
      "command": {
        "path": "npx",
        "args": ["-y", "@heroku/mcp-server"],
        "env": {
          "HEROKU_API_KEY": "<YOUR_HEROKU_AUTH_TOKEN>"
        }
      }
    }
  }
}
```

#### Example configuration for [Cursor](https://www.cursor.com/):

```json
{
  "mcpServers": {
    "heroku": {
      "command": "npx -y @heroku/mcp-server",
      "env": {
        "HEROKU_API_KEY": "<YOUR_HEROKU_AUTH_TOKEN>"
      }
    }
  }
}
```

#### Example configuration for [Windsurf](https://www.windsurf.com/):

```json
{
  "mcpServers": {
    "heroku": {
      "command": "npx",
      "args": ["-y", "@heroku/mcp-server"],
      "env": {
        "HEROKU_API_KEY": "<YOUR_HEROKU_AUTH_TOKEN>"
      }
    }
  }
}
```

#### Example configuration for [Cline](https://cline.bot):

```json
{
  "mcpServers": {
    "heroku": {
      "command": "npx",
      "args": ["-y", "@heroku/mcp-server"],
      "env": {
        "HEROKU_API_KEY": "<YOUR_HEROKU_AUTH_TOKEN>"
      }
    }
  }
}
```

#### Example configuration for [VSCode](https://code.visualstudio.com/):

```json
{
  "mcp": {
    "servers": {
      "heroku": {
        "type": "stdio",
        "command": "npx",
        "args": ["-y", "@heroku/mcp-server"],
        "env": {
          "HEROKU_API_KEY": "<YOUR_HEROKU_AUTH_TOKEN>"
        }
      }
    }
  }
}
```

#### Example configuration for [Trae](https://trae.ai):

```json
{
  "mcpServers": {
    "heroku": {
      "command": "npx",
      "args": ["-y", "@heroku/mcp-server"],
      "env": {
        "HEROKU_API_KEY": "<YOUR_HEROKU_AUTH_TOKEN>"
      }
    }
  }
}
```

> **Note:** When you use `npx -y @heroku/mcp-server`, you must set the `HEROKU_API_KEY` environment variable with your
> Heroku authorization token.

## Available Tools

### Application Management

- `list_apps` - List all Heroku apps. You can filter apps by personal, collaborator, team, or space.
- `get_app_info` - Get detailed information about an app, including its configuration, dynos, and add-ons.
- `create_app` - Create a new app with customizable settings for region, team, and space.
- `rename_app` - Rename an existing app.
- `transfer_app` - Transfer ownership of an app to another user or team.
- `deploy_to_heroku` - Deploy projects to Heroku with an `app.json` configuration, supporting team deployments, private
  spaces, and environment setups.
- `deploy_one_off_dyno` - Execute code or commands in a sandboxed environment on a Heroku one-off dyno. Supports file
  creation, network access, environment variables, and automatic cleanup. Ideal for running scripts, tests, or temporary
  workloads.

### Process & Dyno Management

- `ps_list` - List all dynos for an app.
- `ps_scale` - Scale the number of dynos up or down, or resize dynos.
- `ps_restart` - Restart specific dynos, process types, or all dynos.

### Add-ons

- `list_addons` - List all add-ons for all apps or for a specific app.
- `get_addon_info` - Get detailed information about a specific add-on.
- `create_addon` - Provision a new add-on for an app.

### Maintenance & Logs

- `maintenance_on` - Enable maintenance mode for an app.
- `maintenance_off` - Disable maintenance mode for an app.
- `get_app_logs` - View application logs.

### Pipeline Management

- `pipelines_create` - Create a new pipeline.
- `pipelines_promote` - Promote apps to the next stage in a pipeline.
- `pipelines_list` - List available pipelines.
- `pipelines_info` - Get detailed pipeline information.

### Team & Space Management

- `list_teams` - List teams you belong to.
- `list_private_spaces` - List available spaces.

### PostgreSQL Database Management

- `pg_psql` - Execute SQL queries against the Heroku PostgreSQL database.
- `pg_info` - Display detailed database information.
- `pg_ps` - View active queries and execution details.
- `pg_locks` - View database locks and identify blocking transactions.
- `pg_outliers` - Identify resource-intensive queries.
- `pg_credentials` - Manage database credentials and access.
- `pg_kill` - Terminate specific database processes.
- `pg_maintenance` - Show database maintenance information.
- `pg_backups` - Manage database backups and schedules.
- `pg_upgrade` - Upgrade PostgreSQL to a newer version.

## Debugging

You can use the [MCP inspector](https://modelcontextprotocol.io/docs/tools/inspector) or the
[VS Code Run and Debug function](https://code.visualstudio.com/docs/debugtest/debugging#_start-a-debugging-session) to
run and debug the server.

1. Link the project as a global CLI using `npm link` from the project root.
2. Build with `npm run build:dev` or watch for file changes and build automatically with `npm run build:watch`.

### Use the MCP Inspector

Use the MCP inspector with no breakpoints in the code:

```
# Breakpoints are not available
npx @modelcontextprotocol/inspector heroku-mcp-server
```

Alternatively, if you installed the package in a specific directory or are actively developing on the Heroku MCP server:

```
cd /path/to/servers
npx @modelcontextprotocol/inspector dist/index.js
```

### Use the VS Code Run and Debug Function

Use the VS Code
[Run and Debug launcher](https://code.visualstudio.com/docs/debugtest/debugging#_start-a-debugging-session) with fully
functional breakpoints in the code:

1. Locate and select the run debug.
2. Select the configuration labeled "`MCP Server Launcher`" in the dropdown.
3. Select the run/debug button.

### VS Code / Cursor Debugging Setup

To set up local debugging with breakpoints:

1. Store your Heroku auth token in the VS Code user settings:

   - Open the Command Palette (Cmd/Ctrl + Shift + P).
   - Type `Preferences: Open User Settings (JSON)`.
   - Add the following snippet:

   ```json
   {
     "heroku.mcp.authToken": "your-token-here"
   }
   ```

2. Create or update `.vscode/launch.json`:

   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "node",
         "request": "launch",
         "name": "MCP Server Launcher",
         "skipFiles": ["<node_internals>/**"],
         "program": "${workspaceFolder}/node_modules/@modelcontextprotocol/inspector/bin/cli.js",
         "outFiles": ["${workspaceFolder}/**/dist/**/*.js"],
         "env": {
           "HEROKU_API_KEY": "${config:heroku.mcp.authToken}",
           "DEBUG": "true"
         },
         "args": ["heroku-mcp-server"],
         "sourceMaps": true,
         "console": "integratedTerminal",
         "internalConsoleOptions": "neverOpen",
         "preLaunchTask": "npm: build:watch"
       },
       {
         "type": "node",
         "request": "attach",
         "name": "Attach to Debug Hook Process",
         "port": 9332,
         "skipFiles": ["<node_internals>/**"],
         "sourceMaps": true,
         "outFiles": ["${workspaceFolder}/dist/**/*.js"]
       },
       {
         "type": "node",
         "request": "attach",
         "name": "Attach to REPL Process",
         "port": 9333,
         "skipFiles": ["<node_internals>/**"],
         "sourceMaps": true,
         "outFiles": ["${workspaceFolder}/dist/**/*.js"]
       }
     ],
     "compounds": [
       {
         "name": "Attach to MCP Server",
         "configurations": ["Attach to Debug Hook Process", "Attach to REPL Process"]
       }
     ]
   }
   ```

3. Create `.vscode/tasks.json`:

   ```json
   {
     "version": "2.0.0",
     "tasks": [
       {
         "type": "npm",
         "script": "build:watch",
         "group": {
           "kind": "build",
           "isDefault": true
         },
         "problemMatcher": ["$tsc"]
       }
     ]
   }
   ```

4. (Optional) Set breakpoints in your TypeScript files.

5. Press F5 or use the **`Run and Debug`** sidebar.

Note: the debugger automatically builds your TypeScript files before launching.

### Installing via Smithery

To install Heroku Platform MCP Server for Claude Desktop automatically via
[Smithery](https://smithery.ai/server/@heroku/heroku-mcp-server):

```bash
npx -y @smithery/cli install @heroku/heroku-mcp-server --client claude
```

## Environment Variables

The Heroku Platform MCP Server supports the following environment variables:

### `HEROKU_API_KEY`

Your Heroku authorization token. Required for authentication with the Heroku Platform.

### `MCP_SERVER_REQUEST_TIMEOUT`

Timeout in milliseconds for command execution. Defaults to 15000 (15 seconds) if not set.

Example configuration with custom timeout:

```json
{
  "mcpServers": {
    "heroku": {
      "command": "npx",
      "args": ["-y", "@heroku/mcp-server"],
      "env": {
        "HEROKU_API_KEY": "<YOUR_HEROKU_AUTH_TOKEN>",
        "MCP_SERVER_REQUEST_TIMEOUT": "30000"
      }
    }
  }
}
```
