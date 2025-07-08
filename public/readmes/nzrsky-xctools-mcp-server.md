# XCTools MCP Server

A Model Context Protocol (MCP) server that provides structured access to Xcode development tools including `xcrun`, `xcodebuild`, and `xctrace`.

## Installation

### Method 1: Using uvx

1. **Prerequisites**:
   - Python 3.13+
   - Xcode with Command Line Tools installed
   - [uvx](https://github.com/astral-sh/uv): `curl -LsSf https://astral.sh/uv/install.sh | sh`

2. **Run directly with uvx**:
   ```bash
   uvx xctools-mcp-server
   ```

### Method 2: Local Development Installation

1. **Prerequisites**:
   - Python 3.13+
   - Xcode with Command Line Tools installed

2. **Clone and install**:
   ```bash
   git clone https://github.com/nzrsky/xctools-mcp-server
   cd xctools-mcp-server
   pip install .
   ```

3. **Run the server**:
   ```bash
   xctools-mcp-server
   ```

### Method 3: Build from Source

1. **Build the wheel**:
   ```bash
   python -m build --wheel
   pip install dist/xctools_mcp_server-0.1.0-py3-none-any.whl
   ```

## Configuration

### For Claude Desktop

Add to your `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "xctools": {
      "command": "xctools-mcp-server",
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
    "xctools": {
      "command": "uvx",
      "args": ["xctools-mcp-server"],
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
    "xctools": {
      "command": "xctools-mcp-server",
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
    "xctools": {
      "command": "uvx",
      "args": ["xctools-mcp-server"],
      "env": {}
    }
  }
}
```

3. **Restart VS Code** to load the MCP server
4. **Use the Command Palette** (`Cmd+Shift+P`) and search for "MCP" commands to interact with the Xcode development tools

### For Other MCP Clients

The server runs on stdio, so you can invoke it directly:

**With installed package:**
```bash
xctools-mcp-server
```

**With uvx:**
```bash
uvx xctools-mcp-server
```

## Features

- **Complete Xcode toolchain access** through `xcrun`
- **Project building and testing** with `xcodebuild`
- **Performance analysis** using `xctrace` (Instruments)
- **SDK and destination management**
- **Comprehensive error handling** with detailed messages
- **Cross-platform compatibility** (macOS with Xcode installed)

## Available Tools

### XCRUN Tools
- **`xcrun_find_tool`** - Find the path to development tools (clang, swift, etc.)
- **`xcrun_show_sdk_path`** - Show the path to SDKs
- **`xcrun_show_sdk_version`** - Show SDK versions
- **`xcrun_run_tool`** - Run any development tool via xcrun

### XCODEBUILD Tools
- **`xcodebuild_build`** - Build Xcode projects or workspaces
- **`xcodebuild_test`** - Run tests for projects/workspaces
- **`xcodebuild_archive`** - Archive projects for distribution
- **`xcodebuild_list`** - List targets, schemes, and configurations
- **`xcodebuild_show_sdks`** - List all available SDKs
- **`xcodebuild_show_destinations`** - Show valid build destinations

### XCTRACE Tools (Instruments)
- **`xctrace_record`** - Record new Instruments traces
- **`xctrace_import`** - Import supported files into trace format
- **`xctrace_export`** - Export data from trace files
- **`xctrace_list`** - List available devices, templates, or instruments
- **`xctrace_symbolicate`** - Symbolicate traces with debug symbols

## Usage Examples

### Finding Development Tools

```
# Find the path to a specific tool
"Find the path to clang compiler"

# Show SDK path for iOS
"Show the path to the iOS SDK"

# Get SDK version information
"Show the version of the iOS SDK"
```

### Building Projects

```
# Build an Xcode project
"Build the project MyApp.xcodeproj for iOS simulator"

# Run tests for a workspace
"Run tests for MyApp.xcworkspace on iPhone 15 Pro simulator"

# Archive for distribution
"Archive MyApp.xcworkspace for release"

# List project information
"List all schemes and targets in MyApp.xcodeproj"
```

### Performance Analysis with Instruments

```
# Record a trace for Time Profiler
"Record a Time Profiler trace for MyApp on iPhone 15 Pro for 30 seconds"

# List available instruments
"List all available Instruments templates"

# Export trace data
"Export data from trace file to XML format"

# Import a file for analysis
"Import a .dtps file into Instruments trace format"
```

### SDK and Destination Management

```
# List all available SDKs
"Show all available SDKs for building"

# Show build destinations
"List all available destinations for iOS builds"

# Run a tool via xcrun
"Run swift command with version flag via xcrun"
```

## Error Handling

The server includes comprehensive error handling:

- **Command failures**: Returns detailed error messages from xcrun, xcodebuild, and xctrace
- **Missing Xcode**: Detects when Xcode Command Line Tools are not available
- **Invalid parameters**: Validates tool arguments and provides helpful error messages
- **Tool availability**: Checks for required tools before execution

## Troubleshooting

### Common Issues

1. **"xcrun: error: unable to find utility"**
   - Ensure Xcode Command Line Tools are installed: `xcode-select --install`
   - Verify Xcode is properly configured: `xcode-select -p`

2. **"No developer directory found"**
   - Install Xcode from the Mac App Store
   - Accept Xcode license: `sudo xcodebuild -license accept`

3. **Permission errors**
   - Ensure the user has necessary permissions to access Xcode tools
   - Try running with proper macOS development permissions

4. **Tool not found errors**
   - Verify the specific tool is available in your Xcode installation
   - Some tools may require specific Xcode versions or additional components

## Requirements

- **macOS**: Required (Xcode development tools are macOS-only)
- **Xcode**: Xcode Command Line Tools or full Xcode installation
- **Python**: 3.13 or higher
- **MCP Client**: Claude Desktop, VS Code with MCP extension, or any MCP-compatible client

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
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
