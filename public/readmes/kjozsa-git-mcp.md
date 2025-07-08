# Git MCP
[![smithery badge](https://smithery.ai/badge/@kjozsa/git-mcp)](https://smithery.ai/server/@kjozsa/git-mcp)
MCP server for managing Git operations on local repositories.

## Installation
### Installing via Smithery

To install Git MCP for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@kjozsa/git-mcp):

```bash
npx -y @smithery/cli install @kjozsa/git-mcp --client claude
```

### Installing Manually
```bash
uvx install git-mcp
```

## Configuration
Add the MCP server using the following JSON configuration snippet:

```json
{
  "mcpServers": {
    "git-mcp": {
      "command": "uvx",
      "args": ["git-mcp"],
      "env": {
        "GIT_REPOS_PATH": "/path/to/your/git/repositories"
      }
    }
  }
}
```

## Features and Usage

### Environment Variables
- `GIT_REPOS_PATH`: Path to the directory containing your Git repositories (required)

You can set this in your environment or create a `.env` file in the directory where you run the server.

### Available Methods

#### list_repositories
Lists all Git repositories in the configured path.
- Parameters: None
- Returns: List of repository names

#### get_last_git_tag
Finds the last Git tag in the specified repository.
- Parameters: `repo_name` (Name of the Git repository)
- Returns: Dictionary with `version` (tag name) and `date` (tag creation date)

#### list_commits_since_last_tag
Lists commit messages between the last Git tag and HEAD.
- Parameters: 
  - `repo_name`: Name of the Git repository
  - `max_count` (optional): Maximum number of commits to return
- Returns: List of dictionaries with `hash`, `author`, `date`, and `message`

#### create_git_tag
Creates a new git tag in the specified repository.
- Parameters: 
  - `repo_name`: Name of the git repository
  - `tag_name`: Name of the tag to create
  - `message` (optional): Message for annotated tag (if not provided, creates a lightweight tag)
- Returns: Dictionary with `status`, `version` (tag name), `date` (tag creation date), and `type` (annotated or lightweight)

#### push_git_tag
Pushes an existing git tag to the default remote repository.
- Parameters: 
  - `repo_name`: Name of the git repository
  - `tag_name`: Name of the tag to push
- Returns: Dictionary with `status`, `remote` (name of the remote), `tag` (name of the tag), and `message` (success message)

#### refresh_repository
Refreshes a repository by checking out the main branch (or master as fallback) and pulling from all remotes.
- Parameters:
  - `repo_name`: Name of the git repository
- Returns: Dictionary with `status`, `repository`, `branch`, and `pull_results` (results for each remote)

### Troubleshooting
- **Repository Not Found**: Ensure `GIT_REPOS_PATH` is set correctly and the repository exists
- **No Tags Found**: The repository doesn't have any tags yet

## Development
```bash
# Install dependencies
uv pip install -r requirements.txt

# Run in dev mode with Inspector
mcp dev git_mcp/server.py
```

## Testing

The project includes two test scripts:

1. `test_git_mcp.py` - Tests the underlying Git command functionality directly, without using the MCP server.
2. `test_mcp_server.py` - Tests the MCP server functionality by starting a server instance and making calls to it.

To run the tests:

```bash
# Test the Git command functionality
python test_git_mcp.py

# Test the MCP server (requires the git-mcp package to be installed)
python test_mcp_server.py
