# MCP File Server

A Model Context Protocol (MCP) server implementation providing file system operations through a standardized interface.

## Overview

The MCP File Server enables AI models to perform file operations on the local file system through a standardized API. It's built using the [Model Context Protocol](https://github.com/ModelContextProtocol/mcp) SDK and provides tools for reading, creating, and listing files.

## Features

- **Create Files**: Create new files with specified content
- **Read Files**: Read the contents of existing files
- **List Directory Contents**: List files and directories with detailed information
- **Performance Monitoring**: Built-in Sentry integration for error tracking and performance monitoring

## Installation

```bash
npm install
```

## Usage

Start the MCP File Server:

```bash
node src/index.js
```

The server communicates through stdin/stdout using the MCP protocol.

## Available Tools

### createfile

Creates a new file at the specified path with the provided content.

**Parameters:**
- `filePath`: Path where the file should be created
- `content`: Content to write to the file

**Returns:**
- Success message with file path and size information

### readfile

Reads the content of a file at the specified path.

**Parameters:**
- `filePath`: Path to the file to read

**Returns:**
- The content of the file

### listfiles

Lists files and directories at the specified path.

**Parameters:**
- `path`: Directory path to list contents from

**Returns:**
- A markdown table containing file names, sizes, and types

## Environment Variables

- `SENTRY_DSN`: Sentry Data Source Name for error tracking (optional)

## Dependencies

- `@modelcontextprotocol/sdk`: The MCP SDK package
- `zod`: Schema validation
- `@sentry/node`: Error tracking and performance monitoring

## Examples

Examples of how to call these tools through the MCP protocol:

```json
{
  "name": "createfile",
  "params": {
    "filePath": "example/test.txt",
    "content": "Hello, world!"
  }
}
```

```json
{
  "name": "readfile",
  "params": {
    "filePath": "example/test.txt"
  }
}
```

```json
{
  "name": "listfiles",
  "params": {
    "path": "example"
  }
}
``` 