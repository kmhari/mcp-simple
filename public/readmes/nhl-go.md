# NHL Go

**An unofficial collection of NHL data tools, written in Go 🏒**

## Features
- [API Client](#nhl-api-client)
- [CLI](#nhl-cli)
- [Model Context Protocol (MCP) Server](#nhl-mcp-server)

## NHL API Client

A client wrapper around the NHL web api, based on the reference spec defined [here](https://github.com/Zmalski/NHL-API-Reference).

### Supported Functionality

- Teams (Rosters)
- Players (Stats)
- Schedule (by date, by team)
- Standings

See [roadmap.md](roadmap.md) for more details.

## NHL CLI

See [/examples](examples) for usage.

```
./nhl -player -name "Miro Heiskanen"
```
    
## NHL MCP Server

Exposes NHL API data via the [Model Context Protocol](https://www.anthropic.com/news/model-context-protocol), allowing for easy integration with LLMs.

### Installation

Build the `nhl-mcp` binary:

```bash
cd ./mcp && go build -o nhl-mcp
```

Add path to the `nhl-mcp` binary to your `claude_desktop_config.json` file:

```
"nhl": {
  "command": "/path/to/nhl-mcp"
}
```

<details>

<summary><h2>Local Development</h2></summary>

### Prerequisites

Go version >= 1.23

### Installation

Create a fork of this repository, then clone it.

```bash
git clone https://github.com/carsonjones/nhl-go.git
cd nhl-go
```

### Commands

Build the `nhl` and `nhl-mcp` binaries:
```bash
go build -o nhl && cd ./mcp && go build -o ../nhl-mcp && cd ../
```

Debug MCP server:
```bash
npx @modelcontextprotocol/inspector ./nhl-mcp
```

### Testing

```bash
go test -v './...'
```

</details>

---
HOCKEY!!!