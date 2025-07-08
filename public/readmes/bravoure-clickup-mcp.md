# ClickUp MCP Server

A Model Context Protocol (MCP) server for ClickUp integration, allowing AI assistants like Claude to communicate with ClickUp.

## Quick Start for Users

If you just want to use the ClickUp MCP server with your AI assistant, follow these steps:

### Prerequisites

- A ClickUp account with an API token (see [Getting a ClickUp API Token](#getting-a-clickup-api-token))
- Docker installed on your machine
- Claude Desktop or VS Code with Augment extension

### Integration with Claude Desktop

1. Make sure you have Claude Desktop installed
2. Open the configuration file at `~/Library/Application Support/Claude/claude_desktop_config.json`
3. Add the following configuration:

```json
{
  "mcpServers": {
    "clickup": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-v", "/path/to/local/downloads:/app/downloads",
        "-e",
        "CLICKUP_API_TOKEN=your_api_token_here",
        "ghcr.io/bravoure/clickup-mcp:latest"
      ]
    }
  }
}
```
[claude_desktop_config.json](../../../../Library/Application%20Support/Claude/claude_desktop_config.json)
4. Replace `/path/to/local/downloads` with the path where you want to save downloaded attachments (e.g., `/Users/yourusername/Downloads/clickup-downloads`)
5. Replace `your_api_token_here` with your ClickUp API token
6. Restart Claude Desktop

Note: The `-i` flag is important as it keeps stdin open, which is required for the MCP protocol to work correctly. The `-v` flag creates a volume mount that allows downloaded files to be accessible on your local system.

### Integration with Augment

1. Open VS Code
2. Press Cmd/Ctrl+Shift+P
3. Type "Augment: Edit Settings"
4. Click on "Edit in settings.json"
5. Add the following configuration:

```json
"augment.advanced": {
    "mcpServers": [
        {
            "name": "clickup",
            "command": "docker",
            "args": [
                "run",
                "--rm",
                "-i",
                "-v", "/path/to/local/downloads:/app/downloads",
                "-e", "CLICKUP_API_TOKEN=your_api_token_here",
                "ghcr.io/bravoure/clickup-mcp:latest"
            ]
        }
    ]
}
```

6. Replace `/path/to/local/downloads` with the path where you want to save downloaded attachments (e.g., `/Users/yourusername/Downloads/clickup-downloads`)
7. Replace `your_api_token_here` with your ClickUp API token
8. Save the changes and restart VS Code

Note: The Docker image is built for both Intel/AMD (amd64) and Apple Silicon (arm64) processors, so it works on all modern Macs and PCs.

### Troubleshooting

If you encounter issues with the MCP server disconnecting, try one of these alternative configurations:

#### Option 1: Specify the Node.js command explicitly

```json
{
  "mcpServers": {
    "clickup": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-e",
        "CLICKUP_API_TOKEN=your_api_token_here",
        "ghcr.io/bravoure/clickup-mcp:latest",
        "node",
        "src/index.js"
      ]
    }
  }
}
```

#### Option 2: Run without Docker (if Node.js is installed locally)

```json
{
  "mcpServers": {
    "clickup": {
      "command": "node",
      "args": [
        "/absolute/path/to/clickup-mcp/src/index.js"
      ],
      "env": {
        "CLICKUP_API_TOKEN": "your_api_token_here"
      }
    }
  }
}
```

Replace `/absolute/path/to/clickup-mcp/src/index.js` with the full path to your index.js file.

## For Developers

If you want to contribute to the project or run it locally, follow these steps:

### Prerequisites

- Node.js 18 or higher
- A ClickUp account with an API token
- Git

### Local Development Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/bravoure/clickup-mcp.git
   cd clickup-mcp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your ClickUp API token:
   ```bash
   echo "CLICKUP_API_TOKEN=your_api_token_here" > .env
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Running with Docker

If you want to test the Docker container locally:

```bash
# Build the Docker image
docker build -t clickup-mcp .

# Run the container
docker run -i \
  -e CLICKUP_API_TOKEN=your_api_token_here \
  --name clickup-mcp \
  clickup-mcp
```

### Using Docker Compose

You can also use Docker Compose:

```bash
# Create a .env file with your ClickUp API token
echo "CLICKUP_API_TOKEN=your_api_token_here" > .env

# Start the container
docker-compose up -d
```

## Getting a ClickUp API Token

To use this MCP server, you need a ClickUp API token. Follow these steps to obtain one:

1. Log in to your ClickUp account
2. Click on your avatar in the top-right corner
3. Select "Settings"
4. Click on "Apps" in the sidebar
5. Under "API Token", click "Generate" or "Regenerate"
6. Copy the token and store it securely

## Finding Workspace and List IDs

To find the necessary IDs for using the tools, you can use the following methods:

1. **Workspace ID via URL**: Open ClickUp in your browser and look at the URL. It will look something like: `https://app.clickup.com/WORKSPACE_ID/v/l/li/LIST_ID`. The number after `app.clickup.com/` is your Workspace ID.

2. **Via the API**: Use the tools provided by this MCP server to retrieve the necessary IDs:
   - `get-workspaces`: Retrieves all workspaces
   - `get-spaces`: Retrieves all spaces in a workspace
   - `get-lists`: Retrieves all lists in a folder
   - `get-folderless-lists`: Retrieves all lists that are not in any folder

## Available Tools

| Tool | Description |
|------|-------------|
| get-task | Retrieve a specific task by ID (including comments and attachments) |
| create-task | Create a new task in a list |
| update-task | Update an existing task (including changing status) |
| get-lists | Retrieve all lists in a folder |
| get-folderless-lists | Retrieve all lists that are not in any folder |
| get-list-statuses | Retrieve all statuses for a list |
| create-task-attachment | Upload an attachment to a task |
| download-task-attachments | Download all attachments from a task |
| get-task-comments | Retrieve all comments from a task |
| create-task-comment | Create a comment on a task |

## Features

This MCP server provides the following tools for interacting with ClickUp:

- **Tasks**: Retrieve, create, and update tasks
- **Lists**: Retrieve lists and their statuses
- **Attachments**: Upload and download task attachments
- **Comments**: Retrieve task comments

## License

MIT
