# Function Lookup MCP Server

A Model Context Protocol (MCP) server that helps AI assistants like Copilot or Claude analyze code by looking up function usage within source files.

## Features

- **Function Lookup**: Find where and how specific functions are used in your codebase
- Supports Python and TypeScript/TSX files
- Built with the official MCP SDK for standardized protocol support
- Uses regex pattern matching for reliable function search

## Installation

1. Clone this repository:

   ```
   git clone <repository-url from this repository>
   cd MCP_OA
   ```

2. Install dependencies:

   ```
   npm install --legacy-peer-deps
   ```

   _Note: The `--legacy-peer-deps` flag is required to handle dependency conflicts between packages._

## Building

Build the TypeScript code:

```
npm run build
```

This compiles the source code to the `dist` directory.

## Setting Up with an MCP-Compatible Assistant

### VS Code Copilot Extension

1. Open VS Code settings
2. Search for "MCP" or "Model Context Protocol"
3. Add a new server with these settings:
   - **Server Name**: `function-lookup` (or any name you prefer)
   - **Command**: `node`
   - **Arguments**: `dist/src/index.js` (path to the compiled dist/src/index.js on your machine)
   - **Environment Variables**: None needed

### Claude Code Extension or Amp Codesearch Direct Extension usage

1. Open Claude or User settings in VS Code
2. Navigate to the "MCP Servers" section
3. Add a new server with:
   ```json
   {
     "mcpServers": {
       "function-lookup": {
         "command": "node",
         "args": ["dist/src/index.js"]
       }
     }
   }
   ```

## Using the Tools

### functionLookup

This tool finds occurrences of a specific function within a source file.

**Parameters**:

- `functionName`: The name of the function to look for
- `filePath`: Path to the file to analyze

**Example prompt**:

```
Please find where the 'calculate_sum' function is used in src/calculator.py.
```

## Implementation Details

The server uses regex pattern matching to find function occurrences in files. The implementation is:

1. Reads the specified file
2. Uses a regular expression to find all occurrences of the function name as a word boundary
3. Returns the line numbers where the function is found
4. Handles errors gracefully with appropriate messages

## Testing

The project includes a comprehensive test suite in the `tests` directory.

To run the tests:

1. Build the project:

   ```
   npm run build
   ```

2. Run the test client:
   ```
   npm run test
   ```

The test client will:

1. Connect to the MCP server
2. List available tools
3. Run a series of test cases against the `functionLookup` tool:
   - Finding functions in the main source code
   - Finding functions in test sample files
   - Testing with non-existent functions
4. Display detailed results for each test case
5. Show a test summary at the end

### Test Files

- `tests/test-client.ts`: The main test runner that connects to the server and runs test cases
- `tests/sample.ts`: A sample file with multiple functions for testing the lookup functionality

You should see output showing the lines where different functions are found in the specified files and a summary of passed/failed tests.

## Manual Testing with MCP Client

You can also test the server by running it directly (note that this will run the server to allow manual testing):

```
npm run start
```

And then connect to it using any MCP-compatible client.

## Troubleshooting

If you encounter connection issues with the MCP server:

1. Make sure you're using the correct path to the compiled script (`dist/src/index.js`)
2. Check that all dependencies are installed correctly
3. Look for detailed error messages in the server logs
4. If you see protocol version errors, make sure your client is compatible with the MCP server
