# Log Analysis with SQLite MCP Server

This project provides tools to create an SQLite database from compressed log files and interact with it using the Model Context Protocol (MCP) SQLite server.

## Install instructions

```bash
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

Place log files in the folder as .gz files, then run:
```bash
python3 create_log_db.py 
```
## MCP SQLite Server

To configure the MCP SQLite server in Cursor-

- Cursor Settings
- MCP 
- Add New MCP Server
- Name `SQLlite`
- Set the type to `command`
- Put this in the command box 
```bash
npx -y @smithery/cli@latest run mcp-server-sqlite-npx --config "{\"databasePath\":\"/path/to/thedatbase/logs.db\"}"
```


## Contents

- `create_log_db.py`: Script to extract and parse log files into an SQLite database
- `query_logs.py`: Script to directly query the SQLite database
- `logs.db`: SQLite database containing parsed log data

## Database Structure

The database contains the following tables:

### `logs` Table

- `id`: Unique identifier for each log entry
- `timestamp`: Timestamp of the log entry
- `thread`: Thread that generated the log
- `level`: Log level (INFO, WARN, ERROR, DEBUG)
- `module`: Module that generated the log
- `message`: Log message content
- `source_file`: Source log file
- `raw_log`: Raw log entry

### `stack_traces` Table

- `id`: Unique identifier for each stack trace
- `log_id`: Reference to the log entry this stack trace belongs to
- `stack_trace`: Full stack trace text

### `parsing_errors` Table

- `id`: Unique identifier for each parsing error
- `line`: The line that couldn't be parsed
- `source_file`: Source log file
- `error_message`: Error message explaining why parsing failed
- `timestamp`: When the parsing error occurred

You can query the database directly using the `query_logs.py` script:



