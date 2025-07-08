# BoardGameGeek MCP Server

This is a Model Context Protocol (MCP) server that integrates with the BoardGameGeek XML API, allowing Claude to search for board games, retrieve game details, get user collections, and more.

## Features

This server provides the following tools:

1. **search-games**: Search for board games by name
2. **get-game-details**: Get detailed information about a specific board game
3. **get-hot-games**: Get the current hottest board games on BoardGameGeek
4. **get-user-collection**: Get a user's board game collection with filtering options
7. **sync-user-collection**: Synchronize a user's collection from BoardGameGeek
5. **get-user-plays**: Get a user's recent board game plays
8. **sync-user-plays**: Synchronize a user's plays from BoardGameGeek
6. **get-similar-games**: Get games similar to a specified game

### Feature Checklist

- [x] Search
- [x] Get Game Details
- [x] Hot Games
- [ ] Get User Plays
- [ ] Sync User Plays
- [ ] Get User Collection
- [ ] Sync User Collection
- [ ] Get Similar Games

## Prerequisites

- Node.js 22.5.0 or higher (required for experimental SQLite support)
- npm (for dependency management)

## Building and Running

### To build the server:

```bash
# Install dependencies
npm install

# Build the TypeScript code
npm run build
```

### To run the server directly:

```bash
# The --experimental-sqlite flag is required
node --experimental-sqlite build/index.js
```

### To run with Docker:

```bash
# Build the Docker image
docker build -t bgg-mcp-server .

# Run the container
docker run --rm -i bgg-mcp-server
```

## Testing

To verify the server is working correctly:

```bash
# Make sure the server is built first
npm run build

# Run the test script with the experimental SQLite flag
node --experimental-sqlite test-mcp.js
```

The test script will:
1. Start the MCP server
2. Test the search-games functionality
3. Test the get-hot-games functionality
4. Display results and any errors

## Using with Claude for Desktop

1. Open your Claude for Desktop configuration file:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the server configuration for direct Node.js execution:

```json
{
  "mcpServers": {
    "boardgamegeek": {
      "command": "node",
      "args": ["--experimental-sqlite", "/path/to/bgg-mcp-server/build/index.js"]
    }
  }
}
```

3. Or use Docker (recommended):

```json
{
  "mcpServers": {
    "boardgamegeek": {
      "command": "bash",
      "args": ["-c", "cd /path/to/bgg-mcp-server && docker build -t bgg-mcp-server . && docker run --rm -i -v \"$(pwd)/data:/app/data\" bgg-mcp-server"]
    }
  }
}
```

Note: the `-v "$(pwd)/data:/app/data"` option mounts the local `data` directory to the `/app/data` directory in the Docker container, ensuring that the SQLite database is persisted outside the container.

4. Restart Claude for Desktop

## Example Questions

Once connected to Claude, you can ask questions like:

- "What are the new hot games on boardgamegeek"
- "Look up the game Molly House on boardgamegeek"


## Data Storage

The server uses SQLite for data persistence. All retrieved game data, user collections, and play history are stored in the `data/bgg.sqlite` database file. This:

- Reduces API calls to BoardGameGeek
- Improves response times for repeated queries
- Maintains data between server restarts

The database is automatically created if it doesn't exist and will be populated as you use the server.
