# REST CSV MCP Server

This was generated using [mcpgen](https://mcpgen.jordandalton.com/).

To build the MCP server, run:

```
npm install && npm run build
```

This will compile the typescript files and produce a build directory plus it will output the json you can copy/paste into your MCP client (Claude Desktop, Windsurf, Cursor, etc.)

If all things go well, this will produce an output similar to this:

```json
{
  "mcpServers": {
    "my-mcp": {
      "command": "npx",
      "args": [
        "restcsv-mcp-server"
      ],
      "env": {
        "RESTCSV_API_KEY": "<REPLACE>"
      }
    }
  }
}
```

## Register an account at RestCSV.com](https://restcsv.com/)

## Sharing

If you have found value in this service please share it on social media. You can tag me [@jordandalton](https://x.com/jordankdalton) on X, or [jdcarnivore](https://www.reddit.com/user/jdcarnivore) on Reddit.