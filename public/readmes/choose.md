# Choose MCP Server Setup

1. Start by downloading the Claude Desktop Client: https://claude.ai/download

2. Install uv

```
brew install uv
```

3. Install the MCP server

Edit the `claude_desktop_config.json` file (located in `~/Library/Application\ Support/Claude`) and add the following to the mcpServers section:

```javascript
{
  "mcpServers": {
    "Choose MCP Server": {
      "command": "uvx",
      "args": ["choose-mcp-server"],
      "env": {
        "PROJECT_ID": YOUR_PROJECT_ID,
        "DATASETS": DATASET_1,DATASET_2,DATASET_3
        "DBT_MANIFEST_FILEPATH": YOUR_DBT_MANIFEST_FILEPATH
      }
    }
  }
}
```

N.B: the dbt manifest file path is optional.

4. Log into Google Cloud and update your Application Default Credentials (ADC)

```
gcloud auth login --update-adc
```

5. Open Claude Desktop and start asking questions!

## Troubleshooting

For Windows users, you may need to add the `APPDATA` environment variable to your Claude Desktop config file.

```javascript
"env": {
  "APPDATA": "C:\\Users\\YOUR_USERNAME\\AppData\\Roaming",
}
```
