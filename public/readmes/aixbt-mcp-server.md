# AIXBT MCP Server

A Model Context Protocol (MCP) server for AIXBT data API.

## Claude Desktop Integration

Add to your Claude Desktop config using the included `claude-desktop-config.json` file.
```
{
  "mcpServers": {
    "aixbt_mcp": {
      "command": "npx",
      "args": ["@aixbt/mcp-server"],
      "env": {
        "API_KEY": "<api-key>"
      }
    }
  }
}

```

## Tools

This server provides two tools:

### list-top-projects

Lists top projects ordered by score.

Parameters:
- `limit`: Maximum number of projects

## Setup

1. Copy `.env.example` to `.env` and add your AIXBT API key:
   ```
   cp .env.example .env
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the TypeScript code:
   ```
   npm run build
   ```

4. Test with MCP inspector:
   ```
   npm run inspect
   ```
