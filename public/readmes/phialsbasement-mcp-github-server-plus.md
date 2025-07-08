[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/phialsbasement-mcp-github-server-plus-badge.png)](https://mseep.ai/app/phialsbasement-mcp-github-server-plus)

# GitHub MCP Server Plus
![npm downloads](https://img.shields.io/npm/dt/improved-github-mcp)

MCP Server for the GitHub API, enabling file operations, repository management, search functionality, and more.

<a href="https://glama.ai/mcp/servers/qmvm4mx87p"><img width="380" height="200" src="https://glama.ai/mcp/servers/qmvm4mx87p/badge" alt="GitHub Server Plus MCP server" /></a>

### Features

- **Automatic Branch Creation**: When creating/updating files or pushing changes, branches are automatically created if they don't exist
- **Comprehensive Error Handling**: Clear error messages for common issues
- **Git History Preservation**: Operations maintain proper Git history without force pushing
- **Batch Operations**: Support for both single-file and multi-file operations with content or file paths
- **Advanced Search**: Support for searching code, issues/PRs, and users


## Tools

1. `create_or_update_file`
   - Create or update a single file in a repository
   - Inputs:
     - `owner` (string): Repository owner (username or organization)
     - `repo` (string): Repository name
     - `path` (string): Path where to create/update the file
     - `content` (string): Content of the file
     - `message` (string): Commit message
     - `branch` (string): Branch to create/update the file in
     - `sha` (optional string): SHA of file being replaced (for updates)
   - Returns: File content and commit details

2. `push_files_content`
   - Push multiple files with direct content in a single commit
   - Inputs:
     - `owner` (string): Repository owner
     - `repo` (string): Repository name
     - `branch` (string): Branch to push to
     - `files` (array): Files to push, each with `path` and `content`
     - `message` (string): Commit message
   - Returns: Updated branch reference

3. `push_files_from_path`
   - Push multiple files from filesystem paths in a single commit
   - Inputs:
     - `owner` (string): Repository owner
     - `repo` (string): Repository name
     - `branch` (string): Branch to push to
     - `files` (array): Files to push, each with:
       - `path` (string): Target path in the repository
       - `filepath` (string): Source filesystem path to read from
     - `message` (string): Commit message
   - Returns: Updated branch reference

4. `search_repositories`
   - Search for GitHub repositories
   - Inputs:
     - `query` (string): Search query
     - `page` (optional number): Page number for pagination
     - `perPage` (optional number): Results per page (max 100)
   - Returns: Repository search results

5. `create_repository`
   - Create a new GitHub repository
   - Inputs:
     - `name` (string): Repository name
     - `description` (optional string): Repository description
     - `private` (optional boolean): Whether repo should be private
     - `autoInit` (optional boolean): Initialize with README
   - Returns: Created repository details

6. `get_file_contents`
   - Get contents of a file or directory
   - Inputs:
     - `owner` (string): Repository owner
     - `repo` (string): Repository name
     - `path` (string): Path to file/directory
     - `branch` (optional string): Branch to get contents from
   - Returns: File/directory contents

7. `create_issue`
   - Create a new issue
   - Inputs:
     - `owner` (string): Repository owner
     - `repo` (string): Repository name
     - `title` (string): Issue title
     - `body` (optional string): Issue description
     - `assignees` (optional string[]): Usernames to assign
     - `labels` (optional string[]): Labels to add
     - `milestone` (optional number): Milestone number
   - Returns: Created issue details

8. `create_pull_request`
   - Create a new pull request
   - Inputs:
     - `owner` (string): Repository owner
     - `repo` (string): Repository name
     - `title` (string): PR title
     - `body` (optional string): PR description
     - `head` (string): Branch containing changes
     - `base` (string): Branch to merge into
     - `draft` (optional boolean): Create as draft PR
     - `maintainer_can_modify` (optional boolean): Allow maintainer edits
   - Returns: Created pull request details

9. `fork_repository`
   - Fork a repository
   - Inputs:
     - `owner` (string): Repository owner
     - `repo` (string): Repository name
     - `organization` (optional string): Organization to fork to
   - Returns: Forked repository details

10. `create_branch`
    - Create a new branch
    - Inputs:
      - `owner` (string): Repository owner
      - `repo` (string): Repository name
      - `branch` (string): Name for new branch
      - `from_branch` (optional string): Source branch (defaults to repo default)
    - Returns: Created branch reference

11. `list_issues`
    - List and filter repository issues
    - Inputs:
      - `owner` (string): Repository owner
      - `repo` (string): Repository name
      - `state` (optional string): Filter by state ('open', 'closed', 'all')
      - `labels` (optional string[]): Filter by labels
      - `sort` (optional string): Sort by ('created', 'updated', 'comments')
      - `direction` (optional string): Sort direction ('asc', 'desc')
      - `since` (optional string): Filter by date (ISO 8601 timestamp)
      - `page` (optional number): Page number
      - `per_page` (optional number): Results per page
    - Returns: Array of issue details

12. `update_issue`
    - Update an existing issue
    - Inputs:
      - `owner` (string): Repository owner
      - `repo` (string): Repository name
      - `issue_number` (number): Issue number to update
      - `title` (optional string): New title
      - `body` (optional string): New description
      - `state` (optional string): New state ('open' or 'closed')
      - `labels` (optional string[]): New labels
      - `assignees` (optional string[]): New assignees
      - `milestone` (optional number): New milestone number
    - Returns: Updated issue details

13. `add_issue_comment`
    - Add a comment to an issue
    - Inputs:
      - `owner` (string): Repository owner
      - `repo` (string): Repository name
      - `issue_number` (number): Issue number to comment on
      - `body` (string): Comment text
    - Returns: Created comment details

14. `search_code`
    - Search for code across GitHub repositories
    - Inputs:
      - `q` (string): Search query using GitHub code search syntax
      - `sort` (optional string): Sort field ('indexed' only)
      - `order` (optional string): Sort order ('asc' or 'desc')
      - `per_page` (optional number): Results per page (max 100)
      - `page` (optional number): Page number
    - Returns: Code search results with repository context

15. `search_issues`
    - Search for issues and pull requests
    - Inputs:
      - `q` (string): Search query using GitHub issues search syntax
      - `sort` (optional string): Sort field (comments, reactions, created, etc.)
      - `order` (optional string): Sort order ('asc' or 'desc')
      - `per_page` (optional number): Results per page (max 100)
      - `page` (optional number): Page number
    - Returns: Issue and pull request search results

16. `search_users`
    - Search for GitHub users
    - Inputs:
      - `q` (string): Search query using GitHub users search syntax
      - `sort` (optional string): Sort field (followers, repositories, joined)
      - `order` (optional string): Sort order ('asc' or 'desc')
      - `per_page` (optional number): Results per page (max 100)
      - `page` (optional number): Page number
    - Returns: User search results

17. `list_commits`
    - Gets commits of a branch in a repository
    - Inputs:
      - `owner` (string): Repository owner
      - `repo` (string): Repository name
      - `page` (optional string): page number
      - `per_page` (optional string): number of record per page
      - `sha` (optional string): branch name
    - Returns: List of commits

18. `get_issue`
    - Gets the contents of an issue within a repository
    - Inputs:
      - `owner` (string): Repository owner
      - `repo` (string): Repository name
      - `issue_number` (number): Issue number to retrieve
    - Returns: GitHub Issue object & details

19. `get_pull_request`
    - Get details of a specific pull request
    - Inputs:
      - `owner` (string): Repository owner
      - `repo` (string): Repository name
      - `pull_number` (number): Pull request number
    - Returns: Pull request details including diff and review status

20. `list_pull_requests`
    - List and filter repository pull requests
    - Inputs:
      - `owner` (string): Repository owner
      - `repo` (string): Repository name
      - `state` (optional string): Filter by state ('open', 'closed', 'all')
      - `head` (optional string): Filter by head user/org and branch
      - `base` (optional string): Filter by base branch
      - `sort` (optional string): Sort by ('created', 'updated', 'popularity', 'long-running')
      - `direction` (optional string): Sort direction ('asc', 'desc')
      - `per_page` (optional number): Results per page (max 100)
      - `page` (optional number): Page number
    - Returns: Array of pull request details

21. `create_pull_request_review`
    - Create a review on a pull request
    - Inputs:
      - `owner` (string): Repository owner
      - `repo` (string): Repository name
      - `pull_number` (number): Pull request number
      - `body` (string): Review comment text
      - `event` (string): Review action ('APPROVE', 'REQUEST_CHANGES', 'COMMENT')
      - `commit_id` (optional string): SHA of commit to review
      - `comments` (optional array): Line-specific comments, each with:
        - `path` (string): File path
        - `position` (number): Line position in diff
        - `body` (string): Comment text
    - Returns: Created review details

22. `merge_pull_request`
    - Merge a pull request
    - Inputs:
      - `owner` (string): Repository owner
      - `repo` (string): Repository name
      - `pull_number` (number): Pull request number
      - `commit_title` (optional string): Title for merge commit
      - `commit_message` (optional string): Extra detail for merge commit
      - `merge_method` (optional string): Merge method ('merge', 'squash', 'rebase')
    - Returns: Merge result details

23. `get_pull_request_files`
    - Get the list of files changed in a pull request
    - Inputs:
      - `owner` (string): Repository owner
      - `repo` (string): Repository name
      - `pull_number` (number): Pull request number
    - Returns: Array of changed files with patch and status details

24. `get_pull_request_status`
    - Get the combined status of all status checks for a pull request
    - Inputs:
      - `owner` (string): Repository owner
      - `repo` (string): Repository name
      - `pull_number` (number): Pull request number
    - Returns: Combined status check results and individual check details

25. `update_pull_request_branch`
    - Update a pull request branch with the latest changes from the base branch
    - Inputs:
      - `owner` (string): Repository owner
      - `repo` (string): Repository name
      - `pull_number` (number): Pull request number
      - `expected_head_sha` (optional string): The expected SHA of the pull request's HEAD ref
    - Returns: Success message when branch is updated

26. `get_pull_request_comments`
    - Get the review comments on a pull request
    - Inputs:
      - `owner` (string): Repository owner
      - `repo` (string): Repository name
      - `pull_number` (number): Pull request number
    - Returns: Array of pull request review comments

27. `get_pull_request_reviews`
    - Get the reviews on a pull request
    - Inputs:
      - `owner` (string): Repository owner
      - `repo` (string): Repository name
      - `pull_number` (number): Pull request number
    - Returns: Array of pull request reviews

## Search Query Syntax

### Code Search
- `language:javascript`: Search by programming language
- `repo:owner/name`: Search in specific repository
- `path:app/src`: Search in specific path
- `extension:js`: Search by file extension
- Example: `q: "import express" language:typescript path:src/`

### Issues Search
- `is:issue` or `is:pr`: Filter by type
- `is:open` or `is:closed`: Filter by state
- `label:bug`: Search by label
- `author:username`: Search by author
- Example: `q: "memory leak" is:issue is:open label:bug`

### Users Search
- `type:user` or `type:org`: Filter by account type
- `followers:>1000`: Filter by followers
- `location:London`: Search by location
- Example: `q: "fullstack developer" location:London followers:>100`

For detailed search syntax, see [GitHub's searching documentation](https://docs.github.com/en/search-github/searching-on-github).

## Setup

### Personal Access Token
[Create a GitHub Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) with appropriate permissions:
   - Go to [Personal access tokens](https://github.com/settings/tokens) (in GitHub Settings > Developer settings)
   - Select which repositories you'd like this token to have access to (Public, All, or Select)
   - Create a token with the `repo` scope ("Full control of private repositories")
     - Alternatively, if working only with public repositories, select only the `public_repo` scope
   - Copy the generated token

### Usage with Claude Desktop
To use this with Claude Desktop, add the following to your `claude_desktop_config.json`:

#### Docker
```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "mcp/github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>"
      }
    }
  }
}
```

### NPX

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>"
      }
    }
  }
}
```

## Build

Docker build:

```bash
docker build -t mcp/github -f src/github/Dockerfile .
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
