# MCP Filesystem Server

A Model Context Protocol (MCP) server implementation that provides filesystem access capabilities for AI models and applications.

## Overview

The MCP Filesystem Server enables AI models to securely list directory contents and interact with the filesystem through standardized JSON-RPC requests. It implements the Model Context Protocol (MCP) specification for interoperable AI tools.

## Features

- **Filesystem Access**: List directory contents on the host system
- **JSON-RPC Interface**: Compliant with the MCP specification
- **Secure Access Controls**: Resource access is limited to specific capabilities
- **Standard I/O Transport**: Communicates using stdio for easy integration

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-filesys.git
cd mcp-filesys

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage with Cursor or Ollama

### Configuration

1. Create a configuration file for your AI tool:

**For Ollama** (ollama-config.json):
```json
{
  "mcpServers": {
    "filesys": {
      "command": "node",
      "args": ["/Users/denizkarayusufoglu/Desktop/cursor-projects/mcp-filesys/dist/index.js"],
      "env": {
        "NODE_ENV": "production",
        "DEBUG": "mcp:*"
      }
    }
  }
}
```

**For Cursor** (cursor-mcp-config.json):
```json
{
  "mcpServers": {
    "filesys": {
      "command": "node",
      "args": ["/Users/denizkarayusufoglu/Desktop/cursor-projects/mcp-filesys/dist/index.js"],
      "env": {
        "NODE_ENV": "production",
        "DEBUG": "mcp:*"
      }
    }
  }
}
```

2. Set the environment variable to point to your configuration file:

```bash
# For Ollama
export OLLAMA_MCP_CONFIG=/Users/denizkarayusufoglu/Desktop/cursor-projects/mcp-filesys/ollama-config.json

# For Cursor
export CURSOR_MCP_CONFIG=/Users/denizkarayusufoglu/Desktop/cursor-projects/mcp-filesys/cursor-mcp-config.json
```

3. Add the environment variables to your shell configuration for persistence:

```bash
echo 'export OLLAMA_MCP_CONFIG=/Users/denizkarayusufoglu/Desktop/cursor-projects/mcp-filesys/ollama-config.json' >> ~/.zshrc
echo 'export CURSOR_MCP_CONFIG=/Users/denizkarayusufoglu/Desktop/cursor-projects/mcp-filesys/cursor-mcp-config.json' >> ~/.zshrc
```

## Available Resources

The MCP Filesystem Server provides the following resources:

| Resource URI | Description | Capabilities |
|--------------|-------------|--------------|
| `list-contents://` | Lists contents of a directory | `read` |
| `file://` | File access | `read`, `write`, `list` |

## Example Usage

### Direct Command Line Usage

You can interact with the MCP server directly using simple command-line pipes:

```bash
# List the contents of a directory
echo '{"jsonrpc":"2.0","id":1,"method":"resources/read","params":{"uri":"list-contents://","parameters":{"path":"/Users"}}}' | node dist/index.js
```

### Listing Directory Contents Example

Request:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "resources/read",
  "params": {
    "uri": "list-contents://",
    "parameters": {
      "path": "/Users/denizkarayusufoglu/Desktop"
    }
  }
}
```

Response:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "contents": [
      {
        "mimeType": "application/json",
        "text": "[{\"name\":\".DS_Store\",\"type\":\"file\",\"path\":\"/Users/denizkarayusufoglu/Desktop/.DS_Store\"},{\"name\":\".localized\",\"type\":\"file\",\"path\":\"/Users/denizkarayusufoglu/Desktop/.localized\"},{\"name\":\"cursor-projects\",\"type\":\"directory\",\"path\":\"/Users/denizkarayusufoglu/Desktop/cursor-projects\"}]"
      }
    ]
  }
}
```

## Development

```bash
# Clean build files
npm run clean

# Build the project
npm run build

# Start the server
node dist/index.js
```

## License

[MIT License](LICENSE) 
