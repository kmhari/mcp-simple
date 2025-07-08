# MCP Expr-Lang

[![smithery badge](https://smithery.ai/badge/@ivan-saorin/mcp-expr-lang)](https://smithery.ai/server/@ivan-saorin/mcp-expr-lang)

A powerful expression evaluation tool for Claude Desktop using the Model Context Protocol (MCP).

## Overview

MCP Expr-Lang provides a seamless integration between Claude AI and the powerful [expr-lang](https://expr-lang.org/) expression evaluation engine. This tool allows you to perform complex data manipulations, calculations, and transformations directly within your Claude conversations.

With MCP Expr-Lang, you can:

- Evaluate mathematical expressions
- Transform and filter arrays and objects
- Sort complex data structures
- Perform string manipulations
- Use conditional logic
- And much more!

## Installation

### Installing via Smithery

To install MCP Expr-Lang for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@ivan-saorin/mcp-expr-lang):

```bash
npx -y @smithery/cli install @ivan-saorin/mcp-expr-lang --client claude
```

### Prerequisites

- Go 1.18 or higher
- Claude Desktop application
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/ivan-saorin/mcp-expr-lang.git
cd mcp-expr-lang
```

### Step 2: Install Dependencies

```bash
go mod download
```

### Step 3: Build the Application

#### For Windows

```bash
go build -o bin/server.exe
```

#### For macOS/Linux

```bash
go build -o bin/server
chmod +x bin/server
```

### Step 4: Configure Claude Desktop

1. Open Claude Desktop
2. Go to Settings
3. Navigate to the "Advanced" section
4. Add the following configuration to your `config.json`:

#### For Windows

```json
{
  "mcpServers": {
    "eval": {
      "command": "C:\\path\\to\\mcp-expr-lang\\bin\\server.exe"
    }
  }
}
```

#### For macOS/Linux

```json
{
  "mcpServers": {
    "eval": {
      "command": "/path/to/mcp-expr-lang/bin/server"
    }
  }
}
```

5. Save the configuration and restart Claude Desktop

## Usage

Once installed, you can use the `eval` tool directly in your conversations with Claude. Simply ask Claude to evaluate an expression using the tool.

### Basic Example

```
User: Use eval to calculate "10 + 5 * 3"

Claude: [Uses eval tool]
Result: 10 + 5 * 3 = 25
```

### Complex Example

```
User: We have users = [{"Name": "John", "Age": 30},{"Name": "Ivan", "Age": 51},{"Name": "Eve", "Age": 15}]
Use eval to calculate "sortBy(users, .Age, "desc")"

Claude: [Uses eval tool]
Result: The expression returns the users sorted by age in descending order:
[
  {"Age": 51, "Name": "Ivan"},
  {"Age": 30, "Name": "John"},
  {"Age": 15, "Name": "Eve"}
]
```

For more examples please see [EXAMPLES](./EXAMPLES.md)

## Features

MCP Expr-Lang supports all features of the expr-lang engine, including:

- **Arithmetic operations**: Addition, subtraction, multiplication, division, modulo, exponentiation
- **String operations**: Concatenation, length, uppercase/lowercase conversion
- **Boolean operations**: AND, OR, NOT, comparison operators
- **Array operations**: Mapping, filtering, reducing, sorting
- **Object manipulation**: Property access, transformation
- **Conditional logic**: Ternary operators, if-else expressions
- **Built-in functions**: Mathematical, string, array, and date functions

For a complete guide to the expression language syntax and capabilities, see the [expr-lang documentation](https://expr-lang.org/docs/language-definition).

## Troubleshooting

### Common Issues

1. **Tool not appearing in Claude**: Make sure the path in your `config.json` is correct and Claude Desktop has been restarted.

2. **Execution errors**: Check that the expression syntax is correct according to the expr-lang documentation.

3. **Permission issues (macOS/Linux)**: Ensure the server binary has execution permissions (`chmod +x bin/server`).

### Getting Help

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/ivan-saorin/mcp-expr-lang/issues) section on GitHub
2. Open a new issue if your problem hasn't been reported

## Contributing

Contributions are welcome! If you'd like to improve MCP Expr-Lang:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [expr-lang](https://github.com/expr-lang/expr) for the powerful expression evaluation engine
- [mcp-golang](https://github.com/metoro-io/mcp-golang) for the Model Context Protocol implementation
- [Claude AI](https://claude.ai/) for the AI assistant platform

---

Made with ❤️ by [Ivan Saorin](https://github.com/ivan-saorin)
