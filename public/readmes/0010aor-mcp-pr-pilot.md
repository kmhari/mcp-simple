# MCP Server PR Pilot

<img src="sample.gif" alt="Demo of MCP Server PR Pilot" width="1080" />

A Model Context Protocol (MCP) server that helps you create pull request (PR) descriptions, commit messages, and code reviews based on the actual code changes in your repository. It provides the output of `git diff` and a summarization instruction, making it easy to generate meaningful PR descriptions, commit messages, and reviews using LLMs or other tools.

### Example PR/Commit/Review Workflow

This server is designed to automate and improve your pull request documentation, commit message generation, and code review process.

### Available Tools

-   `summarize_pr` - Summarize the changes in this branch for a pull request.
    -   **Input:**
        - `branch` (string, optional): The branch to diff against (defaults to `main`).

-   `review_changes` - Review the changes in my working directory.
    -   **Input:**
        - `branch` (string, optional): The branch to diff against (defaults to `main`).

-   `generate_commit` - Generate a conventional commit message for my staged changes.

-   `generate_docs` - Generate documentation updates based on the code changes.
    -   **Input:**
        - `branch` (string, optional): The branch to diff against (defaults to `main`).

## Installation and Running

This project uses [`uv`](https://docs.astral.sh/uv/) for dependency management and running scripts.

### Using uv (recommended)

Ensure `uv` is installed. You can run the server directly from the project directory:

```bash
# Navigate to the project root directory first
cd path/to/mcp-servers/mcp-pr-pilot

# Install dependencies (if needed) and run the server script
uv run mcp-server-pr-pilot
```

### Using PIP (for distribution or alternative setup)

If the package were published, you could install it via pip:

```bash
pip install mcp-server-pr-pilot
```

After installation, you could run it as a script:

```bash
python -m mcp_server_pr_pilot
```

For development, you typically run it using `uv run` as shown above.

## Configuration

### Configure for MCP Clients (e.g., Claude.app, Inspector)

Add an entry to your client's MCP server configuration. The exact key (`"pr-pilot"` in the examples) can be chosen by you.

**Important:** The configuration needs to point `uv` to the correct project directory using the `--directory` argument. The path style (`/` vs `\`) depends on your operating system and how you run `uv`.

<details>
<summary>Default: Using uv Directly (Linux/macOS/WSL)</summary>

This is the standard approach if your MCP client and the server run in the same Linux, macOS, or WSL environment.

```json
// Example for mcp.json or Claude settings
"mcpServers": {
  "pr-pilot": {
    "command": "uv",
    "args": [
      "--directory",
      "/path/to/mcp-servers/mcp-pr-pilot", // Unix-style path
      "run",
      "mcp-server-pr-pilot"
    ]
  }
}
```

</details>

<details>
<summary>Windows Client + WSL Server</summary>

This configuration is **recommended** if your MCP client runs on **Windows**, but you want the server to execute within **WSL**. It uses `wsl.exe` to invoke `uv` inside WSL.

**Requirements:**
*   `uv` must be installed *inside* your WSL distribution.
*   Adjust the path to `uv` inside WSL (e.g., `/home/user/.cargo/bin/uv`) if it's not in the WSL `PATH`.
*   Use the `/mnt/...` style path for the `--directory` argument accessible from within WSL.

```json
// Example for mcp.json or Claude settings on Windows
"mcpServers": {
  "pr-pilot": {
    "command": "wsl.exe",
    "args": [
      "/home/your-user/.cargo/bin/uv", // uv WSL PATH
      "--directory",
      "/mnt/d/repos/mcp-servers/mcp-pr-pilot", // WSL-style path to project
      "run",
      "mcp-server-pr-pilot"
    ]
  }
}
```

</details>

<details>
<summary>Alternative: Using uv Directly on Windows</summary>

This assumes `uv` is installed directly on Windows and your MCP client also runs directly on Windows.
*   Use the Windows-style path (`D:\...`) for the `--directory` argument.
*   Be mindful of potential `.venv` conflicts if you also use WSL (see below).

```json
// Example for mcp.json or Claude settings on Windows
"mcpServers": {
  "pr-pilot": {
    "command": "uv",
    "args": [
      "--directory",
      "D:\path\to\mcp-servers\mcp-pr-pilot", // Windows-style path
      "run",
      "mcp-server-pr-pilot"
    ]
  }
}
```

</details>

### Handling `.venv` Conflicts (Different Environments)

*   **Problem:** `uv run` creates a `.venv` directory specific to the operating system/environment (e.g., Linux vs. Windows). If you switch between running the server directly on Windows and running it via WSL (or native Linux), the existing `.venv` might be incompatible.
*   **Solution:** Before switching environments, **delete the `.venv` directory** in the `mcp-pr-pilot` project root. `uv run` will then create a fresh, compatible one for the environment you are using.

## Debugging

You can use the MCP inspector to debug the server by prefixing the command and arguments from your configuration with `npx @modelcontextprotocol/inspector`.

```bash
# Example using the Default (Linux/macOS/WSL) configuration:
npx @modelcontextprotocol/inspector uv --directory /path/to/mcp-servers/mcp-pr-pilot run mcp-server-pr-pilot

# Example using the Recommended (Windows Client + WSL Server) configuration:
npx @modelcontextprotocol/inspector wsl.exe /home/your-user/.cargo/bin/uv --directory /mnt/d/repos/mcp-servers/mcp-pr-pilot run mcp-server-pr-pilot

# Example using the Alternative (Direct Windows) configuration:
npx @modelcontextprotocol/inspector uv --directory D:\path\to\mcp-servers\mcp-pr-pilot run mcp-server-pr-pilot
```

## Contributing

We encourage contributions to help expand and improve this PR Pilot MCP server. Whether you want to add new features, enhance existing functionality, or improve documentation, your input is valuable.

Pull requests are welcome! Feel free to contribute new ideas, bug fixes, or enhancements.

## License

mcp-server-pr-pilot is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License.