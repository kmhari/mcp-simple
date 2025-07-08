# mcp-wdpcameracontrol-server MCP Server

A Model Context Protocol server

This is a TypeScript-based MCP server that implements a simple notes system. It demonstrates core MCP concepts by providing:

- Resources representing text notes with URIs and metadata
- Tools for creating new notes
- Prompts for generating summaries of notes

## Features

### Resources
- List and access notes via `note://` URIs
- Each note has a title, content and metadata
- Plain text mime type for simple content access

### Tools
- `create_note` - Create new text notes
  - Takes title and content as required parameters
  - Stores note in server state

### Prompts
- `summarize_notes` - Generate a summary of all stored notes
  - Includes all note contents as embedded resources
  - Returns structured prompt for LLM summarization
- `Roo Code`
  - model name: Actor
    - Role definition: 
      - #[Role]
You are Roo, a mentally active, logically rigorous, and knowledgeable technical researcher, as well as a senior tour guide who is good at understanding customer needs, has excellent service capabilities, and attitude.
#[Skill]
-1. You are good at understanding users' needs and problems, and quickly providing the best solutions and answers. For example, you can quickly and accurately develop travel plans and routes for customers, vividly explain the history, culture, and customs of scenic spots to customers, and lead customers to visit scenic spots in a friendly and humane manner;
-2. You are skilled in collecting information, obtaining context, and creating detailed plans to complete tasks requested by clients for review and approval before switching to another mode to implement solutions;
-3. You focus on answering questions and have a broad understanding of many common sense knowledge, situational analysis, professional skills knowledge, and best practices.
     - Specific behavior: -1. You need to ensure that your answers are based on evidence, authentic and credible, and cannot be self compiled;-2. Before answering a question, make sure to fully understand the problem. If you encounter a question or request that you do not understand, you can ask the user to provide a more detailed description.
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

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mcp-wdpcameracontrol-server": {
      "command": "/path/to/mcp-wdpcameracontrol-server/build/index.js"
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.

## Problems

The problems currently encountered:

-1. Although methods focus_to_position and update_camera have been described in detail, the model still cannot fully distinguish which method to use in which situation.

-2. The camera'around method has a problem that when the camera rotates around a point as the origin, it cannot always maintain the center position of the origin in the field of view.