# duckdb-hybrid-doc-search

A tool for hybrid indexing of internal documents managed in Markdown using DuckDB with full-text search (FTS) + vector search (VSS), and making them callable from AI coding agents as an MCP stdio server.

## Features

- Advanced splitting and indexing of Markdown documents
- Hybrid search combining full-text search (FTS) and vector search (VSS)
- High-precision search using Japanese morphological analysis
- Search result re-ranking using CrossEncoder
- Integration with AI agents via MCP stdio server

## Usage

### Creating an Index

```bash
duckdb-hybrid-doc-search index docs/ handbook/ \
    --db index.duckdb
```

To use a different model, re-run the index command with a different model specified using the --embedding-model parameter.

```bash
duckdb-hybrid-doc-search index docs/ handbook/ \
    --db index.duckdb \
    --embedding-model cl-nagoya/ruri-v3-310m
```

You can also trim a prefix from file paths during indexing, which is useful when using Docker:

```bash
duckdb-hybrid-doc-search index docs/ handbook/ \
    --db index.duckdb \
    --trim-path-prefix "/app/"
```

### Starting the Server

By default, the server uses STDIO transport:

```bash
duckdb-hybrid-doc-search serve --db index.duckdb
```

You can customize the MCP tool name and description:

```bash
duckdb-hybrid-doc-search serve --db index.duckdb \
    --tool-name "my_search" \
    --tool-description "Search my documentation"
```

#### HTTP Transport Support

The server also supports HTTP-based transport:

```bash
duckdb-hybrid-doc-search serve --db index.duckdb \
    --transport streamable-http \
    --host 127.0.0.1 \
    --port 8765 \
    --path /mcp
```

### Changing the Model


## Docker

You can also use the Docker image:

```bash
docker pull ghcr.io/upamune/duckdb-hybrid-doc-search:latest
```

### Creating an Index with Docker

```bash
# Mount document directories and create an index
docker run -v /path/to/docs:/docs -v /path/to/output:/output \
    ghcr.io/upamune/duckdb-hybrid-doc-search:latest \
    index /docs --db /output/index.duckdb --embedding-model cl-nagoya/ruri-v3-310m
```

### Starting the MCP Server with Docker

#### STDIO Transport (Default)

```bash
# Mount only the index.duckdb file and start the server with STDIO transport
docker run -v /path/to/index.duckdb:/app/index.duckdb \
    ghcr.io/upamune/duckdb-hybrid-doc-search:latest \
    serve --db /app/index.duckdb --rerank-model cl-nagoya/ruri-v3-reranker-310m

# With custom tool name and description
docker run -v /path/to/index.duckdb:/app/index.duckdb \
    ghcr.io/upamune/duckdb-hybrid-doc-search:latest \
    serve --db /app/index.duckdb --rerank-model cl-nagoya/ruri-v3-reranker-310m \
    --tool-name "my_search" --tool-description "Search my documentation"
```

#### HTTP Transport

```bash
# Using Streamable HTTP transport
docker run -v /path/to/index.duckdb:/app/index.duckdb -p 8765:8765 \
    ghcr.io/upamune/duckdb-hybrid-doc-search:latest \
    serve --db /app/index.duckdb --rerank-model cl-nagoya/ruri-v3-reranker-310m \
    --transport streamable-http --host 0.0.0.0 --port 8765 --path /mcp
```

> **Note:** When running in Docker, use `--host 0.0.0.0` to make the server accessible from outside the container.

### Searching Documents with Docker

```bash
# Direct search with a specific query
docker run -v /path/to/index.duckdb:/app/index.duckdb -it \
    ghcr.io/upamune/duckdb-hybrid-doc-search:latest \
    search --db /app/index.duckdb --query "your search query" --rerank-model cl-nagoya/ruri-v3-reranker-310m

# Interactive search mode (when --query is omitted)
docker run -v /path/to/index.duckdb:/app/index.duckdb -it \
    ghcr.io/upamune/duckdb-hybrid-doc-search:latest \
    search --db /app/index.duckdb --rerank-model cl-nagoya/ruri-v3-reranker-310m
```

#### Path Manipulation in Search Results

You can manipulate file paths in search results using the following flags:

```bash
# Remove a prefix from file paths in search results
duckdb-hybrid-doc-search search --query "example" --remove-path-prefix "/app/"

# Add a prefix to file paths in search results
duckdb-hybrid-doc-search search --query "example" --add-path-prefix "docs/"

# Combine both: first remove, then add prefix
duckdb-hybrid-doc-search search --query "example" \
    --remove-path-prefix "/app/" \
    --add-path-prefix "docs/"
```

These flags are also available for the MCP server:

```bash
# Start server with path manipulation
duckdb-hybrid-doc-search serve --db index.duckdb \
    --remove-path-prefix "/app/" \
    --add-path-prefix "docs/"
```

### Using as an MCP Server with VS Code and Cursor

#### VS Code Configuration

To use as an MCP server with VS Code:

##### STDIO Transport (Default)

Create a `.vscode/mcp.json` file in your workspace:

```json
{
  "servers": [
    {
      "name": "DuckDB Hybrid Doc Search",
      "description": "Document search server for Markdown files",
      "connection": {
        "type": "stdio",
        "command": "docker",
        "args": [
          "run",
          "--rm",
          "-i",
          "-v", "${workspaceFolder}/index.duckdb:/app/index.duckdb",
          "ghcr.io/upamune/duckdb-hybrid-doc-search:latest",
          "serve",
          "--db", "/app/index.duckdb",
          "--rerank-model", "cl-nagoya/ruri-v3-reranker-310m",
          "--tool-name", "search_documents",
          "--tool-description", "Search for documentation"
        ]
      }
    }
  ]
}
```

##### HTTP Transport

For HTTP-based transport, use the `http` connection type:

```json
{
  "servers": [
    {
      "name": "DuckDB Hybrid Doc Search",
      "description": "Document search server with HTTP transport",
      "connection": {
        "type": "http",
        "url": "http://localhost:8765/mcp"
      }
    }
  ]
}
```

Then start the server separately with:

```bash
docker run -v ${workspaceFolder}/index.duckdb:/app/index.duckdb -p 8765:8765 \
  ghcr.io/upamune/duckdb-hybrid-doc-search:latest \
  serve --db /app/index.duckdb --rerank-model cl-nagoya/ruri-v3-reranker-310m \
  --transport streamable-http --host 0.0.0.0 --port 8765 --path /mcp
```

##### Using a Pre-indexed Image

```json
{
  "servers": [
    {
      "name": "DuckDB Hybrid Doc Search",
      "description": "Pre-indexed document search server",
      "connection": {
        "type": "stdio",
        "command": "docker",
        "args": [
          "run",
          "--rm",
          "-i",
          "your-org/doc-search-with-index:latest"
        ]
      }
    }
  ]
}
```

#### Cursor Configuration

To use as an MCP server with Cursor:

##### STDIO Transport (Default)

Create a `mcp.json` file in your workspace or add to your global configuration:

```json
{
  "mcpServers": {
    "duckdb-doc-search": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-v", "${workspaceFolder}/index.duckdb:/app/index.duckdb",
        "ghcr.io/upamune/duckdb-hybrid-doc-search:latest",
        "serve",
        "--db", "/app/index.duckdb",
        "--rerank-model", "cl-nagoya/ruri-v3-reranker-310m",
        "--tool-name", "search_documents",
        "--tool-description", "Search for documentation"
      ]
    }
  }
}
```

##### HTTP Transport

For HTTP-based transport, use the `url` property:

```json
{
  "mcpServers": {
    "duckdb-doc-search": {
      "url": "http://localhost:8765/mcp"
    }
  }
}
```

Then start the server separately with:

```bash
docker run -v ${workspaceFolder}/index.duckdb:/app/index.duckdb -p 8765:8765 \
  ghcr.io/upamune/duckdb-hybrid-doc-search:latest \
  serve --db /app/index.duckdb --rerank-model cl-nagoya/ruri-v3-reranker-310m \
  --transport streamable-http --host 0.0.0.0 --port 8765 --path /mcp
```

##### Using a Pre-indexed Image

```json
{
  "mcpServers": {
    "duckdb-doc-search": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "your-org/doc-search-with-index:latest"
      ]
    }
  }
}
```

## Practical Example: Creating and Distributing Docker Images with Pre-built Indexes

Here's a practical example for efficiently deploying document search within your organization by pre-building indexes and embedding them in Docker images.

### Creating a Docker Image with Pre-built Index

When using Docker, file paths in the index often include the container path (like `/app/docs/`), but you might want search results to show just `docs/`. The `--trim-path-prefix` parameter solves this by removing the specified prefix from file paths during indexing.

Create a `Dockerfile.with-index-args` file:

```dockerfile
# Use base image with build arguments
FROM ghcr.io/upamune/duckdb-hybrid-doc-search:latest AS builder

# Define build arguments with defaults
ARG DOCS_DIR=./docs
ARG MODEL=cl-nagoya/ruri-v3-310m

# Copy documents from specified directory
COPY ${DOCS_DIR} /docs

# Create index with specified model
RUN duckdb-hybrid-doc-search index /docs \
    --db /app/index.duckdb \
    --embedding-model ${MODEL} \
    --trim-path-prefix "/app/"

# Create final image
FROM ghcr.io/upamune/duckdb-hybrid-doc-search:latest

# Copy index file from builder
COPY --from=builder /app/index.duckdb /app/index.duckdb

# Set default command
CMD ["serve", "--db", "/app/index.duckdb", "--rerank-model", "cl-nagoya/ruri-v3-reranker-310m", "--tool-name", "search_documents", "--tool-description", "Search for documentation"]
```

Build and run:

```bash
# Build image for development documents
docker build -t your-org/doc-search-dev:latest \
  --build-arg DOCS_DIR=./docs-dev \
  --build-arg MODEL=cl-nagoya/ruri-v3-310m \
  -f Dockerfile.with-index-args .

# Build image for production documents
docker build -t your-org/doc-search-prod:latest \
  --build-arg DOCS_DIR=./docs-prod \
  --build-arg MODEL=cl-nagoya/ruri-v3-310m \
  -f Dockerfile.with-index-args .

# Push to your organization's registry
docker push your-org/doc-search-prod:latest

# Run with STDIO transport (default)
docker run your-org/doc-search-prod:latest

# Run with Streamable HTTP transport
docker run -p 8765:8765 -e TRANSPORT=streamable-http your-org/doc-search-prod:latest

# Run with custom HTTP settings
docker run -p 9000:9000 -e TRANSPORT=streamable-http -e PORT=9000 -e PATH=/api/mcp your-org/doc-search-prod:latest
```

This approach enables efficient deployment and management of document search systems within your organization.

## Development

This project uses [Task](https://taskfile.dev/) to manage build and development tasks.

### Setting Up Development Environment

```bash
task dev:setup
source .venv/bin/activate
```

### Running Tests

```bash
task test
```

### Running Linters

```bash
task lint
```

### Formatting Code

```bash
task format
```

### Creating Document Index

```bash
task run:index DIRS="docs/ handbook/"
```

### Starting the Server

```bash
task run:serve
```

### Running Search

```bash
task run:search
```

### Building and Running Docker Image

```bash
task docker:build
task docker:run CLI_ARGS="serve --db /app/index.duckdb"
```

### Listing Available Tasks

```bash
task
```

### Migration from Makefile

Previously, we used Makefile, but we've migrated to Task for more flexibility and features.
You can replace any `make` command with the corresponding `task` command.

## License

MIT
