# http-request-mcp

## Overview

`http-request-mcp` is a simple tool designed for making HTTP requests. It uses the MCP (Model Context Protocol) server to handle requests and supports various HTTP methods.

## Installation

To install the necessary dependencies, use the following command:

```bash
pnpm install
```

## Usage

To start the server, run:

```bash
pnpm start
```

## Example config
NPX 
```json
{
    "mcpServers": {
        "http-request": {
            "command": "npx",
            "args": [
                "-y",
                "@vrosario/http-request-mcp",
            ]
        }
    }
}
```

Alternatively, you can install the HTTP Request MCP server using the VS Code CLI:

```bash
# For VS Code
code --add-mcp '{"name":"http-request","command":"npx","args":["-y", "@vrosario/http-request-mcp"]}'
```

## Parameters

- **URL**: The URL to make the request to.
- **Method**: The HTTP method to use (GET, POST, PUT, DELETE).
- **Headers**: Optional headers to include in the request.
- **Body**: Optional body of the request.

## License

This project is licensed under the ISC License.
