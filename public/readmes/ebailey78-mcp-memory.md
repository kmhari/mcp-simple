# MCP Memory Server

A Model Context Protocol (MCP) server for Claude Desktop that provides structured memory management across chat sessions, specifically designed for project-based work.

## Project-Focused Memory Management

This MCP server is specifically designed to help Claude maintain context and knowledge within project directories when used with Claude Desktop. It allows Claude to:

- Create a memory store within your project directory
- Save important information discovered during conversations
- Retrieve relevant memories in future sessions
- Build a comprehensive knowledge base about your project over time

This approach is ideal for long-term projects where maintaining context between sessions is crucial, such as software development, research, writing, or any collaborative work with Claude.

## Features

- Store memories as structured markdown files
- Index memories using Lunr.js for efficient retrieval
- Tag and categorize memories
- Create relationships between memories
- Search memories by content, tags, or type
- Build memory stores in specified directories

## Memory Structure

Memories are stored in a hierarchical structure within your project:

```
/your-project-directory
  /memory                # Memory store created by Claude
    /entities/           # Information about specific entities (people, projects, etc.)
    /concepts/           # Abstract concepts or knowledge
    /sessions/           # Session-specific memories
    /index.json          # Lunr.js search index
    /metadata.json       # Overall memory metadata
    /README.md           # Auto-generated documentation
```

This structure keeps all project-related memories organized and accessible within your project directory.

## Usage with Claude Desktop

Add this to your claude_desktop_config.json:

```json
{
  "mcpServers": {
    "memory": {
      "command": "node",
      "args": ["path/to/mcp-memory/dist/index.js"]
    }
  }
}
```

You can also set a custom memory directory using an environment variable:

```json
{
  "mcpServers": {
    "memory": {
      "command": "node",
      "args": ["path/to/mcp-memory/dist/index.js"],
      "env": {
        "MEMORY_DIR": "/path/to/custom/memory/directory"
      }
    }
  }
}
```

## Project Workflow

1. **Setup**: When starting a new project with Claude, have it create a memory store in your project directory
2. **Ongoing Work**: As you work with Claude, it will save important information to the memory store
3. **Continuity**: In future sessions, Claude can retrieve relevant memories to maintain context
4. **Knowledge Building**: Over time, Claude builds a comprehensive knowledge base about your project

This workflow ensures that Claude maintains context and knowledge specific to each project, making it more effective as a long-term collaborator.

## Claude Project Instructions

This repository includes an `instructions_template.md` file that provides a comprehensive template for Claude project instructions. You can customize this template for your specific projects to help Claude effectively use the memory system.

The template includes:

- Memory system setup instructions
- Memory retrieval process
- Memory creation guidelines
- Memory organization system
- Memory maintenance procedures
- Conversation workflow
- Best practices

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start

# Development mode (watch for changes)
npm run dev
```

## Implementation Details

This server is built using:

- The official Model Context Protocol (MCP) SDK
- TypeScript for type safety
- Lunr.js for memory indexing and search
- Zod for schema validation

## License

MIT 