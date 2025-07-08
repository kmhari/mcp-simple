# kam-mcp-server

> [Kam-MCP-Server](https://github.com/Bamo-alt/kam-mcp-server)

A Model Context Protocol (MCP) server built with mcp-framework.

## Quick Start

```bash
# Install dependencies
npm install

# Build the project
npm run build

```

## Project Structure

```
kam-mcp-server/
├── build/
├── src/
│   ├── tools/        # MCP Tools
│   │   └── CreatePointBasedElementTool.ts
│   │   └── CreateLineBasedElementTool.ts
│   │   └── CreateSurfaceBasedElementTool.ts
│   │   └── GetCurrentViewElementsTool.ts
│   │   └── GetAvailableFamilyTypesTool.ts
│   │   └── DeleteElementTool.ts
│   │   └── GetElementByIdTool.ts
│   ├── resources/    # MCP Resources
│   │   └── KamDocResourceResource.ts
│   └── index.ts      # Server entry point
├── package.json
└── tsconfig.json
```

## Publishing to npm

1. Update your package.json:

   - Ensure `name` is unique and follows npm naming conventions
   - Set appropriate `version`
   - Add `description`, `author`, `license`, etc.
   - Check `bin` points to the correct entry file

2. Build and test locally:

   ```bash
   yarn build
   npm link
   kam-mcp-server  # Test your CLI locally
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

### After Publishing

Add this configuration to your Claude Desktop config file:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "kam-mcp-server": {
      "command": "npx",
      "args": ["-y", "kam-mcp-server", "--port=9099"]
    }
  }
}
```

## Building and Testing

1. Make changes to your tools
2. Run `yarn build` to compile
3. The server will automatically load your tools on startup
