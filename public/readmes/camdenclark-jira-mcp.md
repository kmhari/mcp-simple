# JIRA MCP Server
[![smithery badge](https://smithery.ai/badge/jira-mcp)](https://smithery.ai/server/jira-mcp)

An MCP server that enables Large Language Models (LLMs) to interact with JIRA through standardized tools and context. This server provides capabilities for searching issues using JQL and retrieving detailed issue information.

<a href="https://glama.ai/mcp/servers/4e3sqj7af1"><img width="380" height="200" src="https://glama.ai/mcp/servers/4e3sqj7af1/badge" alt="jira-mcp MCP server" /></a>

## Features

- **JQL Search**: Execute complex JQL queries with pagination support
- **Issue Details**: Retrieve detailed information about specific JIRA issues

## Prerequisites

- `npm` installed
- A JIRA instance with API access
- JIRA API token or Personal Access Token
- JIRA user email associated with the API token

### Getting JIRA API Credentials

1. Log in to your Atlassian account at https://id.atlassian.com
2. Navigate to Security settings
3. Under API tokens, select "Create API token"
4. Give your token a meaningful name (e.g., "MCP Server")
5. Copy the generated token - you won't be able to see it again!
6. Use this token as your `JIRA_API_KEY`
7. Use the email address associated with your Atlassian account as `JIRA_USER_EMAIL`

## Usage

### Integration with Claude Desktop

1. Add the server configuration to Claude Desktop's config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "jira": {
      "command": "npx",
      "args": ["-y", "jira-mcp"],
      "env": {
        "JIRA_INSTANCE_URL": "https://your-instance.atlassian.net",
        "JIRA_USER_EMAIL": "your-email@company.com",
        "JIRA_API_KEY": "your-api-token"
      }
    }
  }
}
```

2. Restart Claude Desktop to load the new configuration.

## Available Tools

### 1. JQL Search (`jql_search`)

Executes a JQL search query with customizable parameters.

**Parameters**:
- `jql` (required): JQL query string
- `nextPageToken`: Token for pagination
- `maxResults`: Maximum number of results to return
- `fields`: Array of field names to include
- `expand`: Additional information to include

**Example**:
```json
{
  "jql": "project = 'MyProject' AND status = 'In Progress'",
  "maxResults": 10,
  "fields": ["summary", "status", "assignee"]
}
```

### 2. Get Issue (`get_issue`)

Retrieves detailed information about a specific issue.

**Parameters**:
- `issueIdOrKey` (required): Issue ID or key
- `fields`: Array of field names to include
- `expand`: Additional information to include
- `properties`: Array of properties to include
- `failFast`: Whether to fail quickly on errors

**Example**:
```json
{
  "issueIdOrKey": "PROJ-123",
  "fields": ["summary", "description", "status"],
  "expand": "renderedFields,names"
}
```

## Development

### Configuration

Set up your environment variables before running the server. Create a `.env` file in the root directory:

```env
JIRA_INSTANCE_URL=https://your-instance.atlassian.net
JIRA_USER_EMAIL=your-email@company.com
JIRA_API_KEY=your-api-token
```

Replace the values with:
- Your actual JIRA instance URL
- The email address associated with your JIRA account
- Your JIRA API token (can be generated in Atlassian Account Settings)

### Installation

### Installing via Smithery

To install JIRA for Claude Desktop automatically via [Smithery](https://smithery.ai/server/jira-mcp):

```bash
npx -y @smithery/cli install jira-mcp --client claude
```

### Manual Installation
1. Clone this repository:
```bash
git clone <repository-url>
cd jira-mcp
```

2. Install dependencies:
```bash
npm install
```

### Running with MCP Inspector

For testing and development, you can use the MCP Inspector:

```bash
npm run inspect
```

### Adding New Tools

To add new tools, modify the `ListToolsRequestSchema` handler in `index.js`:

```javascript
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // Existing tools...
      {
        name: "your_new_tool",
        description: "Description of your new tool",
        inputSchema: {
          // Define input schema...
        }
      }
    ]
  };
});
```

Then implement the tool in the `CallToolRequestSchema` handler.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a PR.
