# Dash0 MCP server

The official [Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) server for Dash0.

Enables AI assistants to navigate your OpenTelemetry resources, investigate incidents and query metrics, logs and traces on [Dash0](https://www.dash0.com/).

The Dash0 MCP server is remote and uses the [Streamable HTTP transport](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http).

## Usage

See the [Dash0 Integrations Hub](https://www.dash0.com/hub/integrations?tag=AI) for instructions on how to connect with the most popular AI agents and coding assistants like Claude, Cline, Cursor and Windsurf.

For custom integrations or integrating with other MCP clients, follow the instructions below:

1. Log in to the [Dash0 app](https://app.dash0.com) and open your organization settings.

2. Click on `Endpoints` > `MCP` and copy the endpoint URL for your region.

3. Click on `Auth Tokens` and create or reuse an existing token with `All permissions` on the Dataset(s) that you want to work with.

4. Add the following configuration to your AI assistant or MCP client (the configuration schema may differ depending on the implementation):
   ```json
   {
     "mcpServers": {
       "dash0": {
         "type": "streamableHttp",
         "url": "{{endpoint_mcp}}",
         "headers": {
           "Authorization": "Bearer {{token}}"
         }
       }
     }
   }
   ```
   For clients that don't support remote MCP servers or that haven't implemented the [Streamable HTTP transport](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http) yet, you can use a configuration like the following instead:
   ```json
   {
     "mcpServers": {
       "dash0": {
         "command": "npx",
         "args": [
           "-y",
           "mcp-remote",
           "{{endpoint_mcp}}",
           "--header",
           "Authorization: Bearer ${DASH0_AUTH_TOKEN}"
         ],
         "env": {
           "DASH0_AUTH_TOKEN": "{{token}}"
         }
       }
     }
   }
   ```
