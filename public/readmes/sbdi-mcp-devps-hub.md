# MCP DevOps Hub

MCP server for end-to-end development visibility (Jira, GitHub, CI/CD, etc.)

## Features

- Integration with Jira for issue tracking
- GitHub repository analysis and management
- CI/CD pipeline visibility
- Team notifications via Slack and MS Teams
- Code analysis using Groq AI

## Setup

1. Install dependencies:
```bash
scripts\setup-dev.bat
```

2. Copy `.env.example` to `.env` and configure your environment variables

3. Run the server:
```bash
mcp-devops-hub
```

## Development

Run tests:
```bash
scripts\test.bat
```