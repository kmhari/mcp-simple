# SQL MCP Server for Claude Desktop

A natural language interface to your local MySQL databases through Claude Desktop. This MCP (Machine Communication Protocol) server allows Claude to execute SQL queries on your local MySQL databases, enabling you to interact with your databases using natural language.

## Features

- Natural language to SQL query conversion through Claude
- Secure connection to local MySQL databases
- Support for multiple databases
- Transaction management for data consistency
- Connection pooling for better performance
- Support for all types of SQL queries (SELECT, INSERT, UPDATE, DELETE, etc.)

## Prerequisites

- Python 3.8 or higher
- MySQL server installed and running
- Claude Desktop application
- Virtual environment (recommended)

## Installation

1. Clone this repository:
```bash
git clone git@github.com:meanands/mysql-mcp.git
cd mysql-mcp
```

2. Create and activate a virtual environment:
```bash
# For macOS/Linux
python -m venv venv
source venv/bin/activate

# For Windows
python -m venv venv
venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the project root with your MySQL credentials:
```env
MYSQL_HOST=localhost
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
```

5. Update the directory path in `run.sh`:
```bash
# Open run.sh and replace this line:
cd /Users/yourname/code/sql-mcp
# with your actual project directory path, for example:
cd /Users/yourname/projects/mysql-mcp
```

6. Make the run script executable:
```bash
chmod +x run.sh
```

## Configuration in Claude Desktop

1. Open Claude Desktop's MCP configuration
2. Add the following configuration:
```json
{
  "sql": {
    "command": "/absolute/path/to/your/mysql-mcp/run.sh"
  }
}
```
Replace `/absolute/path/to/your/mysql-mcp` with the actual absolute path to your project directory.

## Usage

Once configured, you can interact with your databases through Claude Desktop using natural language. Examples:

1. Selecting a database and creating a table:
```
Use the 'employees' database and create a table for storing employee information with fields for name, email, and department.
```

2. Inserting data:
```
Insert a new employee named John Doe with email john.doe@example.com in the Engineering department.
```

3. Querying data:
```
Show me all employees in the Engineering department.
```

## Important Notes

- Always use absolute paths in the run.sh script and Claude Desktop configuration
- Ensure MySQL server is running before using the MCP server
- Keep your .env file secure and never commit it to version control
- The MCP server uses connection pooling with a default pool size of 5 connections

## Troubleshooting

1. If you get a "connection refused" error, ensure your MySQL server is running
2. If you get an authentication error, verify your credentials in the .env file
3. For permission errors, ensure your MySQL user has appropriate privileges for the operations you're trying to perform

## Security Considerations

- Store sensitive credentials in the .env file
- Use a MySQL user with appropriate permissions (avoid using root)
- Keep your virtual environment and dependencies up to date
- Consider network security if accessing non-localhost MySQL servers
