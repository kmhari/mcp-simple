# SourceSync.ai MCP Server

[![smithery badge](https://smithery.ai/badge/@pbteja1998/sourcesyncai-mcp)](https://smithery.ai/server/@pbteja1998/sourcesyncai-mcp)

A Model Context Protocol (MCP) server implementation for the [SourceSync.ai](https://sourcesync.ai) API. This server allows AI models to interact with SourceSync.ai's knowledge management platform through a standardized interface.

## Features

- Manage namespaces for organizing knowledge
- Ingest content from various sources (text, URLs, websites, external services)
- Retrieve, update, and manage documents stored in your knowledge base
- Perform semantic and hybrid searches against your knowledge base
- Access document content directly from parsed text URLs
- Manage connections to external services
- Default configuration support for seamless AI integration

## Installation

### Running with npx

```bash
# Install and run with your API key and tenant ID
env SOURCESYNC_API_KEY=your_api_key npx -y sourcesyncai-mcp
```

### Installing via Smithery

To install sourcesyncai-mcp for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@pbteja1998/sourcesyncai-mcp):

```bash
npx -y @smithery/cli install @pbteja1998/sourcesyncai-mcp --client claude
```

### Manual Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/sourcesyncai-mcp.git
cd sourcesyncai-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Run the server
node dist/index.js
```

### Running on Cursor

To configure SourceSync.ai MCP in Cursor:

1. Open Cursor Settings
1. Go to `Features > MCP Servers`
1. Click `+ Add New MCP Server`
1. Enter the following:
   - Name: `sourcesyncai-mcp` (or your preferred name)
   - Type: `command`
   - Command: `env SOURCESYNCAI_API_KEY=your-api-key npx -y sourcesyncai-mcp`

After adding, you can use SourceSync.ai tools with Cursor's AI features by describing your knowledge management needs.

### Running on Windsurf

Add this to your `./codeium/windsurf/model_config.json`:

```json
{
  "mcpServers": {
    "sourcesyncai-mcp": {
      "command": "npx",
      "args": ["-y", "soucesyncai-mcp"],
      "env": {
        "SOURCESYNC_API_KEY": "your_api_key",
        "SOURCESYNC_NAMESPACE_ID": "your_namespace_id",
        "SOURCESYNC_TENANT_ID": "your_tenant_id"
      }
    }
  }
}
```

### Running on Claude Desktop

To use this MCP server with Claude Desktop:

1. Locate the Claude Desktop configuration file:

   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. Edit the configuration file to add the SourceSync.ai MCP server:

```json
{
  "mcpServers": {
    "sourcesyncai-mcp": {
      "command": "npx",
      "args": ["-y", "sourcesyncai-mcp"],
      "env": {
        "SOURCESYNC_API_KEY": "your_api_key",
        "SOURCESYNC_NAMESPACE_ID": "your_namespace_id",
        "SOURCESYNC_TENANT_ID": "your_tenant_id"
      }
    }
  }
}
```

3. Save the configuration file and restart Claude Desktop

## Configuration

### Environment Variables

#### Required

- `SOURCESYNC_API_KEY`: Your SourceSync.ai API key (required)

#### Optional

- `SOURCESYNC_NAMESPACE_ID`: Default namespace ID to use for operations
- `SOURCESYNC_TENANT_ID`: Your tenant ID (optional)

### Configuration Examples

Basic configuration with default values:

```bash
export SOURCESYNC_API_KEY=your_api_key
export SOURCESYNC_TENANT_ID=your_tenant_id
export SOURCESYNC_NAMESPACE_ID=your_namespace_id
```

## Available Tools

### Authentication

- `validate_api_key`: Validate a SourceSync.ai API key

```json
{
  "name": "validate_api_key",
  "arguments": {}
}
```

### Namespaces

- `create_namespace`: Create a new namespace
- `list_namespaces`: List all namespaces
- `get_namespace`: Get details of a specific namespace
- `update_namespace`: Update a namespace
- `delete_namespace`: Delete a namespace

```json
{
  "name": "create_namespace",
  "arguments": {
    "name": "my-namespace",
    "fileStorageConfig": {
      "provider": "S3_COMPATIBLE",
      "config": {
        "endpoint": "s3.amazonaws.com",
        "accessKey": "your_access_key",
        "secretKey": "your_secret_key",
        "bucket": "your_bucket",
        "region": "us-east-1"
      }
    },
    "vectorStorageConfig": {
      "provider": "PINECONE",
      "config": {
        "apiKey": "your_pinecone_api_key",
        "environment": "your_environment",
        "index": "your_index"
      }
    },
    "embeddingModelConfig": {
      "provider": "OPENAI",
      "config": {
        "apiKey": "your_openai_api_key",
        "model": "text-embedding-3-small"
      }
    },
    "tenantId": "tenant_XXX"
  }
}
```

```json
{
  "name": "list_namespaces",
  "arguments": {
    "tenantId": "tenant_XXX"
  }
}
```

```json
{
  "name": "get_namespace",
  "arguments": {
    "namespaceId": "namespace_XXX",
    "tenantId": "tenant_XXX"
  }
}
```

```json
{
  "name": "update_namespace",
  "arguments": {
    "namespaceId": "namespace_XXX",
    "tenantId": "tenant_XXX",
    "name": "updated-namespace-name"
  }
}
```

```json
{
  "name": "delete_namespace",
  "arguments": {
    "namespaceId": "namespace_XXX",
    "tenantId": "tenant_XXX"
  }
}
```

### Data Ingestion

- `ingest_text`: Ingest text content
- `ingest_urls`: Ingest content from URLs
- `ingest_sitemap`: Ingest content from a sitemap
- `ingest_website`: Ingest content from a website
- `ingest_notion`: Ingest content from Notion
- `ingest_google_drive`: Ingest content from Google Drive
- `ingest_dropbox`: Ingest content from Dropbox
- `ingest_onedrive`: Ingest content from OneDrive
- `ingest_box`: Ingest content from Box
- `get_ingest_job_run_status`: Get the status of an ingestion job run

```json
{
  "name": "ingest_text",
  "arguments": {
    "namespaceId": "your_namespace_id",
    "ingestConfig": {
      "source": "TEXT",
      "config": {
        "name": "example-document",
        "text": "This is an example document for ingestion.",
        "metadata": {
          "category": "example",
          "author": "AI Assistant"
        }
      }
    },
    "tenantId": "tenant_XXX"
  }
}
```

```json
{
  "name": "ingest_urls",
  "arguments": {
    "namespaceId": "your_namespace_id",
    "ingestConfig": {
      "source": "URLS",
      "config": {
        "urls": ["https://example.com/page1", "https://example.com/page2"],
        "metadata": {
          "source": "web",
          "category": "documentation"
        }
      }
    },
    "tenantId": "tenant_XXX"
  }
}
```

```json
{
  "name": "ingest_sitemap",
  "arguments": {
    "namespaceId": "your_namespace_id",
    "ingestConfig": {
      "source": "SITEMAP",
      "config": {
        "url": "https://example.com/sitemap.xml",
        "metadata": {
          "source": "sitemap",
          "website": "example.com"
        }
      }
    },
    "tenantId": "tenant_XXX"
  }
}
```

```json
{
  "name": "ingest_website",
  "arguments": {
    "namespaceId": "your_namespace_id",
    "ingestConfig": {
      "source": "WEBSITE",
      "config": {
        "url": "https://example.com",
        "maxDepth": 3,
        "maxPages": 100,
        "metadata": {
          "source": "website",
          "domain": "example.com"
        }
      }
    },
    "tenantId": "tenant_XXX"
  }
}
```

```json
{
  "name": "ingest_notion",
  "arguments": {
    "namespaceId": "your_namespace_id",
    "ingestConfig": {
      "source": "NOTION",
      "config": {
        "connectionId": "your_notion_connection_id",
        "metadata": {
          "source": "notion",
          "workspace": "My Workspace"
        }
      }
    },
    "tenantId": "your_tenant_id"
  }
}
```

```json
{
  "name": "ingest_google_drive",
  "arguments": {
    "namespaceId": "your_namespace_id",
    "ingestConfig": {
      "source": "GOOGLE_DRIVE",
      "config": {
        "connectionId": "connection_XXX",
        "metadata": {
          "source": "google_drive",
          "owner": "user@example.com"
        }
      }
    },
    "tenantId": "tenant_XXX"
  }
}
```

```json
{
  "name": "ingest_dropbox",
  "arguments": {
    "namespaceId": "your_namespace_id",
    "ingestConfig": {
      "source": "DROPBOX",
      "config": {
        "connectionId": "connection_XXX",
        "metadata": {
          "source": "dropbox",
          "account": "user@example.com"
        }
      }
    },
    "tenantId": "tenant_XXX"
  }
}
```

```json
{
  "name": "ingest_onedrive",
  "arguments": {
    "namespaceId": "your_namespace_id",
    "ingestConfig": {
      "source": "ONEDRIVE",
      "config": {
        "connectionId": "connection_XXX",
        "metadata": {
          "source": "onedrive",
          "account": "user@example.com"
        }
      }
    },
    "tenantId": "tenant_XXX"
  }
}
```

```json
{
  "name": "ingest_box",
  "arguments": {
    "namespaceId": "your_namespace_id",
    "ingestConfig": {
      "source": "BOX",
      "config": {
        "connectionId": "connection_XXX",
        "metadata": {
          "source": "box",
          "owner": "user@example.com"
        }
      }
    },
    "tenantId": "tenant_XXX"
  }
}
```

```json
{
  "name": "get_ingest_job_run_status",
  "arguments": {
    "namespaceId": "your_namespace_id",
    "ingestJobRunId": "ingest_job_run_XXX",
    "tenantId": "tenant_XXX"
  }
}
```

### Documents

- `getDocuments`: Retrieve documents with optional filters
- `updateDocuments`: Update document metadata
- `deleteDocuments`: Delete documents
- `resyncDocuments`: Resync documents
- `fetchUrlContent`: Fetch text content from document URLs

```json
{
  "name": "getDocuments",
  "arguments": {
    "namespaceId": "namespace_XXX",
    "tenantId": "tenant_XXX",
    "filterConfig": {
      "documentTypes": ["PDF"]
    },
    "includeConfig": {
      "parsedTextFileUrl": true
    }
  }
}
```

```json
{
  "name": "updateDocuments",
  "arguments": {
    "namespaceId": "namespace_XXX",
    "tenantId": "tenant_XXX",
    "documentIds": ["doc_XXX", "doc_YYY"],
    "filterConfig": {
      "documentIds": ["doc_XXX", "doc_YYY"]
    },
    "data": {
      "metadata": {
        "status": "reviewed",
        "category": "technical"
      }
    }
  }
}
```

```json
{
  "name": "deleteDocuments",
  "arguments": {
    "namespaceId": "namespace_XXX",
    "tenantId": "tenant_XXX",
    "documentIds": ["doc_XXX", "doc_YYY"],
    "filterConfig": {
      "documentIds": ["doc_XXX", "doc_YYY"]
    }
  }
}
```

```json
{
  "name": "resyncDocuments",
  "arguments": {
    "namespaceId": "namespace_XXX",
    "tenantId": "tenant_XXX",
    "documentIds": ["doc_XXX", "doc_YYY"],
    "filterConfig": {
      "documentIds": ["doc_XXX", "doc_YYY"]
    }
  }
}
```

```json
{
  "name": "fetchUrlContent",
  "arguments": {
    "url": "https://api.sourcesync.ai/v1/documents/doc_XXX/content?format=text",
    "apiKey": "your_api_key",
    "tenantId": "tenant_XXX"
  }
}
```

### Search

- `semantic_search`: Perform semantic search
- `hybrid_search`: Perform hybrid search (semantic + keyword)

```json
{
  "name": "semantic_search",
  "arguments": {
    "namespaceId": "your_namespace_id",
    "query": "example document",
    "topK": 5,
    "tenantId": "tenant_XXX"
  }
}
```

```json
{
  "name": "hybrid_search",
  "arguments": {
    "namespaceId": "your_namespace_id",
    "query": "example document",
    "topK": 5,
    "tenantId": "tenant_XXX",
    "hybridConfig": {
      "semanticWeight": 0.7,
      "keywordWeight": 0.3
    }
  }
}
```

### Connections

- `create_connection`: Create a new connection to an external service
- `list_connections`: List all connections
- `get_connection`: Get details of a specific connection
- `update_connection`: Update a connection
- `revoke_connection`: Revoke a connection

```json
{
  "name": "create_connection",
  "arguments": {
    "tenantId": "tenant_XXX",
    "namespaceId": "namespace_XXX",
    "name": "My Connection",
    "connector": "GOOGLE_DRIVE",
    "clientRedirectUrl": "https://your-app.com/callback"
  }
}
```

```json
{
  "name": "list_connections",
  "arguments": {
    "tenantId": "tenant_XXX",
    "namespaceId": "namespace_XXX"
  }
}
```

```json
{
  "name": "get_connection",
  "arguments": {
    "tenantId": "tenant_XXX",
    "namespaceId": "namespace_XXX",
    "connectionId": "connection_XXX"
  }
}
```

```json
{
  "name": "update_connection",
  "arguments": {
    "tenantId": "tenant_XXX",
    "namespaceId": "namespace_XXX",
    "connectionId": "connection_XXX",
    "name": "Updated Connection Name",
    "clientRedirectUrl": "https://your-app.com/updated-callback"
  }
}
```

```json
{
  "name": "revoke_connection",
  "arguments": {
    "tenantId": "tenant_XXX",
    "namespaceId": "namespace_XXX",
    "connectionId": "connection_XXX"
  }
}
```

## Example Prompts

Here are some example prompts you can use with Claude or Cursor after configuring the MCP server:

- "Search my SourceSync knowledge base for information about machine learning."
- "Ingest this article into my SourceSync knowledge base: [URL]"
- "Create a new namespace in SourceSync for my project documentation."
- "List all the documents in my SourceSync namespace."
- "Get the text content of document [document_id] from my SourceSync namespace."

## Troubleshooting

### Connection Issues

If you encounter issues connecting the SourceSync.ai MCP server:

1. **Verify Paths**: Ensure all paths in your configuration are absolute paths, not relative.
2. **Check Permissions**: Ensure the server file has execution permissions (`chmod +x dist/index.js`).
3. **Enable Developer Mode**: In Claude Desktop, enable Developer Mode and check the MCP Log File.
4. **Test the Server**: Run the server directly from the command line:

   ```bash
   node /path/to/sourcesyncai-mcp/dist/index.js
   ```

5. **Restart AI Client**: After making changes, completely restart Claude Desktop or Cursor.
6. **Check Environment Variables**: Ensure all required environment variables are correctly set.

### Debug Logging

For detailed logging, add the DEBUG environment variable:

```

```

## Development

### Project Structure

- `src/index.ts`: Main entry point and server setup
- `src/schemas.ts`: Schema definitions for all tools
- `src/sourcesync.ts`: Client for interacting with SourceSync.ai API
- `src/sourcesync.types.ts`: TypeScript type definitions

### Building and Testing

```bash
# Build the project
npm run build

# Run tests
npm test
```

## License

MIT

## Links

- [SourceSync.ai Documentation](https://sourcesync.ai)
- [SourceSync.ai API Reference](https://sourcesync.ai/api-reference/authentication)
- [Model Context Protocol](https://modelcontextprotocol.io/introduction)

Document content retrieval workflow:

1. First, use `getDocuments` with `includeConfig.parsedTextFileUrl: true` to get documents with their content URLs
2. Extract the URL from the document response
3. Use `fetchUrlContent` to retrieve the actual content:

```json
{
  "name": "fetchUrlContent",
  "arguments": {
    "url": "https://example.com"
  }
}
```
