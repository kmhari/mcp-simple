MCP Ayd Server
==============

[MCP (Model Context Protocol)](https://modelcontextprotocol.io) Server for [Ayd](https://github.com/macrat/ayd).


## Usage

1. Download the latest binary from [release page](https://github.com/macrat/mcp-ayd-server/releases).

2. Setup your client's configuration file.

   For example, if you use Claude Desktop:
   
   ```json
   {
     "mcpServers": {
       "ayd": {
         "command": "C:\\path\\to\\mcp-ayd-server.exe",
         "args": ["http://127.0.0.1:9000"]
       }
     }
   }
   ```

3. Run the client app.

4. Ask assistant like "What's the latest status of Ayd?"
