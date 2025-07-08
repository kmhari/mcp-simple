# Jira MCP Server

A modular, extensible Model Context Protocol (MCP) server for interacting with Jira Cloud. This project provides a set of tools to query boards, issues, user information, and more, making it easy to integrate Jira with AI agents, bots, or other automation systems.

## 🚀 Features

- List all available Jira scrum boards
- List your own issues for a specific board
- Add comments to Jira issues (ADF-compliant)
- Get current authenticated user information
- Search for users by login, email, or display name
- Get Jira server information (including server time)
- Modular, extensible, and easy to contribute

## 🛠️ Requirements

- Node.js 18+
- Access to a Jira Cloud instance
- Jira API Token (see [Jira API Tokens](https://id.atlassian.com/manage-profile/security/api-tokens))

## ⚙️ Environment Variables

Set the following environment variables in your shell or `.env` file:

```
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@company.com
JIRA_API_TOKEN=your-jira-api-token
```

## 🚀 Quick Start (with npx)

You can run the Jira MCP Server instantly with npx, no global install required:

```bash
npx -y @ahmetbarut/jira-mcp-server
```

Or, if you want to use it as an MCP tool in a config file (e.g. `mcp.json`):

```json
{
  "Jira MCP Server": {
    "command": "npx",
    "args": ["-y", "@ahmetbarut/jira-mcp-server"],
    "env": {
      "JIRA_BASE_URL": "https://your-domain.atlassian.net",
      "JIRA_EMAIL": "your-email@company.com",
      "JIRA_API_TOKEN": "your-jira-api-token"
    }
  }
}
```

- No need for `npm install` or global install.
- All dependencies are handled by `npx`.
- You can set your Jira credentials in the `env` section.

> **Note:** The first run may take a few seconds as `npx` downloads the package.

## 📦 Installation & Setup

1. **Clone the repository (optional):**
   ```bash
   git clone https://github.com/ahmetbarut/jira-mcp.git
   cd jira-mcp-server
   ```
2. **Install globally (optional):**
   ```bash
   npm install -g @ahmetbarut/jira-mcp-server
   ```
3. **Set environment variables:**
   - See above for required variables.
4. **Build the project (if using from source):**
   ```bash
   npm run build
   ```
5. **Run the server:**
   ```bash
   jira-mcp-server
   # or
   npx -y @ahmetbarut/jira-mcp-server
   ```

## 🧩 Usage

This server is designed to be used as an MCP tool server, typically via stdio. You can interact with it using the [Model Context Protocol Inspector](https://github.com/modelcontextprotocol/inspector) or integrate it into your own MCP-compatible agent.

### Example: List Boards
```bash
npx @modelcontextprotocol/inspector --cli npx -y @ahmetbarut/jira-mcp-server --method tools/call --tool-name get_boards
```

### Example: Get Your Issues for a Board
```bash
npx @modelcontextprotocol/inspector --cli npx -y @ahmetbarut/jira-mcp-server --method tools/call --tool-name get_issues --tool-arg boardId=123
```

### Example: Add a Comment to an Issue
```bash
npx @modelcontextprotocol/inspector --cli npx -y @ahmetbarut/jira-mcp-server --method tools/call --tool-name add_comment_to_issue --tool-arg issueIdOrKey=PROJ-123 --tool-arg body="This is a test comment."
```

## 🧰 Available Tools

- **get_boards**: List all available Jira scrum boards
- **get_issues**: List your issues for a specific board
- **add_comment_to_issue**: Add a comment to a Jira issue (ADF-compliant)
- **get_current_user_info**: Get current authenticated user information
- **search_user**: Search for a user by login, email, or display name
- **get_server_info**: Get Jira server information (including server time)

## 🏗️ Project Structure

- `src/index.ts` — Main server entry point and tool dispatcher
- `src/tools.ts` — Tool definitions and schemas
- `src/handlers.ts` — Tool handler implementations (business logic)
- `src/jiraApi.ts` — Jira API helpers and configuration
- `src/types.ts` — TypeScript types and interfaces

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b my-feature
   ```
3. **Write clear, well-documented code**
4. **Add or update tests** if applicable
5. **Open a pull request** with a clear description of your changes
6. **Ensure your code passes lint and build checks**

### Code Style
- Use TypeScript and follow the existing modular structure
- Keep business logic in `handlers.ts` and API helpers in `jiraApi.ts`
- Write clear commit messages

### Issues
If you find a bug or have a feature request, please open an issue on GitHub with as much detail as possible.

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

**Happy automating with Jira MCP Server!** 
