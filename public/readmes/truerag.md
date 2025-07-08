# Model Context Protocol (MCP) Server for GraphQL Policies API

This repository contains a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) server implementation for a GraphQL API that provides access to policies.

The server is built using the [python SDK for MCP](https://github.com/modelcontextprotocol/python-sdk) and uses the [GQL](https://github.com/graphql-python/gql) library to interact with the GraphQL API.

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Ad-Veritas/mcp-server-trueRAG.git
cd mcp-server-trueRAG
```

### Make sure you have [uv](https://github.com/astral-sh/uv) installed

```bash
uv --version
```

If not, you can install it using:

```bash
# On macOS and Linux.
curl -LsSf https://astral.sh/uv/install.sh | sh

# On Windows.
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### Define the environment variables

The server is configured to work against a GraphQL API for one of the TrueRag systems. Once you created the TrueRAG environment, copy the API key and endpoint from the environment variables.

Create a `.env` file in the root directory of the repository and add the following lines:

```txt
GRAPHQL_API_KEY = "{your_api_key}"
GRAPHQL_ENDPOINT = "{your_graphql_endpoint}"
```

### Add to the MCP Client, such as Claude Desktop

Add the following lines to the Claude configuration file (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
    "shipping-policies": {
      "command": "uv",
      "args": [
        "--directory",
        "{path_to_mcp_server}/mcp-server-trueRAG",
        "run",
        "fastmcp",
        "run",
        "server.py"
      ]
    }
```
