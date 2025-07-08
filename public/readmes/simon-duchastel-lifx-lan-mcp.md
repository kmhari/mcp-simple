# LIFX LAN MCP

![Cover image](images/cover-image.jpg)

[![npm](https://img.shields.io/npm/v/lifx-lan-mcp)](https://www.npmjs.com/package/lifx-lan-mcp)&nbsp;[![MCP Server](https://badge.mcpx.dev/?type=server)](https://modelcontextprotocol.io/introduction)&nbsp;[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/simonduchastel)

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) server for allowing an LLM to control LIFX lights over your local area network (LAN), without cloud connectivity.

**Note** that the MCP server must be running on the same wifi network as your LIFX lights in order for the tool to work.

## Features

- List all available LIFX lights on your network
- Get the current state of lights (color, on/off, labels)
- Turn lights on/off
- Change light colors
- Local network operation (no cloud required, server must be running on the same network)
- Configurable transport (sse or stdio)

## Installation

### NPX (configuring via local stdio) - default

Add this, or similar, to your LLM MCP config file (ex. for [Claude Desktop](https://claude.ai/download) this is `claude_desktop_config.json`).

```json
{
  "mcpServers": {
    "lifx-lan-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "lifx-lan-mcp"
      ]
    }
  }
}
```

### Running the Server

The server can be run in two modes: stdio (default) or HTTP server mode. The server supports both the 2025-03-26 and 2024-11-05 protocol versions.

### Stdio Mode (Default)

Stdio mode is the simplest way to run the server, where it communicates directly with the LLM through standard input/output. This is the default mode and requires no additional configuration. In this mode, the MCP server
is started directly by the client with which it's communicating.

```bash
# Run in stdio mode (default)
npx lifx-lan-mcp

# Or explicitly specify stdio mode
npx lifx-lan-mcp --mode stdio
```

### HTTP Server Mode

> **WARNING:** HTTP SERVER MODE IS DANGEROUS. It currently doesn't support authentication, which means attackers could trick your LLM into giving it data or alternatively allow malicious clients to control your LIFX lights. Use at your own risk until authentication is supported.

HTTP server mode allows the server to run as a standalone service that can be accessed over HTTP. This is useful when you want to run the server separately from the LLM client, ex. over a network.


```bash
# Run in HTTP server mode on default port (3000)
npx lifx-lan-mcp --mode sse

# Run in HTTP server mode on a specific port
npx lifx-lan-mcp --mode sse --port 8080
```

#### Protocol Versions

The HTTP server supports two protocol versions:

1. **2025-04-21 Protocol** (Latest)
   - Uses `/mcp` endpoint for all operations
   - Supports both HTTP and SSE transports
   - Example client configuration:
   ```json
   {
     "mcpServers": {
       "lifx-lan-mcp": {
         "url": "http://localhost:3000/mcp"
       }
     }
   }
   ```

2. **2025-03-26 Protocol** (Legacy)
   - Uses `/sse` endpoint for establishing connections
   - Uses `/message` endpoint for sending messages
   - Example client configuration:
   ```json
   {
     "mcpServers": {
       "lifx-lan-mcp": {
         "url": "http://localhost:3000/sse"
       }
     }
   }
   ```

### Tools

- **lifx_lan_list_lights**
  - List all Lifx lights currently available on the user's local area network (LAN)
  - Each light is specified by a unique string label
  - Includes additional information about the light, such as group and location
  - Inputs: None required

- **lifx_lan_get_lights_state**
  - Get the current state of one or more LIFX lights, including colors, on/off state, groups and locations
  - Inputs:
    - `labels` (string[]): Array of light labels to get state for

- **lifx_lan_set_lights_color**
  - Set the color of one or more Lifx lights
  - Inputs:
    - `labels` (string[]): Array of light labels to set color for
    - `color` (object): Color specification
      - `hue` (number): Hue value (0.0-1.0)
      - `saturation` (number): Saturation value (0.0-1.0)
      - `brightness` (number): Brightness value (0.0-1.0) 
      - `kelvin` (number, optional): Color temperature in Kelvin (1500-9000, defaults to 3500)
    - `duration` (number, optional): Transition duration in milliseconds

- **lifx_lan_turn_on_lights**
  - Turn on one or more Lifx lights, optionally at specific color
  - Inputs:
    - `labels` (string[]): Array of light labels to turn on
    - `color` (object, optional): Color specification if changing color
      - `hue` (number, optional): Hue value (0.0-1.0)
      - `saturation` (number, optional): Saturation value (0.0-1.0)
      - `brightness` (number, optional): Brightness value (0.0-1.0)
      - `kelvin` (number, optional): Color temperature in Kelvin
    - `duration` (number, optional): Transition duration in milliseconds

- **lifx_lan_turn_off_lights**
  - Turn off one or more Lifx lights
  - Inputs:
    - `labels` (string[]): Array of light labels to turn off
    - `duration` (number, optional): Transition duration in milliseconds


## Development

### Prerequisites
- Node.js
- TypeScript
- LIFX lights on your local network

### Building from Source

1. Clone the repository:
```bash
git clone https://github.com/simon-duchastel/lifx-lan-mcp.git
cd lifx-lan-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

The MCP definition is found in [index.ts](index.ts), which contains all of the tools available to the LLM. The APIs which the tools call are availabe in the [src/](src/) folder.

### Development Scripts
- `npm run prepare` - Compile the project (builds `dist/index.js`)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Feel free to reach out at [lifx-lan-mcp@duchastel.com](mailto:lifx-lan-mcp@duchastel.com) or by [opening a GitHub issue](https://github.com/simon-duchastel/lifx-lan-mcp/issues).

If you find this project useful, you can [buy me a coffee](https://buymeacoffee.com/simonduchastel).
