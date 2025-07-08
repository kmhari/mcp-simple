<div align="center">

# Google Workspace MCP Server <img src="https://github.com/user-attachments/assets/b89524e4-6e6e-49e6-ba77-00d6df0c6e5c" width="80" align="right" />

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/Python-3.11%2B-blue.svg)](https://www.python.org/downloads/)
[![PyPI](https://img.shields.io/pypi/v/workspace-mcp.svg)](https://pypi.org/project/workspace-mcp/)
[![UV](https://img.shields.io/badge/Package%20Installer-UV-blueviolet)](https://github.com/astral-sh/uv)
[![Website](https://img.shields.io/badge/Website-workspacemcp.com-green.svg)](https://workspacemcp.com)
[![Verified on MseeP](https://mseep.ai/badge.svg)](https://mseep.ai/app/eebbc4a6-0f8c-41b2-ace8-038e5516dba0)

**This is the single most feature-complete Google Workspace MCP server**

*Full natural language control over Google Calendar, Drive, Gmail, Docs, Sheets, Slides, Forms, and Chat through all MCP clients, AI assistants and developer tools*

</div>

<div align="center">
<a href="https://glama.ai/mcp/servers/@taylorwilsdon/google_workspace_mcp">
  <img width="195" src="https://glama.ai/mcp/servers/@taylorwilsdon/google_workspace_mcp/badge" alt="Google Workspace Server MCP server" align="center"/>
</a>
<a href="https://www.pulsemcp.com/servers/taylorwilsdon-google-workspace">
<img width="456" src="https://github.com/user-attachments/assets/0794ef1a-dc1c-447d-9661-9c704d7acc9d" align="center"/>
</a>
</div>

---


**See it in action:**
<div align="center">
  <video width="832" src="https://github.com/user-attachments/assets/a342ebb4-1319-4060-a974-39d202329710"></video>
</div>

---

### A quick plug for AI-Enhanced Docs

> **This README was crafted with AI assistance, and here's why that matters**
>
> As a solo developer building open source tools that may only ever serve my own needs, comprehensive documentation often wouldn't happen without AI help. Using agentic dev tools like **Roo** & **Claude Code** that understand the entire codebase, AI doesn't just regurgitate generic content - it extracts real implementation details and creates accurate, specific documentation.
>
> In this case, Sonnet 4 took a pass & a human (me) verified them 6/28/25.


## 🌐 Overview

A production-ready MCP server that integrates all major Google Workspace services with AI assistants. Built with FastMCP for optimal performance, featuring advanced authentication handling, service caching, and streamlined development patterns.

## ✨ Features

- **🔐 Advanced OAuth 2.0**: Secure authentication with automatic token refresh, transport-aware callback handling, session management, and centralized scope management
- **📅 Google Calendar**: Full calendar management with event CRUD operations
- **📁 Google Drive**: File operations with native Microsoft Office format support (.docx, .xlsx)
- **📧 Gmail**: Complete email management with search, send, and draft capabilities
- **📄 Google Docs**: Document operations including content extraction, creation, and comment management
- **📊 Google Sheets**: Comprehensive spreadsheet management with flexible cell operations and comment management
- **🖼️ Google Slides**: Presentation management with slide creation, updates, content manipulation, and comment management
- **📝 Google Forms**: Form creation, retrieval, publish settings, and response management
- **💬 Google Chat**: Space management and messaging capabilities
- **🔄 Multiple Transports**: HTTP with SSE fallback, OpenAPI compatibility via `mcpo`
- **⚡ High Performance**: Service caching, thread-safe sessions, FastMCP integration
- **🧩 Developer Friendly**: Minimal boilerplate, automatic service injection, centralized configuration

---

## 🚀 Quick Start

### Simplest Start (uvx - Recommended)

> Run instantly without manual installation - you must configure OAuth credentials when using uvx. You can use either environment variables (recommended for production) or set the `GOOGLE_CLIENT_SECRET_PATH` (or legacy `GOOGLE_CLIENT_SECRETS`) environment variable to point to your `client_secret.json` file.

```bash
# Set OAuth credentials via environment variables (recommended)
export GOOGLE_OAUTH_CLIENT_ID="your-client-id.apps.googleusercontent.com"
export GOOGLE_OAUTH_CLIENT_SECRET="your-client-secret"

# Start the server with all Google Workspace tools
uvx workspace-mcp

# Start with specific tools only
uvx workspace-mcp --tools gmail drive calendar

# Start in HTTP mode for debugging
uvx workspace-mcp --transport streamable-http
```

*Requires Python 3.11+ and [uvx](https://github.com/astral-sh/uv). The package is available on [PyPI](https://pypi.org/project/workspace-mcp).*

### Development Installation

For development or customization:

```bash
git clone https://github.com/taylorwilsdon/google_workspace_mcp.git
cd google_workspace_mcp
uv run main.py
```

### Prerequisites

- **Python 3.11+**
- **[uvx](https://github.com/astral-sh/uv)** (for instant installation) or [uv](https://github.com/astral-sh/uv) (for development)
- **Google Cloud Project** with OAuth 2.0 credentials

### Configuration

1. **Google Cloud Setup**:
   - Create OAuth 2.0 credentials (web application) in [Google Cloud Console](https://console.cloud.google.com/)
   - Enable APIs: Calendar, Drive, Gmail, Docs, Sheets, Slides, Forms, Chat
   - Add redirect URI: `http://localhost:8000/oauth2callback`
   - Configure credentials using one of these methods:

     **Option A: Environment Variables (Recommended for Production)**
     ```bash
     export GOOGLE_OAUTH_CLIENT_ID="your-client-id.apps.googleusercontent.com"
     export GOOGLE_OAUTH_CLIENT_SECRET="your-client-secret"
     export GOOGLE_OAUTH_REDIRECT_URI="http://localhost:8000/oauth2callback"  # Optional
     ```

     **Option B: File-based (Traditional)**
     - Download credentials as `client_secret.json` in project root
     - To use a different location, set `GOOGLE_CLIENT_SECRET_PATH` (or legacy `GOOGLE_CLIENT_SECRETS`) environment variable with the file path

   **Credential Loading Priority**:
   1. Environment variables (`GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`)
   2. File specified by `GOOGLE_CLIENT_SECRET_PATH` or `GOOGLE_CLIENT_SECRETS` environment variable
   3. Default file (`client_secret.json` in project root)

   **Why Environment Variables?**
   - ✅ Containerized deployments (Docker, Kubernetes)
   - ✅ Cloud platforms (Heroku, Railway, etc.)
   - ✅ CI/CD pipelines
   - ✅ No secrets in version control
   - ✅ Easy credential rotation

2. **Environment**:
   ```bash
   export OAUTHLIB_INSECURE_TRANSPORT=1  # Development only
   export USER_GOOGLE_EMAIL=your.email@gmail.com  # Optional: Default email for auth - use this for single user setups and you won't need to set your email in system prompt for magic auth
   ```

3. **Server Configuration**:
   The server's base URL and port can be customized using environment variables:
   - `WORKSPACE_MCP_BASE_URI`: Sets the base URI for the server (default: http://localhost). This affects the server_url used for Gemini native function calling and the OAUTH_REDIRECT_URI.
   - `WORKSPACE_MCP_PORT`: Sets the port the server listens on (default: 8000). This affects the server_url, port, and OAUTH_REDIRECT_URI.
   - `USER_GOOGLE_EMAIL`: Optional default email for authentication flows. If set, the LLM won't need to specify your email when calling `start_google_auth`.

### Start the Server

```bash
# Default (stdio mode for MCP clients)
uv run main.py

# HTTP mode (for web interfaces and debugging)
uv run main.py --transport streamable-http

# Single-user mode (simplified authentication)
uv run main.py --single-user

# Selective tool registration (only register specific tools)
uv run main.py --tools gmail drive calendar
uv run main.py --tools sheets docs
uv run main.py --single-user --tools gmail  # Can combine with other flags

# Docker
docker build -t workspace-mcp .
docker run -p 8000:8000 -v $(pwd):/app workspace-mcp --transport streamable-http
```

**Available Tools for `--tools` flag**: `gmail`, `drive`, `calendar`, `docs`, `sheets`, `forms`, `chat`

### Connect to Claude Desktop

The server supports two transport modes:

#### Stdio Mode (Default - Recommended for Claude Desktop)

**Easiest Setup (Recommended)**
```bash
python install_claude.py
```

This script automatically:
- Prompts you for your Google OAuth credentials (Client ID and Secret)
- Creates the Claude Desktop config file in the correct location
- Sets up all necessary environment variables
- No manual file editing required!

After running the script, just restart Claude Desktop and you're ready to go.

**Manual Claude Configuration (Alternative)**
1. Open Claude Desktop Settings → Developer → Edit Config
   1. **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   2. **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
2. Add the server configuration:
   ```json
   {
     "mcpServers": {
       "google_workspace": {
         "command": "uvx",
         "args": ["workspace-mcp"],
         "env": {
           "GOOGLE_OAUTH_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
           "GOOGLE_OAUTH_CLIENT_SECRET": "your-client-secret",
           "OAUTHLIB_INSECURE_TRANSPORT": "1"
         }
       }
     }
   }
   ```

**Get Google OAuth Credentials** (if you don't have them):
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project and enable APIs: Calendar, Drive, Gmail, Docs, Sheets, Slides, Forms, Chat
- Create OAuth 2.0 Client ID (Web application) with redirect URI: `http://localhost:8000/oauth2callback`

**Development Installation (For Contributors)**:
```json
{
  "mcpServers": {
    "google_workspace": {
      "command": "uv",
      "args": ["run", "main.py"],
      "cwd": "/path/to/google_workspace_mcp",
      "env": {
        "GOOGLE_OAUTH_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_OAUTH_CLIENT_SECRET": "your-client-secret",
        "OAUTHLIB_INSECURE_TRANSPORT": "1"
      }
    }
  }
}
```

#### HTTP Mode (For debugging or web interfaces)
If you need to use HTTP mode with Claude Desktop:

```json
{
  "mcpServers": {
    "google_workspace": {
      "command": "npx",
      "args": ["mcp-remote", "http://localhost:8000/mcp"]
    }
  }
}
```

*Note: Make sure to start the server with `--transport streamable-http` when using HTTP mode.*

### First-Time Authentication

The server features **transport-aware OAuth callback handling**:

- **Stdio Mode**: Automatically starts a minimal HTTP server on port 8000 for OAuth callbacks
- **HTTP Mode**: Uses the existing FastAPI server for OAuth callbacks
- **Same OAuth Flow**: Both modes use `http://localhost:8000/oauth2callback` for consistency

When calling a tool:
1. Server returns authorization URL
2. Open URL in browser and authorize
3. Server handles OAuth callback automatically (on port 8000 in both modes)
4. Retry the original request

---

## 🧰 Available Tools

> **Note**: All tools support automatic authentication via `@require_google_service()` decorators with 30-minute service caching.

### 📅 Google Calendar ([`calendar_tools.py`](gcalendar/calendar_tools.py))

| Tool | Description |
|------|-------------|
| `list_calendars` | List accessible calendars |
| `get_events` | Retrieve events with time range filtering |
| `get_event` | Fetch detailed information of a single event by ID |
| `create_event` | Create events (all-day or timed) with optional Drive file attachments |
| `modify_event` | Update existing events |
| `delete_event` | Remove events |

### 📁 Google Drive ([`drive_tools.py`](gdrive/drive_tools.py))

| Tool | Description |
|------|-------------|
| `search_drive_files` | Search files with query syntax |
| `get_drive_file_content` | Read file content (supports Office formats) |
| `list_drive_items` | List folder contents |
| `create_drive_file` | Create new files or fetch content from public URLs |

### 📧 Gmail ([`gmail_tools.py`](gmail/gmail_tools.py))

| Tool | Description |
|------|-------------|
| `search_gmail_messages` | Search with Gmail operators |
| `get_gmail_message_content` | Retrieve message content |
| `send_gmail_message` | Send emails |
| `draft_gmail_message` | Create drafts |

### 📝 Google Docs ([`docs_tools.py`](gdocs/docs_tools.py))

| Tool | Description |
|------|-------------|
| `search_docs` | Find documents by name |
| `get_doc_content` | Extract document text |
| `list_docs_in_folder` | List docs in folder |
| `create_doc` | Create new documents |
| `read_doc_comments` | Read all comments and replies |
| `create_doc_comment` | Create new comments |
| `reply_to_comment` | Reply to existing comments |
| `resolve_comment` | Resolve comments |

### 📊 Google Sheets ([`sheets_tools.py`](gsheets/sheets_tools.py))

| Tool | Description |
|------|-------------|
| `list_spreadsheets` | List accessible spreadsheets |
| `get_spreadsheet_info` | Get spreadsheet metadata |
| `read_sheet_values` | Read cell ranges |
| `modify_sheet_values` | Write/update/clear cells |
| `create_spreadsheet` | Create new spreadsheets |
| `create_sheet` | Add sheets to existing files |
| `read_sheet_comments` | Read all comments and replies |
| `create_sheet_comment` | Create new comments |
| `reply_to_sheet_comment` | Reply to existing comments |
| `resolve_sheet_comment` | Resolve comments |

### 🖼️ Google Slides ([`slides_tools.py`](gslides/slides_tools.py))

| Tool | Description |
|------|-------------|
| `create_presentation` | Create new presentations |
| `get_presentation` | Retrieve presentation details |
| `batch_update_presentation` | Apply multiple updates at once |
| `get_page` | Get specific slide information |
| `get_page_thumbnail` | Generate slide thumbnails |
| `read_presentation_comments` | Read all comments and replies |
| `create_presentation_comment` | Create new comments |
| `reply_to_presentation_comment` | Reply to existing comments |
| `resolve_presentation_comment` | Resolve comments |

### 📝 Google Forms ([`forms_tools.py`](gforms/forms_tools.py))

| Tool | Description |
|------|-------------|
| `create_form` | Create new forms with title and description |
| `get_form` | Retrieve form details, questions, and URLs |
| `set_publish_settings` | Configure form template and authentication settings |
| `get_form_response` | Get individual form response details |
| `list_form_responses` | List all responses to a form with pagination |

### 💬 Google Chat ([`chat_tools.py`](gchat/chat_tools.py))

| Tool | Description |
|------|-------------|
| `list_spaces` | List chat spaces/rooms |
| `get_messages` | Retrieve space messages |
| `send_message` | Send messages to spaces |
| `search_messages` | Search across chat history |

---

## 🛠️ Development

### Project Structure

```
google_workspace_mcp/
├── auth/              # Authentication system with decorators
├── core/              # MCP server and utilities
├── g{service}/        # Service-specific tools
├── main.py            # Server entry point
├── client_secret.json # OAuth credentials (not committed)
└── pyproject.toml     # Dependencies
```

### Adding New Tools

```python
from auth.service_decorator import require_google_service

@require_google_service("drive", "drive_read")  # Service + scope group
async def your_new_tool(service, param1: str, param2: int = 10):
    """Tool description"""
    # service is automatically injected and cached
    result = service.files().list().execute()
    return result  # Return native Python objects
```

### Architecture Highlights

- **Service Caching**: 30-minute TTL reduces authentication overhead
- **Scope Management**: Centralized in `SCOPE_GROUPS` for easy maintenance
- **Error Handling**: Native exceptions instead of manual error construction
- **Multi-Service Support**: `@require_multiple_services()` for complex tools

---

## 🔒 Security

- **Credentials**: Never commit `client_secret.json` or `.credentials/` directory
- **OAuth Callback**: Uses `http://localhost:8000/oauth2callback` for development (requires `OAUTHLIB_INSECURE_TRANSPORT=1`)
- **Transport-Aware Callbacks**: Stdio mode starts a minimal HTTP server only for OAuth, ensuring callbacks work in all modes
- **Production**: Use HTTPS for callback URIs and configure accordingly
- **Network Exposure**: Consider authentication when using `mcpo` over networks
- **Scope Minimization**: Tools request only necessary permissions

---

## 🌐 Integration with Open WebUI

To use this server as a tool provider within Open WebUI:

### 1. Create MCPO Configuration

Create a file named `config.json` with the following structure to have `mcpo` make the streamable HTTP endpoint available as an OpenAPI spec tool:

```json
{
  "mcpServers": {
    "google_workspace": {
      "type": "streamablehttp",
      "url": "http://localhost:8000/mcp"
    }
  }
}
```

### 2. Start the MCPO Server

```bash
mcpo --port 8001 --config config.json --api-key "your-optional-secret-key"
```

This command starts the `mcpo` proxy, serving your active (assuming port 8000) Google Workspace MCP on port 8001.

### 3. Configure Open WebUI

1. Navigate to your Open WebUI settings
2. Go to **"Connections"** → **"Tools"**
3. Click **"Add Tool"**
4. Enter the **Server URL**: `http://localhost:8001/google_workspace` (matching the mcpo base URL and server name from config.json)
5. If you used an `--api-key` with mcpo, enter it as the **API Key**
6. Save the configuration

The Google Workspace tools should now be available when interacting with models in Open WebUI.

---

## 📄 License

MIT License - see `LICENSE` file for details.

---

<div align="center">
<img width="810" alt="Gmail Integration" src="https://github.com/user-attachments/assets/656cea40-1f66-40c1-b94c-5a2c900c969d" />
<img width="810" alt="Calendar Management" src="https://github.com/user-attachments/assets/d3c2a834-fcca-4dc5-8990-6d6dc1d96048" />
<img width="842" alt="Batch Emails" src="https://github.com/user-attachments/assets/0876c789-7bcc-4414-a144-6c3f0aaffc06" />
</div>
