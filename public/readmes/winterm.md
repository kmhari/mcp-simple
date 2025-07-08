# WinTerm MCP

A Model Context Protocol server that provides programmatic access to the Windows terminal. This server enables AI models to interact with the Windows command line interface through a set of standardized tools.

## Features

- **Write to Terminal**: Execute commands or write text to the Windows terminal
- **Read Terminal Output**: Retrieve output from previously executed commands
- **Send Control Characters**: Send control signals (e.g., Ctrl+C) to the terminal
- **Windows-Native**: Built specifically for Windows command line interaction

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/capecoma/winterm-mcp.git
   cd winterm-mcp
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build the Project**:
   ```bash
   npm run build
   ```

4. **Configure Claude Desktop**:

Add the server config to `%APPDATA%/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "github.com/capecoma/winterm-mcp": {
      "command": "node",
      "args": ["path/to/build/index.js"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

Note: Replace "path/to/build/index.js" with the actual path to your built index.js file.

## Available Tools

### write_to_terminal
Writes text or commands to the terminal.
```json
{
  "command": "echo Hello, World!"
}
```

### read_terminal_output
Reads the specified number of lines from terminal output.
```json
{
  "linesOfOutput": 5
}
```

### send_control_character
Sends a control character to the terminal (e.g., Ctrl+C).
```json
{
  "letter": "C"
}
```

## Development

For development with auto-rebuild:
```bash
npm run dev
```

## License

MIT License - see [LICENSE](LICENSE) file.
