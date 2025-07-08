# Swift MCP GUI Server

A Model Context Protocol (MCP) server that allows controlling macOS through [SwiftAutoGUI](https://github.com/NakaokaRei/SwiftAutoGUI). This server provides tools for programmatically controlling the mouse and keyboard through MCP clients.

## Requirements

- macOS 15.0 or later
- Swift 6.0 or later
- Xcode 16.0 or later

## Installation

1. Clone this repository:
```bash
git clone https://github.com/NakaokaRei/swift-mcp-gui.git
cd swift-mcp-gui
```

2. Install
```bash
swift package experimental-install
```

3. Add command to your MCP client.
```json
{
  "mcpServers" : {
    "swift-mcp-gui" : {
      "command" : "/Users/USERNAME/.swiftpm/bin/swift-mcp-gui"
    }
  }
}

```

## Available Tools

The server provides the following tools for controlling macOS:

### 1. Mouse Movement
- Tool name: `moveMouse`
- Input:
  - `x`: number (x-coordinate) - accepts integers, doubles, or string representations
  - `y`: number (y-coordinate) - accepts integers, doubles, or string representations
- Moves the mouse cursor to the specified coordinates

### 2. Mouse Clicks
- Tool name: `mouseClick`
- Input:
  - `button`: string ("left" or "right")
- Performs a mouse click at the current cursor position

### 3. Keyboard Input
- Tool name: `sendKeys`
- Input:
  - `keys`: array of strings (key names)
- Sends keyboard shortcuts or key combinations
- Example keys: "command", "control", "option", "shift", "return", "space", "a", "1", etc.

### 4. Scrolling
- Tool name: `scroll`
- Input:
  - `direction`: string ("up", "down", "left", "right")
  - `clicks`: number (number of scroll clicks)
- Performs scrolling in the specified direction

### 5. Screen Size
- Tool name: `getScreenSize`
- Returns the main screen dimensions (width and height)

### 6. Pixel Color
- Tool name: `getPixelColor`
- Input:
  - `x`: number (x-coordinate) - accepts integers, doubles, or string representations
  - `y`: number (y-coordinate) - accepts integers, doubles, or string representations
- Returns the RGBA color values (0-255) of the pixel at the specified coordinates

## Security Considerations

This server requires full accessibility permissions in System Preferences to control your mouse and keyboard. Be careful when running it and only connect trusted MCP clients.

## License

MIT License 
