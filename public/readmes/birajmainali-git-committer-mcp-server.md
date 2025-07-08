# MCP Server to Generate commit or free !!

This implementation provides a Git changes analyzer that generates commit messages and commits all for free.


## Features

- Analyzes git changes in your repository (both staged and unstaged)
- Stage and commit the changes to github

## Project Structure

```
git-committer-mcp-server/
├── index.ts        
├── package.json    
├── tsconfig.json   
└── build/         
```

## Prerequisites

- Node.js installed
- Git repository to analyze
- pnpm package manager

## Getting Started

1. Clone this repository:
```bash
git clone https://github.com/BirajMainali/git-committer-mcp-server.git
cd git-committer-mcp-server
```

2. Install dependencies:
```bash
pnpm install
```

4. Build the project:
```bash
pnpm run build
```

This will generate the `/build/index.js` file - your compiled MCP server script.

## Using with Cursor

1. Go to Cursor Settings -> MCP -> Add new MCP server
2. Configure your MCP:
   - Name: git-committer-mcp-server
   - Type: command
   - Command: `node CLONED_FULL_PATH/build/index.js

## Using with Claude Desktop

Add the following MCP config to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "git-commit-generator": {
      "command": "node",
      "args": [
        "C:\\MCP\\git-commit-generator-mcp\\build\\index.js"
      ],
      "env": {
        "REPOSITORY_PATH": "C:\\MCP\\portainer-ce-mcp"
      }
    }
  }
}
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT