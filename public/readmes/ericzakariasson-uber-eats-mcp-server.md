# Uber Eats MCP Server

This is a POC of how you can build an MCP servers on top of Uber Eats

https://github.com/user-attachments/assets/05efbf51-1b95-4bd2-a327-55f1fe2f958b

## What is MCP?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open protocol that enables seamless integration between LLM applications and external tools.

## Prerequisites

- Python 3.12 or higher
- Anthropic API key or other supported LLM provider

## Setup

1. Ensure you have a virtual environment activated:
   ```
   uv venv
   source .venv/bin/activate  # On Unix/Mac
   ```

2. Install required packages:
   ```
   uv pip install -r requirements.txt
   playwright install
   ```

3. Update the `.env` file with your API key:
   ```
   ANTHROPIC_API_KEY=your_openai_api_key_here
   ```

## Note

Since we're using stdio as MCP transport, we have disable all output from browser use

## Debugging

You can run the MCP inspector tool with this command

```bash
uv run mcp dev server.py
```
