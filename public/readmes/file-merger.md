# File Merger MCP Server

Simple utility to combine multiple files into one. Fast, secure, and easy to use.

## Features

- **Simple** - Merge any number of files with a single command
- **Fast** - Efficiently combines files of any size
- **Secure** - Only accesses directories you allow
- **Detailed** - Reports file sizes and merge summary

## API

### Tools

- **merge_files**
  - Inputs:
    - `inputPaths` (string[]): Files to merge
    - `outputPath` (string): Output file location
  - Returns:
    - Success message with merge details

- **list_allowed_directories**
  - Lists directories the server can access

## Usage with Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "file-merger": {
      "command": "npx",
      "args": [
        "-y",
        "@exoticknight/mcp-file-merger",
        "/path/to/allowed/dir"
      ]
    }
  }
}
```

## Installation

```bash
# Clone and install
git clone https://github.com/exoticknight/mcp-file-merger.git
cd mcp-file-merger
npm install
npm run build
```

## License

Apache License 2.0
