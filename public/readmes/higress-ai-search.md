[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/cr7258-higress-ai-search-mcp-server-badge.png)](https://mseep.ai/app/cr7258-higress-ai-search-mcp-server)

# Higress AI-Search MCP Server

## Overview

A Model Context Protocol (MCP) server that provides an AI search tool to enhance AI model responses with real-time search results from various search engines through [Higress](https://higress.cn/) [ai-search](https://github.com/alibaba/higress/blob/main/plugins/wasm-go/extensions/ai-search/README.md) feature.

<a href="https://glama.ai/mcp/servers/gk0xde4wbp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/gk0xde4wbp/badge" alt="Higress AI-Search Server MCP server" />
</a>

## Demo

### Cline

https://github.com/user-attachments/assets/60a06d99-a46c-40fc-b156-793e395542bb

### Claude Desktop

https://github.com/user-attachments/assets/5c9e639f-c21c-4738-ad71-1a88cc0bcb46

## Features

- **Internet Search**: Google, Bing, Quark - for general web information
- **Academic Search**: Arxiv - for scientific papers and research
- **Internal Knowledge Search**

## Prerequisites

- [uv](https://github.com/astral-sh/uv) for package installation.
- Config Higress with [ai-search](https://github.com/alibaba/higress/blob/main/plugins/wasm-go/extensions/ai-search/README.md) plugin and [ai-proxy](https://github.com/alibaba/higress/blob/main/plugins/wasm-go/extensions/ai-proxy/README.md) plugin.

## Configuration

The server can be configured using environment variables:

- `HIGRESS_URL`(optional): URL for the Higress service (default: `http://localhost:8080/v1/chat/completions`).
- `MODEL`(required): LLM model to use for generating responses.
- `INTERNAL_KNOWLEDGE_BASES`(optional): Description of internal knowledge bases.

### Option 1: Using uvx

Using uvx will automatically install the package from PyPI, no need to clone the repository locally.

```bash
{
  "mcpServers": {
    "higress-ai-search-mcp-server": {
      "command": "uvx",
      "args": [
        "higress-ai-search-mcp-server"
      ],
      "env": {
        "HIGRESS_URL": "http://localhost:8080/v1/chat/completions",
        "MODEL": "qwen-turbo",
        "INTERNAL_KNOWLEDGE_BASES": "Employee handbook, company policies, internal process documents"
      }
    }
  }
}
```

### Option 2: Using uv with local development

Using uv requires cloning the repository locally and specifying the path to the source code.

```bash
{
  "mcpServers": {
    "higress-ai-search-mcp-server": {
      "command": "uv",
      "args": [
        "--directory",
        "path/to/src/higress-ai-search-mcp-server",
        "run",
        "higress-ai-search-mcp-server"
      ],
      "env": {
        "HIGRESS_URL": "http://localhost:8080/v1/chat/completions",
        "MODEL": "qwen-turbo",
        "INTERNAL_KNOWLEDGE_BASES": "Employee handbook, company policies, internal process documents"
      }
    }
  }
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.