# MCP Orchestrator

The MCP Orchestrator is a tool designed to manage and execute multiple tools in a coordinated manner. It provides a framework for defining workflows and dependencies between tools.

## Features

- Define workflows with multiple steps
- Specify dependencies between steps
- Pass context data between steps

## Installation

To install the MCP Orchestrator, use the following command:

```bash
pip install mcp-orchestrator
```

## Using the Orchestrate Chain Tool

The `orchestrate_chain` tool allows you to execute a sequence of tools in a defined order with dependencies. Here's how to use it:

```json
{
    "steps": [
        {
            "name": "step1",
            "tools": ["tool1", "tool2"],
            "depends_on": []
        },
        {
            "name": "step2",
            "tools": ["tool3"],
            "depends_on": ["step1"]
        }
    ],
    "initial_context": {
        "key": "value"
    }
}
```

### Configuration Properties:

- `steps`: Array of step configurations
  - `name`: Unique identifier for the step
  - `tools`: Array of tool names to execute in this step
  - `depends_on`: Array of step names that must complete before this step runs
- `initial_context`: Optional object with initial context data passed to the first step

Steps will execute in order based on their dependencies. Steps with no dependencies run first, followed by steps whose dependencies have been satisfied.