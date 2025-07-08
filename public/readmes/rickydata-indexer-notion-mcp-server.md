# Notion Knowledge Base MCP Server

An MCP server that provides access to a Notion knowledge base through the Cline VSCode extension.

## Features

- Query your Notion knowledge base directly from Cline
- Get detailed answers with references to Notion pages
- Built with FastMCP for reliable performance
- Comprehensive error handling and logging

## Prerequisites

- Python 3.10 or higher
- [uv](https://github.com/astral-sh/uv) package manager
- [Cline VSCode extension](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)
- A Dify API key for accessing the Notion knowledge base

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/notion-mcp-server.git
   cd notion-mcp-server
   ```

2. Create a `.env` file with your Dify API key:
   ```bash
   echo "DIFY_API_BACKEND_KEY=your-api-key-here" > .env
   ```

3. Install the server in Cline:
   ```bash
   fastmcp install notion_mcp_server.py
   ```

   This will automatically:
   - Install all required dependencies using uv
   - Configure the server in Cline's settings
   - Make the server available to use with Cline

## Usage

Once installed, you can use the server in Cline by asking questions about your Notion knowledge base. For example:

```
Tell me about internal tooling
```

The server will respond with relevant information from your Notion knowledge base, including:
- Detailed answers
- Links to relevant Notion pages
- Page IDs for reference

## Configuration

The server is configured automatically during installation, but you can manually update the settings in Cline's configuration file if needed:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

Example configuration:
```json
{
  "mcpServers": {
    "notion-kb": {
      "command": "uv",
      "args": [
        "run",
        "--with", "fastmcp",
        "--with", "python-dotenv",
        "--with", "requests",
        "fastmcp",
        "run",
        "/absolute/path/to/notion_mcp_server.py"
      ],
      "env": {
        "DIFY_API_BACKEND_KEY": "your-api-key"
      }
    }
  }
}
```

## Development

For development and testing:

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the development server:
   ```bash
   fastmcp dev notion_mcp_server.py
   ```

This will start the MCP Inspector interface for testing the server.

## Troubleshooting

1. **Server not connecting**
   - Verify your API key in the `.env` file
   - Ensure the server path in Cline's config is absolute
   - Check that uv is installed and in your PATH

2. **Dependencies issues**
   - Try reinstalling with `fastmcp install notion_mcp_server.py --force`
   - Verify uv is installed correctly

3. **Server hangs**
   - Ensure you're using the uv run command as specified in the config
   - Check the server logs for errors

## Contributing

See [mcp_instructions.md](mcp_instructions.md) for detailed information about the server's implementation and architecture.

## License

MIT
