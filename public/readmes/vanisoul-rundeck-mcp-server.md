# Rundeck MCP Server

This is a Model Context Protocol (MCP) server for interacting with the Rundeck CLI. It provides a set of tools that allow you to perform Rundeck operations with AI without directly interacting with the command line.

## Features

- **Jobs Management**: List, get information, execute, and predict
- **Executions Management**: List, get information, get output, and track
- **Projects Management**: List and get information
- **Nodes and System Information**: List nodes and get system information

## Installation

### Prerequisites

- Node.js (v14 or higher)
- Rundeck CLI tool

### Steps

1. Clone this repository:

```bash
git clone https://github.com/vanisoul/rundeck-mcp-server
cd rundeck-mcp-server
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Configure the MCP settings file:

Add the following configuration to your MCP settings file. The location of the settings file depends on your environment:

```json
{
  "mcpServers": {
    "rundeck": {
      "command": "node",
      "args": ["/path/to/rundeck-mcp-server/build/index.js"],
      "env": {
        "RUNDECK_CLI_PATH": "/usr/bin/rd",
        "RUNDECK_BASE_URL": "http://your-rundeck-server:port/",
        "RUNDECK_API_TOKEN": "your-api-token"
      },
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

Make sure to replace the following values:

- `/path/to/rundeck-mcp-server/build/index.js`: The absolute path to the built index.js file
- `/usr/bin/rd`: The absolute path to the Rundeck CLI tool
- `http://your-rundeck-server:port/`: Your Rundeck server URL
- `your-api-token`: Your Rundeck API token

5. Restart VS Code or Claude Desktop for the settings to take effect.

## How to Install Rundeck CLI

- https://docs.rundeck.com/docs/rd-cli/install.html

## Troubleshooting

If you encounter issues, check the following:

1. Ensure the Rundeck CLI tool is available and working properly
2. Make sure the RUNDECK_CLI_PATH environment variable points to the correct Rundeck CLI tool path
3. Ensure the RUNDECK_BASE_URL and RUNDECK_API_TOKEN environment variables are set correctly
4. Check that the MCP settings file is configured correctly

## License

MIT
