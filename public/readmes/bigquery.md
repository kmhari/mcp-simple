# MCP BigQuery Server

[![Actions Status](https://github.com/monochromegane/mcp-bigquery-server/actions/workflows/test.yaml/badge.svg?branch=main)][actions]

[actions]: https://github.com/monochromegane/mcp-bigquery-server/actions?workflow=test

## Overview

MCP BigQuery Server is a server that allows you to query BigQuery tables using MCP. Written in Go, it's lightweight and easy to install with just a few commands.

## Installation

```sh
$ brew tap monochromegane/tap
$ brew install monochromegane/tap/mcp-bigquery-server
```

## Available Tools

- `list_allowed_datasets`: Get a listing of all allowed datasets.
- `list_tables`: Get a detailed listing of all tables in a specified dataset.
- `get_table_schema`: Get the schema of a specified table in a specified dataset.
- `dry_run_query`: Dry run a query to get the estimated cost and time.

## Registration

To use MCP BigQuery Server in Cursor, add the following configuration to your `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "BigQuery": {
      "command": "mcp-bigquery-server",
      "args": [
        "start",
        "--project",
        "sample-project",
        "--dataset",
        "test1",
        "--dataset",
        "test2"
      ]
    }
  }
}
```

Note: You can specify multiple datasets by repeating the `--dataset` argument.

## License

[MIT](https://github.com/monochromegane/mcp-bigquery-server/blob/main/LICENSE)

## Author

[monochromegane](https://github.com/monochromegane)