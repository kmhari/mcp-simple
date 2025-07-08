# Introduction

This is a sample app that conforms to the MCP protocol from Anthropic. It is designed to run as a an MCP server in Claude Desktop and
allows users to check the status of Airbyte connections.

## Configuring your MCP server
1. Install uv for virtual environment management
2. Create a virtual environment
```bash
uv venv
source .venv/bin/activate
```
3. Install the dependencies
```bash
pip install -r requirements.txt
```
4. Create a `.env` file and add your Airbyte keys
```bash
AIRBYTE_WORKSPACE_ID=xxx
AIRBYTE_CLIENT_ID=xxx
AIRBYTE_CLIENT_SECRET=xxx
AIRBYTE_API_KEY=xxx
```
5. Run the app
```bash
uv run  airbyte_status_checker.py

## Configure claude desktop to use your MCP server
1. set absolute paths to uv and and the python file in claude_desktop_settings.json. It should look similar to this:
```json

  "mcpServers": {
    "airbyte-status-checker": {
      "command": "/Users/quintonwall/.local/bin/uv",
      "args": [
        "--directory",
        "/Users/quintonwall/code/airbyte-mcp-list-sources",
        "run",
        "airbyte_status_checker.py"
      ]
    }
  }
}
```

2. Add the server to the list of servers in claude desktop
Open Claude Desktop and navigate to the settings page. Tap Developer Settings and then tap the "+" button to add a new server.
This will show you where your claude_desktop_config.json file is located. Open this and paste the contents  of the claude_desktop_config.json file from this repo
Then restart claude desktop.
You can confirm that your server has been added by looking for the hammer icon on the bottom right of the text entry box.

## Debugging
if your claude_desktop_config.json file is configured correctly, logs are written to ~/Library/Logs/anthropic/claude-desktop-server.log 
If you do not see any logs, or no hammer icon, check that your claude_desktop_config.json file matches exactly what I have in this repo and the paths are correct.