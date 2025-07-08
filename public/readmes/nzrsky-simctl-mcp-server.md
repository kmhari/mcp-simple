# SimCtl MCP Server

A Model Context Protocol (MCP) server that provides structured access to iOS Simulator management via `xcrun simctl` commands.

## Installation

### Method 1: Using uvx

1. **Prerequisites**:
   - Python 3.13+
   - Xcode with Command Line Tools installed
   - [uvx](https://github.com/astral-sh/uv): `curl -LsSf https://astral.sh/uv/install.sh | sh`

2. **Run directly with uvx**:
   ```bash
   uvx simctl-mcp-server
   ```

### Method 2: Local Development Installation

1. **Prerequisites**:
   - Python 3.13+
   - Xcode with Command Line Tools installed

2. **Clone and install**:
   ```bash
   git clone https://github.com/nzrsky/simctl-mcp-server
   cd simctl-mcp-server
   pip install .
   ```

3. **Run the server**:
   ```bash
   simctl-mcp-server
   ```

### Method 3: Build from Source

1. **Build the wheel**:
   ```bash
   python -m build --wheel
   pip install dist/simctl_mcp_server-0.1.0-py3-none-any.whl
   ```

## Configuration

### For Claude Desktop

Add to your `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "simctl": {
      "command": "simctl-mcp-server",
      "args": [],
      "env": {}
    }
  }
}
```

Or if using uvx:

```json
{
  "mcpServers": {
    "simctl": {
      "command": "uvx",
      "args": ["simctl-mcp-server"],
      "env": {}
    }
  }
}
```

### For VS Code with MCP Extension

1. **Install the MCP Extension** from the VS Code marketplace
2. **Add server configuration** to your VS Code settings (`settings.json`):

```json
{
  "mcp.servers": {
    "simctl": {
      "command": "simctl-mcp-server",
      "args": [],
      "env": {}
    }
  }
}
```

Or if using uvx:

```json
{
  "mcp.servers": {
    "simctl": {
      "command": "uvx",
      "args": ["simctl-mcp-server"],
      "env": {}
    }
  }
}
```

3. **Restart VS Code** to load the MCP server
4. **Use the Command Palette** (`Cmd+Shift+P`) and search for "MCP" commands to interact with the simulator tools

### For Other MCP Clients

The server runs on stdio, so you can invoke it directly:

**With installed package:**
```bash
simctl-mcp-server
```

**With uvx:**
```bash
uvx simctl-mcp-server
```

## Available Tools

### Device Management
- **`simctl_list_devices`** - List all simulators and their states
- **`simctl_boot_device`** - Boot a simulator
- **`simctl_shutdown_device`** - Shutdown a simulator
- **`simctl_create_device`** - Create a new simulator
- **`simctl_delete_device`** - Delete simulators

### App Management
- **`simctl_install_app`** - Install an app (.app bundle or .ipa)
- **`simctl_launch_app`** - Launch an app with options
- **`simctl_terminate_app`** - Terminate a running app

### Media & Screenshots
- **`simctl_screenshot`** - Take screenshots
- **`simctl_record_video`** - Record video (start recording)

### Testing & Development
- **`simctl_push_notification`** - Send push notifications
- **`simctl_privacy_control`** - Manage app permissions
- **`simctl_set_location`** - Set device location/GPS
- **`simctl_status_bar_override`** - Override status bar appearance
- **`simctl_ui_appearance`** - Control light/dark mode

## Usage Examples

### Basic Device Operations

```
# List all devices
"List all available iOS simulators"

# Boot a specific device
"Boot the iPhone 15 Pro simulator"

# Create a new simulator
"Create a new iPhone 14 simulator named 'Test Device' with iOS 17.0"
```

### App Testing

```
# Install and launch an app
"Install MyApp.app on the booted simulator and launch it"

# Take a screenshot
"Take a screenshot of the current simulator and save it to ~/Desktop/screenshot.png"

# Send a push notification
"Send a push notification with title 'Hello' and body 'Test message' to com.example.myapp"
```

### UI Testing Setup

```
# Set up a controlled testing environment
"Set the simulator to dark mode, override the status bar to show full battery and strong WiFi, and set the time to 9:41 AM"

# Grant permissions for testing
"Grant photo library access to com.example.myapp on the booted simulator"
```

### Location Testing

```
# Set specific location
"Set the simulator location to Apple Park (37.334606, -122.009102)"

# Clear location
"Clear the simulated location on the booted device"
```

## Error Handling

The server includes comprehensive error handling:

- **Command failures**: Returns detailed error messages from simctl
- **Missing Xcode**: Detects when xcrun simctl is not available
- **Invalid parameters**: Validates input parameters before execution
- **File operations**: Handles temporary files for push notifications safely

## Security Considerations

- The server only exposes read and simulator management operations
- No access to host file system beyond specified app paths
- Push notification payloads are validated for structure
- Privacy permission changes are explicit and logged

## Development Notes

- Built specifically for iOS development workflows
- Optimized for common simulator management tasks
- Structured output parsing for JSON responses
- Support for both individual and batch operations
- Compatible with Xcode 15+ simulator features
