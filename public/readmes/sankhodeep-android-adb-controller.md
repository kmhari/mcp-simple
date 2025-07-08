# Android ADB Controller MCP Server

## Overview
This MCP server enables AI agents to control Android devices via ADB commands. It provides tools for:
- Listing connected devices
- Executing screen taps
- (Extensible for more ADB commands)

## Setup Guide

### Prerequisites
1. Android device with USB debugging enabled
2. ADB installed and working (`adb devices` should show your device)
3. Node.js v16+

### Installation Steps

1. **Create MCP Server**:
```bash
npx @modelcontextprotocol/create-server android-adb-controller
cd android-adb-controller
```

2. **Install Dependencies**:
```bash
npm install adbkit @types/adbkit
```

3. **Configure MCP Settings**:
Add to `mcp_settings.json`:
```json
{
  "mcpServers": {
    "android-adb": {
      "command": "node",
      "args": ["android-adb-controller/build/index.js"]
    }
  }
}
```

## Implementation Details

### Key Components
1. **ADB Client Initialization**:
```typescript
this.adbClient = adb.createClient();
```

2. **Command Execution**:
```typescript
private async executeADBCommand(deviceId: string, command: string) {
  const device = this.adbClient.getDevice(deviceId);
  return await device.shell(command);
}
```

3. **Tool Definitions**:
- `list_devices`: Lists connected Android devices
- `tap_screen`: Executes screen taps at specified coordinates

## Troubleshooting Guide

### Common Issues & Solutions

1. **ADB Command Not Found**:
- Ensure ADB is installed and in system PATH
- Verify platform-tools are extracted correctly

2. **Device Not Detected**:
- Check USB debugging is enabled
- Verify USB cable connection
- Run `adb devices` to confirm detection

3. **TypeScript Errors**:
Solution: Added proper type definitions in `adbkit.d.ts`:
```typescript
declare module 'adbkit' {
  interface Device {
    id: string;
    type: string;
  }
  // ... other type definitions
}
```

4. **MCP Server Connection Issues**:
- Verify server is running (`node build/index.js`)
- Check MCP settings configuration

## Extending Functionality

To add new commands:

1. Define new tool in `ListToolsRequestSchema`
2. Implement handler in `CallToolRequestSchema`
3. Add corresponding ADB command execution

Example for text input:
```typescript
{
  name: "input_text",
  description: "Input text on device",
  inputSchema: {
    type: "object",
    properties: {
      deviceId: { type: "string" },
      text: { type: "string" }
    }
  }
}
```

## Development Workflow

1. Make code changes
2. Rebuild:
```bash
npm run build
```
3. Restart server:
```bash
node build/index.js
```

## Architecture
```
MCP Server (Node.js) ↔ ADB Interface ↔ Android Device
                ↑
                |
          AI Control System
```

## Future Improvements
- Add swipe gestures
- Implement screenshot capability
- Add device monitoring
- Support multiple simultaneous devices
