# drand-mcp-server 🎲

![build](https://github.com/randa-mu/drand-mcp-server/actions/workflows/build.yml/badge.svg)

Use verifiable randomness in your AI application. This [Model Context Protocol (MCP)](https://modelcontextprotocol.io)
server enables you to get a random value from the [drand](https://drand.love) network, verify its validity and use it as
an input seed to your model-driven flows!

## Use Cases

* repeatable, random sampling of input data
* interaction with other MCP servers in a verifiable manner (e.g. paying out rewards based on a prompt)
* verifying the output of another random process using historical drand beacons

## Prerequisites

* a relatively recent version of node (v21+ - `fetch` is required)

## Installation

You can run the MCP server either using npx or after building locally.

### Usage with VS Code

Create a file called `.vscode/mcp.json` in your workspace (or in your home directory) and add the following code:

```json
{
  "servers": {
    "drand": {
      "command": "npx",
      "args": [
        "drand-mcp-server"
      ]
    }
  }
}
```

For additional info, see the VS Code [docs on MCP](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)

### Usage with Claude

You can run the drand-mcp-server alongside claude desktop by adding the following to your config:

```json
{
  "mcpServers": {
    "drand": {
      "command": "npx",
      "args": [
        "drand-mcp-server"
      ]
    }
  }
}
```

## Tools

The following tools are available from the MCP server
| Name| Params | Description |
|----------|-----|-----------|
| get-randomness-latest | none | fetches the latest available beacon from drand quicknet|
| get-randomness-by-time| time in milliseconds | fetches the randomness beacon emitted at or just before the time
provided |
| get-randomness-by-round| round | fetches the randomness beacon emitted with a given round number |

## Building from source

- install dependencies with `npm install`
- build the application with `npm run build`
- run the application with either `npm start` or `node ./dist/index.mjs`

You can also configure VS Code and Claude as above, replacing the command/args with the following:

```
  "command": "node",
  "args": ["/path/to/my/project/drand-mcp-server/dist/index.mjs"]
```

## Roadmap

- [x] fetch latest randomness
- [x] fetch randomness by round
- [x] fetch randomness by time
- [ ] select items from a list