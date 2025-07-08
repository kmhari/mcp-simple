# AlertMCP

An MCP tool that provides desktop notification functionality. You can send notifications from AI client tools like Claude and Cursor.

## Features

- Set agent name
- Send desktop notifications
- Schedule notifications at specific times
- Schedule notifications after a delay

## Installation

### About UV Installation

For installing alertmcp and managing dependencies, we recommend using the high-speed Python package manager "uv". It's more efficient than pip for creating virtual environments and installing packages.

#### UV Installation Method

You can install uv on Windows (PowerShell) or macOS (bash) with the following command:

```
pip install uv
```

After installation, you can check the version with:

```
uv --version
```

### Installation from GitHub

Clone the repository to your local machine.

#### Using PowerShell (Windows):

```powershell
# Clone the repository
git clone https://github.com/kousunh/alertmcp.git

# Navigate to the cloned directory
cd alertmcp

# Create a virtual environment
uv venv

# Install the package
uv pip install .
```

#### Using Bash (macOS/Linux):

```bash
# Clone the repository
git clone https://github.com/kousunh/alertmcp.git

# Navigate to the cloned directory
cd alertmcp

# Create a virtual environment
uv venv

# Install the package
uv pip install .

# For macOS, additionally install pyobjus (in the virtual environment)
uv pip install pyobjus
```

### OS-specific Notes

- **Windows**: The notification function uses `plyer`, which is automatically installed as a dependency.
- **macOS**: The notification function requires `plyer` and `pyobjus`. You need to separately install `pyobjus` even when using uv.

## Setting Up and Using with AI Tools

After cloning the directory locally, set up each AI tool as follows:

### Setup in Claude Desktop

1. Open Claude desktop settings
2. Find and edit the settings file:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
3. Add the following settings:

```json
{
  "mcpServers": {
    "alert_mcp":{
      "command": "uv",
      "args": [
        "--directory",
        "<Path to your Git cloned folder>\\alert_mcp",
        "run",
        "python",
        "-m",
        "alertmcp.server"
      ],
      "alwaysAllow": ["add"],
      "disabled": false
    }
  }
}
```

### Setup in Cursor

1. Open Cursor settings and navigate to the MCP Servers section
2. Click "Add New MCP Server"
3. Enter the following settings:
   - Name: AlertMCP (or any name you prefer)
   - Type: command
   - Command: `uv --directory <Path to your Git cloned folder>\alert_mcp run python -m alertmcp.server`

#### JSON Configuration for Cursor

You can also directly edit the Cursor settings file "mcp.json":

```json
{
  "alert_mcp": {
    "command": "uv",
    "args": [
      "--directory",
      "<Path to your Git cloned folder>\\alert_mcp",
      "run",
      "python",
      "-m",
      "alertmcp.server"
    ],
    "alwaysAllow": ["add"],
    "disabled": false
  }
}
```

### Setting Agent Name

You can customize the agent name with:

```
Please set your name to 'AI Agent Name'
```

### Example Instructions

You can give the following instructions to your MCP-enabled AI assistant:

```
Please send a notification when you finish your task
```

```
Please notify me at 15:30 today to "Check presentation materials"
```

```
Please notify me in 5 minutes that "It's time to take a break"
```

## Documentation

For Japanese documentation, see [README_JA.md](README_JA.md)

## License

MIT License 