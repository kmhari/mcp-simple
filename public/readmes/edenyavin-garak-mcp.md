# MCP Server For Garak LLM Vulnerability Scanner 

A lightweight MCP (Model Context Protocol) server for Garak.

Example:

https://github.com/user-attachments/assets/f6095d26-2b79-4ef7-a889-fd6be27bbbda


---

## Tools Provided

### Overview
| Name | Description |
|------|-------------|
| list_model_types | List all available model types (ollama, openai, huggingface, ggml) |
| list_models | List all available models for a given model type |
| list_garak_probes | List all available Garak attacks/probes |
| get_report | Get the report of the last run |
| run_attack | Run an attack with a given model and probe |

### Detailed Description

- **list_model_types**
  - List all available model types that can be used for attacks
  - Returns a list of supported model types (ollama, openai, huggingface, ggml)

- **list_models**
  - List all available models for a given model type
  - Input parameters:
    - `model_type` (string, required): The type of model to list (ollama, openai, huggingface, ggml)
  - Returns a list of available models for the specified type

- **list_garak_probes**
  - List all available Garak attacks/probes
  - Returns a list of available probes/attacks that can be run

- **get_report**
  - Get the report of the last run
  - Returns the path to the report file

- **run_attack**
  - Run an attack with the given model and probe
  - Input parameters:
    - `model_type` (string, required): The type of model to use
    - `model_name` (string, required): The name of the model to use
    - `probe_name` (string, required): The name of the attack/probe to use
  - Returns a list of vulnerabilities found

---

## Prerequisites

1. **Python 3.11 or higher**: This project requires Python 3.11 or newer.
   ```bash
   # Check your Python version
   python --version
   ```

2. **Install uv**: A fast Python package installer and resolver.
   ```bash
   pip install uv
   ```
   Or use Homebrew:
   ```bash
   brew install uv
   ```
3. **Optional: Ollama**: If you want to run attacks on ollama models be sure that the ollama server is running.

```bash
ollama serve
```

---

## Installation

1. Clone this repository:
```bash
git clone https://github.com/BIGdeadLock/Garak-MCP.git
```
2. Configure your MCP Host (Claude Desktop ,Cursor, etc): 

```json
{
  "mcpServers": {
    "garak-mcp": {
      "command": "uv",
      "args": ["--directory", "path-to/Garak-MCP", "run", "garak-server"],
      "env": {}
    }
  }
}

```
---
Tested on:
- [X] Cursor
- [X] Claude Desktop

---
## Future Steps

- [ ] Add support for Smithery AI: Docker and config
- [ ] Improve Reporting
- [ ] Test and validate OpenAI models (GPT-3.5, GPT-4)
- [ ] Test and validate HuggingFace models
- [ ] Test and validate local GGML models
