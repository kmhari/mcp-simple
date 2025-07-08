# Using MCP Server

To interact with the MCP Server, you'll need an MCP client. [Supported
clients](https://modelcontextprotocol.io/clients) include Claude Desktop, VSCode, and Cline, among others. The configuration process is similar across all of them.

Below is a sample configuration you can add to your client:
- [Cline MCP Server configuration](https://docs.cline.bot/mcp-servers/configuring-mcp-servers)
- [VS Code MCP Server configuration](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)

```json
{
  "pulumi-mcp-server": {
    "command": "docker",
    "args": [
      "run",
      "-i",
      "--rm",
      "--name",
      "pulumi-mcp-server",
      "-e",
      "PULUMI_ACCESS_TOKEN",
      "dogukanakkaya/pulumi-mcp-server"
    ],
    "env": {
      "PULUMI_ACCESS_TOKEN": "${YOUR_TOKEN}"
    },
    "transportType": "stdio"
  }
}
```
