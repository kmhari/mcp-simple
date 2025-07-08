# NihFix.Postgres.Mcp

**NihFix.Postgres.Mcp** is a lightweight and efficient Model Context Protocol (MCP) server for PostgreSQL, built to allow AI agents to interact with databases easily and in real-time.  
It supports two transport types: **STDIO** for direct process communication and **SSE (Server-Sent Events)** for streaming data over HTTP.

## Features

- 🗄️ Connects seamlessly to PostgreSQL databases.
- 🧠 Designed for AI agent database interaction.
- 🔥 Supports **SSE** and **STDIO** transport protocols.
- 🐳 Easy to run in isolated Docker containers.
- ⚡ Minimal and optimized for fast response times.

## Quick Start (SSE Mode)

```bash
docker run -i --rm   -e McpServerOptions__ServerType=Sse   -e McpServerOptions__ConnectionString="Host=host.docker.internal;Port=5432;Database=MyDbName;User ID=dbUser;Password=dbUserPassword;"   -p 3002:8080   nihfix/postgres.mcp
```
Then define server url in your client:
```
http://localhost:3002/sse
```

## Quick Start (STDIO Mode)

Example MCP client configuration for STDIO:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "McpServerOptions__ConnectionString",
        "nihfix/postgres.mcp",
        "--access-mode=unrestricted"
      ],
      "env": {
        "McpServerOptions__ConnectionString": "Host=host.docker.internal;Port=5432;Database=MyDbName;User ID=dbUser;Password=dbUserPassword;"
      }
    }
  }
}
```

## Environment Variables

| Variable                          | Description                        | Required | Example                                                        |
|------------------------------------|------------------------------------|----------|----------------------------------------------------------------|
| `McpServerOptions__ServerType`     | Server mode (`Sse` or `Stdio`)      | Yes (for SSE) | `Sse`                                                |
| `McpServerOptions__ConnectionString` | PostgreSQL connection string       | Yes      | `Host=host.docker.internal;Port=5432;Database=MyDb;User ID=user;Password=pass;` |

## Requirements

- Docker
- PostgreSQL server (12+ recommended)

## License

MIT License.

## Links

- [DockerHub](https://hub.docker.com/r/nihfix/postgres.mcp)
