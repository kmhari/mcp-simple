# ArxivMCP

A tool for searching and retrieving academic papers from arXiv.

## Prerequisites

- Python 3.10 or higher
- [uv](https://github.com/astral-sh/uv) (Python package installer)

If you don't have `uv` installed, you can install it via pip:
```bash
pip install uv
```
Or follow the official [installation guide](https://github.com/astral-sh/uv#installation).

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url> # Replace with the actual URL
    cd paper-search
    ```

2.  **Set up the Python environment using `uv`:**
    This command creates a virtual environment (`.venv`) if it doesn't exist and installs the dependencies listed in `pyproject.toml`.
    ```bash
    uv sync
    ```

3.  **Activate the virtual environment:**
    ```bash
    source .venv/bin/activate
    ```
    (On Windows, use: `.venv\Scripts\activate`)

## Usage

To run the main script:
```bash
python main.py
```

## IDE Configuration (Cursor/MCP)

To configure an MCP-enabled client (like Cursor or Claude Desktop) to use this paper search server, you need to modify the client's configuration file. For example, in Claude Desktop, the file is typically located at `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac/Linux) or `$env:AppData\Claude\claude_desktop_config.json` (Windows).

Add an entry for this server under the `mcpServers` key like this:

```json
{
    "mcpServers": {
        "paper-search": { // You can name this server entry
            "command": "uv", // Or provide the full path from `which uv` / `where uv`, something you might adjust it like '/opt/homebrew/bin/uv'
            "args": [
                "--directory",
                "/ABSOLUTE/PATH/TO/THIS/PROJECT/paper-search", // <-- IMPORTANT: Use the absolute path here
                "run",
                "search.py"
            ]
        }
        // ... other servers can be listed here
    }
}
```

**Key points:**

- Replace `/ABSOLUTE/PATH/TO/THIS/PROJECT/paper-search` with the actual **absolute path** to this project's directory on your system.
- If the client cannot find `uv`, replace `"uv"` in the `"command"` field with the full path to your `uv` executable (found using `which uv` on MacOS/Linux or `where uv` on Windows).
- After saving the configuration file, **restart your MCP client** (e.g., Claude Desktop).

Once configured and restarted, the client should recognize the server and its tools (often indicated by an icon, like a hammer 🔨 in Claude Desktop).

## Dependencies

This project relies on the following main libraries:

- `beautifulsoup4`: For parsing HTML content.
- `httpx`: For making asynchronous HTTP requests.
- `mcp[cli]`: For MCP tooling integration.

Dependencies are managed using `uv` and defined in the `pyproject.toml` file.



## TODO: Backend Code 
