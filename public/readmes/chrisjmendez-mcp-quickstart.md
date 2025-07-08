# 🧠 MCP Quickstart: Claude + SQLite + Docker

### TL;DR: Build a secure local Claude brain using Docker, SQLite, and `uvx`.

---

## 🛡️ Step 1: Build & Run the Docker SQLite Server

```bash
docker-compose build
docker-compose up
```

Your server will be live at `http://localhost:8080`, ready to accept MCP-style queries.

---

## 🧠 Step 2: Install Astral (`uv` / `uvx`)

Astral is the MCP-compatible package manager.

```bash
curl -Ls https://astral.sh/uv/install.sh | sh
```

Verify it:

```bash
uvx mcp-server-sqlite --help
```

---

## 🔧 Step 3: Make `uvx` Available to Claude Desktop

Claude launched via Spotlight/Dock doesn’t see your shell config. So we have to tell macOS:

```bash
launchctl setenv PATH "$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
```

You can also verify this:

```bash
launchctl getenv PATH
```

### 🔗 Add Symlink for `uv` (required by `uvx`)

Claude expects `uv` at `/usr/local/bin/uv`, but Astral installs it in `~/.local/bin/uv`. Fix that with:

```bash
sudo ln -s $HOME/.local/bin/uv /usr/local/bin/uv
```

Verify:

```bash
uvx mcp-server-sqlite --help
```

---

## ⚙️ Step 4: Configure Claude to Use Your SQLite DB

Create or edit:

```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

Insert:

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "uvx",
      "args": [
        "mcp-server-sqlite",
        "--db-path",
        "/Users/YOUR_USERNAME/Desktop/mcp_quickstart/data/test.db"
      ]
    }
  }
}
```

✅ Make sure to replace `YOUR_USERNAME` with your actual username.

---

## 🧪 Step 5: Test It Manually

Try this from the terminal:

```bash
echo '{"jsonrpc":"2.0","id":"debug","method":"query","params":{"sql":"SELECT * FROM products LIMIT 1"}}' \
  | uvx mcp-server-sqlite --db-path /Users/YOUR_USERNAME/Desktop/mcp_quickstart/data/test.db
```

You should get back:

```json
{
  "jsonrpc": "2.0",
  "id": "debug",
  "result": {
    "columns": ["id", "name", "price"],
    "rows": [[1, "Widget", 19.99]]
  }
}
```

---

## 🧰 Troubleshooting

### 🧹 Check if the DB is accessible

```bash
docker exec -it $(docker ps --filter "name=mcp-server" -q) sqlite3 /data/test.db
```

Then run:

```sql
SELECT * FROM products LIMIT 1;
```

---

### 🔄 Rebuild the Docker container

```bash
docker-compose down -v && docker-compose build && docker-compose up
```

---

## 💬 Bonus: Simulate Claude Queries with a Test JSON

```bash
echo '{"jsonrpc":"2.0","id":"test123","method":"query","params":{"sql":"SELECT * FROM products"}}' > test-mcp.json

cat test-mcp.json | uvx mcp-server-sqlite --db-path /Users/YOUR_USERNAME/Desktop/mcp_quickstart/data/test.db
```

---

## 📚 Resources

- Claude MCP Docs → [https://www.claudemcp.com/docs/quickstart](https://www.claudemcp.com/docs/quickstart)
- Model Context Protocol → [https://modelcontextprotocol.io](https://modelcontextprotocol.io)

---

## ✅ You now have:

- 🐻 Dockerized SQLite server
- 🧪 Secure query interface via FastAPI + Uvicorn
- 📡 Claude MCP bridge using `uvx` + `mcp-server-sqlite`
- 🧠 A local Claude brain that talks SQL

