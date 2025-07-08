# GitHub Integration

The GitHub MCP server provides functionality to extract diffs from Pull Requests.

## Available Tools

### get_diff_pr
Retrieves the diff content from a GitHub Pull Request.

**Parameters**:
- `owner`: Repository owner/organization name
- `repo`: Repository name
- `pr_number`: Pull Request number

**Returns**: Object containing:
- `content`: String containing the PR diff

## Authentication

**Required**: Set the GitHub Personal Access Token as an environment variable:
```bash
export GITHUB_TOKEN=<your-github-token>
```

The token needs at least `repo` scope permissions to access private repositories. For public repositories, a token with `public_repo` scope is sufficient.

## Error Handling

The server implements standard error handling:
- Missing/invalid token returns `ErrorCode.AuthenticationError`
- Invalid repository details return `ErrorCode.InvalidParams`
- Non-existent PR returns `ErrorCode.NotFound`
- Failed diff fetches return formatted error messages
- Graceful shutdown on SIGINT

## Technical Details

- Built using the Highlight AI MCP SDK
- Uses GitHub REST API v3
- Input validation via Zod
- Runs as a stdio-based MCP server
- Supports Node.js >=18.0.0

## Limitations

- Rate limits apply based on GitHub API restrictions
- Large diffs may be truncated according to GitHub API limits
- Token requires appropriate repository access permissions
