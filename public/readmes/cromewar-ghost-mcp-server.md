# Ghost MCP Server

A server that integrates Ghost CMS with Claude AI through the FastMCP framework.

## Requirements

- Python 3.11+
- [uv](https://github.com/astral-sh/uv) - Required to run this server

## Setup

1. Clone the repository
2. Create a virtual environment (optional but recommended):
   ```bash
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
3. Install dependencies using uv (dependencies are defined in pyproject.toml):
   ```bash
   uv pip install .
   ```
4. Set up environment variables by copying `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
5. Configure your `.env` file with your Ghost API credentials:
   ```
   GHOST_API_KEY=your_ghost_api_key_here
   GHOST_API_URL=https://your-ghost-blog.com/ghost/api/admin/posts
   GHOST_API_VERSION=v5.116.1
   ```

## Claude Desktop Configuration

To use this server with Claude Desktop, you need to configure it in Claude's MCP settings:

1. Open Claude Desktop
2. Go to Settings > Developer > MCP Servers
3. Add a new MCP Server configuration similar to:

```json
{
  "mcpServers": {
    "ghost-mcp": {
      "command": "/path/to/your/uv",
      "args": [
        "--directory",
        "/path/to/your/ghost-mcp",
        "run",
        "mcp_server.py"
      ]
    }
  }
}
```

Replace `/path/to/your/uv` with the actual path to your uv executable and `/path/to/your/ghost-mcp` with the absolute path to this project directory.

## Usage

Once configured, you can use the `ghost_post` tool from Claude to create blog posts directly in your Ghost CMS:

```
Create a blog post with title "My First Post" and content "Hello, world!"
```

The tool supports the following parameters:
- title: The title of the blog post
- content: Markdown content for the post
- author_id: ID of the author (default: "1")
- tags: List of tag names
- status: Post status (draft, published)
- feature_image: URL for the post's cover image
- code_language: Default language for code blocks
