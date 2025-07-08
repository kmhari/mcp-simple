# MCP File Operations Agent

A simple Model Context Protocol (MCP) implementation providing file system operations through a server-client architecture.

## Components

- **file_agent_server.py**: MCP server exposing file system operations as tools
- **file_agent_client.py**: Client implementation using Google's Gemini API

## Features

- Read file contents
- Write content to files
- List directory contents

## Requirements

- Python ≥3.12
- `mcp[cli]>=1.6.0`
- `google-genai>=1.12.1`
- `python-dotenv`

## Setup

1. Install dependencies: `pip install -e .`
2. Create a `.env` file with your API keys (see `.env-sample`)
3. Run server: `python file_agent_server.py`
4. Run client: `python file_agent_client.py`
5. For SSE example: `python sse_echo.py`

## Implementing MCP Agents

Here's how to set up MCP servers and clients using different transport layers:

### Stdio Transport (Standard Input/Output)

Stdio transport is useful for local inter-process communication, often used when a client application spawns a server process.

**Server (`file_agent_server.py` example):**

```python
# file_agent_server.py
from mcp.server.fastmcp import FastMCP
import os # Example tool dependencies

# 1. Create a FastMCP server instance
file_agent = FastMCP("File Operations Agent")

# 2. Define tools using the @file_agent.tool() decorator
@file_agent.tool()
def read_file(file_path: str) -> str:
    """Read the contents of a file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"Error reading file: {str(e)}"

# Add other tools (write_file, list_directory) similarly...

# 3. Run the server (automatically uses Stdio)
if __name__ == "__main__":
    file_agent.run()
```

**Client (`file_agent_client.py` example):**

```python
# file_agent_client.py
import asyncio
from mcp import ClientSession, StdioServerParameters, types as mcp_types
from mcp.client.stdio import stdio_client

# 1. Define server parameters (how to start the server process)
server_params = StdioServerParameters(
    command="python", # Command to execute
    args=["file_agent_server.py"], # Arguments for the command
)

async def run_client():
    try:
        # 2. Use stdio_client to start the server process and get read/write streams
        async with stdio_client(server_params) as (read, write):
            print("stdio_client connected.")
            # 3. Create a ClientSession with the streams
            # Optionally pass a sampling_callback for agent logic
            async with ClientSession(read, write) as session:
                print("ClientSession created.")
                # 4. Initialize the connection
                await session.initialize()
                print("Session initialized.")

                # 5. List available tools
                list_tools_result = await session.list_tools()
                print("Available tools:", list_tools_result.tools)

                # 6. Call a tool
                call_result = await session.call_tool("read_file", {"file_path": "README.md"})
                if call_result.content and isinstance(call_result.content[0], mcp_types.TextContent):
                    print("Read file result:", call_result.content[0].text[:100] + "...")
                else:
                    print("Error or unexpected result:", call_result)

    except Exception as e:
        print(f"Client error: {e}")

if __name__ == "__main__":
    asyncio.run(run_client())

```

### SSE Transport (Server-Sent Events)

SSE transport uses HTTP for communication, suitable for web-based or network-based interactions.

**Server (`sse_echo.py` example):**

```python
# sse_server_example.py (based on sse_echo.py)
import asyncio
from mcp import FastMCP
from mcp.types import TextContent # Example type import

# Define connection details
HOST = "127.0.0.1"
PORT = 8765
SSE_PATH = "/sse" # The HTTP path for the SSE endpoint

# 1. Instantiate FastMCP with SSE configuration
app = FastMCP(name="SSE Echo Server", host=HOST, port=PORT, sse_path=SSE_PATH)

# 2. Define tools as usual
@app.tool()
async def echo(text: str) -> list[TextContent]:
    """Echoes the input text back."""
    print(f"Server received: {text}")
    return [TextContent(type="text", text=f"Echo: {text}")]

# 3. Run the server asynchronously using run_sse_async
async def run_server():
    print(f"Starting SSE server on http://{HOST}:{PORT}{SSE_PATH}")
    await app.run_sse_async()

if __name__ == "__main__":
    asyncio.run(run_server())

```

**Client (`sse_echo.py` example):**

```python
# sse_client_example.py (based on sse_echo.py)
import asyncio
from mcp import ClientSession
from mcp.client.sse import sse_client # SSE specific client helper
from mcp.types import TextContent, CallToolResult # Example type imports

# Server connection details (must match the server)
HOST = "127.0.0.1"
PORT = 8765
SSE_PATH = "/sse"

async def run_client():
    server_url = f"http://{HOST}:{PORT}{SSE_PATH}"
    print(f"Client connecting to {server_url}")

    try:
        # Allow server time to start (in combined demo scripts)
        await asyncio.sleep(1)

        # 1. Use sse_client helper to connect to the server URL
        async with sse_client(url=server_url) as (read, write):
             print("sse_client connected.")
             # 2. Create ClientSession with the read/write streams
             async with ClientSession(read, write) as session:
                print("ClientSession created.")
                # 3. Initialize the session
                await session.initialize()
                print("Session initialized.")

                # 4. Call a tool
                message = "Hello via SSE!"
                response: CallToolResult = await session.call_tool("echo", {"text": message})

                # Process response
                if response.content and isinstance(response.content[0], TextContent):
                     print(f"Client received: {response.content[0].text}")
                else:
                     print(f"Client received unexpected response: {response}")

    except Exception as e:
        print(f"Client error: {e}")

if __name__ == "__main__":
    asyncio.run(run_client())
```

## Cursor IDE Integration (sample example)

Configure in `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "File Operations Agent": {
      "command": "python",
      "args": ["path/to/file_agent_server.py"],
      "env": {}
    }
  }
}
```