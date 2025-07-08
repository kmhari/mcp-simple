# PatentSafe MCP

This is a MCP server for PatentSafe. It is used to connect to PatentSafe and retrieve documents.

## Installation

For Claude, you can install the MCP server having a `~/Users/simonc~/Library/Application Support/Claude/claude_desktop_config.json`file which looks something like this on macOS with Homebrew and `uv` installed:

```yml
{
  "mcpServers": {
    "USEFULNAME": {
      "command": "/opt/homebrew/bin/uvx",
      "args": [
        "--from",
        "git+ssh://git@github.com/amphora/patentsafe-mcp.git",
        "patentsafe-mcp",
        "PATENTSAFE_BASE_URL",
        "PATENTSAFE_AUTH_TOKEN"
      ]
    }
  }
}
```

You'll need to replace:

- `USEFULNAME` with a useful name for the server (e.g. `patentsafe`)
- `PATENTSAFE_BASE_URL` with the base URL of your PatentSafe instance (e.g. `https://demo.morescience.com`)
- `PATENTSAFE_AUTH_TOKEN` with your PatentSafe authentication token you can get from your user settings.

## Usage

We've tested it with Claude, but it should work with any MCP client.

## How it works (and debugging)

The MCP server does raw Lucene queries against the PatentSafe database, which is not something users often do. If you want to do a Lucene query, you can use the following URL:

```
https://PATENTSAFE_BASE_URL/ps/read/search.html?pq=1
```

## Limits 

Our initial testing shows that PatentSafe can easily return more documents than the LLM can process. So there's a `--max-chars` flag to limit the number of characters returned, default 500k.


## Support

This is very much a work in progress. It works for us, and will likely work for you, but it's not production ready and is under active development.

You can raise issues directly with Amphora's support team in the usual way, or contribute to this GitHub project with pull requests, issues, discussion etc.

## Future Work

- Add support for exposing Metadata fields
- Move the MCO server natively into PatentSafe (if that's the way clients evolve) 
  