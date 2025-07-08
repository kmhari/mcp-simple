# AI Rules & Model Context Protocol Documentation

## Introduction
This documentation covers two main components:
1. AI Rules System (Project & Global Rules)
2. Model Context Protocol (MCP) Integration

## AI Rules System

### Types of Rules

#### 1. Project Rules
Project rules provide path-specific configurations stored in `.cursor/rules` directory, offering granular control over AI behavior within your project. Key features include:

- **Semantic Descriptions**: Define specific conditions for rule application
- **File Pattern Matching**: Implement glob patterns for targeted file/folder control
- **Automatic Attachment**: Dynamic rule inclusion based on file references
- **Reference Files**: Utilize `@file` syntax to incorporate contextual information

#### 2. Global Rules
Global rules are configured through:
- Path: Cursor Settings > General > Rules for AI
- Purpose: Define project-independent settings like:
  - Output language preferences
  - Response length parameters
  - Universal formatting rules

**Legacy Support Note**: While `.cursorrules` files remain supported for backward compatibility, migration to the new Project Rules system is recommended for enhanced functionality.

## Model Context Protocol (MCP)

### Overview
MCP serves as a standardized plugin system for Cursor, enabling:
- External tool integration
- Data source connections
- Enhanced LLM context management

### Core Functionality
- Connects Cursor with external systems
- Supports any programming language capable of stdout output or HTTP endpoint serving
- Facilitates quick implementation with flexible technology stack options

### Architecture Components

#### Transport Types

1. **SSE Transport**
   - Remote/local execution capability
   - User-managed operation
   - Network-based communication
   - Cross-machine sharing support
   - Configuration: URL to `/sse` endpoint

2. **stdio Transport**
   - Local machine execution
   - Automatic Cursor management
   - Direct stdout communication
   - Single-user access
   - Configuration: Shell command execution

### Configuration Implementation

#### JSON Structure
```json
{
  "mcpServers": {
    "server-name": {
      "command": "python",
      "args": ["mcp-server.py"],
      "env": {
        "API_KEY": "value"
      }
    }
  }
}
```

#### Configuration Locations

1. **Global Configuration**
   - Path: `~/.cursor/mcp.json`
   - Scope: All Cursor workspaces
   - Use: Cross-project tool availability

2. **Project Configuration**
   - Path: `.cursor/mcp.json`
   - Scope: Project-specific
   - Use: Project-dedicated tools

### Agent Integration Features

#### Tool Usage
- Automatic tool selection based on relevance
- Manual tool invocation through name/description
- Integrated response display in chat

#### Security & Control
- Default tool approval system
- Argument inspection capability
- Optional Yolo mode for automated execution
- Detailed tool call response tracking

### Current Limitations

1. **Tool Quantity Restriction**
   - Maximum 40 tools per Agent session
   - Applies to multiple active MCP servers

2. **Remote Development Constraints**
   - Limited functionality in SSH environments
   - Local machine communication requirement

3. **Resource Support Status**
   - Current focus on tool capabilities
   - Resource support planned for future releases

## Additional Resources

### Official Documentation
- [Cursor AI Rules](https://docs.cursor.com/context/rules-for-ai)
- [Cursor Directory](https://cursor.directory/)
- [Cursor Rules Reference](https://cursor.directory/rules)
- [MCP Documentation](https://docs.cursor.com/context/model-context-protocol)

### Future Development
- Enhanced remote development support
- Expanded resource capabilities
- Continued protocol optimization

This documentation maintains comprehensive coverage while providing:
- Clear hierarchical structure
- Improved readability
- Technical accuracy
- Practical implementation guidance
