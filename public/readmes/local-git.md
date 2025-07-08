# Local Git MCP Server

## Overview
A Python-based Git repository management server using the MCP (Message-based Communication Protocol) server framework.

## Features
- Create, manage, and interact with local Git repositories
- Validate repository names
- Perform Git operations:
  - Repository creation
  - Adding files
  - Committing changes
  - Pulling and pushing
  - Diff generation

## Dependencies
- GitPython
- Pydantic
- MCP Server
- Black (code formatting)
- isort (import sorting)

## Usage
Run the server with:
```bash
python git_server.py [--repositories-dir ./repositories]
```

## Development
- Code is automatically formatted using Black and isort
- GitHub Actions workflow for code formatting

## License
[ADD LICENSE INFORMATION IF APPLICABLE]
