# Atlassian Confluence MCP Server

A Node.js/TypeScript Model Context Protocol (MCP) server for Atlassian Confluence Cloud. Enables AI systems (e.g., LLMs like Claude or Cursor AI) to securely interact with your Confluence spaces, pages, and content in real time.

[![NPM Version](https://img.shields.io/npm/v/@aashari/mcp-server-atlassian-confluence)](https://www.npmjs.com/package/@aashari/mcp-server-atlassian-confluence)
[![Build Status](https://img.shields.io/github/workflow/status/aashari/mcp-server-atlassian-confluence/CI)](https://github.com/aashari/mcp-server-atlassian-confluence/actions)

## Why Use This Server?

- **Minimal Input, Maximum Output**: Simple identifiers provide comprehensive details without requiring extra flags.
- **Complete Knowledge Base Access**: Give AI assistants visibility into documentation, wikis, and knowledge base content.
- **Rich Content Formatting**: Automatic conversion of Atlassian Document Format to readable Markdown.
- **Secure Local Authentication**: Run locally with your credentials, never storing tokens on remote servers.
- **Intuitive Markdown Responses**: Well-structured, consistent Markdown formatting for all outputs.

## What is MCP?

Model Context Protocol (MCP) is an open standard for securely connecting AI systems to external tools and data sources. This server implements MCP for Confluence Cloud, enabling AI assistants to interact with your Confluence content programmatically.

## Prerequisites

- **Node.js** (>=18.x): [Download](https://nodejs.org/)
- **Atlassian Account** with access to Confluence Cloud

## Setup

### Step 1: Get Your Atlassian API Token

1. Go to your Atlassian API token management page: [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Click **Create API token**.
3. Give it a descriptive **Label** (e.g., `mcp-confluence-access`).
4. Click **Create**.
5. **Copy the generated API token** immediately. You won't be able to see it again.

### Step 2: Configure Credentials

#### Option A: MCP Config File (Recommended)

Edit or create `~/.mcp/configs.json`:

```json
{
	"confluence": {
		"environments": {
			"ATLASSIAN_SITE_NAME": "<YOUR_SITE_NAME>",
			"ATLASSIAN_USER_EMAIL": "<YOUR_ATLASSIAN_EMAIL>",
			"ATLASSIAN_API_TOKEN": "<YOUR_COPIED_API_TOKEN>"
		}
	}
}
```

- `<YOUR_SITE_NAME>`: Your Confluence site name (e.g., `mycompany` for `mycompany.atlassian.net`).
- `<YOUR_ATLASSIAN_EMAIL>`: Your Atlassian account email.
- `<YOUR_COPIED_API_TOKEN>`: The API token from Step 1.

#### Option B: Environment Variables

```bash
export ATLASSIAN_SITE_NAME="<YOUR_SITE_NAME>"
export ATLASSIAN_USER_EMAIL="<YOUR_EMAIL>"
export ATLASSIAN_API_TOKEN="<YOUR_API_TOKEN>"
```

### Step 3: Install and Run

#### Quick Start with `npx`

```bash
npx -y @aashari/mcp-server-atlassian-confluence ls-spaces
```

#### Global Installation

```bash
npm install -g @aashari/mcp-server-atlassian-confluence
mcp-atlassian-confluence ls-spaces
```

### Step 4: Connect to AI Assistant

Configure your MCP-compatible client (e.g., Claude, Cursor AI):

```json
{
	"mcpServers": {
		"confluence": {
			"command": "npx",
			"args": ["-y", "@aashari/mcp-server-atlassian-confluence"]
		}
	}
}
```

## MCP Tools

MCP tools use `snake_case` names, `camelCase` parameters, and return Markdown-formatted responses.

- **conf_ls_spaces**: Lists accessible Confluence spaces (`type`: str opt, `status`: str opt, `limit`: num opt, `cursor`: str opt). Use: View available spaces.
- **conf_get_space**: Gets detailed space information (`spaceKey`: str req). Use: Access space content and metadata.
- **conf_ls_pages**: Lists pages with filtering (`spaceIds`: str[] opt, `spaceKeys`: str[] opt, `title`: str opt, `status`: str[] opt, `sort`: str opt, `limit`: num opt, `cursor`: str opt). Use: Find pages matching criteria.
- **conf_get_page**: Gets comprehensive page content (`pageId`: str req). Use: View full page content as Markdown.
- **conf_ls_page_comments**: Lists comments on a page (`pageId`: str req). Use: Read page discussions.
- **conf_search**: Searches Confluence content (`cql`: str opt, `query`: str opt, `title`: str opt, `spaceKey`: str opt, `labels`: str[] opt, `contentType`: str opt, `limit`: num opt, `cursor`: str opt). Use: Find specific content.

<details>
<summary><b>MCP Tool Examples (Click to expand)</b></summary>

### `conf_ls_spaces`

**List Global Spaces:**
```json
{ "type": "global", "status": "current", "limit": 10 }
```

### `conf_get_space`

**Get Space Details:**
```json
{ "spaceKey": "DEV" }
```

### `conf_ls_pages`

**List Pages by Space and Title:**
```json
{
	"spaceKeys": ["DEV"],
	"title": "API Documentation",
	"status": ["current"],
	"sort": "-modified-date"
}
```

**List Pages from Multiple Spaces:**
```json
{
	"spaceKeys": ["DEV", "HR", "MARKETING"],
	"limit": 15,
	"sort": "-modified-date"
}
```

### `conf_get_page`

**Get Page Content:**
```json
{ "pageId": "12345678" }
```

### `conf_ls_page_comments`

**List Page Comments:**
```json
{ "pageId": "12345678" }
```

### `conf_search`

**Simple Search:**
```json
{
	"query": "release notes Q1",
	"spaceKey": "PRODUCT",
	"contentType": "page",
	"limit": 5
}
```

**Advanced CQL Search:**
```json
{ "cql": "space = DEV AND label = api AND created >= '2023-01-01'" }
```

</details>

## Transport Modes

This server supports two transport modes for different integration scenarios:

### STDIO Transport (Default for MCP Clients)
- Traditional subprocess communication via stdin/stdout
- Ideal for local AI assistant integrations (Claude Desktop, Cursor AI)
- Uses pipe-based communication for direct MCP protocol exchange

```bash
# Run with STDIO transport (default for AI assistants)
TRANSPORT_MODE=stdio npx @aashari/mcp-server-atlassian-confluence

# Using npm scripts (after installation)
npm run mcp:stdio
```

### HTTP Transport (Default for Server Mode)
- Modern HTTP-based transport with Server-Sent Events (SSE)
- Supports multiple concurrent connections
- Better for web-based integrations and development
- Runs on port 3000 by default (configurable via PORT env var)
- Endpoint: http://localhost:3000/mcp
- Health check: http://localhost:3000/

```bash
# Run with HTTP transport (default when no CLI args)
TRANSPORT_MODE=http npx @aashari/mcp-server-atlassian-confluence

# Using npm scripts (after installation)
npm run mcp:http

# Test with MCP Inspector
npm run mcp:inspect
```

### Environment Variables

**Transport Configuration:**
- `TRANSPORT_MODE`: Set to `stdio` or `http` (default: `http` for server mode, `stdio` for MCP clients)
- `PORT`: HTTP server port (default: 3000)
- `DEBUG`: Enable debug logging (default: false)

**Authentication:**
- `ATLASSIAN_SITE_NAME`: Your Confluence site name
- `ATLASSIAN_USER_EMAIL`: Your Atlassian account email
- `ATLASSIAN_API_TOKEN`: Your Atlassian API token

## CLI Commands

CLI commands use `kebab-case`. Run `--help` for details (e.g., `mcp-atlassian-confluence ls-spaces --help`).

- **ls-spaces**: Lists spaces (`--type`, `--status`, `--limit`, `--cursor`). Ex: `mcp-atlassian-confluence ls-spaces --type global`.
- **get-space**: Gets space details (`--space-key`). Ex: `mcp-atlassian-confluence get-space --space-key DEV`.
- **ls-pages**: Lists pages (`--space-keys`, `--title`, `--status`, `--sort`, `--limit`, `--cursor`). Ex: `mcp-atlassian-confluence ls-pages --space-keys DEV`.
- **get-page**: Gets page content (`--page-id`). Ex: `mcp-atlassian-confluence get-page --page-id 12345678`.
- **ls-page-comments**: Lists comments (`--page-id`). Ex: `mcp-atlassian-confluence ls-page-comments --page-id 12345678`.
- **search**: Searches content (`--cql`, `--query`, `--space-key`, `--label`, `--type`, `--limit`, `--cursor`). Ex: `mcp-atlassian-confluence search --query "security"`.

<details>
<summary><b>CLI Command Examples (Click to expand)</b></summary>

### List Spaces

**List Global Spaces:**
```bash
mcp-atlassian-confluence ls-spaces --type global --status current --limit 10
```

### Get Space

```bash
mcp-atlassian-confluence get-space --space-key DEV
```

### List Pages

**By Multiple Space Keys:**
```bash
mcp-atlassian-confluence ls-pages --space-keys DEV HR MARKETING --limit 15 --sort "-modified-date"
```

**With Title Filter:**
```bash
mcp-atlassian-confluence ls-pages --space-keys DEV --title "API Documentation" --status current
```

### Get Page

```bash
mcp-atlassian-confluence get-page --page-id 12345678
```

### List Page Comments

```bash
mcp-atlassian-confluence ls-page-comments --page-id 12345678
```

### Search

**Simple Search:**
```bash
mcp-atlassian-confluence search --query "security best practices" --space-key DOCS --type page --limit 5
```

**CQL Search:**
```bash
mcp-atlassian-confluence search --cql "label = official-docs AND creator = currentUser()"
```

</details>

## Response Format

All responses are Markdown-formatted, including:

- **Title**: Content type and name.
- **Content**: Full page content, search results, or list of items.
- **Metadata**: Creator, date, labels, and other relevant information.
- **Pagination**: Navigation information for paginated results.
- **Links**: References to related resources when applicable.

<details>
<summary><b>Response Format Examples (Click to expand)</b></summary>

### Space List Response

```markdown
# Confluence Spaces

Showing **5** global spaces (current)

| Key | Name | Description |
|---|---|---|
| [DEV](#) | Development | Engineering and development documentation |
| [HR](#) | Human Resources | Employee policies and procedures |
| [MARKETING](#) | Marketing | Brand guidelines and campaign materials |
| [PRODUCT](#) | Product | Product specifications and roadmaps |
| [SALES](#) | Sales | Sales processes and resources |

*Retrieved from mycompany.atlassian.net on 2025-05-19 14:22 UTC*

Use `cursor: "next-page-token-123"` to see more spaces.
```

### Page Content Response

```markdown
# API Authentication Guide

**Space:** [DEV](#) (Development)
**Created by:** Jane Smith on 2025-04-01
**Last updated:** John Doe on 2025-05-15
**Labels:** api, security, authentication

## Overview

This document outlines the authentication approaches supported by our API platform.

## Authentication Methods

### OAuth 2.0

We support the following OAuth 2.0 flows:

1. **Authorization Code Flow** - For web applications
2. **Client Credentials Flow** - For server-to-server
3. **Implicit Flow** - For legacy clients only

### API Keys

Static API keys are supported but discouraged for production use due to security limitations:

| Key Type | Use Case | Expiration |
|---|---|---|
| Development | Testing | 30 days |
| Production | Live systems | 90 days |

## Implementation Examples

  import requests

  def get_oauth_token():
      return requests.post(
          'https://api.example.com/oauth/token',
          data={
              'client_id': 'YOUR_CLIENT_ID',
              'client_secret': 'YOUR_CLIENT_SECRET',
              'grant_type': 'client_credentials'
          }
      ).json()['access_token']

*Retrieved from mycompany.atlassian.net on 2025-05-19 14:25 UTC*
```

</details>

## Development

```bash
# Clone repository
git clone https://github.com/aashari/mcp-server-atlassian-confluence.git
cd mcp-server-atlassian-confluence

# Install dependencies
npm install

# Run in development mode
npm run dev:server

# Run tests
npm test
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/xyz`).
3. Commit changes (`git commit -m "Add xyz feature"`).
4. Push to the branch (`git push origin feature/xyz`).
5. Open a pull request.

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

[ISC License](LICENSE)
