# MCP Servers Collection

This repository hosts five Model Context Protocol (MCP) servers you can mount into Claude Desktop:

1. **line-bot**  
2. **email_mcp**  
3. **fetch**  
4. **word-document-service**  
5. **filesystem**  

## 🚀 Quick Start

1. **line-bot(in different terminal)**  
  ```
  git clone https://github.com/iamkaia/email-mcp-server-simple.git
  cd email-mcp-server-simple

  ## **Set up Python env and install requirement thing(for _email_mcp_, )**  
  python -m venv .venv
  source .venv/bin/activate      # Windows: .\.venv\Scripts\activate
  pip install -r requirements.txt

  ### Fill `.env`** (for `email_mcp` only—do **not** commit):
  # SMTP
  SMTP_SERVER=smtp.example.com
  SMTP_PORT=587
  SMTP_USERNAME=you@example.com
  SMTP_PASSWORD=your_smtp_password

  # IMAP
  IMAP_SERVER=imap.example.com
  IMAP_PORT=993
  IMAP_USERNAME=you@example.com
  IMAP_PASSWORD=your_imap_password

  ## start
  uvicorn main:app --reload --host 0.0.0.0 --port 8000
  ```

2. **line-bot-mcp(in different terminal)** :
  ```
  # Clone the repository
  git clone git@github.com:line/line-bot-mcp-server.git
  cd line-bot-mcp-server && npm install && npm run build
  ```

3. **fetch(in different terminal)**:
  ```
  pip install mcp-server-fetch
  python -m mcp_server_fetch
  ```

4. **Word-MCP-Server(in different terminal)**:
  ```
  # Clone the repository
  git clone https://github.com/GongRzhe/Office-Word-MCP-Server.git
  cd Office-Word-MCP-Server

  # Install dependencies
  pip install -r requirements.txt

  #start
  python setup_mcp.py
  ```
5. **filesystem(in different terminal)**:
  ```
  # filesystem (via NPX) (you can ignore this step if you have nide and npx)
  npx -y @modelcontextprotocol/server-filesystem \
    "/Users/username/Desktop" \
    "/path/to/other/allowed/dir"
  ```

---

## 🔧 Claude Desktop Configuration

Edit your `claude_desktop_config.json` to spawn each MCP tool:

```jsonc
{
  "mcpServers": {
    "line-bot": {
      "command": "node",
      "args": [
        "to\\the\\path\\line-bot-mcp-server\\dist\\index.js"
      ],
      "env": {
        "CHANNEL_ACCESS_TOKEN" : "xxx",
        "DESTINATION_USER_ID" : "xxx"
      }
    },
    "email_mcp": {
      "command": "to\\the\\path\\mcp-proxy.exe",
      "args": [
        "http://localhost:9000/mcp"      
      ]
    },
    "fetch": {
      "command": "python",
      "args": ["-m", "mcp_server_fetch"]
    },
    "word-document-server": {
      "command": "to\\the\\path\\python.exe",
      "args": [
        "to\\the\\path\\word_server.py"
      ],
      "env": {
        "PYTHONPATH": "to\\the\\path\\Office-Word-MCP-Server"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "--yes",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/Desktop",
        "/path/to/other/allowed/dir"
      ]
    }
  }
}
```

After saving, **quit & restart** Claude Desktop. The 🔨 Tools menu will list all available MCP tools.

---

## 📦 Servers & Tools

### 1. **line-bot**  
- **Tools**: `send_line_message`, `broadcast_flex_message`, `broadcast_text_message`…
- **Push** messages into a Line chat.

### 2. **email_mcp**  
- **Tools**: `send_email`, `list_recent_emails`

### 3. **fetch**  
- **Tools**: `fetch_page`
- **Input**: `url` ⇒ **Output**: title, headings, snippet.

### 4. **word-document-service**  
- **Tools**:  
  - `create_document`, `add_heading`, `insert_table`, `format_text`, `search_replace`, …  
- **Manipulate** DOCX files programmatically.

### 5. **filesystem**  
- **Tools**:  
  - `read_file`, `write_file`, `list_directory`, `search_files`, `get_file_info`, …  
- **Operate** only within the mounted directories.

#### detailed intro of tool_list [tools.md](./tools.md) 

---

## 🎯 Example JSON‑RPC Calls (for reference only)

```json
// send_email
{
  "tool":"send_email",
  "input":{"params":{
    "to":["friend@example.com"],
    "subject":"Hello",
    "body":"This is a test.",
    "html":false
  }}
}

// list_recent_emails
{
  "tool":"list_recent_emails",
  "input":{"params":{
    "limit":3
  }}
}

// fetch_page
{
  "tool":"fetch_page",
  "input":{"params":{"url":"https://example.com"}}
}

// create a Word doc
{
  "tool":"create_document",
  "input":{"params":{"filename":"report.docx","title":"Sales Report"}}
}

// filesystem read
{
  "tool":"read_file",
  "input":{"params":{"path":"to//the//path//notes.txt"}}
}
```

## 📃 License

All servers are MIT‑licensed. See each subfolder’s LICENSE for details.