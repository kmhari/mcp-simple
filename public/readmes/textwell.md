# Textwell Write Tool (MCP Server)

A specialized MCP server designed exclusively for writing text to the Textwell application on macOS.

## Overview

This tool provides a straightforward way to write text to Textwell. 

## Features

The server provides a single tool: `write-text`

### Write Text Tool

Writes text to Textwell using specified modes:

- **Replace Mode** (default)
  - Replaces the entire content with new text
  - Use case: Complete content replacement

- **Insert Mode**
  - Inserts text at the current cursor position
  - Use case: Adding content within existing text

- **Add Mode**
  - Appends text to the end of current content
  - Use case: Adding new content while preserving existing text

## Limitations

- Write-only operations (no read capabilities)

## Development Setup

### Prerequisites

- Node.js v22.12.0 (managed by Volta)
- npm v10.9.0 (managed by Volta)
- macOS (for Textwell integration)

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd textwell-mcp
```

2. Install dependencies
```bash
npm install
```

3. Build the server
```bash
npm run build
```

## License

MIT
