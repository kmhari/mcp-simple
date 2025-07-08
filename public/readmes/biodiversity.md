
# Biodiversity Model Context Protocol Server

## Setup on Windows

- Python:
  - Install using the official installer. Remember to include into PATH.
- `uv`:
  - `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`
  - Note: installation with pip may cause problems with PATH.

Activate virtual environment:

    .venv\Scripts\activate

Deactivate virtual environment:

    deactivate

Install the server for Claude Desktop (check: does this run it in the background as well?):

    mcp install server.py

Only run the server:

    mcp run server.py

Run server with auto-reload:

    python -m uvicorn server:mcp --reload

Run development server and Inspector. This requires Node & npx.

    mcp dev server.py
    
See running processes:

    Get-Process | Where-Object { $_.ProcessName -like "*mcp*" }

Stop running processes:

    Get-Process | Where-Object { $_.ProcessName -like "*mcp*" } | Stop-Process -Force

