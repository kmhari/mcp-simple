# mcp-todo-server

Model Context Protocol (MCP) server for managing TODO.md and CHANGELOG.md files.

## Features

- Precise, line-based editing and reading of file contents.
- Efficient partial file access using line ranges, for efficient LLM tool usage.
- Retrieve specific file content by specifying line ranges.
- Fetch multiple line ranges from multiple files in a single request.
- Apply line-based patches, correctly adjusting for line number changes.
- Supports a wide range of character encodings (utf-8, shift_jis, latin1, etc.).
- Perform atomic operations across multiple files.
- Robust error handling using custom error types.
- Adheres to Semantic Versioning and Keep a Changelog conventions.

## Requirements

- Go v1.23+
- Linux, macOS, or Windows
- File system permissions for read/write operations

## Installation

```bash
go install codeberg.org/mutker/mcp-todo-server/cmd/mcp-todo-server@latest
```

## Usage examples:

- Ask "What are my current tasks for version 0.2.0?"
- Say "Add a new task to implement OAuth authentication for version 0.2.0"
- Request "Generate a changelog entry for version 0.1.0 based on completed tasks"
- Say "Import my existing TODO.md file from /path/to/my/TODO.md"

The server intelligently handles task parsing, version management, and provides rich semantic understanding of tasks and changelog entries.

## Available MCP Tools

### TODO.md Operations

- `get-todo-tasks` - Get all tasks from TODO.md
- `get-todo-tasks-by-version` - Get tasks for a specific version
- `add-todo-task` - Add a new task for a specific version
- `update-todo-task` - Update an existing task
- `add-todo-version` - Add a new version section
- `import-todo` - Import and format an existing TODO.md

### CHANGELOG.md Operations

- `get-changelog` - Get all changelog entries
- `get-changelog-by-version` - Get changelog entries for a specific version
- `add-changelog-entry` - Add a new changelog version entry
- `update-changelog-entry` - Update an existing changelog entry
- `import-changelog` - Import and format an existing CHANGELOG.md
- `generate-changelog-from-todo` - Generate a new CHANGELOG.md entry based on completed tasks in TODO.md

## Thanks

- [tumf/mcp-text-editor](https://github.com/tumf/mcp-text-editor) for the inspiration.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for the full license text.
