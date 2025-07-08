# Jira Context MCP
[![CodeQL Advanced](https://github.com/rahulthedevil/Jira-Context-MCP/actions/workflows/codeql.yml/badge.svg)](https://github.com/rahulthedevil/Jira-Context-MCP/actions/workflows/codeql.yml)
[![smithery badge](https://smithery.ai/badge/@rahulthedevil/Jira-Context-MCP)](https://smithery.ai/server/@rahulthedevil/Jira-Context-MCP)
<figure>
    <a href="https://glama.ai/mcp/servers/a8ob8depqc">
     <img width="380" height="200" src="https://glama.ai/mcp/servers/a8ob8depqc/badge" />
   </a>
</figure>

A Model Context Protocol (MCP) implementation for Jira that allows you to:

- Input a Jira ticket link to fetch issue details and instruct Cursor to fix it
- Retrieve all tickets assigned to you within a specified Jira project 
- Filter Jira issues based on a specific issue type and automatically direct Cursor to resolve them
- Integrate seamlessly with Jira's API for automation and efficiency

## Setup

### Prerequisites

- Node.js 20.17.0 or higher
- A Jira account with API access
- A Jira API token (can be generated at [Atlassian API Tokens](https://id.atlassian.com/manage-profile/security/api-tokens))

### Installation

#### Installing via Smithery

To install Jira Context MCP for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@rahulthedevil/Jira-Context-MCP):

```bash
npx -y @smithery/cli install @rahulthedevil/Jira-Context-MCP --client claude
```

#### Installing manually

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/Jira-Context-MCP.git
   cd Jira-Context-MCP
   ```

2. Install dependencies:
   ```bash
   npm install
   # or if you use pnpm
   pnpm install
   ```

3. Create a `.env` file based on the example:
   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file with your Jira details:
   ```
   JIRA_BASE_URL=https://your-domain.atlassian.net
   JIRA_USERNAME=your-email@example.com
   JIRA_API_TOKEN=your-api-token-here
   HTTP_PORT=3000
   ```

### Build

Build the project with:

```bash
npm run build
# or
pnpm build
```

## Usage

### Starting the Server

Start the HTTP server:

```bash
npm start
# or
pnpm start
```

Or use the CLI mode:

```bash
npm run start:cli
# or
pnpm start:cli
```

### Connecting with Cursor

1. In Cursor, open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P)
2. Type **"Connect to MCP Server"**
3. Select **"Connect to MCP Server"**
4. Enter the server URL (default: `http://localhost:3000/sse`)

## Available Tools

Once connected, you can use the following tools in Cursor:

### 1. Get Jira Issue Details

Fetch detailed information about a specific Jira issue:
```
/get_issue issueKey:PROJECT-123
```

### 2. Get Assigned Issues

Retrieve issues assigned to you in a specific project:
```
/get_assigned_issues projectKey:PROJECT maxResults:10
```

### 3. Get Issues by Type

Filter issues by type (Bug, Story, Epic, etc.):
```
/get_issues_by_type issueType:Bug projectKey:PROJECT maxResults:10
```

### 4. Get Projects

List all available projects:
```
/get_projects
```

### 5. Get Issue Types

List all available issue types:
```
/get_issue_types
```

### 6. Get Recent Ticket Changes

Retrieve changes made in tickets over a specified period (e.g., the last 7 days) in a project:
```
/get_recent_changes projectKey:PROJECT maxDays:7
```

## Command Examples

🚀 **Jira MCP Server + Cursor IDE = Your AI-powered Jira assistant!** Here’s how it makes devs work smarter:

📂 **"List all Jira projects I have access to"**  
→ AI fetches all available projects instantly  
No more searching manually!

📋 **"List all issues in PROJECT"**  
→ AI retrieves all open tickets  
Stay organized without effort!

🐛 **"Filter only Bugs or Change Requests and fix them"**  
→ AI identifies & directs Cursor to resolve them  
Fix issues faster with automation!

✅ **"Find all tickets assigned to me and fix them"**  
→ AI pulls your tasks & lets Cursor handle them  
Stay on top of your work with zero hassle!

🔍 **"Get details for Jira issue PROJECT-123"**  
→ AI fetches full issue info in seconds  
No more switching tabs!

📊 **"What changed in tickets in the last 7 days in PROJECT?"**  
→ AI tracks recent updates & highlights key changes  
No more manually checking ticket histories!

🔥 **TL;DR:** Your AI now speaks Jira + Cursor! Fetch projects, filter issues, track changes & fix bugs—all inside your IDE.  
From backlog to bug fixes, MCP Server makes Jira work for you!

## Example Workflows

### Fix a Specific Bug

1. Connect to the Jira MCP server in Cursor.
2. Get the issue details:
   ```
   /get_issue issueKey:PROJECT-123
   ```
3. Review the issue details and instruct Cursor to fix it:
   ```
   Fix the bug described in PROJECT-123
   ```

### Work on Your Assigned Issues

1. Connect to the Jira MCP server in Cursor.
2. Retrieve your assigned issues:
   ```
   /get_assigned_issues projectKey:PROJECT
   ```
3. Ask Cursor to help with one of the issues:
   ```
   Help me solve the first issue in my assigned list
   ```

### Fix All Bugs in a Project

1. Connect to the Jira MCP server in Cursor.
2. Retrieve all bug issues:
   ```
   /get_issues_by_type issueType:Bug projectKey:PROJECT
   ```
3. Instruct Cursor:
   ```
   Help me fix these bugs one by one
   ```

### Review Recent Changes

1. Connect to the Jira MCP server in Cursor.
2. Retrieve recent ticket updates:
   ```
   /get_recent_changes projectKey:PROJECT maxDays:7
   ```
3. Review the changes to stay updated on modifications.

## Development

### Project Structure

- `src/` - Source code
  - `services/` - Jira API service
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions
  - `server.ts` - MCP server implementation
  - `index.ts` - Application entry point
  - `cli.ts` - CLI entry point

### Adding New Tools

To add new tools, edit the `src/server.ts` file and add new tool definitions in the `registerTools` method.

## License

MIT

## Author

Rahul Dey - [@rahulthedevil](https://github.com/rahulthedevil)
