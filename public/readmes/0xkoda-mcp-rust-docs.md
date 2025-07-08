# MCP Rust Documentation Server

This is a Model Context Protocol (MCP) server that fetches and returns documentation for Rust crates providing essential context for LLM's when working with Rust code.

## Features

- Fetches documentation for any Rust crate available on docs.rs
- Strips HTML and formats the content for readability
- Limits response size to prevent overwhelming the client
- Uses the latest MCP SDK (v1.6.1)

## Installation

```bash
# Clone the repository
git https://github.com/0xKoda/mcp-rust-docs.git
cd mcp-rust-docs

# Install dependencies
npm install
```

### Prerequisites

- Node.js 
- npm 

## Usage

```bash
# Start the server directly
npm start
```

## Integrating with AI Assistants

### Claude Desktop

Add the following to your Claude Desktop configuration file (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "rust-docs": {
      "command": "node",
      "args": ["/absolute/path/to/index.js"]
    }
  }
}
```

Replace `/absolute/path/to/index.js` with the absolute path to the index.js file in this repository.

## Example Usage

Once the server is running and configured with your AI assistant, you can ask questions like:

- "Look up the documentation for the 'tokio' crate"
- "What features does the 'serde' crate provide?"
- "Show me the documentation for 'ratatui'"
- "Can you explain the main modules in the 'axum' crate?"

The AI will use the `lookup_crate_docs` tool to fetch and display the relevant documentation.

## Testing with MCP Inspector

You can test this server using the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Then select the "Connect to a local server" option and follow the prompts.

## How It Works

This server implements a single MCP tool called `lookup_crate_docs` that:

1. Takes a Rust crate name as input (optional, defaults to 'tokio' if not provided)
2. Fetches the documentation from docs.rs
3. Converts the HTML to plain text using the html-to-text library
4. Truncates the content if it exceeds 8000 characters
5. Returns the formatted documentation in the proper MCP response format

## SDK Implementation Notes

This server uses the MCP SDK with carefully structured import paths. If you're modifying the code, be aware that:

1. The SDK requires importing from specific paths (e.g., `@modelcontextprotocol/sdk/server/mcp.js`)
2. We use the high-level McpServer API rather than the low-level tools
3. The tool definition uses Zod for parameter validation
4. Console output is redirected to stderr to avoid breaking the MCP protocol
5. The tool returns properly formatted MCP response objects

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT