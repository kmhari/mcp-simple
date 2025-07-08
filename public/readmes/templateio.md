# MCP TemplateIO - Image Generation Tool

A Model Context Protocol (MCP) server built with mcp-framework that provides an image generation tool using Templated.io.

## Overview

This template provides a starting point for building MCP servers with custom tools. It includes an example tool and instructions on how to add more tools, develop them, and publish them to npm. This README will guide you through the process of setting up, developing, and deploying your own MCP server.

## Quick Start

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## Project Structure

```
mcp-templateio/
├── src/
│   ├── tools/        # MCP Tools
│   │   ├── ExampleTool.ts
│   │   └── TemplatedImageTool.ts # Image generation tool
│   └── index.ts      # Server entry point
├── package.json
└── tsconfig.json
```

## Available Tools

### Templated Image Generator

This tool generates an image based on a template, given text and image URLs, using the Templated.io API.

**Input Parameters:**

- `templateId`: ID of the Templated.io template to use
- `photoBgImageUrl`: URL for the image to place in the "photo-bg" layer.
- `bgYellowImageUrl`: URL for the image to place in the "bg-yellow" layer.
- `buildText`: Text content for the "build" text layer.

## Tool Development

Example tool structure:

```typescript
import { MCPTool } from "mcp-framework";
import { z } from "zod";

interface MyToolInput {
  message: string;
}

class MyTool extends MCPTool<MyToolInput> {
  name = "my_tool";
  description = "Describes what your tool does";

  schema = {
    message: {
      type: z.string(),
      description: "Description of this input parameter",
    },
  };

  async execute(input: MyToolInput) {
    // Your tool logic here
    return `Processed: ${input.message}`;
  }
}

export default MyTool;
```

## Adding Components

The project comes with an example tool in `src/tools/ExampleTool.ts` and the `TemplatedImageTool.ts`. You can add more tools using the CLI:

```bash
# Add a new tool
mcp add tool my-tool

# Example tools you might create:
mcp add tool data-processor
mcp add tool api-client
mcp add tool file-handler
```

## Publishing to npm

1. Update your package.json:

   - Ensure `name` is unique and follows npm naming conventions
   - Set appropriate `version`
   - Add `description`, `author`, `license`, etc.
   - Check `bin` points to the correct entry file

2. Build and test locally:

   ```bash
   npm run build
   npm link
   mcp-templateio  # Test your CLI locally
   ```

3. Login to npm (create account if necessary):

   ```bash
   npm login
   ```

4. Publish your package:
   ```bash
   npm publish
   ```

After publishing, users can add it to their claude desktop client (read below) or run it with npx

## Using with Claude Desktop

### Local Development

Add this configuration to your Claude Desktop config file:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mcp-templateio": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-templateio/dist/index.js"]
    }
  }
}
```

### After Publishing

GET YOUR API KEY HERE: https://app.templated.io/api-integration?template=4ae9a86b-4ecd-44ee-aebd-7c5a49c16969

Add this configuration to your Claude Desktop config file:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mcp-templateio": {
      "command": "node",
      "args": [
        "C:\\Users\\alex0\\Documents\\AA_CodeAndScripts\\modelcontextprotocol\\mcp-templateio\\dist\\index.js"
      ],
      "env": {"TEMPLATED_API_KEY":"YOUR-API-KEY-HERE"}
    },
  }
}
```

## Building and Testing

1. Make changes to your tools
2. Run `npm run build` to compile
3. The server will automatically load your tools on startup

## Learn More

- [MCP Framework Github](https://github.com/QuantGeekDev/mcp-framework)
- [MCP Framework Docs](https://mcp-framework.com)
