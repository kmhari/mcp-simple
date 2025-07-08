# doc-lib-mcp MCP server

A Model Context Protocol (MCP) server for document ingestion, chunking, semantic search, and note management.

## Components

### Resources

- Implements a simple note storage system with:
  - Custom `note://` URI scheme for accessing individual notes
  - Each note resource has a name, description, and `text/plain` mimetype

### Prompts

- Provides a prompt:
  - **summarize-notes**: Creates summaries of all stored notes
    - Optional "style" argument to control detail level (brief/detailed)
    - Generates prompt combining all current notes with style preference

### Tools

The server implements a wide range of tools:

- **add-note**: Add a new note to the in-memory note store
  - Arguments: `name` (string), `content` (string)
- **ingest-string**: Ingest and chunk a markdown or plain text string provided via message
  - Arguments: `content` (string, required), `source` (string, optional), `tags` (list of strings, optional)
- **ingest-markdown**: Ingest and chunk a markdown (.md) file
  - Arguments: `path` (string)
- **ingest-python**: Ingest and chunk a Python (.py) file
  - Arguments: `path` (string)
- **ingest-openapi**: Ingest and chunk an OpenAPI JSON file
  - Arguments: `path` (string)
- **ingest-html**: Ingest and chunk an HTML file
  - Arguments: `path` (string)
- **ingest-html-url**: Ingest and chunk HTML content from a URL (optionally using Playwright for dynamic content)
  - Arguments: `url` (string), `dynamic` (boolean, optional)
- **smart_ingestion**: Extracts all technically relevant content from a file using Gemini, then chunks it using robust markdown logic.
  - Arguments:
    - `path` (string, required): File path to ingest.
    - `prompt` (string, optional): Custom prompt to use for Gemini.
    - `tags` (list of strings, optional): Optional list of tags for classification.
  - Uses Gemini 2.0 Flash 001 to extract only code, configuration, markdown structure, and technical definitions (no summaries or commentary).
  - Passes the extracted content to a mistune 3.x-based chunker that preserves both code blocks and markdown/narrative content as separate chunks.
  - Each chunk is embedded and stored for semantic search and retrieval.
- **search-chunks**: Semantic search over ingested content
  - Arguments:
    - `query` (string): The semantic search query.
    - `top_k` (integer, optional, default 3): Number of top results to return.
    - `type` (string, optional): Filter results by chunk type (e.g., `code`, `html`, `markdown`).
    - `tag` (string, optional): Filter results by tag in chunk metadata.
  - Returns the most relevant chunks for a given query, optionally filtered by type and/or tag.
- **delete-source**: Delete all chunks from a given source
  - Arguments: `source` (string)
- **delete-chunk-by-id**: Delete one or more chunks by id
  - Arguments: `id` (integer, optional), `ids` (list of integers, optional)
  - You can delete a single chunk by specifying `id`, or delete multiple chunks at once by specifying `ids`.
- **update-chunk-type**: Update the type attribute for a chunk by id
  - Arguments: `id` (integer, required), `type` (string, required)
- **ingest-batch**: Ingest and chunk multiple documentation files (markdown, OpenAPI JSON, Python) in batch
  - Arguments: `paths` (list of strings)
- **list-sources**: List all unique sources (file paths) that have been ingested and stored in memory, with optional filtering by tag or semantic search.
  - Arguments:
    - `tag` (string, optional): Filter sources by tag in chunk metadata.
    - `query` (string, optional): Semantic search query to find relevant sources.
    - `top_k` (integer, optional, default 10): Number of top sources to return when using query.
- **get-context**: Retrieve relevant content chunks (content only) for use as AI context, with filtering by tag, type, and semantic similarity.
  - Arguments:
    - `query` (string, optional): The semantic search query.
    - `tag` (string, optional): Filter results by a specific tag in chunk metadata.
    - `type` (string, optional): Filter results by chunk type (e.g., 'code', 'markdown').
    - `top_k` (integer, optional, default 5): The number of top relevant chunks to retrieve.
- **update-chunk-metadata**: Update the metadata field for a chunk by id
  - Arguments: `id` (integer), `metadata` (object)
- **tag-chunks-by-source**: Adds specified tags to the metadata of all chunks associated with a given source (URL or file path). Merges with existing tags.
  - Arguments: `source` (string), `tags` (list of strings)
- **list-notes**: List all currently stored notes and their content.

#### Chunking and Code Extraction

- Markdown, Python, OpenAPI, and HTML files are split into logical chunks for efficient retrieval and search.
- The markdown chunker uses mistune 3.x's AST API and regex to robustly split content by code blocks and narrative, preserving all original formatting.
- Both code blocks and markdown/narrative content are preserved as separate chunks.
- The HTML chunker uses the `readability-lxml` library to extract main content first, then extracts block code snippets from `<pre>` tags as dedicated "code" chunks. Inline `<code>` content remains part of the narrative chunks.

#### Semantic Search

- The `search-chunks` tool performs vector-based semantic search over all ingested content, returning the most relevant chunks for a given query.
- Supports optional `type` and `tag` arguments to filter results by chunk type (e.g., `code`, `html`, `markdown`) and/or by tag in chunk metadata, before semantic ranking.
- This enables highly targeted retrieval, such as "all code chunks tagged with 'langfuse' relevant to 'cost and usage'".

#### Metadata Management

- Chunks include a `metadata` field for categorization and tagging.
- The `update-chunk-metadata` tool allows updating metadata for any chunk by its id.
- The `tag-chunks-by-source` tool allows adding tags to all chunks from a specific source in one operation. Tagging merges new tags with existing ones, preserving previous tags.

## Configuration

The server requires the following environment variables (can be set in a .env file):

### Ollama Configuration
- OLLAMA_HOST: Hostname for Ollama API (default: localhost)
- OLLAMA_PORT: Port for Ollama API (default: 11434)
- RAG_AGENT: Ollama model to use for RAG responses (default: llama3)
- OLLAMA_MODEL: Ollama model to use for embeddings (default: nomic-embed-text-v2-moe)

### Database Configuration
- HOST: PostgreSQL database host (default: localhost)
- DB_PORT: PostgreSQL database port (default: 5432)
- DB_NAME: PostgreSQL database name (default: doclibdb)
- DB_USER: PostgreSQL database user (default: doclibdb_user)
- DB_PASSWORD: PostgreSQL database password (default: doclibdb_password)

### Reranker Configuration
- RERANKER_MODEL_PATH: Path to the reranker model (default: /srv/samba/fileshare2/AI/models/bge-reranker-v2-m3)
- RERANKER_USE_FP16: Whether to use FP16 for reranker (default: True)

## Quickstart

### Install

#### Claude Desktop

On MacOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

<details>
  <summary>Development/Unpublished Servers Configuration</summary>
  ```
  "mcpServers": {
    "doc-lib-mcp": {
      "command": "uv",
      "args": [
        "--directory",
        "/home/administrator/python-share/doc-lib-mcp",
        "run",
        "doc-lib-mcp"
      ]
    }
  }
  ```
</details>

<details>
  <summary>Published Servers Configuration</summary>
  ```
  "mcpServers": {
    "doc-lib-mcp": {
      "command": "uvx",
      "args": [
        "doc-lib-mcp"
      ]
    }
  }
  ```
</details>

## Development

### Building and Publishing

To prepare the package for distribution:

1. Sync dependencies and update lockfile:
```bash
uv sync
```

2. Build package distributions:
```bash
uv build
```

This will create source and wheel distributions in the `dist/` directory.

3. Publish to PyPI:
```bash
uv publish
```

Note: You'll need to set PyPI credentials via environment variables or command flags:
- Token: `--token` or `UV_PUBLISH_TOKEN`
- Or username/password: `--username`/`UV_PUBLISH_USERNAME` and `--password`/`UV_PUBLISH_PASSWORD`

### Debugging

Since MCP servers run over stdio, debugging can be challenging. For the best debugging
experience, we strongly recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector).

You can launch the MCP Inspector via [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) with this command:

```bash
npx @modelcontextprotocol/inspector uv --directory /home/administrator/python-share/doc-lib-mcp run doc-lib-mcp
```

Upon launching, the Inspector will display a URL that you can access in your browser to begin debugging.
