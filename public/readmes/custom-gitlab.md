# Custom GitLab MCP Server

A custom implementation of the GitLab MCP (Model Context Protocol) server for integration with Claude and other MCP-compliant AI assistants.

## Overview

This MCP server provides seamless integration with GitLab repositories, allowing AI assistants to:
- Search GitLab repositories
- Fetch file contents
- Create or update files
- Push multiple files in a single commit
- Create issues and merge requests
- Fork repositories
- Create branches

## Fixed Implementation

This custom implementation fixes issues with schema validation that were present in the standard GitLab MCP server implementation, specifically for the `search_repositories` tool.

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure in your Claude settings file or Claude Desktop config file:
   ```json
   {
     "mcpServers": {
       "github.com/modelcontextprotocol/servers/tree/main/src/gitlab": {
         "command": "node",
         "args": [
           "/path/to/custom-gitlab-server/index.js"
         ],
         "env": {
           "GITLAB_PERSONAL_ACCESS_TOKEN": "your-gitlab-token",
           "GITLAB_API_URL": "https://your-gitlab-instance/api/v4"
         }
       }
     }
   }
   ```

## Prerequisites

- Node.js (v14 or higher)
- GitLab Personal Access Token with appropriate scopes:
  - `api` for full API access
  - `read_api` for read-only access
  - `read_repository` and `write_repository` for repository operations

## Available Tools

| Tool Name | Description |
|-----------|-------------|
| `search_repositories` | Search for GitLab projects |
| `get_file_contents` | Get contents of a file or directory |
| `create_or_update_file` | Create or update a single file |
| `push_files` | Push multiple files in a single commit |
| `create_repository` | Create a new GitLab project |
| `create_issue` | Create a new issue |
| `create_merge_request` | Create a new merge request |
| `fork_repository` | Fork a project |
| `create_branch` | Create a new branch |

## License

MIT
