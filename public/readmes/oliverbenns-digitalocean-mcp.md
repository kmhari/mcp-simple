# DigitalOcean MCP Prototype

List your app platform apps, view alerts and deployments using the [Model Context Protocol](https://www.anthropic.com/news/model-context-protocol).

## Setup

- Generate a Digital Ocean token [here](https://cloud.digitalocean.com/account/api/tokens)
- `cp .env.example .env` and add your token.
- Put this in your Claude config.

```
{
  "mcpServers": {
        "digitalocean": {
            "command": "uv",
            "args": [
                "--directory",
                "/{ABSOLUTE_PATH_TO_REPO}",
                "run",
                "main.py"
            ]
        }
    }
}
```
