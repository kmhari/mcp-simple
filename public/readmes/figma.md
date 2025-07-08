# mcp-figma

A Model Context Protocol (MCP) server for Figma API integration, designed to be used with Claude and other MCP-compatible AI assistants.

[![npm version](https://badge.fury.io/js/mcp-figma.svg)](https://www.npmjs.com/package/mcp-figma)

## Features

This MCP server provides access to Figma API functionality:

- File operations (get file, get nodes, get images)
- Comments management
- Team/project management
- Components and styles access
- Persistent API key storage

## Installation

### NPM Installation

```bash
# Install globally
npm install -g mcp-figma

# Or install locally in a project
npm install mcp-figma

# Update to latest version
npm update -g mcp-figma
```

## Usage with Claude

1. Add mcp-figma to your Claude configuration:

```json
"mcp-figma": {
  "command": "npx",
  "args": [
    "-y",
    "mcp-figma"
  ]
}
```

2. When using Claude, the first time you'll need to set your Figma API key:

```
Please use mcp-figma to set my Figma API key: figd_xxxxxxxxxxxxxxxxxxxxxxx
```

Your API key will be stored in `~/.mcp-figma/config.json` and will be automatically loaded in future sessions.

3. You can verify your API key is configured:

```
Please use mcp-figma to check my API key status
```

4. Then use any of the available Figma API functions:

```
Please use mcp-figma to get the file with key abc123
```

## Available Tools

The server provides the following tools:

- `set_api_key`: Set your Figma API personal access token (saved to config)
- `check_api_key`: Check if an API key is already configured
- `get_file`: Get a Figma file by key
- `get_file_nodes`: Get specific nodes from a Figma file
- `get_image`: Get images for nodes in a Figma file
- `get_image_fills`: Get URLs for images used in a Figma file
- `get_comments`: Get comments on a Figma file
- `post_comment`: Post a comment on a Figma file
- `delete_comment`: Delete a comment from a Figma file
- `get_team_projects`: Get projects for a team
- `get_project_files`: Get files for a project
- `get_team_components`: Get components for a team
- `get_file_components`: Get components from a file
- `get_component`: Get a component by key
- `get_team_component_sets`: Get component sets for a team
- `get_team_styles`: Get styles for a team
- `get_file_styles`: Get styles from a file
- `get_style`: Get a style by key

For detailed usage examples, see [USAGE.md](./USAGE.md).

## License

MIT