# LIFX API MCP Server

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Docker Hub Version](https://img.shields.io/docker/v/furey/lifx-api-mcp-server)](https://hub.docker.com/r/furey/lifx-api-mcp-server) <!-- Placeholder -->
[![NPM Version](https://img.shields.io/npm/v/lifx-api-mcp-server)](https://www.npmjs.com/package/lifx-api-mcp-server) <!-- Placeholder -->
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-donate-orange.svg)](https://www.buymeacoffee.com/furey) <!-- Optional -->

**LIFX API MCP Server** is a local Model Context Protocol (MCP) server providing access to LIFX devices using natural language via LLMs to perform actions like listing lights, setting states, activating scenes, and triggering effects through the LIFX HTTP API. Includes contextual resources and helpful prompts.

## Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Client Setup](#client-setup)
- [Data Protection](#data-protection)
- [Tutorial](#tutorial)
- [Dockerfile](#dockerfile)
- [Disclaimer](#disclaimer)
- [Support](#support)

## Quick Start

1.  **Get a LIFX API Token:**
    *   Go to your [LIFX Cloud settings page](https://cloud.lifx.com/settings).
    *   Generate a new personal access token. **Keep this token secure!**
2.  **Install LIFX MCP Server:** (Choose one method)
    *   **NPX (Recommended):**
        ```console
        npx -y lifx-api-mcp-server@latest
        ```
    *   **Docker:**
        ```console
        docker run --rm -i --network=host --pull=always furey/lifx-api-mcp-server
        ```
3.  **Configure API Token:**
    *   **Crucial Step:** Set your token via **one** of these methods (priority order):
        1.  **Config File (Recommended):** Edit `~/.lifx-api-mcp-server.jsonc` (generate with `npx -y lifx-api-mcp-server@latest config:create`) and add your token to the `apiToken` field.
        2.  **Environment Variable:** Set `CONFIG_API_TOKEN=YOUR_LIFX_API_TOKEN`.
        3.  **Command Line Argument (Least Recommended):** Pass the token when running the server (e.g., `npx ... YOUR_TOKEN`).
4.  **Set up MCP Client:**
    *   Configure your client (e.g., [Claude Desktop](#client-setup-claude-desktop), [MCP Inspector](#client-setup-mcp-inspector)) to launch the server *without* the token argument if using config/env.
5.  **Control Your Lights:**
    *   Start interacting with your LIFX devices using natural language (see [Tutorial](#tutorial)). Use resources like `@lix-api:lifx://lights` and prompts like `@lix-api:effect-creator`.

## Features

### Tools

*   [`list-lights`](#): Gets lights belonging to the account, filterable by selector.
*   [`set-state`](#): Sets the state (power, color, brightness, etc.) of selected lights.
*   [`set-states`](#): Sets multiple states across multiple selectors in one request.
*   [`state-delta`](#): Changes state properties (brightness, hue, saturation, kelvin, infrared) by a relative amount.
*   [`toggle-power`](#): Toggles the power state of selected lights.
*   [`breathe-effect`](#): Performs a breathe (fade) effect.
*   [`pulse-effect`](#): Performs a pulse (flash) effect.
*   [`move-effect`](#): Performs a move effect on linear devices (LIFX Z strips).
*   [`morph-effect`](#): Performs a morph effect on Tile devices.
*   [`flame-effect`](#): Performs a flame effect on Tile devices.
*   [`clouds-effect`](#): Performs a clouds effect on Tile devices (FW >= 4.8).
*   [`sunrise-effect`](#): Performs a sunrise effect on Tile devices (FW >= 4.8).
*   [`sunset-effect`](#): Performs a sunset effect on Tile devices (FW >= 4.8).
*   [`effects-off`](#): Turns off any running effects.
*   [`list-scenes`](#): Lists available scenes in the account.
*   [`activate-scene`](#): Activates a specified scene by its UUID.
*   [`cycle`](#): Cycles selected lights through a list of predefined states.
*   [`validate-color`](#): Validates a color string and returns its components.
*   [`clean`](#): Controls LIFX Clean devices.

### Resources

*   [`lifx://lights`](#): Provides a summary list of available lights (ID, Label, Power, Connected). Fetches live data.
*   [`lifx://light/{selector}/state`](#): Provides the detailed current state for the light(s) matching the selector. Supports autocompletion for selectors. Fetches live data.
*   [`lifx://scenes`](#): Provides a list of available scenes (Name, UUID). Fetches live data.

### Prompts

*   [`effect-creator`](#): Guides the user through creating effect parameters and generates the corresponding tool command.
*   [`troubleshooter`](#): Helps diagnose basic connectivity issues for specific lights by checking their status (fetches live data).
*   [`selector-helper`](#): Lists available identifiers (labels, groups, locations, IDs) from live data to help users construct accurate selectors.

### Other Features

*   **Config File:** Customize settings via `~/.lifx-api-mcp-server.jsonc`.
*   **Environment Variables:** Override config settings (e.g., `CONFIG_API_TOKEN`, `CONFIG_LOG_LEVEL`).
*   **Component Disabling:** Selectively disable tools, resources, or prompts via config.
*   **Direct API Mapping:** Tools generally correspond 1:1 with LIFX API endpoints.
*   **Error Handling:** Provides feedback based on LIFX API responses and HTTP status codes.
*   **Selector Support:** Uses LIFX selectors (`all`, `id:`, `label:`, etc.) for targeting lights.
*   **Color Support:** Accepts standard LIFX color strings.
*   **Docker Support:** Run easily within a Docker container.

## Installation

LIFX MCP Server can be installed and run in several ways:

*   [NPX](#installation-npx) (Easiest)
*   [Docker Hub](#installation-docker-hub)
*   [Node.js from Source](#installation-nodejs-from-source)
*   [Docker from Source](#installation-docker-from-source)

### Installation: NPX

> [!NOTE]<br>
> NPX requires [Node.js](https://nodejs.org/en/download) (v18+) installed.

```console
# Ensure Node.js v18+ is installed
node --version

# Run the server (token should ideally be set via config/env)
npx -y lifx-api-mcp-server@latest [YOUR_LIFX_API_TOKEN_IF_NEEDED]
```

### Installation: Docker Hub

> [!NOTE]<br>
> Requires [Docker](https://docs.docker.com/get-started/get-docker) installed.

```console
# Ensure Docker is installed
docker --version

# Run the server (token should ideally be set via config/env)
# Mount config file (recommended):
docker run --rm -i --network=host \
  -v ~/.lifx-api-mcp-server.jsonc:/root/.lifx-api-mcp-server.jsonc:ro \
  --pull=always furey/lifx-api-mcp-server

# OR pass token via environment variable:
docker run --rm -i --network=host \
  -e CONFIG_API_TOKEN=YOUR_LIFX_API_TOKEN \
  --pull=always furey/lifx-api-mcp-server

# OR pass token as argument (least recommended):
docker run --rm -i --network=host \
  --pull=always furey/lifx-api-mcp-server YOUR_LIFX_API_TOKEN
```
*(Replace `furey/lifx-api-mcp-server` with the actual Docker Hub image name if different)*

### Installation: Node.js from Source

> [!NOTE]<br>
> Requires [Node.js](https://nodejs.org/en/download) (v18+) and npm/yarn installed.

1.  Clone the repository (replace with actual URL if published):
    ```console
    git clone https://github.com/furey/lifx-api-mcp-server.git # Placeholder
    cd lifx-api-mcp-server
    ```
2.  Install dependencies:
    ```console
    npm install
    ```
3.  Run the server (token should ideally be set via config/env):
    ```console
    node lifx-api-mcp-server.js [YOUR_LIFX_API_TOKEN_IF_NEEDED]
    ```

### Installation: Docker from Source

> [!NOTE]<br>
> Requires [Docker](https://docs.docker.com/get-started/get-docker) installed.

1.  Clone the repository:
    ```console
    git clone https://github.com/furey/lifx-api-mcp-server.git # Placeholder
    cd lifx-api-mcp-server
    ```
2.  Build the Docker image:
    ```console
    docker build -t lifx-mcp-server .
    ```
3.  Run the container (token should ideally be set via config/env):
    ```console
    # Using mounted config file (recommended):
    docker run --rm -i --network=host \
      -v ~/.lifx-api-mcp-server.jsonc:/root/.lifx-api-mcp-server.jsonc:ro \
      lifx-mcp-server

    # Using environment variable:
    docker run --rm -i --network=host \
      -e CONFIG_API_TOKEN=YOUR_LIFX_API_TOKEN \
      lifx-mcp-server

    # Using argument (least recommended):
    docker run --rm -i --network=host \
      lifx-mcp-server YOUR_LIFX_API_TOKEN
    ```

### Installation Verification

When the server starts successfully, you should see output like:

```
[LIFX MCP] LIFX API MCP Server vX.Y.Z starting…
[LIFX MCP] Loading config file: /path/to/.lifx-api-mcp-server.jsonc (or 'No config file found')
[LIFX MCP] Initializing MCP server…
[LIFX MCP] Registering MCP resources…
[LIFX MCP] Total MCP resources registered: X
[LIFX MCP] Registering MCP prompts…
[LIFX MCP] Total MCP prompts registered: Y
[LIFX MCP] Registering MCP tools…
[LIFX MCP] Total MCP tools registered: Z
[LIFX MCP] Creating stdio transport…
[LIFX MCP] Connecting MCP server transport…
[LIFX MCP] LIFX API MCP Server running.
```

## Configuration

Customize the server's behavior via a config file or environment variables. The API token is the most critical setting.

### Configuration: API Token (Priority Order)

1.  **Config File (`apiToken` key):** Create/edit `~/.lifx-api-mcp-server.jsonc`. (Recommended)
2.  **Environment Variable (`CONFIG_API_TOKEN`):** Set `CONFIG_API_TOKEN=YOUR_TOKEN`.
3.  **Command Line Argument:** Pass token as the first argument when running the script. (Least Recommended)

### Configuration: Config File

Create a configuration file at `~/.lifx-api-mcp-server.jsonc` (or `.json`). Use `npx -y lifx-api-mcp-server@latest config:create` to generate it.

<details>
  <summary><strong>Example configuration file (`~/.lifx-api-mcp-server.jsonc`)</strong></summary>

```jsonc
{
  // Your LIFX Personal Access Token (Required if not using ENV or CLI arg)
  // Get from: https://cloud.lifx.com/settings
  "apiToken": "YOUR_LIFX_API_TOKEN_HERE",

  // Log level: "info" (default) or "verbose" for more detailed logs including rate limits
  "logLevel": "info",

  // --- Optional: Disable specific components ---
  // Add component names here to disable them. Examples:
  // "disabled": {
  //   "tools": ["clean", "cycle"], // Disable specific tools
  //   "resources": ["scenes"],     // Disable the scenes resource
  //   "prompts": true              // Disable all prompts
  // },
  "disabled": {
    "tools": [],
    "resources": [],
    "prompts": []
  },

  // --- Optional: Enable only specific components ---
  // If an 'enabled' array is defined, ONLY those components of that type will be enabled,
  // overriding any 'disabled' settings for that type. Examples:
  // "enabled": {
  //    "tools": ["list-lights", "set-state"], // Only enable these two tools
  //    "resources": ["lights"]                // Only enable the lights resource
  // }
  "enabled": {
    "tools": null,
    "resources": null,
    "prompts": null
  }
}
```

</details>

### Configuration: Config File Generation

You can generate a default configuration file automatically:

```console
# NPX Usage (recommended)
npx -y lifx-api-mcp-server@latest config:create

# Node.js Usage (from source directory)
npm run config:create

# Force overwrite existing file
npx -y lifx-api-mcp-server@latest config:create -- --force
npm run config:create -- --force

# Specify custom path/filename (uses CONFIG_PATH env var)
CONFIG_PATH=/path/to/my-lifx-config.jsonc npm run config:create
```
This saves the example config content to `~/.lifx-api-mcp-server.jsonc` by default.

### Configuration: Environment Variable Overrides

Settings can be overridden using environment variables (take precedence over config file).

| Config Setting          | Environment Variable Override     | Example Value             |
| :---------------------- | :-------------------------------- | :------------------------ |
| `apiToken`              | `CONFIG_API_TOKEN`                | `c0ffee...`               |
| `logLevel`              | `CONFIG_LOG_LEVEL`                | `verbose`                 |
| `disabled.tools`        | `CONFIG_DISABLED_TOOLS`           | `clean,cycle` / `true`    |
| `enabled.tools`         | `CONFIG_ENABLED_TOOLS`            | `list-lights,set-state`   |
| `disabled.resources`    | `CONFIG_DISABLED_RESOURCES`       | `scenes` / `true`         |
| `enabled.resources`     | `CONFIG_ENABLED_RESOURCES`        | `lights,light-state`      |
| `disabled.prompts`      | `CONFIG_DISABLED_PROMPTS`         | `troubleshooter` / `true` |
| `enabled.prompts`       | `CONFIG_ENABLED_PROMPTS`          | `effect-creator`          |

**Example Usage:**

```console
# Set token and log level via environment variables when using NPX
CONFIG_API_TOKEN=YOUR_TOKEN CONFIG_LOG_LEVEL=verbose npx -y lifx-api-mcp-server@latest

# Same example using Docker
docker run --rm -i --network=host \
  -e CONFIG_API_TOKEN=YOUR_TOKEN \
  -e CONFIG_LOG_LEVEL=verbose \
  --pull=always furey/lifx-api-mcp-server
```

## Client Setup

Configure your MCP client (e.g., Claude Desktop, MCP Inspector) to launch the `lifx-api-mcp-server`. **Important:** If you've configured the API token via the config file or environment variable, *do not* pass it as an argument in the client setup.

### Client Setup: Claude Desktop

1.  Install [Claude Desktop](https://claude.ai/download).
2.  Locate or create `claude_desktop_config.json`:
    *   macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
    *   Windows: `%APPDATA%\Claude\claude_desktop_config.json`
3.  Add the server configuration (adjust paths as needed):

    ```json
    {
      "mcpServers": {
        "lix-api": {
          // Use the full path to npx if it's not in your default PATH
          "command": "/path/to/your/npx", // Or node
          "args": [
            // NPX example: (NO TOKEN HERE if set in config/env)
            "-y",
            "lifx-api-mcp-server@latest"

            // Node.js from source example: (NO TOKEN HERE if set in config/env)
            // "/path/to/lifx-api-mcp-server/lifx-api-mcp-server.js"
          ],
          "env": {
             // Optional: Uncomment for verbose logging
             // "CONFIG_LOG_LEVEL": "verbose"
             // Optional: Set token via env if not using config file
             // "CONFIG_API_TOKEN": "YOUR_LIFX_API_TOKEN"
          }
        }
      }
    }
    ```
4.  Restart Claude Desktop.
5.  Start a chat and try interacting with your lights (e.g., "@lix-api list my lights").

### Client Setup: MCP Inspector

[MCP Inspector](https://github.com/modelcontextprotocol/inspector) is useful for debugging.

```console
# Run MCP Inspector with the LIFX server (NO TOKEN HERE if set in config/env)
npx -y @modelcontextprotocol/inspector npx -y lifx-api-mcp-server@latest

# Open the inspector in your browser (usually http://localhost:5173)
```

## Data Protection

*   **API Token Security:** Your LIFX API token grants control over your lights. **Keep it confidential.** Using the config file (`~/.lifx-api-mcp-server.jsonc` with appropriate file permissions) or environment variables is safer than passing the token as a command-line argument, especially in shared environments or logs.
*   **Data Flow:** When using a remote LLM (like via Claude Desktop), your prompts *to* the LLM and the *results* returned by this MCP server (light names, states, scene names) will be sent to the LLM provider. Be mindful of potentially sensitive information in your light/group/location/scene labels if privacy is a major concern.
*   **Local Execution:** This server runs locally on your machine. It communicates directly with the LIFX cloud API over HTTPS.

## Tutorial

Ensure the server is running and connected to your MCP client. Replace placeholders like `label:MyLamp` with your actual light/group/location labels or IDs.

1.  **Check Available Lights (Resource):**
    *   `@lix-api:lifx://lights`
    *   <sup>➥ Uses `lights` resource</sup>

2.  **Get Specific Light State (Resource):**
    *   `@lix-api:lifx://light/label:Office Lamp/state`
    *   <sup>➥ Uses `light-state` resource</sup>

3.  **Get Available Scenes (Resource):**
    *   `@lix-api:lifx://scenes`
    *   <sup>➥ Uses `scenes` resource</sup>

4.  **Use Selector Helper (Prompt):**
    *   `@lix-api:selector-helper goal: "the lights in the kitchen"`
    *   <sup>➥ Uses `selector-helper` prompt</sup>

5.  **Create an Effect (Prompt):**
    *   `@lix-api:effect-creator effect_type:breathe selector:all description:"a very slow fade to warm white"`
    *   <sup>➥ Uses `effect-creator` prompt (follow instructions in response)</sup>

6.  **Troubleshoot a Light (Prompt):**
    *   `@lix-api:troubleshooter selector:"id:d073d5xxxxxx"`
    *   <sup>➥ Uses `troubleshooter` prompt</sup>

7.  **List Your Lights (Tool):**
    *   _"list my lights"_ or _"list lights selector:all"_
    *   <sup>➥ Uses `list-lights` tool</sup>

8.  **Turn a Light On (Tool):**
    *   _"turn on the lamp named Office Lamp"_ or _"set state selector:label:Office Lamp power:on"_
    *   <sup>➥ Uses `set-state` tool</sup>

9.  **Set Color and Brightness (Tool):**
    *   _"set the Kitchen group lights to blue at 50% brightness over 3 seconds"_
    *   _"set state selector:group:Kitchen color:blue brightness:0.5 duration:3"_
    *   <sup>➥ Uses `set-state` tool</sup>

10. **Toggle a Location (Tool):**
    *   _"toggle the lights in the Living Room"_ or _"toggle power selector:location:Living Room"_
    *   <sup>➥ Uses `toggle-power` tool</sup>

11. **Increase Brightness (Tool):**
    *   _"make all lights 10% brighter"_ or _"state delta selector:all brightness:0.1"_
    *   <sup>➥ Uses `state-delta` tool</sup>

12. **Activate a Scene (Requires Scene UUID from Resource/Tool):**
    *   _"activate scene with uuid abcdef12-3456-..."_
    *   _"activate scene scene_uuid:abcdef12-3456-..."_
    *   <sup>➥ Uses `activate-scene` tool</sup>

## Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies cleanly
# Using --omit=dev because devDependencies are not needed in production
RUN npm ci --omit=dev --production --no-fund --no-audit

# Copy the rest of the application code
COPY . .

# Set the entrypoint
ENTRYPOINT ["node", "lifx-api-mcp-server.js"]

# Default command (can be overridden, e.g., with API token if not using config/env)
# CMD ["YOUR_DEFAULT_TOKEN_IF_NEEDED"]
```

## Disclaimer

*   This software is provided "as is", without warranty of any kind. Use at your own risk.
*   The author is not affiliated with LIFX (LiFi Labs Inc.).
*   Ensure you understand the LIFX API rate limits (120 requests/minute per token) to avoid temporary blocks. Rate limit information is logged if `logLevel` is `verbose`.
*   This server was partially generated with AI assistance and may contain bugs.

## Support

If you find this tool useful, consider supporting the developer (optional):

[Buy Me a Coffee](https://www.buymeacoffee.com/furey) | [GitHub Sponsorship](https://github.com/sponsors/furey)
