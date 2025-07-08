# Bitbucket Server MCP

MCP (Model Context Protocol) server for Bitbucket Server Pull Request management. This server provides tools and resources to interact with the Bitbucket Server API through the MCP protocol.

[![smithery badge](https://smithery.ai/badge/@garc33/bitbucket-server-mcp-server)](https://smithery.ai/server/@garc33/bitbucket-server-mcp-server)
<a href="https://glama.ai/mcp/servers/jskr5c1zq3"><img width="380" height="200" src="https://glama.ai/mcp/servers/jskr5c1zq3/badge" alt="Bitbucket Server MCP server" /></a>

## ✨ New Features

- **🔍 Project Discovery**: List all accessible Bitbucket projects with `list_projects`
- **📁 Repository Browsing**: Explore repositories across projects with `list_repositories`
- **🔧 Flexible Project Support**: Make the default project optional - specify per command or use `BITBUCKET_DEFAULT_PROJECT`
- **📖 Enhanced Documentation**: Improved README with usage examples and better configuration guidance

## Requirements

- Node.js >= 16

## Installation

### Installing via Smithery

To install Bitbucket Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@garc33/bitbucket-server-mcp-server):

```bash
npx -y @smithery/cli install @garc33/bitbucket-server-mcp-server --client claude
```

### Manual Installation

```bash
npm install
```

## Build

```bash
npm run build
```

## Features

The server provides the following tools for comprehensive Bitbucket Server integration:

### `list_projects`

**Discover and explore Bitbucket projects**: Lists all accessible projects with their details. Essential for project discovery and finding the correct project keys to use in other operations.

**Use cases:**

- Find available projects when you don't know the exact project key
- Explore project structure and permissions
- Discover new projects you have access to

Parameters:

- `limit`: Number of projects to return (default: 25, max: 1000)
- `start`: Start index for pagination (default: 0)

### `list_repositories`

**Browse and discover repositories**: Explore repositories within specific projects or across all accessible projects. Returns comprehensive repository information including clone URLs and metadata.

**Use cases:**
- Find repository slugs for other operations
- Explore codebase structure across projects
- Discover repositories you have access to
- Browse a specific project's repositories

Parameters:

- `project`: Bitbucket project key (optional, uses BITBUCKET_DEFAULT_PROJECT if not provided)
- `limit`: Number of repositories to return (default: 25, max: 1000)
- `start`: Start index for pagination (default: 0)

### `create_pull_request`

**Propose code changes for review**: Creates a new pull request to submit code changes, request reviews, or merge feature branches. Automatically handles branch references and reviewer assignments.

**Use cases:**
- Submit feature development for review
- Propose bug fixes
- Request code integration from feature branches
- Collaborate on code changes

Parameters:

- `project`: Bitbucket project key (optional, uses BITBUCKET_DEFAULT_PROJECT if not provided)
- `repository` (required): Repository slug
- `title` (required): Clear, descriptive PR title
- `description`: Detailed description with context (supports Markdown)
- `sourceBranch` (required): Source branch containing changes
- `targetBranch` (required): Target branch for merging
- `reviewers`: Array of reviewer usernames

### `get_pull_request`

**Comprehensive PR information**: Retrieves detailed pull request information including status, reviewers, commits, and all metadata. Essential for understanding PR state before taking actions.

**Use cases:**
- Check PR approval status
- Review PR details and progress
- Understand changes before merging
- Monitor PR status

Parameters:

- `project`: Bitbucket project key (optional, uses BITBUCKET_DEFAULT_PROJECT if not provided)
- `repository` (required): Repository slug
- `prId` (required): Pull request ID

### `merge_pull_request`

**Integrate approved changes**: Merges an approved pull request into the target branch. Supports different merge strategies based on your workflow preferences.

**Use cases:**
- Complete the code review process
- Integrate approved features
- Apply bug fixes to main branches
- Release code changes

Parameters:

- `project`: Bitbucket project key (optional, uses BITBUCKET_DEFAULT_PROJECT if not provided)
- `repository` (required): Repository slug
- `prId` (required): Pull request ID
- `message`: Custom merge commit message
- `strategy`: Merge strategy:
  - `merge-commit` (default): Creates merge commit preserving history
  - `squash`: Combines all commits into one
  - `fast-forward`: Moves branch pointer without merge commit

### `decline_pull_request`

**Reject unsuitable changes**: Declines a pull request that should not be merged, providing feedback to the author.

**Use cases:**
- Reject changes that don't meet standards
- Close PRs that conflict with project direction
- Request significant rework
- Prevent unwanted code integration

Parameters:

- `project`: Bitbucket project key (optional, uses BITBUCKET_DEFAULT_PROJECT if not provided)
- `repository` (required): Repository slug
- `prId` (required): Pull request ID
- `message`: Reason for declining (helpful for author feedback)

### `add_comment`

**Participate in code review**: Adds comments to pull requests for review feedback, discussions, and collaboration. Supports threaded conversations.

**Use cases:**
- Provide code review feedback
- Ask questions about specific changes
- Suggest improvements
- Participate in technical discussions
- Document review decisions

Parameters:

- `project`: Bitbucket project key (optional, uses BITBUCKET_DEFAULT_PROJECT if not provided)
- `repository` (required): Repository slug
- `prId` (required): Pull request ID
- `text` (required): Comment content (supports Markdown)
- `parentId`: Parent comment ID for threaded replies

### `get_diff`

**Analyze code changes**: Retrieves the code differences showing exactly what was added, removed, or modified in the pull request.

**Use cases:**
- Review specific code changes
- Understand scope of modifications
- Analyze impact before merging
- Inspect implementation details
- Code quality assessment

Parameters:

- `project`: Bitbucket project key (optional, uses BITBUCKET_DEFAULT_PROJECT if not provided)
- `repository` (required): Repository slug
- `prId` (required): Pull request ID
- `contextLines`: Context lines around changes (default: 10)

### `get_reviews`

**Track review progress**: Fetches review history, approval status, and reviewer feedback to understand the review state.

**Use cases:**
- Check if PR is ready for merging
- See who has reviewed the changes
- Understand review feedback
- Monitor approval requirements
- Track review progress

## Usage Examples

### Listing Projects and Repositories

```bash
# List all accessible projects
list_projects

# List repositories in the default project (if BITBUCKET_DEFAULT_PROJECT is set)
list_repositories

# List repositories in a specific project
list_repositories --project "MYPROJECT"

# List projects with pagination
list_projects --limit 10 --start 0
```

### Working with Pull Requests

```bash
# Create a pull request (using default project)
create_pull_request --repository "my-repo" --title "Feature: New functionality" --sourceBranch "feature/new-feature" --targetBranch "main"

# Create a pull request with specific project
create_pull_request --project "MYPROJECT" --repository "my-repo" --title "Bugfix: Critical issue" --sourceBranch "bugfix/critical" --targetBranch "develop" --description "Fixes critical issue #123"

# Get pull request details
get_pull_request --repository "my-repo" --prId 123

# Merge a pull request with squash strategy
merge_pull_request --repository "my-repo" --prId 123 --strategy "squash" --message "Feature: New functionality (#123)"
```

## Dependencies

- `@modelcontextprotocol/sdk` - SDK for MCP protocol implementation
- `axios` - HTTP client for API requests
- `winston` - Logging framework

## Configuration

The server requires configuration in the VSCode MCP settings file. Here's a sample configuration:

```json
{
  "mcpServers": {
    "bitbucket": {
      "command": "node",
      "args": ["/path/to/bitbucket-server/build/index.js"],
      "env": {
        "BITBUCKET_URL": "https://your-bitbucket-server.com",
        // Authentication (choose one):
        // Option 1: Personal Access Token
        "BITBUCKET_TOKEN": "your-access-token",
        // Option 2: Username/Password
        "BITBUCKET_USERNAME": "your-username",
        "BITBUCKET_PASSWORD": "your-password",
        // Optional: Default project
        "BITBUCKET_DEFAULT_PROJECT": "your-default-project"
      }
    }
  }
}
```

### Environment Variables

- `BITBUCKET_URL` (required): Base URL of your Bitbucket Server instance
- Authentication (one of the following is required):
  - `BITBUCKET_TOKEN`: Personal access token
  - `BITBUCKET_USERNAME` and `BITBUCKET_PASSWORD`: Basic authentication credentials
- `BITBUCKET_DEFAULT_PROJECT` (optional): Default project key to use when not specified in tool calls

**Note**: With the new optional project support, you can now:

- Set `BITBUCKET_DEFAULT_PROJECT` to work with a specific project by default
- Use `list_projects` to discover available projects
- Use `list_repositories` to browse repositories across projects
- Override the default project by specifying the `project` parameter in any tool call

## Logging

The server logs all operations to `bitbucket.log` using Winston for debugging and monitoring purposes.
