# Dev Memory Server

## Overview
MCP server for persistent development memory across projects. Automatically captures and organizes development context, code changes, and user interactions.

## Current Status
⚠️ **BLOCKED**: Currently experiencing issues with file system access and JSON response handling. See [Handoff Document](docs/dev-memory/HANDOFF.md) for details.

## Quick Links
- [Handoff Document](docs/dev-memory/HANDOFF.md) - Current status and next steps
- [Design Document](docs/dev-memory/DESIGN.md) - System architecture
- [Working Notes](docs/dev-memory/WORKING_NOTES.md) - Implementation details

## Setup
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start
```

## Project Structure
```
.
├── src/
│   ├── core/           # Core functionality
│   │   ├── store.ts    # Storage implementation
│   │   ├── context.ts  # Context management
│   │   └── types.ts    # Type definitions
│   ├── sdk/            # MCP SDK integration
│   └── index.ts        # Main server
├── docs/              # Documentation
└── scripts/           # Utility scripts
```

## Development Timeline
- Phase 1: Robustness (January 2025) - Current
- Phase 2: Intelligence (February 2025)
- Phase 3: Integration (March 2025)

## Contact
- Status: Blocked on file system issues
- Priority: High - blocking development context capture
- Location: /Users/chetpaslawski/Documents/VS Code Projects/dev-memory-server
