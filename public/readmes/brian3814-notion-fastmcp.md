## Prerequisites

- Python 3.10 or higher
- A Notion account with an API integration set up
- Notion database with tasks (required properties: "Task", "Checkbox", "Deadline")
- Cursor IDE

## Installation
1. Create a virtual environment and install dependencies:
   ```bash
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   uv pip install -e .
   ```

2. Set up `.env` file in the project root:
   ```
   NOTION_API_KEY=your_notion_api_key
   NOTION_DATABASE_ID=your_database_id
   NOTION_BASE_URL=https://api.notion.com/v1
   NOTION_VERSION=2022-06-28
   ```

## Setting Up Notion Integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Create a new integration and note the API key
3. Share your database with the integration
4. Get your database ID from the URL (it's the part after the workspace name and before the question mark)

## Adding to Cursor Settings

1. Open Cursor IDE
2. Open Settings (⌘+shift+p), navigate to "MCP" tab
4. Click "Add new global MCP server"
5. Configure the Notion MCP with the following settings:
  ```json
    {
      "mcpServers": {
        "myNotionMcp":{
          "command": "{path-to-venv-python}",
          "args": ["-m", "notion_mcp"]
        }
      }
    }
  ```
6. Save the settings

## Usage

Once configured, you can use the Notion MCP in Cursor by asking the AI assistant questions like:

- "What tasks should I complete this week?"
- "Show me my todos for today"
- "What are all my pending tasks?"

## Troubleshooting

- Ensure your `.env` file is properly configured with the correct Notion API key and database ID
- Check that your Notion database has the required properties: "Task", "Checkbox", and "Deadline"
- Make sure your Notion integration has been granted access to your database
- If you encounter any issues, try restarting Cursor

## License

MIT
