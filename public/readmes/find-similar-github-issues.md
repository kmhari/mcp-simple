# GitHub Support Assistant

An MCP server that helps support engineers find similar GitHub issues to speed up troubleshooting.

## Setup

1. Install dependencies:
```
npm install
```

2. Set your GitHub token as an environment variable:
```
export GITHUB_TOKEN=your_github_personal_access_token
```

3. Build the server:
```
npm run build
```

#### Integrating with Claude:
Update the claude desktop configuration, e.g.
`code ~/Library/Application\ Support/Claude/claude_desktop_config.json`

Update it to include the full path that this repository was cloned to:
```
{
    "mcpServers": {
        "find-similar-github-issues": {
            "command": "node",
            "args": [
                "/Users/<repo_path>/build/index.js"
            ]
        }
    }
}
```

## Features

- Searches for similar issues in a GitHub repository based on issue description
- Calculates similarity scores to rank results
- Returns formatted issue details with links

## Usage

The server provides one tool:

### find-similar-issues

Finds GitHub issues similar to a given description.

**Parameters:**
- `owner`: GitHub repository owner/organization
- `repo`: GitHub repository name
- `issueDescription`: Description of the issue to find similar ones for
- `maxResults`: Maximum number of similar issues to return (default: 5)

## Implementation Notes

This implementation uses a simple Jaccard similarity coefficient to compare text. For production use, consider implementing more sophisticated NLP techniques for better similarity matching.
