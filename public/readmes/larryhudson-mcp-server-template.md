# [Template] MCP Server

## How to use this template

- Add tool definitions in src/index.ts
- Update the README below
- Update the placeholder info in package.json
- Test building the MCP server with `npm run build`, and using the @modelcontextprotocol/inspector library
- Publish to npm: `npm login`, `npm publish --access public`

## Overview

[Insert overview here]

## Features

[Insert features here]

## Setup

1. Create a API key etc.
2. Set the token as an environment variable:

```bash
export API_KEY_ENV_VAR=the_secret_api_key
```

## Usage

### Using with VS Code

Add this to your settings JSON file:

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "some_secret_api_key",
        "description": "Secret API key",
        "password": true
      }
    ],
    "servers": {
      "[library-name]": {
        "command": "npx",
        "args": [
          "-y",
          "@larryhudson/[the-library]"
        ],
        "env": {
          "API_KEY_ENV_VAR": "${input:some_secret_api_key}"
        }
      }
    }
  }
}
```

### Using with Claude or other MCP-compatible applications

Add this to your MCP configuration JSON file:

```json
{
  "mcpServers": {
    "[the-library]": {
      "command": "npx",
      "args": ["-y", "@larryhudson/[the-library]"],
      "env": {
        "API_KEY_ENV_VAR": "<THE_SECRET_API_KEY>"
      }
    }
  }
}
```

## Available Tools

[List the tools here]

## How It Works

[Some info about how it works]

## Technical Details

Built with:
- **Model Context Protocol (MCP)**: Framework for allowing AI assistants to interact with external tools
- **TypeScript**: For type safety and better developer experience

## Development

You can use the Model Context Protocol inspector to try out the server:

```bash
npx @modelcontextprotocol/inspector npx tsx src/index.ts
```


## Limitations and Future Improvements


## License

MIT