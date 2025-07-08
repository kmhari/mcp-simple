# Filesystem MCP Server

A Python server implementing Model Context Protocol (MCP) for secure filesystem operations.

## Features

- Read/write files with multiple access methods (whole file, line ranges, keyword-based)
- Create/list directories and file trees
- Move files/directories
- Search files by name and content
- Perform diff-based edits with preview support
- Get detailed file metadata (size, permissions, ownership)
- Git-aware directory tree listing respecting .gitignore
- Function/keyword search in files with contextual results
- Multi-file read operations
- Path validation and security checks

**Note**: The server only allows operations within directories specified via command-line arguments.

## Installation

Build the Docker image locally:

```bash
docker build -t mcp/filesystem .
```

## Usage with Claude

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "--mount", "type=bind,src=/path/to/your/directory,dst=/projects",
        "mcp/filesystem",
        "/projects"
      ]
    }
  }
}
```

Note: All directories are mounted to `/projects` by default. Adding the `,ro` flag will make the directory read-only.

## Available Tools

### read_file
- Read complete contents of a file
- Input: `path` (string)

### read_multiple_files
- Read multiple files simultaneously
- Input: `paths` (string[])
- Failed reads won't stop the entire operation

### read_file_by_line
- Read specific lines or line ranges from a file
- Inputs:
  - `path` (string)
  - `ranges` (string[]): Line numbers or ranges (e.g., ["5", "10-20"])

### read_file_by_keyword
- Find lines containing a keyword with optional context
- Inputs:
  - `path` (string)
  - `keyword` (string): Text to search for
  - `before` (int): Lines to include before match (default: 0)
  - `after` (int): Lines to include after match (default: 0)
  - `use_regex` (bool): Use regex pattern (default: false)
  - `ignore_case` (bool): Case-insensitive search (default: false)
- Returns matching lines with ">" prefix and line numbers

### read_function_by_keyword
- Extract function definitions by keyword
- Inputs:
  - `path` (string)
  - `keyword` (string): Typically function name
  - `before` (int): Lines to include before match (default: 0)
  - `use_regex` (bool): Use regex pattern (default: false)

### write_file
- Create or overwrite a file
- Inputs:
  - `path` (string)
  - `content` (string)

### edit_file_diff
- Make surgical edits to a file without specifying line numbers
- Inputs:
  - `path` (string)
  - `replacements` (object): Dictionary with keys as content to find and values as replacement content
  - `inserts` (object): Dictionary for inserting content after specified anchor text
  - `replace_all` (boolean): Replace all occurrences or just first match (default: true)
  - `dry_run` (boolean): Preview changes without applying (default: false)
- Returns a summary of changes made

### edit_file_diff_line
- Edit a file with precise line number specifications
- Inputs:
  - `path` (string)
  - `edits` (object): Dictionary of edits with keys as line specifiers and values as content
    - "N": Replace line N with provided content
    - "N-M": Replace lines N through M with provided content
    - "Ni": Insert content after line N (use "0i" for beginning)
    - "a": Append content to end of file
  - `dry_run` (boolean): Preview changes without applying (default: false)
- Returns a summary of applied changes

### create_directory
- Create directory or ensure it exists
- Input: `path` (string)
- Creates parent directories if needed

### list_directory
- List directory contents with [FILE] or [DIR] prefixes
- Input: `path` (string)

### directory_tree
- Get a recursive tree view of files and directories with metadata
- Inputs:
  - `path` (string)
  - `count_lines` (boolean): Include line counts (default: false)
  - `show_permissions` (boolean): Show file permissions (default: false)
  - `show_owner` (boolean): Show file ownership information (default: false)
  - `show_size` (boolean): Show file sizes (default: false)

### git_directory_tree
- Get a directory tree for a git repository respecting .gitignore
- Inputs:
  - `path` (string)
  - `count_lines` (boolean): Include line counts (default: false)
  - `show_permissions` (boolean): Show file permissions (default: false)
  - `show_owner` (boolean): Show file ownership information (default: false)
  - `show_size` (boolean): Show file sizes (default: false)

### move_file
- Move or rename files and directories
- Inputs:
  - `source` (string)
  - `destination` (string)

### search_files
- Recursively search for files/directories matching a pattern
- Inputs:
  - `path` (string): Starting directory
  - `pattern` (string): Search pattern (case-insensitive)
  - `excludePatterns` (string[]): Glob patterns to exclude
- Returns full paths to all matching files and directories

### get_file_info
- Get detailed file metadata
- Input: `path` (string)
- Returns size, creation time, modified time, permissions, etc.

### list_allowed_directories
- List all directories the server is allowed to access

## Security

The server implements comprehensive security measures:

- Maintains a whitelist of allowed directories specified via command-line arguments
- Performs strict path validation to prevent unauthorized access outside allowed directories 
- Validates symlink targets to ensure they don't escape the allowed directories
- Handles circular symlinks and invalid paths gracefully
- Verifies parent directories for non-existent paths to ensure they're within allowed boundaries

## Requirements

- Python 3.12+
- MCP 1.5.0+
- Docker
- httpx 0.28.1+
- Git (optional, for git_directory_tree)

## License

[MIT](LICENSE)
