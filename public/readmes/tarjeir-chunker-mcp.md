# Chunker

## Table of Contents

- [Chunker](#chunker)
- [Features](#features)
- [Installation](#installation)
  - [Using uv](#using-uv)
  - [Using pipx](#using-pipx)
- [Setting up ChromaDB with Docker](#setting-up-chromadb-with-docker)
- [Usage](#usage)
- [Usage (Installed CLI)](#usage-installed-cli)
- [Using Chunker MCP with Claude for Desktop](#using-chunker-mcp-with-claude-for-desktop)
- [Querying Chunks from the CLI](#querying-chunks-from-the-cli)
- [Querying](#querying)
- [Output](#output)
- [License](#license)

This tool chunks source code files using [LangChain's RecursiveCharacterTextSplitter](https://python.langchain.com/docs/modules/data_connection/document_transformers/recursive_text_splitter) and stores the resulting chunks in a [ChromaDB](https://www.trychroma.com/) vector database, including line range metadata for each chunk.

## Features

- Supports chunking of code files in any language supported by LangChain.
- Stores chunks with path and line range metadata for advanced querying.
- Asynchronous, batched insertion into ChromaDB for performance.
- Command-line interface using [Typer](https://typer.tiangolo.com/).
- Progress and status logging.

## Installation

### Using [uv](https://github.com/astral-sh/uv)

1. Install [uv](https://github.com/astral-sh/uv) if you don't have it:

   ```sh
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

2. Create a virtual environment and install dependencies:

   ```sh
   uv venv .venv
   source .venv/bin/activate
   uv sync
   ```

### Using [pipx](https://pypa.github.io/pipx/)

1. Install [pipx](https://pypa.github.io/pipx/):

   ```sh
   python -m pip install --user pipx
   ```

2. Install this project (from a local directory):

   ```sh
   pipx install --editable .
   ```

## Setting up ChromaDB with Docker

You can run a ChromaDB server using Docker. The following command will start ChromaDB listening on port 8000:

```sh
docker run -d --name chromadb -p 8000:8000 chromadb/chroma
```

- This will pull the latest ChromaDB image and run it in detached mode.
- The server will be accessible at `http://localhost:8000`.

If you want to persist data between restarts, you can mount a local directory:

```sh
docker run -d --name chromadb -p 8000:8000 -v $(pwd)/chroma-data:/chroma/.chroma chromadb/chroma
```

- This will store ChromaDB data in the `chroma-data` directory in your current folder.

**Stopping and removing the container:**

```sh
docker stop chromadb
docker rm chromadb
```

For more information, see the [ChromaDB Docker documentation](https://docs.trychroma.com/deployment/docker).

## Usage

```sh
python chunker.py chunk-and-vectorise <project_dir> "<pattern>" --language <language>
```

- `<project_dir>`: Root directory of the project to search for files (e.g., `.` or `src`)
- `<pattern>`: Glob pattern for files to process (e.g., `"*.py"`, `"src/**/*.js"`)
- `--language <language>`: Programming language for splitting (default: `python`). Must be supported by LangChain's `Language` enum.

Example for JavaScript files:

```sh
python chunker.py chunk-and-vectorise src "src/**/*.js" --language javascript
```

## Usage (Installed CLI)

If you have installed this project using `pipx` or `pip install`, the `chunker` command will be available on your PATH.

You can use it as follows:

```sh
chunker chunk-and-vectorise <project_dir> "<pattern>" --language <language>
```

- `<project_dir>`: Root directory of the project to search for files (e.g., `.` or `src`)
- `<pattern>`: Glob pattern for files to process (e.g., `"*.py"`, `"src/**/*.js"`)
- `--language <language>`: Programming language for splitting (default: `python`). Must be supported by LangChain's `Language` enum.

**Examples:**

Chunk all Python files in the current directory:
```sh
chunker chunk-and-vectorise . "*.py"
```

Chunk all JavaScript files in a subdirectory:
```sh
chunker chunk-and-vectorise src "src/**/*.js" --language javascript
```
If installed with pipx, you can run the CLI directly:

```sh
chunker chunk-and-vectorise "*.py" --language python
```

## Using Chunker MCP with Claude for Desktop

You can integrate the Chunker MCP with [Claude for Desktop](https://www.anthropic.com/claude) to enable code chunking and vectorisation directly from Claude's interface. The recommended way is to install the tool globally using `pipx` and configure Claude for Desktop to use the MCP protocol.

### 1. Install Chunker Globally with pipx

First, ensure you have [pipx](https://pypa.github.io/pipx/) installed:

```sh
python -m pip install --user pipx
pipx ensurepath
```

Then, install your chunker project globally (from your project directory):

```sh
pipx install --editable .
```

This will make the `chunker` command available globally.

### 2. Configure Claude for Desktop to Use the MCP Server

Claude for Desktop supports the `{"mcpServers":{}}` protocol for tool integration.  
Add the following to your Claude for Desktop configuration (or use the UI to add a new MCP server):

```json
{
  "mcpServers": {
    "chunker": {
      "command": "/<home DIR>/.local/bin/chunker",
      "args": [
        "chunk-and-vectorise-mcp",
        "--project_dir",
        "/path/to/your/project",
        "--chroma_host",
        "localhost",
        "--chroma_port",
        "8000",
        "--chroma_collection_name",
        "default"
      ]
    }
  }
}
```

- Replace `/<home DIR>` with your actual home directory (e.g., `/home/username` or `/Users/username`).
- Replace `/path/to/your/project` with the absolute path to your codebase.
- The `command` field should point to the full path of the installed `chunker` CLI, which is typically located at `~/.local/bin/chunker` when installed with pipx or pip.
- The `args` array specifies the subcommand and required arguments.

> **Note:** If `~/.local/bin` is in your system PATH, you can use `"chunker"` as the command instead of the full path.

- Replace `/path/to/your/project` with the absolute path to your codebase.
- The `chunker` command is provided globally by `pipx`.
- The `args` array specifies the subcommand and required arguments.

> **Note:** All four arguments (`--project_dir`, `--chroma_host`, `--chroma_port`, `--chroma_collection_name`) are now required for the MCP server to start.

### 3. Use the Tool in Claude

Once configured, you can invoke the chunker MCP tool from Claude for Desktop.  
Use the prompts and commands as described in the "Using the Chunker MCP" section above.

---


## Querying Chunks from the CLI

You can query your ChromaDB collection for relevant code chunks using the `query-chunks` command:

```sh
chunker query-chunks "your search query" --chroma-host <host> --chroma-port <port> --collection-name <name> --n-results <N>
```

- `"your search query"`: The text or code you want to search for.
- `--chroma-host`: ChromaDB host (default: 'localhost').
- `--chroma-port`: ChromaDB port (default: 8000).
- `--collection-name`: ChromaDB collection name (default: 'default').
- `--n-results`: Number of results to return (default: 10).

Example:

```sh
chunker query-chunks "def my_function" --n-results 5
```

---

## Querying

After vectorising your files, you can query your ChromaDB collection for relevant code chunks using the `chunker` CLI.

To search for code chunks matching an expression and include chunk metadata (such as file path and line range), use:

```sh
chunker query-chunks "some expression"
```

- `"some expression"`: The text or code you want to search for.

**Example:**

```sh
chunker query-chunks "def my_function"
```

This will return all code chunks containing `def my_function`, along with their file path and line range.

## Output

Chunks are stored in your configured ChromaDB collection, with metadata including:
- `path`: Full path to the source file
- `start`: Start line number (0-based)
- `end`: End line number (0-based)

## License

See [LICENSE](LICENSE).
