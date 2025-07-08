# MCP File Server

An MCP server for reading and writing files from your local file system. This server can be used with Claude for Desktop or any other MCP client to provide file system access for AI assistants.

## Features

- List files and directories
- Read file contents
- Write content to files
- Delete files and directories

## Prerequisites

- Docker installed on your system
- Git (optional, for cloning the repository)

## Setup and Deployment

### Option 1: Using Docker Compose (Recommended)

1. Clone this repository:
   ```bash
   git clone https://github.com/abhishekloiwal/mcp-file-server.git
   cd mcp-file-server
   ```

2. Edit the `docker-compose.yml` file to update the volume mount path if needed. By default, it's set to:
   ```yaml
   volumes:
     - /Users/abhishekloiwal/CascadeProjects/ClaudeProjects:/data
   ```
   Replace with your desired local path if different.

3. Deploy with Docker Compose:
   ```bash
   docker-compose up -d
   ```

### Option 2: Using Docker directly

1. Clone the repository:
   ```bash
   git clone https://github.com/abhishekloiwal/mcp-file-server.git
   cd mcp-file-server
   ```

2. Build the Docker image:
   ```bash
   docker build -t mcp-file-server .
   ```

3. Run the container with your local directory mounted:
   ```bash
   docker run -d --name mcp-file-server -v /Users/abhishekloiwal/CascadeProjects/ClaudeProjects:/data mcp-file-server
   ```
   Replace the path with your desired local directory path.

## Connecting to Claude for Desktop

1. Create or update your Claude for Desktop configuration file at:
   - Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%AppData%\Claude\claude_desktop_config.json`

2. Add the mcp-file-server to your configuration:
   ```json
   {
     "mcpServers": {
       "file-server": {
         "command": "docker",
         "args": ["exec", "-i", "mcp-file-server", "python", "server.py"]
       }
     }
   }
   ```

3. Restart Claude for Desktop.

4. You should now see the file-server tools available in Claude.

## Available Tools

The following tools are available through this MCP server:

- `list_files`: List all files in a directory
- `read_file`: Read the contents of a file
- `write_file`: Write content to a file
- `delete_file`: Delete a file or directory

## License

MIT

## Troubleshooting

- If Claude for Desktop doesn't connect to the server, check the Docker container status:
  ```bash
  docker ps -a | grep mcp-file-server
  ```

- View server logs:
  ```bash
  docker logs mcp-file-server
  ```

- Make sure the volume is correctly mounted:
  ```bash
  docker inspect mcp-file-server | grep -A 10 Mounts
  ```