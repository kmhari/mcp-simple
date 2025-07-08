# Linear MCP Server

An MCP server for interacting with Linear's API. This server provides a set of tools for managing Linear issues, projects, and teams through Cline.

## Setup Guide

### 1. Environment Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

### 2. Authentication

The server supports two authentication methods:

#### Personal Access Token (Recommended)

1. Go to Linear: Settings > API > OAuth application > "Cline MCP"
2. Under "Developer Token", click "Create & copy token"
3. Select "Application"
3. Add the token to your `.env` file:
   ```
   LINEAR_ACCESS_TOKEN=your_personal_access_token
   ```

#### OAuth Flow (Alternative) ***NOT IMPLEMENTED***

1. Create an OAuth application at https://linear.app/settings/api/applications
2. Configure OAuth environment variables in `.env`:
   ```
   LINEAR_CLIENT_ID=your_oauth_client_id
   LINEAR_CLIENT_SECRET=your_oauth_client_secret
   LINEAR_REDIRECT_URI=http://localhost:3000/callback
   ```

### 3. Running the Server

1. Build the server:
   ```bash
   npm run build
   ```
2. Start the server:
   ```bash
   npm start
   ```

### 4. Cline Integration

1. Open your Cline MCP settings file:
   - macOS: `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
   - Windows: `%APPDATA%/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
   - Linux: `~/.config/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`

2. Add the Linear MCP server configuration:
   ```json
   {
     "mcpServers": {
       "linear": {
         "command": "node",
         "args": ["/path/to/linear-mcp/build/index.js"],
         "env": {
           "LINEAR_ACCESS_TOKEN": "your_personal_access_token"
         },
         "disabled": false,
         "autoApprove": []
       }
     }
   }
   ```

## Available Actions

The server currently supports the following operations:

### Issue Management
- ✅ Create issues with full field support (title, description, team, project, etc.)
- ✅ Update existing issues (priority, description, etc.)
- ✅ Delete issues (single or bulk deletion)
- ✅ Search issues with filtering
- ✅ Associate issues with projects
- ✅ Create parent/child issue relationships
- ✅ Update status of a single issue
- ✅ Get issue information by ID

### Project Management
- ✅ Create projects with associated issues
- ✅ Get project information
- ✅ Associate issues with projects
- ✅ Search projects by name

### Team Management
- ✅ Get team information (with states and workflow details)
- ✅ Access team states and labels

### User Management
- ✅ Get current user information

### Authentication
- ✅ Personal Access Token (PAT) authentication
- ✅ Secure token storage

### Batch Operations
- ✅ Bulk issue creation
- ✅ Bulk issue deletion
- 🚧 Bulk issue updates (parallel processing implemented, needs testing)

## Features in Development

The following features are currently being worked on:

### Issue Management
- 🚧 Comment functionality (add/edit comments, threading)
- 🚧 Complex search filters
- 🚧 Pagination support for large result sets

### Metadata Operations
- 🚧 Label management (create/update/assign)
- 🚧 Cycle/milestone management

### Project Management
- 🚧 Project template support
- 🚧 Advanced project operations

### Authentication
- 🚧 OAuth flow with automatic token refresh

### Performance & Security
- 🚧 Rate limiting
- 🚧 Detailed logging
- 🚧 Load testing and optimization

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run integration tests (requires LINEAR_ACCESS_TOKEN)
npm run test:integration

# Build the server
npm run build

# Start the server
npm start
```

## Integration Testing

Integration tests verify that authentication and API calls work correctly:

1. Set up authentication (PAT recommended for testing)
2. Run integration tests:
   ```bash
   npm run test:integration
   ```

For OAuth testing:
1. Configure OAuth credentials in `.env`
2. Remove `.skip` from OAuth tests in `src/__tests__/auth.integration.test.ts`
3. Run integration tests
