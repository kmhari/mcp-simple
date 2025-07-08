# Cursor Rules Configuration

This directory contains configuration and documentation for integrating the Cursor Rules MCP server via gitmcp.io.

## Configuration

The `.cursor/mcp.json` file defines custom MCP servers. We added:

```json
{
  "mcpServers": {
    "Cursor Rules": {
      "url": "https://gitmcp.io/mgd1984/cursor-rules"
    }
  }
}
```

This tells the Cursor chat integration to fetch rules from the `Cursor Rules` server hosted on gitmcp.io.

## Rebuilding the Ruleset

To rebuild or refresh the ruleset locally, run the following commands in your project root:

```bash
# Clone the rules repository
git clone --depth=1 https://gitmcp.io/mgd1984/cursor-rules.git temp

# Copy the rules into the .cursor folder
cp -R temp/.cursor/rules .cursor/rules

# Clean up the temporary clone
rm -rf temp
```

Alternatively, if you have a CLI available, you can use:

```bash
cursor mcp fetch --server "Cursor Rules"
```

Ensure to commit any updated rules into your repository to keep them in sync.

## Overview

This repository contains a template for Cursor Rules that can be used to provide consistent guidance when developing Next.js applications with TypeScript. The rules cover architecture, state management, error handling, styling, and more.

## Getting Started

1. Clone this repository
2. Copy the `.cursor` directory to your Next.js project
3. Customize the rules to fit your specific project needs

## Rule Categories

- **Architecture**: Project structure, tech stack, and file organization
- **Memory/State**: Data fetching and state management patterns
- **Error Handling**: Error handling strategies
- **Performance**: Optimization techniques
- **Workflow**: Development process preferences
- **Preferences**: Code style, naming conventions, and Tailwind usage

## Usage

To activate a rule in Cursor chat:
1. Reference it directly: `@architecture/001-project-overview`
2. Or use the rule picker by typing `@` and selecting from the list

## License

MIT 