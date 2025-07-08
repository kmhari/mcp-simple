# TypeScript Analyzer MCP Server - Enterprise Edition

A high-performance MCP (Model Context Protocol) server for analyzing and fixing TypeScript `any` types in your codebase, with advanced error handling, caching, and intelligent type inference.

## Features

- 🔍 **Analyze TypeScript Files**: Scan files for `any` types and get suggested replacements
- 🛠️ **Fix TypeScript Files**: Automatically replace `any` types with more specific types
- 📊 **Batch Processing**: Process multiple files at once
- 🧩 **Component Interface Generation**: Generate TypeScript interfaces for React components
- ⚙️ **Server Configuration**: Dynamically update server config (log level, caching, etc.)
- 🔧 **Cache Management**: Clear and manage analysis caches

## Installation

1. **Clone this repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Build the project**:
   ```bash
   npm run build
   ```
4. **Start the server**:
   ```bash
   npm run start
   ```
   or
   ```bash
   node dist/index.js
   ```

## Using with Claude Desktop

To use this MCP server with Claude Desktop, add it to your `.claude-app.json` configuration file:

```json
{
  "mcpServers": {
    "typescript-analyzer": {
      "command": "node",
      "args": ["/path/to/typescript-analyzer-mcp/dist/index.js"],
      "env": {}
    }
  }
}
```

## Tools

### `getServerInfo`

Retrieves basic information about the analyzer server (name, version, description, features, configuration).

**Example:**
```
Please provide server info
```

### `configureServer`

Updates server configuration (log levels, caching, etc.) at runtime.

**Parameters:**
- `config`: A partial configuration object to merge with the current config

**Example:**
```
Please update the logLevel to 'debug' for the server
```

### `analyzeTypeScriptFile`

Analyzes a TypeScript file for `any` types.

**Parameters:**
- `filePath`: Path to the TypeScript file to analyze
- `skipCache`: (optional) If true, forces a fresh analysis

**Example:**
```
Please analyze the TypeScript file src/components/Button.tsx for any types
```

### `fixTypeScriptFile`

Fixes `any` types in a single TypeScript file.

**Parameters:**
- `filePath`: Path to the TypeScript file to fix
- `fixType`: Default type to use for replacement (default: "unknown")
- `dryRun`: If true, show changes without applying them
- `skipBackup`: If true, do not create a backup file before modifying

**Example:**
```
Please fix the TypeScript file src/components/Button.tsx, using Record<string, unknown> as the default replacement
```

### `batchFixTypeScriptFiles`

Batch fixes `any` types in multiple TypeScript files.

**Parameters:**
- `directory`: Directory containing TypeScript files
- `pattern`: Glob pattern for files to process (e.g. "**/*.ts")
- `fixType`: Default type to use for replacement
- `dryRun`: If true, show changes without applying them
- `concurrency`: (optional) How many files to process in parallel

**Example:**
```
Please fix all TypeScript files in the src/components directory
```

### `generateComponentInterface`

Generates a proper TypeScript interface for React component props.

**Parameters:**
- `filePath`: Path to the React component file
- `componentName`: Name of the component to analyze
- `outputPath`: (optional) Path where to save the generated interface

**Example:**
```
Please generate an interface for the Button component in src/components/Button.tsx
```

### `clearCache`

Clears the analysis cache to force fresh analysis on subsequent operations.

**Example:**
```
Please clear the analysis cache
```

## Type Mapping Strategy

The server uses a set of predefined mappings for common patterns:

| Pattern         | Replacement                                          |
|-----------------|------------------------------------------------------|
| `e: any`        | `e: React.SyntheticEvent`                            |
| `event: any`    | `event: React.SyntheticEvent`                        |
| `onChange: any` | `onChange: (value: unknown) => void`                 |
| `onClick: any`  | `onClick: (event: React.MouseEvent<HTMLElement>) => void` |
| `ref: any`      | `ref: React.RefObject<HTMLElement>`                  |
| `data: any`     | `data: Record<string, unknown>`                      |
| `options: any`  | `options: Record<string, unknown>`                   |
| `config: any`   | `config: Record<string, unknown>`                    |
| `props: any`    | `props: Record<string, unknown>`                     |
| `items: any[]`  | `items: unknown[]`                                   |
| `results: any[]`| `results: unknown[]`                                 |
| `callback: any` | `callback: (...args: unknown[]) => unknown`          |

For patterns not covered by the mappings, it defaults to using `unknown`.

## License

MIT