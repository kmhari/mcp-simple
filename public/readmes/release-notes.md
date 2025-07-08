# Release Notes Server

An MCP server that generates beautiful release notes from GitHub repositories. It efficiently fetches commits, organizes them by type, and presents them in a clean, readable format.

## Features

- 🎯 Smart commit filtering by date or SHA
- 📊 Groups commits by type (features, fixes, etc.)
- 🔍 Enriches commits with PR data
- 📈 Includes detailed statistics
- 🎨 Clean markdown formatting with emojis
- ⚡ Efficient API usage with GitHub's `since` parameter

## Installation

```bash
npm install
npm run build
```

## Usage

Add this server to your MCP configuration:

```json
{
  "mcpServers": {
    "release-notes": {
      "command": "node",
      "args": ["/path/to/release-notes-server/build/index.js"],
      "env": {
        "GITHUB_TOKEN": "your-github-token"
      }
    }
  }
}
```

### Available Tools

#### generate_release_notes

Generates release notes for a GitHub repository.

Parameters:
```typescript
{
  "owner": string,           // Repository owner
  "repo": string,           // Repository name
  "commitRange": {
    "fromCommit"?: string,  // Starting commit SHA
    "toCommit"?: string    // Ending commit SHA
  },
  "format": {
    "type": "markdown",     // Output format
    "groupBy": "type",      // How to group commits
    "includeStats": boolean // Include commit statistics
  }
}
```

Example:
```typescript
const result = await use_mcp_tool({
  server_name: "release-notes",
  tool_name: "generate_release_notes",
  arguments: {
    owner: "owner",
    repo: "repo",
    commitRange: {
      fromCommit: "abc123" // Get commits from this SHA
    },
    format: {
      type: "markdown",
      groupBy: "type",
      includeStats: true
    }
  }
});
```

## Output Format

The generated release notes include:

1. Header with generation date and statistics
2. Sections grouped by commit type:
   - 🚀 Features
   - 🐛 Fixes
   - 📚 Documentation
   - ⚡ Performance
   - ♻️ Refactoring
   - 🧪 Tests
   - 🏗️ Build
   - 🔧 Other

3. Detailed statistics including:
   - Total commits
   - Breaking changes
   - Commits by type
   - Commits by author

## Environment Variables

- `GITHUB_TOKEN`: GitHub personal access token with repo access

## Implementation Details

The server implements efficient commit fetching by:

1. Using GitHub's `since` parameter when possible to reduce API calls
2. Falling back to SHA-based filtering when needed
3. Properly handling pagination
4. Maintaining newest-first ordering for release notes
5. Enriching commits with PR data when available

## License

MIT
