# Record conversation to markdown / Apple Notes

Record Claude conversation to markdown or Apple notes.


## Usage

```bash
# clone this repo
git clone https://github.com/29decibel/record-to-markdown
```

Edit the Claude desktop config to enable this:

```bash
zed ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

```json
{
  "mcpServers": {
    "record-to-apple-notes": {
      "command": "uv",
      "args": [
        "--directory",
        "/FULL_PATH_TO/record-to-markdown",
        "run",
        "server.py"
      ]
    }
  }
}
```
