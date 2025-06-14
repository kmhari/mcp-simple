# MCP Manager

Interactive CLI tool for managing MCP (Model Context Protocol) server configurations.

## Installation

### Global Installation (Recommended)

```bash
npm install -g mcp-manager
```

### Local Installation

```bash
npm install mcp-manager
```

## Usage

After global installation, you can run the tool from anywhere:

```bash
mcp-manager
```

Or if installed locally:

```bash
npx mcp-manager
```

## Features

- 📋 Interactive menu-driven interface
- 🔧 Pre-configured MCP servers (PostgreSQL, Redis, SQLite, and 50+ more)
- ➕ Add custom MCP servers
- ❌ Remove existing servers
- 📄 View current configuration
- 🎯 Automatic `.mcp.json` file management

## Pre-configured Servers

MCP Manager comes with 50+ pre-configured MCP servers including:

- **Databases**: PostgreSQL, Redis, SQLite, MySQL, MongoDB, DuckDB
- **Development Tools**: Git, GitHub, GitLab, Linear, Sentry
- **Cloud Services**: AWS (S3, EC2, Lambda), Google Cloud (BigQuery, Vertex AI)
- **File Systems**: Local filesystem, Google Drive, OneDrive
- **Communication**: Slack, Discord, Telegram
- **AI/ML**: OpenAI, Anthropic, Perplexity, Stable Diffusion
- **And many more...**

## Configuration

MCP Manager manages `.mcp.json` files in your current working directory. The configuration format is:

```json
{
  "mcpServers": {
    "serverName": {
      "command": "npx",
      "args": ["-y", "@package/name"],
      "env": {"KEY": "value"}
    }
  }
}
```

## Examples

### Adding a Pre-configured Server

1. Run `mcp-manager`
2. Select "Add a pre-configured MCP server"
3. Choose from the list (e.g., "PostgreSQL")
4. Follow the prompts for any required configuration

### Adding a Custom Server

1. Run `mcp-manager`
2. Select "Add a custom MCP server"
3. Enter the server name, command, and arguments
4. Optionally add environment variables

### Removing a Server

1. Run `mcp-manager`
2. Select "Remove an MCP server"
3. Choose the server to remove

## Development

```bash
# Clone the repository
git clone https://github.com/kmhari/mcp-simple.git
cd mcp-simple

# Install dependencies (if any)
npm install

# Run locally
node mcp-manager.js
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Hari ([@kmhari](https://github.com/kmhari))