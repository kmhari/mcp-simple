## lldb_mcp

A proper, simple lldb mcp server with minimal dependencies and all functionality! There are only two commands ```lldb_init``` and ```lldb```, no need to clutter your tools. Works remarkably well with o4-mini and Gemini 2.5 Pro. You remain fully in control.

The output is automagically captured, no need to copy paste.

## Setup
```bash
git clone https://github.com/stableversion/lldb_mcp
```
```bash
cd lldb_mcp && python3 -m venv venv && source venv/bin/activate && pip3 install fastmcp
```
```json
{
  "mcpServers": {
    "lldb": {
      "command": "/path/to/ldb_mcp/venv/bin/python",
      "args": ["/path/to/ldb_mcp/lldb_mcp.py"]
    }
  }
}
```
```
(lldb) command script import /path/to/lldb_mcp/lldb_server.py
```

## Architecture
The entire codebase is less than 200 lines of code, because:

- **Synchronous LLDB:** Calling debugger.SetAsync(False) makes HandleCommand block and capture all output directly. This avoids complex event listeners (SBListener) and polling.
- **Simple Controller:** The LLDBController just runs commands via HandleCommand and returns the full output/error it receives.
- **Standard Libraries:** Uses Python's built-in socketserver and json

## Safety
lldb can execute ANY arbitrary commands, it should be prevented
- You have to start the server in a lldb session manually
- Some commands are blacklisted, check lldb_server.py
- Chaining of commands is not allowed (o4-mini really likes to)

## Notes
- o4 mini has a tendency to hallucinate --address in memory commands.
- Some commands "succeeded" without output, this is confusing for llms, so it returns "Executed successfully" instead.
- "Continue" can run indefinitely until it hits a breakpoint, meaning the mcp can wait forever for output (skip and continue is your friend)
