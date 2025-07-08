# Statsource MCP Server

A Model Context Protocol server that provides statistical analysis capabilities. This server enables LLMs to analyze data from various sources, calculate statistics, and generate predictions.

The statistics tool connects to our analytics API and allows AI models to perform statistical analysis and generate ML predictions based on user data, whether it's in a PostgreSQL database or a CSV file.

## Available Tools

### get_statistics

Analyze data and calculate statistics or generate ML predictions based on provided parameters.

**Arguments:**

- `columns` (list of strings, required): List of column names to analyze or predict (Ask user for exact column names).
- `data_source` (string, optional): Path to data file (uploaded to statsource.me), database connection string (ask user for exact string), or API endpoint. If not provided, uses `DB_CONNECTION_STRING` from env config if set.
- `source_type` (string, optional): Type of data source ("csv", "database", or "api"). If not provided, uses `DB_SOURCE_TYPE` from env config if set.
- `table_name` (string, optional but **required** if `source_type` is "database"): Name of the database table to use (Ask user for exact table name).
- `statistics` (list of strings, optional): List of statistics to calculate (required for `query_type="statistics"`). Valid options include: 'mean', 'median', 'std', 'sum', 'count', 'min', 'max', 'describe', 'correlation', 'missing', 'unique', 'boxplot'.
- `query_type` (string, optional, default="statistics"): Type of query ("statistics" or "ml_prediction").
- `periods` (integer, optional): Number of future periods to predict (required for `query_type="ml_prediction"`).
- `filters` (dict, optional): Dictionary of column-value pairs to filter data (e.g., `{"status": "completed", "region": ["North", "East"]}`).
- `groupby` (list of strings, optional): List of column names to group data by before calculating statistics (e.g., `["region", "product_category"]`).
- `options` (dict, optional): Dictionary of additional options for specific operations.
- `date_column` (string, optional): Column name containing date/timestamp information for filtering and time-series analysis.
- `start_date` (string or datetime, optional): Inclusive start date for filtering (ISO 8601 format, e.g., "2023-01-01").
- `end_date` (string or datetime, optional): Inclusive end date for filtering (ISO 8601 format, e.g., "2023-12-31").

**Key Usage Notes:**

- **Data Sources:** For CSV, the user must upload the file to statsource.me first and provide the filename. For databases, ask the user for the _exact_ connection string and table name. Never guess or invent connection details.
- **Configuration:** If `data_source` and `source_type` are not provided, the tool will attempt to use `DB_CONNECTION_STRING` and `DB_SOURCE_TYPE` from the environment configuration (see below).
- **Filtering/Grouping:** Use `filters`, `groupby`, `date_column`, `start_date`, and `end_date` to analyze specific subsets of data.

### suggest_feature

Suggest a new feature or improvement for the StatSource analytics platform.

**Arguments:**

- `description` (string, required): A clear, detailed description of the suggested feature
- `use_case` (string, required): Explanation of how and why users would use this feature
- `priority` (string, optional): Suggested priority level ("low", "medium", "high")

## Installation

### Using uv (recommended)

When using uv no specific installation is needed. We will use uvx to directly run mcp-server-stats.

### Docker Support

A pre-built Docker image is available on Docker Hub, which simplifies running the server. You can use this image directly without needing to build it yourself.

Pull the image (optional, as `docker run` will do this automatically if the image isn't present locally):

```bash
docker pull jamie78933/statsource-mcp
```

To run the server using the Docker image:

```bash
docker run -i --rm jamie78933/statsource-mcp
```

Note: For actual usage within applications like Claude.app, refer to the Configuration section below for passing necessary environment variables like API keys and database connection strings.

### Using PIP

Alternatively you can install mcp-server-stats via pip:

```bash
pip install mcp-server-stats
```

After installation, you can run it as a script using:

```bash
python -m mcp_server_stats
```

Or use the console script:

```bash
mcp-server-stats
```

## Configuration

### Configure for Claude.app

Add to your Claude settings:

**Using uvx**

```json
"mcpServers": {
  "statsource": {
    "command": "uvx",
    "args": ["mcp-server-stats"]
  }
}
```

**Using docker**

```json
{
  "mcpServers": {
    "statsource": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "API_KEY=YOUR_STATSOURCE_API_KEY",
        "-e",
        "DB_CONNECTION_STRING=postgresql://your_db_user:your_db_password@your_db_host:5432/your_db_name",
        "-e",
        "DB_SOURCE_TYPE=database",
        "jamie78933/statsource-mcp"
      ],
      "protocolVersion": "2024-11-05"
    }
  }
}
```

**Using pip installation**

```json
"mcpServers": {
  "statsource": {
    "command": "python",
    "args": ["-m", "mcp_server_stats"]
  }
}
```

### Environment Variables

You can configure the server using environment variables in your Claude.app configuration:

```json
"mcpServers": {
  "statsource": {
    "command": "python",
    "args": ["-m", "mcp_server_stats"],
    "env": {
      "API_KEY": "your_api_key",
      "DB_CONNECTION_STRING": "postgresql://username:password@localhost:5432/your_db",
      "DB_SOURCE_TYPE": "database"
    }
  }
}
```

Available environment variables:

- `API_KEY`: Your API key for authentication with statsource.me
- `DB_CONNECTION_STRING`: Default database connection string
- `DB_SOURCE_TYPE`: Default data source type (usually "database")

## Debugging

You can use the MCP inspector to debug the server. For uvx installations:

```bash
npx @modelcontextprotocol/inspector uvx mcp-server-stats
```

Or if you've installed the package in a specific directory or are developing on it:

```bash
cd path/to/servers/
npx @modelcontextprotocol/inspector python -m mcp_server_stats
```

## Contributing

We encourage contributions to help expand and improve mcp-server-stats. Whether you want to add new tools, enhance existing functionality, or improve documentation, your input is valuable.

Pull requests are welcome! Feel free to contribute new ideas, bug fixes, or enhancements to make mcp-server-stats even more powerful and useful.

## License

mcp-server-stats is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
