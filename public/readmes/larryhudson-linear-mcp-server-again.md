# Linear MCP Server

## Overview

This project implements a Model Context Protocol (MCP) server that acts as a bridge between Claude and the Linear task/issue management system. It allows Claude to interact with Linear through the following tools:

1. **get_ticket** - Retrieve detailed information about a specific Linear ticket
2. **get_my_issues** - List issues assigned to the current user with filtering by state
3. **add_comment** - Add comments to Linear tickets
4. **create_issue** - Create a new issue in Linear
5. **get_teams** - Retrieve available teams for reference

## Installation

No direct installation is needed. The package will be automatically downloaded and used by your Claude integration when configured properly.

## Usage

1. Obtain a Linear API key from your [Linear account settings](https://linear.app/larry-hudson/settings/account/security) - click 'New API key' under 'Personal API keys'.

2. Configure the MCP server in your code editor as shown below.


### Using with VS Code

One click install:

[![Install with VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=linear&inputs=%5B%7B%22id%22%3A%22linear_api_key%22%2C%22type%22%3A%22promptString%22%2C%22description%22%3A%22Linear%20API%20Key%22%2C%22password%22%3Atrue%7D%5D&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40larryhudson%2Flinear-mcp-server%22%5D%2C%22env%22%3A%7B%22LINEAR_API_KEY%22%3A%22%24%7Binput%3Alinear_api_key%7D%22%7D%7D) [![Install with VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=linear&inputs=%5B%7B%22id%22%3A%22linear_api_key%22%2C%22type%22%3A%22promptString%22%2C%22description%22%3A%22Linear%20API%20Key%22%2C%22password%22%3Atrue%7D%5D&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40larryhudson%2Flinear-mcp-server%22%5D%2C%22env%22%3A%7B%22LINEAR_API_KEY%22%3A%22%24%7Binput%3Alinear_api_key%7D%22%7D%7D&quality=insiders)

Add this to your settings JSON file:

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "linear_api_key",
        "description": "Linear API Key",
        "password": true
      }
    ],
    "servers": {
      "linear": {
        "command": "npx",
        "args": [
          "-y",
          "@larryhudson/linear-mcp-server"
        ],
        "env": {
          "LINEAR_API_KEY": "${input:linear_api_key}"
        }
      }
    }
  }
}
```

### Using with Cursor IDE

Add this to the MCP config JSON file:

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@larryhudson/linear-mcp-server"],
      "env": {
        "LINEAR_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}
```

### Using with Claude Desktop App

Add this to your MCP configuration JSON file:

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": [
        "-y",
        "@larryhudson/linear-mcp-server"
      ],
      "env": {
        "LINEAR_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}
```


### Using with Cline VS Code Extension

Add this to the MCP config JSON file:

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@larryhudson/linear-mcp-server"],
      "env": {
        "LINEAR_API_KEY": "<YOUR_API_KEY>"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```


### Environment Variables

- `LINEAR_API_KEY` - Your Linear API key (required)

## How It Works

The server is built on the following key technologies:

- **Model Context Protocol (MCP)** - Framework for allowing AI assistants to interact with external tools and APIs
- **Linear SDK** - Client library for communicating with the Linear API
- **Node.js** - JavaScript runtime environment
- **Zod** - Type validation library for tool parameters

## Key Features

### Ticket Retrieval
- Gets comprehensive ticket details including status, priority, assignee, and team
- Fetches the full description and all comments 
- Processes Markdown content with embedded images
- Downloads and includes images from ticket descriptions

### Issue Listing
- Retrieves issues assigned to the current user
- Filters by state (active, backlog, completed, canceled, or all)
- Returns a formatted table with key information about each issue

### Comment Addition
- Allows adding new comments to existing tickets
- Provides confirmation of successful comment creation

## Technical Implementation Details

1. **Image Handling**
   - Extracts image URLs from Markdown using regular expressions
   - Downloads images to a local temp directory
   - Converts images to base64 for inclusion in MCP responses
   - Uses MD5 hashing of URLs to create unique filenames

2. **Linear API Integration**
   - Authenticates using a Linear API key
   - Retrieves issues, tickets, comments, and user information
   - Formats data for human-readable display

3. **Error Handling**
   - Gracefully handles API errors, missing tickets, and download failures
   - Provides meaningful error messages to the user

## Running the Server

The server communicates with Claude through standard input/output (stdio) using the MCP protocol. It requires:

- A Linear API key (configured in the code)
- Node.js runtime environment
- The dependency packages specified in package.json

## Project Structure

This is a relatively simple Node.js application with a single main source file (`index.ts`) that defines the MCP server, tools, and associated helper functions. It uses TypeScript for type safety and better developer experience.

## Dependencies

- `@modelcontextprotocol/sdk`: Core MCP implementation
- `@linear/sdk`: Linear API client
- `dotenv`: Environment variable management
- `node-fetch`: HTTP client for image downloads
- `zod`: Schema validation for tool parameters

## Limitations and Potential Improvements

- There's limited pagination support for large result sets (currently limited to 20 issues)
- Error handling could be improved for various edge cases
- The image downloading could benefit from better MIME type detection
- Consider adding more tools for managing issues (updating status, changing assignees, etc.)
- Support for attachments when creating issues or adding comments