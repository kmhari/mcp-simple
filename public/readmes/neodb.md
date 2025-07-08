# NeoDB MCP Server

A Message Control Protocol (MCP) server implementation for interacting with [NeoDB](https://neodb.social/), a social book cataloging service. This server provides tools to fetch user information, search books, and retrieve detailed book information through NeoDB's API.

<a href="https://glama.ai/mcp/servers/1any3eeaza"><img width="380" height="200" src="https://glama.ai/mcp/servers/1any3eeaza/badge" alt="NeoDB Server MCP server" /></a>

## Setup

### Install UV
First, install UV package installer:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Create Virtual Environment
Create and activate a Python virtual environment using UV:

```bash
uv venv
source .venv/bin/activate  # On Unix/macOS
# or
.venv\Scripts\activate     # On Windows
```

### Install Dependencies
Install project dependencies using UV:

```bash
uv pip install .
```

## Available Tools

The server provides the following tools:

1. **get-user-info**
   - Gets current user's basic information
   - No parameters required

2. **search-books**
   - Searches items in the catalog
   - Parameters:
     - `query` (string): Search query for books

3. **get-book**
   - Gets detailed information about a specific book
   - Parameters:
     - `book_id` (string): The ID of the book to retrieve

## Usage with Claude Desktop

### Get Access Token

There are two ways to get your access token:

1. Using the official guide: Follow the [official documentation](https://neodb.net/api/) to obtain your access token.

2. Using automated script: You can use the [neodb-get-access-token](https://github.com/xytangme/neodb-get-access-token) script which provides a simplified way to get your access token.

### Update Config `claude_desktop_config.json`

```json
{
  "mcpServers": {
    "neodb": {
      "command": "uv",
      "args": [
        "--directory",
        "<PATH_TO_PROJECT_DIR>",
        "run",
        "<PATH_TO_SCRIPT>",
        "<API_BASE> e.g. https://neodb.social",
        "<ACCESS_TOKEN>"
      ]
    }
  }
}
```

Where:
- `<API_BASE>`: The base URL for the NeoDB API
- `<ACCESS_TOKEN>`: Your NeoDB API access token

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
