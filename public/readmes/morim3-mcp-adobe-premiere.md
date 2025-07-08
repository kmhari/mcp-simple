# Adobe Premiere Pro MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](LICENSE)

**⚠️ DEVELOPMENT NOTICE**: This project is currently in active development and is not ready for production use. Features may change without notice, and there are no guarantees about stability or functionality. Use at your own risk.

A system that allows LLMs (like Claude) to control Adobe Premiere Pro through an MCP server and UXP plugin.

## Project Overview

**Purpose**: Implement an MCP server that enables LLMs (Claude, etc.) to control Adobe Premiere Pro  

## System Requirements

- **Adobe Premiere Pro Beta (25.3)** or later
- **UXP Developer Tool** for loading plugins

## System Architecture

```
LLM (Claude Desktop) → MCPServer (Python/fastmcp) → UXP Plugin (TypeScript) → Adobe Premiere Pro
```

## Key Features

- Sequence creation/deletion
- Media file importing

## Project Structure

```
mcp_adobe_premiere
├── LICENSE                   # Mozilla Public License
├── README.md                 # Project documentation
├── plugin/                   # Adobe UXP Plugin
│   ├── index.html            # Plugin UI
│   ├── manifest.json         # Plugin manifest
│   ├── package.json          # Node.js dependencies
│   ├── tsconfig.json         # TypeScript configuration
│   ├── types.d.ts            # Adobe Premiere Pro API type definitions
│   ├── webpack.config.js     # Webpack configuration
│   └── src/                  # Plugin source code
│       ├── index.ts          # Plugin entry point
│       ├── tools.ts          # API implementation
│       └── websocket_server.ts # WebSocket client for server communication
└── server/                   # Python MCP server
    ├── main.py               # Server entry point
    ├── requirements.txt      # Python dependencies
    ├── tools.py              # Tools implementation
    ├── websocket_server.py   # WebSocket server for plugin communication
    └── tools/                # Additional tools
        └── manage_project.py # Project management tools
```

## Setup Instructions

### Server Setup

1. Create and activate a virtual environment:
   ```
   python -m venv .venv
   source .venv/bin/activate   # On Windows: .venv\Scripts\activate
   ```

2. Install dependencies:
   ```
   pip install -r server/requirements.txt
   ```

### Claude Desktop Configuration

To enable Claude to control Adobe Premiere Pro, you need to configure Claude Desktop with the MCP server settings:

1. Locate Claude Desktop's configuration file:
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

2. Add the Adobe Premiere MCP server configuration to the file:
   ```json
   {
     "mcpServers": {
       "adobe-premiere": {
         "command": "<path-to-virtual- python-executable>",
         "args": [
           "<path-to-server-main.py>"
         ]
       }
     }
   }
   ```

3. Example configuration (Windows):
   ```json
   {
     "mcpServers": {
       "adobe-premiere": {
         "command": "C:\\Users\\username\\Documents\\repos\\mcp_adobe_premiere\\.venv\\Scripts\\python.exe",
         "args": [
           "C:\\Users\\username\\Documents\\repos\\mcp_adobe_premiere\\server\\main.py"
         ]
       }
     }
   }
   ```

5. Restart Claude Desktop for the changes to take effect.

### Premiere Plugin Setup

1. Install dependencies:
   ```
   cd plugin
   npm install
   ```

2. Build the plugin:
   ```
   npm run build
   ```

3. Install UXP Developer Tool and load the plugin in Adobe Premiere Pro:
   - Open Adobe Premiere Pro Beta (v25.3 or later)
   - Launch UXP Developer Tool
   - Click "Add Plugin" and select the folder `plugin` from this repository
   - Click "Load" to load the plugin into Premiere Pro
   - The plugin should appear as "MCPAdobe" in the Premiere Pro Extensions menu
   - Open the plugin panel from Window > Extensions > MCPAdobe
   - Connect to the MCP server using the default URL or customize as needed


## References

- [Adobe UXP Documentation](https://developer.adobe.com/premiere-pro/uxp/plugins/)
