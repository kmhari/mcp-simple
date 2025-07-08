[日本語](README.ja.md)

# MCP-ADB

A Model Context Protocol (MCP) server that provides integration with Android Debug Bridge (ADB) for AI assistants to interact with Android devices.

## Features

- **Screenshot Capture**: Take screenshots of connected Android devices with automatic resizing
- **Base64 Image Data**: Receive screenshot data directly as base64-encoded strings
- **Key Event Control**: Send key events to Android devices (navigation, back, home)
- **Multiple Device Support**: Target specific devices when multiple devices are connected
- **Device Listing**: List all connected Android devices as resources
- **Resource Access**: Access screenshots and device information via resource URIs

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Android Debug Bridge (ADB)](https://developer.android.com/studio/command-line/adb) installed and available in PATH or configured via ADB_PATH environment variable
- Connected Android device(s) with USB debugging enabled

## Installation

```bash
# Clone the repository
git clone https://github.com/isseikz/mcp-adb.git
cd mcp-adb

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### Using with Claude Desktop

To use this MCP server with Claude Desktop add mcp-adb into claude_desktop_config.json, which can be found in the Claude Desktop installation directory or Claude - Settings - Developer - Edit Config

Here is an example of how to configure the `claude_desktop_config.json` file:

````json
{
  "mcpServers": {
    "mcp-adb": {
      "command": "node",
      "args": ["/path/to/mcp-adb/build/index.js"],
      "env": {
        "ADB_PATH": "/path/to/adb"
      }
    }
  }
}

```json
{
  "mcpServers": {
    "mcp-adb": {
      "command": "node",
      "args": ["/path/to/mcp-adb/build/index.js"],
      "env": {
        "ADB_PATH": "/path/to/adb"
      }
    }
  }
}
````

### Available Tools

#### Screenshot Tool

Captures a screenshot from a connected Android device and automatically resizes it to 640px width.

Parameters:

- `deviceId` (optional): Target a specific device when multiple devices are connected

Response:

- Base64-encoded image data (PNG format) directly in the response

Example:

```json
{
  "name": "screenshot",
  "arguments": {
    "deviceId": "emulator-5554"
  }
}
```

#### Press Key Tool

Sends a key event to a connected Android device.

Parameters:

- `keycode`: The Android key code to send (see list below)
- `deviceId` (optional): Target a specific device when multiple devices are connected

Available keycodes:

- `KEYCODE_DPAD_CENTER` - Center/OK button
- `KEYCODE_DPAD_DOWN` - Down navigation
- `KEYCODE_DPAD_UP` - Up navigation
- `KEYCODE_DPAD_LEFT` - Left navigation
- `KEYCODE_DPAD_RIGHT` - Right navigation
- `KEYCODE_DPAD_UP_LEFT` - Diagonal up-left
- `KEYCODE_DPAD_UP_RIGHT` - Diagonal up-right
- `KEYCODE_DPAD_DOWN_LEFT` - Diagonal down-left
- `KEYCODE_DPAD_DOWN_RIGHT` - Diagonal down-right
- `KEYCODE_BACK` - Back button
- `KEYCODE_HOME` - Home button

Example:

```json
{
  "name": "pressKey",
  "arguments": {
    "keycode": "KEYCODE_DPAD_DOWN",
    "deviceId": "emulator-5554"
  }
}
```

### Resources

#### Connected Devices

List all connected Android devices:

```
adb://devices
```

Response:

- A list of connected device IDs

#### Screenshots

Access a specific screenshot by filename:

```
adb://screenshots/{filename}
```

For example:

```
adb://screenshots/screenshot-2025-04-10T16-30-48-931Z.png
```

## Development

### Project Structure

```
mcp-adb/
├── src/
│   └── index.ts    # Main server implementation
├── build/          # Compiled JavaScript files
├── temp/           # Temporary directory for screenshots
├── package.json    # Project dependencies and scripts
└── tsconfig.json   # TypeScript configuration
```

### Building

```bash
npm run build
```

This will compile the TypeScript code to JavaScript in the `build` directory.

## Requirements

This project uses the following dependencies:

- `@modelcontextprotocol/sdk`: MCP server implementation
- `fs-extra`: Enhanced file system methods
- `sips`: Used for image resizing (built into macOS) to reduce context comsumption

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
