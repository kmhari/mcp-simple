# MCP Server for NASA API integration. 

**NASA NEO** API request by date
- Near Earth Object information retrieval by date

**Clone repo and run:**
```bash
uv install
```

**Add you mcp server config to your LLM** 

Example Claude config file (_claude_desktop_config.json_)
```JSON
{
    "mcpServers": {
        "nasa": {
            "command": "uv",
                "args": [
                    "--directory",
                    "<PATH TO YOUR PY>",
                    "run",
                    "main.py"
                ]
        }
    }
}
```

**Tools:**

_getNeo()_
- add your own api key in apiconfig.py (eg: apiconfig.example.py)

```JSON
{
  "method": "tools/call",
  "params": {
    "name": "getNeo",
    "arguments": {
      "start_date": "<START_DATE>",
      "end_date": "<END_DATE>"
    },
    "_meta": {
      "progressToken": 0
    }
  }
}
```
### Other instructions (uv examples)

**Create environment**
```Bash
uv init mcp-server-demo

cd mcp-server-demo

uv add "mcp[cli]"

uv run mcp
```

**Usage**: _mcp [OPTIONS] COMMAND [ARGS]_

### MCP development tools

- Options

--help

**Commands**

_**version**_   > Show the MCP version

_**dev**_   > Run a MCP server with the MCP Inspector

_**run**_   > Run a MCP Server

_**install**_   > Install a MCP server in the Claude desktop app

**Example** _(open **MCP** dev **Inspector**)_:
```Bash
uv run mcp dev <MYPYTHONFILE>

# Example output:
Starting MCP inspector...
⚙️ Proxy server listening on port <PORT>
🔍 MCP Inspector is up and running at http://127.0.0.1:<PORT> 🚀

```