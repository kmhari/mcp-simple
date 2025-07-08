# NodeMCU MCP (Model Context Protocol) Service

<p align="center">
  <img src="assets/nodemcu-logo.svg" alt="NodeMCU MCP Logo" width="200" />
</p>


[![GitHub license](https://img.shields.io/github/license/amanasmuei/nodemcu-mcp)](https://github.com/amanasmuei/nodemcu-mcp/blob/main/LICENSE)
[![npm version](https://badge.fury.io/js/nodemcu-mcp.svg)](https://badge.fury.io/js/nodemcu-mcp)
[![smithery badge](https://smithery.ai/badge/@amanasmuei/nodemcu-mcp)](https://smithery.ai/server/@amanasmuei/nodemcu-mcp)


A Model Context Protocol (MCP) service for managing NodeMCU devices. This service provides both a standard RESTful API/WebSocket interface and implements the [Model Context Protocol](https://modelcontextprotocol.io) for integration with AI tools like Claude Desktop.

## Overview

NodeMCU MCP provides a management solution for ESP8266/NodeMCU IoT devices with these key capabilities:
- Monitor device status and telemetry
- Send commands to devices remotely
- Update device configurations
- Integration with AI assistants through MCP protocol

## Visualizations

<p align="center">
  <img src="assets/architecture-diagram.svg" alt="NodeMCU MCP Architecture" width="600" />
  <br><em>System Architecture Overview</em>
</p>

<p align="center">
  <img src="assets/dataflow-diagram.svg" alt="NodeMCU MCP Data Flow" width="600" />
  <br><em>Data Flow Between Components</em>
</p>

<p align="center">
  <img src="assets/mcp-workflow.svg" alt="Claude + NodeMCU MCP Workflow" width="600" />
  <br><em>How Claude Desktop Interacts with NodeMCU Devices</em>
</p>

## Features

- 🔌 **Device Management**: Register, monitor, and control NodeMCU devices
- 📊 **Real-time Communication**: WebSocket interface for real-time updates
- ⚙️ **Configuration Management**: Update device settings remotely
- 🔄 **Command Execution**: Send restart, update, status commands remotely
- 📡 **Telemetry Collection**: Gather sensor data and device metrics
- 🔐 **Authentication**: Secure API access with JWT authentication
- 🧠 **AI Integration**: Work with Claude Desktop and other MCP-compatible AI tools

## Quick Start

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- For the NodeMCU client: Arduino IDE with ESP8266 support

### Installation

#### Installing via Smithery

To install NodeMCU Manager for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@amanasmuei/nodemcu-mcp):

```bash
npx -y @smithery/cli install @amanasmuei/nodemcu-mcp --client claude
```

#### From npm (once published)

```bash
# Global installation (recommended for MCP integration)
npm install -g nodemcu-mcp

# Local installation
npm install nodemcu-mcp
```

#### From source

```bash
# Clone the repository
git clone https://github.com/amanasmuei/nodemcu-mcp.git
cd nodemcu-mcp

# Install dependencies
npm install

# Optional: Install globally for MCP integration
npm install -g .
```

### Configuration

1. Create a `.env` file based on the example:
   ```
   cp .env.example .env
   ```

2. Update the `.env` file with your settings:
   ```
   # Server Configuration
   PORT=3000
   HOST=localhost

   # Security
   JWT_SECRET=your_strong_random_secret_key

   # Log Level (error, warn, info, debug)
   LOG_LEVEL=info
   ```

## Usage

### Running as API Server

Development mode with auto-restart:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

### Running as MCP Server

For integration with Claude Desktop or other MCP clients:
```bash
npm run mcp
```

If installed globally:
```bash
nodemcu-mcp --mode=mcp
```

### Command Line Options

```
Usage: nodemcu-mcp [options]

Options:
  -m, --mode   Run mode (mcp, api, both)  [string] [default: "both"]
  -p, --port   Port for API server        [number] [default: 3000]
  -h, --help   Show help                  [boolean]
  --version    Show version number        [boolean]
```

## MCP Integration

This project now uses the official Model Context Protocol (MCP) TypeScript SDK to provide integration with Claude for Desktop and other MCP clients.

### MCP Tools

The following tools are available through the MCP interface:

- **list-devices**: List all registered NodeMCU devices and their status
- **get-device**: Get detailed information about a specific NodeMCU device
- **send-command**: Send a command to a NodeMCU device
- **update-config**: Update the configuration of a NodeMCU device

### Using with Claude for Desktop

To use this server with Claude for Desktop:

1. Install Claude for Desktop from [https://claude.ai/desktop](https://claude.ai/desktop)
2. Configure Claude for Desktop by editing `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "nodemcu": {
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/TO/YOUR/PROJECT/mcp_server_sdk.js"
      ]
    }
  }
}
```

3. Restart Claude for Desktop
4. You should now see the NodeMCU tools in the Claude for Desktop interface

### Running the MCP Server Standalone

To run the MCP server directly:

```bash
npm run mcp
```

Or using the CLI:

```bash
./bin/cli.js --mode=mcp
```

## API Documentation

### Authentication

- **POST /api/auth/login** - Login and get JWT token
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```
  
  Response:
  ```json
  {
    "message": "Login successful",
    "token": "your.jwt.token",
    "user": {
      "id": 1,
      "username": "admin",
      "role": "admin"
    }
  }
  ```

- **POST /api/auth/validate** - Validate JWT token
  ```json
  {
    "token": "your.jwt.token"
  }
  ```

### Devices API

All device endpoints require authentication with a JWT token:
```
Authorization: Bearer your.jwt.token
```

#### List Devices

```
GET /api/devices
```

Response:
```json
{
  "count": 1,
  "devices": [
    {
      "id": "nodemcu-001",
      "name": "Living Room Sensor",
      "type": "ESP8266",
      "status": "online",
      "ip": "192.168.1.100",
      "firmware": "1.0.0",
      "lastSeen": "2023-05-15T14:30:45.123Z"
    }
  ]
}
```

#### Get Device Details

```
GET /api/devices/:id
```

Response:
```json
{
  "id": "nodemcu-001",
  "name": "Living Room Sensor",
  "type": "ESP8266",
  "status": "online",
  "ip": "192.168.1.100",
  "firmware": "1.0.0",
  "lastSeen": "2023-05-15T14:30:45.123Z",
  "config": {
    "reportInterval": 30,
    "debugMode": false,
    "ledEnabled": true
  },
  "lastTelemetry": {
    "temperature": 23.5,
    "humidity": 48.2,
    "uptime": 3600,
    "heap": 35280,
    "rssi": -68
  }
}
```

#### Send Command to Device

```
POST /api/devices/:id/command
```

Request:
```json
{
  "command": "restart",
  "params": {}
}
```

Response:
```json
{
  "message": "Command sent to device",
  "command": "restart",
  "params": {},
  "response": {
    "success": true,
    "message": "Device restarting"
  }
}
```

## WebSocket Protocol

The WebSocket server is available at the root path: `ws://your-server:3000/`

For details on the WebSocket protocol messages, refer to the code or the examples directory.

## NodeMCU Client Setup

Refer to the Arduino sketch in the `examples` directory for a complete client implementation.

### Key Steps

1. Install required libraries in Arduino IDE:
   - ESP8266WiFi
   - WebSocketsClient
   - ArduinoJson

2. Configure the sketch with your WiFi and server settings:
   ```cpp
   // WiFi credentials
   const char* ssid = "YOUR_WIFI_SSID";
   const char* password = "YOUR_WIFI_PASSWORD";

   // MCP Server settings
   const char* mcpHost = "your-server-ip";
   const int mcpPort = 3000;
   ```

3. Upload the sketch to your NodeMCU device

## Development

### Project Structure

```
nodemcu-mcp/
├── assets/             # Logo and other static assets
├── bin/                # CLI scripts
├── examples/           # Example client code
├── middleware/         # Express middleware
├── routes/             # API routes
├── services/           # Business logic
├── .env.example        # Environment variables example
├── index.js            # API server entry point
├── mcp_server.js       # MCP protocol implementation
├── mcp-manifest.json   # MCP manifest
└── package.json        # Project configuration
```

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

MIT License is a permissive license that allows you to:
- Use the software commercially
- Modify the software
- Distribute the software
- Use and modify the software privately

The only requirement is that the license and copyright notice must be included with the software.

## Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io) for the integration specification
- [NodeMCU](https://nodemcu.com) for the amazing IoT platform
- [Anthropic](https://anthropic.com) for Claude Desktop 