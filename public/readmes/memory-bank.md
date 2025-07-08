# Memory Bank MCP Server

This MCP server helps to build structured documentation system based on [Cline's Memory Bank pattern](https://docs.cline.bot/improving-your-prompting-skills/cline-memory-bank) for context preservation in AI assistant environments. 

Powered by [Enlighter](https://enlightby.ai) and [Hyperskill](https://hyperskill.org).

Learn how to setup and use Memory Bank directly in Cursor: http://enlightby.ai/projects/37

[![smithery badge](https://smithery.ai/badge/@ipospelov/mcp-memory-bank)](https://smithery.ai/server/@ipospelov/mcp-memory-bank)

<a href="https://glama.ai/mcp/servers/@ipospelov/mcp-memory-bank">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@ipospelov/mcp-memory-bank/badge" alt="Memory Bank Server MCP server" />
</a>

## Features

- Get detailed information about Memory Bank structure
- Generate templates for Memory Bank files
- Analyze project and provide suggestions for Memory Bank content

## Running the Server

There are a few options to use this MCP server:

### With UVX

Add this to your mcp.json config file:

```json
{
  "mcpServers": {
    "mcp-memory-bank": {
      "command": "uvx",
      "args": [
        "--from",
        "git+https://github.com/ipospelov/mcp-memory-bank",
        "mcp_memory_bank"
      ]
    }
  }
}
```

### With [Smithery](https://smithery.ai/server/@ipospelov/mcp-memory-bank)

Add this to your mcp.json config file:

```json
{
  "mcpServers": {
    "memory-bank": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@ipospelov/mcp-memory-bank",
        "--key",
        "your_smithery_key"
      ]
    }
  }
}
```

### With Docker

Add this to your mcp.json config file:

```json
{
  "mcpServers": {
    "memory-bank": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "19283744/mcp-memory-bank:latest"
      ]
    }
  }
}
```

### Manually

Clone repository and run the following commands:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Then add this to your mcp.json config file:

```json
{
  "mcpServers": {
    "memory-bank": {
      "command": "python",
      "args": ["src/mcp_memory_bank/main.py"]
    }
  }
}
```

## Usage Example

Ask Cursor or any other AI code assistant with Memory Bank MCP:
```
Create memory bank for To Do list application with your tools
```
Provide more context to get better results.

## Available Tools

### get_memory_bank_structure

Returns a detailed description of the Memory Bank file structure.

### generate_memory_bank_template

Returns a template for a specific Memory Bank file.

Example:
```json
{
  "file_name": "projectbrief.md"
}
```

### analyze_project_summary

Analyzes a project summary and provides suggestions for Memory Bank content.

Example:
```json
{
  "project_summary": "Building a React web app for inventory management with barcode scanning"
}
```

## Memory Bank Structure

The Memory Bank consists of core files and optional context files, all in Markdown format:

### Core Files (Required)

1. `projectbrief.md` - Foundation document that shapes all other files
2. `productContext.md` - Explains why the project exists, problems being solved
3. `activeContext.md` - Current work focus, recent changes, next steps
4. `systemPatterns.md` - System architecture, technical decisions, design patterns
5. `techContext.md` - Technologies used, development setup, constraints
6. `progress.md` - What works, what's left to build
7. `memory_bank_instructions.md` - How to work with Memory Bank, instructtions for AI-agent