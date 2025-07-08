# Bloomy MCP

A Model Context Protocol (MCP) server for interacting with Bloom Growth's GraphQL API.

## Overview

Bloomy MCP is a server that connects to Bloom Growth's GraphQL API and exposes it through the Model Context Protocol, enabling AI assistants to perform operations against the Bloom Growth platform.

## Features

- Query Bloom Growth GraphQL API through MCP
- Retrieve query and mutation details
- Execute GraphQL queries and mutations via MCP tools
- Get authenticated user information
- Automatic schema introspection

## Installation

### Prerequisites

- Python 3.12 or higher
- Access to Bloom Growth API
- [uv](https://github.com/astral-sh/uv) (recommended) or pip for package management

### Package Management

This project recommends using `uv`, a fast Python package installer and resolver that serves as a drop-in replacement for pip/pip-tools. It's significantly faster than traditional package managers.

#### Installing uv

```bash
curl -sSf https://astral.sh/uv/install.sh | sh
```

For other installation methods, see the [uv documentation](https://github.com/astral-sh/uv).

### Setup

1. Clone this repository
2. Set up a Python virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
3. Install the package in development mode:

   Using pip:

   ```bash
   pip install -e .
   ```

   Using uv (recommended):

   ```bash
   uv pip install -e .
   ```

   For development dependencies:

   ```bash
   uv pip install -e ".[dev]"
   ```

### Environment Variables

Create a `.env` file with the following variables:

```
BLOOM_API_URL=<Your Bloom API URL>
BLOOM_API_TOKEN=<Your Bloom API Token>
```

## Usage

### Cursor Integration

To use this MCP server with Cursor (AI-powered IDE):

1. Go to Cursor > Cursor Settings > MCP
2. Click on "Add new MCP server"
3. Configure the server with the following details:

   - Name: "Bloom Growth" (or "BG" or any name you prefer)
   - Type: Command
   - Command: `uv run --project /path/to/your/repo/ --env-file /path/to/your/repo/.env bloomy-server`

   **Important**: Replace `/path/to/your/repo/` with the actual path to your bloomy-mcp repository (e.g., `/Users/username/workspace/bloomy-mcp/`).

### Running the Server

Start the Bloomy MCP server:

```bash
bloomy-server
```

### Development Mode Inspection

For development and debugging purposes, you can use the MCP inspector tool:

```bash
npx @modelcontextprotocol/inspector bloomy-server
```

This allows you to inspect the MCP server's behavior and responses during development.

### Recommended Tools

For optimal development workflow:

- **direnv**: Use for managing environment variables and automatically loading them when entering the project directory
- **uv**: Use for fast and reliable package management

Setting up direnv:

1. Install direnv (e.g., `brew install direnv` on macOS)
2. Create a `.envrc` file in your project root:
   ```bash
   export BLOOM_API_URL=your_api_url
   export BLOOM_API_TOKEN=your_api_token
   ```
3. Run `direnv allow` to authorize the environment variables

This combination of tools (direnv + uv) provides an efficient environment for both secrets management and package management.

### Available MCP Tools

The following MCP tools are available for AI assistants:

- `get_query_details` - Get detailed information about specific GraphQL queries
- `get_mutation_details` - Get detailed information about specific GraphQL mutations
- `execute_query` - Execute a GraphQL query or mutation with variables
- `get_authenticated_user_id` - Get the ID of the currently authenticated user

### Available MCP Resources

- `bloom://queries` - Get a list of all available queries
- `bloom://mutations` - Get a list of all available mutations

## Development

### Project Structure

```
src/
  └── bloomy_mcp/
      ├── __init__.py        # Package initialization
      ├── client.py          # GraphQL client implementation
      ├── formatters.py      # Data formatting utilities
      ├── introspection.py   # GraphQL schema introspection
      ├── operations.py      # GraphQL operation utilities
      └── server.py          # MCP server implementation
```

### Dependencies

- `mcp[cli]` - Model Context Protocol server
- `gql` - GraphQL client library
- `httpx` - HTTP client
- `pyyaml` - YAML processing
