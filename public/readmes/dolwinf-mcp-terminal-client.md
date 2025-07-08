# 🖥️ MCP Terminal Chat Client

A terminal-based interactive chat client for communicating with Model Context Protocol (MCP) servers using Anthropic's Claude models.

Designed for developers building and testing tools via the MCP spec.

---

## 💡 Features

- 🧑‍💻 Terminal chat interface with Claude
- 🔍 Auto-discovers tools from an MCP server
- 🧰 Executes Claude's `tool_use` calls live
- ✅ Validates tool inputs via JSON Schema
- 🪵 Full structured logging and debugging
- 🔁 Multi-turn conversation loop with memory
- 📎 File Attachments for Images and PDF

---

## ⚙️ Requirements

- Python 3.11+
- MCP tool server (conforming to the spec)
- `.env` file with Anthropic API key

### 📦 Python Packages

Install with `uv` (recommended) or `pip`:

```bash
uv pip install -r requirements.txt
# or
pip install -r requirements.txt
```

Dependencies:
- `anthropic`
- `anyio`
- `mcp`
- `python-dotenv`
- `jsonschema`

---

## 🧾 Configuration

### 🔑 `llm_config.json`

```json
{
  "provider": "anthropic",
  "model": "claude-3-haiku-20240307"
}
```

### ⚙️ `mcp_servers.json`

```json
{
  "mcpServers": {
    "default": {
      "command": "python",
      "args": ["-m", "your_mcp_tool_server"],
      "env": {
        "MY_ENV_VAR": "value"
      }
    }
  }
}
```

### 🔐 `.env`

```env
ANTHROPIC_API_KEY=your-api-key-here
```

---

## 🧪 Usage

Run with default config:

```bash
python main.py
```

Custom configs:

```bash
python main.py --llm_config custom_llm_config.json --mcp_config custom_mcp_servers.json
```

---

## 💬 Conversation Flow

1. You send a prompt in terminal
2. Claude replies with text or `tool_use` blocks
3. MCP client validates and calls the appropriate tool
4. Tool results are returned to Claude
5. Claude completes the response

> All without leaving your terminal.

---

## 📎 File Attachments

You can attach **PDF** and **image** files (`.png`, `.jpg`, `.webp`) to your prompt using the `--file` flag.

These files will be sent to Claude along with your message using base64 encoding and the correct MIME type.

### 🖼️ Supported Types

- `application/pdf`
- `image/png`
- `image/jpeg`
- `image/webp`

---

### 📁 Example Usage

```bash
python main.py --file ./sample.pdf
```

---

## 🛠 Tool Handling

- Tools are discovered via `tools/list`
- Input schemas are parsed and validated
- Tool outputs must return a string (per Claude API)
- Errors are passed back as strings with `content`

---

## 🐛 Troubleshooting

- Make sure `ANTHROPIC_API_KEY` is in `.env`
- Set log level to `DEBUG` for full trace
- If Claude throws 400 errors:
  - Ensure `tool_result.content` is a **string**
  - Validate tool inputs match declared schema

---

## 📌 TODO

- [ ] Support OpenAI, VertexAI
- [ ] Vendor-agnostic LLM integration
- [ ] SSE support
- [ ] Packaging
- [ ] Add tests and CLI improvements