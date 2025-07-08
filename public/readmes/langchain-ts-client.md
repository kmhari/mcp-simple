# mcp-langchain-ts-client

A LangChain.js client for Model Context Protocol.

This is a port of [rectalogic/langchain-mcp](https://github.com/rectalogic/langchain-mcp) to the JS/TS LangChain and MCP APIs.

## Installation

```bash
npm install mcp-langchain-ts-client
```

## Usage

```typescript
const serverParams = {
  command: "npx",
  args: [
    "-y",
    "@modelcontextprotocol/server-everything"
  ]
}

// Initialize the toolkit
const toolkit = new MCPToolkit(serverParams);
await toolkit.initialize();

// Extract LangChain.js compatible tools
const tools = toolkit.tools;

// Use the tools
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatAnthropic } from "@langchain/anthropic";

const llm = new ChatAnthropic({ model: 'claude-3-5-sonnet-20241022' });
const agent = createReactAgent({ llm, tools });
```