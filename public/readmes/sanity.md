# Sanity MCP Server

This MCP server provides tools for interacting with Sanity.io content from Claude Desktop.

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your Sanity credentials:
```
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=your_dataset
SANITY_TOKEN=your_token
```

## Usage with Claude Desktop

1. In Claude Desktop, go to Settings > MCP Servers
2. Add a new server with these settings:
```json
{
  "command": "node",
  "args": ["src/sanity-mcp-server.ts"],
  "env": {
    "SANITY_PROJECT_ID": "your_project_id",
    "SANITY_DATASET": "your_dataset", 
    "SANITY_TOKEN": "your_token"
  }
}
```

## Available Tools

### Create Document
Creates a new document in Sanity

**Parameters:**
- `type`: Document type
- `content`: Document content

**Example:**
```json
{
  "type": "post",
  "content": {
    "title": "My Post",
    "body": [
      {
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Hello world!"
          }
        ]
      }
    ]
  }
}
```

### Edit Document
Edits an existing document

**Parameters:**
- `id`: Document ID
- `content`: Updated content

### List Documents
Lists documents of a specific type

**Parameters:**
- `type`: Document type
- `limit`: Maximum number of documents to return (default: 10)

### Get Schema
Gets a schema template based on an existing document

**Note:** For best results, manually create at least one document of each type before using this tool.

**Parameters:**
- `type`: Document type

## Example Usage

1. Create a new blog post:
```json
{
  "tool": "create-document",
  "arguments": {
    "type": "post",
    "content": {
      "title": "My First Post",
      "slug": "my-first-post",
      "body": [
        {
          "_type": "block",
          "children": [
            {
              "_type": "span",
              "text": "This is my first post!"
            }
          ]
        }
      ]
    }
  }
}
```

2. Edit an existing post:
```json
{
  "tool": "edit-document",
  "arguments": {
    "id": "post-id-123",
    "content": {
      "title": "Updated Title"
    }
  }
}
```

3. List recent posts:
```json
{
  "tool": "list-documents",
  "arguments": {
    "type": "post",
    "limit": 5
  }
}
```

4. Get schema for posts:
```json
{
  "tool": "get-schema",
  "arguments": {
    "type": "post"
  }
}
