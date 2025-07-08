# Redshift Utils MCP Server
<div align="center">
  <!-- Container for side-by-side images -->
  <div style="display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="docs/banner.png" width="320">
    
 <a href="https://glama.ai/mcp/servers/@vinodismyname/redshift-utils-mcp">
      <img width="400" src="https://glama.ai/mcp/servers/@vinodismyname/redshift-utils-mcp/badge" alt="redshift-utils-mcp MCP server" />
  </div>
  
  <!-- Stats in a clean format -->
  <p>
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
    <img src="https://img.shields.io/badge/Language-Python-blue.svg" alt="Python">
  </p>
</div>

## Overview

This project implements a Model Context Protocol (MCP) server designed specifically to interact with Amazon Redshift databases.

It bridges the gap between Large Language Models (LLMs) or AI assistants (like those in Claude, Cursor, or custom applications) and your Redshift data warehouse, enabling secure, standardized data access and interaction. This allows users to query data, understand database structure, and monitoring/diagnostic operations using natural language or AI-driven prompts.

This server is for developers, data analysts, or teams looking to integrate LLM capabilities directly with their Amazon Redshift data environment in a structured and secure manner.

## Table of Contents

- [Redshift Utils MCP Server](#redshift-utils-mcp-server)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Configuration](#configuration)
  - [Usage](#usage)
    - [Connecting with Claude Desktop / Anthropic Console:](#connecting-with-claude-desktop--anthropic-console)
    - [Connecting with Cursor IDE:](#connecting-with-cursor-ide)
    - [Available MCP Resources](#available-mcp-resources)
    - [Available MCP Tools](#available-mcp-tools)
  - [TO DO](#to-do)
  - [Contributing](#contributing)
  - [License](#license)
  - [References](#references)

## Features

*   ✨ **Secure Redshift Connection (via Data API):** Connects to your Amazon Redshift cluster using the AWS Redshift Data API via Boto3, leveraging AWS Secrets Manager for credentials managed securely via environment variables.
*   🔍 **Schema Discovery:** Exposes MCP resources for listing schemas and tables within a specified schema.
*   📊 **Metadata & Statistics:** Provides a tool (`handle_inspect_table`) to gather detailed table metadata, statistics (like size, row counts, skew, stats staleness), and maintenance status.
*   📝 **Read-Only Query Execution:** Offers a secure MCP tool (`handle_execute_ad_hoc_query`) to execute arbitrary SELECT queries against the Redshift database, enabling data retrieval based on LLM requests.
*   📈 **Query Performance Analysis:** Includes a tool (`handle_diagnose_query_performance`) to retrieve and analyze the execution plan, metrics, and historical data for a specific query ID.
*   🔍 **Table Inspection:** Provides a tool (`handle_inspect_table`) to perform a comprehensive inspection of a table, including design, storage, health, and usage.
*   🩺 **Cluster Health Check:** Offers a tool (`handle_check_cluster_health`) to perform a basic or full health assessment of the cluster using various diagnostic queries.
*   🔒 **Lock Diagnosis:** Provides a tool (`handle_diagnose_locks`) to identify and report on current lock contention and blocking sessions.
*   📊 **Workload Monitoring:** Includes a tool (`handle_monitor_workload`) to analyze cluster workload patterns over a time window, covering WLM, top queries, and resource usage.
*   📝 **DDL Retrieval:** Offers a tool (`handle_get_table_definition`) to retrieve the `SHOW TABLE` output (DDL) for a specified table.
*   🛡️ **Input Sanitization:** Utilizes parameterized queries via the Boto3 Redshift Data API client where applicable to mitigate SQL injection risks.
*   🧩 **Standardized MCP Interface:** Adheres to the Model Context Protocol specification for seamless integration with compatible clients (e.g., Claude Desktop, Cursor IDE, custom applications).

## Prerequisites

Software:
*   Python 3.8+
*   `uv` (recommended package manager)
*   Git (for cloning the repository)

Infrastructure & Access:

*   Access to an Amazon Redshift cluster.
*   An AWS account with permissions to use the Redshift Data API (`redshift-data:*`) and access the specified Secrets Manager secret (`secretsmanager:GetSecretValue`).
*   A Redshift user account whose credentials are stored in AWS Secrets Manager. This user needs the necessary permissions within Redshift to perform the actions enabled by this server (e.g., `CONNECT` to the database, `SELECT` on target tables, `SELECT` on relevant system views like `pg_class`, `pg_namespace`, `svv_all_schemas`, `svv_tables`, `svv_table_info``). Using a role with the principle of least privilege is strongly recommended. See [Security Considerations](#security-considerations).

Credentials:

Your Redshift connection details are managed via AWS Secrets Manager, and the server connects using the Redshift Data API. You need:

*   The Redshift cluster identifier.
*   The database name within the cluster.
*   The ARN of the AWS Secrets Manager secret containing the database credentials (username and password).
*   The AWS region where the cluster and secret reside.
*   Optionally, an AWS profile name if not using default credentials/region.

These details will be configured via environment variables as detailed in the [Configuration](#configuration) section.

## Configuration

Set Environment Variables:
This server requires the following environment variables to connect to your Redshift cluster via the AWS Data API. You can set these directly in your shell, using a systemd service file, a Docker environment file, or by creating a `.env` file in the project's root directory (if using a tool like `uv` or `python-dotenv` that supports loading from `.env`).

Example using shell export:
```bash
export REDSHIFT_CLUSTER_ID="your-cluster-id"
export REDSHIFT_DATABASE="your_database_name"
export REDSHIFT_SECRET_ARN="arn:aws:secretsmanager:us-east-1:123456789012:secret:your-redshift-secret-XXXXXX"
export AWS_REGION="us-east-1" # Or AWS_DEFAULT_REGION
# export AWS_PROFILE="your-aws-profile-name" # Optional
```

Example `.env` file (see `.env.example`):
```dotenv
# .env file for Redshift MCP Server configuration
# Ensure this file is NOT committed to version control if it contains secrets. Add it to .gitignore.

REDSHIFT_CLUSTER_ID="your-cluster-id"
REDSHIFT_DATABASE="your_database_name"
REDSHIFT_SECRET_ARN="arn:aws:secretsmanager:us-east-1:123456789012:secret:your-redshift-secret-XXXXXX"
AWS_REGION="us-east-1" # Or AWS_DEFAULT_REGION
# AWS_PROFILE="your-aws-profile-name" # Optional
```

Required Variables Table:

| Variable Name         | Required | Description                                                      | Example Value                                                          |
| :-------------------- | :------- | :--------------------------------------------------------------- | :----------------------------------------------------------------------- |
| `REDSHIFT_CLUSTER_ID` | Yes      | Your Redshift cluster identifier.                                | `my-redshift-cluster`                                                  |
| `REDSHIFT_DATABASE`   | Yes      | The name of the database to connect to.                          | `mydatabase`                                                           |
| `REDSHIFT_SECRET_ARN` | Yes      | AWS Secrets Manager ARN for Redshift credentials.                | `arn:aws:secretsmanager:us-east-1:123456789012:secret:mysecret-abcdef` |
| `AWS_REGION`          | Yes      | AWS region for Data API and Secrets Manager.                     | `us-east-1`                                                            |
| `AWS_DEFAULT_REGION`  | No       | Alternative to `AWS_REGION` for specifying the AWS region.       | `us-west-2`                                                            |
| `AWS_PROFILE`         | No       | AWS profile name to use from your credentials file (~/.aws/...). | `my-redshift-profile`                                                  |

*Note: Ensure the AWS credentials used by Boto3 (via environment, profile, or IAM role) have permissions to access the specified `REDSHIFT_SECRET_ARN` and use the Redshift Data API (`redshift-data:*`).*

## Usage

### Connecting with Claude Desktop / Anthropic Console:
Add the following configuration block to your `mcp.json` file. Adjust `command`, `args`, `env`, and `workingDirectory` based on your installation method and setup.

```json
{
  "mcpServers": {
    "redshift-utils-mcp": {
      "command": "uvx",
      "args": ["redshift-utils-mcp"],
      "env": {
        "REDSHIFT_CLUSTER_ID":"your-cluster-id",
        "REDSHIFT_DATABASE":"your_database_name",
        "REDSHIFT_SECRET_ARN":"arn:aws:secretsmanager:...",
        "AWS_REGION": "us-east-1"
      }
  }
}
```

### Connecting with Claude Code CLI:
Use the Claude CLI to add the server configuration:

```bash
claude mcp add redshift-utils-mcp \
  -e REDSHIFT_CLUSTER_ID="your-cluster-id" \
  -e REDSHIFT_DATABASE="your_database_name" \
  -e REDSHIFT_SECRET_ARN="arn:aws:secretsmanager:..." \
  -e AWS_REGION="us-east-1" \
  -- uvx redshift-utils-mcp
```

### Connecting with Cursor IDE:
1.  Start the MCP server locally using the instructions in the [Usage / Quickstart](#usage--quickstart) section.
2.  In Cursor, open the Command Palette (Cmd/Ctrl + Shift + P).
3.  Type "Connect to MCP Server" or navigate to the MCP settings.
4.  Add a new server connection.
5.  Choose the `stdio` transport type.
6.  Enter the command and arguments required to start your server (`uvx run redshift_utils_mcp`). Ensure any necessary environment variables are available to the command being run.
7.  Cursor should detect the server and its available tools/resources.

### Available MCP Resources

| Resource URI Pattern                     | Description                                                                               | Example URI                       |
| :--------------------------------------- | :---------------------------------------------------------------------------------------- | :-------------------------------- |
| `/scripts/{script_path}`                 | Retrieves the raw content of a SQL script file from the server's `sql_scripts` directory. | `/scripts/health/disk_usage.sql`  |
| `redshift://schemas`                     | Lists all accessible user-defined schemas in the connected database.                      | `redshift://schemas`              |
| `redshift://wlm/configuration`           | Retrieves the current Workload Management (WLM) configuration details.                    | `redshift://wlm/configuration`    |
| `redshift://schema/{schema_name}/tables` | Lists all accessible tables and views within the specified `{schema_name}`.               | `redshift://schema/public/tables` |

Replace `{script_path}` and `{schema_name}` with the actual values when making requests.
Accessibility of schemas/tables depends on the permissions granted to the Redshift user configured via `REDSHIFT_SECRET_ARN`.

### Available MCP Tools

| Tool Name                           | Description                                                                                                  | Key Parameters (Required*)                                | Example Invocation                                                                              |
| :---------------------------------- | :----------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| `handle_check_cluster_health`       | Performs a health assessment of the Redshift cluster using a set of diagnostic SQL scripts.                  | `level` (optional), `time_window_days` (optional)         | `use_mcp_tool("redshift-admin", "handle_check_cluster_health", {"level": "full"})`              |
| `handle_diagnose_locks`             | Identifies active lock contention and blocking sessions in the cluster.                                      | `min_wait_seconds` (optional)                             | `use_mcp_tool("redshift-admin", "handle_diagnose_locks", {"min_wait_seconds": 10})`             |
| `handle_diagnose_query_performance` | Analyzes a specific query's execution performance, including plan, metrics, and historical data.             | `query_id`*                                               | `use_mcp_tool("redshift-admin", "handle_diagnose_query_performance", {"query_id": 12345})`      |
| `handle_execute_ad_hoc_query`       | Executes an arbitrary SQL query provided by the user via Redshift Data API. Designed as an escape hatch.     | `sql_query`*                                              | `use_mcp_tool("redshift-admin", "handle_execute_ad_hoc_query", {"sql_query": "SELECT ..."})`    |
| `handle_get_table_definition`       | Retrieves the DDL (Data Definition Language) statement (`SHOW TABLE`) for a specific table.                  | `schema_name`*, `table_name`*                             | `use_mcp_tool("redshift-admin", "handle_get_table_definition", {"schema_name": "public", ...})` |
| `handle_inspect_table`              | Retrieves detailed information about a specific Redshift table, covering design, storage, health, and usage. | `schema_name`*, `table_name`*                             | `use_mcp_tool("redshift-admin", "handle_inspect_table", {"schema_name": "analytics", ...})`     |
| `handle_monitor_workload`           | Analyzes cluster workload patterns over a specified time window using various diagnostic scripts.            | `time_window_days` (optional), `top_n_queries` (optional) | `use_mcp_tool("redshift-admin", "handle_monitor_workload", {"time_window_days": 7})`            |

## TO DO
- [ ] Improve Prompt Options
- [ ] Add support for more credential methods
- [ ] Add Support for Redshift Serverless

## Contributing

Contributions are welcome! Please follow these guidelines.

Find/Report Issues: Check the GitHub Issues page for existing bugs or feature requests. Feel free to open a new issue if needed.

Security is critical when providing database access via an MCP server. Please consider the following:

🔒 **Credentials Management:** This server uses AWS Secrets Manager via the Redshift Data API, which is a more secure approach than storing credentials directly in environment variables or configuration files. Ensure your AWS credentials used by Boto3 (via environment, profile, or IAM role) are managed securely and have the minimum necessary permissions. Never commit your AWS credentials or `.env` files containing secrets to version control.

🛡️ **Principle of Least Privilege:** Configure the Redshift user whose credentials are in AWS Secrets Manager with the minimum permissions required for the server's intended functionality. For example, if only read access is needed, grant only `CONNECT` and `SELECT` privileges on the necessary schemas/tables and `SELECT` on the required system views. Avoid using highly privileged users like `admin` or the cluster superuser.

For guidance on creating restricted Redshift users and managing permissions, refer to the official (https://docs.aws.amazon.com/redshift/latest/mgmt/security.html).

## License

This project is licensed under the MIT License. See the (LICENSE) file for details.

## References

*   This project relies heavily on the [Model Context Protocol specification](https://modelcontextprotocol.io/specification/).
*   Built using the official MCP SDK provided by [Model Context Protocol](https://modelcontextprotocol.io/).
*   Utilizes the AWS SDK for Python ([Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)) to interact with the [Amazon Redshift Data API](https://docs.aws.amazon.com/redshift-data/latest/APIReference/Welcome.html).
*   Many of the diagnostic SQL scripts are adapted from the excellent [awslabs/amazon-redshift-utils](https://github.com/awslabs/amazon-redshift-utils) repository.
