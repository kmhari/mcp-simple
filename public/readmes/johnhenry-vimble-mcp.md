# vimble-mcp

A Model Context Protocol (MCP) server for executing JavaScript code using Vimble.

## Features

- Execute arbitrary JavaScript code in a sandboxed environment.
- Time-limited execution (10 second default) to prevent runaway scripts.
- Debug mode for verbose logging.

## Installation

### Prerequisites

- node/npx

### Installation

Add the following to your MCP JSON configuration

```json
{
  "mcpServers": {
    ...
    "vimble-mcp": {
      "command": "npx",
      "args": [ "-y", "vimble-mcp"]
    }
  }
}
```

## Usage

### Tool: execute_javascript

- **Name:** execute_javascript
- **Description:** Execute JavaScript code. Use `console.log` to emit output.
- **Input Schema:**

```ts
{
  code: string;      // JavaScript code to execute
  context?: object;  // Optional context injected into the execution environment
}
```

- **Response:**

```ts
{
  content: [{ type: "text", text: string }];
  success: boolean;
  error?: string;
}
```

## License

This project is licensed under the MIT License
