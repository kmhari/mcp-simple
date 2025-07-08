# MCP SQLite Client

A simple command-line client for interacting with an MCP SQLite server. This client enables natural language interaction with SQLite databases through OpenRouter's LLM API.

## Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

### Setup Steps

1. **Create a project directory**:
   ```bash
   git clone https://github.com/calvinw/mcp-sqlite-client.git
   cd mcp-sqlite-client
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install the required dependencies**:

   Then install from the requirements file:
   ```bash
   pip install -r requirements.txt
   ```

4. **Install the MCP SQLite server**:
   ```bash
   pip install mcp-server-sqlite
   ```

5. **Download a sample SQLite database**:

   ```bash
   # For Chinook database
   curl -L https://github.com/lerocha/chinook-database/raw/master/ChinookDatabase/DataSources/Chinook_Sqlite.sqlite -o chinook.db
   
   # For Northwind database
   git clone https://github.com/jpwhite3/northwind-SQLite3.git
   cp northwind-SQLite3/northwind.db .
   
   # For Superheroes database (optional)
   git clone https://github.com/codecrafters-io/sample-sqlite-databases.git
   cp sample-sqlite-databases/superheroes.db .
   ```

6. **Create a configuration file**:
   Create a file named `servers_config.json` with the following content:
   ```json
   {
     "mcpServers": {
       "sqlite": {
         "command": "mcp-server-sqlite",
         "args": [
           "--db-path",
           "./chinook.db"
         ]
       }
     }
   }
   ```

7. **Set up your API key**:
   Create a `.env` file in the project directory:
   ```
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

## Usage

Run the client using Python:

```bash
python mcp_client.py
```

This will start an interactive chat session where you can ask questions about the database in natural language.

For the chinook.db you can use these examples:

Example queries:
- "What tables are in this database?"
- "How many albums are there in total?"
- "Show me the artists with the most albums"
- "List all employees and their hire dates"

Type 'exit' or 'quit' to end the session.

## Customizing the Database

To use a different SQLite database, modify the `--db-path` in the `servers_config.json` file to point to your desired database file.

## Troubleshooting

If you encounter issues:

1. **MCP-Server-SQLite not found**: Ensure that the package is correctly installed and the command is available in your PATH.
   ```bash
   which mcp-server-sqlite
   ```

2. **API Key issues**: Verify that your `.env` file contains the correct API key and is in the same directory as the script.

3. **Connection issues**: Check that the database file exists and is readable at the path specified in `servers_config.json`.

## License

[MIT](LICENSE)
