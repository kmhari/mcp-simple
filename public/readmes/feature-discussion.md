# feature-discussion MCP Server

A TypeScript-based Model Context Protocol (MCP) server that facilitates intelligent feature discussions between developers and AI. This server acts as an AI lead developer, providing guidance on feature implementation, maintaining context of discussions, and helping teams make informed architectural decisions.

[Example Discussion](EXAMPLE_DISCUSSION.md)

This server provides:
- Interactive discussions about feature implementation and architecture
- Persistent memory of feature discussions and decisions
- Intelligent guidance on development approaches and best practices
- Context-aware recommendations based on project history

## Features

### AI Lead Developer Interface
- Engage in natural discussions about feature requirements
- Get expert guidance on implementation approaches
- Receive architectural recommendations
- Maintain context across multiple discussions

### Feature Memory Management
- Persistent storage of feature discussions
- Track feature evolution and decisions
- Reference previous discussions for context
- Link related features and dependencies

### Development Guidance
- Best practices recommendations
- Implementation strategy suggestions
- Architecture pattern recommendations
- Technology stack considerations

### Context Management
- Maintain project-wide feature context
- Track dependencies between features
- Store architectural decisions
- Remember previous discussion outcomes

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "feature-discussion": {
      "command": "/path/to/feature-discussion/build/index.js"
    }
  }
}
```

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to get started, and our [Code of Conduct](CODE_OF_CONDUCT.md) for community guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
