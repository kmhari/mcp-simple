# Shell Command MCP Server

Go server implementing Model Context Protocol (MCP) for executing shell commands.

## Features

- Execute shell commands using bash or zsh
- List previous command executions
- Safety features to limit allowed commands
- Configure allowed command set for security

**Note**: The server will only allow execution of commands specified via the allowedCommands parameter or all commands if configured with "*".

## API

### Tools

- **execute_command**
  - Execute a shell command
  - Input: 
    - `command` (string): The command to execute
    - `shell` (string, optional): The shell to use (bash or zsh, defaults to bash)
  - Output:
    - Command output with both stdout and stderr
    - Exit code
    - Execution time

- **list_recent_commands**
  - List recently executed commands
  - Input: 
    - `limit` (integer, optional): Number of commands to return (defaults to 10)
  - Output:
    - List of recently executed commands with timestamps and status

- **list_allowed_commands**
  - List all commands that the server is allowed to execute
  - No input required
  - Returns:
    - List of allowed commands or "*" if all commands are allowed

## Usage with Claude Desktop
Install the server
```bash
go install github.com/gamunu/mcp-unix-shell
```

Add this to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "shell": {
      "command": "mcp-unix-shell",
      "args": [
        "--allowed-commands=ls,cat,echo,find"
      ]
    }
  }
}
```

To allow all commands (use with caution):
```json
{
  "mcpServers": {
    "shell": {
      "command": "mcp-unix-shell",
      "args": [
        "--allowed-commands=*"
      ]
    }
  }
}
```

## Security Considerations

When using this MCP server, please consider:

1. Only allow commands you trust - a restrictive allowlist is recommended
2. Avoid allowing commands that could modify system settings or access sensitive data
3. The server runs with the permissions of the user running Claude Desktop
4. Command output is sent back to the LLM, so be mindful of sensitive information

## License

This MCP server is licensed under the Apache License 2.0.
