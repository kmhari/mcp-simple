# Garmin MCP Server

This Model Context Protocol (MCP) server connects to Garmin Connect and exposes your fitness and health data to Claude and other MCP-compatible clients.

## Features

- List recent activities
- Get detailed activity information
- Access health metrics (steps, heart rate, sleep)
- View body composition data

## Setup

1. Install the required packages on a new environment:

```bash
virtualenv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```


2. Create a `.env` file in the project root with your Garmin credentials:

```
GARMIN_EMAIL=your.email@example.com
GARMIN_PASSWORD=your-password
```

## Running the Server

### With Claude Desktop

1. Create a configuration in Claude Desktop:

Edit your Claude Desktop configuration file:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

Add this server configuration:

```json
{
  "mcpServers": {
    "garmin": {
      "command": "python", // if you created a new environment this should be "<root_folder>/.venv/bin/python"
      "args": ["<path to>/garmin_mcp/garmin_mcp_server.py"]
    }
  }
}
```

Replace the path with the absolute path to your server file.

2. Restart Claude Desktop

### With MCP Inspector

For testing, you can use the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector python /Users/adomingues/Documents/claude_filesystem/garmin_mcp/garmin_mcp_server.py
```

## Usage Examples

Once connected in Claude, you can ask questions like:

- "Show me my recent activities"
- "What was my sleep like last night?"
- "How many steps did I take yesterday?"
- "Show me the details of my latest run"

## Security Note

This server requires your Garmin Connect credentials in the `.env` file. Keep this file secure and never commit it to a repository.

## Troubleshooting

If you encounter login issues:

1. Verify your credentials in the `.env` file are correct
2. Check if Garmin Connect requires additional verification
3. Ensure the garminconnect package is up to date

For other issues, check the Claude Desktop logs at:
- macOS: `~/Library/Logs/Claude/mcp-server-garmin.log`
- Windows: `%APPDATA%\Claude\logs\mcp-server-garmin.log`