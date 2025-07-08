# gemini-mcp-server

[![smithery badge](https://smithery.ai/badge/@georgejeffers/gemini-mcp-server)](https://smithery.ai/server/@georgejeffers/gemini-mcp-server)

A TypeScript implementation of a Model Context Protocol (MCP) server that integrates with Google's Gemini Pro model.

<a href="https://glama.ai/mcp/servers/ejwvacw7s0">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/ejwvacw7s0/badge" alt="Gemini Server MCP server" />
</a>

## MCP Tools

### generate_text
*From server: gemini*

## Prerequisites

- Node.js 18 or higher
- Google Gemini API key
- TypeScript
- Claude Desktop app

## Installation

### Installing via Smithery

To install Gemini MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@georgejeffers/gemini-mcp-server):

```bash
npx -y @smithery/cli install @georgejeffers/gemini-mcp-server --client claude
```

### Manual Installation
1. Clone the repository:
```bash
git clone https://github.com/GeorgeJeffers/gemini-mcp-server.git
cd gemini-mcp-server
```

2. Install dependencies:
```bash
npm install
```

4. Build:
```bash
npm run build
```

## Claude Desktop Integration

To use this server with Claude Desktop:

1. Open Claude Desktop
2. Go to Settings > Developer
3. Click "Edit Config"
4. Add the following configuration:

```json
{
  "name": "gemini",
  "command": "node",
  "args": ["dist/gemini_mcp_server.js"],
  "env": {
    "GEMINI_API_KEY": "your_api_key_here"
  },
  "cwd": "/path/to/mcp-gemini-server"
}
```

Replace:
- `/path/to/mcp-gemini-server` with the absolute path to where you cloned this repository
- `your_api_key_here` with your actual Google Gemini API key

The server will now be available in Claude Desktop's MCP server list.

## License

MIT

## Author

GeorgeJeffers
