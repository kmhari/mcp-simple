# Farcaster MCP Server

[![smithery badge](https://smithery.ai/badge/@manimohans/farcaster-mcp)](https://smithery.ai/server/@manimohans/farcaster-mcp)

An MCP server that provides tools to interact with the Farcaster network ([farcaster.xyz](https://www.farcaster.xyz)), allowing AI models to fetch casts, search channels, and analyze content.

<a href="https://glama.ai/mcp/servers/koo5epnlc7">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/koo5epnlc7/badge" alt="Farcaster Server MCP server" />
</a>

## Features

- **Get User Casts**: Retrieve casts from a specific Farcaster user by FID
- **Get Username Casts**: Retrieve casts from a specific Farcaster user by username
- **Get Channel Casts**: Retrieve casts from a specific Farcaster channel

## Installation

```bash
# Clone the repository
git clone https://github.com/manimohans/farcaster-mcp.git
cd farcaster-mcp

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### Running the server

```bash
npm start
```

### Using with MCP Inspector

```bash
npx @modelcontextprotocol/inspector node ./build/index.js
```

### Using with Claude for Desktop

1. Install [Claude for Desktop](https://claude.ai/download)
2. Open your Claude for Desktop App configuration at:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`

3. Add the following configuration:

```json
{
  "mcpServers": {
    "farcaster": {
      "command": "node",
      "args": ["/absolute/path/to/farcaster-mcp/build/index.js"]
    }
  }
}
```

4. Restart Claude for Desktop

### Using with Smithery

This project includes Smithery configuration files for easy deployment:

```bash
# Install Smithery CLI
npm install -g @smithery/cli

# Deploy to Smithery (specify the client, e.g., claude, cline, windsurf, etc.)
npx @smithery/cli install @manimohans/farcaster-mcp --client claude
```

Available client options: claude, cline, windsurf, roo-cline, witsy, enconvo

### Available Tools

#### get-user-casts

Retrieves casts from a specific Farcaster user by their FID (Farcaster ID).

Parameters:
- `fid`: Farcaster user ID (number)
- `limit` (optional): Maximum number of casts to return (default: 10)

Example query: "Show me the latest casts from FID 6846."

#### get-username-casts

Retrieves casts from a specific Farcaster user by their username.

Parameters:
- `username`: Farcaster username (string)
- `limit` (optional): Maximum number of casts to return (default: 10)

Example query: "Show me the latest casts from username 'mani'."

#### get-channel-casts

Retrieves casts from a specific Farcaster channel.

Parameters:
- `channel`: Channel name or URL (string)
- `limit` (optional): Maximum number of casts to return (default: 10)

Example query: "Show me the latest casts from the 'aichannel' channel."

## Smithery Configuration

This repository includes the necessary configuration files for Smithery:

- `smithery.yaml`: YAML configuration for Smithery deployment
- `smithery.json`: JSON configuration for Smithery capabilities
- `Dockerfile`: Container configuration for Smithery deployment

## API Details

This implementation uses the Farcaster Hubble API to fetch data.

## Development

```bash
# Run in development mode
npm run dev
```

## License

MIT