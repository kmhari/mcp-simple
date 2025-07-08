# Nanoleaf MCP Server

A Model Context Protocol (MCP) server for controlling Nanoleaf smart lights. This server provides tools to control your Nanoleaf devices through Warp terminal or any MCP-compatible client.

<a href="https://glama.ai/mcp/servers/@srnetadmin/nanoleaf-mcp-server">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@srnetadmin/nanoleaf-mcp-server/badge" alt="Nanoleaf Server MCP server" />
</a>

## Features

- 🔍 **Auto-discovery** of Nanoleaf devices on your network
- 🔗 **Direct IP connection** for specific device targeting
- 🔐 **Authorization support** for secure device pairing
- 💡 **Full control** of lights, brightness, colors, and effects
- 🐳 **Dockerized** for easy deployment
- 🖥️ **Warp terminal integration**

## Available Tools

- `get_nanoleaf_info` - Get detailed device information
- `turn_on_nanoleaf` / `turn_off_nanoleaf` - Control power state
- `set_brightness` - Adjust brightness (0-100)
- `set_color` - Set color using hue (0-360) and saturation (0-100)
- `set_effect` - Apply lighting effects
- `get_effects` - List all available effects
- `discover_nanoleaf` - Discover devices on network
- `connect_to_ip` - Connect to specific IP address
- `authorize_nanoleaf` - Authorize with device in pairing mode

## Quick Setup Guide

### Automated Setup (Recommended)

For the easiest setup experience, use the included setup script:

```bash
./setup.sh
```

This script will:
1. Build the Docker image
2. Scan for Nanoleaf devices on your network
3. Help you get the authorization token
4. Create all configuration files
5. Test the setup
6. Generate your Warp configuration

### Manual Setup

### Prerequisites

- Docker installed on your system
- Nanoleaf device(s) on your network
- Warp terminal (optional, for MCP integration)

### Step 1: Clone and Build

```bash
git clone <repository-url>
cd nanoleaf-mcp-server
docker build -t nanoleaf-mcp-server-nanoleaf-mcp-server .
```

### Step 2: Find Your Nanoleaf Device

Option A: Auto-discovery
```bash
docker run --rm -i --network=host nanoleaf-mcp-server echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "discover_nanoleaf", "arguments": {}}}'
```

Option B: Manual IP scan
```bash
# Scan your network for devices responding on Nanoleaf port
nmap -p 16021 192.168.1.0/24
```

Option C: Check router admin panel for connected devices

### Step 3: Get Authorization Token

1. **Put your Nanoleaf device in pairing mode:**
   - Hold the power button on your Nanoleaf device for 5-7 seconds
   - Look for pairing indicator (usually a flashing light)

2. **Get the auth token immediately (within 30 seconds):**
   ```bash
   # Replace 192.168.1.100 with your device's IP
   curl -X POST http://192.168.1.100:16021/api/v1/new
   ```
   
   You should get a response like:
   ```json
   {"auth_token":"YourAuthTokenHere123456789"}
   ```

### Step 4: Configure Environment

Create a `.env` file in the project directory:

```bash
NANOLEAF_IP=192.168.1.100
NANOLEAF_AUTH_TOKEN=YourAuthTokenHere123456789
NANOLEAF_PORT=16021
NANOLEAF_PROTOCOL=http
```

### Step 5: Test Your Setup

```bash
# Test with environment variables
docker run --rm -i --network=host --env-file .env nanoleaf-mcp-server echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "get_nanoleaf_info", "arguments": {}}}'
```

If successful, you'll see detailed information about your Nanoleaf device!

### Step 6: Run Examples (Optional)

Test all functionality with the example script:

```bash
./examples.sh
```

This will demonstrate all available features including turning lights on/off, changing colors, and applying effects.

## Working Example

Here's a complete working example with real values (replace with your own):

1. **Device discovered at**: `<DEVICE_IP>:16021`
2. **Auth token obtained**: `<AUTH_TOKEN>`
3. **Warp configuration**:
```json
{
  "mcpServers": {
    "nanoleaf": {
      "command": "docker",
      "args": [
        "run", "--rm", "-i", "--network=host",
        "-e", "NANOLEAF_IP=<DEVICE_IP>",
        "-e", "NANOLEAF_AUTH_TOKEN=<AUTH_TOKEN>",
        "-e", "NANOLEAF_PORT=16021",
        "-e", "NANOLEAF_PROTOCOL=http",
        "nanoleaf-mcp-server-nanoleaf-mcp-server"
      ],
      "env": {}
    }
  }
}
```
4. **Test command**:
```bash
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "set_effect", "arguments": {"effect": "Cyberpunk 2077"}}}' | docker run --rm -i --network=host -e NANOLEAF_IP=<DEVICE_IP> -e NANOLEAF_AUTH_TOKEN=<AUTH_TOKEN> nanoleaf-mcp-server-nanoleaf-mcp-server
```

## Warp Terminal Integration

### Add to Warp MCP Configuration

Add this to your Warp MCP servers configuration (replace the values with your actual device IP and auth token):

```json
{
  "mcpServers": {
    "nanoleaf": {
      "command": "docker",
      "args": [
        "run", "--rm", "-i", "--network=host",
        "-e", "NANOLEAF_IP=192.168.1.100",
        "-e", "NANOLEAF_AUTH_TOKEN=YourAuthTokenHere123456789",
        "-e", "NANOLEAF_PORT=16021",
        "-e", "NANOLEAF_PROTOCOL=http",
        "nanoleaf-mcp-server-nanoleaf-mcp-server"
      ],
      "env": {}
    }
  }
}
```

**Important:** 
- Replace `192.168.1.100` with your Nanoleaf device's IP address
- Replace `YourAuthTokenHere123456789` with your actual auth token
- Make sure you've built the Docker image with tag `nanoleaf-mcp-server-nanoleaf-mcp-server`

### Alternative Configuration (if path issues occur)

If you encounter path-related issues, you can also use this alternative approach:

```json
{
  "mcpServers": {
    "nanoleaf": {
      "command": "bash",
      "args": ["-c", "cd /path/to/nanoleaf-mcp-server && docker run --rm -i --network=host --env-file .env nanoleaf-mcp-server-nanoleaf-mcp-server"],
      "env": {}
    }
  }
}
```

### Using in Warp

Once configured, you can use the Nanoleaf tools directly in Warp:

- Ask to turn lights on/off
- Change brightness and colors
- Apply cool effects like "Northern Lights" or "Cyberpunk"
- Get device information

## Manual Usage Examples

### Turn lights on/off
```bash
# Turn on
curl -X PUT http://your-ip:16021/api/v1/your-token/state \
  -H "Content-Type: application/json" \
  -d '{"on":{"value":true}}'

# Turn off  
curl -X PUT http://your-ip:16021/api/v1/your-token/state \
  -H "Content-Type: application/json" \
  -d '{"on":{"value":false}}'
```

### Set brightness
```bash
curl -X PUT http://your-ip:16021/api/v1/your-token/state \
  -H "Content-Type: application/json" \
  -d '{"brightness":{"value":50}}'
```

### Apply an effect
```bash
curl -X PUT http://your-ip:16021/api/v1/your-token/effects \
  -H "Content-Type: application/json" \
  -d '{"select":"Northern Lights"}'
```

## Troubleshooting

### Device Not Found
- Ensure device is on the same network
- Check firewall settings
- Try manual IP scanning: `nmap -p 16021 192.168.1.0/24`

### Authorization Failed
- Device must be in pairing mode (hold power button 5-7 seconds)
- Pairing mode only lasts ~30 seconds
- Make sure no other devices are already controlling it

### Connection Issues
- Verify IP address is correct
- Check if device uses HTTPS (some newer models)
- Ensure Docker has network access (`--network=host`)

### Environment Variables Not Working
- Check `.env` file exists and has correct values
- Verify Docker command includes `--env-file .env`
- Make sure file paths are absolute in Warp config

### Warp Terminal Issues

#### "The system cannot find the path specified" error
- Use the direct environment variable configuration instead of `--env-file`
- Make sure your Docker image tag matches exactly: `nanoleaf-mcp-server-nanoleaf-mcp-server`
- Try the alternative bash configuration if path issues persist

#### MCP server not responding in Warp
- Verify the Docker image is built with the correct tag
- Check that your IP address and auth token are correct in the configuration
- Test the Docker command manually first:
  ```bash
  echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "get_nanoleaf_info", "arguments": {}}}' | docker run --rm -i --network=host -e NANOLEAF_IP=your-ip -e NANOLEAF_AUTH_TOKEN=your-token nanoleaf-mcp-server-nanoleaf-mcp-server
  ```

#### "MCP server exited" in logs
- This usually indicates a configuration issue
- Check that all environment variables are properly set
- Ensure the Docker image exists: `docker images | grep nanoleaf`

## Device Compatibility

Tested with:
- Nanoleaf Canvas
- Nanoleaf Light Panels
- Nanoleaf Hexagons

Should work with most Nanoleaf devices that support the v1 API.

## Contributing

Feel free to submit issues, feature requests, or pull requests!

## License

MIT License - see LICENSE file for details.