# mcp-cli-exec MCP Server

A powerful CLI command execution MCP server that enables running shell commands with structured output. This package focuses specifically on command execution functionality, differentiating it from other MCP CLI tools.

## Features

### Tools

#### cli-exec-raw
Execute a raw CLI command and return structured output
- Takes a command string and optional timeout (default: 5 minutes)
- Returns detailed execution results including stdout, stderr, exit code
- Handles errors gracefully with structured error responses

#### cli-exec
Execute one or more CLI commands in a specific working directory
- Supports single commands, && chained commands, or array of commands
- All commands execute in the specified working directory
- Returns detailed results for each command:
  - Success/failure status
  - Exit code
  - stdout and stderr (ANSI codes stripped)
  - Execution duration
  - Working directory
- Stops on first command failure
- Optional timeout per command (default: 5 minutes)

Note: Due to execution context limitations, each command runs independently. Directory changes (cd) within commands do not affect subsequent commands. All commands execute in the initially specified working directory.

### Output Format

Commands return structured results including:
- Success/failure status
- Exit code
- stdout and stderr (with ANSI codes stripped)
- Execution duration
- Working directory
- Detailed error information if applicable

### Example Usage

#### cli-exec-raw
Simple command execution:
```json
{
  "command": "echo Hello World"
}
```

With timeout:
```json
{
  "command": "long-running-script.sh",
  "timeout": 300000
}
```

#### cli-exec
Single command in specific directory:
```json
{
  "workingDirectory": "/path/to/project",
  "commands": "npm install"
}
```

Multiple commands (all run in the same working directory):
```json
{
  "workingDirectory": "C:\\project",
  "commands": [
    "dir /b",
    "npm run build"
  ]
}
```

## Installation

Optionally install from npm:

```bash
npm install -g mcp-cli-exec
# or with pnpm
pnpm add -g mcp-cli-exec
```
Or just use npx in your configuration

### For Cline VSCode Extension

Add to `%APPDATA%/Code - Insiders/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "mcp-cli-exec": {
      "command": "npx",
      "args": ["-y", "mcp-cli-exec"]
    }
  }
}
```

### For Claude Desktop

Add to the appropriate config file:

Windows: `%APPDATA%/Claude/claude_desktop_config.json`
MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mcp-cli-exec": {
      "command": "npx",
      "args": ["-y", "mcp-cli-exec"]
    }
  }
}
```

### Special Windows Configuration

If you encounter the ENOENT spawn npx issue on Windows, use this alternative configuration that specifies the full paths:

```json
{
  "mcpServers": {
    "mcp-cli-exec": {
      "command": "C:\\Users\\jim\\AppData\\Roaming\\nvm\\v22.1.0\\node.exe",
      "args": [
        "C:\\Users\\jim\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npx-cli.js",
        "-y",
        "mcp-cli-exec"
      ]
    }
  }
}
```

## Development

Install dependencies:
```bash
pnpm install
```

Build the server:
```bash
pnpm run build
```

For development with auto-rebuild:
```bash
pnpm run watch
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. The MCP Inspector provides helpful debugging tools:

```bash
pnpm run inspector
```

This will provide a URL to access the inspector in your browser, where you can:
- View all MCP messages
- Inspect request/response payloads
- Test tools interactively
- Monitor server state

## Error Handling

The server includes comprehensive error handling:
- Input validation for all tool parameters
- Structured error responses
- Command timeout handling
- Working directory validation
- ANSI code stripping for clean output

## Technical Details

- Built with TypeScript and the MCP SDK
- Uses execa for reliable command execution
- Default command timeout: 5 minutes
- Supports Windows and Unix-like systems (use appropriate commands for your OS, e.g., 'dir' vs 'ls')
- Executes commands sequentially, stopping on first failure
- Each command runs independently in the specified working directory
