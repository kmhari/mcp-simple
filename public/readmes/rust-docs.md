# Rust Docs MCP Server

An MCP (Model Context Protocol) server that provides access to Rust documentation from docs.rs. This server allows AI tools to search for documentation, type information, feature flags, version numbers, and symbol definitions/source code.

## Features

- Search for crates on docs.rs
- Get documentation for specific crates and versions
- Get type information (structs, enums, traits, etc.)
- Get feature flags for crates
- Get available versions for crates
- Get source code for specific items
- Search for symbols within crates

## Installation

This project uses Bun for development, but the built server can run with Node.js.

```bash
# Clone the repository
git clone https://github.com/yourusername/rust-docs-mcp-server.git
cd rust-docs-mcp-server

# Install dependencies
bun install
```

## Building

```bash
# Build the server
bun run build
```

This will create a build directory with the compiled JavaScript files.

## Running

```bash
# Run the development server
bun run dev

# Or run the built server
bun run start
```

## Usage with MCP Clients

This server implements the Model Context Protocol and can be used with any MCP client. To use it with an MCP client, you'll need to configure the client to connect to this server.

### Available Tools

The server provides the following tools:

- `search_crates`: Search for crates on docs.rs
- `get_crate_documentation`: Get documentation for a specific crate
- `get_type_info`: Get type information for a specific item
- `get_feature_flags`: Get feature flags for a crate
- `get_crate_versions`: Get available versions for a crate
- `get_source_code`: Get source code for a specific item
- `search_symbols`: Search for symbols within a crate

## Testing

```bash
# Run tests
bun test
```

## License

MIT
