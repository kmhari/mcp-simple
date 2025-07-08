# Python Jira MCP Server

A Model Context Protocol (MCP) server implementation in Python that integrates with Jira API. This allows AI models to interact with Jira through a standardized protocol.

## Overview

This MCP server exposes Jira API operations as tools that can be used by AI models supporting the Model Context Protocol. The server implements the stdio transport mechanism to communicate with clients like Cursor.

## Features

- **JQL Search Tool**: Search for Jira issues using JQL queries
- **Get Issue Tool**: Retrieve detailed information about a specific Jira issue
- **MCP SDK Integration**: Compatible with the official MCP Python SDK
- **Fallback Mode**: Minimal implementation when the SDK is not available
- **Environment Configuration**: Load Jira credentials from environment variables

## Requirements

- Python 3.8+
- Jira API access (API token, email, and domain)
- Required Python packages:
  - `mcp` (Model Context Protocol Python SDK)
  - `aiohttp` (for HTTP requests)
  - `pydantic` (for validation)
  - `python-dotenv` (for environment variables)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/python-jira-mcp.git
   cd python-jira-mcp
   ```

2. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Set up your Jira credentials:
   ```bash
   cp .env.example .env
   # Edit .env with your Jira credentials
   ```

## Usage

### Running the Server

To start the MCP server, run:

```bash
python main.py
```

Or use the executable directly:

```bash
./main.py
```

The server will start and listen for MCP messages on standard input (stdin) and respond on standard output (stdout).

### Integrating with Cursor

To use this MCP server with Cursor:

1. Start the server (as above)
2. In Cursor, configure the MCP server path to point to `main.py`
3. Use Jira tools directly within Cursor

### Available Tools

#### JQL Search

Search for Jira issues using JQL (Jira Query Language).

Example:

```json
{
  "type": "tool_call",
  "id": "123",
  "name": "jql_search",
  "parameters": {
    "jql": "project = XYZ AND status = 'In Progress'",
    "max_results": 10,
    "fields": ["summary", "description", "status"]
  }
}
```

#### Get Issue

Retrieve details about a specific Jira issue by its ID or key.

Example:

```json
{
  "type": "tool_call",
  "id": "456",
  "name": "get_issue",
  "parameters": {
    "issue_id_or_key": "XYZ-123",
    "fields": ["summary", "description", "status", "assignee"],
    "expand": "changelog"
  }
}
```

## Development

### Project Structure

- `main.py`: Entry point for the MCP server
- `src/server.py`: Main MCP server implementation
- `src/tools/jira_tools.py`: Jira API tool implementations
- `src/tool_schemas.py`: Tool schemas definition

### Adding New Tools

To add a new Jira-related tool:

1. Implement the tool function in `src/tools/jira_tools.py`
2. Add the tool schema in `src/tool_schemas.py`
3. Register the tool in `src/server.py`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Model Context Protocol](https://github.com/modelcontextprotocol)
- [Python MCP SDK](https://github.com/modelcontextprotocol/python-sdk)
- [Atlassian Jira API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/)
