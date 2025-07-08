[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/ixe1-code-scanner-server-badge.png)](https://mseep.ai/app/ixe1-code-scanner-server)

<a href="https://glama.ai/mcp/servers/@Ixe1/code-scanner-server">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@Ixe1/code-scanner-server/badge" alt="Code Scanner Server MCP server" />
</a>

# `code-scanner-server`

> A CLI tool and MCP server that scans code files for definitions (classes, functions, etc.), respects .gitignore, provides line numbers, and outputs LLM-friendly formats (XML/Markdown).

This project provides a versatile code scanning tool built with TypeScript and Node.js. It leverages the Tree-sitter parsing library to analyze source code and extract structural information. It can operate both as a command-line interface (CLI) tool and as an MCP (Model Context Protocol) server.

> **Note:** This tool is under active development. While core functionality is operational, some features or specific language parsers may not be fully tested and might contain bugs or limitations.

## Features

*   **Code Definition Extraction:** Identifies functions, classes, variables, interfaces, methods, etc.
*   **Multi-Language Support:** Parses JavaScript (`.js`, `.jsx`), TypeScript (`.ts`, `.tsx`), C# (`.cs`), PHP (`.php`), CSS (`.css`), and Python (`.py`) via Tree-sitter.
*   **.gitignore Aware:** Automatically respects rules defined in `.gitignore` files.
*   **Flexible Filtering:** Filter results by definition type, modifiers (`public`, `private`), name patterns (regex), and file path patterns.
*   **Multiple Output Formats:** Generates results in Markdown (default), XML, or JSON.
*   **Configurable Detail Levels:** Output verbosity: `minimal`, `standard` (default), `detailed`.
*   **Dual Mode Operation:** Run as a standalone CLI tool or as an integrated MCP server.

## Usage Modes

### 1. Command-Line Interface (CLI)

Run the scanner directly from your terminal. This mode requires the `--directory` argument specifying the target codebase.

**Basic Usage:**
```bash
node build/index.js --directory /path/to/your/codebase
```

**Common Options:**
*   `-d, --directory <path>`: (Required) Absolute or relative path to the directory to scan.
*   `-p, --patterns <patterns...>`: Glob patterns for file extensions (e.g., `"**/*.ts"` ` "**/*.js"`). Defaults to JS, TSX, CS, PHP, CSS, PY files.
*   `-f, --format <format>`: Output format (`xml`, `markdown`, `json`). Default: `markdown`.
*   `-l, --detail <level>`: Level of detail (`minimal`, `standard`, `detailed`). Default: `standard`.
*   `--include-types <types...>`: Only include specific definition types (e.g., `class`, `method`).
*   `--exclude-types <types...>`: Exclude specific definition types.
*   `--include-modifiers <modifiers...>`: Only include definitions with specific modifiers (e.g., `public`).
*   `--exclude-modifiers <modifiers...>`: Exclude definitions with specific modifiers.
*   `--name-pattern <regex>`: Include definitions matching a JavaScript regex pattern.
*   `--exclude-name-pattern <regex>`: Exclude definitions matching a JavaScript regex pattern.
*   `--include-paths <paths...>`: Additional file path patterns (glob) to include.
*   `--exclude-paths <paths...>`: File path patterns (glob) to exclude.
*   `-h, --help`: Display detailed help information for all options.

**Example (Scan TypeScript files in `src`, output detailed JSON):**
```bash
node build/index.js -d ./src -p "**/*.ts" -f json -l detailed
```

### 2. MCP Server Mode (`scan_code` tool)

If run without the `--directory` argument, the tool starts as an MCP server, listening for requests via standard input/output. This allows integration with MCP clients like AI assistants.

*   **Tool Name:** `scan_code`
*   **Description:** Scans a specified directory for code files and returns a list of definitions according to the provided filters.
*   **Input Schema:** Accepts arguments corresponding to the CLI options. The `directory` property is required.
    ```json
    {
      "type": "object",
      "properties": {
        "directory": { "type": "string", "description": "Absolute path to the directory to scan." },
        "filePatterns": { "type": "array", "items": { "type": "string" }, "description": "Glob patterns for files.", "default": ["**/*.js", ..., "**/*.py"] },
        "outputFormat": { "type": "string", "enum": ["xml", "markdown", "json"], "default": "markdown" },
        "detailLevel": { "type": "string", "enum": ["minimal", "standard", "detailed"], "default": "standard" },
        "includeTypes": { "type": "array", "items": { "type": "string" } },
        "excludeTypes": { "type": "array", "items": { "type": "string" } },
        "includeModifiers": { "type": "array", "items": { "type": "string" } },
        "excludeModifiers": { "type": "array", "items": { "type": "string" } },
        "namePattern": { "type": "string", "description": "Regex pattern for names." },
        "excludeNamePattern": { "type": "string", "description": "Regex pattern to exclude names." },
        "includePaths": { "type": "array", "items": { "type": "string" } },
        "excludePaths": { "type": "array", "items": { "type": "string" } }
      },
      "required": ["directory"]
    }
    ```
*   **Example Usage with AI Assistant:** "Use code-scanner-server scan_code on directory /path/to/project outputting xml format."

## Installation

1.  **Prerequisites:** Ensure you have Node.js and npm installed.
2.  **Clone (Optional):** If you don't have the code, clone the repository.
    ```bash
    # git clone <repository_url>
    # cd code-scanner-server
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Build:** Compile the TypeScript code.
    ```bash
    npm run build
    ```
    This creates the executable JavaScript file at `build/index.js`.

## Configuration (MCP Server)

To use the MCP server mode, add it to your MCP client's configuration file (e.g., `claude_desktop_config.json` for the desktop app or `cline_mcp_settings.json` for the VS Code extension).

**Important:** Replace `/path/to/code-scanner-server` in the example below with the **absolute path** to this project's directory on your system.

**Example (`claude_desktop_config.json` / `cline_mcp_settings.json`):**
```json
{
  "mcpServers": {
    "code-scanner-server": {
      "command": "node",
      "args": [
        "/absolute/path/to/your/code-scanner-server/build/index.js" // <-- Replace this path! (e.g., "C:\\Users\\YourUser\\Projects\\code-scanner-server\\build\\index.js" on Windows)
      ],
      "env": {},
      "disabled": false,
      "autoApprove": [] // Add tool names here for auto-approval if desired
    }
  }
}
```
*Remember to restart your MCP client application (IDE, Desktop App) after modifying the configuration for changes to take effect.*

## Development

*   **Watch Mode:** Automatically rebuild the project when source files change:
    ```bash
    npm run watch
    ```
*   **Debugging (MCP Mode):** Debugging MCP servers over stdio can be complex. Use the MCP Inspector tool for easier debugging:
    ```bash
    npm run inspector
    ```
    This starts the server with the Node.js inspector attached and provides a URL to connect debugging tools (like Chrome DevTools).

## Acknowledgments

This project was significantly developed with the assistance of AI, primarily using Google's Gemini 2.5 Pro model accessed via the Roo Code extension for Visual Studio Code.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.