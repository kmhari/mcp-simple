[![.NET Build](https://github.com/ouvreboite/openapi-to-mcp/actions/workflows/build_and_test.yml/badge.svg)](https://github.com/ouvreboite/openapi-to-mcp/actions/workflows/build_and_test.yml)
[![NuGet](https://img.shields.io/nuget/dt/openapi-to-mcp?logo=nuget&label=NuGet&)](https://www.nuget.org/packages/openapi-to-mcp)

# openapi-to-mcp

Use your OpenAPI specification to expose your API's endpoints as strongly typed tools.

Basic example for https://petstore3.swagger.io/ 🎉

```json
{
  "mcpServers": {
    "petstore": {
      "command": "openapi-to-mcp",
        "args": [
          "https://petstore3.swagger.io/api/v3/openapi.json"
        ]
    }
  }
}
```

More complex example, using Github's API:
```
{
    "mcpServers": {
        "github": {
            "command": "openapi-to-mcp",
            "args": [
                "https://raw.githubusercontent.com/github/rest-api-description/refs/heads/main/descriptions/api.github.com/api.github.com.yaml",
                "--bearer-token",
                "github_pat_xxxxxx",
                "--tool-naming-strategy",
                "verbandpath"
            ]
        }
    }
}
```

This example use the bearer token auth (with a Github [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)) and force the tool naming strategy to "verb and path", as Github's operation ids are not valid tool names.

![Github demo](github_demo.gif)

## Install

As a Nuget tool: [openapi-to-mcp](https://www.nuget.org/packages/openapi-to-mcp)
```sh
dotnet tool install --global openapi-to-mcp
```
Or download the executables from the [releases](https://github.com/ouvreboite/openapi-to-mcp/releases)

## Usage


```bash
Usage:
  openapi-to-mcp <open-api> [options]

Arguments:
  <open-api>  You OpenAPI specification (URL or file) [required]

Options:
  -t, --tool-naming-strategy <extension|extension_or_operationid_or_verbandpath|operationid|verbandpath>  How the tool name should be computed [default: extension_or_operationid_or_verbandpath]
  -h, --host-override                                                                                     Host override
  -b, --bearer-token                                                                                      Bearer token
  -o2, --oauth-2-grant-type <client_credentials|password|refresh_token>                                   OAuth2 flow to be used
  -o2_tu, --oauth-2-token-url                                                                             OAuth2 token endpoint URL (override the one defined in your OpenAPI for your chosen OAuth2 flow)
  -o2_ci, --oauth-2-client-id                                                                             OAuth2 client id (for the client_credentials grant_type)
  -o2_cs, --oauth-2-client-secret                                                                         OAuth2 client secret (for the client_credentials grant_type)
  -o2_rt, --oauth-2-refresh-token                                                                         OAuth2 refresh token (for the refresh_token grant_type)
  -o2_un, --oauth-2-username                                                                              OAuth2 username (for the password grant_type)
  -o2_pw, --oauth-2-password                                                                              OAuth2 password (for the password grant_type)
  -i, --instructions                                                                                      MCP instruction to be advertised by the server
  --verbose                                                                                               Log more info (in sdterr) [default: False]
  -?, -h, --help                                                                                          Show help and usage information
  --version                                                                                               Show version information
```

## OpenAPI support

- Currently, OpenAPI 2.0 and 3.0 are supported. 
  - 3.1 is not (at least not until [microsoft/OpenAPI.NET](https://github.com/microsoft/OpenAPI.NET) supports it)
- Specifications can be JSON/YAML and local (file) or remote (URL)
- Only local $refs are supported

### OpenAPI custom extensions

A set of custom extensions is available to customize how your API should be exposed:
- `info.x-mcp-instructions` (string): Textual instructions exposed by the MCP server during the initialize handshake
- `operation.x-mcp-tool-name` (string): Custom tool name
- `operation.x-mcp-tool-description` (string): Custom tool description
- `operation.x-mcp-tool-enabled` (boolean): Enabled/disabled a specific operation (enabled by default)

## MCP features

Only STDIO transport is currently supported.

### Tools
Operations ("endpoints") from your OpenAPI specification are translated to MCP [tools](https://modelcontextprotocol.io/docs/concepts/tools)
- All path/query/JSON body parameters are exposed (using their JSON schema)
- Response is returned as-is
- By default, the tool name is computed using first the `operation.x-mcp-tool-name` extension, then the [operation.operationId](https://swagger.io/docs/specification/v3_0/paths-and-operations/#operationid) and then `{httpMethod}_{escaped_path}`
  - The tool naming strategy can be defined via the `--tool-naming-strategy` option.
  - ⚠️Tools are discarded if their name don't match `^[a-zA-Z0-9_-]{1,64}$`
- Tools description are extracted as follows: `operation.x-mcp-tool-description` ?? `operation.description` ?? `path.description`

### Tool call and host

When a tool is called, the MCP server will call the underlying endpoint. To determine which host to call a combination of parameters are used:
- the `--host-override` option
- your specification first [server](https://swagger.io/docs/specification/v3_0/api-host-and-base-path/)'s URL if it's an absolute URL
- the host of the remote OpenAPI provided
- otherwise, an error is thrown

For example running `openapi-to-mcp https://petstore3.swagger.io/api/v3/openapi.json`:
- https://petstore3.swagger.io/api/v3/openapi.json defines a server, but its URL is relative (/api/v3)
- so the host of the specification's own URL is used: https://petstore3.swagger.io and the relative path of the server is appended to it

## Authorization

### Bearer token

A token can be provided as option `--bearer-token`. It'll be provided to all calls as the `Authorization: Bearer {token}` header.
It'll also be provided when fetching a remote specification.

### OAuth2

ClientCredentials, RefreshToken, Password are supported.
If your OpenAPI specification declare [securitySchemes](https://swagger.io/docs/specification/v3_0/authentication/oauth2/) for those flows, the corresponding `tokenUrl` will be used.

## How to publish

Create a new tag/release 🤷