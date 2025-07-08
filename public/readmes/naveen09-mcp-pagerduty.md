### Model Context Protocol - with PagerDuty

This is an MCP server has integration with PagerDuty.
The integration supports basic queries like

    "who is oncall for NASA team right now ?"

The server can be happily integrated with Claude. With few simpel steps


### Integration with PD
You should update the token, just run

    export PAGERDUTY_API_KEY=your_api_key_here

### Integration with Claude
First, make sure you have Claude for Desktop installed. You can install the latest version [here](https://claude.ai/download).

We’ll need to configure Claude for Desktop for whichever MCP servers you want to use. 
To do this, open your Claude for Desktop App configuration at 

    ~/Library/Application Support/Claude/claude_desktop_config.json

in a text editor. Make sure to create the file if it doesn’t exist. Refer [here](https://modelcontextprotocol.io/quickstart/server) for more.
Updated the config with below entry

```json
{
    "mcpServers": {
        "weather": {
            "command": "uv",
            "args": [
                "--directory",
                "/ABSOLUTE/PATH/TO/PARENT/FOLDER/server/pagerduty",
                "run",
                "pagerduty.py"
            ]
        }
    }
}
```

You may need to put the full path to the `uv` executable in the command field. You can get this by running which uv on MacOS/Linux

### Configuration Testing
At the end, once you've configured Claude. Select the tools button, to verify 3 MCP tools are available.

- The prompt should show something as below:
<img src="mcp_tools_installed.png"  width="300" height="200"/>

### Demo
  <img src="mcp_results.png" alt="results" width="400"/>

