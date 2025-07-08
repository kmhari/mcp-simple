# Get Installed Apps MCP Server

A Model Context Protocol (MCP) server that provides information about installed applications on your computer, support MacOS and Windows.

<a href="https://glama.ai/mcp/servers/@Xutaotaotao/mcp-get-installed-apps">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@Xutaotaotao/mcp-get-installed-apps/badge" alt="mcp-get-installed-apps MCP server" />
</a>

## Project Introduction

Get Installed Apps MCP Server is a simple MCP implementation that allows AI assistants to discover which applications are installed on your computer. This server implements the Model Context Protocol (MCP) specification, enabling seamless integration with compatible AI clients.

## Features

- Returns a comprehensive list of installed applications on your computer
- Simple integration with any MCP-compatible AI client
- Lightweight implementation with minimal dependencies

## Project Structure

```
mcp-get-installed-apps
├── src
│   ├── index.ts               # Application entry point
├── tsconfig.json              # TypeScript configuration file
├── package.json               # npm configuration file
└── README.md                  # Project documentation
```

## Installation

```
git clone https://github.com/Xutaotaotao/mcp-get-installed-apps.git
cd git-mcp-server
npm install
npm run build
```


## MCP Configuration

After installation, you can configure Get Installed Apps MCP in your MCP JSON configuration:

```json
{
    "mcpServers": {
        "get-installed-apps": {
            "command": "node",
            "args": [
                "mcp-get-installed-apps/build/index.js"
            ]
        }
    }
}
```

### Configure the MCP JSON in the AI Client

- Claude Client: https://modelcontextprotocol.io/quickstart/user
- Raycast: requires installing the MCP plugin
- Cursor: https://docs.cursor.com/context/model-context-protocol#configuring-mcp-servers

## MCP Tool Description

Get Installed Apps MCP Server provides the following tool, which can be called through the MCP protocol:

### Get Installed Apps (get-installed-apps)

Returns a list of all installed applications on your computer.

**Parameters:**
- None

**Returns:**
- Success: Text content containing JSON data of all installed applications
- Failure: Text content containing error information