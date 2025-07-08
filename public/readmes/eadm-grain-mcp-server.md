# Grain MCP Server

A [Model Context Protocol](https://github.com/modelcontextprotocol) server for [Grain](https://grain.com/), a service that records and transcribes meetings.

This server provides integration with Grain through MCP, allowing users to access Grain functionality without needing the enterprise API (which is only available on enterprise subscriptions) or paid integrations like Zapier. The service is based on Playwright for browser automation.

## Installation

### Manual Installation

Add the Grain MCP server configuration to your MCP client:

```json
{
  "mcpServers": {
    "grain_uvx": {
      "command": "uvx",
      "args": [
        "--from",
        "git+https://github.com/eadm/grain-mcp-server",
        "grain-mcp-server",
        "--user-data-dir",
        "<absolute-path-to-browser-session-data>"
      ]
    }
  }
}
```

Replace `<absolute-path-to-browser-session-data>` with the absolute path where you want to store the browser session data. On first MCP usage, you will need to login to Grain via the browser.

## Components

### Tools

1. **`get_all_meetings`**: Retrieve all meetings from Grain
   - Returns a list of dictionaries containing meeting information, including:
     - `id` (string): Meeting ID
     - `title` (string): Meeting title
     - `url` (string): URL to access the meeting
     - `date` (string): Meeting date in ISO format

2. **`download_meeting_transcript`**: Download a meeting transcript
   - Required inputs:
     - `absolute_save_path` (string): The file path where the transcript will be saved
     - `meeting_id` (string): The unique identifier of the meeting
     - `transcription_type` (string): The format of the transcript file ("vtt" or "srt")
   - Returns:
     - `bool`: True if the download was successful, False otherwise

## Usage Examples

Some example prompts you can use with your MCP client to interact with Grain:

1. "Show me all my recent meetings" → execute the `get_all_meetings` tool to retrieve a list of all meetings stored in Grain

2. "Download the transcript for my last team meeting" → use `get_all_meetings` to find the meeting, then use `download_meeting_transcript` to download its transcript

## Development

1. Install dependencies:

```bash
uv sync
```

2. Run the application:

```bash
uv run grain-mcp-server
```

3. Run with debug mode:

```bash
uv run grain-mcp-server --debug
```

4. Run tests:

```bash
uv run pytest
```
