# Obsidian MCP REST Server

An MCP (Model Context Protocol) server implementation that provides access to Obsidian vaults through a local REST API. This server allows AI assistants to interact with Obsidian notes and manage vault content through a standardized interface.

## Features

- Access Obsidian vault contents through MCP
- Read and write notes
- List vault contents
- Search functionality
- Secure local REST API integration
- Compatible with Claude Desktop and other AI assistants

## Prerequisites

- Node.js 16 or higher
- Obsidian with Local REST API plugin installed and configured
- An Obsidian vault with Local REST API enabled

## Installation

Install the package globally:

```bash
npm install -g PublikPrinciple/obsidian-mcp-rest
```

Or if you prefer using a specific version/branch:

```bash
npm install -g PublikPrinciple/obsidian-mcp-rest#main
```

## Configuration

1. First, configure Obsidian Local REST API plugin:
   - Install the Local REST API plugin in Obsidian
   - Configure the API port (default: 27123)
   - Generate and save an API key

2. Create a configuration file `config.json`:

```json
{
  "obsidian": {
    "apiKey": "your-api-key-here",
    "port": 27123,
    "host": "localhost"
  },
  "server": {
    "name": "obsidian-mcp",
    "version": "1.0.0"
  }
}
```

## Usage

1. Start the server:
```bash
obsidian-mcp-rest --config path/to/config.json
```

2. The server will start and listen for MCP requests via stdin/stdout.

### Using with Claude Desktop

1. Configure Claude Desktop to use this MCP server:
   - Open Claude Desktop settings
   - Navigate to the MCP section
   - Add new server configuration:
     ```json
     {
       "name": "obsidian-mcp",
       "command": "obsidian-mcp-rest",
       "args": ["--config", "path/to/config.json"]
     }
     ```

2. Claude can now access your Obsidian vault through commands like:
   ```
   Read note "Projects/MyProject.md"
   List all notes in "Projects" folder
   Search for notes containing "typescript"
   ```

## Available Tools

- `listNotes`: List all notes in the vault or a specific folder
- `readNote`: Read the contents of a specific note
- `writeNote`: Create or update a note
- `searchNotes`: Search for notes using a query string
- `getMetadata`: Get metadata for a specific note

## Security

- The server only runs locally and communicates through stdin/stdout
- All requests to Obsidian REST API are authenticated with your API key
- No external network access is required
- Data remains local to your machine

## Development

1. Clone the repository:
```bash
git clone https://github.com/PublikPrinciple/obsidian-mcp-rest.git
cd obsidian-mcp-rest
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Run tests:
```bash
npm test
```

## Troubleshooting

### Installation Issues

If you encounter any installation issues, try these alternatives:

1. Clone and install locally:
```bash
git clone https://github.com/PublikPrinciple/obsidian-mcp-rest.git
cd obsidian-mcp-rest
npm install
npm run build
npm install -g .
```

2. If you see TypeScript-related errors, ensure TypeScript is installed globally:
```bash
npm install -g typescript
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License - see LICENSE file for details