# Linear MCP Server

A Linear Model Context Protocol (MCP) server implementation that provides an MCP interface for accessing Linear resources.

## Setup with Cursor

1. Clone the repository and install dependencies:

```bash
git clone git@github.com:Iwark/linear-mcp-server.git
cd linear-mcp-server
npm install
```

2. Create a startup script:

```bash
# Create linear.sh
touch linear.sh
chmod +x linear.sh

# Add the following content
export LINEAR_API_KEY="<YOUR LINEAR API KEY>"
node /absolute/path/to/linear-mcp-server/index.js
```

3. Configure in Cursor:

- Open Cursor settings
- Add a new server in the MCP Server section
- Select Type: `Command`
- Set Command: `sh /absolute/path/to/linear.sh`

Now you can use the Linear MCP server from within Cursor.

You can obtain your Linear API key from the [Linear settings page](https://linear.app/settings/api).

3. Start the server:

```bash
npm start
```

## Available Tools

### create-issue

Create a new Linear issue with specified parameters:

- `title` (required): Issue title
- `teamId` (required): Team ID
- `description` (optional): Issue description
- `priority` (optional): Issue priority (0: No priority, 1: Urgent, 2: High, 3: Medium, 4: Low)
- `stateId` (optional): State ID
- `assigneeId` (optional): Assignee ID
- `estimate` (optional): Issue estimate
- `labelIds` (optional): Array of Label IDs

### search-issues

Search Linear issues using a query string. Supports various filters:

- `assignee:@me`: Show issues assigned to you
- `priority:[value]`: Filter by priority
  - Numeric values (0-4)
  - Text values: "no", "urgent", "high", "medium", "low"
  - Note: `priority:high` includes both Urgent and High priority issues
- `state:[value]` or `status:[value]`: Filter by state name
- `team:[value]`: Filter by team name
- `label:[value]`: Filter by label name
- Free text search for title and description

### read-resource

Read Linear resources using URIs:

- `linear://organization` - Organization details
- `linear://issues` - List of issues
- `linear://issues/{id}` - Specific issue details
- `linear://teams` - List of teams
- `linear://teams/{id}` - Specific team details

## Rate Limiting

The server implements rate limiting with:

- 1000 requests per hour limit
- Automatic request tracking
- Metrics included in each response

## Error Handling

The server provides detailed error messages for:

- Linear API errors
- Rate limit exceeded
- Invalid resource types
- Authentication issues
