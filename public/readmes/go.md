# go-mcp

This project is a Model Context Protocol (MCP) server designed to provide Go documentation tools for AI assistants. It exposes Go's documentation and package listing capabilities through MCP, allowing AI systems to access official Go documentation and understand Go codebases more effectively.

## Features

- **Go Documentation Access**: Query documentation for Go packages, types, functions, or methods using the `go doc` command.
- **Package Listing**: List available packages in a Go module using the `go list` command.


## Requirements

- Go 1.16 or later
- A working Go environment with GOPATH configured
- Access to the packages you want to document

## Setup

1. Install the package:
   ```bash
   go install github.com/wricardo/go-mcp@latest
   ```

2. Configure your MCP-compatible assistant by adding the following to your MCP settings:
   ```json
   "go-mcp": {
     "command": "go-mcp",
     "env": {
       "WORKDIR": "/path/to/your/go/project"
     },
     "disabled": false,
     "autoApprove": []
   }
   ```


### Tools

- **go_doc**: Get Go documentation for packages, types, functions, or methods.
  - Parameters:
    - `pkgSymMethodOrField`: The package, symbol, method, or field to look up documentation for.
    - `cmd_flags`: (Optional) Additional command flags like `-all`, `-src`, or `-u`.

- **go_list**: List Go packages or modules.
  - Parameters:
    - `packages`: Array of package patterns to list (e.g., `["./...", "github.com/user/repo/..."]`).
    - `cmd_flags`: (Optional) Additional command flags like `-json`.

### Examples

#### Using go_doc

```json
{
  "pkgSymMethodOrField": "net/http",
  "cmd_flags": ["-all"]
}
```

```json
{
  "pkgSymMethodOrField": "fmt.Println",
  "cmd_flags": ["-src"]
}
```

#### Using go_list

```json
{
  "packages": ["./..."]
}
```

```json
{
  "packages": ["github.com/user/repo/module..."]
}
```

```json
{
  "packages": ["github.com/user/repo/..."]
}
```

## Best Practices

1. Always try `go_doc` first before examining source code directly
2. Start with basic package documentation before looking at specific symbols
3. Use the `-all` flag for comprehensive package documentation
4. Use the `-u` flag to see unexported symbols
5. Use the `-src` flag to see source code when documentation is insufficient


