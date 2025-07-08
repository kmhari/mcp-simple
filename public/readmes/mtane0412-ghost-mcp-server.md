# Ghost MCP Server

A Model Context Protocol (MCP) server that integrates with the Ghost Admin API. This server enables programmatic access to Ghost CMS features including post management, page management, member management, and more.

## Features

- Post Management (create, read, update, delete, search)
- Page Management (create, read, update, delete)
- Tag Management
- Author Management
- Member Management (create, read, update, delete, search)
- Image Upload Support

## Prerequisites

- Node.js (v18 or higher recommended)
- Ghost CMS instance
- Ghost Admin API key

## Installation

Install the package using npm:

```bash
npm install @mtane0412/ghost-mcp-server
```

## Configuration

1. Create a new custom integration in your Ghost Admin dashboard under Settings > Integrations.

2. Set the following environment variables:

```bash
# macOS/Linux
export GHOST_URL="https://your-ghost-blog.com"
export GHOST_ADMIN_API_KEY="your_admin_api_key"

# Windows (PowerShell)
$env:GHOST_URL="https://your-ghost-blog.com"
$env:GHOST_ADMIN_API_KEY="your_admin_api_key"
```

Alternatively, you can create a `.env` file:

```env
GHOST_URL=https://your-ghost-blog.com
GHOST_ADMIN_API_KEY=your_admin_api_key
```

## Usage

After installation, start the server with:

```bash
npx @mtane0412/ghost-mcp-server
```

## Available Tools

### get_posts
Retrieves a list of blog posts.

Input:
```json
{
  "limit": "number", // Optional: Number of posts to retrieve (1-100, default: 10)
  "page": "number"   // Optional: Page number (default: 1)
}
```

### get_post
Retrieves a specific post by ID.

Input:
```json
{
  "id": "string" // Required: Post ID
}
```

### search_posts
Searches for posts.

Input:
```json
{
  "query": "string", // Required: Search query
  "limit": "number"  // Optional: Number of posts to retrieve (1-100, default: 10)
}
```

### create_post
Creates a new post.

Input:
```json
{
  "title": "string",     // Required: Post title
  "html": "string",      // Optional: HTML content
  "lexical": "string",   // Optional: Lexical content
  "status": "string",    // Optional: Post status (published/draft/scheduled)
  "visibility": "string" // Optional: Visibility level (public/members/paid/tiers)
}
```

### update_post
Updates an existing post.

Input:
```json
{
  "id": "string",       // Required: Post ID
  "title": "string",    // Optional: Post title
  "html": "string",     // Optional: HTML content
  "lexical": "string",  // Optional: Lexical content
  "status": "string"    // Optional: Post status
}
```

### delete_post
Deletes a post.

Input:
```json
{
  "id": "string" // Required: Post ID
}
```

### get_pages
Retrieves a list of pages.

Input:
```json
{
  "limit": "number",     // Optional: Number of pages to retrieve (1-100, default: 10)
  "page": "number",      // Optional: Page number (default: 1)
  "order": "string",     // Optional: Sort order
  "formats": ["string"], // Optional: Content formats (html/mobiledoc/lexical)
  "include": ["string"]  // Optional: Related data to include (authors/tags)
}
```

### get_members
Retrieves a list of members.

Input:
```json
{
  "limit": "number",     // Optional: Number of members to retrieve (1-100, default: 10)
  "page": "number",      // Optional: Page number (default: 1)
  "order": "string",     // Optional: Sort order
  "include": ["string"]  // Optional: Related data to include (labels/newsletters)
}
```

### search_members
Searches for members.

Input:
```json
{
  "query": "string",     // Required: Search query
  "limit": "number",     // Optional: Number of members to retrieve (1-100, default: 10)
  "include": ["string"]  // Optional: Related data to include (labels/newsletters)
}
```

### upload_image
Uploads an image.

Input:
```json
{
  "file": "string",   // Required: Base64 encoded image data
  "purpose": "string" // Optional: Image purpose (image/profile_image/icon)
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspect
```

The Inspector will provide a URL to access debugging tools in your browser.

## License

MIT License