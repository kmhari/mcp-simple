# Party Time MCP Server

A simple MCP server that responds with "It's Party Time" when asked about the current time.

## Overview

This is a simple implementation of an MCP server that directly reads from stdin and writes to stdout. It registers a single tool called `get-time` and always responds with "It's Party Time" when the tool is called.

The server implements the MCP protocol directly, handling JSON-RPC messages and responding appropriately.

## Installation Instructions for macOS

### 1. Build the Executable

First, build the executable:

```bash
mix deps.get
mix escript.build
```

This will create an executable named `party_time_mcp` in your project directory.

Make sure it has execute permissions:

```bash
chmod +x ./party_time_mcp
```

### 2. Configure Claude Desktop

1. Open your Claude Desktop configuration file:

```bash
open -e ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

2. Add the following to your configuration (if the file doesn't exist yet, create it with this content):

```json
{
  "mcpServers": {
    "partytime": {
      "command": "/path/to/your/party_time_mcp",
      "args": []
    }
  }
}
```

Replace `/path/to/your/party_time_mcp` with the actual path to your executable.

3. Save the file and restart Claude Desktop

### 3. Testing Your Server

1. Open Claude Desktop
2. Ask Claude "What time is it?"
3. Claude should detect your tool and respond with "It's Party Time"

## Troubleshooting

- **Claude Desktop not finding the tool**: Make sure the path in your configuration is correct and that the file has execute permissions
- **Permissions issues**: You might need to run `chmod +x ./party_time_mcp` if the executable doesn't have the right permissions
- **Configuration file issues**: Make sure your JSON is valid and properly formatted
- **Claude Desktop restart**: Ensure you've restarted Claude Desktop after making configuration changes
- **JSON parsing errors**: If you see errors like "Unexpected end of JSON input" or "Unexpected non-whitespace character after JSON":
  - This is likely because the server is outputting additional text to stdout along with the JSON responses
  - Make sure you're using the latest version of the server which fixes this issue by sending logs to stderr instead of stdout
  - The server now ensures that only clean, properly formatted JSON is sent to stdout
  - If you're still seeing these errors, check the Claude Desktop logs for more details
- **Mix.env() error**: If you see an error like `function Mix.env/0 is undefined`, this means the executable was built incorrectly. The Mix module is not available at runtime in an escript. Rebuild the executable with the latest code that fixes this issue.

## Debugging

If you're experiencing JSON errors, you can run the server manually to see its output:

```bash
./party_time_mcp
```

Then in another terminal, you can send test JSON-RPC messages to it:

```bash
echo '{"jsonrpc":"2.0","id":"test-1","method":"tools/list"}' | ./party_time_mcp
```

You can also test other message types:

```bash
# Initialize request
echo '{"jsonrpc":"2.0","id":0,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test-client","version":"0.1.0"}}}' | ./party_time_mcp

# Notifications/initialized message
echo '{"jsonrpc":"2.0","method":"notifications/initialized"}' | ./party_time_mcp

# Tools/call request
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"get-time","arguments":{}}}' | ./party_time_mcp
```

## Server Architecture

The Party Time MCP server is designed to comply with the Machine Conversation Protocol (MCP). It handles the following message types:

- `initialize`: Responds with server capabilities, server information, and protocol version. Also sends a `server/initialized` notification after processing.
- `notifications/initialized`: Handles client initialization notifications (no response required).
- `tools/list`: Returns a list of available tools.
- `tools/call`: Executes a specified tool and returns the result.

The server also includes robust error handling for invalid requests and unknown methods.

## MCP Protocol Compliance

The server implements the MCP protocol as specified in the [Model Context Protocol specification](https://modelcontextprotocol.io/). It follows the JSON-RPC 2.0 format for all messages and implements the required message types:

1. **Initialization**: The server responds to the `initialize` message with its capabilities and sends a `server/initialized` notification.
2. **Tool Discovery**: The server responds to `tools/list` with a list of available tools.
3. **Tool Execution**: The server handles `tools/call` requests for the `get-time` tool.
4. **Error Handling**: The server returns appropriate error responses for invalid requests, unknown methods, and other error conditions.

## Testing

The server includes comprehensive tests to ensure it functions correctly:

1. **Server Tests**: Tests the server's ability to handle various JSON-RPC messages, including:
   - `initialize` message handling and response validation
   - `notifications/initialized` message handling
   - `tools/list` request processing
   - `tools/call` request execution for the "get-time" tool

2. **Hermes Client Tests**: Tests the server's compatibility with the Hermes client, including:
   - Handling of initialize requests and server/initialized notifications
   - Processing of notifications/initialized messages
   - Proper response to tools/list requests
   - Correct execution of tools/call requests

3. **JSON Format Tests**: Ensures that all JSON responses are properly formatted according to the JSON-RPC 2.0 specification.

To run the tests:

```bash
mix test
```

## Rebuilding (if needed)

If you need to make changes and rebuild:

```bash
mix deps.get
mix escript.build
```

## Recent Fixes

### Notification Handling

The server was updated to properly handle the `notifications/initialized` message from Claude Desktop. This message is sent by the client to acknowledge receipt of the `server/initialized` notification.

Changes made:

- Added support for the `notifications/initialized` message
- The server now correctly processes this notification without generating errors

### JSON Parsing Errors

The server was updated to fix JSON parsing errors in Claude Desktop. The issue was that the server was outputting log messages to stdout along with the JSON responses, which confused the JSON parser in Claude Desktop.

Changes made:

- Disabled all logging to avoid interfering with JSON output
- Only clean JSON responses are now sent to stdout
- Removed duplicate startup messages
- Added a newline after each JSON response for better parsing

### Mix.env() Error Fix

The server was updated to fix the `Mix.env()` error that occurred when running as an escript. The issue was that the Mix module is not available at runtime in an escript.

Changes made:

- Replaced runtime `Mix.env()` calls with compile-time module attributes
- The server now correctly determines if it's running in test mode without relying on Mix at runtime

## Troubleshooting

If you encounter issues with the Party Time MCP server, here are some common problems and solutions:

### `Mix.env()` Error

If you see an error like `UndefinedFunctionError: function Mix.env/0 is undefined`, it means the executable was built incorrectly. The Mix module is not available at runtime in an escript. Rebuild the executable with the latest code:

```bash
mix escript.build
```

### Permission Issues

If you get a permission denied error when trying to run the executable, make it executable:

```bash
chmod +x ./party_time_mcp
```

### Configuration File Issues

If the server can't find or read a configuration file, check that the file exists and has the correct permissions.

### JSON Errors

If you see JSON parsing errors, ensure that the input to the server is valid JSON-RPC 2.0 format. The server expects messages in the following format:

```json
{
  "jsonrpc": "2.0",
  "id": "some-id",
  "method": "method-name",
  "params": {}
}
```

For notifications (messages that don't require a response), the `id` field should be omitted:

```json
{
  "jsonrpc": "2.0",
  "method": "notification-name"
}
```
