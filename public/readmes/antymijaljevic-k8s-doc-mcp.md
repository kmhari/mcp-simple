# Kubernetes Documentation MCP Server

A Kubernetes documentation assistant built with the MCP (Model Context Protocol) Python SDK.

## Features

- Fetch and convert Kubernetes documentation to Markdown format
- Get related/recommended documentation pages

## Installation

1. Install the `uv` package manager:
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

2. Initialize the project and install dependencies:
   ```bash
   uv init .
   uv add "mcp[cli]" requests beautifulsoup4 markdown
   ```

3. Install the MCP server:
   ```bash
   uv run mcp install main.py
   ```

## Usage

Start the MCP server:
```bash
uv run python main.py
```

This will add json definition to Claude Desktop (to MPC Host/Client) like this and run server in background.
```json
{
  "mcpServers": {
    "k8s-doc": {
      "command": "uv",
      "args": [
        "run",
        "--with",
        "mcp[cli]",
        "mcp",
        "run",
        "/<path-to>/k8s-doc-mcp/main.py"
      ]
    }
  }
}
```

### Available Tools

- `read_documentation(url)`: Fetch and convert a Kubernetes documentation page to Markdown format
- `recommend(url)`: Get recommended Kubernetes documentation pages related to a specified URL

### Examples

1. read_documentation
Access and understand the content of specific Kubernetes documentation pages.

How to https://kubernetes.io/docs/tasks/tls/certificate-issue-client-csr/?
How to https://kubernetes.io/docs/tasks/administer-cluster/cluster-upgrade/?


2. recommend
Find other pages related to a topic, typically starting from a page you've just read or are interested in.

"Can you recommend other pages related to this URL: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/?"
"What other documentation pages are related to the one about Deployments (https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)?"
"Based on the information about Services, what other pages might be relevant? (Page: https://kubernetes.io/docs/concepts/services-networking/service/)"
"Explore related topics starting from the documentation on Pods (https://kubernetes.io/docs/concepts/workloads/pods/)."

## Resources

- [MCP Python SDK Documentation](https://github.com/modelcontextprotocol/python-sdk)
- [uv Package Manager](https://docs.astral.sh/uv/getting-started/installation/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
