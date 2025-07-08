# Stakpak MCP Server

A MCP server that connects to Stakpak API.

## Usage

### Stakpak API Key

Before using the MCP server, you'll need to obtain a Stakpak API key. You can get your API key by:

1. Visiting [Stakpak's website](https://stakpak.dev/)
2. Logging into your account
3. Going to your profile and navigating to the API keys section

For detailed instructions, see the [Stakpak API Key Management documentation](https://stakpak.gitbook.io/docs/api/manage-api-keys).

### Claude Desktop

- To install in a project, add the MCP server to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "stakpak": {
      "command": "npx",
      "args": ["@stakpak/mcp@latest", "--output=resource"],
      "env": {
        "STAKPAK_API_KEY": "<your-stakpak-api-key>"
      }
    }
  }
}
```

### Cursor

- To install in a project, add the MCP server to your `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "stakpak": {
      "command": "npx",
      "args": ["@stakpak/mcp@latest STAKPAK_API_KEY=<YOUR_API_KEY>"]
    }
  }
}
```

- To install globally, add this command to your Cursor settings:

```bash
npx @stakpak/mcp STAKPAK_API_KEY=<your-stakpak-api-key>
```

### Windsurf

- Add the MCP server to your `~/.codeium/windsurf/mcp_config.json` file:

```json
{
  "mcpServers": {
    "stakpak": {
      "command": "npx",
      "args": ["@stakpak/mcp@latest"],
      "env": {
        "STAKPAK_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

## Tools

This MCP server provides the following tools for interacting with the Vercel API:

### Generation

- `generate_infrastructure_code` - Generate infrastructure code for a project

### Development

To set up the development environment:

1. Clone the repository:

```bash
git clone https://github.com/stakpak/mcp.git
cd mcp
```

2. Install dependencies:

```bash
bun install
```

3. Build the project:

```bash
bun build
```

4. Install the MCP server globally:

```bash
 npx @modelcontextprotocol/inspector node  <path-to-your-build-file> -e STAKPAK_API_KEY=<your-stakpak-api-key>
```

5. Add the MCP server to your project:

### IDE Integration

The MCP server can be integrated with various IDEs:

#### Cursor

Add the MCP server to your `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "stakpak": {
      "command": "node",
      "args": [
        "<path-to-your-build-file> STAKPAK_API_KEY=<your-stakpak-api-key>"
      ]
    }
  }
}
```
