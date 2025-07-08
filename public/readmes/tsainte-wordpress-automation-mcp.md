# Wordpress Automation MCP

This is a [MCP tool](https://modelcontextprotocol.io/introduction) to interact with Wordpress posts. 

## Tech Stack
- Python 3.13
- UV

## Features
- Connect to WordPress sites using environment variables or direct credentials
- Create, read, update, and delete posts
- Support for post status (draft, publish, etc.)
- Pagination support for listing posts

## Usage

You must specify the environment variables in your MCP configuration:

```json 
{
    "mcpServers": {
        "wordpress": {
            "command": "uv",
            "args": [
                "--directory", 
                "/path/to/wordpress-automation-mcp",
                "run",
                "main.py"
            ],
            "env": {
                "WP_SITE_URL": "https://your-wordpress-site.com",
                "WP_USERNAME": "your-username",
                "WP_APP_PASSWORD": "your-app-password"
            }
        }
    }
  }
```