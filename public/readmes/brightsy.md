# Brightsy MCP Server

This is a Model Context Protocol (MCP) server that connects to an Brightsy AI agent.

## Installation

```bash
npm install
```

## Usage

To start the server:

```bash
npm start -- --agent-id=<your-agent-id> --api-key=<your-api-key>
```

Or with positional arguments:

```bash
npm start -- <your-agent-id> <your-api-key> [tool-name] [message]
```

You can also provide an initial message to be sent to the agent:

```bash
npm start -- --agent-id=<your-agent-id> --api-key=<your-api-key> --message="Hello, agent!"
```

### Customizing the Tool Name

By default, the MCP server registers a tool named "brightsy". You can customize this name using the `--tool-name` parameter:

```bash
npm start -- --agent-id=<your-agent-id> --api-key=<your-api-key> --tool-name=<custom-tool-name>
```

You can also set the tool name as the third positional argument:

```bash
npm start -- <your-agent-id> <your-api-key> <custom-tool-name>
```

Or using the `BRIGHTSY_TOOL_NAME` environment variable:

```bash
export BRIGHTSY_TOOL_NAME=custom-tool-name
npm start -- --agent-id=<your-agent-id> --api-key=<your-api-key>
```

### Environment Variables

The following environment variables can be used to configure the server:

- `BRIGHTSY_AGENT_ID`: The agent ID to use (alternative to command line argument)
- `BRIGHTSY_API_KEY`: The API key to use (alternative to command line argument)
- `BRIGHTSY_TOOL_NAME`: The tool name to register (default: "brightsy")

## Testing the agent_proxy Tool

The agent_proxy tool allows you to proxy requests to an Brightsy AI agent. To test this tool, you can use the provided test scripts.

### Prerequisites

Before running the tests, set the following environment variables:

```bash
export AGENT_ID=your-agent-id
export API_KEY=your-api-key
# Optional: customize the tool name for testing
export TOOL_NAME=custom-tool-name
```

Alternatively, you can pass these values as command-line arguments:

```bash
# Using named arguments
npm run test:cli -- --agent-id=your-agent-id --api-key=your-api-key --tool-name=custom-tool-name

# Using positional arguments
npm run test:cli -- your-agent-id your-api-key custom-tool-name
```

### Running the Tests

To run all tests:

```bash
npm test
```

To run specific tests:

```bash
# Test using the command line interface
npm run test:cli

# Test using the direct MCP protocol
npm run test:direct
```

### Test Scripts

1. **Command Line Test** (`test-agent-proxy.ts`): Tests the agent_proxy tool by running the MCP server with a test message.

2. **Direct MCP Protocol Test** (`test-direct.ts`): Tests the agent_proxy tool by sending a properly formatted MCP request directly to the server.

## How the Tool Works

The MCP server registers a tool (named "brightsy" by default) that forwards requests to an OpenAI-compatible AI agent and returns the response. It takes a `messages` parameter, which is an array of message objects with `role` and `content` properties.

Example usage in an MCP client:

```javascript
// Using the default tool name
const response = await client.callTool("brightsy", {
  messages: [
    {
      role: "user",
      content: "Hello, can you help me with a simple task?"
    }
  ]
});

// Or using a custom tool name if configured
const response = await client.callTool("custom-tool-name", {
  messages: [
    {
      role: "user",
      content: "Hello, can you help me with a simple task?"
    }
  ]
});
```

The response will contain the agent's reply in the `content` field.
