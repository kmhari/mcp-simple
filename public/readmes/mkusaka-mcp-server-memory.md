# Category-based Memory Server

A basic implementation of persistent memory using a category-based memory system. This lets Claude remember information across chats by storing it in categorized memory entries.

## Core Concepts

### Categories
Categories are the primary organizational units in the memory system. Each category contains a collection of memories (pieces of information).

Example:
```json
"development": [
  "Uses pnpm for package management",
  "Prefers 2-space indentation"
]
```

### Tags
Tags provide additional context and grouping for memories within a category. They can be used to filter and find related memories.

Example:
```
# formatting style
Uses 2-space indentation
Prefers camelCase for variables
```

### Global vs Local Memories
The memory system supports two storage locations:

- **Global Memories**: Stored in the user's home directory (`~/.config/mcp-memory`) and persist across all projects.
- **Local Memories**: Stored in the current project directory (`.mcp-memory`) and are specific to the current project.

### Memory Storage
Memories are stored as text entries, with the following characteristics:

- Organized by categories (stored in separate files)
- Can be tagged for easier retrieval
- Stored in plain text files
- Can be added or removed independently
- Should be atomic (one piece of information per memory)

Example Memory File (`development.txt`):
```
# formatting style
Uses 2-space indentation
Prefers camelCase for variables

# tools
Uses eslint for linting
Uses prettier for formatting
```

## API

### Tools
- **remember_memory**
  - Stores a memory with optional tags in a specified category
  - Input:
    - `category` (string): The category to store the memory in
    - `data` (string): The data to store in memory
    - `tags` (string[], optional): Optional tags for categorizing the memory
    - `is_global` (boolean): Whether to store in global or local memory
  - Stores the memory entry in the specified category with optional tags

- **retrieve_memories**
  - Retrieves all memories from a specified category
  - Input:
    - `category` (string): The category to retrieve memories from, use '*' for all categories
    - `is_global` (boolean): Whether to retrieve from global or local memory
  - Returns memories from the specified category, grouped by tags
  - Returns empty object if category doesn't exist

- **remove_memory_category**
  - Removes all memories within a specified category
  - Input:
    - `category` (string): The category to remove, use '*' for all categories
    - `is_global` (boolean): Whether to remove from global or local memory
  - Removes the entire category file
  - Silent operation if category doesn't exist

- **remove_specific_memory**
  - Removes a specific memory within a specified category
  - Input:
    - `category` (string): The category containing the memory to remove
    - `memory_content` (string): Content of the memory to remove (partial match)
    - `is_global` (boolean): Whether to remove from global or local memory
  - Removes memories containing the specified content
  - Silent operation if memory doesn't exist

# Usage with Claude Desktop

### Setup

Add this to your claude_desktop_config.json:

#### npx
```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": [
        "-y",
        "@mkusaka/mcp-server-memory"
      ]
    }
  }
}
```

#### npx with custom setting

The server can be configured using the following environment variables:

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": [
        "-y",
        "@mkusaka/mcp-server-memory"
      ],
      "env": {
        "MEMORY_FILE_PATH": "/path/to/custom/memory.json"
      }
    }
  }
}
```

- `MEMORY_FILE_PATH`: Path to the memory storage JSON file (default: `memory.json` in the server directory)

# VS Code Installation Instructions

For quick installation, use one of the one-click installation buttons below:

For manual installation, add the following JSON block to your User Settings (JSON) file in VS Code. You can do this by pressing `Ctrl + Shift + P` and typing `Preferences: Open Settings (JSON)`.

Optionally, you can add it to a file called `.vscode/mcp.json` in your workspace. This will allow you to share the configuration with others. 

> Note that the `mcp` key is not needed in the `.vscode/mcp.json` file.

#### npx

```json
{
  "mcp": {
    "servers": {
      "memory": {
        "command": "npx",
        "args": [
          "-y",
          "@mkusaka/mcp-server-memory"
        ]
      }
    }
  }
}
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
