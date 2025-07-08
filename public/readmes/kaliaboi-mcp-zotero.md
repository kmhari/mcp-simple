# MCP Zotero

![NPM Version](https://img.shields.io/npm/v/mcp-zotero) [![smithery badge](https://smithery.ai/badge/mcp-zotero)](https://smithery.ai/server/mcp-zotero)

A Model Context Protocol server for Zotero integration that allows Claude to interact with your Zotero library.

<a href="https://glama.ai/mcp/servers/mjvu0xzzzz"><img width="380" height="200" src="https://glama.ai/mcp/servers/mjvu0xzzzz/badge" alt="Zotero MCP server" /></a>

## Setup

1. Get your Zotero credentials:

   ```bash
   # First, create an API key at https://www.zotero.org/settings/keys
   # Then use it to get your user ID:
   curl -H "Zotero-API-Key: YOUR_API_KEY" https://api.zotero.org/keys/current
   ```

   The response will look like:

   ```json
   {
     "userID": 123456,
     "username": "your_username",
     "access": {
       "user": {
         "library": true,
         "files": true,
         "notes": true,
         "write": true
       }
     }
   }
   ```

   The `userID` value is what you need.

2. Set environment variables:

   ```bash
   export ZOTERO_API_KEY="your-api-key"
   export ZOTERO_USER_ID="user-id-from-curl"
   ```

3. Verify your credentials:

   ```bash
   # Test that your credentials work:
   curl -H "Zotero-API-Key: $ZOTERO_API_KEY" \
        "https://api.zotero.org/users/$ZOTERO_USER_ID/collections"
   ```

   You should see your collections list in the response.

4. Install and run:

   ```bash
   # Install globally (recommended)
   npm install -g mcp-zotero
   mcp-zotero

   # Or run directly with npx
   npx mcp-zotero
   ```

## Integration with Claude Desktop

To use this server with Claude Desktop, add the following to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "zotero": {
      "command": "mcp-zotero",
      "env": {
        "ZOTERO_API_KEY": YOUR_API_KEY,
        "ZOTERO_USER_ID": YOUR_USER_ID
      }
    }
  }
}
```

## Available Tools

- `get_collections`: List all collections in your library
- `get_collection_items`: Get items in a specific collection
- `get_item_details`: Get detailed information about a paper
- `search_library`: Search your entire library
- `get_recent`: Get recently added papers

## Troubleshooting

If you encounter any issues:

1. Verify your environment variables are set:

   ```bash
   echo $ZOTERO_API_KEY
   echo $ZOTERO_USER_ID
   ```

2. Check the installation:

   ```bash
   npm list -g mcp-zotero
   ```

3. Try reinstalling:
   ```bash
   npm uninstall -g mcp-zotero
   npm install -g mcp-zotero
   ```
