# shadow-cljs-mcp

[![npm version](https://badge.fury.io/js/shadow-cljs-mcp.svg)](https://badge.fury.io/js/shadow-cljs-mcp)

A Model Context Protocol (MCP) server that monitors shadow-cljs builds and provides real-time build status updates.

## Installation

Add the following to your Cline/Cursor/Claude whatever settings:
```json
{
  "mcpServers": {
    "shadow-cljs-mcp": {
      "command": "npx",
      "args": [
        "shadow-cljs-mcp"
      ],
      "disabled": false,
      "autoApprove": [],
      "timeout": 60
    }
  }
}
```
With optional server location
```json
{
  "mcpServers": {
    "shadow-cljs-mcp": {
      "command": "npx",
      "args": [
        "shadow-cljs-mcp",
        "--host",
        "localhost",
        "--port",
        "9630"
      ],
      "disabled": false,
      "autoApprove": [],
      "timeout": 60
    }
  }
}
```

The `--host` and `--port` arguments are optional. If not provided, the server will default to connecting to `localhost:9630`.

## Overview

This MCP server connects to a running shadow-cljs instance and tracks build progress, failures, and completions. It provides an MCP tool that LLMs can use to verify build status after making changes to ClojureScript files.

## LLM Integration

### Adding to Your LLM Notes

Add the following to your LLM's notes file (e.g., CLAUDE.md, cursorrules.md):

```markdown
After any edits to ClojureScript files, use the shadow-cljs-mcp server's get_last_build_status tool to verify the build succeeded:

<use_mcp_tool>
<server_name>shadow-cljs-mcp</server_name>
<tool_name>get_last_build_status</tool_name>
<arguments>
{}
</arguments>
</use_mcp_tool>

This will show:
- Build status (completed/failed)
- Which files were compiled
- Any errors or warnings
- Build duration and metrics
```

## Example Tool Response

Successful build:
```json
{
  "status": "completed",
  "resources": 317,
  "compiled": 1,
  "warnings": 0,
  "duration": 0.609,
  "compiledFiles": [
    "path/to/your/file.cljs (505ms)"
  ]
}
```

Failed build:
```json
{
  "status": "failed",
  "message": "Build failed",
  "details": {
    // Error information
  }
}
```

## Usage Notes

- LLMs should call get_last_build_status after each ClojureScript file edit
- Compilation errors will be shown in detail for easy debugging
- Successful builds show which files were compiled and how long they took
- Make sure shadow-cljs is running before starting this server

## Requirements
- Running shadow-cljs instance (defaults to localhost:9630 if not configured otherwise)
