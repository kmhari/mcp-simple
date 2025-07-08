# metasearch MCP server

A MCP server for metasearch

<a href="https://glama.ai/mcp/servers/xxb4uogn02"><img width="380" height="200" src="https://glama.ai/mcp/servers/xxb4uogn02/badge" alt="tavily-search MCP server" /></a>

## Components

This server uses the Tavily API to perform searches based on specified queries.
- Search results are returned in text format.
- Search results include AI responses, URIs, and titles of the search results.

### Tools

This server implements the following tools:
- search: Performs searches based on specified queries
  - Required argument: "query"
  - Optional argument: "search_depth" (basic or advanced)

### Install

1. Download the repository.
```bash
git clone https://github.com/YeonwooSung/metasearch-mcp.git
``` 

2. Open the Claude Desktop configuration file.
```
On MacOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
On Windows: `C:\Users\[username]\AppData\Roaming\Claude\claude_desktop_config.json`
```

3. Edit the configuration file as follows:
  ```yaml
  "mcpServers": {
    "tavily-search": {
      "command": "uv",
      "args": [
        "--directory",
        "C:\\your_path\\mcp-server-tavily",
        "run",
        "tavily-search"
      ],
      "env": {
        "TAVILY_API_KEY": "YOUR_TAVILY_API_KEY",
        "PYTHONIOENCODING": "utf-8"
      }
    }
  }
  ```

4. Restart Claude Desktop.

## Usage

In Claude Desktop, when you ask "Please search for something", you will receive search results.

Search example:
```
Please search in detail for today's events in Kamakura
```
Response example:
```
According to the search results, the following events start today, December 1st:
"Kamakura Promotion Photo Contest 2025"
Period: December 1, 2024 - January 31, 2025
A photo contest for those who love Kamakura
Applications start accepting from today
Also, as a related upcoming event:
On December 7th, an exhibition by 12 Kamakura artists will be held at the Seibu Press Inn Kamakura Ofuna Station East Exit Lounge.
```

## Log Storage Location

Logs are stored in the following location:

For Windows:
```
C:\Users\[username]\AppData\Roaming\Claude\logs\mcp-server-tavily-search
```
## Execution with Cursor

1. Create a shell script (e.g., `script.sh`) as shown below:

```bash
#!/bin/bash
TARGET_DIR=/path/to/mcp-server-tavily
cd "${TARGET_DIR}"
export TAVILY_API_KEY="your-api-key"
export PYTHONIOENCODING=utf-8
uv --directory $PWD run tavily-search
```

2. Configure Cursor's MCP Server settings as follows:

```
Name: tavily-search
Type: command
Command: /path/to/your/script.sh
```

3. Save the settings.

4. Once the settings are saved, you can ask Cursor's Composer-Agent to "search for something," and it will return the search results.

## Running in Local Environment Using Docker Compose

### Purpose
For operating systems other than Windows/MacOS where Claude Desktop cannot be used,
this section explains how to set up and run an MCP server and client in a local environment
using Docker compose.

### Steps
1. Install Docker.
2. Download the repository.
```bash
git clone https://github.com/YeonwooSung/metasearch-mcp.git
``` 
3. Run Docker compose.
```bash
docker compose up -d
``` 
4. Execute the client.
```bash
docker exec mcp_server uv --directory /usr/src/app/mcp-server-tavily/src run client.py
```
5. Execution Results
6. After searching for available tools as shown below, a query will be issued to Tavily and a response will be returned
