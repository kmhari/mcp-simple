# OmniTaskAgent

A powerful multi-model task management system that can connect to various task management systems and help users choose and use the task management solution that best suits their needs.

## Features

- **Task Management System**: Create, list, update and delete tasks, support status tracking and dependency management
- **Task Decomposition and Analysis**: Break down complex tasks into subtasks, support complexity assessment and PRD automatic parsing
- **Python Native Implementation**: Built entirely in Python, seamlessly integrated with the Python ecosystem
- **Multi-Model Support**: Compatible with multiple models like OpenAI, Claude, etc., not limited to specific API providers
- **Editor Integration**: Integrate with editors like Cursor through MCP protocol for smooth development experience
- **Intelligent Workflow**: Implement intelligent task management process based on LangGraph's ReAct pattern
- **Multi-System Integration**: Can connect to various professional task management systems like mcp-shrimp-task-manager and claude-task-master
- **Cross-Scenario Application**: Suitable for general development projects, vertical domain projects, and other task systems

## Installation

```bash
# Install using uv (recommended)
uv pip install -e .

# Or install using pip
pip install -e .

# Install Node.js dependencies (for MCP server)
npm install
```

## Configuration

Create a `.env` file in the project root directory for configuration:

```ini
# Required: API keys (configure at least one)
OPENAI_API_KEY=your_openai_api_key_here
# Or
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Optional: Model configuration
LLM_MODEL=gpt-4o  # Default model
TEMPERATURE=0.2   # Creativity parameter
MAX_TOKENS=4000   # Maximum tokens
```

## Usage

### Command Line Interface (Recommended)

The simplest way to use is through the built-in command line interface:

```bash
# Start interactive command line interface
python -m omni_task_agent.cli
```

Common command examples:
- `Create task: Optimize website performance Reduce page load time by 50%`
- `List all tasks`
- `Update task 1 status to completed`
- `Decompose task 2`
- `Analyze project complexity`

### Using in LangGraph Studio

LangGraph Studio is a development environment specifically designed for LLM applications, used for visualizing, interacting with, and debugging complex agent applications.

First, ensure langgraph-cli is installed (requires version 0.1.55 or higher):

```bash
# Install langgraph-cli (requires Python 3.11+)
pip install -U "langgraph-cli[inmem]"
```

Then start the development server in the project root directory (containing langgraph.json):

```bash
# Start local development server
langgraph dev
```

This will automatically open a browser and connect to the cloud-hosted Studio interface, where you can:

1. Visualize your agent graph structure
2. Test and run agents through the UI interface
3. Modify agent state and debug
4. Add breakpoints for step-by-step agent execution
5. Implement human-machine collaboration processes

When modifying code during development, Studio will update automatically without needing to restart the service, facilitating rapid iteration and debugging.

For advanced features like breakpoint debugging:

```bash
# Enable debug port
langgraph dev --debug-port 5678
```

### Editor Integration (MCP Service)

1. Run the MCP server:

```bash
# Start STDIO-based MCP service
python run_mcp.py
```

2. Configure MCP settings in your editor (like Cursor, VSCode, etc.):

```json
{
  "mcpServers": {
    "task-master-agent": {
      "type": "stdio",
      "command": "/path/to/python",
      "args": ["/path/to/run_mcp.py"],
      "env": {
        "OPENAI_API_KEY": "your-key-here"
      }
    }
  }
}
```

## Project Structure

```
omnitaskagent/
├── omni_task_agent/     # Main code package
│   ├── agent.py           # LangGraph agent definition
│   ├── config.py          # Configuration management
│   └── cli.py             # Command line interface
├── examples/              # Example code
│   └── basic_usage.py     # Basic usage example
├── tests/                 # Test cases
├── run_mcp.py             # MCP service entry
├── adapters.py            # MCP adapters
├── langgraph.json         # LangGraph API configuration
├── package.json           # Node.js dependencies
└── pyproject.toml         # Python dependencies
```

## Reference Projects

- [mcp-shrimp-task-manager](https://github.com/cjo4m06/mcp-shrimp-task-manager.git) - Task management system implemented in JavaScript
- [AutoMCP](https://github.com/NapthaAI/automcp.git) - Tool for creating MCP services
- [LangGraph](https://github.com/langchain-ai/langgraph/tree/main/libs/prebuilt) - Agent building framework
- [langchain-mcp-adapters](https://github.com/langchain-ai/langchain-mcp-adapters.git) - LangChain MCP adapters

## License

MIT 