# mcp-cline
mcp - clineserver
1-
git clone https://github.com/chrishayuk/mcp-cli
cd mcp-cli
2-
pip install uv
uv sync --reinstall

3-make sqlite table and copy to folder :C:/Users/people.db

4-make folder : "C:\Users\cline\mcp\sqlite\server"s and clone code into it : git clone https://github.com/modelcontextprotocol/servers.git

5-add Cline to visual studio code
6-in cline add mcp server and in market search for sqlite and install it.

7-in the client_mcp__setting.json add below config:


{
  "mcpServers": {

    "sqlite": {
      "command": "uv",
      "args": [
        "--directory",
        "C:/Users/cline/mcp/sqlite/servers/src/sqlite",
        "run",
        "mcp-server-sqlite",
        "--db-path",
        "C:/Users/people.db"
      ]
    }

  }
}

8-save config and prompt in persian and english :
tell me how many person exist which ages bigger vthan 40 years?
مریم جنسیتش چیه و چند سالشه؟




