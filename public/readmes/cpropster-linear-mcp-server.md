# Linear MCP Server

This is a Model Context Protocol (MCP) server for Linear, allowing Claude to interact with Linear's API to manage teams, issues, projects, and cycles.

[![Cline MCP Marketplace](https://img.shields.io/badge/Cline-MCP%20Marketplace-blue)](https://github.com/cpropster/linear-mcp-server)

## Features

- **linear_get_teams**: Get all teams with their states and labels
- **linear_search_issues**: Search for issues with filtering and pagination
- **linear_get_cycles**: Get all cycles for a team
- **linear_get_projects**: Get all projects
- **linear_create_issue**: Create a new issue
- **linear_update_issue**: Update an existing issue

## Quick Start

For Cline MCP Marketplace users:

1. **Install the server** through the Cline MCP Marketplace
2. **Configure your Linear credentials** in the MCP configuration file
3. **Verify the installation** by testing the connection with `linear_search_issues`

See the detailed [Installation](#installation) and [Verification](#verifying-installation) sections below.

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the server:
   ```bash
   npm run build
   ```

The installation process has three main steps:
1. **Setup**: Clone and build the server (steps above)
2. **Configuration**: Set up your Linear OAuth token and configure the MCP server
3. **Verification**: Test the connection to ensure it's working properly

⚠️ **Your installation is not complete until you've verified the connection works!**

## Configuration

The server requires a Linear OAuth token to authenticate with the Linear API. You can set this token in the MCP configuration file.

### Getting a Linear OAuth Token

1. Create a Linear OAuth application at https://linear.app/settings/api/applications
2. Create an OAuth Application
3. Name the Application Cline MCP
4. Set the redirect URI to `http://localhost:3000/callback`
5. Note the client ID and client secret
6. Create and Copy a USER based developer token

### MCP Configuration

Add the following to your MCP configuration file:

```json
{
  "mcpServers": {
    "github.com/cpropster/linear-mcp-server": {
      "command": "node",
      "args": [
        "/path/to/linear-mcp-server/build/index.js"
      ],
      "env": {
        "LINEAR_CLIENT_ID": "your-client-id",
        "LINEAR_CLIENT_SECRET": "your-client-secret",
        "LINEAR_REDIRECT_URI": "http://localhost:3000/callback",
        "LINEAR_REFRESH_TOKEN": "your-refresh-token"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

Replace the placeholder credentials with your actual credentials.

### Verifying Installation

⚠️ **IMPORTANT**: Your installation is not complete until you verify that the MCP connection is working correctly.

After configuring the MCP server, you must test the connection to ensure it's working properly:

1. Reload the MCP configuration
2. Test the connection by using the `linear_search_issues` tool:

```
use_mcp_tool(
  server_name="github.com/cpropster/linear-mcp-server",
  tool_name="linear_search_issues",
  arguments={
    "first": 5
  }
)
```

If successful, you'll see a response like this:

```json
{
  "issues": {
    "nodes": [
      {
        "id": "123abc",
        "title": "Example issue 1",
        "identifier": "TEAM-123",
        "description": "This is an example issue"
        // ... other issue data
      },
      // ... more issues
    ]
  }
}
```

If the connection is working, you'll see a list of issues from your Linear account. If you see an error, check your configuration and credentials.

Common issues:
- Incorrect server path in the `args` field
- Invalid or expired Linear tokens
- Missing required environment variables
- Server is disabled in the configuration

## Usage

### Getting Teams

Use the `linear_get_teams` tool to retrieve all teams:

```
use_mcp_tool(
  server_name="github.com/cpropster/linear-mcp-server",
  tool_name="linear_get_teams",
  arguments={}
)
```

### Searching Issues

Use the `linear_search_issues` tool to search for issues:

```
use_mcp_tool(
  server_name="github.com/cpropster/linear-mcp-server",
  tool_name="linear_search_issues",
  arguments={
    "query": "Optional search query",
    "teamIds": ["Optional team IDs"],
    "first": 10 // Number of issues to return (default: 50)
  }
)
```

### Getting Cycles

Use the `linear_get_cycles` tool to retrieve cycles for a team:

```
use_mcp_tool(
  server_name="github.com/cpropster/linear-mcp-server",
  tool_name="linear_get_cycles",
  arguments={
    "teamId": "required-team-id"
  }
)
```

### Getting Projects

Use the `linear_get_projects` tool to retrieve projects:

```
use_mcp_tool(
  server_name="github.com/cpropster/linear-mcp-server",
  tool_name="linear_get_projects",
  arguments={
    "teamId": "optional-team-id",
    "first": 10 // Number of projects to return (default: 50)
  }
)
```

### Creating Issues

Use the `linear_create_issue` tool to create a new issue:

```
use_mcp_tool(
  server_name="github.com/cpropster/linear-mcp-server",
  tool_name="linear_create_issue",
  arguments={
    "teamId": "required-team-id",
    "title": "Required issue title",
    "description": "Optional issue description",
    "assigneeId": "optional-assignee-id",
    "stateId": "optional-state-id",
    "priority": 0, // Optional priority (0-4)
    "estimate": 1, // Optional estimate
    "cycleId": "optional-cycle-id",
    "projectId": "optional-project-id",
    "labelIds": ["optional-label-ids"]
  }
)
```

### Updating Issues

Use the `linear_update_issue` tool to update an existing issue:

```
use_mcp_tool(
  server_name="github.com/cpropster/linear-mcp-server",
  tool_name="linear_update_issue",
  arguments={
    "issueId": "required-issue-id",
    "title": "Optional new title",
    "description": "Optional new description",
    "assigneeId": "optional-assignee-id",
    "stateId": "optional-state-id",
    "priority": 0, // Optional priority (0-4)
    "estimate": 1, // Optional estimate
    "cycleId": "optional-cycle-id",
    "projectId": "optional-project-id",
    "labelIds": ["optional-label-ids"]
  }
)
```

## Debugging

If you encounter issues during the [verification step](#verifying-installation), or if the MCP connection stops working, you can use these debugging techniques:

1. **Check MCP Configuration**: Ensure your MCP configuration file has the correct server path and credentials.

2. **Run the Test Client**: Use the included test client to verify the server can connect to Linear:
   ```bash
   node test-client.js
   ```
   This will run a series of tests to verify that the server can connect to Linear and retrieve data.

3. **Check Linear API Status**: Verify that the Linear API is operational at [status.linear.app](https://status.linear.app).

4. **Inspect Server Logs**: If you're running the server manually, check the console output for error messages.

## Development

The server is built using TypeScript and the Linear SDK. The main implementation is in `src/index.ts`.

To make changes to the server:

1. Edit the source code in `src/`
2. Build the server with `npm run build`
3. Test your changes with the test client
4. Update the MCP configuration to use the new build

## Security Considerations

This MCP server requires access to your Linear account. To keep your data secure:

1. **Never commit sensitive tokens**: The `.env` file and any files containing tokens are excluded in `.gitignore`
2. **Use environment variables**: Always use environment variables in the MCP configuration rather than hardcoding tokens
3. **Limit permissions**: When creating a Linear OAuth application, only grant the permissions needed
4. **Regularly rotate tokens**: Periodically generate new tokens and update your configuration

The server uses the official Linear SDK and communicates with Linear's API over HTTPS, ensuring your data is transmitted securely.

## License

MIT
