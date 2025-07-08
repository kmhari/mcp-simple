# MCP server for Obsidian (TypeScript + Bun)

[![NPM Version](https://img.shields.io/npm/v/%40fazer-ai%2Fmcp-obsidian)](https://www.npmjs.com/package/@fazer-ai/mcp-obsidian)

> A Model-Context-Protocol (MCP) server that lets Claude (or any MCP-compatible LLM) interact with your Obsidian vault through the [**Local REST API**](https://github.com/coddingtonbear/obsidian-local-rest-api) community plugin – written in **TypeScript** and runnable with **bunx**.

---

## ✨ Components

### Tools

| Tool name | Description |
|-----------|-------------|
| **obsidian_status** | Returns basic details about the Obsidian Local REST API server and your authentication status |
| **obsidian_delete_active** | Deletes the note that is currently active in the Obsidian UI |
| **obsidian_get_active** | Retrieves the full content of the active note (Markdown or JSON view) |
| **obsidian_patch_active** | Inserts, replaces or prepends content in the active note relative to a heading, block reference, or front-matter field |
| **obsidian_post_active** | Appends Markdown to the end of the active note |
| **obsidian_put_active** | Replaces the entire body of the active note |
| **obsidian_get_commands** | Lists every command available in Obsidian’s command palette |
| **obsidian_execute_command** | Executes a specific Obsidian command by its ID |
| **obsidian_open_file** | Opens the given file inside Obsidian (creates it if missing); optional flag to open in a new leaf |
| **obsidian_delete_periodic** | Deletes the current daily / weekly / monthly / quarterly / yearly note for the requested period |
| **obsidian_get_periodic** | Returns the content of the current periodic note for the requested period |
| **obsidian_patch_periodic** | Inserts / replaces content in a periodic note relative to a heading, block reference, or front-matter field |
| **obsidian_post_periodic** | Appends Markdown to the periodic note (creates it if it doesn’t exist) |
| **obsidian_put_periodic** | Replaces the entire body of a periodic note |
| **obsidian_search_dataview** | Runs a Dataview-DQL query across the vault and returns matching rows |
| **obsidian_search_json_logic** | Runs a JsonLogic query against structured note metadata |
| **obsidian_simple_search** | Performs a plain-text fuzzy search with optional surrounding context |
| **obsidian_list_vault_root** | Lists all files and directories at the **root** of your vault |
| **obsidian_list_vault_directory** | Lists files and directories inside a **specific folder** of the vault |
| **obsidian_delete_file** | Deletes a specific file (or directory) in the vault |
| **obsidian_get_file** | Retrieves the content of a file in the vault (Markdown or JSON view) |
| **obsidian_patch_file** | Inserts / replaces content in an arbitrary file relative to a heading, block reference, or front-matter field |
| **obsidian_post_file** | Appends Markdown to a file (creates it if it doesn’t exist) |
| **obsidian_put_file** | Creates a new file or replaces the entire body of an existing file |

*See Obsidian's [Local REST API specifications](https://coddingtonbear.github.io/obsidian-local-rest-api) for more details.*

---

### Example prompts

```text
# Summarize the latest “architecture call” note
# (Claude will transparently call list_files_in_vault → get_file_contents)
Get the contents of the last “architecture call” note and summarize them.

# Find all mentions of Cosmos DB
Search for all files where “Azure CosmosDb” is mentioned and explain the context briefly.

# Create a summary note
Summarize yesterday’s meeting and save it as “summaries/2025-04-24-meeting.md”. Add a short intro suitable for e-mail.
```

---

## ⚙️ Configuration

### Obsidian REST API key

There are two ways to pass the Obsidian API key to the server:

1. **Server config (recommended)** – pass it via the `env` field in your Claude (or other client) MCP-server declaration:

```jsonc
// claude_desktop_config.json
{
  "mcpServers": {
    "@fazer-ai/mcp-obsidian": {
      "command": "bunx",
      "args": ["@fazer-ai/mcp-obsidian@latest"],
      "env": {
        "OBSIDIAN_API_KEY": "your-obsidian-api-key"
      }
    }
  }
}
```

>[!NOTE]
> Use `@fazer-ai/mcp-obsidian@latest` to ensure you always run the most up to date version of the server.

2. Alternatively, you can use an **`.env` file**. Place the key in the `.env` you created above. Note it must be placed in the working directory where the MCP server is running.


### Environment variables

You can use the `.env.example` file as reference to create your own `.env` file.

```bash
OBSIDIAN_API_KEY=   # Obtain this from the plugin settings in Obsidian
OBSIDIAN_PROTOCOL=http
OBSIDIAN_HOST=localhost
OBSIDIAN_PORT=27123 # Port the Local REST API plugin is bound to
```

---

## 🛠 Development

### Running local version on Claude Desktop

After cloning this repo, you can update Claude's config to run your local version of the server instead of pulling from npm.
This is useful for quickly testing changes before publishing.

>[!NOTE]
>Keep in mind any changes you make on the code will only take effect after restarting the Claude Desktop app.

1. Clone this repo and run `bun install` to install dependencies.
1. Update your `claude_desktop_config.json` to point to your local version of the server:

```jsonc
// claude_desktop_config.json
{
  "mcpServers": {
    "@fazer-ai/mcp-obsidian": {
      "command": "bun",
      "args": ["/path/to/repo/src/index.ts"],
      "env": {
        "OBSIDIAN_API_KEY": "your-obsidian-api-key"
      }
    }
  }
}
```

>[!IMPORTANT]
>Note we use `bun` instead of `bunx` here.

### Debugging

MCP servers talk over **stdio**, so normal debuggers aren’t helpful.  
Use the **[MCP Inspector](https://github.com/modelcontextprotocol/inspector)**:

```bash
npx @modelcontextprotocol/inspector bun /path/to/repo/src/index.ts
```

Open the URL it prints to step through requests (usually http://localhost:6274), inspect tool calls, and watch logs in real time.

---

## 📦 Publishing

1. Update the version in `package.json`.
1. Create GitHub release.
1. Run `bun publish`.

---

## License

MIT – see [LICENSE](LICENSE).
