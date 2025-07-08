# Raccoon AI MCP Server

[![smithery badge](https://smithery.ai/badge/@raccoonaihq/raccoonai-mcp-server)](https://smithery.ai/server/@raccoonaihq/raccoonai-mcp-server)
[![MCP Spec](https://img.shields.io/badge/mcp-compatible-green)](https://modelcontextprotocol.io)

Raccoon AI's Model Context Protocol (MCP) server that enables leveraging the LAM API for web browsing, data extraction, and complex web tasks automation.

## What can you do with this?

- Search and browse websites
- Fill out forms and navigate UI elements
- Extract structured data based on defined schemas
- Handle multistep processes across websites

## Prerequisites

Before using the Raccoon LAM MCP server, you'll need:

- Python 3.8 or higher
- [Claude Desktop](https://claude.ai/download) or another MCP-compatible client
- Raccoon AI Secret Key and your Raccoon Passcode

## Installation

### Using Smithery

```bash
npx -y @smithery/cli@latest install @raccoonaihq/raccoonai-mcp-server --client claude
```


### From source

```bash
git clone https://github.com/raccoonaihq/raccoonai-mcp-server.git
```
```bash
cd raccoonai-mcp-server
```
```bash
uv pip install -e .
```

#### To configure in Claude Desktop

```bash
mcp install src/raccoonai_mcp_server/server.py -v RACCOON_SECRET_KEY=<RACCOON_SECRET_KEY> -v RACCOON_PASSCODE=<RACCOON_PASSCODE>
```

Replace `<RACCOON_SECRET_KEY>` and `<RACCOON_PASSCODE>` with your actual creds. You can find them [here](https://platform.flyingraccoon.tech).

## Examples

Here are some example prompts that can be used with Claude to perform a variety of web tasks:

1. Can you extract product information from Amazon.com for the top-rated gaming keyboards?
2. Find and summarize the latest news articles about renewable energy technologies.
3. Find the 3 latest iPhone models and extract the details in a schema.
4. Do a deepsearch and generate a detailed report on Small Language Models.

## Documentation

For more information, refer to:
- [Raccoon LAM API Documentation](https://docs.flyingraccoon.tech/reference/lam/run)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io)