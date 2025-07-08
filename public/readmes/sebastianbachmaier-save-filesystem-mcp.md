# Filesystem MCP


> [!WARNING]
> Should not be able to modify files in other folders then specified root folder but this needs to be seen ...


Simple filesystem MCP that allows to create, read, update and delete files in a specified root folder. The root folder is specified as an argument to the node call.
The agent should not be able to modify files in other folders outside the root folder (not guaranteed though).

### How to install:

> [!TIP]
> You need > Node.js 12 to run this MCP. You might need to use it over nvm or similar.

Modify e.g. your Clause MCP config e.g. under MAC via (see also [claude documentation](https://modelcontextprotocol.io/quickstart/user)):

```
~/Library/Application\ Support/Claude/claude_desktop_config.json
```

and add the server:

```json
{
    "mcpServers": {
        "save-filesystem-mcp": {
            "command": "node",
            "args": [
                "PATH_TO_FOLDER/save-filesystem-mcp/build/index.js",
                "ABSOLUTE_FOLDER_FOR_CLAUDE_TO_WORK_WITH"
            ]
        }
    }
}
```

Then start claude and ask it to code a game for you. It will use the MCP to create, read, update and delete files in the specified root folder.
