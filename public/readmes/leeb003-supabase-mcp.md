# Supabase MCP Server

A Model Context Protocol server for interacting with Supabase databases using FastAPI and FastMCP. This server provides a set of tools for performing CRUD operations on Supabase tables through a standardized interface.

## Project Structure

```
supabase-mcp/
├── src/
│   ├── server.py        # FastAPI + MCP server
│   ├── config.py        # Configuration management
│   ├── types.py         # Pydantic models
│   ├── supabase_client.py  # Supabase client setup
│   └── tools/
│       └── database.py  # Database operations
├── tests/
│   ├── test_types.py    # Unit tests
│   └── test_integration.py  # Integration tests
├── .env.example         # Environment variables template
├── config.json.example  # Server configuration template
├── pyproject.toml      # Project configuration
├── requirements.txt    # Project dependencies
└── README.md          # Documentation
```

## Features

- FastAPI server with health endpoint
- Read rows from tables with filtering, column selection, and sorting
- Create single or multiple records
- Update records based on filters
- Delete records based on filters
- Full Pydantic validation for all operations
- Comprehensive type hints and documentation
- Integration tests with Supabase
- Real-time database event streaming using Server-Sent Events (SSE)

## Setup

1. Create a Python 3.11+ virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Copy configuration files:
```bash
cp .env.example .env
cp config.json.example config.json
```

4. Update configuration files with your Supabase credentials:
- `.env`: Set your Supabase URL and key
- `config.json`: Adjust server settings if needed

## Running the Server

```bash
python -m src.server
```

The server will start on http://localhost:3000 by default.

## Running Tests

```bash
# Run all tests
pytest

# Run only unit tests
pytest tests/test_types.py

# Run only integration tests
pytest tests/test_integration.py
```

## API Endpoints

### Health Check
- GET `/health`
  - Returns server status and version

## MCP Tools

### read_table_rows
Read and filter rows from a table with optional column selection, filtering, sorting, and pagination.

Example:
```python
{
    "table_name": "users",
    "columns": ["id", "name", "email"],
    "filters": {"active": true},
    "order_by": {"created_at": "desc"},
    "limit": 10
}
```

### create_records
Create one or multiple records in a table.

Example:
```python
{
    "table_name": "users",
    "records": [
        {"name": "John", "email": "john@example.com"},
        {"name": "Jane", "email": "jane@example.com"}
    ]
}
```

### update_records
Update records that match specific criteria.

Example:
```python
{
    "table_name": "users",
    "updates": {"status": "verified"},
    "filters": {"email": "john@example.com"}
}
```

### delete_records
Delete records that match specific criteria.

Example:
```python
{
    "table_name": "users",
    "filters": {"status": "inactive"}
}
```

## Server-Sent Events (SSE) Support

The Supabase MCP Server provides real-time event streaming using Server-Sent Events (SSE). This allows clients (such as MCP clients or custom UIs) to receive live notifications from the server without polling.

### SSE Endpoints

- **GET `/sse/stream`**
  - Clients can connect to this endpoint to receive a live stream of server events.
  - The response uses the `text/event-stream` media type.
  - Example (using `curl`):
    ```bash
    curl -N http://localhost:3000/sse/stream
    ```

- **POST `/sse/messages`**
  - Internal components or authorized users can broadcast a message to all connected SSE clients.
  - Example (using `curl`):
    ```bash
    curl -X POST http://localhost:3000/sse/messages \
      -H "Content-Type: application/json" \
      -d '{"message": "Hello, SSE!"}'
    ```

### Usage Notes
- The SSE stream remains open; each message is sent as a new event.
- For production, restrict the `/sse/messages` endpoint to internal or authenticated use.
- This feature is fully async and does not interfere with existing MCP or Supabase endpoints.

### Example Use Cases
- Notify clients of schema changes or new data.
- Provide live feedback for long-running operations.
- Enable UIs to react to backend events in real-time.

## Docker

You can run this MCP server in a Docker container:

```sh
# Build the Docker image
docker build -t supabase-mcp .

# Run the container (using your .env file for environment variables)
docker run --env-file .env -p 3000:3000 supabase-mcp
```

The server will be available at http://localhost:3000

## Cursor Integration

This MCP server is designed to work with Cursor. To set it up:

1. Ensure you have Cursor installed and updated to the latest version.

2. Set up your environment variables in Cursor:
   - Open Cursor Settings
   - Navigate to Environment Variables
   - Add the following variables:
     ```
     SUPABASE_URL=your_project_url
     SUPABASE_KEY=your_service_role_key
     ```

3. The `.cursor/mcp.json` file is already configured with:
   ```json
   {
     "mcpServers": {
       "supabase": {
         "command": "python",
         "args": ["-m", "src.server"],
         "env": {
           "SUPABASE_URL": "${env:SUPABASE_URL}",
           "SUPABASE_KEY": "${env:SUPABASE_KEY}",
           "SERVER_PORT": "3000",
           "PYTHONPATH": "${workspaceFolder}"
         },
         "cwd": "${workspaceFolder}"
       }
     }
   }
   ```

4. Verify Integration:
   - Open Cursor
   - Go to Settings > MCP
   - You should see "supabase" listed with a green status
   - If not green, check your environment variables and Python setup

5. Test the Integration:
   Try these example queries in Cursor:
   ```
   List all users in the database
   ```
   ```
   Create a new user with email test@example.com and name "Test User"
   ```
   ```
   Update the user with email test@example.com to have name "Updated User"
   ```

## Troubleshooting Cursor Integration

If you encounter issues:

1. Verify Environment Variables:
   - Check that all required environment variables are set in Cursor
   - Ensure the values are correct and properly formatted

2. Check Python Setup:
   - Ensure Python 3.11+ is installed and in your PATH
   - Verify the virtual environment is activated
   - Confirm all dependencies are installed: `pip install -r requirements.txt`

3. Server Issues:
   - Check the Cursor Developer Tools console for error messages
   - Verify the server is running: `python -m src.server`
   - Check the server logs for any error messages

4. Common Solutions:
   - Restart Cursor
   - Reload the MCP configuration
   - Recreate the virtual environment
   - Check file permissions

For additional help, check the Cursor documentation or file an issue in the project repository.

## Security Notes

- The server uses the Supabase service role key
- Access token validation is no longer performed
- All database operations are validated through Pydantic models
- Keep environment variables and config files secure
- Never commit sensitive credentials to version control
