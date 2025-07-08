# n8n MCP Server

A proper MCP (Model Context Protocol) server implementation for managing n8n workflows in Docker containers.

## Features

- List and search n8n workflows
- Update workflow configurations
- Manage Docker containers
- Troubleshoot workflow issues
- Backup and restore workflows

## Prerequisites

- Node.js 16+
- Docker installed and running
- n8n running in a Docker container

## Installation

1. Clone this repository:
```bash
git clone https://github.com/Kr8thor/n8n-mcp-tool.git
cd n8n-mcp-tool
```

2. Install dependencies:
```bash
npm install
```

3. Make the script executable:
```bash
chmod +x index.js
```

## Configuration

Add to your Claude Desktop `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "n8n-workflow-manager": {
      "command": "node",
      "args": ["/path/to/n8n-mcp-tool/index.js"],
      "env": {
        "N8N_CONTAINER_NAME": "your-n8n-container-name"
      }
    }
  }
}
```

Or use npx directly from GitHub:

```json
{
  "mcpServers": {
    "n8n-workflow-manager": {
      "command": "npx",
      "args": [
        "-y",
        "github:Kr8thor/n8n-mcp-tool"
      ],
      "env": {
        "N8N_CONTAINER_NAME": "your-n8n-container-name"
      }
    }
  }
}
```

## Available Tools

### list_workflows
Lists all workflows in your n8n instance.

### update_workflow
Updates a workflow with new configuration.
- Parameters:
  - `workflowId`: The ID of the workflow to update
  - `updateData`: JSON object with the workflow configuration

### restart_container
Restarts the n8n Docker container.

### backup_workflows
Creates a backup of all workflows.

### troubleshoot
Troubleshoots a workflow by checking its status and logs.
- Parameters:
  - `workflowId`: The ID of the workflow to troubleshoot

## Environment Variables

- `N8N_CONTAINER_NAME`: The name of your n8n Docker container (default: 'n8n-container')

## Troubleshooting

If you encounter issues:

1. Ensure Docker is running
2. Verify your container name is correct
3. Check that you have proper permissions to execute Docker commands
4. Look at the MCP server logs for detailed error messages

## Contributing

Feel free to submit issues and pull requests.

## License

MIT License