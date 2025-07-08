# PermShell MCP

A Model Context Protocol (MCP) server for executing shell commands with permission notifications.

## Features

- Execute shell commands with explicit permissions through growl notifications
- Built on the Model Context Protocol for standardized LLM tools
- Multiple safeguards to prevent unauthorized command execution
- Transparent permission dialog shows exactly what commands will be executed

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/perm-shell-mcp.git
cd perm-shell-mcp

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### As a standalone tool

```bash
# Start the server directly
npm start
```

### With Claude Desktop

Add the following configuration to your Claude Desktop configuration file:

```json
{
  "mcpServers": {
    "permshell": {
      "command": "node",
      "args": ["/path/to/perm-shell-mcp/dist/index.js"]
    }
  }
}
```

### Available Tools

#### execute-command

Executes a shell command with permission.

Example:
```
Can you list the files in my home directory?
```

#### system-info

Retrieves system information including OS, uptime, memory, disk, and CPU.

Example:
```
What's my system information?
```

## Security

- All commands require explicit permission through desktop notifications
- Commands display with their working directory for full transparency
- Timeout limits prevent runaway processes
- Input sanitization prevents command injection

## Development

```bash
# Run in watch mode for development
npm run dev
```
