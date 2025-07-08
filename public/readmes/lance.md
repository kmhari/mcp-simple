# 🗄️ LanceDB MCP Server for LLMS

[![Node.js 18+](https://img.shields.io/badge/node-18%2B-blue.svg)](https://nodejs.org/en/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Model Context Protocol (MCP) server that enables LLMs to interact directly the documents that they have on-disk through agentic RAG and hybrid search in LanceDB. Ask LLMs questions about the dataset as a whole or about specific documents.

## ✨ Features

- 🔍 LanceDB-powered serverless vector index and document summary catalog.
- 📊 Efficient use of LLM tokens. The LLM itself looks up what it needs when it needs.
- 📈 Security. The index is stored locally so no data is transferred to the Cloud when using a local LLM.

## 🚀 Quick Start

To get started, create a local directory to store the index and add this configuration to your Claude Desktop config file:

**MacOS**: `~/Library/Application\ Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "lancedb": {
      "command": "npx",
      "args": [
        "lance-mcp",
        "PATH_TO_LOCAL_INDEX_DIR"
      ]
    }
  }
}
```

### Prerequisites

- Node.js 18+
- npx
- MCP Client (Claude Desktop App for example)
- Summarization and embedding models installed (see config.ts - by default we use Ollama models)
  - `ollama pull snowflake-arctic-embed2`
  - `ollama pull llama3.1:8b`

### Demo

<img src="https://github.com/user-attachments/assets/90bfdea9-9edd-4cf6-bb04-94c9c84e4825" width="50%">

#### Local Development Mode:

```json
{
  "mcpServers": {
    "lancedb": {
      "command": "node",
      "args": [
        "PATH_TO_LANCE_MCP/dist/index.js",
        "PATH_TO_LOCAL_INDEX_DIR"
      ]
    }
  }
}
```
Use `npm run build` to build the project.

Use `npx @modelcontextprotocol/inspector dist/index.js PATH_TO_LOCAL_INDEX_DIR` to run the MCP tool inspector.

### Seed Data

The seed script creates two tables in LanceDB - one for the catalog of document summaries, and another one - for vectorized documents' chunks.
To run the seed script use the following command:
```console
npm run seed -- --dbpath <PATH_TO_LOCAL_INDEX_DIR> --filesdir <PATH_TO_DOCS>
```

You can use sample data from the docs/ directory. Feel free to adjust the default summarization and embedding models in the config.ts file. If you need to recreate the index, simply rerun the seed script with the `--overwrite` option.

#### Catalog

- Document summary
- Metadata

#### Chunks

- Vectorized document chunk
- Metadata

## 🎯 Example Prompts

Try these prompts with Claude to explore the functionality:

```plaintext
"What documents do we have in the catalog?"
"Why is the US healthcare system so broken?"
```

## 📝 Available Tools

The server provides these tools for interaction with the index:

### Catalog Tools

- `catalog_search`: Search for relevant documents in the catalog

### Chunks Tools

- `chunks_search`: Find relevant chunks based on a specific document from the catalog
- `all_chunks_search`: Find relevant chunks from all known documents

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
