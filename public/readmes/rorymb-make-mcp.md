# Make_MCP
An MCP server for making MCP servers

## Add Make_MCP to Claude Desktop

Go to Claude > Settings > Developer > Edit Config, then open your `claude_desktop_config.json`.

If you don't use `uv`, you will have to clone the repo, then change the JSON below so that the `command` points to your python with `args` set to `["path/to/Make_MCP/make_mcp/core.py"]`, and pip install mcp where your python can access it.

If you do use `uv`, you can simply use the following JSON as-is. (Change the `"command"` to point to uvx on your machine.)

```json
{
    "mcpServers": {
        "make_mcp": {
            "command": "/Users/rmbutler/.local/bin/uvx",
            "args": ["--from", "git+https://github.com/RoryMB/Make_MCP@main", "make_mcp"]
        }
    }
}
```

## Finding Tools, Resources, and Prompts

Restart Claude Desktop to see make_mcp appear in the "+" and "Search and tools" menus.

The "+" menu will display all of your servers with resources or prompts.
Click a server name to see the list of its resources and prompts, then click one to attach it to your message.

![Screenshot 2025-05-17 at 1 11 46 AM](https://github.com/user-attachments/assets/787c8536-b4bd-4e35-9552-e056ccdc8105)

The "Search and tools" menu will display all of your servers with tools.
Beside each server name is a number indicating how many tools are enabled for that server, or "Disabled" if all of its tools are disabled.
Claude will only use enabled tools.
Click a server name to see the list of its tools, and use the toggle switches to enable or disable them individually.

![Screenshot 2025-05-17 at 1 12 28 AM](https://github.com/user-attachments/assets/8f3901ba-38a5-4bf8-a158-f43a0f462e50)

## Using Make_MCP to make a new server

You can use either a resource or a tool to get Make_MCP to help you make a server.

### Tool method

The most straightforward method is to simply ensure the `make_mcp` server's `how_to_make_mcp` tool is enabled, then tell Claude something like:
`Write a basic mcp server with a very simple URL fetch tool to get HTML.`
Claude will ask for permission to use the `how_to_make_mcp` tool, which simply returns a bit of documentation on MCP servers and a small example server script.

### Resource method

If you don't want Claude to use the tool, you can manually add the resource by clicking "+" > "Add from make_mcp" > "make_mcp".
This resource is designed to attach the same set of documentation to the top of your next message.

The resource is only included for demonstration purposes. Typically you would just have Claude use the tool.

### Adding the new server to Claude Desktop

With either method, Claude will write your MCP server as an artifact that you can download. Add it to the configuration file just like Make_MCP.
Make sure to set the `args` to point to where your file is, and add any necessary environment variables to the optional `env` section.
```json
{
    "mcpServers": {
        "make_mcp": {
            "command": "/Users/rmbutler/.local/bin/uvx",
            "args": ["--from", "git+https://github.com/RoryMB/Make_MCP@main", "make_mcp"]
        },
        "new_server": {
            "command": "/Users/rmbutler/.local/bin/uv",
            "args": ["run", "/Users/rmbutler/Downloads/new_server.py"],
            "env": {
            }
        }
    }
}
```

Restart Claude Desktop to see your new tools added to the "Search and tools" menu, and any resources or prompts added to the "+" menu.
