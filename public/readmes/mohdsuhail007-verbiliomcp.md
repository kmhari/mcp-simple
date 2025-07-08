# Verbilio MCP Server

A Model Context Protocol server for managing Verbilio workflows. This server integrates with Supabase to handle data storage and authentication for Verbilio's document processing features.

## Features

- Seamless integration with Supabase backend
- Document processing workflow management
- Secure authentication handling
- Real-time updates via WebSocket

## Installation

```bash
npm install @mohdsuhail007/server-verbilio
```

## Configuration

Add the following configuration to your MCP configuration file:

```json
{
  "mcpServers": {
    "verbilio": {
      "command": "npx",
      "args": ["-y", "@mohdsuhail007/server-verbilio"],
      "env": {
        "SUPABASE_URL": "<SUPABASE_URL>",
        "SUPABASE_KEY": "<SUPABASE_KEY>"
      }
    }
  }
}
```

### Environment Variables

- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_KEY`: Your Supabase project API key

## Usage

1. Ensure your Supabase instance is running and configured
2. Start the MCP server using your preferred MCP client
3. The server will automatically handle incoming workflow requests

## License

MIT
