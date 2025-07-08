# PDF Search for Zed

A document search extension for Zed that lets you semantically search through a
PDF document and use the results in Zed's AI Assistant.

## Prerequisites

This extension currently requires:

1. An `OpenAI` API key (to generate embeddings)
2. `uv` installed on your system

**Note:** While the current setup requires an OpenAI API key for generating embeddings, we plan to implement a self-contained alternative in future versions. Community feedback will help prioritize these improvements.

## Quick Start

1. Clone the repository

```bash
git clone https://github.com/freespirit/pdfsearch-zed.git
```

2. Set up the Python environment for the MCP server:

```bash
cd pdfsearch-zed/pdf_rag
uv venv
uv sync
```

3. [Install Dev Extension](https://zed.dev/docs/extensions/developing-extensions) in Zed

4. Build the search db

```bash
cd /path/to/pdfsearch-zed/pdf_rag

echo "OPENAI_API_KEY=sk-..." > src/pdf_rag/.env

# This may take a couple of minutes, depending on the documents' size
# You can provide multiple files and directories as arguments.
#  - files would be chunked.
#  - a directory would be considered as if its files contains chunks.
#    E.g. they won't be further split.
uv run src/pdf_rag/rag.py build "file1.pdf" "dir1" "file2.md" ...
```

5. Configure Zed

```json
"context_servers": {
    "pdfsearch-context-server": {
        "settings": {
            "extension_path": "/path/to/pdfsearch-zed"
        }
    }
}
```

## Usage

1. Open Zed's AI Assistant panel
2. Type `/pdfsearch` followed by your search query
3. The extension will search the PDF and add relevant sections to the AI
   Assistant's context

## Future Improvements

- [x] Self-contained vector store
- [ ] Self-contained embeddings
- [ ] Automated index building on first run
- [ ] Configurable result size
- [x] Support for multiple PDFs
- [x] Optional: Additional file formats beyond PDF

## Project Structure

- `pdf_rag/`: Python-based MCP server implementation
- `src/`: Zed extension code
- `extension.toml` and `Cargo.toml`: Zed extension configuration files

## Known Limitations

- Manual index building is required before first use
- Requires external services (OpenAI)
