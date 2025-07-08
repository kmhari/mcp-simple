# ChatDB

This is an MCP server that records all your conversations with Cursor.

A easier memory layer for gpt.

## Install

We use uv to manage the python project.

```bash
uv sync
```

## Usage

Config this to MCP server.


```json
{
  "mcpServers": {
    "chatdb": {
      "commands": "",
      "env": {
        "DB_PATH": "<your-database-path>"
      }
    }
  }
}
```

## Related Work

- [huchenxucs/ChatDB](https://github.com/huchenxucs/ChatDB) 大模型自己建库建表



## LICENSE

AGPL
