# Project Memory MCP

An MCP Server to store and retrieve project information from memory file. This allows AI agents (like Claude) to maintain persistent memory about projects between conversations.

## Overview

Project Memory MCP provides a simple way to:
- Store project information in Markdown format
- Retrieve project information at the beginning of conversations
- Update project information using patches

The memory is stored in a `MEMORY.md` file in each project directory.

## Installation

### Using uvx

This method uses `uvx` (from the `uv` Python package manager) to run the server without permanent installation:

#### Prerequisites

Install `uvx` from [uv](https://docs.astral.sh/uv/installation/) if you don't have it already.

#### Set up MCP Client (Claude Desktop, Cursor, etc.)

Merge the following config with your existing config file (e.g. `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "project-memory": {
      "command": "uvx",
      "args": [
        "project-mem-mcp",
        "--allowed-dir", "/Users/your-username/projects",
        "--allowed-dir", "/Users/your-username/Documents/code"
      ]
    }
  }
}
```

> **Note:** Replace `/Users/your-username` with the actual path to your own projects and code directories.

### Install from Source

#### Prerequisites

- Python 3.11 or higher
- Pip package manager

#### Clone the repository

```bash
git clone https://github.com/your-username/project-mem-mcp.git
python -m venv venv
source venv/bin/activate
pip install -e .
```

#### Set up MCP Client (Claude Desktop, Cursor, etc.)

Merge the following config with your existing config file (e.g. `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "project-memory": {
      "command": "path/to/your/venv/bin/project-mem-mcp",
      "args": [
        "--allowed-dir", "/Users/your-username/projects",
        "--allowed-dir", "/Users/your-username/Documents/code"
      ]
    }
  }
}
```

> **Note:** Replace `/Users/your-username` with the actual path to your own projects and code directories.

## Arguments

The `--allowed-dir` argument is used to specify the directories that the server has access to. You can use it multiple times to allow access to multiple directories. All directories inside the allowed directories are also allowed.
It is optional. If not provided, the server will only have access to the home directory of the user running the server.


## Usage

The MCP server is started by the client (e.g., Claude Desktop) based on the configuration you provide. You don't need to start the server manually.

### Tools

Project Memory MCP provides three tools:

#### get_project_memory

Retrieves the entire project memory in Markdown format. Should be used at the beginning of every conversation about a project.

```python
get_project_memory(project_path: str) -> str
```
- **project_path**: Full path to the project directory.
- Returns the content of the MEMORY.md file as a string.
- Raises `FileNotFoundError` if the project or memory file does not exist.
- Raises `PermissionError` if the project path is not in allowed directories.

#### set_project_memory

Sets (overwrites) the entire project memory. Use this when creating a new memory file, replacing the whole memory, or if `update_project_memory` fails.

```python
set_project_memory(project_path: str, project_info: str)
```
- **project_path**: Full path to the project directory.
- **project_info**: Complete project information in Markdown format.
- Overwrites the MEMORY.md file with the provided content.
- Raises `FileNotFoundError` if the project path does not exist.
- Raises `PermissionError` if the project path is not in allowed directories.

#### update_project_memory

Updates the project memory by applying one or more block-based patches to the memory file. This is more efficient for small changes.

```python
update_project_memory(project_path: str, patch_content: str)
```
- **project_path**: Full path to the project directory.
- **patch_content**: Block-based patch content using SEARCH/REPLACE markers (see below).
- Each patch block must have the following format:

  ```
  <<<<<<< SEARCH
  Text to find in the memory file
  =======
  Text to replace it with
  >>>>>>> REPLACE
  ```
  Multiple blocks can be included in a single request.
- Each search text must appear **exactly once** in the file, otherwise an error is raised.
- Raises `FileNotFoundError` if the project or memory file does not exist.
- Raises `ValueError` if the patch format is invalid or the search text is not unique.
- Raises `RuntimeError` if patch application fails for any reason.

### Example Workflow

1. Begin a conversation with LLM about a project
2. LLM uses `get_project_memory` to retrieve project information
3. Throughout the conversation, LLM uses `update_project_memory` to persist new information
4. If the update fails, LLM can use `set_project_memory` instead

####  Claude Desktop

if you use Claude Desktop, it is best to use the project feature.

Edit the project instructions:
- Add a line like this: "The path of the project is <project_path>"
- If it does not always use the memory, you can add a line like this: "Always use the project memory, it is not optional"

## Security Considerations

- Memory files should never contain sensitive information
- Project paths are validated against allowed directories
- All file operations are restricted to allowed directories

## Dependencies

- fastmcp (>=2.2.0, <3.0.0)

## License

MIT