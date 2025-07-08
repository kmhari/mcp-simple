# MCP Server for Netwrix Access Analyzer

A FastMCP-based server for Netwrix Access Analyzer data analysis, designed to integrate with Claude Desktop for enhanced data analysis capabilities.

## Features

- SQL Server integration with automatic connection on startup
- Dynamic database schema exploration
- SQL query execution
- Netwrix Access Analyzer File System tools

## Dependencies

This MCP server requires the following dependencies:

- Python 3.12 or higher
- MCP SDK
- pyodbc 4.0.39 or higher (for SQL Server connectivity)
- python-dotenv 1.0.0 or higher (for environment variable management)
- ODBC Driver 17 for SQL Server or later (must be installed on your system)

### Netwrix Access Analyzer (NAA) Dependencies

This MCP Server requires Netwrix Access Analyzer (NAA) File System scans to be completed.

## Installation

### System Dependencies

First, ensure you have the ODBC Driver for SQL Server installed:

- **macOS**: Install using Homebrew: `brew install microsoft/mssql-release/msodbcsql17`
- **Windows**: Download and install from the [Microsoft ODBC Driver page](https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server)
- **Linux**: Follow [Microsoft's instructions](https://learn.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server) for your distribution

### Python Dependencies

Install required Python packages using `uv`

### Database Setup

For development or testing purposes only: 

1. Create a `.env` file in your project directory with your SQL Server connection details:

```
# Database Connection Information
DB_SERVER=your_server_name
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_USE_WINDOWS_AUTH=FALSE     # Set to TRUE to use Windows Authentication
```

2. Replace the example values with your actual database connection information.

## Integration with Claude Desktop

To make this MCP server available in Claude Desktop:

1. Open Claude Desktop
2. Navigate to the Claude Desktop configuration file:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
3. Add the following configuration to the `mcpServers` section.   
4. Restart Claude Desktop

### Example Configuration

```json
"NetwrixAccessAnalyzer": {
  "command": "/path/to/your/uv",
  "args": [
    "run",
    "--with",
    "pyodbc,fastmcp",
    "fastmcp",
    "run",
    "/path/to/mcp/main.py"
  ],
  "env": {
    "DB_SERVER": "your_server_address",
    "DB_NAME": "your_database_name",
    "DB_USER": "your_username",
    "DB_PASSWORD": "your_password",
    "DB_USE_WINDOWS_AUTH": "FALSE"
  }
}
```

1. Replace `/path/to/your/uv` with the actual path to your `uv` executable (find with `which uv` or `where uv`), and update the path to your `main.py` file as well as the database connection information.
2. Restart Claude Desktop to apply the changes

## Available Tools and Sample Prompts

The MCP server provides the following tools for interacting with database systems and analyzing access data:

### Database Connection Tools

#### Connect-Database

Connect to a MS SQL Server database.

**Parameters:**
- `server`: SQL Server address
- `database`: Database name
- `username`: SQL Server username (optional if using Windows auth)
- `password`: SQL Server password (optional if using Windows auth)
- `trusted_connection`: Boolean flag for Windows Authentication

**Example prompt:**
"Connect to our SQL Server database at [DBSERVER] with the name [DBNAME] using the [USERNAME] user and [PASSWORD] password."

#### Show-ConnectionStatus

Check the current database connection status.

**Example prompt:**
"Is the database currently connected? Show me the connection status."

### Data Query and Schema Tools

#### Show-TableSchema

Get a detailed explanation of a database table's schema.

**Parameters:**
- `table_name`: Name of the table to explain

**Example prompt:**
"Explain the schema of the Permissions table. What columns does it have?"

#### Get-TableSchema

Retrieves the schema information for a specific table.

**Parameters:**
- `table_name`: Name of the table to get schema for.

**Example prompt:**
"Show me the schema for the Users table."

#### Get-TableSample

Retrieves a sample of 10 rows from the specified table.

**Parameters:**
- `tablename`: Name of the table to sample

**Example prompt:**
"Give me a sample of 10 rows from the Permissions table."

### Access Analysis Tools

#### Discover-SensitiveData

Identify locations containing sensitive data.

**Example prompt:**
"Find all shares that contain sensitive data in our environment."

#### Get-TrusteeAccess

Identify where a specific user or group has access.

**Parameters:**
- `trustee`: Domain\Username format
- `levelsdown`: How many directory levels to traverse (default: 0)

**Example prompt:**
"Where does DOMAIN\JohnDoe have access in our file systems?"

#### Get-TrusteePermissionSource

Determine the source of a user's permissions for a specific resource.

**Parameters:**
- `trustee`: Domain\Username format
- `resourcepath`: Path to the resource

**Example prompt:**
"Why does DOMAIN\JaneDoe have access to \\server\share\folder? What's the source of this permission?"

#### Get-ResourceAccess

Show who has access to a specific resource.

**Parameters:**
- `resource`: Path to the resource

**Example prompt:**
"Who has access to \\server\finance? Show me all users and groups."

#### Get-UnusedAccess

Find users with unused access to a specific resource.

**Parameters:**
- `resource`: Path to the resource

**Example prompt:**
"Find all users who haven't accessed \\server\hr in the last year."

#### Get-ShadowAccess

Find users with shadow access to critical resources.

**Example prompt:**
"Find all users who have shadow access to credit cards"
"Find sbcloudlab\admins shadow access"

### Operational Tools

#### Get-RunningJobs

Check currently running Netwrix Access Analyzer jobs.

**Example prompt:**
"Are there any Access Analyzer jobs running right now? Show me the status."

## Troubleshooting

### Connection Issues

If you encounter connection issues:

1. Verify your SQL Server is running and accessible from your network
2. Check your credentials in the `.env` file
3. Ensure the ODBC driver is correctly installed
4. Check the logs for detailed error messages

### Claude Desktop Integration

If Claude Desktop can't find the `uv` command:

1. Use the full path to `uv` in your configuration (use `which uv` or `where uv` to find it)
2. Make sure you've restarted Claude Desktop after configuration changes
3. Check the Claude logs for any error messages related to the MCP server