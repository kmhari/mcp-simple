# TextSaver MCP

A Claude MCP (Model Context Protocol) server that allows Claude to save text to files on your local filesystem.

## Features

- 📝 Save text input to files with a simple command
- 🕒 Automatically generates timestamped filenames if none provided
- 🔒 Built-in security with filename validation and sanitization
- 🚫 Protection against directory traversal attacks
- ⚠️ Comprehensive error handling and logging
- ✅ Size limit protections to prevent filesystem abuse

## Installation

### Prerequisites

- Python 3.8 or higher
- Claude Desktop application

### Setup

1. Clone this repository:

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Configure Claude Desktop to use the MCP server:

   Open your Claude Desktop configuration file:
   
   **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
   **Windows**: `C:\Users\YourUsername\AppData\Roaming\Claude\claude_desktop_config.json`

   Add the following configuration:
   ```json
   {
     "mcpServers": {
       "text-saver": {
         "command": "/full/path/to/python",
         "args": [
           "/full/path/to/text_saver_mcp.py"
         ],
         "cwd": "/path/to/writable/directory",
         "host": "127.0.0.1",
         "port": 8080,
         "timeout": 30000
       }
     }
   }
   ```
   
   Be sure to replace the paths with the actual locations on your system.

4. Restart Claude Desktop

## Usage

Once set up, you can ask Claude to save text to files using natural language:

- "Save this text to a file"
- "Save this information to a file called notes.txt"
- "Write this content to a text file named project-ideas.txt"

The text will be saved to the directory specified in the configuration.

## Security Features

- **File size limits**: Prevents saving excessively large files (default: 10MB)
- **Filename validation**: Ensures filenames are safe and don't contain path traversal attempts
- **Sanitization**: Automatically sanitizes unsafe filenames
- **Path control**: Files can only be saved in the specified directory

## Troubleshooting

### Common Issues

#### "spawn python ENOENT" Error
This error means Claude can't find the Python executable. Use the full path to your Python interpreter in the configuration file:

```bash
# Find your Python path
which python

# Then use that path in your configuration
```

#### "Read-only file system" Error
This means the script doesn't have permission to write to the specified directory. Make sure you've set a writable directory in the script or configuration.

#### Permission Issues
Ensure the directory where you're saving files has appropriate write permissions:

```bash
chmod 755 /path/to/save/directory
```

### Debugging

The script includes detailed logging to help diagnose issues. Check the logs in the Claude Desktop developer console.

