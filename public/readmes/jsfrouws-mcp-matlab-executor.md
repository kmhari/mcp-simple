# MATLAB Executor MCP Tool

This Model Context Protocol (MCP) tool allows secure execution of MATLAB code through Claude, with security prompts for user approval.

## Features

- Execute any MATLAB function, script, or command
- Security prompts with options: Allow Once, Always Allow, or Deny
- Remembers allowed commands during a session
- Path management for MATLAB projects
- Detailed logging of all operations

## Installation

Install with `uvx`:

```bash
uvx mcp-matlab-executor
```

Or install directly from the directory:

```bash
cd matlab-executor
uv venv
.venv/Scripts/activate  # On Windows
source .venv/bin/activate  # On Linux/Mac
pip install -e .
```

## Configuration

Set the MATLAB path using environment variables:

1. Set the `MATLAB_PATH` environment variable to your MATLAB installation's bin directory
2. Or create a `.env` file with: `MATLAB_PATH=C:/Program Files/MATLAB/R2022b/bin`

## Usage with Claude Desktop

Add to Claude Desktop configuration file:

```json
{
  "mcpServers": {
    "matlab-executor": {
      "command": "uvx",
      "args": [
        "run", "git+https://github.com/JSFrouws/mcp-matlab-executor.git"
      ],
      "env": {
        "MATLAB_PATH": "C:/Program Files/MATLAB/R2022b/bin"
      }
    }
  }
}
```

## Usage Examples

Execute a MATLAB function:
```
execute_matlab_function("C:/path/to/matlab/project", "result = my_function(10, 'test')")
```

Run arbitrary MATLAB code:
```
execute_matlab_function("", "x = 1:10; y = x.^2; plot(x, y); disp('Plotted x^2')")
```

Execute multiple commands:
```
execute_matlab_function("", "a = 5; b = 10; c = a + b; disp(['Result: ' num2str(c)])")
```

## Security

A permission dialog appears with each execution request:
- **Allow Once**: Permit this execution one time
- **Always Allow**: Remember and allow for the current session
- **Deny**: Block execution

The tool clearly shows what MATLAB code will be executed and lets you know which option was selected.
