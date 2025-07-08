# User Prompt MCP

A Model Context Protocol (MCP) server for Cursor that enables requesting user input during generation. This is mostly AI-generated code.

## Overview

This project implements an MCP server that allows Cursor (or any MCP-compatible client) to request additional input from users during model generation without ending the generation process. It serves as a bridge between the AI model and the user, creating a more interactive experience.

## Features

- **User Input Prompting**: Allows the AI to ask for more information during generation
- **Simple GUI**: Presents input prompts in a dialog box with text wrapping
- **Cross-Platform**: Should work on both Linux (tested) and macOS
- **Stdio Transport**: Integration with Cursor via stdio

## Installation

### Prerequisites

- For GUI functionality:
  - Linux: zenity
  - macOS: osascript (built-in)

### Quick Install (Recommended)

The easiest way to install user-prompt-mcp is using our installation script, which automatically downloads the appropriate binary for your system:

```bash
# Install the latest version
curl -sSL https://raw.githubusercontent.com/nazar256/user-prompt-mcp/main/install.sh | bash

# Or install a specific version
curl -sSL https://raw.githubusercontent.com/nazar256/user-prompt-mcp/main/install.sh | bash -s -- -v v1.0.0
```

The installation script will:
- Detect your OS and architecture (Linux or macOS, amd64 or arm64)
- Download the appropriate pre-compiled binary
- Install it to a suitable directory in your PATH
- Make it executable

### Install from source

If you prefer to build from source (requires Go 1.18+):

```bash
go install github.com/nazar256/user-prompt-mcp/cmd/user-prompt-mcp@latest
```

### Manual Installation

You can also download pre-compiled binaries directly from the [Releases page](https://github.com/nazar256/user-prompt-mcp/releases).

## Usage with Cursor

1. Open Cursor and go to Settings
2. Navigate to the MCP Servers section and add a new server by editing JSON:
```json
{
  "mcpServers": {
    "prompt": {
      "command": "user-prompt-mcp"
    }
  }
}
```

3. Save and refresh

4. Add to global rules something like: "Important - do not finish responding until explicitly told to do so, instead always use MCP `input_user_prompt` and wait for response in all cases, either you feel stuck, you have question or you finished work on a prompt - always communicate with the user using this MCP."

### Configuration

The server can be configured using command-line flags or environment variables:

#### Timeout Configuration
By default, the server will wait 20 minutes for user input before timing out. You can customize this timeout using:

- Command line flag: `--timeout <seconds>`
  ```bash
  user-prompt-mcp --timeout 600  # Set timeout to 10 minutes
  ```
- Environment variable: `USER_PROMPT_TIMEOUT=<seconds>`
  ```bash
  export USER_PROMPT_TIMEOUT=1800  # Set timeout to 30 minutes
  user-prompt-mcp
  ```

Now when using Cursor, the AI can request additional input from you without ending its generation.

## License

MIT

## Acknowledgements

- [Model Context Protocol](https://modelcontextprotocol.io)
- [mark3labs/mcp-go](https://github.com/mark3labs/mcp-go) 