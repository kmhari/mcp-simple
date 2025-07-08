# Shell MCP Server

A Node.js implementation of the Model Context Protocol (MCP) that provides secure shell command execution capabilities. This server allows AI models to execute shell commands in a controlled environment with built-in security measures. Easily integrates with [Claude Desktop](https://claude.ai/download) for connecting Claude with your shell.

## Features

- MCP-compliant server implementation
- Secure command execution with blacklist protection
- Command existence validation
- Standard I/O based transport
- Error handling and graceful shutdown

## Installation

Run `npx mcp-shell`.

To add it to Claude Desktop, run `npx mcp-shell config`. Or add `npx -y mcp-shell` to your config manually.

Start (or restart) [Claude Desktop](https://claude.ai/download) and you should see the MCP tool listed on the landing page.

## Security Features

The server implements several security measures:

1. Command Blacklisting

   - Prevents execution of dangerous system commands
   - Blocks access to critical system modifications
   - Protects against file system destruction
   - Prevents privilege escalation

2. Command Validation
   - Verifies command existence before execution
   - Validates against the blacklist
   - Returns clear error messages for invalid commands

## Available Tools

The server provides one tool:

### run_command

Executes a shell command and returns its output.

**Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "command": { "type": "string" }
  }
}
```

**Response:**

- Success: Command output as plain text
- Error: Error message as plain text

## Blacklisted Commands

The following command categories are blocked for security:

- File System Destruction Commands (rm, rmdir, del)
- Disk/Filesystem Commands (format, mkfs, dd)
- Permission/Ownership Commands (chmod, chown)
- Privilege Escalation Commands (sudo, su)
- Code Execution Commands (exec, eval)
- System Communication Commands (write, wall)
- System Control Commands (shutdown, reboot, init)

## Error Handling

The server includes comprehensive error handling:

- Command not found errors
- Blacklisted command errors
- Execution errors
- MCP protocol errors
- Graceful shutdown on SIGINT

## Implementation Details

The server is built using:

- Model Context Protocol SDK
- StdioServerTransport for communication
- execa for command execution
- command-exists for command validation

## Development

To modify the security settings, you can:

1. Edit the `BLACKLISTED_COMMANDS` set to adjust blocked commands
2. Modify the `validateCommand` function to add additional validation rules
3. Enhance the command parsing logic in the `CallToolRequestSchema` handler
