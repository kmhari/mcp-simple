# GitLab MCP Server

interact with a GitLab server.

This is a TypeScript-based MCP server that interacts with a self-hosted GitLab instance. The server provides tools to fetch and manage GitLab data, specifically projects, issues, and issue notes (comments). The available tools are: `list_projects`, `get_issues`, `get_issue_notes`, `search`, `get_issue`, `get_todos`, `get_wiki_page`, and `list_wiki_pages`.

## Features

This GitLab MCP server provides the following tools:

- **`list_projects`**: Lists all projects accessible to the user.
- **`get_issues`**: Gets issues for a specific project, with basic filtering.
- **`get_issue_notes`**: Gets notes (comments) for a specific issue.
- **`search`**: Searches for projects and issues based on a search term.
- **`get_issue`**: Retrieves a specific issue from a project using its ID and IID.
- **`get_todos`**: Retrieves a list of to-do items with optional filters.
- **`get_wiki_page`**: Retrieves a specific wiki page by project ID and slug.
- **`list_wiki_pages`**: Retrieves all wiki pages for a given project.

## Development

Install dependencies:

```bash
npm install
```

Build the server:

```bash
npm run build
```

For development with auto-rebuild:

```bash
npm run watch
```

## Installation

To use with Claude Desktop, add the server config:

```json
{
  "mcpServers": {
    "gitlab-server": {
      "command": "/path/to/gitlab-server/build/index.js"
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.

### GitLab API Documentation

https://gitlab.com/gitlab-org/gitlab/-/tree/master/doc/api
https://gitlab.com/gitlab-org/gitlab/-/raw/master/doc/api/rest/_index.md
https://gitlab.com/gitlab-org/gitlab/-/raw/master/doc/api/rest/authentication.md
https://gitlab.com/gitlab-org/gitlab/-/raw/master/doc/api/projects.md
https://gitlab.com/gitlab-org/gitlab/-/raw/master/doc/api/issues.md
https://gitlab.com/gitlab-org/gitlab/-/raw/master/doc/api/notes.md
https://gitlab.com/gitlab-org/gitlab/-/raw/master/doc/api/issue_links.md
https://gitlab.com/gitlab-org/gitlab/-/raw/master/doc/api/search.md
https://gitlab.com/gitlab-org/gitlab/-/raw/master/doc/api/wikis.md
