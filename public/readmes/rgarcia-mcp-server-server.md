# mcp-server-server

This repo is a proof of concept MCP server that exposes another stdio MCP server over a websocket.

## But...why?

MCP servers are hard to use.

The primary transport mechanism for MCP servers is stdio, i.e. in your MCP client program you need to spawn a new process for the MCP server you want to use.
This has downsides:

1. It's cumbersome--every MCP client needs to be a process manager now. The way you [configure Claude Desktop](https://modelcontextprotocol.io/quickstart#installation) to use MCP servers is a good demonstration of this--it needs a list of processes to run.
2. It creates an infra problem: if you have many users, all of which require different MCP server configurations (e.g. they all have different credentials for underlying MCP servers like Github, Google Drive, etc.), then you now have tons of processes to operate and route client requests to.
3. It's slow: the default way to spin up an MCP server is `npx ...` or `uvx ...` which comes with all of the slowness of these tools (2-3s spinup times are normal).

## A better way

What if MCP servers were actually... servers? I.e. communication with them happened over the network instead of stdio.
Then you could have an easier time using them programatically.

### Step 1: Convert a stdio MCP server to a websocket MCP server

This repo contains a wrapper program that will take an existing MCP server ([here](https://github.com/modelcontextprotocol/servers/tree/main/src/) is a list of the official ones, but they're all over now) and expose it via websocket:

```zsh
bun run mcp-server-wrapper -p 3001 -- npx -y @modelcontextprotocol/server-puppeteer@latest
```

and for faster spin up times, install it and invoke it using `node` directly:

```zsh
pnpm install -g @modelcontextprotocol/server-puppeteer@latest
bun run mcp-server-wrapper -p 3001 -- node ~/Library/pnpm/global/5/node_modules/@modelcontextprotocol/server-puppeteer/dist/index.js
```

### Step 2: Interact with the MCP server programatically without managing processes

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { WebSocketClientTransport } from "@modelcontextprotocol/sdk/client/websocket.js";

const transport = new WebSocketClientTransport(new URL("ws://localhost:3001"));

const client = new Client(
  {
    name: "example-client",
    version: "1.0.0",
  },
  {
    capabilities: {},
  }
);
await client.connect(transport);
const tools = await client.listTools();
console.log(
  "Tools:",
  tools.tools.map((t) => t.name)
);
await client.close();
```

```zsh
bun run mcp-server-wrapper-client
$ bun run src/mcp-server-wrapper/example-client/example-client.ts
Tools: [ "puppeteer_navigate", "puppeteer_screenshot", "puppeteer_click", "puppeteer_fill",
  "puppeteer_evaluate"
]
```

### Step 3: Build it into a docker image

For a given MCP server configuration, e.g.

```json
{
  "mcpServers": {
    "fetch": {
      "command": "uvx",
      "args": ["mcp-server-fetch"]
    }
  }
}
```

We'd like to build it into a docker image that exposes a websocket, that we can run anywhere.
This repo contains a script that will output a Dockerfile for a given MCP server configuration:

```bash


```
