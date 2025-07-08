# ClickHouse MCP Server

This project implements a Model Context Protocol (MCP) server for ClickHouse, allowing seamless integration of ClickHouse databases with Large Language Models (LLMs) and other AI applications.

## Features

- List ClickHouse databases and tables as resources
- Retrieve table schemas
- Execute SELECT queries on ClickHouse databases
- Secure and efficient communication using the MCP protocol

## Requirements

- Python 3.10+
- ClickHouse server

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/ThomAub/clickhouse_mcp_server.git
   cd clickhouse_mcp_server
   ```

2. Install the required packages:
   ```
   uv sync --all-extras
   ```

3. Set up your ClickHouse connection details in environment variables or update the `get_clickhouse_client` function in `server.py`.

## Usage

Run the server:

```
python clickhouse_mcp_server/server.py
```

The server will start and listen for MCP requests.

## Testing

Run the tests using pytest:

```
pytest tests/
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
