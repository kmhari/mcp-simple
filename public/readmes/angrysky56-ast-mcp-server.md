# AST MCP Server

An MCP (Model Context Protocol) server that provides code structure and semantic analysis capabilities through Abstract Syntax Trees (AST) and Abstract Semantic Graphs (ASG).

## Features

- Parse code into Abstract Syntax Trees (AST)
- Generate Abstract Semantic Graphs (ASG) from code
- Analyze code structure and complexity
- Support for multiple programming languages (Python, JavaScript)
- Compatible with Claude Desktop and other MCP clients
- Incremental parsing for faster processing of large files
- Enhanced scope handling and more complete semantic analysis
- AST diffing to identify changes between code versions

## Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/ast-mcp-server.git
cd ast-mcp-server
```

2. Set up the environment using `uv`:

```bash
# Install uv if you don't have it already
# pip install uv

# Create and activate virtual environment
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
uv pip install -r requirements.txt
```

3. Build the parsers:

```bash
uv run build_parsers.py
```

## Usage with Claude Desktop

1. Configure Claude Desktop to use the server. The easiest way is to use the provided `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "AstAnalyzer": {
      "command": "uv",
      "args": [
        "--directory", "/absolute/path/to/ast-mcp-server",
        "run", "server.py"
      ]
    }
  }
}
```

2. Make sure to replace `/absolute/path/to/ast-mcp-server` with the actual absolute path on your system.

3. Add this configuration to your Claude Desktop config:
   - On macOS: `~/Library/Application Support/claude-desktop/claude_desktop_config.json`
   - On Linux: `~/.config/claude-desktop/claude_desktop_config.json`
   - On Windows: `%APPDATA%\claude-desktop\claude_desktop_config.json`

4. Restart Claude Desktop to load the new MCP server.

5. In Claude Desktop, you can now use the AST-based code analysis tools.

The AST MCP Server is working correctly. Here's a summary of the features I've verified:

Basic AST Parsing ✓

Successfully parsed Python code into a detailed abstract syntax tree
The structure shows proper node hierarchy with types, positions, and content

ASG Generation ✓

Generated an Abstract Semantic Graph with nodes and edges
The graph correctly shows relationships between components

Code Analysis ✓

Successfully analyzed code structure, identifying:

Functions (with names, locations, and parameters)
Classes
Complexity metrics

Resource Caching ✓

The parse_and_cache function worked correctly
A URI was generated for retrieving the parsed AST later

Multi-language Support ✓

Successfully parsed both Python and JavaScript code
The supported_languages tool confirmed Python and JavaScript are available


The server is fully operational and all key functionality works as expected. When integrated with Claude Desktop using the updated configuration in claude_desktop_config.json, it will provide powerful code analysis capabilities.

## Development and Testing

To run the server in development mode with the MCP inspector:

```bash
# Using the included script
./dev_server.sh

# Or manually
uv run -m mcp dev server.py
```

## Available Tools

The server provides the following tools:

### Basic Tools
- `parse_to_ast`: Parse code into an Abstract Syntax Tree
- `generate_asg`: Generate an Abstract Semantic Graph from code
- `analyze_code`: Analyze code structure and complexity
- `supported_languages`: Get the list of supported programming languages
- `parse_and_cache`: Parse code into an AST and cache it for resource access
- `generate_and_cache_asg`: Generate an ASG and cache it for resource access
- `analyze_and_cache`: Analyze code and cache the results for resource access

### Enhanced Tools
- `parse_to_ast_incremental`: Parse code with incremental support for faster processing
- `generate_enhanced_asg`: Generate an enhanced ASG with better scope handling
- `diff_ast`: Find differences between two versions of code
- `find_node_at_position`: Locate a specific node at a given line and column
- `parse_and_cache_incremental`: Parse code incrementally and cache the results
- `generate_and_cache_enhanced_asg`: Generate an enhanced ASG and cache it
- `ast_diff_and_cache`: Generate an AST diff and cache it

## Adding More Language Support

To add support for additional languages:

1. Install the corresponding tree-sitter language package:

```bash
uv pip install tree-sitter-<language>
```

2. Update the `LANGUAGE_MODULES` dictionary in `build_parsers.py` and `ast_mcp_server/tools.py`.

3. Run `uv run build_parsers.py` to initialize the new language.

## How It Works

The AST MCP Server connects with Claude Desktop through the Model Context Protocol (MCP). When launched:

1. Claude Desktop starts the server using `uv run` with the appropriate working directory
2. The server loads tree-sitter language modules for parsing various programming languages
3. It registers tools and resources with the MCP protocol
4. Claude can then access these tools to analyze code you share in the chat

All tool execution happens locally on your machine, with results returned to Claude for interpretation.

## License

MIT
