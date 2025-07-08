# MCP Web Tools Server

A Model Context Protocol (MCP) server that provides tools for web-related operations. This server allows LLMs to interact with web content through standardized tools.

## Current Tools

- **web_scrape**: Converts a URL to use r.jina.ai as a prefix and returns the markdown content

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd MCP
   ```

2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

   Alternatively, you can use [uv](https://github.com/astral-sh/uv) for faster installation:
   ```bash
   uv pip install -r requirements.txt
   ```

## Running the Server and UI

This repository includes convenient scripts to run either the MCP server or the Streamlit UI.

### Using the Run Scripts

On macOS/Linux:
```bash
# Run the server with stdio transport (default)
./run.sh server

# Run the server with SSE transport
./run.sh server --transport sse --host localhost --port 5000

# Run the Streamlit UI
./run.sh ui
```

On Windows:
```cmd
# Run the server with stdio transport (default)
run.bat server

# Run the server with SSE transport
run.bat server --transport sse --host localhost --port 5000

# Run the Streamlit UI
run.bat ui
```

### Running Manually

Alternatively, you can run the server directly:

#### Using stdio (default)

```bash
python server.py
```

#### Using SSE

```bash
python server.py --transport sse --host localhost --port 5000
```

This will start an HTTP server on `localhost:5000` that accepts MCP connections.

And to run the Streamlit UI manually:

```bash
streamlit run streamlit_app.py
```

## Testing with MCP Inspector

The MCP Inspector is a tool for testing and debugging MCP servers. You can use it to interact with your server:

1. Install the MCP Inspector:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Run the Inspector with your server:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. Use the Inspector interface to test the `web_scrape` tool by providing a URL like `example.com` and viewing the returned markdown content.

## Integrating with Claude for Desktop

To use this server with Claude for Desktop:

1. Make sure you have [Claude for Desktop](https://claude.ai/download) installed.

2. Open the Claude for Desktop configuration file:
   - Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`

3. Add the following configuration (adjust the path as needed):

```json
{
  "mcpServers": {
    "web-tools": {
      "command": "python",
      "args": [
        "/absolute/path/to/MCP/server.py"
      ]
    }
  }
}
```

4. Restart Claude for Desktop.

5. You should now see the web_scrape tool available in Claude's interface. You can ask Claude to fetch content from a website, and it will use the tool.

## Example Usage

Once integrated with Claude, you can ask questions like:

- "What's on the homepage of example.com?"
- "Can you fetch and summarize the content from mozilla.org?"
- "Get the content from wikipedia.org/wiki/Model_Context_Protocol and explain it to me."

Claude will use the web_scrape tool to fetch the content and provide it in its response.

## Adding More Tools

To add more tools to this server:

1. Create a new Python file in the `tools/` directory, e.g., `tools/new_tool.py`.

2. Implement your tool function, following a similar pattern to the existing tools.

3. Import your tool in `server.py` and register it with the MCP server:

```python
# Import your new tool
from tools.new_tool import new_tool_function

# Register the tool with the MCP server
@mcp.tool()
async def new_tool(param1: str, param2: int) -> str:
    """
    Description of what your tool does.
    
    Args:
        param1: Description of param1
        param2: Description of param2
        
    Returns:
        Description of return value
    """
    return await new_tool_function(param1, param2)
```

4. Restart the server to apply the changes.

## Streamlit UI

This repository includes a Streamlit application that allows you to connect to and test all your MCP servers configured in Claude for Desktop.

### Running the Streamlit UI

```bash
streamlit run streamlit_app.py
```

This will start the Streamlit server and open a web browser with the UI.

### Features

- Load and parse your Claude for Desktop configuration file
- View all configured MCP servers
- Connect to any server and view its available tools
- Test tools by providing input parameters and viewing results
- See available resources and prompts

### Usage

1. Start the Streamlit app
2. Enter the path to your Claude for Desktop configuration file (default path is pre-filled)
3. Click "Load Servers" to see all available MCP servers
4. Select a server tab and click "Connect" to load its tools
5. Select a tool and provide the required parameters
6. Click "Execute" to run the tool and see the results

## Troubleshooting

- **Missing dependencies**: Make sure all dependencies in `requirements.txt` are installed.
- **Connection issues**: Check that the server is running and the configuration in Claude for Desktop points to the correct path.
- **Tool execution errors**: Look for error messages in the server output.
- **Streamlit UI issues**: Make sure Streamlit is properly installed and the configuration file path is correct.

## License

This project is available under the MIT License. See the LICENSE file for more details.
