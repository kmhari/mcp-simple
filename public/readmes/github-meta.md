# GitHub MCP Server

A Model Context Protocol (MCP) server that provides tools for interacting with GitHub's API. Currently supports creating repositories with descriptions, topics, and website URLs.

## Features

- Create GitHub repositories with auto-generated names from descriptions
- Add topics/tags to repositories
- Set repository homepages
- Auto-initialize repositories with README files

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Build the server:
```bash
npm run build
```

## Configuration

The server requires a GitHub personal access token with repository creation permissions. Add the following to your MCP settings file:

```json
{
  "mcpServers": {
    "github": {
      "command": "node",
      "args": ["path/to/github-server/build/index.js"],
      "env": {
        "GITHUB_TOKEN": "your-github-token"
      }
    }
  }
}
```

## Available Tools

### create_repo

Create or update GitHub repositories using natural language commands.

#### Command Format

The tool accepts natural language commands for different operations:

Creating repositories:
```
Create a repository for [description] with tags [tag1 tag2 tag3] website [url]
```
or
```
Make a new repository called [description] tagged with [tag1, tag2, tag3]
```

Updating repository description:
```
Update [owner/repo] description to [new description]
```
or
```
Change [repo-name] description as [new description]
```

Updating repository tags:
```
Update [owner/repo] tags to [tag1 tag2 tag3]
```
or
```
Set [repo-name] topics as [tag1, tag2, tag3]
```

Updating repository website:
```
Update [owner/repo] website to [url]
```
or
```
Set [repo-name] homepage as [url]
```

#### Example Usage

Creating a new repository:
```typescript
const result = await use_mcp_tool({
  server_name: "github",
  tool_name: "create_repo",
  arguments: {
    command: "Create a repository for my machine learning image classifier with tags python tensorflow computer-vision website https://example.com/docs"
  }
});
```

This will:
1. Create a repository named "my-machine-learning-image-classifier"
2. Set the description as "my machine learning image classifier"
3. Add "python", "tensorflow", and "computer-vision" as repository topics
4. Set the website to "https://example.com/docs"
5. Initialize with a README file

Updating repository description:
```typescript
const result = await use_mcp_tool({
  server_name: "github",
  tool_name: "create_repo",
  arguments: {
    command: "Update username/existing-repo description to Updated ML project for image classification"
  }
});
```

Updating repository tags:
```typescript
const result = await use_mcp_tool({
  server_name: "github",
  tool_name: "create_repo",
  arguments: {
    command: "Update username/existing-repo tags to machine-learning python updated"
  }
});
```

Updating repository website:
```typescript
const result = await use_mcp_tool({
  server_name: "github",
  tool_name: "create_repo",
  arguments: {
    command: "Update username/existing-repo website to https://example.com/new-docs"
  }
});
```

The tool understands various natural language patterns and keywords:
- Create/make/new for creating repositories
- Update/change/set/modify for updating repositories
- "description to/as" for updating descriptions
- "tags/topics to/as" for updating tags
- "website/homepage/url to/as" for updating websites

## Development

To modify or extend the server:

1. Make changes to `src/index.ts`
2. Rebuild the server:
```bash
npm run build
```

## License

MIT
