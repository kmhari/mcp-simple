# Filesystem MCP Server

Node.js server implementing Model Context Protocol (MCP) for filesystem operations.

## Features

- Advanced file operations:
  - Standard read/write with size limits
  - Streaming reads with position control
  - Smart append with duplication prevention
  - Automatic write optimization
- Directory operations:
  - Create/list/navigate directories
  - Recursive directory tree view
  - Depth-limited traversal
- File management:
  - Move files/directories
  - Search with pattern matching
  - Get detailed file metadata

**Note**: The server will only allow operations within directories specified via `args`.

## API

### Resources

- `file://system`: File system operations interface

### Advanced Features

#### Reading Strategy Selection
Choose the appropriate reading method based on your needs:
- Use `read_file` for small files (<1MB) to get complete content
- Use `stream_read_file` for:
  - Large files that exceed memory limits
  - When you need only a specific portion of a file
  - Reading from the end of files (logs, databases)
  - Processing files in manageable chunks

#### Negative Offset Reading
The `stream_read_file` tool supports negative offset values, allowing you to read from the end of files:
- Offset `-N` means "start reading N bytes from the end of file"
- Perfect for reading the most recent entries in log files
- System automatically calculates the correct position in the file
- If the absolute value of negative offset exceeds file size, reading starts from the beginning

#### Write Optimization
The server automatically optimizes file writing operations based on:
- Content size (large content uses smart_append)
- File size (large files use smart_append)
- File existence (new vs existing files)
- Write intent (full vs partial overwrite)

#### Content Completion Marker
Content can include completion markers ("// END_OF_CONTENT") to indicate complete writes.
This helps the system automatically detect and handle incomplete content during writes.

### Tools

- **read_file**
  - Read complete contents of a file
  - Input: `path` (string)
  - Reads complete file contents with UTF-8 encoding
  - For files larger than 1MB, only the first 1MB is returned with a warning
  - Best for smaller files where you need the complete content

- **stream_read_file**
  - Read large files with precise control over reading positions
  - Perfect for:
    - Processing large files in manageable chunks
    - Extracting specific portions without loading entire file
    - Reading from the end of files (like logs)
    - Reading files too large for standard read_file
  - Inputs:
    - `path` (string): File to read
    - `offset` (number, optional): Starting position in bytes (default: 0)
      - Can be negative to read from end of file (e.g., -1000 reads last 1000 bytes)
      - If abs(offset) exceeds file size, reads from beginning
    - `limit` (number, optional): Maximum bytes to read
    - `encoding` (string, optional): Character encoding (default: 'utf8')
    - `chunkSize` (number, optional): Size of chunks for streaming (default: 512KB)
  - Returns selected portion of the file with info about read size and position
  - Examples:
    - Read last 1000 bytes: `offset: -1000`
    - Read specific section: `offset: 5000, limit: 2000`
    - Read from end with limit: `offset: -5000, limit: 1000` (1000 bytes starting 5000 bytes from end)

- **read_multiple_files**
  - Read multiple files simultaneously
  - Inputs:
    - `paths` (string[]): Array of file paths
    - `logLevel` (string, optional): Debug level ('debug', 'info', 'warn', 'error')
  - Failed reads won't stop the entire operation
  - For files larger than 1MB, only first 1MB is returned

- **write_file**
  - Create new file or overwrite existing (exercise caution with this)
  - Inputs:
    - `path` (string): File location
    - `content` (string): File content
  - With optimization enabled, may automatically select optimal write method
  - Complete overwrite of existing files

- **append_file**
  - Append content to the end of a file (or create if doesn't exist)
  - Inputs:
    - `path` (string): File location
    - `content` (string): Content to append
  - Safer than write_file when you want to preserve existing content
  - With optimization enabled, may use smart_append for large content

- **smart_append_file**
  - Intelligently append content without duplication
  - Inputs:
    - `path` (string): File location
    - `content` (string): Content to append
    - `chunkSize` (number, optional): Initial buffer size for overlap detection (default: 1024)
    - `logLevel` (string, optional): Debug level ('debug', 'info', 'warn', 'error')
  - Features:
    - Detects overlapping content between file end and new content beginning
    - Only appends non-overlapping content to avoid duplication
    - Uses dynamic buffer sizing for reliable overlap detection
    - Employs optimized algorithms (Rabin-Karp for large chunks)
  - Perfect for:
    - Resilient logging where writes may be interrupted
    - Incremental data collection
    - Ensuring content integrity during appends

- **edit_file**
  - Make selective edits using advanced pattern matching and formatting
  - Features:
    - Line-based and multi-line content matching
    - Whitespace normalization with indentation preservation
    - Multiple simultaneous edits with correct positioning
    - Indentation style detection and preservation
    - Git-style diff output with context
    - Preview changes with dry run mode
  - Inputs:
    - `path` (string): File to edit
    - `edits` (array): List of edit operations
      - `oldText` (string): Text to search for (can be substring)
      - `newText` (string): Text to replace with
    - `dryRun` (boolean): Preview changes without applying (default: false)
  - Returns detailed diff and match information for dry runs, otherwise applies changes
  - Best Practice: Always use dryRun first to preview changes before applying them

- **create_directory**
  - Create new directory or ensure it exists
  - Input: `path` (string)
  - Creates parent directories if needed
  - Succeeds silently if directory exists

- **list_directory**
  - List directory contents with [FILE] or [DIR] prefixes
  - Inputs:
    - `path` (string): Directory to list
    - `maxDepth` (number, optional): Maximum depth for recursive listing (default: 3)
    - `maxItems` (number, optional): Maximum items to return (default: 1000)

- **move_file**
  - Move or rename files and directories
  - Inputs:
    - `source` (string)
    - `destination` (string)
  - Fails if destination exists

- **search_files**
  - Recursively search for files/directories
  - Inputs:
    - `path` (string): Starting directory
    - `pattern` (string): Search pattern
    - `excludePatterns` (string[]): Exclude any patterns. Glob formats are supported.
  - Case-insensitive matching
  - Returns full paths to matches

- **directory_tree**
  - Get recursive tree view of files and directories as JSON structure
  - Inputs:
    - `path` (string): Starting directory
    - `maxDepth` (number, optional): Maximum depth for tree (default: 5)
    - `maxItems` (number, optional): Maximum items to return (default: 5000)
  - Returns structured JSON with type, name, and children properties
  - Files have no children array, directories always have children array

- **get_file_info**
  - Get detailed file/directory metadata
  - Input: `path` (string)
  - Returns:
    - Size
    - Creation time
    - Modified time
    - Access time
    - Type (file/directory)
    - Permissions

- **list_allowed_directories**
  - List all directories the server is allowed to access
  - No input required
  - Returns:
    - Directories that this server can read/write from

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

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/Desktop",
        "/path/to/other/allowed/dir"
      ]
    }
  }
}
```

## Build

Docker build:

```bash
docker build -t mcp/filesystem -f src/filesystem/Dockerfile .
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
