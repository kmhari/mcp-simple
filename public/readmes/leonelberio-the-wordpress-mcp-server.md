# WordPress MCP Server

A Model Context Protocol (MCP) server for WordPress integration, compatible with Windows, macOS, and Linux.

## Overview

This MCP server enables interaction with WordPress sites through the WordPress REST API. It provides tools for creating, retrieving, and updating posts using JSON-RPC 2.0 protocol.

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Build the project:
```bash
npm run build
```

## Configuration

Add the server to your MCP settings file with environment variables for WordPress credentials:

```json
{
  "mcpServers": {
    "wordpress": {
      "command": "node",
      "args": ["path/to/build/index.js"],
      "env": {
        "WORDPRESS_SITE_URL": "https://your-wordpress-site.com",
        "WORDPRESS_USERNAME": "your-username",
        "WORDPRESS_PASSWORD": "your-app-password"
      }
    }
  }
}
```

The environment variables are:
- WORDPRESS_SITE_URL: Your WordPress site URL
- WORDPRESS_USERNAME: WordPress username
- WORDPRESS_PASSWORD: WordPress application password

You can also provide these credentials in the request parameters if you prefer not to use environment variables.

## Available Methods

### create_post
Creates a new WordPress post.

Parameters:
- siteUrl: (optional if set in env) WordPress site URL
- username: (optional if set in env) WordPress username
- password: (optional if set in env) WordPress application password
- title: Post title
- content: Post content
- status: (optional) 'draft' | 'publish' | 'private' (default: 'draft')

### get_posts
Retrieves WordPress posts.

Parameters:
- siteUrl: (optional if set in env) WordPress site URL
- username: (optional if set in env) WordPress username
- password: (optional if set in env) WordPress application password
- perPage: (optional) Number of posts per page (default: 10)
- page: (optional) Page number (default: 1)

### update_post
Updates an existing WordPress post.

Parameters:
- siteUrl: (optional if set in env) WordPress site URL
- username: (optional if set in env) WordPress username
- password: (optional if set in env) WordPress application password
- postId: ID of the post to update
- title: (optional) New post title
- content: (optional) New post content
- status: (optional) 'draft' | 'publish' | 'private'

## Security Note

For security, it's recommended to use WordPress application passwords instead of your main account password. You can generate an application password in your WordPress dashboard under Users → Security → Application Passwords.

## Example Usage

Using environment variables:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "create_post",
  "params": {
    "title": "My New Post",
    "content": "Hello World!",
    "status": "draft"
  }
}
```

Without environment variables:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "create_post",
  "params": {
    "siteUrl": "https://your-wordpress-site.com",
    "username": "your-username",
    "password": "your-app-password",
    "title": "My New Post",
    "content": "Hello World!",
    "status": "draft"
  }
}
```

## Requirements

- Node.js 20.0.0 or higher
- WordPress site with REST API enabled
- WordPress application password for authentication

## License

MIT License - See LICENSE file for details
