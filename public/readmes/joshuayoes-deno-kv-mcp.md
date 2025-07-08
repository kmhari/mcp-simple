# DenoKV MCP Server

[![JSR](https://jsr.io/badges/@joshuayoes/deno-kv-mcp)](https://jsr.io/@joshuayoes/deno-kv-mcp) [![Score](https://jsr.io/badges/@joshuayoes/deno-kv-mcp/score)](https://jsr.io/@joshuayoes/deno-kv-mcp)

## Usage with MCP Clients

### Deno (recommended)

The easiest way to integrate this server with an MCP client like Claude Desktop or Cursor is to use the published JSR package. Configure your MCP client as follows:

```json
{
  "mcpServers": {
    "denokv": {
      "command": "deno",
      "args": [
        "run",
        "--unstable-kv",
        "--allow-env",
        "--allow-net",
        "--allow-read",
        "--allow-write",
        "--allow-run",
        "jsr:@joshuayoes/deno-kv-mcp"
      ],
      "env": {
        "DENO_KV_PATH": "path/to/your/kv.db OR https://api.deno.com/databases/<UUID>/connect",
        "DENO_KV_ACCESS_TOKEN": "<YOUR_DENO_DEPLOY_ACCESS_TOKEN>" // Only needed for remote DB
      }
    }
  }
}
```

Make sure to replace the `env` values with your specific details.

### Node

After figuring out that:

- [Deno has an official client library for KV that works with Node](https://docs.deno.com/deploy/kv/manual/node/)
- Deno has a [compatibility layer with Node](https://docs.deno.com/api/node/),
- Even though [jsr packages do not work natively with npx](https://github.com/jsr-io/jsr/issues/157), thanks to this [xjsr npm package](https://www.npmjs.com/package/xjsr), we can run jsr packages using npx and node.

We can run this in Node!

```json
{
  "mcpServers": {
    "denokv": {
      "command": "npx",
      "args": ["xjsr", "@joshuayoes/deno-kv-mcp@latest"],
      "env": {
        "DENO_KV_PATH": "path/to/your/kv.db OR https://api.deno.com/databases/<UUID>/connect",
        "DENO_KV_ACCESS_TOKEN": "<YOUR_DENO_DEPLOY_ACCESS_TOKEN>" // Only needed for remote DB
      }
    }
  }
}
```

Make sure to replace the `env` values with your specific details.

If you really want to get crazy, replace `npx` with `bunx`.

## Available Tools

This server provides the following tools:

- **`set`**: Set a key-value pair in the Deno KV store.
  - `key` (array of strings): The key to set.
  - `value` (string): The value to set (JSON string).
  - `expireIn` (number, optional): Time-to-live (TTL) for the key in milliseconds.
- **`get`**: Get a value by key from the Deno KV store.
  - `key` (array of strings): The key to get.
  - `consistency` (enum: "strong" | "eventual", optional): Consistency level for the read.
- **`delete`**: Delete a key-value pair from the Deno KV store.
  - `key` (array of strings): The key to delete.
- **`getMany`**: Get multiple values by keys from the Deno KV store.
  - `keys` (array of array of strings): The keys to get.
  - `consistency` (enum: "strong" | "eventual", optional): Consistency level for the read.
- **`list`**: List key-value pairs based on a selector.
  - `prefix` (array of strings, optional): Key prefix to list (e.g., `["users"]`).
  - `start` (array of strings, optional): Start key for range queries (e.g., `["orders", "2023"]`).
  - `end` (array of strings, optional): End key for range queries (e.g., `["orders", "2024"]`).
  - `limit` (integer, positive, optional): Maximum number of entries to return.
  - `consistency` (enum: "strong" | "eventual", optional): Consistency level for the list operation.
  - `batchSize` (integer, positive, optional): Number of entries to fetch per batch internally.
  - `reverse` (boolean, optional): Whether to reverse the order of entries.
  - _Note:_ Must provide `prefix`, `start`, or (`start` and `end`) parameter. `end` requires `start` or `prefix`.

## Local Development Setup

If you prefer to run the server from a local clone of this repository (e.g., for development or testing), use the following configuration instead:

### Deno

```json
{
  "mcpServers": {
    "denokv": {
      "command": "deno",
      "args": [
        "run",
        "--unstable-kv",
        "--allow-env",
        "--allow-net",
        "--allow-read",
        "--allow-write",
        "--allow-run",
        "/path/to/your/mcp-deno-kv/index.ts" // Replace with the actual path to index.ts
      ],
      "env": {
        "DENO_KV_PATH": "path/to/your/kv.db OR https://api.deno.com/databases/<UUID>/connect",
        "DENO_KV_ACCESS_TOKEN": "<YOUR_DENO_DEPLOY_ACCESS_TOKEN>" // Only needed for remote DB
      }
    }
  }
}
```

Make sure to replace `/path/to/your/mcp-deno-kv/index.ts` and the `env` values with your specific details.

### Node

Using node ([>=v22.7.0](https://nodejs.org/api/typescript.html#:~:text=enabled%20by%20default.-,v22.7.0,-Added%20%2D%2Dexperimental%2Dtransform)), we can also run the server directly without a build step!

You may need to run `deno install` first to add a `node_modules` folder.

```json
{
  "mcpServers": {
    "denokv": {
      "command": "node",
      "args": [
        "--experimental-transform-types",
        "/path/to/your/mcp-deno-kv/index.ts" // Replace with the actual path to index.ts
      ],
      "env": {
        "DENO_KV_PATH": "path/to/your/kv.db OR https://api.deno.com/databases/<UUID>/connect",
        "DENO_KV_ACCESS_TOKEN": "<YOUR_DENO_DEPLOY_ACCESS_TOKEN>" // Only needed for remote DB
      }
    }
  }
}
```

Make sure to replace `/path/to/your/mcp-deno-kv/index.ts` and the `env` values with your specific details.

If you really want to get crazy, replace `npx` with `bunx`.

## Environment Variables

This server requires the following environment variables to be set:

- `DENO_KV_PATH`: Specifies the path to the Deno KV database.
  - For a **local database**, this should be the file path (e.g., `./my-kv.db`).
  - For a **remote Deno Deploy database**, this should be the connection URL (e.g., `https://api.deno.com/databases/<UUID>/connect`).
- `DENO_KV_ACCESS_TOKEN`: Required **only if** `DENO_KV_PATH` points to a remote Deno Deploy database. This should be your Deno Deploy personal access token.
