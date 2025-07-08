# Perplexity Chat MCP Server

The Perplexity MCP Server provides a Python-based interface to the Perplexity API, offering tools for querying responses, maintaining chat history, and managing conversations. It supports model configuration via environment variables and stores chat data locally. Built with Python and setuptools, it's designed for integration with development environments.

The MCP Server is desined to mimick how users interact with the Perplexity Chat on their browser by allowing your models to ask questions, continue conversations, and list all your chats.

[![smithery badge](https://smithery.ai/badge/@daniel-lxs/mcp-perplexity)](https://smithery.ai/server/@daniel-lxs/mcp-perplexity) [![Release and Publish](https://github.com/daniel-lxs/mcp-perplexity/actions/workflows/release.yml/badge.svg)](https://github.com/daniel-lxs/mcp-perplexity/actions/workflows/release.yml)



<a href="https://glama.ai/mcp/servers/0nggjl0ohi">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/0nggjl0ohi/badge" />
</a>

## Components

### Tools

- **ask_perplexity**: Request expert programming assistance through Perplexity. Focuses on coding solutions, error debugging, and technical explanations. Returns responses with source citations and alternative suggestions.
- **chat_perplexity**: Maintains ongoing conversations with Perplexity AI. Creates new chats or continues existing ones with full history context. Returns chat ID for future continuation.
- **list_chats_perplexity**: Lists all available chat conversations with Perplexity AI. Returns chat IDs, titles, and creation dates (displayed in relative time format, e.g., "5 minutes ago", "2 days ago"). Results are paginated with 50 chats per page.
- **read_chat_perplexity**: Retrieves the complete conversation history for a specific chat. Returns the full chat history with all messages and their timestamps. No API calls are made to Perplexity - this only reads from local storage.

## Key Features

- **Model Configuration via Environment Variable:**  Allows you to specify the Perplexity model using the `PERPLEXITY_MODEL` environment variable for flexible model selection.

  You can also specify `PERPLEXITY_MODEL_ASK` and `PERPLEXITY_MODEL_CHAT` to use different models for the `ask_perplexity` and `chat_perplexity` tools, respectively.

  These will override `PERPLEXITY_MODEL`. You can check which models are available on the [Perplexity](https://docs.perplexity.ai/guides/model-cards) documentation.
- **Persistent Chat History:** The `chat_perplexity` tool maintains ongoing conversations with Perplexity AI. Creates new chats or continues existing ones with full history context. Returns chat ID for future continuation.
- **Streaming Responses with Progress Reporting:** Uses progress reporting to prevent timeouts on slow responses.

## Quickstart

### Prerequisites

Before using this MCP server, ensure you have:

- Python 3.10 or higher
- [uvx](https://docs.astral.sh/uv/#installation) package manager installed

Note: Installation instructions for uvx are available [here](https://docs.astral.sh/uv/#installation).

### Configuration for All Clients

To use this MCP server, configure your client with these settings (configuration method varies by client):

```json
"mcpServers": {
  "mcp-perplexity": {
    "command": "uvx",
    "args": ["mcp-perplexity"],
    "env": {
      "PERPLEXITY_API_KEY": "your-api-key",
      "PERPLEXITY_MODEL": "sonar-pro",
      "DB_PATH": "chats.db"
    }
  }
}
```

## Environment Variables

Configure the MCP Perplexity server using the following environment variables:

| Variable | Description | Default Value | Required |
|----------|-------------|---------------|----------|
| `PERPLEXITY_API_KEY` | Your Perplexity API key | None | Yes |
| `PERPLEXITY_MODEL` | Default model for interactions | `sonar-pro` | No |
| `PERPLEXITY_MODEL_ASK` | Specific model for `ask_perplexity` tool | Uses `PERPLEXITY_MODEL` | No |
| `PERPLEXITY_MODEL_CHAT` | Specific model for `chat_perplexity` tool | Uses `PERPLEXITY_MODEL` | No |
| `DB_PATH` | Path to store chat history database | `chats.db` | No |
| `WEB_UI_ENABLED` | Enable or disable web UI | `false` | No |
| `WEB_UI_PORT` | Port for web UI | `8050` | No |
| `WEB_UI_HOST` | Host for web UI | `127.0.0.1` | No |
| `DEBUG_LOGS` | Enable detailed logging | `false` | No |

#### Using Smithery CLI
```bash
npx -y @smithery/cli@latest run @daniel-lxs/mcp-perplexity --config "{\"perplexityApiKey\":\"pplx-abc\",\"perplexityModel\":\"sonar-pro\"}"
```

## Usage

### ask_perplexity

The `ask_perplexity` tool is used for specific questions, this tool doesn't maintain a chat history, every request is a new chat.

The tool will return a response from Perplexity AI using the `PERPLEXITY_MODEL_ASK` model if specified, otherwise it will use the `PERPLEXITY_MODEL` model.

### chat_perplexity

The `chat_perplexity` tool is used for ongoing conversations, this tool maintains a chat history.
A chat is identified by a chat ID, this ID is returned by the tool when a new chat is created. Chat IDs look like this: `wild-horse-12`.

This tool is useful for debugging, research, and any other task that requires a chat history.

The tool will return a response from Perplexity AI using the `PERPLEXITY_MODEL_CHAT` model if specified, otherwise it will use the `PERPLEXITY_MODEL` model.

### list_chats_perplexity
Lists all available chat conversations.  It returns a paginated list of chats, showing the chat ID, title, and creation time (in relative format).  You can specify the page number using the `page` argument (defaults to 1, with 50 chats per page).

### read_chat_perplexity
Retrieves the complete conversation history for a given `chat_id`.  This tool returns all messages in the chat, including timestamps and roles (user or assistant). This tool does *not* make any API calls to Perplexity; it only reads from the local database.

## Web UI

The MCP Perplexity server now includes a web interface for easier interaction and management of chats.

### Features
- Interactive chat interface
- Chat history management
- Real-time message display

### Screenshots

#### Chat List View
![image](https://github.com/user-attachments/assets/a8aebd19-f58a-4d6c-988e-ea1c1ca7f174)

#### Chat Interface
![image](https://github.com/user-attachments/assets/627bfcdb-2214-47e6-a55e-3987737ad00f)

### Accessing the Web UI

When `WEB_UI_ENABLED` is set to `true`, the web UI will be available at `http://WEB_UI_HOST:WEB_UI_PORT`. 

By default, this is `http://127.0.0.1:8050`.

## Development

This project uses setuptools for development and builds. To get started:

1. Create a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Linux/macOS
   # or
   .venv\Scripts\activate  # On Windows
   ```

2. Install the project in editable mode with all dependencies:
   ```bash
   pip install -e .
   ```

3. Build the project:
   ```bash
   python -m build
   ```

The virtual environment will contain all required dependencies for development.

## Contributing

This project is open to contributions. Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.




