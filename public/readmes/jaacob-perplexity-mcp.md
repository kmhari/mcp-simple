# Perplexity MCP Server

[![smithery badge](https://smithery.ai/badge/@jaacob/perplexity-mcp)](https://smithery.ai/server/@jaacob/perplexity-mcp)

An MCP server that provides web search capabilities using Perplexity's API.

<a href="https://glama.ai/mcp/servers/97nsl3drhq"><img width="380" height="200" src="https://glama.ai/mcp/servers/97nsl3drhq/badge" alt="Perplexity Server MCP server" /></a>

## Prerequisites

- Node.js (v14 or higher)
- A Perplexity API key (get one at <https://www.perplexity.ai/settings/api>)
- Claude Desktop App

## Installation

### Installing via Smithery

To install Perplexity Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@jaacob/perplexity-mcp):

```bash
npx -y @smithery/cli install @jaacob/perplexity-mcp --client claude
```

### Manual Installation
1. Clone this repository:

    ```bash
    git clone https://github.com/jaacob/perplexity-mcp
    cd perplexity-mcp
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Build the server:

    ```bash
    npm run build
    ```

## Configuration

1. Get your Perplexity API key from <https://www.perplexity.ai/settings/api>

2. Add the server to Claude's config file at `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "perplexity-server": {
      "command": "node",
      "args": [
        "/absolute/path/to/perplexity-mcp/build/index.js"
      ],
      "env": {
        "PERPLEXITY_API_KEY": "your-api-key-here",
        "PERPLEXITY_MODEL": "sonar"
      }
    }
  }
}
```

Replace `/absolute/path/to` with the actual path to where you cloned the repository.

### Available Models

You can specify which model to use by setting the `PERPLEXITY_MODEL` environment variable. Available options:

- `sonar-reasoning-pro` - Most capable model with enhanced reasoning
- `sonar-reasoning` - Enhanced reasoning capabilities
- `sonar-pro` - Faster response times
- `sonar` - Default model (used if no model is specified)

For up-to-date model pricing and availability, visit: <https://docs.perplexity.ai/guides/pricing>

## Usage

After configuring the server and restarting Claude, you can simply ask Claude to search for information. For example:

- "What's the latest news about SpaceX?"
- "Search for the best restaurants in Chicago"
- "Find information about the history of jazz music"

Claude will automatically use the Perplexity search tool to find and return relevant information.

If for whatever reason it decides not to, you can force the issue by prepending your prompt with "Search the web".

## Development

To modify the server:

1. Edit `src/index.ts`
2. Rebuild with `npm run build`
3. Restart Claude to load the changes

## License

MIT
