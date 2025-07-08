# Airtable Local MCP Server

[![Python Version](https://img.shields.io/badge/python-3.13+-blue.svg)](https://www.python.org/)
[![uv](https://img.shields.io/badge/uv-0.1.41+-blue)](https://github.com/astral-sh/uv)
[![pipx](https://img.shields.io/badge/pipx-installed-blue)](https://pipx.pypa.io/stable/)
[![mcp](https://img.shields.io/badge/mcp-1.6.0+-orange)](https://pypi.org/project/mcp/)
![Airtable](https://img.shields.io/badge/Airtable-18BFFF?style=flat&logo=Airtable&logoColor=white)

This project provides a local Model Context Protocol (MCP) server that allows AI models like Claude (via Claude for Desktop) to interact directly with your Airtable bases using natural language.

You can list bases, tables, and records, fetch specific records, create, update, and delete records, all through MCP tools.

This package is designed to be installed and run using `pipx` for isolated execution.

## Prerequisites

*   **Python**: Version 3.10 or higher.
*   **pipx**: Tool for installing and running Python applications in isolated environments. Installation instructions [here](https://pipx.pypa.io/stable/installation/).
*   **git** (for pipx installation from source)
*   **Airtable Account**: You need an Airtable account.

## Run with pipx

Run the server with pipx:
```bash
pipx run airtable-mcp
```

## Example MCP Config
```json
    {
      "mcpServers": {
        "airtable-pipx": { // You can name this key anything descriptive
          "command": "pipx",
          "args": ["run", "airtable-mcp"] // No arguments needed as config is via environment variables
          // "options": {} // Usually not needed if command is in PATH and env vars are set globally
          "env": {
            "AIRTABLE_PERSONAL_ACCESS_TOKEN": "XXXX",
            "AIRTABLE_BASE_ID": "XXXX"
          }
        }
        // Add other servers here if needed
      }
    }
```

## Installation with pipx

Install the server with pipx:
```bash
pipx run airtable-mcp
```

Install the server directly from this repository:

```bash
# Example using HTTPS URL
pipx install git+https://github.com/alexbruf/airtable-mcp.git

# Or if you have cloned it locally:
pipx install ./path/to/cloned/airtable-mcp
```

This command installs the package and makes the `airtable-mcp` command available in your PATH.

## Configuration

This server requires an Airtable Personal Access Token to authenticate API requests.

1.  **Generate an Airtable Token:**
    *   Go to your Airtable [Developer Hub](https://airtable.com/developers/web/guides/personal-access-tokens).
    *   Create a new token with the following scopes:
        *   `data.records:read`
        *   `data.records:write`
        *   `schema.bases:read`
    *   Make sure to grant access to the specific bases you want to use.
    *   Copy the generated token securely.

2.  **Set Environment Variables:**
    The server reads the token from the `AIRTABLE_PERSONAL_ACCESS_TOKEN` environment variable. You can optionally set a default `AIRTABLE_BASE_ID`.

    **Crucially, these environment variables must be available in the environment where `pipx` runs the `airtable-mcp` command.**

    *   **Recommended:** Add export commands to your shell profile (`~/.bashrc`, `~/.zshrc`, `~/.profile`, etc.) and restart your shell or source the file:
        ```bash
        # Example for ~/.zshrc or ~/.bashrc
        export AIRTABLE_PERSONAL_ACCESS_TOKEN="YOUR_SECURE_TOKEN_HERE"
        export AIRTABLE_BASE_ID="YOUR_DEFAULT_BASE_ID" # Optional
        ```
    *   **Alternative (Less Permanent):** Export the variables in your current terminal session *before* running the server or configuring Claude.
        ```bash
        export AIRTABLE_PERSONAL_ACCESS_TOKEN="YOUR_SECURE_TOKEN_HERE"
        export AIRTABLE_BASE_ID="YOUR_DEFAULT_BASE_ID" # Optional
        ```
    *   **Note on `.env` files:** While the server code attempts to load `.env` files using `python-dotenv`, this relies on the file being present in the *current working directory* when the command is run. This can be unreliable with `pipx` and Claude Desktop, so **setting environment variables directly is the recommended approach.**

## Running the Server

Ensure the environment variables are set in your current shell.

Simply run the command installed by `pipx`:

```bash
airtable-mcp
```

The server will start and log messages indicating it's ready and which token/base ID (if any) it's using.

## Connecting with Claude for Desktop

To allow Claude for Desktop to use the tools from this server:

1.  **Edit Claude's Config:**
    *   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
    *   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
    *   Create the file/directory if it doesn't exist.

2.  **Add Server Configuration:** Add the following structure to the `mcpServers` object. Since `pipx` places the command in your PATH, you usually don't need to specify a full path or `cwd`.

    ```json
    {
      "mcpServers": {
        "airtable-pipx": { // You can name this key anything descriptive
          "command": "pipx",
          "args": ["run", "airtable-mcp"] // No arguments needed as config is via environment variables
          // "options": {} // Usually not needed if command is in PATH and env vars are set globally
          "env": {
            "AIRTABLE_PERSONAL_ACCESS_TOKEN": "XXXX",
            "AIRTABLE_BASE_ID": "XXXX"
          }
        }
        // Add other servers here if needed
      }
    }
    ```
    *   **Important:** Ensure the environment variables (`AIRTABLE_PERSONAL_ACCESS_TOKEN`, etc.) are correctly set in the environment that Claude for Desktop uses when launching commands. Setting them globally via your shell profile is the most reliable way.

3.  **Restart Claude for Desktop:** Close and reopen the application.

4.  **Verify:** The tool icon (hammer) should appear in Claude. Clicking it should show the tools from this server (e.g., `list_bases`, `list_records`).

## Available Tools

The following tools are exposed by the server:

| Tool Name         | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| `list_bases`      | Lists all Airtable bases accessible with the configured token.              |
| `list_tables`     | Lists all tables within the active (or specified) base.                     |
| `list_records`    | Lists records from a specified table (supports filtering, views, fields).   |
| `get_record`      | Retrieves a single record by its ID from a specified table.                 |
| `create_records`  | Creates one or more new records in a table from a JSON string.              |
| `update_records`  | Updates one or more existing records in a table from a JSON string.         |
| `delete_records`  | Deletes one or more records by their IDs (max 10 per call).                 |

## Usage Examples (in Claude)

*   "List my airtable bases."
*   "Show the tables in the current base."
*   "List 5 records from the 'Tasks' table."
*   "Get the record with ID recYYYYYYYYYYYYYY from the 'Projects' table."
*   "Create a record in 'Tasks' with fields {'Name': 'New idea', 'Status': 'Todo'}."
*   "Update record recZZZZZZZZZZZZZZ in 'Tasks' with fields {'Status': 'Done'}."
*   "Delete record recAAAAAAAAAAAAAA from the 'Log' table."

## Troubleshooting

*   **`airtable-mcp` command not found:** Ensure `pipx` installation completed successfully. Check if the `pipx` bin directory is in your PATH (`echo $PATH` and `pipx ensurepath`).
*   **Authentication errors:** Verify `AIRTABLE_PERSONAL_ACCESS_TOKEN` is correctly set *in the environment where the command runs*. Use `printenv | grep AIRTABLE` in your terminal to check.
*   **Claude connection issues:** Ensure environment variables are globally accessible or set in a way Claude can inherit them. Try running `airtable-mcp` manually in a terminal first. Check the server logs for connection attempts or errors when Claude tries to connect.
*   **Tool errors:** Check the server logs (`airtable-mcp` output) for detailed error messages from the Airtable API.

## Uninstallation

```bash
pipx uninstall airtable-mcp
```

## License

MIT