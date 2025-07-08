# Cloudflare to GitHub Backup MCP Server

[![smithery badge](https://smithery.ai/badge/@DynamicEndpoints/cloudflare-github-backup-mcp)](https://smithery.ai/server/@DynamicEndpoints/cloudflare-github-backup-mcp)

This is an MCP (Model Context Protocol) server that backs up Cloudflare projects to a GitHub repository.

## Prerequisites

- Node.js and npm installed.
- A Cloudflare account and API token with read access to your projects.
- A GitHub account and personal access token with "repo" scope.
- A GitHub repository where you want to store the backups.

## Installation

### Installing via Smithery

To install Cloudflare to GitHub Backup for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@DynamicEndpoints/cloudflare-github-backup-mcp):

```bash
npx -y @smithery/cli install @DynamicEndpoints/cloudflare-github-backup-mcp --client claude
```

### Manual Installation
1. Clone this repository:
   ```bash
   git clone <repository_url>
   cd cloudflare-github-backup
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project
    ```bash
    npm run build
    ```

## Configuration

1. Obtain your Cloudflare API token:
   - Go to your Cloudflare dashboard.
   - Navigate to "My Profile" -> "API Tokens".
   - Click "Create Token".
   - Ensure the token has the necessary permissions to read your projects.
   - Copy the token.

2. Obtain your GitHub personal access token:
   - Go to your GitHub settings.
   - Navigate to "Developer settings" -> "Personal access tokens".
   - Click "Generate new token".
   - Select the "repo" scope.
   - Copy the token.

3. Edit the `cline_mcp_settings.json` file:
    ```json
    {
      "mcpServers": {
        "cloudflare-backup": {
          "command": "node",
          "args": ["/path/to/cloudflare-github-backup/build/index.js"],
          "env": {
            "CLOUDFLARE_API_TOKEN": "your_cloudflare_api_token",
            "GITHUB_ACCESS_TOKEN": "your_github_access_token",
            "GITHUB_REPO_NAME": "your_github_repo_name"
          }
        }
      }
    }
    ```
    - Replace `/path/to/cloudflare-github-backup` with the actual path to the `cloudflare-github-backup` directory.
    - Replace `your_cloudflare_api_token`, `your_github_access_token`, and `your_github_repo_name` with your actual tokens and repository name.

## Usage

1. Start the MCP server by restarting the VS Code extension.
2. Use the `use_mcp_tool` tool to call the `backup_projects` tool:

   ```xml
   <use_mcp_tool>
   <server_name>cloudflare-backup</server_name>
   <tool_name>backup_projects</tool_name>
   <arguments>
   {}
   </arguments>
   </use_mcp_tool>
   ```

   This will trigger the backup process. The server will log messages to the console indicating the progress.

## Note

Currently, the backup logic is just a placeholder. It will log messages to the console but won't perform actual backups. The next step is to implement the actual backup logic using the Cloudflare and GitHub APIs.
