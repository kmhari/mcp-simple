# Zendesk MCP Server KON

[한국어](README.ko.md)

This project is a fork of [reminia/zendesk-mcp-server](https://github.com/reminia/zendesk-mcp-server) with modifications to support additional features and improvements.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

A Model Context Protocol server for Zendesk.

This server provides a comprehensive integration with Zendesk. It offers:

- Tools for retrieving and managing Zendesk tickets and comments
- Tools for managing community posts, comments, and topics
- Specialized prompts for ticket analysis and response drafting
- Full access to the Zendesk Help Center articles as knowledge base

## Setup

1. Install the package:
```bash
uv venv && uv pip install -e .
```

2. Configure in Claude desktop:
```json
{
  "mcpServers": {
    "zendesk": {
      "command": "uv",
      "args": [
        "--directory",
        "/path/to/zendesk-mcp-server-kon",
        "run",
        "zendesk"
      ],
      "env": {
        "ZENDESK_SUBDOMAIN": "your-zendesk-subdomain",
        "ZENDESK_EMAIL": "your-zendesk-email",
        "ZENDESK_API_KEY": "your-zendesk-api-key"
      }
    }
  }
}
```

Replace the environment variables with your Zendesk credentials:
- `ZENDESK_SUBDOMAIN`: Your Zendesk subdomain (e.g., if your Zendesk URL is `company.zendesk.com`, use `company`)
- `ZENDESK_EMAIL`: Your Zendesk admin email address
- `ZENDESK_API_KEY`: Your Zendesk API token

## Resources

- zendesk://knowledge-base, get access to the whole help center articles.

## Prompts

### analyze-ticket

Analyze a Zendesk ticket and provide a detailed analysis of the ticket.

### draft-ticket-response

Draft a response to a Zendesk ticket.

## Tools

### Ticket Management

#### get_ticket
Retrieve a Zendesk ticket by its ID
- Input:
  - `ticket_id` (integer): The ID of the ticket to retrieve

#### get_ticket_comments
Retrieve all comments for a Zendesk ticket by its ID
- Input:
  - `ticket_id` (integer): The ID of the ticket to get comments for

#### create_ticket_comment
Create a new comment on an existing Zendesk ticket
- Input:
  - `ticket_id` (integer): The ID of the ticket to comment on
  - `comment` (string): The comment text/content to add
  - `public` (boolean, optional): Whether the comment should be public (defaults to true)

### Community Management

#### get_community_posts
Retrieve community posts with optional filtering and sorting
- Input:
  - `filter_by` (string, optional): Filter posts by status (planned, not_planned, completed, answered, none)
  - `sort_by` (string, optional): Sort posts by criteria (created_at, edited_at, updated_at, recent_activity, votes, comments)

#### get_community_post_comments
Retrieve a community post and all its comments
- Input:
  - `post_id` (integer): The ID of the post to retrieve comments for

#### create_community_post_comment
Create a new comment on a community post
- Input:
  - `post_id` (integer): ID of the post to comment on
  - `body` (string): Comment content
  - `author_id` (integer, optional): Comment author ID (only available for Help Center administrators)
  - `notify_subscribers` (boolean, optional): Whether to notify subscribers (defaults to true)

#### update_community_post_comment
Update a comment on a community post
- Input:
  - `post_id` (integer): ID of the post containing the comment
  - `comment_id` (integer): ID of the comment to update
  - `body` (string): Updated comment content

#### update_community_post
Update a community post
- Input:
  - `post_id` (integer): ID of the post to update
  - `title` (string, optional): Post title
  - `details` (string, optional): Post content (supports p, br, strong tags)
  - `topic_id` (integer, optional): ID of the topic this post belongs to
  - `status` (string, optional): Post status (planned, not_planned, answered, completed)

#### get_community_topics
Retrieve all community topics
- Returns a list of topics with their details including name, description, follower count, etc.
