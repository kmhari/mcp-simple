# OpenMM Documentation MCP Server

A Model Context Protocol (MCP) server for searching OpenMM molecular dynamics simulation documentation. This server vectorizes documentation and provides semantic search capabilities optimized for integration with large language models (LLMs).

> 🌐 **Language/言語**: [English](README.md) | [日本語](README_ja.md)

## Overview

This MCP server allows natural language search through OpenMM documentation. It encodes documentation content into vector embeddings using modern language models and stores them in a FAISS vector database for efficient retrieval. When a query is received, the server finds the most semantically relevant documentation sections and returns them, making it particularly useful for:

- Finding relevant documentation on molecular dynamics methods
- Searching for usage instructions of OpenMM functions and classes
- Retrieving information about simulation parameters and settings
- Getting code examples and implementation details

## Features

- **Semantic Search**: Find documentation based on meaning, not just keywords
- **MCP Integration**: Fully compatible with Claude Desktop and other MCP-enabled applications
- **Multi-language Support**: Process queries in both English and Japanese
- **Efficient Retrieval**: Uses FAISS for high-performance vector similarity search
- **Customizable**: Configurable embedding models and search parameters

## Setup

### Prerequisites

- Python 3.9 or higher
- `uv` package manager (recommended) or `pip`
- Minimum 8GB RAM (16GB+ recommended for index creation)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/openMM-Doc-MCP.git
cd openMM-Doc-MCP

# Create and activate virtual environment using uv
uv venv

# Install dependencies with uv (recommended)
uv pip install -r requirements.txt

# Or, if using pip
# python -m venv .venv
# source .venv/bin/activate  # For Linux/macOS
# .venv\Scripts\activate     # For Windows
# pip install -r requirements.txt
```

### Creating the Index

Before using the server, you need to create a vector index of the OpenMM documentation:

```bash
uv run python create_faiss_index.py
```

Optional parameters:

```bash
# Specify a custom document directory
uv run python create_faiss_index.py --docs_dir "/path/to/docs"

# Specify a custom output directory
uv run python create_faiss_index.py --output_dir "/path/to/output"

# Specify a custom embedding model
uv run python create_faiss_index.py --embedding_model "intfloat/multilingual-e5-large"
```

Index creation may take some time and requires significant memory. By default, index files are created in the `data/indices/docs/` directory.

### Configuration

You can configure the server using environment variables:

```bash
# Set server port (default is 8080)
export MCP_SERVER_PORT=8888

# Set index directory (optional)
export MCP_INDEX_DIR="/path/to/custom/index"
```

For Windows:

```
set MCP_SERVER_PORT=8888
set MCP_INDEX_DIR=C:\path\to\custom\index
```

## Usage

### Starting the Server

```bash
uv run python server.py
```

By default, the server listens at http://localhost:8080.

### Command-line Search

You can directly search from the command line:

```bash
uv run python search_molecular_simulation.py "how to set up a water box simulation"
```

### HTTP Requests

You can also send HTTP requests to the server:

```
POST http://localhost:8080/query
Content-Type: application/json

{
  "query": "how to set up a water box simulation",
  "top_k": 5
}
```

## Claude Desktop Integration

### Setting up with Claude Desktop

Edit the Claude Desktop configuration file to add this MCP server. The configuration file path is:

- **macOS**:
  `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**:
  `%APPDATA%\Claude\claude_desktop_config.json`

Add the following JSON configuration (within the existing `mcpServers` object):

```json
{
  "mcpServers": {
    "OpenMM Documentation": {
      "command": "uv",
      "args": [
        "run",
        "--with",
        "mcp[cli]",
        "--with",
        "faiss-cpu",
        "--with",
        "langchain",
        "--with",
        "sentence-transformers",
        "mcp",
        "run",
        "/path/to/openMM-Doc-MCP/server.py"
      ]
    }
  }
}
```

Notes:
- If the `uv` command is not in your environment path, use an absolute path (e.g.: `/path/to/uv`).
- Replace `/path/to/openMM-Doc-MCP/server.py` with the absolute path to this script.
- Always use absolute paths, not relative paths.

### Troubleshooting Claude Desktop Connection

If Claude Desktop cannot connect to the MCP server:

1. Verify that the path to `server.py` in the configuration file is correct (absolute path)
2. Make sure `uv` is properly installed and accessible
3. Check system logs for any errors
4. Try restarting Claude Desktop after making changes to the configuration

## API Reference

This server implements the Model Context Protocol (MCP) and provides the following tools:

1. **search_documents**
   - Searches for similar documents based on a query string
   - Parameters:
     - `query`: The search query text (required)
     - `top_k`: Number of results to return (default 5)
     - `index_path`: Optional custom path to FAISS index
   - Returns: Dictionary containing search results with relevant document sections

2. **get_index_info**
   - Gets information about the currently loaded vector database index
   - Parameters:
     - `index_path`: Optional custom path to FAISS index
   - Returns: Dictionary containing index information

For detailed API specifications, see:
- [specs/apispec_en.md](specs/apispec_en.md)
- [specs/apispec_ja.md](specs/apispec_ja.md)

## Testing

This project includes tests for the vector database and MCP server.

### Running Tests

```bash
# Run all tests
uv run -m pytest

# Run specific tests
uv run -m pytest tests/test_server.py
uv run -m pytest src/vector_db/tests/

# Verbose output
uv run -m pytest tests/test_server.py -v
```

## Troubleshooting

### Common Issues

1. **Server Won't Start**
   - Check that dependencies are correctly installed
   - Verify that the port is not already in use
   - Check logs for specific error messages

2. **No Search Results Returned**
   - Verify that index files have been created correctly
   - Ensure that the query is not empty
   - Check that the index path is correct

3. **Memory Errors**
   - Index creation requires sufficient memory (16GB+ recommended)
   - If using large models, try switching to smaller ones

### Debugging

To enable detailed logging:

```bash
export DEBUG=true
uv run python server.py
```

### Test Execution Issues

1. **NumPy Errors**
   - If you encounter errors with `libgfortran.5.dylib`, running tests with `uv run` can resolve this
   - In some environments, you may need to install the library with `conda install -c conda-forge libgfortran`

2. **Tests Timeout**
   - Increase test timeout: `uv run -m pytest --timeout=30`

## Performance Tuning

### Latency Optimization

- Use smaller embedding models for faster inference
- Enable GPU acceleration with `faiss-gpu` (if you have compatible GPUs)
- Adjust chunk size and overlap parameters during indexing

### Memory Usage Optimization

For processing large document collections:

```bash
# Adjust chunk size in create_faiss_index.py
uv run python create_faiss_index.py --chunk_size 256 --chunk_overlap 20
```

## Directory Structure

```
openMM-Doc-MCP/
├── create_faiss_index.py   # Index creation script
├── search_molecular_simulation.py # CLI search utility
├── server.py               # MCP server implementation
├── data/
│   └── indices/
│       └── docs/           # Default location for index files
│           ├── index.faiss # FAISS index file
│           └── index.pkl   # Metadata pickle file
├── specs/
│   ├── apispec_en.md       # API specification (English)
│   └── apispec_ja.md       # API specification (Japanese)
├── src/
│   └── vector_db/          # Vector database related modules
│       ├── indexer.py      # Indexer implementation
│       ├── retriever.py    # Retriever implementation
│       └── tests/          # Vector DB tests
└── tests/
    └── test_server.py      # Server tests
```

## License

This project is provided under the [LICENSE](LICENSE).