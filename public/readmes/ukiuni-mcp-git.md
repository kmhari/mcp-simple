# Git Command MCP Server

This is a Model Context Protocol (MCP) server that provides tools for executing various Git commands.

It requires that the git (git.exe) command is installed locally.

Since a large part of this was created using generative AI, please contact http://github.com/ukiuni/mcp-git if you notice anything.

## Setup

### Clone from GitHub
1.  **(If you haven't already) Clone the repository:**
    ```bash
    git clone http://github.com/ukiuni/mcp-git.git
    cd mcp-git
    ```
2.  **Install dependencies:**
    Make sure you have Node.js and npm installed. Then run:
    ```bash
    npm install
    ```
### Install with npm
1. **Install with npm.**
   ```bash
   npm i mcp-git
   ```
   It will be installed in node_modules, so please set the path to the relevant location in the next section.

## Connecting from an MCP Client

When connecting from an MCP client (such as Roo Code, GitHub Copilot, Claude Desktop, Cursor, etc.), please use the following settings.

```
{
  "mcpServers": {
    "mpc-git": {
      "command": "node",
      "args": [
        "/path_to_mcp-git/mcp-git/dist/index.js"
      ]
    }
  }
}
```

Please set path_to_mcp to the absolute path to the directory where you cloned git.

## Available Tools
Each tool name follows the format `git-` prefix followed by the command name (e.g., `git-add`, `git-commit`, `git-status`).

### Tool Output
The execution result of the tool is returned as text content, usually including:

*   `STDOUT`: Standard output from the Git command.
*   `STDERR`: Standard error output from the Git command (Note: In Git, stderr does not necessarily indicate an error).
*   `ERROR`: Execution errors that occurred within the server itself.

If the command succeeds without output, a message indicating success will be provided.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Trademarks
Trademarks mentioned in this project are trademarks of their respective companies.