# Nuvama-MCP 🛠️

This project integrates Nuvama's trading platform with Claude AI using the MCP framework, allows you to interact with nuvama trading platform directly through claude AI.

## Features ✨

- 📈 Place buy and sell orders for stocks.
- 📊 Fetch and display holdings from the API.
- ⚡ FastMCP server integration for easy tool access.

## Project Structure 📂

- **index.py**: Contains the core logic for interacting with the trading API.
- **trade_mcp_server.py**: Implements a FastMCP server to expose trading functionalities as tools.
- **.gitignore**: Specifies files and directories to be ignored by Git.

## Prerequisites ✅

- 🐍 Python 3.x installed on your system.
- 📦 Required Python packages installed (e.g., FastMCP, APIConnect).
- 🔑 API credentials (API key, secret, and request ID).
- 📄 A CSV file containing stock symbols and exchange details.

## Setup Instructions 🛠️

1. Clone the repository to your local machine.
2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Update the following placeholders in `index.py`:
   - `api_key`: Your API key.
   - `api_secret`: Your API secret.
   - `request_id`: Your request ID.
   - `settings_file`: Path to your settings file.
   - `csv_file_path`: Path to your instruments CSV file.

4. Run the FastMCP server:
   ```bash
   uv run trade_mcp_server.py
   ```

## Using the MCP Tools 🛠️

The FastMCP server exposes the following tools:
- 🛒 **buyorder**: Place a buy order.
- 🛍️ **sellorder**: Place a sell order.

You can call these tools directly from the MCP interface.

## Configuring Claude for MCP Integration 🤖

To enable Claude to recognize the MCP tools, create a configuration file (e.g., `claude_config.json`) in the appropriate directory and add the following content:

```json
{
    "mcpServers": {
        "trade": {
            "command": "<path_to_uv_executable>",
            "args": [
                "--directory",
                "<path_to_trade_directory>",
                "run",
                "trade_server.py"
            ]
        }
    }
}
```

Replace `<path_to_uv_executable>` with the path to your `uv.exe` file and `<path_to_trade_directory>` with the path to your project directory. Place this configuration file in the relevant location for Claude to detect it.

This configuration allows Claude to interact with the MCP tools, enabling you to place orders directly from Claude using Natural Language.

Happy Trading! 🚀
