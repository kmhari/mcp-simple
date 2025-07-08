# Docswrite MCP Server

Docswrite created the first in the world MCP to write to Google Docs and turn the google docs into a perfectly formatted post on WordPress.

This server provides tools for working with Google Docs, Google Drive, and WordPress through Docswrite.

## Tools

### 1. Google Docs & Drive Tools

#### `google-docs-create`

Creates a new Google Docs document.

- `title`: The title of the new document
- `content`: The content to write to the document

#### `google-docs-update`

Updates an existing Google Docs document.

- `documentId`: The ID of the document to update
- `content`: The content to write to the document
- `replaceAll` (optional): Whether to replace all content (true) or append (false)

#### `google-docs-search`

Searches for Google Docs documents using Google Drive API.

- `query`: The search query to find documents
- Returns: List of documents with ID, name, creation time, and last modified time

#### `google-docs-delete`

Deletes a Google Docs document using Google Drive API.

- `documentId`: The ID of the document to delete

### 2. Docswrite Tools

#### `docswrite-publish`

Publishes content from Google Docs to WordPress.

- `google_docs_url` (required): URL of the Google Docs document
- `title` (optional): Title of the blog post
- `slug` (optional): URL slug for the post
- `tags` (optional): Comma-separated list of tags
- `categories` (optional): Comma-separated list of categories
- `state` (optional): Post state (draft/publish)
- `author` (optional): Author name
- `date` (optional): Publication date
- `excerpt` (optional): Post excerpt
- `post_type` (optional): Post type (post/page)
- `featured_image_url` (optional): URL of the featured image
- `featured_image_alt_text` (optional): Alt text for featured image
- `featured_image_caption` (optional): Caption for featured image
- `export_settings` (optional): Object containing:
  - `compress_images`: Boolean
  - `demote_headings`: Boolean
  - `convert_to_webp`: Boolean
  - `first_image_as_featured_image`: Boolean
  - `add_no_follow_to_external_links`: Boolean
  - `bold_as_strong`: Boolean
  - `wp_content_editor`: String
- `newspack_settings` (optional): Object containing:
  - `newspack_article_summary`: String
  - `newspack_article_summary_title`: String
  - `newspack_post_subtitle`: String
- `yoast_settings` (optional): Object containing:
  - `yoast_focuskw`: String
  - `yoast_metadesc`: String
  - `yoast_title`: String
- `rankmath_settings` (optional): Object containing:
  - `rank_math_focus_keyword`: String

#### `docswrite-job-status`

Checks the status of a Docswrite publishing job.

- `jobId`: The ID of the job to check
- `queueType` (optional): The type of queue (default: "post")

## Project Structure

### Source Files

- `src/index.ts`: Main server implementation and tool definitions

  - Initializes MCP server
  - Defines and registers all available tools
  - Handles command-line arguments and environment variables

- `src/auth.ts`: Google OAuth2 authentication handling

  - Manages OAuth2 flow for Google APIs
  - Handles token storage and refresh
  - Provides authorization for Google Docs and Drive APIs

- `src/google-docs.ts`: Google Docs and Drive API operations

  - Document creation and manipulation
  - Content updating and formatting
  - Document search and deletion
  - Error handling and response formatting

- `src/docswrite-request.ts`: Docswrite API integration

  - Handles requests to Docswrite service
  - Manages WordPress publishing queue
  - Job status checking and monitoring

- `src/oauth-server.ts`: OAuth callback server implementation

  - Handles OAuth2 callback from Google
  - Manages token exchange
  - Provides success/failure responses

- `src/config.ts`: Configuration management

  - Environment variables
  - API endpoints
  - Default settings

- `src/utils.ts`: Utility functions
  - Helper methods
  - Common operations
  - Shared types and interfaces

## Setup

1. Create a Google Cloud Project and enable:

   - Google Docs API
   - Google Drive API

2. Configure OAuth2 credentials:

   - Create OAuth2 credentials in Google Cloud Console
   - Download and save as `credentials.json` in project root
   - Set redirect URI to `http://localhost:3000/oauth2callback`

3. Install dependencies:

```bash
npm install
```

4. Build the project:

```bash
npm run build
```

## Usage

Run the server with your Docswrite token:

```bash
node dist/index.js --docswriteToken=your-docswrite-token
```

## Example Flows

### 1. Create and Publish Flow

```json
// 1. Create a new Google Doc
{
  "title": "My New Post",
  "content": "This is the content of my post."
}

// 2. Publish to WordPress
{
  "google_docs_url": "https://docs.google.com/document/d/your-doc-id/edit",
  "title": "My New Post",
  "state": "draft"
}

// 3. Check publishing status
{
  "jobId": "your-job-id"
}
```

### 2. Search and Update Flow

```json
// 1. Search for documents
{
  "query": "WordPress"
}

// 2. Update a document
{
  "documentId": "your-doc-id",
  "content": "Updated content",
  "replaceAll": true
}
```

### 3. Document Management Flow

```json
// 1. Create document
{
  "title": "Draft Post",
  "content": "Initial draft"
}

// 2. Update content
{
  "documentId": "your-doc-id",
  "content": "Additional content",
  "replaceAll": false
}

// 3. Publish to WordPress
{
  "google_docs_url": "https://docs.google.com/document/d/your-doc-id/edit",
  "title": "Final Post",
  "state": "publish",
  "categories": "tutorials",
  "tags": "wordpress, google-docs"
}
```
