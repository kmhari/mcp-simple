<div align="center">
  <img src="assets/header.svg" alt="Aira MCP Server" width="800" />

  # aira-mcp-server MCP Server

  <a href="README.md"><img src="https://img.shields.io/badge/english-document-white.svg" alt="EN doc"></a>
  <a href="README.ja.md"><img src="https://img.shields.io/badge/ドキュメント-日本語-white.svg" alt="JA doc"/></a>
</div>

A Model Context Protocol server for creating commit messages from git staged files

This is a TypeScript-based MCP server that implements a simple notes system. It demonstrates core MCP concepts by providing:

- Git status information retrieval
- Commit message creation with conventional commit format
- Gitflow initialization and management
- Branch operations (create, merge, list)

<a href="https://glama.ai/mcp/servers/dwd1o4okcw"><img width="380" height="200" src="https://glama.ai/mcp/servers/dwd1o4okcw/badge" alt="aira-mcp-server MCP server" /></a>

## 🚀 Features

- 📝 Conventional commit message generation
- 🌳 Gitflow workflow support
- 🔍 Git status checking
- 🔄 Branch management

## 🛠️ Installation

```bash
npm install
npm run build
```

## 📖 Usage

Configure the MCP server in your settings:

```json
{
  "mcpServers": {
    "aira": {
      "command": "node",
      "args": ["path/to/aira-mcp-server/build/index.js"]
    }
  }
}
```

## 🔧 Available Tools

### get_status
Retrieves Git status information.

### create_commit
Creates and executes a commit for specified files.

### init_gitflow
Initializes Gitflow.

### create_branch
Creates a new branch.

### merge_branch
Merges branches according to Gitflow.

### list_branches
Lists all Gitflow branches.

## 📄 License

MIT License
