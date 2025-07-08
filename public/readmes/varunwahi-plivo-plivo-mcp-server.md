# Plivo MCP Server

A Message Control Protocol (MCP) server implementation for sending SMS messages via Plivo's API.

## Installation

1. Install dependencies:
   ```bash
   pip install fastmcp plivo
   ```

2. Configure Claude Desktop:
   ```json
   {
     "mcpServers": {
       "plivo": {
         "command": "python",
         "args": ["server.py"],
         "env": {
           "PLIVO_AUTH_ID": "your_auth_id",
           "PLIVO_AUTH_TOKEN": "your_auth_token", 
           "MY_NUMBER": "your_plivo_number"
         }
       }
     }
   }
   ```

