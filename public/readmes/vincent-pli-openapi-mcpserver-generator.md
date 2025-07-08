# OpenAPI to MCP server Generator

A command-line tool that generates Model Context Protocol (MCP) server code from OpenAPI specifications. This tool helps you quickly create an MCP server that acts as a bridge between LLMs (Large Language Models) and your API.

[![npm version](https://img.shields.io/npm/v/openapi-mcpserver-generator.svg)](https://www.npmjs.com/package/openapi-mcpserver-generator)
[![License: MIT](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/MIT)

English | [简体中文](./README-zh.md)

## At the beginning
This repo is originally forked from [openapi-mcp-generator](https://github.com/harsha-iiiv/openapi-mcp-generator), and add some additional features:

- Support nested `$ref` in openapi specifications
- Besides source code, generate MCP server configuration
- Allow client to set log level and send log message to client as notification
- When hit error, send message to stderr
- Support build docker image and guide client to run in docker container (2025/5/8 updated)
## Features

- **Automatic Tool Generation**: Converts each API endpoint in your OpenAPI spec into an MCP tool
- **Transport Options**: Only supports stdio, for sse you can leveral [mcp-proxy](https://github.com/sparfenyuk/mcp-proxy)
- **Complete Project Setup**: Generates all necessary files to run an MCP server
- **Easy Configuration**: Simple environment-based configuration for the generated server

## Installation

```bash
# Install globally from npm
npm install -g openapi-mcpserver-generator

# Or with yarn
yarn global add openapi-mcpserver-generator

# Or with pnpm
pnpm add -g openapi-mcpserver-generator
```

## Usage

Generate an MCP server from an OpenAPI specification:

```bash
openapi-mcpserver-generator --openapi path/to/openapi.json --output /Path/to/output
```

### Command Line Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--openapi` | `-o` | Path or URL to OpenAPI specification | (required) |
| `--output` | `-d` | Output directory for generated files | `./mcp-server` |
| `--name` | `-n` | Name for the MCP server | `openapi-mcp-server` |
| `--version` | `-v` | Version for the MCP server | `1.0.0` |
| `--transport` | `-t` | Transport mechanism (stdio, websocket, http) | `stdio` |
| `--help` | `-h` | Show help information | |

### Examples

Generate from a local OpenAPI file:

```bash
openapi-mcpserver-generator --openapi ./specs/petstore.json --output ./petstore-mcp
```

Generate from a remote OpenAPI URL:

```bash
openapi-mcpserver-generator --openapi https://petstore3.swagger.io/api/v3/openapi.json --output ./petstore-mcp
```

## Generated Files

The tool generates the following files in the output directory:

- `server.js` - The main MCP server implementation
- `package.json` - Dependencies and scripts
- `README.md` - Documentation for the generated server
- `.env.example` - Template for environment variables
- `types.d.ts` - TypeScript type definitions for the API
- `tsconfig.json` - TypeScript configuration
- `Dockerfile` - Dockerfile
- `.dockerignore` - Docker ignore file

## Using the Generated Server

After generating your MCP server:

1. Navigate to the generated directory:
   ```bash
   cd my-mcp-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create an environment file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` to set your API base URL and any required headers:
   ```
   API_BASE_URL=https://api.example.com
   API_HEADERS=Authorization:Bearer your-token-here
   ```

5. Start the server:
   ```bash
   npm start
   ```

## Requirements

- Node.js 16.x or higher
- npm 7.x or higher

## E2E example

Suggest use [mcpclihost](https://github.com/vincent-pli/mcp-cli-host) as MCP host to take a try.
This tool(`mcpclihost`) could support both Azure Openai and deepseek

You can add generated MCP server congiguration like this:
```
{
  "mcpServers": {
    "petstore-mcp": {
      "command": "/usr/local/bin/node",
      "args": [
        "/Users/lipeng/workspaces/github.com/vincent-pli/openapi-mcpserver-generator/petstore-mcp/server.js",
        "run"
      ]
    }
  }
}
```
to the `~/.mcp.json`(default mcp server configuration path of `mcpclihost`), then take a try

## Security Schemes in Openapi

Openapi 3.0 support [4 security types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#security-scheme-object):
- **apiKey**: 
for example:
```
        "securitySchemes": {
            "my_api_key": {
                "type": "apiKey",
                "name": "api_key",
                "in": "header"
            }
        }
```
Expect a env param named upper cased `MY_API_KEY`_`{securitySchemes.my_api_key.name}`, in this case, it should be: `MY_API_KEY_API_KEY` defined in `.env`
- **http:**
```
        "securitySchemes": {
            basicAuth: {
               type: "http",
               scheme: "basic"
            }
        }
```
it try to find `BASICAUTH_USERNAME` and `BASICAUTH_PASSWORD` in `.env`
```
        "securitySchemes": {
            basicAuth: {
               type: "http",
               scheme: "bearer"
            }
        }
```
it try to find `BASICAUTH_BEARERTOKEN` in `.env`
- **oauth2:**
Because of the complexity of oauth2, cannot handle it automaticly, we suggest manually get the `access token`, then set it to `.env` as this:
```
API_HEADERS=Authorization:Bearer your-access-token-here
```
- **openIdConnect**
Not support yet

## License

Apache 2.0
