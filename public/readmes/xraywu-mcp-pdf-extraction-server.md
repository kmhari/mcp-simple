# PDF Extraction MCP Server (Claude Code Fork)

MCP server to extract contents from PDF files, with fixes for Claude Code CLI installation.

This fork includes critical fixes for installing and running the server with Claude Code (the CLI version).

## What's Different in This Fork

1. **Added `__main__.py`** - Enables the package to be run as a module with `python -m pdf_extraction`
2. **Claude Code specific instructions** - Clear installation steps that work with Claude Code CLI
3. **Tested installation process** - Verified working with `claude mcp add` command

## Components

### Tools

The server implements one tool:
- **extract-pdf-contents**: Extract contents from a local PDF file
  - Takes `pdf_path` as a required string argument (local file path)
  - Takes `pages` as an optional string argument (comma-separated page numbers, supports negative indexing like `-1` for last page)
  - Supports both PDF text extraction and OCR for scanned documents

## Installation for Claude Code CLI

### Prerequisites

- Python 3.11 or higher
- pip or conda
- Claude Code CLI installed (`claude` command)

### Step 1: Clone and Install

```bash
# Clone this fork
git clone https://github.com/lh/mcp-pdf-extraction-server.git
cd mcp-pdf-extraction-server

# Install in development mode
pip install -e .
```

### Step 2: Find the Installed Command

```bash
# Check where pdf-extraction was installed
which pdf-extraction
# Example output: /opt/homebrew/Caskroom/miniconda/base/bin/pdf-extraction
```

### Step 3: Add to Claude Code

```bash
# Add the server using the full path from above
claude mcp add pdf-extraction /opt/homebrew/Caskroom/miniconda/base/bin/pdf-extraction

# Verify it was added
claude mcp list
```

### Step 4: Use in Claude

```bash
# Start a new Claude session
claude

# In Claude, type:
/mcp

# You should see:
# MCP Server Status
# • pdf-extraction: connected
```

## Usage Example

Once connected, you can ask Claude to extract PDF contents:

```
"Can you extract the content from the PDF at /path/to/document.pdf?"

"Extract pages 1-3 and the last page from /path/to/document.pdf"
```

## Troubleshooting

### Server Not Connecting

1. Make sure you started a NEW Claude session after adding the server
2. Verify the command path is correct: `ls -la $(which pdf-extraction)`
3. Test the command directly (it should hang waiting for input): `pdf-extraction`

### Module Not Found Errors

If you get Python import errors:
1. Make sure you're using the same Python environment where you installed the package
2. Try using the full Python path: `claude mcp add pdf-extraction /path/to/python -m pdf_extraction`

### Installation Issues

If `pip install -e .` fails:
1. Make sure you have Python 3.11+: `python --version`
2. Try creating a fresh virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -e .
   ```

## For Claude Desktop Users

This fork is specifically for Claude Code CLI. If you're using Claude Desktop (the GUI app), please refer to the [original repository](https://github.com/xraywu/mcp-pdf-extraction-server) for installation instructions.

## Dependencies

- mcp>=1.2.0
- pypdf2>=3.0.1
- pytesseract>=0.3.10 (for OCR support)
- Pillow>=10.0.0
- pydantic>=2.10.1,<3.0.0
- pymupdf>=1.24.0

## Contributing

Contributions are welcome! The main change in this fork is the addition of `__main__.py` to make the package runnable as a module.

## License

Same as the original repository.

## Credits

Original server by [@xraywu](https://github.com/xraywu)
Claude Code fixes by [@lh](https://github.com/lh)