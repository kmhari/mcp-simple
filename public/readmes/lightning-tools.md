# ⚠️ DEPRECATED ⚠️

**Please use [Alby MCP](https://github.com/getAlby/mcp/) instead!** 

This repository has been deprecated in favor of Alby MCP, which includes all the NWC tools along with additional lightning tools.

# Lightning Tools MCP Server

Interact with lightning addresses and use other common lightning tools with your LLM. Works well combined with [NWC MCP Server](https://github.com/getAlby/nwc-mcp-server)

This MCP server uses the [official MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## Quick Start

### Add to Claude Desktop

Add this to your claude_desktop_config.json:

```json
{
  "mcpServers": {
    "lightning-tools": {
      "command": "npx",
      "args": ["-y", "@getalby/lightning-tools-mcp-server"],
      "env": {
        "NWC_CONNECTION_STRING": "YOUR NWC CONNECTION STRING HERE"
      }
    }
  }
}
```

### Add to Cline

> Copy the below and paste it into a cline prompt.

```json
Add the following to my MCP servers list:

"lightning-tools": {
  "command": "npx",
  "args": ["-y", "@getalby/lightning-tools-mcp-server"],
  "env": {
    "NWC_CONNECTION_STRING": "YOUR NWC CONNECTION STRING HERE"
  },
  "disabled": false,
  "autoApprove": []
}
```

## From Source

### Prerequisites

- Node.js 20+
- Yarn

### Installation

```bash
yarn install
```

### Building

```bash
yarn build
```

### Inspect the tools (use/test without an LLM)

`yarn inspect`

### Supported Tools

See the [tools directory](./src/tools)
