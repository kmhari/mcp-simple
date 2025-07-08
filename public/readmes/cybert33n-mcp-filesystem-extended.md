# Filesystem MCP Server

Node.js server implementing Model Context Protocol (MCP) for filesystem operations.

## Features

- Read/create/append multiple files
- Create/list/delete directories and files
- Copy/move files and directories
- Search files by name, glob pattern, or content regex
- Patch files using line numbers
- File and content diffing
- Count lines in files
- Generate and verify file checksums
- Get file metadata and directory trees

**Note**: The server will only allow operations within directories specified via `args`.

## Code Structure

The codebase follows a feature-based organization where each API operation has its own directory:

```
/
├── append_files/                   # Append to multiple files
├── checksum_files/                 # Generate checksums for multiple files
├── checksum_files_verif/           # Verify checksums for multiple files
├── content_diff/                   # Compare two text strings
├── copy_files/                     # Copy files and directories
├── count_lines/                    # Count lines in files
├── create_directories/             # Create multiple directories at once
├── delete_files/                   # Delete multiple files at once
├── directory_tree/                 # Get recursive directory structure
├── file_diff/                      # Compare differences between files
├── file_info/                      # Get file metadata
├── helpers/                        # Shared utilities
│   ├── checksum.ts                 # Checksum generation utilities
│   ├── diff.ts                     # Diff generation utilities
│   └── path.ts                     # Path validation and security
├── list_directory/                 # List directory contents
├── move_files/                     # Move or rename multiple files
├── patch_files/                    # Patch files using line numbers
├── batch_read_files/                     # Read multiple files
├── search_files/                   # Search for files by name
├── search_glob/                    # Search for files using glob patterns
├── search_regex/                   # Search file contents with regex
├── write_new_files/                # Create new files at once
└── server.ts                       # Main server implementation
```

Each operation directory typically contains:
- `schema.ts` - Zod schema for input validation
- `handler.ts` - Main handler function for the operation
- `helpers.ts` - Helper functions (where needed)

## API

### Resources

- `file://system`: File system operations interface

### Tools
- **batch_read_files**
  - Read multiple files simultaneously (works on a single file too)
  - Input: `paths` (string[])
  - Failed reads won't stop the entire operation
  - Each line is prefixed with its line number (format: "1: line content")

- **list_directory**
  - List directory contents with [FILE] or [DIR] prefixes
  - Input: `path` (string)

- **directory_tree**
  - Get a recursive tree view of files and directories as a JSON structure
  - Inputs:
    - `path` (string): Root directory path
    - `excludePatterns` (string[]): Patterns to exclude from tree (glob format supported)
  - Returns JSON with name, type, and children properties
- **search_files**
  - Recursively search for files/directories
  - Inputs:
    - `path` (string): Starting directory
    - `pattern` (string): Search pattern
    - `excludePatterns` (string[]): Exclude any patterns. Glob formats are supported.
  - Case-insensitive matching
  - Returns full paths to matches

- **file_info**
  - Get detailed file/directory metadata
  - Input: `path` (string)
  - Returns:
    - Size
    - Creation time
    - Modified time
    - Access time
    - Type (file/directory)
    - Permissions


- **write_new_files**
  - Create multiple new files in a single operation (works on a single file too)
  - Fails if any file already exists (use patch_files to modify existing files)
  - Input: `files` (array of objects):
    - `path` (string): File location
    - `content` (string): File content
  - Partial failures won't stop the entire operation
- **append_files**
  - Append content to multiple existing files without overwriting (works on a single file too)
  - Creates files if they don't exist
  - Input: `files` (array of objects):
    - `path` (string): File location
    - `content` (string): Content to append
  - Partial failures won't stop the entire operation

- **patch_files**
  - Patch multiple files using line numbers (works on a single file too)
  - Specify exact line ranges to replace without needing to provide the old text
  - Inputs:
    - `files` (array): List of file patch operations
      - `path` (string): File to patch
      - `patches` (array): List of patch operations per file
        - `startLine` (number): Line number where the patch starts (1-indexed)
        - `endLine` (number): Line number where the patch ends (1-indexed)
        - `newText` (string): Text to replace with
    - `dryRun` (boolean): Preview changes without applying (default: false)
    - `options` (object): Optional formatting settings
      - `preserveIndentation` (boolean): Preserve indentation when replacing text

- **create_directories**
  - Create multiple directory paths in one operation (works on a single directory too)
  - Input: `paths` (string[]): Array of directory paths to create
  - Creates parent directories if needed
  - Partial failures won't stop the entire operation

- **move_files**
  - Move or rename multiple files and directories in a single operation (works on a single file too)
  - Input: `items` (array):
    - `source` (string): Source path
    - `destination` (string): Destination path
  - Option: `overwrite` (boolean): Whether to overwrite existing destinations (default: false)
  - Partial failures won't stop the entire operation

- **delete_files**
  - Delete multiple files or directories in a single operation (works on a single file too)
  - Inputs:
    - `paths` (string[]): Paths to delete
    - `recursive` (boolean): Whether to recursively delete directories (default: false)
  - Partial failures won't stop the entire operation

- **search_regex**
  - Search file contents using regular expressions
  - Inputs:
    - `path` (string): Root directory to search in
    - `pattern` (string): Regular expression pattern
    - `filePatterns` (string[]): File patterns to include (e.g. '*.js', '*.ts')
    - `excludePatterns` (string[]): Patterns to exclude
    - `maxResults` (number): Maximum results to return (default: 100)
    - `caseSensitive` (boolean): Whether search is case-sensitive (default: false)
  - Returns matching lines with line numbers and context

- **search_glob**
  - Find files using glob patterns
  - Inputs:
    - `path` (string): Root directory to search in
    - `pattern` (string): Glob pattern (e.g. '**/*.js', 'src/**/*.{ts,tsx}')
    - `excludePatterns` (string[]): Glob patterns to exclude
    - `maxResults` (number): Maximum results to return (default: 500)
  - Returns full paths to matching files

- **content_diff**
  - Compare two text strings and show differences
  - Inputs:
    - `content1` (string): First content string
    - `content2` (string): Second content string
    - `label1` (string): Label for first content (default: "original")
    - `label2` (string): Label for second content (default: "modified")
  - Returns unified diff showing changes

- **count_lines**
  - Count lines in files with optional pattern matching
  - Inputs:
    - `path` (string): File or directory path
    - `recursive` (boolean): Whether to count lines in all files in directory (default: false)
    - `pattern` (string): Optional regex pattern to match lines
    - `filePattern` (string): Glob pattern to match files when recursive (default: "**")
    - `excludePatterns` (string[]): Glob patterns to exclude
    - `ignoreEmptyLines` (boolean): Whether to ignore empty lines (default: false)
  - Returns counts by file and totals

- **checksum_files**
  - Generate checksums for multiple files (works on a single file too)
  - Inputs:
    - `paths` (string[]): File paths
    - `algorithm` (string): Hash algorithm (md5, sha1, sha256, sha512) (default: sha256)
  - Returns hashes for all files

- **checksum_files_verif**
  - Verify multiple files against expected checksums (works on a single file too)
  - Input: `files` (array):
    - `path` (string): File path
    - `expectedHash` (string): Expected hash value
  - Option: `algorithm` (string): Hash algorithm (default: sha256)
  - Returns verification results for all files

- **list_allowed_directories**
  - List all directories the server is allowed to access
  - No input required
  - Returns a list of directories that this server can read/write from

## Usage with Claude Desktop
Add this to your `claude_desktop_config.json`:

Note: you can provide sandboxed directories to the server by mounting them to `/projects`. Adding the `ro` flag will make the directory readonly by the server.

### Docker
Note: all directories must be mounted to `/projects` by default.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "--mount", "type=bind,src=/Users/username/Desktop,dst=/projects/Desktop",
        "--mount", "type=bind,src=/path/to/other/allowed/dir,dst=/projects/other/allowed/dir,ro",
        "--mount", "type=bind,src=/path/to/file.txt,dst=/projects/path/to/file.txt",
        "mcp/filesystem",
        "/projects"
      ]
    }
  }
}
```

### NPX


### Windows


#### Local

```json
"filesystem-extended": {
    "command": "node",
    "args": ["C:\\Projects\\mcp\\server\\system\\files\\mcp-filesystem-extended\\dist\\index.js", "C:\\Projects", "C:\\git", "C:\\git\\privadent\\privadent-synchronizer"]
}
```

## Build

Docker build:

```bash
docker build -t mcp/filesystem -f src/filesystem/Dockerfile .
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.