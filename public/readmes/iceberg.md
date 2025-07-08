<div align="center">

<!-- omit in toc -->

<img src="assets/iceberg-logo.svg" alt="Iceberg Logo" />

# IcebergMCP 🚀
<strong>AI-native Lakehouse Integration</strong>

[![PyPI - Version](https://img.shields.io/pypi/v/iceberg-mcp.svg)](https://pypi.org/project/iceberg-mcp)
[![License](https://img.shields.io/github/license/ryft-io/iceberg-mcp)](https://github.com/ryft-io/iceberg-mcp/blob/main/LICENSE)

</div>

IcebergMCP is a [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server that lets you interact with your [Apache Iceberg™](https://iceberg.apache.org/) Lakehouse using natural language in Claude, Cursor, or any other MCP client.

<video src="https://github.com/user-attachments/assets/907180f3-27ad-401a-9fa0-f3178cd290de"></video>

<!-- omit in toc -->
## Table of Contents
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Claude](#claude)
  - [Cursor](#cursor)
- [Configuration](#configuration)
- [Available Tools](#available-tools)
- [Examples](#examples)
- [Limitations & Security Considerations](#limitations--security-considerations)
- [Contributing](#contributing)



## Installation


### Prerequisites

- Apache Iceberg™ catalog managed in AWS Glue
- AWS profile configured on the machine, with access to the catalog
- `uv` package manager - install via `brew install uv` or see [official installation guide](https://docs.astral.sh/uv/getting-started/installation/)


### Claude
1. Inside Claude, go to Settings > Developer > Edit Config > claude_desktop_config.json

2. Add the following:
```json
{
  "mcpServers": {
    "iceberg-mcp": {
      "command": "uv", // If uv can't be found, replace with full absolute path to uv
      "args": [
        "run",
        "--with",
        "iceberg-mcp",
        "iceberg-mcp"
      ],
      "env": {
        "ICEBERG_MCP_PROFILE": "<aws-profile-name>"
      }
    }
  }
}
```


### Cursor
1. Inside Cursor, go to Settings -> Cursor Settings -> MCP -> Add new global MCP server


2. Add the following:
```json
{
  "mcpServers": {
    "iceberg-mcp": {
      "command": "uv", // If uv can't be found, replace with full absolute path to uv
      "args": [
        "run",
        "--with",
        "iceberg-mcp",
        "iceberg-mcp"
      ],
      "env": {
        "ICEBERG_MCP_PROFILE": "<aws-profile-name>"
      }
    }
  }
}
```


## Configuration

Environment variables can be used to configure the AWS connection:

- `ICEBERG_MCP_PROFILE` - The AWS profile name to use. This role will be assumed and used to connect to the catalog and the object storage. If not specified, the default role will be used.
- `ICEBERG_MCP_REGION` - The AWS region to use. This is used to determine the catalog and object storage location. `us-east-1` by default.


## Available Tools

The server provides the following tools for interacting with your Apache Iceberg™ tables:

- `get_namespaces`: Gets all namespaces in the Apache Iceberg™ catalog
- `get_iceberg_tables`: Gets all tables for a given namespace
- `get_table_schema`: Returns the schema for a given table
- `get_table_properties`: Returns table properties for a given table, like total size and record count
- `get_table_partitions`: Gets all partitions for a given table


## Examples

Once installed and configured, you can start interacting with your Apache Iceberg™ tables through your MCP client. Here are some simple examples of how to interact with your lakehouse:

1. "List all namespaces in my catalog"
2. "List all tables for the namespace called `bronze`"
3. "What are all the string columns in the table `raw_events`?
4. "What is the size of the `raw_events` table?"
5. "Generate an SQL query that calculates the sum and the p95 of all number columns in `raw_metrics` for all VIP users from `users_info`"
5. "Why did the queries on `raw_events` recently become much slower?"


## Limitations & Security Considerations

- All tools are currently read-only and cannot modify or delete data from your lakehouse
- Currently supported catalogs:
  - AWS Glue
  - Apache Iceberg™ REST Catalog (coming soon!)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
