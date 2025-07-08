# mcp-server-hcp-terraform

MCP server for working with HashiCorp Terraform Cloud/Enterprise API

## Overview

This project provides a MCP server that integrates with the HCP Terraform Cloud/Enterprise API. Through MCP, you can access features such as searching for Terraform modules and retrieving module information.

## Prerequisites

- Python 3.13+
- HCP Terraform Cloud/Enterprise account
- Access token

## Environment Variables

Set the following environment variables before use:

- `HCP_TERRAFORM_TOKEN`: HCP Terraform access token (required)
- `HCP_TERRAFORM_ORG`: HCP Terraform organization name (required)
- `HCP_TERRAFORM_BASE_URL`: HCP Terraform base URL (optional, default: `https://app.terraform.io`)

## Features

This MCP server provides the following features:

### Search Private Modules

Use the `hcp_terraform_search_private_modules` tool to search for modules in the HCP Terraform Private Registry.

**Parameters**:

- `query`: Search query
- `provider` (optional): Provider filter (e.g., aws, gcp, azure)
- `limit` (optional): Maximum number of results (default: 10)

### Get Module Details

Use the `hcp_terraform_get_module` tool to retrieve detailed information about a specific module from the HCP Terraform Registry.

**Parameters**:

- `module_name`: Name of the module
- `provider`: Provider (e.g., aws, gcp, azure)
- `registry_name` (optional): Registry name (private or public, default: private)
- `namespace` (optional): Module namespace (uses organization name if not specified)

## Usage

```json
{
  "globalShortcut": "",
  "mcpServers": {
    "HCP Terraform": {
      "command": "uv",
      "args": [
        "run",
        "--with",
        "mcp[cli]",
        "mcp",
        "run",
        "path/to/mcp-server-hcp-terraform/server.py"
      ],
      "env": {
        "HCP_TERRAFORM_TOKEN": "paste_here",
        "HCP_TERRAFORM_ORG": "my_org"
      }
    }
  }
}
```


## License

MIT License
