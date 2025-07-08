# Isolator MCP Server

`isolator-mcp` is a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server written in TypeScript. It acts as a wrapper around the embedded [`isolator` Go CLI tool](./isolator-cli), providing a secure code execution sandbox accessible via MCP.

LLM applications (MCP Hosts) can connect to this server and use its `execute_code` tool to safely run Python, Go, or JavaScript code snippets provided directly or loaded from predefined snippet files.

## Features

*   Provides the `execute_code` MCP tool.
*   Supports executing code provided directly (`language`, `entrypoint_code`) or via named snippets (`snippet_name`).
*   Supports multiple languages (Python, Go, JavaScript, configurable).
*   Uses the embedded `isolator` Go CLI (`isolator-cli/`) for secure Docker container execution.
*   Configurable security defaults (timeout, resource limits, network) via `isolator_config.json`.
*   Manages temporary directories on the host for code execution.
*   Handles file copying into containers (by instructing the `isolator` CLI).
*   Returns structured results (stdout, stderr, status) via MCP, setting `isError: true` on tool-level failures.

## Prerequisites

*   **Docker:** Required for container creation and execution by the `isolator-cli`. Ensure the Docker daemon is running.
*   **Go:** Required to build the embedded `isolator-cli` Go binary.
*   **Node.js and npm:** Required to install dependencies, build, and run the `isolator-mcp` TypeScript server.

## Installation

1.  **Build `isolator` Go CLI:** Navigate to the embedded Go CLI directory and build the binary:
    ```bash
    cd isolator-cli
    go build -o isolator main.go
    cd .. 
    ```
    This creates the `./isolator-cli/isolator` executable needed by the server.
2.  **Configure `isolator-mcp`:**
    *   Edit `isolator_config.json`: Update `isolatorPath` to point to the absolute path of the built binary (e.g., `/Users/ompragash/Documents/Cline/MCP/isolator-mcp/isolator-cli/isolator`). Adjust default limits, container workdir, language images, or the `promptsDir` (used for snippets) location if needed.
    *   Ensure the `prompts` directory exists (default: `./prompts`). Add code snippet files (e.g., `hello_world.py`). The filename base (e.g., `hello_world`) is used as the `snippet_name`.
3.  **Install Server Dependencies:** Navigate to the main directory (`isolator-mcp`) and run:
    ```bash
    npm install
    ```
4.  **Build Server:** Compile the TypeScript code:
    ```bash
    npm run build
    ```
    This creates the executable script at `build/index.js`.
5.  **Configure MCP Host:** Add the server to your MCP client's settings file (e.g., `cline_mcp_settings.json` for the VS Code extension):
    ```json
    {
      "mcpServers": {
        "isolator": {
          "command": "node",
          "args": ["/Users/ompragash/Documents/Cline/MCP/isolator-mcp/build/index.js"],
          "env": {},
          "disabled": false,
          "autoApprove": []
        }
      }
    }
    ```
    *(Adjust the path in `args` if necessary)*. The MCP Host should automatically detect and start the server.

**Important Note:** Ensure the Docker images specified in `isolator_config.json` (e.g., `python:3.11-alpine`, `golang:1.21-alpine`) are pulled onto your system beforehand using `docker pull <image_name>`. The `isolator` tool does not automatically download missing images.

## Local Development / Testing

To run the server locally for development or testing (without installing it via MCP Host settings):

1.  **Build Go CLI:** Ensure the `isolator` Go CLI is built within its subdirectory: 
    ```bash
    cd isolator-cli 
    go build -o isolator main.go
    cd ..
    ```
2.  **Build TS Server:** In this main directory (`isolator-mcp`), run `npm install` and `npm run build`.
3.  **Configure:** Make sure `isolator_config.json` correctly points to the built `./isolator-cli/isolator` binary via the `isolatorPath` key (use the absolute path).
4.  **Run Server:** Execute the built server directly using Node:
    ```bash
    node build/index.js
    ```
    The server will start, connect via stdio, and print logs (including `console.error` messages from `index.ts`) to the console.
5.  **Interact (Manual):** You can manually send JSON-RPC messages (e.g., `tools/list`, `tools/call`) to the server's standard input to test its responses. Tools like `@modelcontextprotocol/inspector` can also be helpful (`npm run inspector`).

*(Remember to stop this manually run server before relying on the MCP Host to start it via the settings file.)*

## Architecture & Flow

1.  **MCP Host Request:** An LLM asks the MCP Host (e.g., VS Code Extension) to call the `isolator` server's `execute_code` tool with arguments.
2.  **Server Processing (`index.ts`):**
    *   Receives the `tools/call` request via stdio.
    *   Validates arguments using Zod.
    *   Loads configuration from `isolator_config.json`.
    *   Determines the code source:
        *   If `snippet_name` is provided, reads the corresponding file from the configured `promptsDir` and determines the language from the file extension.
        *   If `entrypoint_code` and `language` are provided, uses them directly.
    *   Creates a temporary directory on the host.
    *   Writes the entrypoint code and any `additional_files` into the temporary directory.
    *   Constructs the command-line arguments for the embedded `isolator` Go CLI, including security flags from the config and the path to the temporary directory.
    *   Spawns the `isolator` process using Node.js `child_process.spawn`.
3.  **Go CLI Execution (`isolator-cli/isolator run`):**
    *   Parses flags (including the new `--env` flag).
    *   Creates a tar stream of the temporary directory contents.
    *   Uses the Docker SDK to create a container with specified image, resource limits, environment variables (from `--env`), and security settings (NO bind mount).
    *   Uses `CopyToContainer` to copy the tar stream into the container's working directory.
    *   Starts the container, which executes the requested command (e.g., `python /workspace/hello_world.py`).
    *   Waits for completion, captures stdout/stderr.
    *   Removes the container.
    *   Prints the result (status, output, etc.) as JSON to its stdout.
4.  **Server Result Handling (`index.ts`):**
    *   Reads the JSON output from the finished `isolator` process stdout.
    *   Parses the JSON result.
    *   Formats the `CallToolResult` for MCP, combining stdout/stderr and setting `isError` if the Go CLI reported a non-success status.
    *   Sends the result back to the MCP Host.
    *   Cleans up the temporary directory on the host.
5.  **MCP Host Response:** Relays the result back to the LLM, which then formulates a response for the user.

## `execute_code` Tool

### Description
Executes code (Python, Go, JavaScript) in a secure, isolated container environment.

### Input Schema (`arguments`)

*   `language` (string, optional): The programming language (e.g., "python", "go", "javascript"). Required if `snippet_name` is not provided.
*   `entrypoint_code` (string, optional): The main code content to execute. Required if `snippet_name` is not provided.
*   `entrypoint_filename` (string, optional): Filename for the main code (e.g., "main.py", "script.js"). Defaults based on language if not provided.
*   `additional_files` (array, optional): Array of objects, each with:
    *   `filename` (string, required): Name of the additional file.
    *   `content` (string, required): Content of the additional file.
*   `snippet_name` (string, optional): Name of a pre-defined code snippet file (without extension) located in the configured `promptsDir`. Mutually exclusive with `language` and `entrypoint_code`.

**Constraint:** Either `snippet_name` OR both `language` and `entrypoint_code` must be provided.

### Output (`CallToolResult`)

*   `content`: An array containing a single `TextContent` object.
    *   `type`: "text"
    *   `text`: A string containing the combined stdout and stderr from the execution, formatted like:
        ```
        --- stdout ---
        [Actual stdout output]
        --- stderr ---
        [Actual stderr output]
        ```
        If an error occurred *during* execution (non-zero exit code, timeout), the text will be prepended with `Execution Failed (status): [error message]\n\n`.
*   `isError` (boolean): `true` if the execution status reported by the `isolator` CLI was "error" or "timeout", `false` otherwise.

*(Protocol-level errors, like invalid arguments or failure to start the process, will result in a standard MCP error response instead of a `CallToolResult`)*.
