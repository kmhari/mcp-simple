# MCP Jira

Model Context Protocol (MCP) server for Jira Cloud products. This integration is designed specifically for Jira Cloud instances and does not support Jira Server or Data Center deployments.

## Features

- Search and read Jira issues

## API

### Tools

#### Jira Tools

- **jira_get_issue**
  - Get details of a specific Jira issue
  - Inputs:
    - `issue_key` (string): Jira issue key (e.g., 'PROJ-123')
    - `expand` (string, optional): Fields to expand


## Usage with Claude Desktop

1. Get API tokens from: https://id.atlassian.com/manage-profile/security/api-tokens

2. Add to your `claude_desktop_config.json`:

3. Git clone this repo and run `npm install`

4. Run `npm run build`


```json
{
  "mcpServers": {
    "jira": {
    "command": "npx",
    "args": [
        "-y",
        "/your/project/path/mcp-jira",
        "--jira-url",
        "https://your-domain.atlassian.net",
        "--jira-username",
        "your.email@domain.com",
        "--jira-api-token",
        "your_api_token"
    ]
    }
  }
}
```

Replace `/your/project/path/mcp-jira` with the actual path where you've cloned the repository.

## License

Licensed under MIT - see [LICENSE](LICENSE) file. This is not an official Atlassian product.