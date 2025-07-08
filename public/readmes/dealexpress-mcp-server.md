# @dealx/mcp-server

This is a Model Context Protocol (MCP) server for the [DealX platform](https://dealx.com.ua). It allows LLMs to interact with the DealX platform, specifically to search for ads.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Available Tools](#available-tools)
- [Extending the Server](#extending-the-server)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

## Overview

The DealX MCP Server implements the [Model Context Protocol](https://github.com/modelcontextprotocol/typescript-sdk) to provide a standardized way for LLMs to interact with the [DealX platform](https://dealx.com.ua). Currently, it supports searching for ads, with plans to add more functionality in the future.

### What is MCP?

The Model Context Protocol (MCP) is a standardized way for LLMs to interact with external systems. It provides a structured interface for LLMs to access data and perform actions in the real world. This server implements the MCP specification to allow LLMs to interact with the DealX platform.

## Installation

### Prerequisites

- Node.js (v20 or later)
- npm (v11 or later)

### MCP Configuration

To use this server with an LLM like Claude, you need to add it to your LLM's MCP configuration:

1. Open your LLM's MCP configuration file:

   - **Claude Desktop App**:
     - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
     - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
     - Linux: `~/.config/Claude/claude_desktop_config.json`
   - **Cline (VS Code Extension)**:
     - `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`

2. Add the DealX MCP server to the `mcpServers` section:

   ```json
   {
     "mcpServers": {
       "dealx": {
         "command": "npx",
         "args": ["-y", "@dealx/mcp-server"],
         "env": {
           "DEALX_API_URL": "https://dealx.com.ua"
         },
         "disabled": false,
         "autoApprove": []
       }
     }
   }
   ```

### Installation via npm

The easiest way to install the DealX MCP Server is via npm:

```shell
npm install -g @dealx/mcp-server
```

### Installation for Development

If you want to modify the server or contribute to its development:

1. Clone the repository:

   ```shell
   git clone <repository-url>
   cd dealx/mcp
   ```

2. Install dependencies:

   ```shell
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file:

   ```shell
   cp .env.example .env
   ```

4. Edit the `.env` file to set the appropriate values:

   ```shell
   # DealX API URL
   DEALX_API_URL=http://localhost:3001

   # Optional: Specify the port for the MCP server
   MCP_SERVER_PORT=3100

   # Optional: Log level (debug, info, warn, error)
   LOG_LEVEL=info
   ```

5. Build the server:

   ```shell
   npm run build
   ```

## Usage

### Starting the Server

You can run the server in several ways:

1. If installed globally:

   ```shell
   node node_modules/@dealx/mcp-server/build/index.js
   ```

2. Using npx without installation:

   ```shell
   npx -y @dealx/mcp-server
   ```

3. With environment variables:

   ```shell
   DEALX_API_URL=https://dealx.com.ua npx -y @dealx/mcp-server
   ```

4. For development:

   ```shell
   npm start
   ```

### Using with an LLM

Once configured in your LLM's MCP settings, you can use natural language to interact with the DealX platform.

Example prompts:

- "Search for ads on DealX with the query 'laptop'"
- "Find the newest 5 ads for 'iPhone' on DealX"
- "Search DealX for apartments in Kyiv"

## Available Tools

### search_ads

Search for ads on the DealX platform.

**Parameters:**

- `query` (string, optional): Search query string
- `sort` (string, optional): Sort order (e.g., "-created" for newest first)
- `offset` (number, optional): Pagination offset (starts at 1, default: 1)
- `limit` (number, optional): Number of results per page (max 100, default: 30)

**Example Usage:**

```json
{
  "query": "laptop",
  "sort": "-created",
  "offset": 1,
  "limit": 10
}
```

## Extending the Server

The server is designed to be easily extended with additional tools. Here's how to add a new tool:

- Define the tool in the `TOOLS` object in `src/index.ts`:

  ```typescript
  const TOOLS = {
    SEARCH_ADS: "search_ads",
    NEW_TOOL: "new_tool", // Add your new tool here
  };
  ```

- Create a new file in the `src/tools` directory for your tool implementation:

  ```typescript
  // src/tools/new-tool.ts
  import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";

  interface NewToolParams {
    // Define your tool parameters here
  }

  export async function newTool(params: NewToolParams) {
    try {
      // Implement your tool logic here

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      // Handle errors
      // ...
    }
  }
  ```

- Add the tool to the `ListToolsRequestSchema` handler in `src/index.ts`:

  ```typescript
  this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      // Existing tools...
      {
        name: TOOLS.NEW_TOOL,
        description: "Description of your new tool",
        inputSchema: {
          type: "object",
          properties: {
            // Define your tool parameters here
          },
          required: [], // List required parameters
        },
      },
    ],
  }));
  ```

- Add the tool to the `CallToolRequestSchema` handler in `src/index.ts`:

  ```typescript
  this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
      // Existing cases...
      case TOOLS.NEW_TOOL:
        return await newTool(args);
      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
  });
  ```

- Import your new tool in `src/index.ts`:

  ```typescript
  import { newTool } from "./tools/new-tool.js";
  ```

### Planned Future Tools

The following tools are planned for future implementation:

- `create_ad`: Create a new ad on the [DealX platform](https://dealx.com.ua)
- `edit_ad`: Edit an existing ad
- `delete_ad`: Delete an ad
- `get_threads`: Get discussion threads for an ad
- `create_thread`: Create a new discussion thread

## Development

### Project Structure

```shell
mcp/
├── build/              # Compiled JavaScript files
├── src/                # TypeScript source files
│   ├── tools/          # Tool implementations
│   │   └── search-ads.ts
│   └── index.ts        # Main server implementation
├── .env                # Environment variables (not in git)
├── .env.example        # Example environment variables
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # This file
```

### npm Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the server using the compiled JavaScript
- `npm run dev` - Start the server in development mode with hot reloading
- `npm run lint` - Lint the code using ESLint
- `npm run format` - Format the code using Prettier
- `npm test` - Run tests

## Troubleshooting

### Common Issues

#### Server Not Starting

If the server fails to start, check the following:

- Make sure you have the correct Node.js version installed
- Check that all dependencies are installed
- Verify that the `.env` file exists and has the correct values
- Check the console output for error messages

#### Connection Issues

If the LLM can't connect to the server:

- Make sure the server is running
- Check that the MCP configuration in the LLM's settings is correct
- Verify that the path to the server executable is correct
- Check that the environment variables are set correctly

#### API Connection Issues

If the server can't connect to the DealX API:

- Make sure the DealX API is running
- Check that the `DEALX_API_URL` environment variable is set correctly
- Verify that the API endpoint is accessible from the server

### Getting Help

If you encounter issues not covered here, please open an issue against this GitHub repository.
