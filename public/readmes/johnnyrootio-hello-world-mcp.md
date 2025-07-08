# Hello World MCP Server

A simple FastMCP-based server implementing a Hello World example with tools, resources, and prompts.

## Overview

This is a minimal but fully representative MCP (Machine Conversation Protocol) server built using the `fastmcp` framework in Python. It serves as a demonstration of core MCP concepts and functionality.

The server includes:

- **Tools**: Functions that can be called by agents
  - `say_hello`: Greets a user by name and logs the interaction
  - `get_greeting_log`: Returns a list of previously greeted names
  - `clear_log`: Clears the greeting history
  
- **Resources**: Shared state components
  - `greetings://log`: Resource URI that provides access to the greeting log

- **Prompts**: Natural language instructions for agents
  - `greet_user`: Template for creating a prompt to greet someone

## Uvicorn Integration

This project showcases a production-ready setup using Uvicorn as the ASGI server. Uvicorn offers several advantages:

- **Performance**: Uvicorn is built on uvloop (an asyncio event loop) and httptools for high performance
- **Concurrency**: Better handling of concurrent requests
- **Production-ready**: Suitable for production deployments with features like TLS support and process management
- **Scaling**: Can be placed behind a reverse proxy like Nginx for horizontal scaling

The integration works by:
1. Creating an ASGI application from FastMCP using `mcp.sse_app()` 
2. Exposing this application to Uvicorn at `main:app`
3. Running Uvicorn programmatically with appropriate settings

## Setup

1. **Create and activate a virtual environment**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the server**
   ```bash
   ./setup_and_run.sh
   ```

   The server will start on port 4242 with the MCP endpoint available at `/sse`.

### Running Options

The setup script supports several options:

```bash
./setup_and_run.sh [options]
```

Available options:
- `--no-uvicorn`: Use the built-in FastMCP transport instead of Uvicorn
- `--foreground`: Run the server in the foreground (useful for debugging)
- `--port=PORT`: Specify a custom port (default: 4242)
- `--host=HOST`: Specify a custom host (default: 0.0.0.0)
- `--help`: Show all available options

Examples:
```bash
# Run in foreground mode for debugging
./setup_and_run.sh --foreground

# Run on a different port
./setup_and_run.sh --port=8000

# Run without Uvicorn (using built-in transport)
./setup_and_run.sh --no-uvicorn
```

### Server Modes

The server can run in two distinct modes:

1. **Uvicorn Mode (Default)**
   ```bash
   ./setup_and_run.sh
   ```
   This mode uses Uvicorn as the ASGI server. You'll see log messages like:
   ```
   INFO:     Started server process [1234]
   INFO:     Uvicorn running on http://0.0.0.0:4242
   ```

2. **Built-in Transport Mode**
   ```bash
   ./setup_and_run.sh --no-uvicorn
   ```
   This mode uses FastMCP's built-in transport. You'll see log messages like:
   ```
   [04/23/25 hh:mm:ss] INFO     Starting server "Hello World MCP Server"...
   ```

## Testing

You can quickly test the server with:

```bash
./test_server.sh
```

This will start the server, run the test client, and then (optionally) shut down the server when testing is complete.

### Using the Test Client

We provide a test client that demonstrates how to interact with the MCP server:

```bash
python test_client.py
```

This will:
1. Test available endpoints
2. Connect to the SSE endpoint
3. List available tools, resources, and prompts
4. Execute each tool to demonstrate functionality

#### Expected Output

When you run the test client, you'll see output similar to this:

```
Testing raw endpoints:
  /: 404
  /tools: 404
  /mcp: 404
  /mcp/tools: 404
  /mcp/message: 404
  /sse: 200 OK
  /api: 404

Created client for server at http://localhost:4242/sse
Client message path: http://localhost:4242/sse

Testing MCP Client...

1. Listing available tools:
  - name='say_hello' description='Greet a person by name.' inputSchema={...}
  - name='get_greeting_log' description='Get a list of all greeted names.' inputSchema={...}
  - name='clear_log' description='Clear the greeting history.' inputSchema={...}

2. Testing say_hello tool:
  Result: [TextContent(type='text', text='{"message": "Hello, Alice!"}', annotations=None)]

3. Testing get_greeting_log tool:
  Result: [TextContent(type='text', text='{"names": ["Alice"]}', annotations=None)]

4. Testing greeting log resource:
  Resource: [TextResourceContents(uri=AnyUrl('greetings://log'), mimeType='text/plain', text='{"greeted_names": ["Alice"]}')]

5. Testing clear_log tool:
  Result: [TextContent(type='text', text='{"status": "cleared"}', annotations=None)]

6. Verifying log is cleared:
  Result: [TextContent(type='text', text='{"names": []}', annotations=None)]

7. Listing available prompts:
  - name='greet_user' description='Create a prompt for greeting someone.' arguments=[...]

8. Testing greet_user prompt:
  Prompt: [PromptMessage(role='user', content=TextContent(type='text', text='\n    Use the `say_hello` tool to greet Bob...')]
```

Key observations:
- Only the `/sse` endpoint returns a 200 status code - this is normal and expected
- Tool results come back as `TextContent` objects with JSON payloads
- Resources are returned as `TextResourceContents` objects with URIs and content
- The greeting log stores and clears names correctly
- The prompt template generates a user message with instructions

The test client source (`test_client.py`) is commented and can be used as a reference for building your own MCP clients.

### Using the Python MCP Client

```python
import asyncio
from fastmcp import Client

async def main():
    async with Client("http://localhost:4242/sse") as client:
        # List available tools
        tools = await client.list_tools()
        print(tools)
        
        # Call a tool
        result = await client.call_tool("say_hello", {"name": "Alice"})
        print(result)

asyncio.run(main())
```

### Using curl

Direct HTTP REST API calls are not supported. FastMCP uses a WebSocket-based protocol for client-server communication through Server-Sent Events (SSE).

## Implementation Details

This server demonstrates:

1. **Decorator-based API**: Using decorators for tools, resources, and prompts
2. **Shared State**: Maintaining state between requests using the GreetingLog
3. **SSE Transport**: Using FastMCP's SSE transport for client communication
4. **Uvicorn Integration**: Running as a production-ready ASGI server with Uvicorn

The server can run in two modes:
- **Uvicorn mode** (default): Uses Uvicorn's ASGI server for better performance and production readiness
- **Built-in mode**: Uses FastMCP's built-in server for simplicity

## Architecture

### Main Components

This project follows a modular architecture:

1. **main.py**: The core server definition with:
   - FastMCP setup and configuration
   - Tool, resource, and prompt definitions
   - ASGI app initialization for Uvicorn
   - Flexible runner that supports both Uvicorn and built-in modes

2. **setup_and_run.sh**: Deployment script with:
   - Environment setup
   - Port conflict detection
   - Configurable runtime options
   - Background/foreground process management

3. **test_client.py**: Client implementation that demonstrates:
   - Endpoint discovery
   - MCP client connection
   - Tool and resource interaction

### Uvicorn Integration Code

The key to the Uvicorn integration is in `main.py`:

```python
# Create the ASGI app for Uvicorn to use
app = mcp.sse_app()

def run_server(use_uvicorn=True, host="0.0.0.0", port=4242):
    """Run the server using either Uvicorn or built-in transport."""
    if use_uvicorn:
        print(f"Starting server with Uvicorn on {host}:{port}")
        uvicorn.run(
            "main:app",
            host=host,
            port=port,
            log_level="info"
        )
    else:
        print(f"Starting server with built-in transport on port {port}")
        mcp.run(transport="sse", host=host, port=port)
```

## Debugging Tips

1. Server logs are saved to `server.log`
2. Run in foreground mode for immediate feedback: `./setup_and_run.sh --foreground`
3. The FastMCP client connects to the `/sse` endpoint, not directly to tool paths
4. Data is exchanged via a message-based protocol, not standard REST
5. You can identify which mode the server is running in by checking the logs:
   - Uvicorn mode: "INFO: Uvicorn running on http://0.0.0.0:PORT"
   - Built-in mode: "INFO: Starting server 'Hello World MCP Server'..."

Here's an updated section that includes both configuration options:

## Claude Desktop Integration

To configure Claude Desktop to use this MCP server, add one of the following configurations to your Claude Desktop configuration file:

- Windows: `%AppData%\Claude\claude_desktop_config.json`
- Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`

### Option 1: Let Claude Desktop start the server

```json
{
  "mcpServers": {
    "hello-world": {
      "command": "python",
      "args": [
        "-m",
        "main",
        "--uvicorn"
      ],
      "env": {},
      "cwd": "/path/to/your/hello-world-mcp-server"
    }
  }
}
```

### Option 2: Connect to an already running server

If you've already started the server manually using `./setup_and_run.sh`:

```json
{
  "mcpServers": {
    "hello-world": {
      "url": "http://localhost:4242/sse"
    }
  }
}
```

After saving the configuration, restart Claude Desktop. You should see the hammer icon indicating MCP server availability. Click it to access the Hello World MCP tools.

## Learn More

For more information about MCP, see:
- [FastMCP Documentation](https://github.com/anthropics/fastmcp)
- [MCP Specification](https://github.com/anthropics/anthropic-tools/blob/main/specs/mcp.md)
- [Uvicorn Documentation](https://www.uvicorn.org/)
- [ASGI Specification](https://asgi.readthedocs.io/en/latest/) 