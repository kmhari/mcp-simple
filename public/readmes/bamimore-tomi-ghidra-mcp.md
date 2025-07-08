# 🔍 Ghidra MCP Server

This project lets you use [Ghidra](https://ghidra-sre.org/) in headless mode to extract rich binary analysis data (functions, pseudocode, structs, enums, etc.) into a JSON file, and expose it to LLMs like Claude via [Model Context Protocol (MCP)](https://modelcontextprotocol.io/).

It turns Ghidra into an interactive reverse-engineering backend.

---

## 🚀 Features

- Decompiles a binary using Ghidra headless mode
- Extracts:
  - Function pseudocode, names, parameters, variables, strings, comments
  - Data structures (structs), enums, and function definitions
- Outputs to `ghidra_context.json`
- MCP server exposes tools like:
  - `list_functions()`, `get_pseudocode(name)`
  - `list_structures()`, `get_structure(name)`
  - `list_enums()`, `get_enum(name)`
  - `list_function_definitions()`, `get_function_definition(name)`

---

## ⚙️ System Requirements

- macOS (tested)
- Python 3.10+
- Ghidra 11.3.1+
- Java 21 (Temurin preferred)
- MCP client (e.g. Claude Desktop)
- [`mcp` CLI](https://modelcontextprotocol.io/docs/cli) (install via `pip install mcp`)

---

## 🧪 Installation & Setup

### ✅ 1. Install Java 21 (REQUIRED by Ghidra 11.3.1)

```bash
brew install --cask temurin@21
```

Then set it:

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 21)' >> ~/.zshrc
source ~/.zshrc
```

Check it:

```bash
java -version
```

Should say: `openjdk version "21.0.x"...`

---

### ✅ 2. Install Ghidra

Download and extract [Ghidra 11.3.1](https://ghidra-sre.org/)

---

### ✅ 3. Set up the project

```bash
cd ghidra_mcp
gcc -Wall crackme.c -o crackme
```

---

### ✅ 4. Install the server via MCP CLI

```bash
mcp install main.py
```

This registers the MCP server so Claude or other clients can access it.

---

### ✅ 5. Run in dev mode (for testing)

```bash
mcp dev main.py
```

This enables hot reload and developer logs.

---

## 🛰️ Tools Available

| Tool                         | Description                                |
|------------------------------|--------------------------------------------|
| `setup_context(...)`         | Run Ghidra on a binary                     |
| `list_functions()`           | All functions                             |
| `get_pseudocode(name)`       | Decompiled pseudocode                     |
| `list_structures()`          | All structs                               |
| `get_structure(name)`        | Details of a struct                       |
| `list_enums()`               | All enums                                 |
| `get_enum(name)`             | Enum values                               |
| `list_function_definitions()`| All function prototypes                   |
| `get_function_definition()`  | Return type & args                        |

---

## Sample Promot
Analyze the binary file located at <BINARY_PATH> using Ghidra installed at <GHIDRA_PATH>. First, set up the analysis context using both paths, then list all functions in the binary. Examine the main entry point function and provide a high-level overview of what the program does.

## 🧠 Common Issues & Fixes

### ❌ Ghidra fails with “unsupported Java version”

➡️ Fix: Install **Java 21**, not 17 or 24:

```bash
brew install --cask temurin@21
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
```

---

### ❌ `spawn uv ENOENT` (Claude Desktop can't find your UV binary)

➡️ Claude can't locate `uv` by name. To fix:

1. Run in your terminal:

```bash
which uv
```

Example output:

```
/Users/yourname/.cargo/bin/uv
```

2. Open your Claude Desktop config file:

```bash
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

3. Update it like so:

```json
{
  "mcpServers": {
    "ghidra": {
      "command": "/Users/yourname/.cargo/bin/uv",
      "args": [
        "--directory",
        "/Users/yourname/Documents/ghidra_mcp",
        "run",
        "main.py"
      ]
    }
  }
}
```

4. Restart Claude Desktop. You should now see your custom MCP tools.

---

### ❌ `The operation couldn’t be completed. Unable to locate a Java Runtime.`

��️ Fix: Java not installed or `JAVA_HOME` is unset. Follow setup instructions above.

---

## 📂 Project Structure

| File                | Purpose                          |
|---------------------|----------------------------------|
| `main.py`           | MCP server with tools            |
| `export_context.py` | Ghidra script that extracts JSON |
| `crackme.c`         | Sample C binary                  |
| `crackme`           | Compiled binary to test          |

---

## 👨‍💻 Author

Tomi Bamimore  
[Ghidra](https://ghidra-sre.org/) by the NSA  
[MCP](https://modelcontextprotocol.io/) by Anthropic
