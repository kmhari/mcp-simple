## python-interpreter-mcp: A MCP server to run scripts

## Overview
A lightweight, experimental MCP server designed to execute arbitrary Python scripts in a structured and reproducible environment. It leverages **[uv](https://github.com/astral-sh/uv)** to run isolated code snippets through subprocesses.


### Tools
- `run_script`
   - Runs the given script with `uv run script.py`.
   - Input: 
     - `code`(str): Script to be run
   - Return: The stdout of the given script.

## Configuration
### Usage with OpenAI Agents SDK

```python
async with MCPServerStdio(
            params={
                "command": "uvx",
                "args": ["python-interpreter-mcp"],
            }
    ) as server
...
```

### Usage with Claude Desktop
Add this to your `claude_desktop_config.json`:
```json
"mcpServers": {
  "interpreter": {
    "command": "uvx",
    "args": ["python-interpreter-mcp"]
  }
}
```

## How it works

- A script string is received by the MCP tool `run_script`.
- A hidden folder is created in cwd, and the script is saved as a `.py` file inside it.
- The script is then executed using `uv run`, which ensures dependency isolation.
- The stdout of the script is captured and returned as the response.

## Usage Warnings
**This project is in a very early stage of development.**

### ⚠️ Important notes
- It executes arbitrary Python code, which means it can run anything — including malicious or destructive commands.
- Use only in trusted, sandboxed environments.
- You should always validate, guardrail, or restrict inputs when wiring this into an LLM.