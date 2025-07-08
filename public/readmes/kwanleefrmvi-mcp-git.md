# mcp-git - Git MCP Server

[![NPM Version](https://img.shields.io/npm/v/mcp-git.svg)](https://www.npmjs.com/package/mcp-git)
[![Bun Version](https://img.shields.io/badge/bun-v1.2.8-blueviolet)](https://bun.sh)
[![License](https://img.shields.io/npm/l/mcp-git.svg)](LICENSE)

A Model Context Protocol server for Git repository interaction and automation. This server provides tools to read, search, and manipulate Git repositories via Large Language Models.

## MCP Server Usage

This package is designed to be used as an MCP server with clients like Claude Desktop. Here's how to configure it:

### Basic Configuration

Add this to your MCP client configuration:

```json
{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": ["-y", "mcp-git"]
    }
  }
}
```

### Advanced Configuration

For custom settings:

```json
{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": ["-y", "mcp-git"]
    }
  }
}
```

## Installation Options

### From Source

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Build:
   ```bash
   bun run build
   ```
4. Run:
   ```bash
   bun run start
   ```

## Available Git Tools

The server provides these MCP-accessible Git operations:

### Repository Operations

- `git_status` - Show working tree status
- `git_init` - Initialize new repository
- `git_log` - View commit history (with `max_count` parameter)

### Change Management

- `git_diff_unstaged` - View unstaged changes
- `git_diff_staged` - View staged changes
- `git_diff` - Compare with branch/commit
- `git_add` - Stage files
- `git_reset` - Unstage changes
- `git_commit` - Create commit

### Branch Operations

- `git_create_branch` - Create new branch
- `git_checkout` - Switch branches

### Content Inspection

- `git_show` - View commit contents

## Development

### Prerequisites

- [Bun](https://bun.sh) v1.2.8 or later
- Git installed system-wide

### Building

```bash
bun run build
```

### Testing

```bash
bun test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss proposed changes.

## License

[MIT](LICENSE)
