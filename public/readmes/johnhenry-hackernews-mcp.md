# MCP Server Template

A Template for createing a new MCP server.

Simply fill out the appropriate details in package.json.

Export tools, prompts, and resources from `tools.mjs`, `prompts.mjs`, and `resources.mjs` respectively.

## Features

- Execute arbitrary JavaScript code in a sandboxed environment.
- Time-limited execution (10 second default) to prevent runaway scripts.
- Debug mode for verbose logging.

## Installation

### Prerequisites

- node/npx

### Installation

Publish the package to npm is beyond the scope of this template, but once published you can install it using:

```json
{
  "mcpServers": {
    ...
    "<mcp server name>": {
      "command": "npx",
      "args": [ "-y", "<npm published package name>" ],
    }
  }
}
```

Or you can install it locally for development:

```json
{
  "mcpServers": {
    ...
    "<mcp server name>": {
      "command": "<path to node>",
      "args": [ "<this directory>/index.mjs" ],
    }
  }
}
```
