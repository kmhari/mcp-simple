# Enkrypt AI MCP Server

The Enkrypt AI MCP Server allows you to integrate red-teaming, prompt auditing, and AI safety analysis directly into any [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction)–compatible client such as Claude Desktop or Cursor IDE.

With this server, you can analyze prompts, detect jailbreak attempts, simulate adversarial attacks, and bring AI safety tooling directly into your assistant-driven workflows.

---

## 🚀 Features

- Real-time prompt risk analysis  
- Red-teaming via adversarial prompt generation  
- Tool-based LLM monitoring using the MCP standard  
- Seamless integration with Claude Desktop, Cursor IDE, and other MCP clients

---

## 💠 Installation

Before getting started, ensure you have [`uv`](https://docs.astral.sh/uv/getting-started/installation/) installed on your machine.

### 1. Clone the repository

```bash
git clone https://github.com/enkryptai/enkryptai-mcp-server.git
cd enkryptai-mcp-server
```

### 2. Install dependencies

```bash
uv pip install -e .
```

---

## 🔑 Get Your API Key

To use the Enkrypt tools, you’ll need a free API key from:

[https://app.enkryptai.com/settings/api](https://app.enkryptai.com/settings/api)

---

## ⚙️ Configuration

You can connect this MCP server to any MCP-compatible client. Here's how to do it with **Cursor** and **Claude Desktop**.

---

### 🖥️ Cursor

1. Open **Settings** → **MCP** tab in Cursor  
2. Click **"Add new global MCP server"**  
3. Paste the following config into the `mcp.json` file:

```json
{
  "mcpServers": {
    "EnkryptAI-MCP": {
      "command": "uv",
      "args": [
        "--directory",
        "PATH/TO/enkryptai-mcp-server",
        "run",
        "src/mcp_server.py"
      ],
      "env": {
        "ENKRYPTAI_API_KEY": "YOUR ENKRYPTAI API KEY"
      }
    }
  }
}
```

Replace:
- `PATH/TO/enkryptai-mcp-server` with the absolute path to the cloned repo
- `YOUR ENKRYPTAI API KEY` with your API key

The server will launch and appear in your MCP tools list.

---

### 💬 Claude Desktop

1. Open the **Claude** menu in your system menu bar (not inside the app window)  
2. Go to **Settings…** → **Developer** tab  
3. Click **Edit Config**

This opens or creates the MCP config file at:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

Replace the contents with:

```json
{
  "mcpServers": {
    "EnkryptAI-MCP": {
      "command": "uv",
      "args": [
        "--directory",
        "PATH/TO/enkryptai-mcp-server",
        "run",
        "src/mcp_server.py"
      ],
      "env": {
        "ENKRYPTAI_API_KEY": "YOUR ENKRYPTAI API KEY"
      }
    }
  }
}
```

Make sure to:
- Set the correct repo path
- Paste in your API key

Finally, restart Claude Desktop. Once it reloads, you’ll see a hammer icon in the chat box, indicating your MCP tools are active.
