# Meilisearch MCP Server (Go)

A Go-based wrapper for Meilisearch search engine that functions as a Model Context Protocol (MCP) server.

## Overview

This project is a Go application designed to enable the Meilisearch search engine to be used as an MCP (Model Context Protocol) server. Through the MCP server, large language models (LLMs) like Claude can access Meilisearch's powerful search capabilities.

## Features

- Lightweight and fast MCP server implemented in Go
- Seamless integration with Meilisearch API
- Interface compliant with the MCP protocol
- Support for key features including search, index management, and document operations

## Installation

### Prerequisites

- Go 1.24 or higher
- Running Meilisearch instance

### Build Instructions

```bash
# Clone the repository
git clone https://github.com/cnosuke/mcp-meilisearch.git
cd mcp-meilisearch

# Install dependencies
make deps

# Build
make bin/mcp-meilisearch
```

## Configuration

Use the `config.yml` file to configure connection settings to the Meilisearch server:

```yaml
meilisearch:
  host: http://localhost:7700 # Address of Meilisearch server
  api_key: '' # Set API key if needed
```

You can also configure using environment variables:

- `MEILISEARCH_HOST`: Address of Meilisearch server
- `MEILISEARCH_API_KEY`: Meilisearch API key

## Usage

### Starting the Server

```bash
./bin/mcp-meilisearch server --config config.yml
```

Options:

- `--no-logs`: Minimize log output (show errors only)
- `--log <file path>`: Output logs to the specified file

### Using with Claude Desktop

To integrate with Claude Desktop, add an entry to your `claude_desktop_config.json` file. **Because MCP uses stdio for communication, you must redirect logs away from stdio by using the `--no-logs` and `--log` flags.** Below is an example configuration that injects the SQLite file path via an environment variable:

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "./bin/mcp-meilisearch",
      "args": ["server", "--no-logs", "--log", "path_to_log_file"],
      "env": {
        "MEILISEARCH_HOST": "http://localhost:7700",
        "MEILISEARCH_API_KEY": "api_key"
      }
    }
  }
}
```

This configuration registers the MCP SQLite Server with Claude Desktop, ensuring that all logs are directed to the specified log file rather than interfering with the MCP protocol messages transmitted over stdio.

## Available Tools

This MCP server provides the following tools:

### Server Management

- `health_check`: Check the status of the Meilisearch server.
  - Parameters: None
  - Returns: Server health status information

### Index Management

- `list_indexes`: Retrieve a list of all indexes.

  - Parameters: None
  - Returns: Array of indexes

- `create_index`: Create a new index.
  - Parameters:
    - `uid`: Unique identifier for the index (required)
    - `primary_key`: Primary key for documents (optional)
  - Returns: Creation task information

### Document Operations

- `get_documents`: Retrieve documents from an index.

  - Parameters:
    - `index_uid`: Index UID (required)
    - `limit`: Maximum number of documents to retrieve (optional)
    - `offset`: Number of documents to skip (optional)
    - `fields`: Array of fields to retrieve (optional)
  - Returns: Array of documents

- `add_documents`: Add documents to an index.
  - Parameters:
    - `index_uid`: Index UID (required)
    - `documents`: Array of documents to add (required)
    - `primary_key`: Primary key (optional)
  - Returns: Addition task information

### Search

- `search`: Search for documents in an index.
  - Parameters:
    - `index_uid`: UID of the index to search (required)
    - `query`: Search query (required)
    - `limit`: Maximum number of results to return (optional)
    - `offset`: Number of results to skip (optional)
    - `filter`: Filter expression (optional)
    - `sort`: Array of sort criteria (optional)
  - Returns: Search results

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for improvements or bug fixes. For major changes, open an issue first to discuss your ideas.

## License

This project is licensed under the MIT License.

## Author

cnosuke (x.com/cnosuke)
