<div align="center">
  <img src="assets/header.svg" alt="GitLab Kanban MCP" width="800">

  <div>
    <a href="README.md"><img src="https://img.shields.io/badge/english-document-white.svg" alt="EN doc"></a>
    <a href="README.ja.md"><img src="https://img.shields.io/badge/ドキュメント-日本語-white.svg" alt="JA doc"/></a>
  </div>

  <div>
    <a href="https://gitlab.com"><img src="https://img.shields.io/badge/GitLab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white" alt="GitLab"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"></a>
    <a href="https://github.com/modelcontextprotocol/sdk"><img src="https://img.shields.io/badge/MCP_SDK-0.6.0-blue?style=for-the-badge" alt="MCP SDK"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="MIT License"></a>
  </div>
</div>

# 🎯 GitLab Kanban MCP Server

A Model Context Protocol server for managing GitLab Kanban board operations.

## ✨ Features

### 🛠️ Available Tools

- `list_tasks` - Retrieve task list from project's Kanban board
- `create_task` - Create a new task on the Kanban board
- `update_task` - Update an existing task
- `delete_task` - Delete a task from the board
- `add_comment` - Add a comment to a task

## 🏗️ Project Structure

```
src/
├── api/
│   └── gitlab.ts      # GitLab API client and methods
├── config/
│   └── gitlab.ts      # GitLab configuration
├── tools/
│   ├── handlers.ts    # Tool handler implementations
│   └── schemas.ts     # Tool schema definitions
└── index.ts          # MCP server main entry point
```

## 🚀 Getting Started

### 📦 Installation

```bash
npm install
```

### 🔧 Configuration

Create a `.env` file with the following environment variables:

```env
GITLAB_TOKEN=your_gitlab_token
GITLAB_URL=your_gitlab_url  # default: https://gitlab.com
```

### 🛠️ Build

```bash
npm run build
```

For development with auto-rebuild:

```bash
npm run watch
```

## 🔍 Debugging

Since MCP servers communicate over stdio, we recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector):

```bash
npm run inspector
```

## 📝 Usage

### Cline Configuration

Add the following to your `cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "gitlab-kanban-mcp-server": {
      "command": "node",
      "args": ["path/to/gitlab-kanban-mcp-server/build/index.js"],
      "env": {
        "GITLAB_TOKEN": "your_gitlab_token",
        "GITLAB_URL": "your_gitlab_url"
      }
    }
  }
}
```

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m '✨ feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.
