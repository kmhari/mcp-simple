# Waldur MCP server

Waldur MCP server enables integration between Waldur instance and Claude Desktop by implementing the Model Context Protocol (MCP). This allows Claude to interact with your Waldur instance directly.

## Quickstart

1. Install Claude Desktop for your platform from the [Claude Desktop releases page](https://claude.ai/download)

2. Install Python 3.13 or higher.

3. Install uv package manager.

### Installation

To install the package:

```bash
pip install waldur-mcp-server
```

Or with uv:

```bash
uv pip install waldur-mcp-server
```

### Generate Waldur Token

1. Log in to your Waldur instance
2. Navigate to Username > Credentials > API Token
3. Generate a new token with appropriate token lifetime - you'll need it for configuration

### Claude Desktop MCP Server Configuration

On Windows: `%APPDATA%\Claude\claude_desktop_config.json`

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

<details>
  <summary>Development/Unpublished Servers Configuration</summary>

```json
{
  "mcpServers": {
    "waldur-mcp-server": {
      "command": "uv",
      "args": [
        "--directory",
        "C:\\waldur_service",
        "run",
        "waldur-mcp-server"
      ],
      "env": {
        "WALDUR_API_URL": "https://your-waldur-instance",
        "WALDUR_TOKEN": "your-token"
      }
    }
  }
}
```

</details>

<details>
  <summary>Published Servers Configuration</summary>

```json
{
  "mcpServers": {
    "waldur-mcp-server": {
      "command": "uvx",
      "args": [
        "waldur-mcp-server"
      ],
      "env": {
        "WALDUR_API_URL": "https://your-waldur-instance",
        "WALDUR_TOKEN": "your-token"
      }
    }
  }
}
```

</details>

### Debugging

On macOS, log files are located at `~/Library/Logs/Claude/mcp.log`

If you encounter a `spawn uvx ENOENT` error, verify that your PATH environment variable includes the Python installation directory where `uv` is installed. Alternatively, you can specify the full path to `uvx` in the configuration file, for example:
`~/Library/Frameworks/Python.framework/Versions/3.13/bin/uvx`

Since MCP servers run over stdio, debugging can be challenging. For the best debugging
experience, we strongly recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector).

You can launch the MCP Inspector via [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) with this command:

```bash
npx @modelcontextprotocol/inspector uv --directory C:\\waldur_service run waldur-mcp-server
```

When debugging, you'll need to set the required environment variables. Upon launching, the Inspector will display a URL that you can access in your browser to begin debugging.

### Common issues

- Invalid token: Verify token permissions and expiration
- Connection issues: Check WALDUR_API_URL is accessible
