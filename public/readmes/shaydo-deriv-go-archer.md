# Go Archer

go-archer is a tool to inspect and analyze dependencies between packages in a
project. It produces a graph of dependencies between packages in the project and
selected third-party packages, it highlights dependencies that lead towards
concrete packages, it estimates distance of the packages from the main
sequence.

To install the binary:
```
go install gitlab.com/shaydo/go-archer/cmd/go-archer@latest
```

The command tries to load configuration from ~/.go-archer.toml by default.
Configuration file might include some concrete packages that you want to track
dependencies on and some exclusions:
```toml
concrete_packages = [
    "database/sql",
    "net/http",
]

ignore_packages = [
    "net/http/pprof",
]
```


To create dependency graph in PDF format run:
```
go-archer | dot -Tpdf -o deps.pdf
```

To create dependency graph in mermaid format:
```
go-archer --format mermaid
```

## MCP Server

You can run go-archer as an MCP server. Here's an example of configuration:
```json
{
  "mcpServers": {
    "go-archer": {
      "command": "go-archer",
      "args": ["mcp-server"],
      "env": {
        "HOME": "/home/me"
        "GOPATH": "/home/me/go"
      }
    }
  }
}
```
Note, that `HOME` and `GOPATH` enviroment variables are required for
`go-archer` to be able to find the config file and go module cache.
