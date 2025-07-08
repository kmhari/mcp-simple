# BrianKnows MCP Server 
[![smithery badge](https://smithery.ai/badge/@antoncoding/mcp-brianknows)](https://smithery.ai/server/@antoncoding/mcp-brianknows)

A Model Context Protocol (MCP) server that connects Claude to BrianKnows' blockchain knowledge base.

<a href="https://glama.ai/mcp/servers/idfph0fstx">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/idfph0fstx/badge" alt="BrianKnows Server MCP server" />
</a>

## What is MCP? 🤔

The Model Context Protocol (MCP) lets AI assistants like Claude Desktop connect to external tools and data sources in a secure way while keeping users in control.

## What does this server do? 🚀

The BrianKnows MCP server provides three main tools:

1. **Ping Tool**: Check if the BrianKnows API server is responsive
2. **Search Tool**: Query BrianKnows' knowledge engine for blockchain and DeFi information
3. **Agent Tool**: Chat with the BrianKnows agent about DeFi protocols

Supported knowledge bases include:
- public-knowledge-box (default)
- circle_kb, lido_kb, Polygon_kb, taiko_kb
- near_kb, clave_kb, starknet_kb, consensys_kb

The server maintains a cache of your 5 most recent searches for quick reference.

## Prerequisites 📋

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Claude Desktop](https://claude.ai/download) 
- A [BrianKnows API key](https://docs.brianknows.org/)

## Configuration ⚙️

Add this to your Claude Desktop configuration file (accessible via Developer Settings):

```json
{
  "mcpServers": {
    "brianknows": {
      "command": "npx",
      "args": ["mcp-brianknows"],
      "env": {
        "BRIAN_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

Replace `your-api-key-here` with your actual BrianKnows API key.

## Example Usage 🎯

```
Can you check if the BrianKnows API is online?

Use BrianKnows to search for information about Ethereum's Layer 2 solutions.

Ask the BrianKnows agent to explain how Uniswap V3 works.
```

## Features ✨

* **Multiple Knowledge Bases**: Access specialized knowledge for different blockchain protocols
* **Cached Searches**: Quick access to your 5 most recent searches
* **Error Handling**: User-friendly error messages
* **Type Safety**: Full TypeScript implementation

## Acknowledgments 🙏

* [BrianKnows](https://brianknows.org) for their blockchain knowledge API
* [Model Context Protocol](https://modelcontextprotocol.io)
* [Anthropic](https://anthropic.com) for Claude Desktop