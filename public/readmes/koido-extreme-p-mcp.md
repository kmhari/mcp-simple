# Extreme P-value MCP Server

## Overview

This MCP server provides an API interface to extreme p-value calculation functions (z, t, F, chi-square, SAIGE) implemented in the R script `extreme-P.R`, via Python.

- **Strongly depends on the R script `extreme-P.R` (except for Wald).**
- Uses [pyper](https://github.com/nteract/pyper) to call R from Python.
- The API server is built with [FastMCP](https://github.com/jlowin/fastmcp).
- `extreme_p_helper.py` is a 1-to-1 wrapper for the R functions.
- `server.py` provides the API endpoints.

## Status

🚧 **Under Active Development** 🚧

This project is under active development. APIs and features may change without notice.

## Dependencies

- uv
- pyper
- fastmcp
- mcp[cli]

## Directory structure

```
+.
├── server.py              # Main FastMCP server
├── extreme_p_helper.py    # R function wrapper
├── extreme-P.R            # R script for extreme p-value calculation (see acknowledgements)
├── pyproject.toml         # Dependencies
└── README.md              # This document
```

## Setup and Running

### Add the MCP server to your MCP server list (Claude, Cursor, etc.)

```json
{
    "mcpServers": {
      "ExtremeP": {
        "command": "uv",
        "args": ["--directory", "where you cloned the repo", "run", "server.py"],
        "env": {}
      }
    }
}
```

### Run MCP Inspector

```bash
# Install dependencies
uv sync

# Run MCP Inspector
uv --directory ./ run mcp dev server.py
```

### Run the MCP server

```bash
# Install dependencies
uv sync

# Run the MCP server
uv run server.py
```

### Example: Using from Python (not running as MCP server)

```python
from extreme_p_helper import ExtremePHelper
helper = ExtremePHelper()
result = helper.pvalue_extreme_z(10)
print(result)  # {'mantissa': ..., 'exponent': ...}
```

## License

This MCP server is released under the Apache License 2.0.

## Acknowledgements

- [skoyamamd](https://gist.github.com/skoyamamd/4f97b43c7171e01a8c50e9aa18b0ebf0) and [carbocation](https://gist.github.com/carbocation/d39a20ed028b25ff3528468b455b2bcc)
- [pyper](https://github.com/nteract/pyper)
- [FastMCP](https://github.com/jlowin/fastmcp)
