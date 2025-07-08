# 🚀 Generate PR MCP

<div align="center">

![PR Generation Meme](https://i.imgflip.com/8i7s5k.jpg)

_When your PR description writes itself_

[![npm version](https://img.shields.io/npm/v/generate-pr-mcp.svg)](https://www.npmjs.com/package/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

</div>

## 📋 Overview

A Model Context Protocol server that automatically generates detailed Pull Request descriptions from your code changes. Say goodbye to writing PR descriptions manually!

## ✨ Features

- 🔍 Analyzes git diffs to create comprehensive PR descriptions
- 📊 Highlights key implementation points and code changes
- 🧩 Modular template architecture for customized PR generation
- 🔎 Automatic project type detection
- 📝 Generates markdown files for easy sharing
- 🖼️ Support for including before/after screenshots

## 🛠️ Installation

```bash
# Install globally
npm install -g generate-pr-mcp

# Or use with npx
npx generate-pr-mcp
```

## configuration with cursor

````bash
# get the path to the generate-pr-mcp package

npm list -g generate-pr-mcp --parseable

## output => /Users/username/.nvm/versions/node/v22.14.0/lib/node_modules/generate-pr-mcp/build/index.js

```json
{
  "mcpServers": {
    "generate-pr-mcp": {
      "command": "node",
      "args": [
        "/Users/username /.nvm/versions/node/v22.14.0/lib/node_modules/generate-pr-mcp/build/index.js"
      ]
    }
  }
}
````

## 🚦 Usage

Run the MCP server in your project directory:

```bash
# If installed globally
mcp-server

# Or with npx
npx generate-pr-mcp
```

### 📝 Example Output

The tool generates a structured PR document including:

- PR title and description
- Summary of changes
- Key implementation points
- Code highlights
- Testing instructions

## 🔄 How It Works

1. Detects the current git branch and finds the base branch (main/master)
2. Analyzes the diff between branches or staged changes
3. Processes the diff to identify key changes
4. Generates a formatted PR description using templates
5. Saves the output to a markdown file

## 🧪 Supported Project Types

The tool automatically detects and optimizes PR descriptions for:

- JavaScript/TypeScript projects
- React applications
- Node.js backends
- And more!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
