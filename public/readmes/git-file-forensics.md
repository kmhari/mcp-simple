# Git File Forensics MCP

An MCP tool for deep git file-level forensics that helps get detailed insights into file histories, changes, and patterns, focusing on individual file analysis rather than repository-wide operations.

## Installation

1. Clone and build the server:
```bash
git clone [repository-url]
cd git-file-forensics
npm install
npm run build
```

2. Add to your MCP settings (`~/Library/Application Support/Code/User/globalStorage/david-dafu-dev.dafu/settings/cline_mcp_settings.json`):
```json
{
  "mcpServers": {
    "git-file-forensics": {
      "command": "/opt/homebrew/bin/node",
      "args": ["/path/to/git-file-forensics/build/index.js"],
      "alwaysAllow": []
    }
  }
}
```

## Available Tools

### 1. track_file_versions
Tracks complete version history of a specific file, including renames and moves.

```json
{
  "method": "tools/call",
  "params": {
    "name": "track_file_versions",
    "arguments": {
      "repoPath": "/path/to/repo",
      "file": "path/to/file",
      "outputPath": "output.json"
    }
  }
}
```

### 2. analyze_file_diff
Analyzes specific changes between any two versions of a file.

```json
{
  "method": "tools/call",
  "params": {
    "name": "analyze_file_diff",
    "arguments": {
      "repoPath": "/path/to/repo",
      "file": "path/to/file",
      "versions": {
        "from": "commit-hash-1",
        "to": "commit-hash-2"
      },
      "outputPath": "output.json"
    }
  }
}
```

### 3. analyze_file_context
Analyzes broader context of file changes in a specific commit.

```json
{
  "method": "tools/call",
  "params": {
    "name": "analyze_file_context",
    "arguments": {
      "repoPath": "/path/to/repo",
      "file": "path/to/file",
      "commit": "commit-hash",
      "outputPath": "output.json"
    }
  }
}
```

### 4. analyze_file_semantics
Analyzes semantic changes and patterns in file history.

```json
{
  "method": "tools/call",
  "params": {
    "name": "analyze_file_semantics",
    "arguments": {
      "repoPath": "/path/to/repo",
      "file": "path/to/file",
      "outputPath": "output.json"
    }
  }
}
```

## Output Format

All tools output JSON files containing:
- Detailed analysis results
- Summary statistics
- Change patterns and relationships
- Risk assessments (where applicable)

## Requirements

- Node.js
- Git (must be installed and accessible)
- MCP SDK

## License

This project is licensed under the Apache License, Version 2.0 - see the [LICENSE.txt](LICENSE.txt) file for details.

Copyright davidorex.ai. Licensed under the Apache License, Version 2.0; you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

