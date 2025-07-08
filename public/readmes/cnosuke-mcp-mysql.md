# MCP MySQL Server

MCP MySQL Server is a Go-based MCP server implementation that provides MySQL database interaction functionality, allowing MCP clients (e.g., Claude Desktop) to perform database operations.

## Features

- MCP Compliance: Provides a JSON‐RPC based interface for tool execution according to the MCP specification.
- MySQL Operations: Supports database operations such as querying, schema inspection, and (optionally) data manipulation.
- Read-Only Mode: Optional restriction to prevent data modification operations.
- Query Plan Verification: Optional EXPLAIN analysis to verify query safety.
- URL-Style Connection Strings: Supports standard URL-style database connection strings like `mysql://user:pass@host:port/dbname`.
- Minimal Container: Built with Google's distroless for improved security and smaller image size.

## Requirements

- Docker (recommended)

For local development:

- Go 1.24 or later
- MySQL server (local or remote)

## Using with Docker (Recommended)

```bash
# Pull the image
docker pull cnosuke/mcp-mysql:latest

# Run with default settings
docker run -i --rm cnosuke/mcp-mysql:latest

# Run with custom MySQL connection
docker run -i --rm \
  -e MYSQL_HOST=your-mysql-host \
  -e MYSQL_PORT=3306 \
  -e MYSQL_USER=your-username \
  -e MYSQL_PASSWORD=your-password \
  -e MYSQL_DATABASE=your-database \
  cnosuke/mcp-mysql:latest

# Run in read-only mode
docker run -i --rm \
  -e MYSQL_HOST=your-mysql-host \
  -e MYSQL_USER=your-username \
  -e MYSQL_PASSWORD=your-password \
  -e MYSQL_DATABASE=your-database \
  -e MYSQL_READ_ONLY=true \
  cnosuke/mcp-mysql:latest
```

### Using with Claude Desktop (Docker)

To integrate with Claude Desktop using Docker, add an entry to your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "mysql": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "cnosuke/mcp-mysql:latest"],
      "env": {
        "MYSQL_HOST": "your-mysql-host",
        "MYSQL_PORT": "3306",
        "MYSQL_USER": "your-username",
        "MYSQL_PASSWORD": "your-password",
        "MYSQL_DATABASE": "your-database",
        "MYSQL_READ_ONLY": "false"
      }
    }
  }
}
```

## Building and Running (Go Binary)

Alternatively, you can build and run the Go binary directly:

```bash
# Build the server
make

# Run the server
./bin/mcp-mysql server --config=config.yml
```

### Using with Claude Desktop (Go Binary)

To integrate with Claude Desktop using the Go binary, add an entry to your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "mysql": {
      "command": "./bin/mcp-mysql",
      "args": ["server"],
      "env": {
        "LOG_PATH": "mcp-mysql.log",
        "DEBUG": "false",
        "MYSQL_HOST": "your-mysql-host",
        "MYSQL_PORT": "3306",
        "MYSQL_USER": "your-username",
        "MYSQL_PASSWORD": "your-password",
        "MYSQL_DATABASE": "your-database",
        "MYSQL_READ_ONLY": "false"
      }
    }
  }
}
```

## Docker Image Details

This project uses Google's distroless container images for the final Docker image. The `gcr.io/distroless/static` base image provides:

- Minimal attack surface - only the necessary components are included
- Smaller image size - no shell, package manager, or other unnecessary binaries
- Improved security - reduced number of potential vulnerabilities

The Docker image is built using a multi-stage build process:

1. First stage uses Go Alpine to build the application
2. Second stage uses distroless/static with just the compiled binary

## Configuration

The server is configured via a YAML file (default: config.yml) or environment variables:

```yaml
log: 'path/to/mcp-mysql.log' # Log file path, if empty no log will be produced
debug: false # Enable debug mode for verbose logging

mysql:
  host: 'localhost'
  user: 'root'
  password: ''
  port: 3306
  database: ''
  dsn: ''
  read_only: false
  explain_check: false
```

### Connection Options

You can specify MySQL connection details in three ways (in order of precedence):

1. **Tool Parameter**: Pass a `dsn` parameter directly to any tool when invoking it
2. **DSN in Config**: Set the `mysql.dsn` value in the configuration file
3. **Individual Parameters**: Set individual connection parameters in the configuration file

If no connection information is provided in any of these ways, the server will return an error message prompting you to provide connection details.

### Configuration Options

- `mysql.host`: MySQL server hostname (default: 'localhost')
- `mysql.user`: MySQL username (default: 'root')
- `mysql.password`: MySQL password
- `mysql.port`: MySQL port (default: 3306)
- `mysql.database`: MySQL database name
- `mysql.dsn`: MySQL DSN (Data Source Name) string. If provided, this overrides the individual connection parameters
- `mysql.read_only`: Enable read-only mode. In this mode, only tools beginning with `list`, `read_` and `desc_` are available
- `mysql.explain_check`: Check query plan with `EXPLAIN` before executing

You can override configurations using environment variables:

- `LOG_PATH`: Path to log file
- `DEBUG`: Enable debug mode (true/false)
- `MYSQL_HOST`: MySQL server hostname
- `MYSQL_PORT`: MySQL server port
- `MYSQL_USER`: MySQL username
- `MYSQL_PASSWORD`: MySQL password
- `MYSQL_DATABASE`: MySQL database name
- `MYSQL_DSN`: MySQL DSN string
- `MYSQL_READ_ONLY`: Enable read-only mode (true/false)
- `MYSQL_EXPLAIN_CHECK`: Enable query plan checking (true/false)

## Logging

Logging behavior is controlled through configuration:

- If `log` is set in the config file, logs will be written to the specified file
- If `log` is empty, no logs will be produced
- Set `debug: true` for more verbose logging

## MCP Server Tools

MCP clients interact with the server by sending JSON‐RPC requests to execute various tools. The following MCP tools are supported:

### Schema Tools

1. `list_database`

   - List all databases in the MySQL server.
   - Parameters:
     - `dsn` (optional): MySQL DSN string to override configuration.
   - Returns: A list of matching database names.

2. `list_table`

   - List all tables in the MySQL server.
   - Parameters:
     - `dsn` (optional): MySQL DSN string to override configuration.
   - Returns: A list of matching table names.

3. `create_table` (not available in read-only mode)

   - Create a new table in the MySQL server.
   - Parameters:
     - `query`: The SQL query to create the table.
     - `dsn` (optional): MySQL DSN string to override configuration.
   - Returns: x rows affected.

4. `alter_table` (not available in read-only mode)

   - Alter an existing table in the MySQL server. The LLM is informed not to drop an existing table or column.
   - Parameters:
     - `query`: The SQL query to alter the table.
     - `dsn` (optional): MySQL DSN string to override configuration.
   - Returns: x rows affected.

5. `desc_table`

   - Describe the structure of a table.
   - Parameters:
     - `name`: The name of the table to describe.
     - `dsn` (optional): MySQL DSN string to override configuration.
   - Returns: The structure of the table.

### Data Tools

1. `read_query`

   - Execute a read-only SQL query.
   - Parameters:
     - `query`: The SQL query to execute.
     - `dsn` (optional): MySQL DSN string to override configuration.
   - Returns: The result of the query.

2. `write_query` (not available in read-only mode)

   - Execute a write SQL query.
   - Parameters:
     - `query`: The SQL query to execute.
     - `dsn` (optional): MySQL DSN string to override configuration.
   - Returns: x rows affected, last insert id: <last_insert_id>.

3. `update_query` (not available in read-only mode)

   - Execute an update SQL query.
   - Parameters:
     - `query`: The SQL query to execute.
     - `dsn` (optional): MySQL DSN string to override configuration.
   - Returns: x rows affected.

4. `delete_query` (not available in read-only mode)

   - Execute a delete SQL query.
   - Parameters:
     - `query`: The SQL query to execute.
     - `dsn` (optional): MySQL DSN string to override configuration.
   - Returns: x rows affected.

## MySQL DSN Format

The `dsn` parameter or `mysql.dsn` configuration option can be specified in two formats:

### 1. Native MySQL DSN Format

```
[username[:password]@][protocol[(address)]]/dbname[?param1=value1&...&paramN=valueN]
```

Example: `username:password@tcp(localhost:3306)/mydb?parseTime=true&loc=Local`

Please refer to [MySQL DSN](https://github.com/go-sql-driver/mysql#dsn-data-source-name) for more details on this format.

### 2. URL-Style Connection Format

```
mysql://username:password@hostname:port/dbname?param1=value1&param2=value2
```

Example: `mysql://root:pass@localhost:3306/mydb?parseTime=true&loc=Local`

This URL-style format is automatically converted to the native MySQL DSN format.
Supported URL schemes include: `mysql://`, `mariadb://`.

## Command-Line Parameters

When starting the server, you can specify various settings:

```bash
./bin/mcp-mysql server [options]
```

Options:

- `--config`, `-c`: Path to the configuration file (default: "config.yml").

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for improvements or bug fixes. For major changes, open an issue first to discuss your ideas.

## License

This project is licensed under the MIT License.

Author: cnosuke ( x.com/cnosuke )
