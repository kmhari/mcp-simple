# WordPress MCP Server

A Model Context Protocol (MCP) server for interacting with WordPress sites. This server provides tools to fetch posts, pages, categories, and site information from any WordPress installation with REST API enabled.

## Prerequisites

- Python 3.13 
- WordPress site with REST API enabled
- UV package installer (recommended)

## Installation

1. Install UV (Universal Virtualenv):
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

2. Clone the repository:
```bash
git clone <repository-url>
cd wordpress
```

3. Create and activate a virtual environment:
```bash
uv venv
source .venv/bin/activate  # On Windows, use `.venv\Scripts\activate`
```

4. Install dependencies using UV:
```bash
uv add "mcp[cli]" httpx
```

## Configuration

1. Create a `.env` file in the project root:
```bash
WORDPRESS_URL="https://your-wordpress-site.com"
```

## Usage

Using Claude for Desktop:
   - First, start the server:
   ```bash
   uv run main.py
   ```
   - In Claude for Desktop, go to Settings > Developer
   - Click "Edit Config"
   - Alternative Edit config approach using VSCode in Mac/Windows:
       ```
       # For Mac Users
       code ~/Library/Application\ Support/Claude/claude_desktop_config.json
    
       # For Windows Users
       code $env:AppData\Claude\claude_desktop_config.json
       ```
   - Add the file to config:
   
    {
        "mcpServers": {
            "weather": {
                "command": "uv",
                "args": [
                    "--directory",
                    "/ABSOLUTE/PATH/TO/PARENT/FOLDER/wordpress",
                    "run",
                    "main.py"
                ]
            }
        }
    }

The server provides these testable tools:
- `fetch_wordpress_info`: Get basic site information
- `fetch_posts`: Get recent posts
- `fetch_categories`: List all categories
- `fetch_posts_by_category`: Get posts in a specific category
- `fetch_pages`: Get site pages
- `fetch_post_by_id`: Get a specific post
- `fetch_page_by_id`: Get a specific page

## Error Handling

The server includes robust error handling for:
- Invalid JSON responses
- Network errors
- WordPress API errors
- Invalid URLs
- API authentication issues
