# Model Context Protocol PostgreSQL Server

This project implements a Model Context Protocol (MCP) server that connects to a PostgreSQL database. It allows AI models to interact with your database through a standardized protocol.

## Features

- Connects to a PostgreSQL database using connection pooling
- Implements the Model Context Protocol for AI model interaction
- Provides database schema information as resources
- Allows executing SQL queries with retry logic
- Handles connection errors gracefully

## Prerequisites

- Node.js 20 or higher
- PostgreSQL database
- Access credentials for the database

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

## Configuration

The server reads database credentials from a `.env` file in the project root directory. You need to add your database credentials as a JSON string in the `DB_CREDENTIALS` environment variable:

1. Create a `.env` file in the project root:

```bash
touch .env
```

2. Add the following line with your actual database credentials:

```bash
export DB_CREDENTIALS='{"DB_USER":"your-username","DB_PASSWORD":"your-password","DB_HOST":"your-host","DB_PORT":"5433","DB_NAME":"your-database"}'
```

### Fallback to Shell Config Files

If the `.env` file is not present or the credentials variable is not found, the server will automatically look for the credentials in your shell configuration files in the following order:

1. `~/.zshrc`
2. `~/.bashrc` 
3. `~/.bash_profile`
4. `~/.profile`

This is especially useful in environments where shell config files are not automatically sourced, such as the Cursor MCP environment.

To set up credentials in any of your shell config files:

1. Open your preferred shell config file, for example:

```bash
nano ~/.zshrc
# or
nano ~/.bashrc
```

2. Add the following line with your actual database credentials:

```bash
export DB_CREDENTIALS='{"DB_USER":"your-username","DB_PASSWORD":"your-password","DB_HOST":"your-host","DB_PORT":"5433","DB_NAME":"your-database"}'
```

The server will automatically detect and use these credentials when the `.env` file is not available.

### Custom Credentials Variable

You can also use a custom environment variable name instead of `DB_CREDENTIALS` by using the `--credentials-var` flag when starting the server:

```bash
node server.js --credentials-var MY_CUSTOM_DB_CREDS
```

In this case, you would define `MY_CUSTOM_DB_CREDS` in your `.env` file instead.

### Combining Options

You can combine different command-line options as needed:

```bash
# Use custom credentials and enable verbose mode
node server.js --credentials-var MY_CUSTOM_DB_CREDS --verbose

# Short form also works
node server.js -c MY_CUSTOM_DB_CREDS -v
```

## Usage

Start the MCP server:

```bash
# Directly with Node.js
node server.js

# Or with npm
npm start
```

### Logging Options

By default, the server runs in silent mode, displaying only error messages. If you want to see all log messages, you can use the verbose flag:

```bash
# With verbose logging
node server.js --verbose

# Or with npm
npm start -- --verbose
```

You can also use the short flag `-v`:

```bash
node server.js -v
```

The server will:
1. Test the database connection
2. Start the MCP server using stdio transport
3. Handle requests from AI models

## Integration with Cursor

This server supports the Model Context Protocol (MCP) and integrates with Cursor AI. 

### Automatic Configuration

This project includes a pre-configured `.cursor/mcp.json` file for automatic setup within Cursor.

### Manual Configuration

To manually add this server to Cursor:

1. Go to Cursor Settings → Features → MCP
2. Click "+ Add New MCP Server"
3. Enter the following details:
   - **Name**: Postgres MCP
   - **Type**: stdio
   - **Command**: `node /full/path/to/server.js`
   
For more information on MCP integration with Cursor, see the [official documentation](https://cursor.sh/docs/mcp).

## Available Tools

The server provides the following tools to AI models:

- `query`: Execute SQL queries with retry logic

## Resources

The server exposes database tables as resources, allowing AI models to:

- List all tables in the database
- View schema information for each table

## Error Handling

The server includes:

- Connection retry logic
- Detailed error logging
- Graceful shutdown handling

## Troubleshooting

### Connection Issues

1. **Database Connection Failed**
   - Check if PostgreSQL is running: `pg_isready -h localhost -p 5433`
   - Verify your credentials in the `.env` file are correct
   - Make sure your IP address has access to the database (check pg_hba.conf)
   - Try connecting with another tool like `psql` to verify credentials

2. **Environment Variable Problems**
   - Make sure your `.env` file is in the project root directory
   - Check that the JSON structure in `DB_CREDENTIALS` is valid
   - Verify there are no extra spaces or line breaks in the JSON string
   - Test with: `node -e "console.log(JSON.parse(process.env.DB_CREDENTIALS))" < .env`

3. **Node.js Version Issues**
   - Check your Node.js version: `node -v`
   - This server requires Node.js 20+
   - If using an older version, install Node.js 20: `nvm install 20 && nvm use 20`

### Cursor Integration

1. **Server Not Showing in Cursor**
   - Make sure the `.cursor/mcp.json` file exists and is properly formatted
   - Try restarting Cursor to detect the project-specific configuration
   - Check Cursor logs for any error messages

2. **"Failed to create client" Error**
   - This usually indicates the server crashed during startup
   - Run the server manually with verbose logging to see the error: `node server.js -v`
   - Check if the database credentials are accessible in the Cursor environment

3. **No Tools Available in Cursor**
   - Ensure the server is running properly (check logs)
   - Try clicking the refresh button in the MCP tool panel
   - Restart Cursor and try again

### PostgreSQL Specific Issues

1. **Permission Denied Errors**
   - Make sure the database user has appropriate permissions for the tables
   - Try granting required permissions: `GRANT SELECT ON ALL TABLES IN SCHEMA public TO username;`

2. **"Relation does not exist" Errors**
   - Verify that the table exists: `\dt tablename` in psql
   - Check if you're connecting to the correct database
   - Ensure the user has access to the schema where the table is located

3. **Performance Issues**
   - Large query results may cause lag, consider adding LIMIT clauses
   - Check if your database needs optimization (indexes, vacuuming)

For additional help, you can run the server with verbose logging (`-v` flag) to see detailed error messages and operation logs.

## License

MIT
