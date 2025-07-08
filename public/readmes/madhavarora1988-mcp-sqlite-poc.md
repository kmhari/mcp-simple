# SQLite MCP Server

A Model Context Protocol (MCP) server implementation for SQLite databases, allowing AI models to interact with SQLite databases through standardized tools.

## Features

- **Query Execution**: Execute SQL queries with built-in validation and safety checks
- **Schema Discovery**: List tables and describe table schemas
- **Row Counting**: Count rows in specified tables
- **Sample Data**: Insert sample data for demonstration purposes (when not in read-only mode)
- **Automatic Initialization**: Creates a sample database with products, customers, orders, and feedback if none exists
- **Read-Only Mode**: Option to restrict to read-only operations for safety
- **Feedback Collection**: Tool to collect user feedback and store it in the database

## Requirements

- Python 3.8+
- Dependencies listed in `requirements.txt`

## Installation

1. Clone this repository
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Configure environment variables (optional):
   - Copy `.env.example` to `.env` (or use the existing `.env` file)
   - Modify settings as needed

## Usage

### Starting the Server

```bash
python server.py
```

The server will start on port 8080 (or the port specified in your `.env` file).

### Configuration Options

Configure the server by editing the `.env` file:

```
DB_PATH=sample.db         # Path to your SQLite database file
MCP_PORT=8080             # Port to run the MCP server on
READ_ONLY=true            # Set to false to allow write operations
```

### Using with Claude Desktop

Add this server to your Claude Desktop configuration:

```json
{
"mcpServers": {
		"sqlite": {
			"command": "<Path to UV>",
			"args": [
				"--directory",
				"<Absolute Path to Project Workspace>",
				"run",
				"server.py"
			]
		}
	}
}
```

### Available Tools

The MCP server provides the following tools:

1. **execute_query** - Execute SQL queries on the database
2. **list_tables** - List all tables in the database
3. **describe_table** - Get the schema for a specific table
4. **count_rows** - Count rows in a specific table
5. **insert_sample_data** - Insert sample data (disabled in read-only mode)
6. **add_feedback** - Add user feedback to the feedback table (disabled in read-only mode)

## Sample Database Schema

The sample database includes:

### Products Table
- id (INTEGER, PRIMARY KEY)
- name (TEXT, NOT NULL)
- description (TEXT)
- price (REAL, NOT NULL)
- category (TEXT)
- in_stock (BOOLEAN)

### Customers Table
- id (INTEGER, PRIMARY KEY)
- name (TEXT, NOT NULL)
- email (TEXT, UNIQUE)
- signup_date (TEXT)

### Orders Table
- id (INTEGER, PRIMARY KEY)
- customer_id (INTEGER, FOREIGN KEY)
- order_date (TEXT)
- total_amount (REAL)

### Feedback Table
- id (INTEGER, PRIMARY KEY)
- user (TEXT, NOT NULL)
- email (TEXT, NOT NULL)
- feedback (TEXT, NOT NULL)
- submission_date (TEXT, DEFAULT CURRENT_TIMESTAMP)

## Security Considerations

- SQL queries are validated to prevent dangerous operations
- In read-only mode, all data modification operations are blocked
- Consider running in read-only mode for production use

## License

MIT License 