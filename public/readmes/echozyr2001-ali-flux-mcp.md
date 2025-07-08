# Ali-Flux MCP Server

[中文文档](README-zh.md)

A Model Context Protocol server for Alibaba Cloud DashScope API

This is a TypeScript-based MCP server that provides functionality to interact with Alibaba Cloud DashScope API for generating images and saving them locally. It demonstrates core MCP concepts by providing:

- Tools for generating images using Alibaba Cloud DashScope API
- Tools for checking task status
- Tools for downloading generated images and saving them locally

## Features

### Tools
- `generate_image` - Generate images using Alibaba Cloud DashScope API
  - Takes prompt as required parameter
  - Optional parameters: size, seed, steps
  - Submits image generation task to DashScope API

- `check_task_status` - Check image generation task status
  - Takes task_id as required parameter
  - Returns the current status of the image generation task

- `download_image` - Download generated images and save them locally
  - Takes task_id as required parameter
  - Optional parameter: save_path for custom save location (must be an absolute path)
  - Optional parameter: base_dir for resolving relative paths (defaults to WORK_DIR environment variable)
  - Downloads all generated images and saves them to the specified directory

## Development

### Prerequisites
- Node.js and npm
- Alibaba Cloud DashScope API key

### Environment Variables
- `DASHSCOPE_API_KEY`: Your Alibaba Cloud DashScope API key
- `SAVE_DIR`: Directory to save generated images (default: ~/Desktop/flux-images)
- `MODEL_NAME`: DashScope model name (default: flux-merged)
- `WORK_DIR`: Work directory (default: process.cwd())

### Setup
Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

## Installation

### Configuration
To use with Claude Desktop or other MCP-compatible clients, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ali-flux": {
      "command": "/path/to/ali-flux/build/index.js",
      "env": {
        "DASHSCOPE_API_KEY": "your-api-key-here",
        "SAVE_DIR": "/custom/save/path" // Optional
      }
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
