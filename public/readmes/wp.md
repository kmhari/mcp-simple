# Very much a work in progress that has not progressed

You should go to https://github.com/Automattic/wordpress-mcp for a fully functional WordPress MCP implementation.

To try it you currently need a WordPress instance locally on `http://localhost:8888/`.

It is currently a python app, I used `uv` locally,so you will need to:

`uv venv`
`source .venv/bin/activate`
`uv pip install -r requirements.txt`

You can then run the server with `uv run wp.py` to see if you get any errors, but you don't need to run from terminal as Claude will start its own instance.

You also need to add the following to your `claude_desktop_config.json`:

```
{
  "mcpServers": {
    "wordpress": {
      "command": "uv",
      "args": [
        "--directory",
        "/FULL/PATH/TO/wp-server-python",
        "run",
        "wp.py"
      ]
    }
  }
}
```
