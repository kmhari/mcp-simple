# oura-mcp

An MCP server for [ouraring.com](https://ouraring.com/).

## Usage

Create an access token on [cloud.ouraring.com](https://cloud.ouraring.com/personal-access-tokens):

1. create a personal access token
2. copy the token

JSON config for `oura-mcp` as `stdio` server:

```json
{
  "mcpServers": {
    "oura": {
      "command": "npx",
      "args": ["-y", "oura-mcp"],
      "env": {
        "oura_ACCESS_TOKEN": "<your-token>"
      }
    }
  }
}
```

Alternatively you can run it as:

- sse server: `npx -y oura-mcp --sse`
- streamable http server: `npx -y oura-mcp --http`

## Capabilities

- Get Personal Info
- Get Daily Activity
- Get Daily Cardiovascular Age
- Get Daily Sleep
- Get Daily SpO2
- Get Daily Stress
- Get HeartRate


## License

MIT.
