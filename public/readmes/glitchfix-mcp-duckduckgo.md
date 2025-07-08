# DuckDuckGo MCP Server

A Model Context Protocol server that provides web search and content fetching capabilities using DuckDuckGo. This server enables LLMs to search the web and retrieve content from web pages without requiring any API keys.

### Available Tools

- `search` - Searches the web using DuckDuckGo and returns a list of results.
    - `query` (string, required): The search query
    - `max_results` (integer, optional): Maximum number of results to return (default: 5)

- `fetch` - Fetches a URL from the internet and extracts its contents.
    - `url` (string, required): URL to fetch

## Installation

### Using Docker

```bash
# Build the Docker image
docker build -t mcp/duckduckgo .

# Run the container with stdio
docker run -i --rm mcp/duckduckgo
```

### Using pip

```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-duckduckgo.git
cd mcp-duckduckgo

# Install dependencies
pip install -r requirements.txt

# Make the script executable
chmod +x app.py

# Run the server
python app.py
```

### Using fastmcp

If you have `fastmcp` installed, you can install the server directly:

```bash
# Install the server
fastmcp install /path/to/mcp-duckduckgo/app.py
```

## Configuration

### Configure for Claude Desktop

Add to your Claude settings:

<details>
<summary>Using fastmcp installation</summary>

```json
"mcpServers": {
  "duckduckgo": {
    "command": "python",
    "args": ["/path/to/mcp-duckduckgo/app.py"]
  }
}
```
</details>

<details>
<summary>Using Docker</summary>

```json
"mcpServers": {
  "duckduckgo": {
    "command": "docker",
    "args": ["run", "-i", "--rm", "mcp/duckduckgo"]
  }
}
```
</details>

### Configure for Claude.ai

If you're using Claude.ai in the browser, you can configure the MCP server in your Claude settings:

1. Go to Claude.ai and click on your profile picture
2. Select "Settings"
3. Navigate to the "MCP Servers" section
4. Add a new server with the appropriate configuration

## Usage Examples

### In Claude Desktop/Claude.ai

Once installed, you can use the DuckDuckGo MCP server in your conversations with Claude:

- **Search the web:**
  ```
  Use DuckDuckGo to search for "latest AI research papers 2025"
  ```

- **Fetch content from a URL:**
  ```
  Use DuckDuckGo to fetch the content from https://example.com
  ```

- **Combined usage:**
  ```
  Search DuckDuckGo for "climate change reports 2025", then fetch and summarize the content from the first result
  ```

### Using MCP Client Libraries

#### Python

```python
from mcp.client import Client
import subprocess
import json

# Start the MCP server as a subprocess
server_process = subprocess.Popen(
    ["python", "app.py"],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True,
    bufsize=1
)

# Create an MCP client that communicates with the server via stdio
client = Client(transport="stdio", stdio_process=server_process)

# Initialize the connection
client.initialize()

# List available tools
tools = client.tools_list().tools
print(f"Available tools: {[tool.name for tool in tools]}")

# Execute the search tool
search_results = client.tools_execute(
    name="search",
    params={"query": "python programming language", "max_results": 3}
).result

print(f"Search results: {json.dumps(search_results, indent=2)}")

# Execute the fetch tool
fetch_result = client.tools_execute(
    name="fetch",
    params={"url": "https://example.com"}
).result

print(f"Fetched content length: {len(fetch_result['content'])}")

# Clean up
client.shutdown()
server_process.terminate()
```

#### JavaScript/TypeScript

```typescript
import { spawn } from 'child_process';
import { MCPClient } from '@mcp/client';

async function main() {
  // Start the MCP server as a child process
  const serverProcess = spawn('python', ['app.py'], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  // Create an MCP client that communicates with the server via stdio
  const client = new MCPClient({
    transport: 'stdio',
    process: serverProcess
  });

  try {
    // Initialize the connection
    await client.initialize();

    // List available tools
    const { tools } = await client.toolsList();
    console.log(`Available tools: ${tools.map(tool => tool.name).join(', ')}`);

    // Execute the search tool
    const searchResults = await client.toolsExecute({
      name: 'search',
      params: { query: 'python programming language', max_results: 3 }
    });
    console.log('Search results:', searchResults.result);

    // Execute the fetch tool
    const fetchResult = await client.toolsExecute({
      name: 'fetch',
      params: { url: 'https://example.com' }
    });
    console.log(`Fetched content length: ${fetchResult.result.content.length}`);

    // Clean up
    await client.shutdown();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    serverProcess.kill();
  }
}

main();
```

## Debugging

You can use the MCP inspector to debug the server:

```bash
# Using fastmcp
fastmcp dev app.py

# Using the MCP Inspector directly
npx @modelcontextprotocol/inspector python app.py
```

## Contributing

We encourage contributions to help expand and improve the DuckDuckGo MCP server. Whether you want to add new tools, enhance existing functionality, or improve documentation, your input is valuable.

Pull requests are welcome! Feel free to contribute new ideas, bug fixes, or enhancements to make this MCP server even more powerful and useful.

## License

This project is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License.
