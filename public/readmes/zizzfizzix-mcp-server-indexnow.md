# mcp-server-indexnow

> A Model Context Protocol (MCP) server allowing URL indexing requests via the IndexNow protocol.

This server acts as a bridge, enabling MCP-compatible clients (like IDEs or AI assistants) to submit URLs to search engines using the IndexNow protocol for potentially faster content discovery and indexing.

## What is IndexNow?

[IndexNow](https://www.indexnow.org/) is a simple protocol that allows websites to easily notify search engines whenever their website content is created, updated, or deleted. Submitting URLs via IndexNow informs participating search engines (like Bing, Yandex, Seznam.cz, Naver, Yep) to prioritize crawling these URLs, potentially speeding up the reflection of changes in search results.

## What is MCP?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is a standard for connecting language models (LLMs) and AI assistants to various tools, data sources, and capabilities through dedicated servers. This server implements MCP to expose IndexNow functionality as a tool.

## Features

* Provides an MCP tool to submit single or multiple URLs to the IndexNow API.
* Facilitates interaction with the IndexNow protocol through MCP clients.
* Requires minimal configuration once the IndexNow key is set up on your host.

## Installation

### Using uvx (recommended)

When using [`uvx`](https://docs.astral.sh/uv/guides/tools/) no specific installation is needed. We will use it to directly run *mcp_server_indexnow* from the client app.

#### Add to Claude desktop with uvx

[In your Claude config](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server) specify:

```json
"mcpServers": {
  "mcp_server_indexnow": {
    "command": "uvx",
    "args": [
      "--from",
      "git+https://github.com/zizzfizzix/mcp-server-indexnow",
      "mcp_server_indexnow"
    ]
  }
}
```

#### Add to Zed with uvx

In your Zed settings.json add:

```json
"context_servers": [
  "mcp_server_indexnow": {
    "command": "uvx",
    "args": [
      "--from",
      "git+https://github.com/zizzfizzix/mcp-server-indexnow",
      "mcp_server_indexnow"
    ]
  }
],
```

### Using make

Alternatively you can install `mcp_server_indexnow` using make:

```bash
make install
```

#### Add to Claude desktop with make

[In your Claude config](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server) specify:

```json
"mcpServers": {
  "mcp_server_indexnow": {
    "command": "/path/to/mcp-server-indexnow/.venv/bin/python",
    "args": ["/path/to/mcp-server-indexnow/mcp_server_indexnow/main.py"]
  }
}
```

#### Add to Zed with make

In your Zed settings.json add:

```json
"context_servers": {
  "mcp_server_indexnow": {
    "command": "/path/to/mcp-server-indexnow/.venv/bin/python",
    "args": ["/path/to/mcp-server-indexnow/mcp_server_indexnow/main.py"]
  }
}
```

## Usage

After you've successfully added this MCP server to your assistant app follow the next steps below.

### 1. IndexNow Key Setup (Required)

Before using this server, you **must** set up an IndexNow key for your website host. This involves generating a key and placing a specific text file (`{your-key}.txt`) on your web server. This process verifies your ownership of the host to IndexNow.

* **Follow the official IndexNow instructions:** [Verifying ownership via the key](https://www.indexnow.org/documentation#Verifying-ownership-via-the-key)
* The key itself will be needed when you invoke the URL submission tool provided by this server. Keep it secure.

### 2. Environment Variables (Optional)

This server supports the following environment variables for configuration:

* **`INDEXNOW_SECRET_KEY`**: If you set this environment variable to your IndexNow key, the server will use it by default when submitting URLs. This way your AI assistant won't know it. You can still override it by providing the `key` argument when invoking the tool e.g.:

```json
"mcpServers": {
  "mcp_server_indexnow": {
    "command": "uvx",
    "args": [
      "--from",
      "git+https://github.com/zizzfizzix/mcp-server-indexnow",
      "mcp_server_indexnow"
    ],
    "env": {
      "INDEXNOW_SECRET_KEY": "https://example.com/2134131231.txt"
    }
  }
}
```

* **`INDEXNOW_API_BASE`**: Allows you to specify a different IndexNow API endpoint. Defaults to `https://api.indexnow.org/indexnow`, full list at [indexnow.com](https://www.indexnow.org/faq). You typically only need this if you care about network latency or a specific participating search engine - they share submitted events with each other in the background but there reasonably might be a delay.

```json
"mcpServers": {
  "mcp_server_indexnow": {
    "command": "uvx",
    "args": [
      "--from",
      "git+https://github.com/zizzfizzix/mcp-server-indexnow",
      "mcp_server_indexnow"
    ],
    "env": {
      "INDEXNOW_API_BASE": "https://www.bing.com/indexnow"
    }
  }
}
```

* **`INDEXNOW_KEY_LOCATION`**: Optional. Full URL to your key file if not hosted at the root (`/keyfilename.txt`). Use this if you followed Option 2 from the IndexNow documentation.

```json
"mcpServers": {
  "mcp_server_indexnow": {
    "command": "uvx",
    "args": [
      "--from",
      "git+https://github.com/zizzfizzix/mcp-server-indexnow",
      "mcp_server_indexnow"
    ],
    "env": {
      "INDEXNOW_KEY_LOCATION": "https://example.com/some/path/myIndexNowKey63638.txt"
    }
  }
}
```

## Examples

Interact with your MCP client (e.g., AI Assistant) to invoke the tool. The exact command might depend on the client, but conceptually:

> Assistant, please use the IndexNow server to submit the URL `https://your-website.com/updated-page` with the key *'your-indexnow-key'*.

Or for multiple URLs:

> Assistant, please use the IndexNow server to submit the following URLs with the key *'your-indexnow-key'*:
>
> * `https://your-website.com/new-article-1`
> * `https://your-website.com/new-article-2`
> * `https://your-website.com/deleted-page`

Refer to your specific MCP client's documentation on how to invoke server tools. This server will then make the appropriate request to the IndexNow API endpoint, by default `https://api.indexnow.org/indexnow`.

## Development

For development, you can use the following commands:

```bash
# Install dependencies
make install

# Start the server
make start

# Run tests
make test

# Run linting
make lint

# Format code
make format
```

### Debugging

You can use the MCP inspector to debug the server.

```bash
make mcp_inspector
```

### Creating from Template

This MCP server was created from a cookiecutter template. To create a similar one, run:

```bash
uvx cookiecutter gh:zizzfizzix/python-base-mcp-server
```

## License

mcp-server-indexnow is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
