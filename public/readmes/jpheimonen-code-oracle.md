# Code Oracle

A Python tool for locating code using Gemini 2.5 Flash. Capable of shifting through large amounts of code to locate the answer to your query.

## Features

- Uses AI to help locate code in a codebase

## Installation

```bash
uv install
```

## Usage

```bash
uv run main.py
``` 

## Using as MCP in Cursor

To use Code Oracle as a Model Context Protocol (MCP) server in Cursor:

1. Clone this repository
2. Have `uv` installed
2. Create an `mcp.json` file in your Cursor configuration directory with the following content:

```json
{
  "mcpServers": {
    "code-oracle": {
      "command": "/path/to/run_mcp.sh",
      "env": {
        "GEMINI_API_KEY": "your-gemini-key"
      }
    }
  }
}
```

Make sure to:
- Replace `/path/to/run_mcp.sh` with the actual path to the `run_mcp.sh` script in this repo
- Set your Gemini API key in the environment variables

After configuration, Code Oracle will be available as a tool when using Cursor. 

