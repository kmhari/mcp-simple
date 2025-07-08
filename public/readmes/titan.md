# Titan Memory MCP Server

The project has been fundamentally fixed - the core architectural problem (incompatible custom ToolResponse interface) has been resolved, and the MCP Titan Memory System is now compatible with the official MCP SDK v1.12.0.
The remaining errors are primarily code quality and type safety improvements rather than blocking functionality issues. The server should now be able to run and provide its 16 sophisticated memory tools for agentic AI models.

## System Prompt for LLMs (Cursor/Claude MCP)

```markdown
You are connected to the @henryhawke/mcp-titan MCP server. Use the tools exactly as documented in docs/llm-system-prompt.md. For a comprehensive overview of the system architecture, see [docs/architecture-overview.md](docs/architecture-overview.md). No human intervention is required except for adding the mcp-titan llm-system-prompt rule to the client.

- Always use the MCP tools for all memory, training, and state operations.
- Always initialize the model with `init_model` before using any other tool.
- Use `help` to discover available tools and their parameter schemas.
- Use `save_checkpoint` and `load_checkpoint` to persist and restore memory state.
- Use `reset_gradients` if you encounter training instability or errors.
- Use `prune_memory` when memory capacity drops below 30%.
- Always check tool responses for errors (`isError: true` or `type: "error"`) and handle them as documented.
- Follow all best practices and error handling as described in docs/llm-system-prompt.md.
- Do not use any implementation details or code not exposed by the server.
- Reference docs/llm-system-prompt.md for the latest schemas and usage examples.

This prompt is copy-pastable and should be used as the system prompt for any LLM (Cursor, Claude, or other MCP-compliant clients) to ensure correct and robust operation with MCP Titan.
```

## Installation & Usage as MCP Server for Cursor or Claude

### Prerequisites

- Node.js (v18 or later recommended)
- npm (comes with Node.js)
- (Optional) Docker, if you want to run in a container

### 1. Clone the Repository

```bash
git clone https://github.com/henryhawke/mcp-titan.git
cd titan-memory
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Project

```bash
npm run build
```

### 4. Start the MCP Server

```bash
npm start
```

The server will start and listen for MCP tool requests. By default, it runs on port 8080 (or as configured in your environment).

### 5. Integrate with Cursor or Claude

- **Cursor**: Ensure MCP is enabled in Cursor settings. Cursor will auto-detect and connect to the running MCP server.
- **Claude Desktop**: Set the MCP server endpoint in Claude's settings to `http://localhost:8080` (or your configured host/port).

### 6. Test the MCP Server

You can use the provided tool APIs (see below) or connect via Cursor/Claude to verify memory operations.

---
Ideally this just runs in yolo mode in cursor (or claude desktop) without human intervention and creates a "brain" available independent of LLM version.

A neural memory system for LLMs that can learn and predict sequences while maintaining state through a memory vector. This MCP (Model Context Protocol) server provides tools for Claude 3.7 Sonnet and other LLMs to maintain memory state across interactions.

## Features

- **Perfect for Cursor**: Now that Cursor automatically runs MCP in yolo mode, you can take your hands off the wheel with your LLM's new memory
- **Neural Memory Architecture**: Transformer-based memory system that can learn and predict sequences
- **Memory Management**: Efficient tensor operations with automatic memory cleanup
- **MCP Integration**: Fully compatible with Cursor and other MCP clients
- **Text Encoding**: Convert text inputs to tensor representations
- **Memory Persistence**: Save and load memory states between sessions

## Available Tools

The Titan Memory MCP server provides the following tools:

### `help`

Get help about available tools.

**Parameters:**

- `tool` (optional): Specific tool name to get help for
- `category` (optional): Category of tools to explore
- `showExamples` (optional): Include usage examples
- `verbose` (optional): Include detailed descriptions

### `init_model`

Initialize the Titan Memory model with custom configuration.

**Parameters:**

- `inputDim`: Input dimension size (default: 768)
- `hiddenDim`: Hidden dimension size (default: 512)
- `memoryDim`: Memory dimension size (default: 1024)
- `transformerLayers`: Number of transformer layers (default: 6)
- `numHeads`: Number of attention heads (default: 8)
- `ffDimension`: Feed-forward dimension (default: 2048)
- `dropoutRate`: Dropout rate (default: 0.1)
- `maxSequenceLength`: Maximum sequence length (default: 512)
- `memorySlots`: Number of memory slots (default: 5000)
- `similarityThreshold`: Similarity threshold (default: 0.65)
- `surpriseDecay`: Surprise decay rate (default: 0.9)
- `pruningInterval`: Pruning interval (default: 1000)
- `gradientClip`: Gradient clipping value (default: 1.0)

### `forward_pass`

Perform a forward pass through the model to get predictions.

**Parameters:**

- `x`: Input vector or text
- `memoryState` (optional): Memory state to use

### `train_step`

Execute a training step to update the model.

**Parameters:**

- `x_t`: Current input vector or text
- `x_next`: Next input vector or text

### `get_memory_state`

Get the current memory state and statistics.

**Parameters:**

- `type` (optional): Optional memory type filter

### `manifold_step`

Update memory along a manifold direction.

**Parameters:**

- `base`: Base memory state
- `velocity`: Update direction

### `prune_memory`

Remove less relevant memories to free up space.

**Parameters:**

- `threshold`: Pruning threshold (0-1)

### `save_checkpoint`

Save memory state to a file.

**Parameters:**

- `path`: Checkpoint file path

### `load_checkpoint`

Load memory state from a file.

**Parameters:**

- `path`: Checkpoint file path

### `reset_gradients`

Reset accumulated gradients to recover from training issues.

**Parameters:** None

## Usage with Claude 3.7 Sonnet in Cursor

The Titan Memory MCP server is designed to work seamlessly with Claude 3.7 Sonnet in Cursor. Here's an example of how to use it:

```javascript
// Initialize the model
const result = await callTool("init_model", {
  inputDim: 768,
  memorySlots: 10000,
  transformerLayers: 8,
});

// Perform a forward pass
const { predicted, memoryUpdate } = await callTool("forward_pass", {
  x: "const x = 5;", // or vector: [0.1, 0.2, ...]
  memoryState: currentMemory,
});

// Train the model
const result = await callTool("train_step", {
  x_t: "function hello() {",
  x_next: "  console.log('world');",
});

// Get memory state
const state = await callTool("get_memory_state", {});
```

## Memory Management

The Titan Memory MCP server includes sophisticated memory management to prevent memory leaks and ensure efficient tensor operations:

1. **Automatic Cleanup**: Periodically cleans up unused tensors
2. **Memory Encryption**: Securely stores memory states
3. **Tensor Validation**: Ensures tensors have the correct shape
4. **Error Recovery**: Handles tensor errors gracefully

## Architecture

The Titan Memory MCP server is built with a modular architecture:

- **TitanMemoryServer**: Main server class that registers tools and handles requests
- **TitanMemoryModel**: Neural memory model implementation
- **VectorProcessor**: Handles input processing and text encoding
- **MemoryManager**: Manages tensor operations and memory cleanup

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
