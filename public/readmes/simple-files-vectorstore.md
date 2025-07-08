# @lishenxydlgzs/simple-files-vectorstore

A Model Context Protocol (MCP) server that provides semantic search capabilities across files. This server watches specified directories and creates vector embeddings of file contents, enabling semantic search across your documents.

## Installation & Usage
Add to your MCP settings file:
```json
{
  "mcpServers": {
    "files-vectorstore": {
      "command": "npx",
      "args": [
        "-y",
        "@lishenxydlgzs/simple-files-vectorstore"
      ],
      "env": {
        "WATCH_DIRECTORIES": "/path/to/your/directories"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

MCP settings file locations:
- VSCode Cline Extension: `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
- Claude Desktop App: `~/Library/Application Support/Claude/claude_desktop_config.json`

## Configuration

The server requires configuration through environment variables:

### Required Environment Variables

You must specify directories to watch using ONE of the following methods:

- `WATCH_DIRECTORIES`: Comma-separated list of directories to watch
- `WATCH_CONFIG_FILE`: Path to a JSON configuration file with a `watchList` array

Example using WATCH_DIRECTORIES:
```json
{
  "mcpServers": {
    "files-vectorstore": {
      "command": "npx",
      "args": [
        "-y",
        "@lishenxydlgzs/simple-files-vectorstore"
      ],
      "env": {
        "WATCH_DIRECTORIES": "/path/to/dir1,/path/to/dir2"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

Example using WATCH_CONFIG_FILE:
```json
{
  "mcpServers": {
    "files-vectorstore": {
      "command": "npx",
      "args": [
        "-y",
        "@lishenxydlgzs/simple-files-vectorstore"
      ],
      "env": {
        "WATCH_CONFIG_FILE": "/path/to/watch-config.json"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

The watch config file should have the following structure:
```json
{
  "watchList": [
    "/path/to/dir1",
    "/path/to/dir2",
    "/path/to/specific/file.txt"
  ]
}
```

### Optional Environment Variables

- `CHUNK_SIZE`: Size of text chunks for processing (default: 1000)
- `CHUNK_OVERLAP`: Overlap between chunks (default: 200)
- `IGNORE_FILE`: Path to a .gitignore style file to exclude files/directories based on patterns

Example with all optional parameters:

```json
  {
    "mcpServers": {
      "files-vectorstore": {
        "command": "npx",
        "args": [
          "-y",
          "@lishenxydlgzs/simple-files-vectorstore"
        ],
        "env": {
          "WATCH_DIRECTORIES": "/path/to/dir1,/path/to/dir2",
          "CHUNK_SIZE": "2000",
          "CHUNK_OVERLAP": "500",
          "IGNORE_FILE": "/path/to/.gitignore"
        },
        "disabled": false,
        "autoApprove": []
      }
    }
  }
  ```
## MCP Tools

This server provides the following MCP tools:

### 1. search

Perform semantic search across indexed files.

Parameters:
- `query` (required): The search query string
- `limit` (optional): Maximum number of results to return (default: 5, max: 20)

Example response:
```json
[
  {
    "content": "matched text content",
    "source": "/path/to/file",
    "fileType": "markdown",
    "score": 0.85
  }
]
```

### 2. get_stats

Get statistics about indexed files.

Parameters: None

Example response:
```json
{
  "totalDocuments": 42,
  "watchedDirectories": ["/path/to/docs"],
  "processingFiles": []
}
```

## Features

- Real-time file watching and indexing
- Semantic search using vector embeddings
- Support for multiple file types
- Configurable chunk size and overlap
- Background processing of files
- Automatic handling of file changes and deletions

## Repository

[GitHub Repository](https://github.com/lishenxydlgzs/simple-files-vectorstore)
