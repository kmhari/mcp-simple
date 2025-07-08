# akhq-mcp-server
Experimental Model Context Protocol (MCP) server for Kafka monitoring tool AKHQ. Helps AI assistants like Claude and Cursor to connect to and work beside the user in AKHQ.
<img src="screenshot.png" alt="Screenshot of MCP server in use in Cursor" width="800"/>
## Installation
Make sure you have Node installed.
- Add the tool to MCP clients like Cursor or Claude by opening the tool's MCP settings file and specify a new server with ```npx```as the command and ```akhq-mcp-server```as argument.
```
  {
    "mcpServers": {
      "akhq": {
        "command": "npx",
        "args": ["akhq-mcp-server"]
      }
    }
  }
```
