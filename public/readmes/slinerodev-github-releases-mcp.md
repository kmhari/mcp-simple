# GitHub Releases MCP Server

A powerful Model Context Protocol (MCP) toolkit for GitHub releases management. This server provides comprehensive tools for accessing, comparing, and analyzing GitHub repository releases with rich formatting and detailed information.

## Features

- 🔍 **Detailed Release Information**: Get comprehensive details about specific releases
- 📊 **Version Comparison**: Compare changes between any two versions
- 📋 **Release Listing**: Get formatted lists of releases with filtering options
- 🏷️ **Semantic Version Support**: Handles various version formats (v1.0.0, @1.0.0, 1.0.0)
- 🎯 **Pre-release Filtering**: Option to include or exclude pre-releases
- 📝 **Rich Formatting**: Emoji-enhanced output for better readability
- 🔄 **Pagination Support**: Handles repositories with many releases
- 🔒 **Authentication**: Optional GitHub token support for private repositories and extended rate limit

## Configuration

The server accepts the following optional environment variables:

- `GITHUB_PERSONAL_ACCESS_TOKEN`: GitHub Personal Access Token (optional). If provided, it will be used to authenticate API requests, allowing for higher rate limits and access to private repositories.

## Quick Start

You can run this MCP server using npx:

```bash
# Using environment variables
GITHUB_PERSONAL_ACCESS_TOKEN=your_token npx @slinerodev/github-releases-mcp

# Or using a .env file
echo "GITHUB_PERSONAL_ACCESS_TOKEN=your_token" > .env
npx @slinerodev/github-releases-mcp
```

## Client Configuration

The server can be used with various MCP clients. Add the following configuration to your client's config file:

- Cursor: `~/.cursor/mcp.json`
- VS Code: `.vscode/settings.json` (use `mcp.servers` instead of `mcpServers`)
- Claude Desktop: `claude_desktop_config.json`
- Windsurf: `windsurf_config.json`

### Using Published Version

```json
{
  "mcpServers": {
    "github-releases": {
      "command": "npx",
      "args": [
        "-y",
        "@slinerodev/github-releases-mcp"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

### Using Local Development Version

```json
{
  "mcpServers": {
    "github-releases": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "${workspaceRoot}/main.ts"
      ]
    }
  }
}
```

Note:

- For VS Code, replace `mcpServers` with `mcp.servers` in the configuration.
- Replace `your_token_here` with your GitHub Personal Access Token if you want to access private repositories or need higher rate limits.

## Available Tools

The server provides three specialized tools for working with GitHub releases:

### 1. github_release_info

Get detailed information about a specific release version.

```typescript
const result = await mcp.invoke("github_release_info", {
  owner: "owner-name",
  repo: "repo-name",
  version: "1.0.0" // Supports v1.0.0, @1.0.0, 1.0.0
});
```

Perfect for:

- Understanding what changed in a specific version
- Documentation purposes
- Release note retrieval

### 2. github_releases_compare

Compare changes between two versions.

```typescript
const result = await mcp.invoke("github_releases_compare", {
  owner: "owner-name",
  repo: "repo-name",
  fromVersion: "1.0.0",
  toVersion: "2.0.0"
});
```

Perfect for:

- Generating changelogs
- Understanding feature evolution
- Migration guides
- Breaking change analysis

### 3. github_releases_list

List all releases with filtering options.

```typescript
const result = await mcp.invoke("github_releases_list", {
  owner: "owner-name",
  repo: "repo-name",
  limit: 10, // Optional: limit number of releases
  includePreReleases: false // Optional: include pre-releases
});
```

Perfect for:

- Project release history overview
- Finding latest versions
- Release frequency monitoring
- Pre-release tracking

### Example Response Format

All tools return responses in a consistent, emoji-enhanced format:

```
🔖 v1.0.0 (First stable release)
🗓️ 2024-03-15T10:30:00Z
📝 This is the release description...

---

🔖 v0.9.0 (Beta) (Pre-release)
🗓️ 2024-03-01T08:15:00Z
📝 Beta version with new features...
```

## Error Handling

The tools handle various error cases gracefully:

- Invalid repository names
- Non-existent versions
- Invalid version formats
- API rate limits
- Network issues
- Authentication errors

Each error returns a clear message explaining what went wrong.

## Development

1. Install dependencies:

    ```bash
    pnpm install
    ```

2. Run the server:

    ```bash
    pnpm start
    ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

## Author

Sergio Linero
