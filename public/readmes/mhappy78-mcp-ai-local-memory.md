# MCP File Management Server

This server provides MCP (Model Context Protocol) tools for managing files on your local system. It allows you to create, read, update, and delete files through Claude or other MCP-compatible clients.

## Features

- List files and directories
- Read file contents
- Create and edit text files
- Create directories
- Delete files and directories
- Search for files by name, extension, or content

## Installation and Setup

### Requirements

- Node.js 16.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Environment Variables

You can set these in your MCP configuration:

```
PORT=8000                  # Server port (default: 8000)
STORAGE_DIR=./storage      # File storage path (default: ./storage)
```

### Running

```bash
# Run directly
node server.js

# Run in development mode (with nodemon)
npm run dev
```

## MCP Configuration

Add the following to your MCP client configuration:

```json
{
    "mcpServers": {
        "fileManager": {
            "command": "node",
            "args": ["D:\\YourPath\\mcp_server\\server.js"],
            "env": {
                "PORT": "8000",
                "STORAGE_DIR": "D:\\YourPath\\mcp_server\\storage"
            }
        }
    }
}
```

**Important**: 
- Always use absolute paths in the configuration
- Replace `D:\\YourPath\\mcp_server` with the actual full path to your server
- Make sure the `STORAGE_DIR` is also an absolute path
- Use double backslashes (`\\`) for Windows paths in the JSON configuration

## Available Tools

### list_files

List files and directories in a specified directory.

Parameters:
- `directory` (optional): The directory path to list files from, relative to storage directory

### read_file

Read the contents of a text file.

Parameters:
- `filePath`: The path of the file to read, relative to storage directory

### write_file

Create or update a text file.

Parameters:
- `filePath`: The path of the file to write, relative to storage directory
- `content`: The content to write to the file

### create_directory

Create a new directory.

Parameters:
- `directoryPath`: The path of the directory to create, relative to storage directory

### delete_item

Delete a file or directory.

Parameters:
- `itemPath`: The path of the file or directory to delete, relative to storage directory
- `recursive` (optional): Whether to recursively delete directories (default: true)

### search_files

Search for files in the storage directory.

Parameters:
- `directory` (optional): The directory to search in, relative to storage directory
- `filename` (optional): The filename or pattern to search for
- `extension` (optional): The file extension to search for
- `contentSearch` (optional): Text to search for within file contents
- `recursive` (optional): Whether to search subdirectories recursively (default: true)

## Security Considerations

- This server is designed for use in local development environments.
- The server prevents access outside the `STORAGE_DIR` path.
- Additional security measures are required for production environments.

## Debugging

If you encounter connection issues:

1. **Check Paths**
   - Ensure all paths in configuration are absolute paths
   - Verify the server.js file exists at the specified path
   - Check if the storage directory exists and is accessible

2. **Check Logs**
   - Look for error messages in Claude Desktop logs
   - Check if the server process is running
   - Verify there are no permission issues

3. **Common Issues**
   - Path configuration problems (use absolute paths)
   - Missing or incorrect environment variables
   - File permission issues
   - JSON configuration syntax errors

4. **Testing**
   - Try running the server directly from command line first
   - Verify the server starts successfully before integrating with Claude
   - Check if the storage directory is created automatically

For more detailed debugging information, refer to the [MCP Debugging Guide](https://modelcontextprotocol.io/docs/tools/debugging).

## License

MIT