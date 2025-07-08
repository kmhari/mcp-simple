# Shell MCP Server

A Model Context Protocol server that provides shell command execution capabilities. This server enables LLMs to execute shell commands and receive their output in a controlled manner.

## Available Tools

- `execute_command` - Execute a shell command and return its output
  - Required arguments:
    - `command` (string): Shell command to execute
  - Returns:
    - Command result containing:
      - `command`: The executed command
      - `output`: Combined stdout and stderr output
      - `return_code`: Command execution return code

## Installation

### Using uv (recommended)

When using [`uv`](https://docs.astral.sh/uv/) no specific installation is needed. We will
use [`uvx`](https://docs.astral.sh/uv/guides/tools/) to directly run *mcp-server-shell*.

### Using PIP

Alternatively you can install `mcp-server-shell` via pip:

```bash
pip install mcp-server-shell
```

After installation, you can run it as a script using:

```bash
python -m mcp_server_shell
```

## Configuration

### Configure for Claude.app

Add to your Claude settings:

<details>
<summary>Using uvx</summary>

```json
"mcpServers": {
  "shell": {
    "command": "uvx",
    "args": ["mcp-server-shell"]
  }
}
```
</details>

<details>
<summary>Using pip installation</summary>

```json
"mcpServers": {
  "shell": {
    "command": "python",
    "args": ["-m", "mcp_server_shell"]
  }
}
```
</details>

### Configure for Zed

Add to your Zed settings.json:

<details>
<summary>Using uvx</summary>

```json
"context_servers": {
  "mcp-server-shell": {
    "command": "uvx",
    "args": ["mcp-server-shell"]
  }
},
```
</details>

<details>
<summary>Using pip installation</summary>

```json
"context_servers": {
  "mcp-server-shell": {
    "command": "python",
    "args": ["-m", "mcp_server_shell"]
  }
},
```
</details>

## Example Interactions

Execute a shell command:
```json
{
  "name": "execute_command",
  "arguments": {
    "command": "ls -la"
  }
}
```
Response:
```json
{
  "command": "ls -la",
  "output": "total 24\ndrwxr-xr-x  5 user  group   160 Jan  1 12:00 .\ndrwxr-xr-x  3 user  group    96 Jan  1 12:00 ..",
  "return_code": 0
}
```

## Debugging

You can use the MCP inspector to debug the server. For uvx installations:

```bash
npx @modelcontextprotocol/inspector uvx mcp-server-shell
```

Or if you've installed the package in a specific directory or are developing on it:

```bash
cd path/to/servers/src/shell
npx @modelcontextprotocol/inspector uv run mcp-server-shell
```

## Examples of Questions for Claude

1. "What files are in the current directory?"
2. "Show me the contents of the README.md file"
3. "What's the current system date?"
4. "Check if Python is installed and show its version"

## Security Considerations

⚠�� **Warning**: This server executes shell commands directly on your system. Use with caution and implement appropriate security measures to prevent unauthorized or dangerous command execution.

## Contributing

We encourage contributions to help expand and improve mcp-server-shell. Whether you want to add new features, enhance security, or improve documentation, your input is valuable.

For examples of other MCP servers and implementation patterns, see:
https://github.com/modelcontextprotocol/servers

Pull requests are welcome! Feel free to contribute new ideas, bug fixes, or enhancements to make mcp-server-shell even more powerful and useful.

## License

mcp-server-shell is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.