# Langchain TypeScript with MCP Tools Integration

A TypeScript project that integrates Langchain with Model Context Protocol (MCP) tools, allowing interaction with Language Models and execution of various tools through a chat interface.

## Prerequisites

- Node.js (v14 or higher)
- npm 
- Ollama server running locally
- MCP server running locally

## Installation

1. Clone the repository:
```bash
git clone https://github.com/shashwat001/mcptools-langchain-integration.git
cd mcptools-langchain-integration
```

2. Install dependencies:
```bash
npm install
```

## Configuration

### Ollama Configuration
The project uses Ollama for LLM integration. Configure Ollama settings in `src/llm.js`:

```javascript
export const ollamaConfig = {
    baseUrl: "http://localhost:11434",
    model: "llama3.1:8b-instruct-q6_K",
    temperature: 0.1,
    maxRetries: 2
};
```

### MCP Server Configuration
MCP server settings can be configured in `src/llm.js`:

```javascript
export const mcpConfig = {
    serverUrl: 'http://localhost:7000/sse',
    clientInfo: {
        name: 'ollama-client',
        version: '1.0.0'
    }
};
```

### System Prompt
The system prompt for tool interactions can be modified in `src/llm.js`:

```javascript
export const systemPromptForTools = "In this environment you have access to a set of tools you can use to answer the user's question.\n Don't ask user to execute the functions and decide yourself whether to call the tool or not.\nNever call more than one tool at a time.";
```

## Running the Application

1. Start the Ollama server (make sure it's running on http://localhost:11434)
2. Start the MCP server (make sure it's running on http://localhost:7000)
3. Run the application:
```bash
node src/index.js
```

## Features

- Interactive chat interface with LLM
- Integration with MCP tools
- Tool execution through chat
- Support for SSE (Server-Sent Events) based MCP server

## Important Notes

### MCP Server Caution
The project currently uses an SSE-based MCP server. Exercise caution as the MCP server has write permissions that could make unintended system changes. Always review tool permissions before execution.