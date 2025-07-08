# Dub.co MCP Server

[![smithery badge](https://smithery.ai/badge/@Gitmaxd/dubco-mcp-server)](https://smithery.ai/server/@Gitmaxd/dubco-mcp-server)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-brightgreen.svg)](https://github.com/modelcontextprotocol)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)


An MCP server for interacting with the [Dub.co](https://dub.co) link shortener API. This server allows AI agents to create, update, and manage short links through your Dub.co account.

<a href="https://glama.ai/mcp/servers/p293dlsvcn">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/p293dlsvcn/badge" alt="Dub.co Server MCP server" />
</a>

## Features

- Create short links with custom slugs
- Update existing short links
- Upsert links (create or update)
- Delete links
- Automatic domain selection

## Installation

### Installing via Smithery

To install Dub.co Link Shortener Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@Gitmaxd/dubco-mcp-server):

```bash
npx -y @smithery/cli install @Gitmaxd/dubco-mcp-server --client claude
```

### Prerequisites

- Node.js 18 or higher
- A Dub.co account with API access
- An API key from Dub.co

### Option 1: Install via NPM (Recommended)

```bash
npm install -g dubco-mcp-server
```

Then add the following to your MCP configuration:

```json
{
  "mcpServers": {
    "dubco-server": {
      "command": "dubco-mcp-server",
      "env": {
        "DUBCO_API_KEY": "your_api_key_here"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### Option 2: Clone and Build

```bash
# Clone the repository
git clone https://github.com/Gitmaxd/dubco-mcp-server.git
cd dubco-mcp-server

# Install dependencies
npm install

# Build the project
npm run build
```

Then add the following to your MCP configuration:

```json
{
  "mcpServers": {
    "dubco-server": {
      "command": "node",
      "args": ["/path/to/dubco-mcp-server/build/index.js"],
      "env": {
        "DUBCO_API_KEY": "your_api_key_here"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## Getting a Dub.co API Key

1. Log in to your [Dub.co](https://dub.co) account
2. Go to your workspace settings
3. Navigate to the "API" section
4. Generate a new API key

## Usage

Once installed and configured, the MCP server provides the following tools to AI agents:

### create_link

Create a new short link on dub.co.

```json
{
  "url": "https://example.com",
  "key": "example",  // optional
  "domain": "your-domain.com",  // optional
  "externalId": "123"  // optional
}
```

### update_link

Update an existing short link on dub.co.

```json
{
  "linkId": "link_id_here",
  "url": "https://new-example.com",  // optional
  "domain": "new-domain.com",  // optional
  "key": "new-slug"  // optional
}
```

### upsert_link

Create or update a short link on dub.co.

```json
{
  "url": "https://example.com",
  "key": "example",  // optional
  "domain": "your-domain.com",  // optional
  "externalId": "123"  // optional
}
```

### delete_link

Delete a short link on dub.co.

```json
{
  "linkId": "link_id_here"
}
```

## License

MIT