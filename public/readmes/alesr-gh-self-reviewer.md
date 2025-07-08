# gh-self-reviewer
[![Go Report Card](https://goreportcard.com/badge/github.com/alesr/gh-self-reviewer)](https://goreportcard.com/report/github.com/alesr/gh-self-reviewer)

A Go-based Anthropic MCP server that helps developers self-review their GitHub pull requests.

## Features

- List all your open pull requests across owned GitHub repositories
- Comment on your pull requests
- Designed to work with Claude AI using the Model Control Protocol (MCP)

## Installation

### Prerequisites

- Go 1.24.0 or higher
- GitHub personal access token with appropriate permissions

### Building from source

```bash
git clone https://github.com/alesr/gh-self-reviewer.git
cd gh-self-reviewer
go build -o gh-self-reviewer main.go
```

## Setup with Claude AI

1. Generate a GitHub personal access token with `repo` scope

2. Add the following configuration to your Claude AI config:

```json
{
  "mcpServers": {
    "github_tools": {
      "command": "/path/to/gh-self-reviewer",
      "args": [],
      "env": {
        "GITHUB_TOKEN_MCP_APP_REVIEW": "your_github_token_here"
      }
    }
  }
}
```

Replace `/path/to/gh-self-reviewer` with the actual path to the executable and `your_github_token_here` with your GitHub personal access token.

## Usage

Once set up, you can instruct Claude to:

1. List your open pull requests:
   ```
   Could you list my open GitHub pull requests?
   ```

2. Review and comment on a specific PR:
   ```
   Please review my PR at https://github.com/username/repo/pull/123 and add a comment
   ```

## License

MIT
