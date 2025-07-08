# QR Code Generation MCP Server

A QR code generation MCP server implemented using FastMCP, supporting text-to-QR code conversion with base64 encoding output.

<a href="https://glama.ai/mcp/servers/@2niuhe/qrcode_mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@2niuhe/qrcode_mcp/badge" />
</a>

## Features

- Support for any text to QR code conversion (including Chinese characters)
- Customizable colors and styles
- Base64 encoding
- Support for STDIO, HTTP, and SSE transport modes

## Installation

```bash
uv sync
# or
pip install qrcode Pillow mcp
```

## Usage

### 0. Docker Usage

#### Build Image
```bash
docker build -t qrcode-mcp .
```

#### Run Container
```bash
# Default SSE mode
docker run -p 8008:8008 qrcode-mcp

# HTTP mode
docker run -p 8008:8008 -e TRANSPORT_MODE=http qrcode-mcp

# STDIO mode (for testing)
docker run -e TRANSPORT_MODE=stdio qrcode-mcp

# Custom host and port
docker run -p 9000:9000 -e TRANSPORT_MODE=http -e HOST=0.0.0.0 -e PORT=9000 qrcode-mcp
```

#### Environment Variables
- `TRANSPORT_MODE`: Transport mode (`sse`, `http`, `stdio`), default: `sse`
- `HOST`: Host address to bind, default: `0.0.0.0`
- `PORT`: Port to bind, default: `8008`

#### Docker Compose
```yaml
version: '3.8'
services:
  qrcode-mcp:
    build: .
    ports:
      - "8008:8008"
    environment:
      - TRANSPORT_MODE=sse
      - HOST=0.0.0.0
      - PORT=8008
```

### 1. MCP Server Mode

#### Start Server
```bash
# STDIO mode (for Claude Desktop)
python qrcode_mcp_server.py

# HTTP mode
python qrcode_mcp_server.py --http --host 127.0.0.1 --port 8008

# SSE mode (Server-Sent Events) Deprecated
python qrcode_mcp_server.py --sse --host 127.0.0.1 --port 8008
```

#### Configure Claude Desktop
Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

**STDIO Mode (Local Use):**
```json
{
  "mcpServers": {
    "qrcode-mcp": {
      "command": "python",
      "args": ["/ABSOLUTE/PATH/TO/qrcode_mcp/qrcode_mcp_server.py"],
      "cwd": "/ABSOLUTE/PATH/TO/qrcode_mcp"
    }
  }
}
```

**HTTP Mode (Network Deployment):**
```json
{
  "mcpServers": {
    "qrcode-mcp": {
      "transport": "http",
      "url": "http://127.0.0.1:8008/mcp/"
    }
  }
}
```

**SSE Mode (Server-Sent Events):**
```json
{
  "mcpServers": {
    "qrcode-mcp": {
      "serverUrl": "http://127.0.0.1:8008/sse"
    }
  }
}
```

### 2. Direct Python API Usage

```python
from qrcode_utils import text_to_qr_base64

# Basic usage
base64_result = text_to_qr_base64("Hello, World!")

# Custom styling
base64_result = text_to_qr_base64(
    "Custom QR Code",
    box_size=15,
    fill_color="darkblue",
    back_color="lightgray"
)
```

## MCP Tools

### `generate_qr_code`
Generate QR code and return base64 encoding.

**Parameters:**
- `text` (required): Text content to convert
- `box_size` (optional): Pixel size of each box, default 10
- `border` (optional): Number of border boxes, default 4
- `fill_color` (optional): Foreground color, default "black"
- `back_color` (optional): Background color, default "white"
- `return_data_url` (optional): Whether to return Data URL format, default false

## Testing

```bash
python test_mcp_client.py
```

## License

MIT License 