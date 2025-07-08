# 4EVERLAND Hosting MCP Server

[![Version](https://img.shields.io/badge/version-0.1.4-blue.svg)](https://www.npmjs.com/package/@4everland/hosting-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D20.12.2-green.svg)](https://nodejs.org/)

---

A Model Context Protocol (MCP) server implementation
for [4EVERLAND Hosting](https://docs.4everland.org/hositng/what-is-hosting) enabling instant deployment of AI-generated
code to decentralized storage networks like Greenfield, IPFS, and Arweave.

## Overview

The 4EVERLAND Hosting MCP Server enables users to leverage AI-driven workflows to deploy code instantly to decentralized
storage networks such as Greenfield, IPFS, and Arweave. Upon deployment, it provides a directly accessible webpage
domain, streamlining the process of deploying and sharing decentralized applications.

## Features

- **Instant Deployment with Domain Generation**: Deploy AI-generated code to decentralized storage networks and receive
  a unique, immediately accessible webpage domain with a single command.
- **Multiple Decentralized Storage Networks**: Support for Greenfield, IPFS, and Arweave, enabling flexible and
  resilient storage options for your applications.
- **Secure and Loss-Proof Decentralized Storage**: Leverage the robust, tamper-resistant, and highly available nature of
  decentralized storage to ensure data security and prevent data loss.
- **Visual Project Management Interface**: Manage your deployed projects, view detailed information, or configure custom
  domains directly in the [4EVERLAND Dashboard](https://dashboard.4everland.org/).

## MCP Tool

### Tool: deploy_site

**Description**: Deploys code to 4EVERLAND hosting platforms.

| Parameter    | Type                         | Description                                                                   |
|--------------|------------------------------|-------------------------------------------------------------------------------|
| code_files   | Record&lt;string, string&gt; | Map of file paths to their content                                            |
| project_name | string                       | Project name (alphanumeric, underscore, hyphen; cannot start/end with hyphen) |
| project_id   | string (optional)            | Existing project ID to deploy to (new project created if omitted)             |
| platform     | "IPFS"\|"AR"\|"GREENFIELD"   | Storage platform to deploy to (default: `"IPFS"`)                             |

## Get Hosting Auth Token

1. Log in to your [4EVERLAND Dashboard](https://dashboard.4everland.org/) account.
2. Go to **Hosting** -&gt; **Auth Token**.
3. Click on **+Create** to generate a new token.
4. Copy and save the token somewhere safe as it will only be shown once.

## Integration with Cursor

To connect to the MCP server from Cursor:

1. Open Cursor and go to **Settings** (gear icon in the top right).
2. Click on **MCP** in the left sidebar.
3. Click **Add new global MCP server**.
4. Enter the following details:

```json
{
  "mcpServers": {
    "4ever-mcpserver": {
      "command": "npx",
      "args": [
        "-y",
        "@4everland/hosting-mcp@latest",
        "serve"
      ],
      "env": {
        "TOKEN": "your-hosting-auth-token"
      }
    }
  }
}
```

## Integration with Claude Desktop

To connect to the MCP server from Claude Desktop:

1. Open Claude Desktop and go to **Settings**.
2. Click on **Developer** in the left sidebar.
3. Click the **Edit Config** button.
4. Add the following configuration to the `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "4ever-mcpserver": {
      "command": "npx",
      "args": [
        "-y",
        "@4everland/hosting-mcp@latest",
        "serve"
      ],
      "env": {
        "TOKEN": "your-hosting-auth-token"
      }
    }
  }
}
```

5. Save the file and restart Claude Desktop.

## Local Development

To run the server locally for development:

```bash
# Clone repository
git clone https://github.com/4everland/4everland-hosting-mcp.git
cd 4everland-hosting-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Run the server locally
npm run serve
```

## License

This project is licensed under the MIT License.