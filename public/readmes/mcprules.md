# MCPRules - Programming Guidelines Management Server

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-Enabled-green.svg)](https://github.com/modelcontextprotocol)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful Model Context Protocol (MCP) server that manages and serves programming guidelines and rules. This server integrates with development tools to provide consistent coding standards across projects.

## Features

- **Rule Management**
  - Access rules via MCP tools
  - Filter rules by categories
  - Support for both local and GitHub-hosted rules
  - Structured rule format with categories and key-value pairs

- **Flexible Storage**
  - Local file system support
  - GitHub repository integration
  - Markdown-based rule definitions

- **Category Organization**
  - Core Programming Principles
  - Code Style and Formatting
  - Language-Specific Guidelines
  - Project Management Rules
  - Operating System Specific Rules

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/MCPRules.git
   cd MCPRules/rules-server
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build the Server**
   ```bash
   npm run build
   ```

4. **Configure Environment Variables**
   ```bash
   export RULES_FILE_PATH=/path/to/your/rules.md
   # Optional for private GitHub repositories
   export GITHUB_TOKEN=your_github_token
   ```

## Configuration

### For VSCode Cline Extension
Location: `~/Library/Application Support/Windsurf/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json`

```json
{
  "mcpServers": {
    "rules": {
      "command": "node",
      "args": ["/path/to/rules-server/build/index.js"],
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

### For Claude Desktop
Location: `~/Library/Application Support/Claude/claude_desktop_config.json`

## Usage

### Available Tools

1. **Get Rules**
   ```typescript
   // Retrieve all rules or filter by category
   {
     "category": "optional-category-name"
   }
   ```

2. **Get Categories**
   ```typescript
   // List all available rule categories
   {}
   ```

### Rule Format
Rules are stored in markdown files with the following structure:

```markdown
#Category
key: value
```

## Development

- **Watch Mode**
  ```bash
  npm run watch
  ```

- **Debugging**
  ```bash
  npm run inspector
  ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Credits to the original rules from [Reddit discussion](https://www.reddit.com/r/Codeium/comments/1heztku/my_experience_with_windsurf_lets_make_it_better/)
- Thanks to the Model Context Protocol community