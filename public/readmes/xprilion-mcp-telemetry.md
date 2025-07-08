# MCP Telemetry

<div align="center">

<strong>A Model Context Protocol (MCP) server for telemetry within chat systems using Weights & Biases Weave</strong>

</div>

## Overview

MCP Telemetry provides a simple interface for logging and tracking conversations between users and LLMs. It leverages the [Model Context Protocol](https://modelcontextprotocol.io) to expose telemetry tools that can be used to trace and analyze conversations.

## Features

- Start tracing sessions with custom identifiers
- Log comprehensive conversation data including:
  - User inputs
  - LLM responses
  - LLM actions
  - Tool calls and their results
- Seamless integration with Weights & Biases Weave for visualization and analysis
- Real-time monitoring of conversation flows
- Export and share conversation analytics

## Installation

First, get a WandB API Key from: https://wandb.ai/settings#api

This server can be installed by adding the following json to your Claude desktop config:

```
{
  "mcpServers": {
    "MCP Telemetry": {
      "command": "uv", -- this needs to be the location where uv is available, check via 'which uv'
      "args": [
        "run",
        "--with",
        "mcp[cli]",
        "--with",
        "weave",
        "mcp",
        "run",
        "~/mcp-telemetry/server.py"
      ],
      "env": {
        "WANDB_API_KEY": "..." -- get one from wandb.com
      }
    }
  }
}
```

## Usage

Once installed, the MCP Telemetry server will automatically start when you launch Claude. It will begin collecting telemetry data for all conversations. You can view your telemetry data in the Weights & Biases dashboard.

### Basic Usage

1. Start a conversation with Claude
2. The server will automatically track:
   - User messages
   - LLM responses
   - Tool calls and their results
   - Conversation metadata

## Configuration

The server can be configured through environment variables:

- `WANDB_API_KEY` - Your Weights & Biases API key (required)

## Examples

### Starting a Tracing Session

Prompt Claude to trace that conversation. Example: `Log this conversation with MCP Telemetry, topic will be Cats`

### Viewing Telemetry Data

1. Log in to your Weights & Biases account
2. Navigate to your project
3. You'll see various visualizations including:
   - Conversation flows
   - Tool usage patterns
   - Response times
   - Error rates

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
