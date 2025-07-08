# perplexity-mcp MCP server

[![smithery badge](https://smithery.ai/badge/perplexity-mcp)](https://smithery.ai/server/perplexity-mcp)

A Model Context Protocol (MCP) server that provides web search functionality using [Perplexity AI's](https://www.perplexity.ai/) API. Works with the [Anthropic](https://www.anthropic.com/news/model-context-protocol) Claude desktop client.

## Example

Let's you use prompts like, "Search the web to find out what's new at Anthropic in the past week."

## Glama Scores

<a href="https://glama.ai/mcp/servers/ebg0za4hn9"><img width="380" height="200" src="https://glama.ai/mcp/servers/ebg0za4hn9/badge" alt="Perplexity Server MCP server" /></a>

## Components

### Prompts

The server provides a single prompt:

- perplexity_search_web: Search the web using Perplexity AI
  - Required "query" argument for the search query
  - Optional "recency" argument to filter results by time period:
    - 'day': last 24 hours
    - 'week': last 7 days
    - 'month': last 30 days (default)
    - 'year': last 365 days
  - Uses Perplexity's API to perform web searches

### Tools

The server implements one tool:

- perplexity_search_web: Search the web using Perplexity AI
  - Takes "query" as a required string argument
  - Optional "recency" parameter to filter results (day/week/month/year)
  - Returns search results from Perplexity's API

## Installation

### Installing via Smithery

To install Perplexity MCP for Claude Desktop automatically via [Smithery](https://smithery.ai/server/perplexity-mcp):

```bash
npx -y @smithery/cli install perplexity-mcp --client claude
```

### Requires [UV](https://github.com/astral-sh/uv) (Fast Python package and project manager)

If uv isn't installed.

```bash
# Using Homebrew on macOS
brew install uv
```

or

```bash
# On macOS and Linux.
curl -LsSf https://astral.sh/uv/install.sh | sh

# On Windows.
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### Environment Variables

The following environment variable is required in your claude_desktop_config.json. You can obtain an API key from [Perplexity](https://perplexity.ai)

- `PERPLEXITY_API_KEY`: Your Perplexity AI API key

Optional environment variables:

- `PERPLEXITY_MODEL`: The Perplexity model to use (defaults to "sonar" if not specified)

  Available models:

  - `sonar-deep-research`: 128k context - Enhanced research capabilities
  - `sonar-reasoning-pro`: 128k context - Advanced reasoning with professional focus
  - `sonar-reasoning`: 128k context - Enhanced reasoning capabilities
  - `sonar-pro`: 200k context - Professional grade model
  - `sonar`: 128k context - Default model
  - `r1-1776`: 128k context - Alternative architecture

And updated list of models is avaiable (here)[https://docs.perplexity.ai/guides/model-cards]

### Cursor & Claude Desktop Installation

Add this tool as a mcp server by editing the Cursor/Claude config file.

```json
  "perplexity-mcp": {
    "env": {
      "PERPLEXITY_API_KEY": "XXXXXXXXXXXXXXXXXXXX",
      "PERPLEXITY_MODEL": "sonar"
    },
    "command": "uvx",
    "args": [
      "perplexity-mcp"
    ]
  }
```

#### Cursor
- On MacOS: `/Users/your-username/.cursor/mcp.json`
- On Windows: `C:\Users\your-username\.cursor\mcp.json`

If everything is working correctly, you should now be able to call the tool from Cursor.
<img width="800" alt="mcp_screenshot" src="https://github.com/user-attachments/assets/4b59774f-646c-41b3-9886-5cfd4c4ca051" width=600>

#### Claude Desktop
- On MacOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

To verify the server is working. Open the Claude client and use a prompt like "search the web for news about openai in the past week". You should see an alert box open to confirm tool usage. Click "Allow for this chat".

  <img width="600" alt="mcp_screenshot" src="https://github.com/user-attachments/assets/922d8f6a-8c9a-4978-8be6-788e70b4d049" />
