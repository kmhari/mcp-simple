# Bounteous MCP Server

A Model Context Protocol (MCP) server implementation for Bounteous organization, enabling seamless integration between LLM applications and version control systems (GitHub and GitLab).

## Overview

This MCP server provides a standardized way to connect Large Language Models (LLMs) with version control systems, enabling powerful automation and integration capabilities. Built following the [Model Context Protocol](https://github.com/modelcontextprotocol) specifications.

## Features

### Version Control Integration
- **GitHub Integration**
  - Repository management
  - Issue tracking
  - Pull request handling
  - Code review workflows
  - Advanced search capabilities
  - Branch management
  - File operations

- **GitLab Integration**
  - Project management
  - Issue tracking
  - Merge request handling
  - Code review workflows
  - Repository operations
  - Branch management
  - File operations

### Common Features
- Automatic branch creation
- Comprehensive error handling
- Git history preservation
- Batch operations support
- File and directory management
- Code search capabilities

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- GitLab or GitHub account with appropriate permissions
- Personal Access Token for the respective service

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ravi-accolite/mcpserver.git
cd mcpserver
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

### Usage

#### Docker
```bash
# Build and run GitHub MCP Server
docker build -t mcp/github -f packages/bounteous-hulk/src/github/Dockerfile .
docker run -e GITHUB_PERSONAL_ACCESS_TOKEN=<your_token> mcp/github

# Build and run GitLab MCP Server
docker build -t mcp/gitlab -f packages/bounteous-hulk/src/gitlab/Dockerfile .
docker run -e GITLAB_PERSONAL_ACCESS_TOKEN=<your_token> -e GITLAB_API_URL=https://gitlab.com/api/v4 mcp/gitlab
```

#### NPX
```bash
# Run GitHub MCP Server
npx -y bounteous-hulk --github-token <your_token>

# Run GitLab MCP Server
npx -y bounteous-hulk --gitlab-token <your_token> --gitlab-api-url https://gitlab.com/api/v4
```

### Configuration (Local Setup)

Add the following to your `.cursor/mcp.json` (project level mcp server) or global level:

```json
{
    "mcpServers": {
        "bounteous-hulk": {
            "command": "node",
            "args": [
                "<ABSOLUTE_PATH>/mcpserver/packages/bounteous-hulk/dist/index.js"
            ],
            "env": {
                "GITHUB_PERSONAL_ACCESS_TOKEN": "<GITHUB_TOKEN>",
                "VERSION_CONTROL": "<OPTION>",
                "GITLAB_PERSONAL_ACCESS_TOKEN": "<GITLAB_TOKEN>",
                "GITLAB_API_URL": "<API_URL>"
            }
        }
    }
}
```
Different `VERSION_CONTROL` value possible: `github`, `gitlab`


### Configuration with Docker

Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "mcp/github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>"
      }
    },
    "gitlab": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-e",
        "GITLAB_PERSONAL_ACCESS_TOKEN",
        "-e",
        "GITLAB_API_URL",
        "mcp/gitlab"
      ],
      "env": {
        "GITLAB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>",
        "GITLAB_API_URL": "https://gitlab.com/api/v4"
      }
    }
  }
}
```

## Documentation

Detailed documentation for each MCP server is available in their respective directories:

- [GitHub MCP Server Documentation](packages/bounteous-hulk/README.md#github-mcp-server)
- [GitLab MCP Server Documentation](packages/bounteous-hulk/README.md#gitlab-mcp-server)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built using the [Model Context Protocol](https://github.com/modelcontextprotocol) specification
- Inspired by the MCP reference implementation and community servers

## Support

For support and questions, please create an issue in the repository or contact the Bounteous development team.

---
Built with ❤️ by Bounteous Development Team