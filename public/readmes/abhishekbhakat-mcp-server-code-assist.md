# mcp-server-code-assist: A Code Assistant MCP Server

## Overview

A Model Context Protocol server for code modification and generation. This server provides tools to create, modify, and delete code via Large Language Models.

<a href="https://glama.ai/mcp/servers/pk7xbajohp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/pk7xbajohp/badge" alt="mcp-server-code-assist MCP server" />
</a>

### Tools

1. `create`
   - Creates new files
   - Input: XML instruction with path and content
   - Returns: Confirmation of file creation

2. `modify`
   - Modifies existing files with search/replace
   - Input: XML instruction with path, search pattern, and new content
   - Returns: Diff of changes

3. `rewrite`
   - Completely rewrites a file
   - Input: XML instruction with path and new content
   - Returns: Confirmation of rewrite

4. `delete`
   - Removes files
   - Input: XML instruction with path
   - Returns: Confirmation of deletion

### XML Format

```xml
<Plan>
Describe approach and reasoning
</Plan>

<file path="/path/to/file" action="create|modify|rewrite|delete">
  <change>
    <description>What this change does</description>
    <search>
===
Original code for modification
===
    </search>
    <content>
===
New or modified code
===
    </content>
  </change>
</file>
```

## Installation

### Using uv (recommended)

```bash
uvx mcp-server-code-assist
```

### Using pip

```bash
pip install mcp-server-code-assist
python -m mcp_server_code_assist
```

## Configuration

### Usage with Claude Desktop

<details>
<summary>Using uvx</summary>

```json
"mcpServers": {
  "code-assist": {
    "command": "uvx",
    "args": ["mcp-server-code-assist"]
  }
}
```
</details>

<details>
<summary>Using docker</summary>

```json
"mcpServers": {
  "code-assist": {
    "command": "docker",
    "args": ["run", "--rm", "-i", "--mount", "type=bind,src=/Users/username,dst=/Users/username", "mcp/code-assist"]
  }
}
```
</details>

### Usage with Zed

Add to settings.json:

```json
"context_servers": {
  "mcp-server-code-assist": {
    "command": {
      "path": "uvx",
      "args": ["mcp-server-code-assist"]
    }
  }
},
```

## Development

```bash
cd src/code-assist
uvx mcp-server-code-assist

# For docker:
docker build -t mcp/code-assist .
```

## License

MIT License. See LICENSE file for details.