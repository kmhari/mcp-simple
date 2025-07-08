# BetterMCPFileServer

> A reimagined Model Context Protocol (MCP) server for filesystem access with privacy-preserving path aliases and an optimized LLM-friendly API.

## Why BetterMCPFileServer?

The original MCP file server was functional but not optimized for how LLMs actually interact with filesystems. This project delivers a complete redesign focused on simplicity, privacy, and efficiency.


### Key Innovations

- **Path Aliasing System** - Protects privacy by hiding full system paths
- **LLM-Optimized Interface** - Reduced from 11 to 6 functions while maintaining full capability
- **Smarter Search** - One unified tool for directory listings and complex file searches
- **Privacy-First Design** - No more exposing usernames or system paths to AI models

## Quick Start

```bash
# Install from source (npm package coming soon)
git clone https://github.com/martinschlott/BetterMCPFileServer.git
cd BetterMCPFileServer
npm install
npm run build

# Run with aliases
BetterMCPFileServer code:~/projects docs:~/documents
```

That's it! Now Claude can access your files through privacy-preserving aliases like `code/src/main.js` instead of `/Users/yourusername/projects/src/main.js`.

## Path Aliasing System

Traditional file servers expose full system paths:
```
/home/martin/Documents/PrivateProject/financial-data.txt
```

Our aliasing system keeps your privacy intact:
```
projects/financial-data.txt
```

Benefits:
- **Privacy Protection**: No usernames or sensitive directory names exposed
- **Simplification**: LLMs work with clean, logical paths
- **Security**: Strict boundaries for filesystem access

## API Design Rationale

### Redesigning the MCP File Server Interface

This project represents a significant redesign of the standard MCP file server interface. While the original implementation provided a functional foundation, we identified several areas for improvement to create a more intuitive, efficient, and LLM-friendly interface.

### Key Improvements

#### 1. Intuitive Function Naming

The original interface used snake_case naming with basic verbs like `read_file` and `write_file`. We've adopted more idiomatic camelCase naming with clearer, more specific function names:

- `read_file` → `readFileContent`
- `write_file` → `writeFile`
- `list_directory` → `searchFilesAndFolders` (with pattern="*")

These names explicitly communicate their purpose and follow standard programming conventions, making them more intuitive for both AI models and human developers.

#### 2. Grouped Functionality for Reduced Complexity

Instead of having separate functions for each individual file or directory operation, we've consolidated related operations:

- `manageFile` with an `action` parameter replaces separate `move_file`, `copy_file`, and `delete_file` functions
- `manageFolder` handles folder creation, renaming, and deletion in one function

This approach reduces API surface area while increasing flexibility, making it easier for LLMs to understand the complete range of available operations.

#### 3. Concise, Purposeful Descriptions

The original interface included lengthy descriptions with redundant information, such as repeatedly stating "Only works within allowed directories" for each function. Our redesigned API features concise descriptions that:

- Focus on what the function does
- Avoid stating the obvious
- Highlight distinctive capabilities
- Eliminate marketing-style language that doesn't provide technical value

#### 4. Path Aliasing System

One of the most significant improvements is our path aliasing system. The original approach required:
- Specifying full allowed directories at startup
- LLMs to use complete, absolute paths in every request
- Exposing potentially sensitive information in directory paths (like usernames)

Our new approach maps aliases to real paths:

```
~/Documents/MyProjects → projects
~/Documents/Letters → letters
```

Benefits include:
- LLMs work with simple, logical paths (`projects/backend` instead of `/home/username/Documents/MyProjects/backend`)
- Privacy is enhanced by hiding actual paths containing usernames or sensitive directory structures
- System configuration can change without impacting how LLMs interact with the server

#### 5. More Efficient Combined Operations

We've added strategic combined operations to reduce round-trips and simplify common tasks:

- `searchFilesAndFolders` with improved description and `includeMetadata` option completely replaces the need for a separate `readFolderContent` function
- `editFile` retains the useful targeted text replacement functionality from the original implementation but with a clearer parameter structure

A key achievement of this redesign is reducing the number of tools from 11 to 6 while maintaining full functionality. This simplification:
- Makes the API easier to learn and remember
- Reduces the cognitive load for LLMs when choosing appropriate tools
- Minimizes redundancy between operations

### Design Philosophy

This redesign follows several core principles:

1. **AI-First Interface**: Optimized for LLM consumption and usage patterns
2. **Minimal Cognitive Load**: Reduced number of functions with consistent naming and behavior
3. **Information Hiding**: Abstracted implementation details that don't benefit the consumer
4. **Progressive Disclosure**: Simple operations are simple, advanced features are available when needed

## Optimized Search Functionality

Our redesigned search function is both powerful and easy to use:

```
searchFilesAndFolders({
  pattern: "**/*.js",                   // Find all JavaScript files
  includeMetadata: true,                // Include file sizes and dates (use sparingly)
  ignore: ["node_modules", "*.min.js"]  // Skip unwanted matches
})
```

Key patterns:
- `"*"` - List top-level items (like a simple directory listing)
- `"projects/*.js"` - All JavaScript files in the projects directory
- `"**/*.md"` - All markdown files recursively across all directories

⚠️ **Pro Tip:** Only set `includeMetadata: true` when you specifically need file sizes or dates to keep responses efficient.

## API Reference

The BetterMCPFileServer exposes just 6 powerful functions that handle all filesystem operations:

### 1. `writeFile`
Create or update a file with the given content.
```javascript
writeFile({
  filePath: "projects/README.md",
  content: "# My Project\n\nThis is a readme file."
})
```

### 2. `readFileContent`
Read the contents of a file.
```javascript
readFileContent({
  filePath: "projects/README.md"
})
```

### 3. `editFile`
Make targeted changes to specific portions of a file.
```javascript
editFile({
  filePath: "projects/README.md",
  edits: [
    {
      oldText: "# My Project",
      newText: "# Awesome Project"
    }
  ],
  dryRun: false
})
```

### 4. `manageFile`
Perform actions like move, rename, copy, or delete a file.
```javascript
manageFile({
  action: "move",
  filePath: "projects/old.js",
  newFilePath: "projects/new.js"
})
```

### 5. `manageFolder`
Create, rename, or delete a folder.
```javascript
manageFolder({
  action: "create",
  folderPath: "projects/new-directory"
})
```

### 6. `searchFilesAndFolders`
Search for files and folders using glob patterns.
```javascript
searchFilesAndFolders({
  pattern: "projects/**/*.ts",
  includeMetadata: false
})
```

## Usage Examples

### Working with the Virtual Root

```javascript
// List all available aliases
searchFilesAndFolders({ pattern: "*" })

// Result:
[
  { path: "projects", type: "directory" },
  { path: "docs", type: "directory" }
]
```

### Basic File Operations

```javascript
// Read a file
const content = await readFileContent({ filePath: "projects/README.md" });

// Write a file
await writeFile({
  filePath: "projects/notes.txt",
  content: "Important meeting notes."
});

// Edit a file
await editFile({
  filePath: "projects/config.json",
  edits: [
    {
      oldText: '"version": "1.0.0"',
      newText: '"version": "1.0.1"'
    }
  ]
});
```

### Directory Operations

```javascript
// Create a new directory
await manageFolder({
  action: "create",
  folderPath: "projects/new-feature"
});

// List directory contents
const files = await searchFilesAndFolders({
  pattern: "projects/src/*"
});
```

## Installation

```bash
# From npm (coming soon)
npm install -g BetterMCPFileServer  # Not yet available

# From source (current method)
git clone https://github.com/martinschlott/BetterMCPFileServer.git
cd BetterMCPFileServer
npm install
npm run build
npm link  # Optional, makes command available globally
```

## Usage

Start the server with at least one alias:directory pair:

```bash
BetterMCPFileServer alias:directory [alias2:directory2 ...]
```

Examples:

```bash
# Single directory
BetterMCPFileServer code:~/projects

# Multiple directories
BetterMCPFileServer code:~/Development docs:~/Documents/Technical notes:~/Notes
```

## Advanced Configuration

Create a simple shell script for consistent configuration:

```bash
#!/bin/bash
# start-server.sh
BetterMCPFileServer \
  code:~/Development/MyProjects \
  docs:~/Documents/Technical \
  data:~/Data/Samples \
  config:~/Configuration
```

## Troubleshooting

- **Error: Invalid alias:path format**: Ensure each parameter uses the format `alias:directory`
- **Error: Directory doesn't exist**: The specified directory must exist
- **Access denied error**: Attempted access outside allowed directories
- **Unknown alias**: The referenced alias wasn't defined at server startup

## Credits

This project was a collaboration between Martin Schlott (concept and design) and AI assistants:
- Claude 3.7 Sonnet (API design consultation and documentation)
- Cursor AI (implementation)

*README crafted by Claude 3.7 Sonnet*

## License

MIT License