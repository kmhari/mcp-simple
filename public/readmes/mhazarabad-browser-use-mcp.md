# Browser Use MCP server

[![smithery badge](https://smithery.ai/badge/@mhazarabad/browser-use-mcp)](https://smithery.ai/server/@mhazarabad/browser-use-mcp)

## Overview

A Model Context Protocol server for automating browser tasks using Browser Use API. This server provides tools to run browser automation tasks, monitor task status, and manage running tasks.

## Prerequisites

- A Browser Use API key

to get a Browser Use API key, go to [Cloud Browser Use](https://cloud.browser-use.com/) and sign up.

## Installation

### Installing via Smithery

To install browser-use-mcp for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@mhazarabad/browser-use-mcp):

```bash
npx -y @smithery/cli install @mhazarabad/browser-use-mcp --client claude
```

The package is not published to PyPI. You'll need to clone this repository and run it directly from source.

```
git clone https://github.com/mhazarabad/browser-use-mcp.git
cd browser-use-mcp
```

### Installing via pip

```bash
pip install cloud-browser-use-mcp-server
```

## Running the Server

### Using uvx (recommended)


you can run the server using python:

```bash
python -m cloud_browser_use_mcp_server --api-key YOUR_BROWSER_USE_API_KEY
```

## Tools

1. `run_task`
   - Run a Browser Use automation task with instructions and wait for completion
   - Input:
     - `instructions` (string): Instructions for the browser automation task
     - `structured_output` (string, optional): JSON schema for structured output
     - `parameters` (object, optional): Additional parameters for the task
   - Returns: Information about the created task including final output if wait_for_completion is True

2. `get_task`
   - Get details of a Browser Use task by ID
   - Input:
     - `task_id` (string): ID of the task to retrieve
   - Returns: Complete task information including steps and output

3. `get_task_status`
   - Get the status of a Browser Use task
   - Input:
     - `task_id` (string): ID of the task to check
   - Returns: Current status of the task

4. `stop_task`
   - Stop a running Browser Use task
   - Input:
     - `task_id` (string): ID of the task to stop
   - Returns: Confirmation of task being stopped

5. `pause_task`
   - Pause a running Browser Use task
   - Input:
     - `task_id` (string): ID of the task to pause
   - Returns: Confirmation of task being paused

6. `resume_task`
   - Resume a paused Browser Use task
   - Input:
     - `task_id` (string): ID of the task to resume
   - Returns: Confirmation of task being resumed

7. `list_tasks`
   - List all Browser Use tasks
   - Returns: List of all tasks with their IDs and statuses

8. `check_balance`
   - Check your Browser Use account balance
   - Returns: Account balance information

### Prompts

1. `browser_use_task`
   - Run a Browser Use automation task
   - Input:
     - `instructions` (string): Instructions for the browser automation task
     - `structured_output` (string, optional): JSON schema for structured output
   - Returns: Formatted task details as conversation context

## Claude Desktop

Add this to your `claude_desktop_config.json` after installing it with `pip install cloud-browser-use-mcp-server`:

```json
"mcpServers": {
  "browser-use": {
    "command": "python",
    "args": [
        "-m",
        "cloud_browser_use_mcp_server",
        "--api-key",
        "YOUR_BROWSER_USE_API_KEY"
    ]
  }
}
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
