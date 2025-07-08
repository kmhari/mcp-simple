# GitHub PR Comments MCP Server

[![smithery badge](https://smithery.ai/badge/github-pr-mcp)](https://smithery.ai/server/github-pr-mcp)

This is a Model Context Protocol (MCP) server that fetches GitHub Pull Request comments using a GitHub personal access token.

## Features

- Fetches PR comments with file paths, line ranges, and replies
- Uses GitHub API via Octokit
- Implements MCP server with StdioServerTransport
- Returns comments in a structured JSON format

## Installation

### Installing via Smithery

To install github-pr-mcp for Claude Desktop automatically via [Smithery](https://smithery.ai/server/github-pr-mcp):

```bash
npx -y @smithery/cli install github-pr-mcp --client claude
```

### Installing Manually
1. Clone the repository
2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file with your GitHub token:

   ```
   GITHUB_TOKEN=your_github_token_here
   ```

## Usage

1. Build the project:

   ```
   npm run build
   ```

2. Run the server:

   ```
   npm start
   ```

   Or directly with a GitHub token:

   ```
   node dist/server.js your_github_token_here
   ```

3. The server exposes a tool called `get_pr_comments` that accepts the following parameters:
   - `owner`: Repository owner (username or organization)
   - `repo`: Repository name
   - `pull_number`: Pull request number

## Integration with Cursor

To integrate with Cursor, use the following command in Cursor's MCP server configuration:

```
node /path/to/dist/server.js your_github_token_here
```

Replace `/path/to` with the actual path to your project, and `your_github_token_here` with your GitHub personal access token.

## Testing

A test client is included to verify the server functionality:

1. Build the project:

   ```
   npm run build
   ```

2. Run the test client:

   ```
   npm test
   ```

The test client will start the server, connect to it, and call the `get_pr_comments` tool with sample parameters.

## Response Format

The server returns comments in the following format:

```json
{
  "comments": [
    {
      "id": 123456789,
      "path": "src/example.js",
      "body": "This is a comment on a specific line",
      "line": 42,
      "start_line": 40,
      "user": {
        "login": "username"
      },
      "created_at": "2023-01-01T00:00:00Z",
      "replies": [
        {
          "id": 987654321,
          "body": "This is a reply to the comment",
          "user": {
            "login": "another-username"
          },
          "created_at": "2023-01-02T00:00:00Z"
        }
      ]
    }
  ]
}
```

## Development

To run the server in development mode:

```
npm run dev
```

## License

ISC
