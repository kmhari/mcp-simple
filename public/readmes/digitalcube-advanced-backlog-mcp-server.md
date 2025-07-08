# Backlog MCP Server

This is a Model Context Protocol (MCP) server for interacting with Backlog, a project management tool. The server provides tools to query and manage Backlog resources like projects, issues, wikis, and user activities.

## Features

- Retrieve Backlog space information
- List and search projects
- Search, view, and manage issues
- Access wiki pages
- View user activities and notifications
- Get user information

## Requirements

- Node.js (v14 or later)
- Backlog account with API key

## Installation

```bash
# Clone the repository
git clone https://github.com/digitalcube/advanced-backlog-mcp-server.git
cd advanced-backlog-mcp-server

# Install dependencies
npm install

# Build the server
npm run build
```

## Configuration

### Claude Desktop Setup

To use the Backlog MCP server with Claude Desktop, edit the following configuration file:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "advanced-backlog-mcp-server": {
      "command": "/path/to/advanced-backlog-mcp-server/build/index.js",
      "env": {
        "BACKLOG_DOMAIN": "your-domain.backlog.com",
        "BACKLOG_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Getting the Command Path

To get the correct path for the `command` field, run the following in the repository directory after building:

```bash
echo "\"$(pwd)/build/index.js\""
```

This will display the path to use in the `command` field.

Example: `"/Users/username/development/mcp-servers/advanced-backlog-mcp-server/build/index.js"`

On macOS, you can copy this directly to your clipboard with:
```bash
echo "\"$(pwd)/build/index.js\"" | pbcopy
```

### API Key Setup

You can get your API key from your Backlog account settings.

## Usage

After configuration, you can use the server with Claude Desktop or any other MCP-compatible client.

In Claude Desktop, you can use natural language queries such as:
- "Show me all my recent issues"
- "List all projects in my Backlog space"
- "Find issues assigned to me with a high priority"

## Available Tools

The server provides the following tools:

- `list_backlog_space` - Get information about your Backlog space
- `list_backlog_projects` - List all projects in your Backlog space
- `list_backlog_recently_viewed_issues` - List recently viewed issues
- `search_backlog_issues` - Search for issues with various filters
- `get_backlog_issue` - Get details of a specific issue
- `list_backlog_recently_viewed_projects` - List recently viewed projects
- `get_backlog_project` - Get details of a specific project
- `list_backlog_recently_viewed_wikis` - List recently viewed wikis
- `get_backlog_wiki` - Get details of a specific wiki
- `list_backlog_recent_user_activities` - List activities of a specific user
- `get_backlog_current_user` - Get information about the current user
- `get_backlog_user` - Get information about a specific user
- `list_backlog_users` - List all users in your Backlog space
- `list_backlog_own_notifications` - List notifications for the current user

## Debugging

For debugging the MCP server, you can use the MCP Inspector:

```bash
npm run inspector
```

This will provide a URL to access debugging tools in your browser.

## Integrating with MCP Clients

This server is designed to work with any MCP-compatible client. Follow the client's documentation to connect it to this server.

## License

MIT
