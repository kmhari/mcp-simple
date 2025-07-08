# MCPExec
MCP Server to exec local cli commands

Set up your environment
First, let’s install uv and set up our Python project and environment:
`curl -LsSf https://astral.sh/uv/install.sh | sh`
Make sure to restart your terminal afterwards to ensure that the uv command gets picked up.

Now, let’s create and set up our project:

# Create a new directory for our project
uv init exec
cd exec

# Create virtual environment and activate it
uv venv
source .venv/bin/activate

# Install dependencies
uv add "mcp[cli]" 


# Add MCP Server
For Claude for Desktop: 
```
{
    "mcpServers": {
        "exec-cli": {
            "command": "/Users/bruno/.local/bin/uv",
            "args": [
                "--directory",
                "/Users/bruno/example/path",
                "run",
                "app.py"
            ]
        }
    }
}
```