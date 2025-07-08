## Requirements:
1. Python 3.10 or higher

## Step 1. Install uv:
   - MacOS/Linux: curl -LsSf https://astral.sh/uv/install.sh | sh
   - Windows: powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

## Step 2. Configure Claude Desktop
1. Download [Claude Desktop](https://claude.ai/download).
2. Launch Claude and go to Settings > Developer > Edit Config.
3. Modify `claude_desktop_config.json` with:
```json
{
  "mcpServers": {
    "Adfin": {
      "command": "<home_path>/.local/bin/uv",
      "args": [
        "--directory",
        "<absolute_path_to_adfin_mcp_folder>",
        "run",
        "main_adfin_mcp.py"
      ],
      "env": {
        "ADFIN_EMAIL": "<email>",
        "ADFIN_PASSWORD": "<password>"
      }
    },
    "filesystem": {
      "command": "<home_path>/.local/bin/uv",
      "args": [
        "--directory",
        "<absolute_path_to_adfin_mcp_folder>",
        "run",
        "filesystem.py"
      ]
    }
  }
}
```
4. Relaunch Claude Desktop.

The first time you open Claude Desktop with these setting it may take
10-20 seconds before the Adfin tools appear in the interface due to
the installation of the required packages and the download of the most 
recent Adfin API documentation.

Everytime you launch Claude Desktop, the most recent Adfin API tools are made available 
to your AI assistant.

## Step 3. Launch Claude Desktop and let your assistant help you
### Examples
**Request a credit control status**
```text
Give me a credit control status check.
```
**Create a new invoice**
```text
Create a new invoice for 60 GBP for Abc Def that is due in a week. His email is abc.def@example.com.
```
**Ask the assistant to upload multiple invoices from your folder**
```text
Upload all pdf invoices from the invoices folder from my Desktop.
```
