# MCP Snapshot Server

A Model Context Protocol server for interacting with Snapshot.org. This server provides MCP-compliant tools for querying Snapshot spaces, proposals, and users.

## Installation

```bash
npm install mcp-snapshot-server
```

## Usage with Claude Desktop

In your Claude Desktop config file (located at `~/Library/Application Support/Claude/claude_desktop_config.json` on Mac or `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
    "mcpServers": {
        "snapshot": {
            "command": "node",
            "args": [
                "/ABSOLUTE/PATH/TO/snapshot-server/build/index.js"
            ]
        }
    }
}
```

## Available Tools

### getSpaces
Get a list of Snapshot spaces
- `limit`: Number of spaces to fetch (optional)
- `skip`: Number of spaces to skip (optional)

### getRankedSpaces
Get a ranked list of Snapshot spaces with detailed information
- `first`: Number of spaces to fetch (default: 18)
- `skip`: Number of spaces to skip (default: 0)
- `category`: Category to filter by (default: 'all')
- `search`: Search term to filter spaces (optional)

### getProposals
Get proposals for a specific space
- `spaceId`: ID of the space
- `state`: Filter by proposal state (active, closed, pending, all)
- `limit`: Number of proposals to fetch

### getProposal
Get details of a specific proposal
- `proposalId`: ID of the proposal

### getUser
Get information about a Snapshot user
- `address`: Ethereum address of the user

## Development

1. Clone the repository:
```bash
git clone https://github.com/crazyrabbitLTC/mcp-snapshot-server.git
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## License

MIT © [Dennison Bertram](mailto:dennison@tally.xyz)