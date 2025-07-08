# Code Cleanup MCP Server

A Bun TypeScript project that provides a Model Context Protocol (MCP) server for cleaning up code files using Google's Generative AI. It backs up original files in a `.stash` directory and allows users to optionally define custom system prompts for the cleanup process.

## Features

- Cleans up code files with a professional software engineering focus (removes unused imports, ensures consistent formatting, etc.).
- Supports custom system prompts for flexible cleanup instructions.
- Backs up original files in a `.stash` directory before modification.
- Provides tools to manage the stash directory.
- Built with strong TypeScript typing for reliability.

## Installation

For **Roo Code**

```
{
  "mcpServers": {
    "code-cleanup": {
      "type": "stdio",
      "timeout": 300,
      "command": "npx",
      "args": ["--yes", "@first-to-fly/code-cleanup"],
      "env": {
        "CODEBASE_PATH": "__PWD__",
        "GOOGLE_API_KEY": "__CODEBASE_GOOGLE_API_KEY__",
        <!-- "SYSTEM_INSTRUCTION": "This is the instruction to clean up the code.", -->
        <!-- "MODEL": "gemini-1.5-pro by default. Feel free to use different one." -->
      },
      "alwaysAllow": ["cleanup_code_files"],
      "disabled": false
    }
  }
}
```

**Default `SYSTEM_INSTRUCTION`**

```
Clean up the provided code like a professional software engineer, focusing on:

* Removing unused imports, variables, and redundant one line comments (retain only meaningful comment and documentation).
* Ensuring consistent naming and formatting according to language best practices.
* Simplifying minor inefficiencies (e.g., redundant calculations) *without* altering the core logic.
* Removing unnecessary whitespace while preserving single-line breaks between logical blocks of code.

Crucially, *do not* change the code's original logic, variable names (unless obviously incorrect style), or overall functionality.  Do not add any new comments except to clarify existing deprecated code. Do not rewrite or restructure major sections of code.

Output *only* the cleaned, raw code, with proper indentation and formatting.  Do not include any introductory phrases, explanations, annotations, or markdown formatting (backticks or otherwise). The output should be the code itself, ready to be copied and pasted.

Example:

**Not like this:**

\`\`\`javascript
console.log("hello");
\`\`\`

**Like this:**

console.log("hello")

---
Provide back raw code.
```
