[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/reclaim-mcp-server.svg)](https://www.npmjs.com/package/reclaim-mcp-server)

# Reclaim.ai MCP Server 🚀 _(UNOFFICIAL)_

> **⚠️ UNOFFICIAL & UNAFFILIATED** – This project is **not** endorsed, sponsored, or supported by Reclaim.ai. It simply uses Reclaim's public API. Use at your own risk and comply with Reclaim's Terms of Service.

A community‑maintained [**Model Context Protocol**](https://modelcontextprotocol.io/) (MCP) server that lets _any_ MCP‑capable client (Claude Desktop, Continue, Cursor, custom scripts, …) interact with the [Reclaim.ai API](https://reclaim.ai/) through a set of standard **resources** & **tools**.

---

## 🧐 Why MCP?

- MCP is the "USB‑C" of LLM integrations – one wire that lets every model talk to every tool.

- Run this server once and _all_ your MCP‑aware apps instantly gain Reclaim super‑powers.

---

## ✨ Key Features

- **Active‑tasks resource** (`tasks://active`)

- **14 task‑operation tools** (list, create, update, complete, timers, …)

- 🛡 Type‑safe (TypeScript + Zod) & solid error‑handling

- 📦 Zero‑config stdio transport – perfect for local AI assistants

---

## 📚 MCP Capabilities

### Tools (Actions)

| Tool                       | Description                   | Parameters                                                | ✅ Idemp. | ☠️ Destr. |
| -------------------------- | ----------------------------- | --------------------------------------------------------- | --------- | --------- |
| `reclaim_list_tasks`       | List tasks (default = active) | `{ "filter"?: "active"\|"all" }`                          | ✅        | ❌        |
| `reclaim_get_task`         | Fetch a task                  | `{ "taskId": number }`                                    | ✅        | ❌        |
| `reclaim_create_task`      | Create a new task             | `{ /* task properties */ }`                               | ❌        | ❌        |
| `reclaim_update_task`      | Update task properties        | `{ "taskId": number, /* updated properties */ }`          | ✅        | ❌        |
| `reclaim_mark_complete`    | Mark complete                 | `{ "taskId": number }`                                    | ✅        | ❌        |
| `reclaim_mark_incomplete`  | Unarchive / mark incomplete   | `{ "taskId": number }`                                    | ✅        | ❌        |
| `reclaim_delete_task`      | Delete permanently            | `{ "taskId": number }`                                    | ✅        | **✅**    |
| `reclaim_add_time`         | Add schedule minutes          | `{ "taskId": number, "minutes": number }`                 | ❌        | ❌        |
| `reclaim_start_timer`      | Start timer                   | `{ "taskId": number }`                                    | ✅        | ❌        |
| `reclaim_stop_timer`       | Stop timer                    | `{ "taskId": number }`                                    | ✅        | ❌        |
| `reclaim_log_work`         | Log work time                 | `{ "taskId": number, "minutes": number, "end"?: string }` | ❌        | ❌        |
| `reclaim_clear_exceptions` | Clear scheduling exceptions   | `{ "taskId": number }`                                    | ✅        | ❌        |
| `reclaim_prioritize`       | Prioritise in planner         | `{ "taskId": number }`                                    | ✅        | ❌        |

---

## ⚠️ Known Issues

**`COMPLETE` ≠ done.** Reclaim marks a task `COMPLETE` when its _scheduled block_ ends, even if you haven't finished the work. This server does include those tasks as active when the LLM uses the tool to pull active tasks (and reminds the model that `COMPLETE` tasks are still active). However, LLMs (Claude) sometimes ignore `COMPLETE` tasks when asked for "open" or "active" tasks. If that happens, you may need to prompt the LLM explicitly to "include tasks with status COMPLETE".

## 🚀 Quick Start

1. **Prerequisites**
   - Node.js ≥ 18  
   - [Reclaim API key](https://app.reclaim.ai/settings/developer)

2. **Claude Desktop configuration (minimal)**
   ```json
{
  "mcpServers": {
    "reclaim": {
      "command": "npx",
      "args": [
        "reclaim-mcp-server"
      ],
      "env": { "RECLAIM_API_KEY": "xxx" }
    }
  }
}
   ```

**Alternative Configuration:**

   ```json
{
  "mcpServers": {
    "reclaim": {
      "command": "absolute/path/to/node (run `which node` in terminal)",
      "args": [
        "/absolute/path/to/reclaim-mcp-server/dist/index.js"
      ],
      "env": { "RECLAIM_API_KEY": "xxx" }
    }
  }
}
   ```


### Alternative: Manual Installation

If you prefer to install from source:

```bash
git clone https://github.com/jj3ny/reclaim-mcp-server.git
cd reclaim-mcp-server
pnpm install && pnpm build

# Run with your API key
RECLAIM_API_KEY=your_api_key node dist/index.js
```

## 🤝 Contributing

Bug reports & PRs welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes (following the code style)
4. Commit using Conventional Commits (`feat:`, `fix:`, etc.)
5. Push to your branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please squash your commits before opening a PR.

## 📄 License

MIT – see LICENSE.