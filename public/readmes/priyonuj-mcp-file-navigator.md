# MCP File Server

A secure file server implementation using the Model Context Protocol (MCP) that provides a standardized interface for file system operations.

## Overview

MCP File Server is a Node.js application that implements an MCP server specifically for file operations. It provides a secure and standardized way to interact with the file system through the MCP protocol, suitable for integration with AI assistants like Claude and developer tools like Cursor.

The server offers the following tools:

### File Operations
- `list_files`: Lists files in a specified directory
- `read_file`: Reads the content of a file
- `write_file`: Writes content to a file
- `delete_file`: Deletes a file or directory
- `set_base_directory`: Sets the base directory for file operations directly from chat
- `get_base_directory`: Gets the current base directory

### Git Operations
- `git_command`: Executes git commands in the base directory

## Project Structure

The project follows a modular architecture with services organized by responsibility:

```
mcp-file-server/
├── services/               # Service modules
│   ├── configService.js    # Configuration management
│   ├── fileService.js      # File system operations
│   ├── gitService.js       # Git operations
│   ├── loggerService.js    # Logging functionality
│   └── toolService.js      # MCP tool registration
├── files/                  # Default storage directory
├── log/                    # Log files
├── examples/               # Example scripts and usage demos
├── mcp_server.js           # Main application entry point
├── package.json            # Project metadata and dependencies
└── README.md               # Documentation
```

## Security Features

- Robust path validation to prevent directory traversal attacks
- Careful normalization and resolution of file paths
- Command validation to prevent command injection
- Operations logged to a dedicated log file for auditability
- Secure handling of relative paths

## Prerequisites

- Node.js >= 16.0.0
- npm or yarn package manager
- Git (for git_command functionality)

## Installation

1. Clone this repository:
   ```
   git clone <repository-url>
   cd mcp-file-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Configuration

### Environment Variables

- `BASE_DIRECTORY`: (Optional) Path to the base directory for file operations. If not specified, defaults to the `files` directory in the project root.

### Directory Structure

- `/files`: Default base directory for file operations
- `/log`: Contains the debug log file

## Usage

### Starting the Server

```
npm start
```

For development with auto-reload:

```
npm run dev
```

The server will run and connect to standard input/output for communication.

### Setting Base Directory from Chat

One of the key features of this implementation is the ability to set the base directory directly from the chat interface. This means you don't need to restart the server or modify configuration files to change where files are stored and accessed.

Simply ask the AI assistant to set the base directory, for example:
- "Set the base directory to C:/Users/username/Documents"
- "Change the file storage location to /home/user/data"

The assistant will use the `set_base_directory` tool to update the location. You can verify the current location at any time by asking for the current base directory.

### Using Git Commands

The server allows you to execute Git commands directly from the chat interface. Simply ask the AI assistant to run a git command, for example:
- "Run git status"
- "Execute git log --oneline"
- "Create a new branch with git checkout -b feature/new-feature"

You can also specify which shell to use:
- "Using PowerShell, run git status"
- "In bash, execute git diff"
- "With cmd, run git pull origin main"

### Configuration Object Example

Below is an example configuration object for integrating the MCP File Server with Claude Desktop or Cursor:

```json
{
  "mcpServers": {
    "file-server": {
      "command": "node",
      "args": ["/path/to/mcp-file-server/mcp_server.js"],
      "disabled": false,
      "autoApprove": ["list_files", "read_file", "write_file", "delete_file", "set_base_directory", "get_base_directory", "git_command"]
    }
  }
}
```

**Explanation of configuration properties:**

- `mcpServers`: Container for all MCP server configurations
- `file-server`: A unique identifier for this particular MCP server
- `command`: The command to execute (in this case, `node` to run the JavaScript file)
- `args`: Array of arguments to pass to the command (the path to your server script)
- `disabled`: Whether this server is currently disabled (false = enabled)
- `autoApprove`: List of tools that should be auto-approved without requiring user confirmation

## Extending the Server

The modular architecture makes it easy to extend the server with new functionality:

1. Create a new service in the `services/` directory
2. Add your service's registration to the `toolService.js` file
3. Update the main `mcp_server.js` file to initialize your service

For example, to add a new compression service:
- Create `services/compressionService.js`
- Add a `registerCompressionTools()` method to `toolService.js`
- Update the main server to initialize your compression service

## API Reference

### set_base_directory

Sets a new base directory for file operations.

**Parameters:**
- `path`: The absolute path to the new base directory

**Returns:**
- Confirmation message

### get_base_directory

Gets the current base directory path.

**Parameters:**
- None

**Returns:**
- The current base directory path

### list_files

Lists files in a specified directory.

**Parameters:**
- `directory`: (Optional) Directory path to list (defaults to root)

**Returns:**
- A formatted list of files and directories

### read_file

Reads the content of a file.

**Parameters:**
- `path`: Path to the file to read

**Returns:**
- The content of the file

### write_file

Writes content to a file.

**Parameters:**
- `path`: Path to the file to write
- `content`: Content to write to the file

**Returns:**
- Confirmation message

### delete_file

Deletes a file or directory.

**Parameters:**
- `path`: Path to the file or directory to delete

**Returns:**
- Confirmation message

### git_command

Executes a git command in the base directory.

**Parameters:**
- `command`: Git command to execute (without the 'git' prefix)
- `shell`: (Optional) Shell to use for execution (cmd, powershell, bash)

**Returns:**
- Command output (stdout and stderr)

## Troubleshooting

Check the log file at `log/mcp_debug.log` for detailed information about server operations and any errors that might occur.

Common issues:

1. **Path Access Errors**: Ensure the BASE_DIRECTORY is set to a location that the process has permission to access.
2. **Connection Refused**: Make sure the server is running before attempting to connect.
3. **Tool Not Found**: Verify that the tool names in your configuration match exactly with those defined in the server.
4. **Port Conflicts**: If you're running multiple MCP servers, ensure they're using different ports.
5. **Invalid Base Directory**: When setting a base directory from chat, ensure you provide an absolute path (not relative).
6. **Git Command Errors**: Ensure Git is installed and the base directory is a valid Git repository when using git commands.

## Contributing

We welcome contributions to improve the MCP File Server! Here's how you can help:

### Ways to Contribute

- **Bug Reports**: Submit detailed bug reports with steps to reproduce
- **Feature Requests**: Suggest new features or improvements
- **Documentation**: Help improve or extend the documentation
- **Code Contributions**: Submit pull requests with bug fixes or new features

### Development Process

1. **Fork the Repository**: Create your own fork of the project
2. **Create a Branch**: Make your changes in a new branch
3. **Follow Coding Standards**: Maintain the existing code style
4. **Write Tests**: Add tests for new features or bug fixes
5. **Documentation**: Update documentation to reflect your changes
6. **Submit a Pull Request**: Open a PR with a clear description of the changes

### Pull Request Guidelines

- Keep PRs focused on a single feature or bug fix
- Include a clear description of what the changes do and why
- Make sure all tests pass
- Update relevant documentation

### Reporting Issues

When reporting issues, please include:
- A clear description of the problem
- Steps to reproduce the issue
- Expected behavior vs. actual behavior
- Environment details (OS, Node.js version, etc.)
