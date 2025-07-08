# MCP REST API and CLI Client

A **simple REST API** and **CLI client** to interact with [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) servers.

## Key Features

### 1. MCP-Compatible Servers
- Supports any [MCP-compatible servers](https://github.com/punkpeye/awesome-mcp-servers) servers.
- Pre-configured default servers:
  - **SQLite** (test.db has been provided with sample products data) 
  - **Brave Search**
- Additional MCP servers can be added in the [mcp-server-config.json](mcp-server-config.json) file

### 2. Integrated with LangChain
- Leverages LangChain to execute LLM prompts.
- Enables multiple MCP servers to collaborate and respond to a specific query simultaneously.

### 3. LLM Provider Support
- Compatible with any LLM provider that supports APIs with function capabilities.
- Examples:
  - **OpenAI**
  - **Claude**
  - **Gemini**
  - **AWS Nova**
  - **Groq**
  - **Ollama**
  - Essentially all LLM providers are supported as long as they provide a function-based API. Please refer [langchain documentation](https://python.langchain.com/docs/integrations/chat/) for more details.


## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/rakesh-eltropy/mcp-client.git
   ```

2. **Navigate to the Project Directory**
   After cloning the repository, move to the project directory:
   ```bash
   cd mcp-client
   ```
   
3. Set the OPENAI_API_KEY environment variable:
   ```bash
   export OPENAI_API_KEY=your-openai-api-key
   ```
   You can also set the `OPENAI_API_KEY` in the [mcp-server-config.json](mcp-server-config.json) file.

   You can also set the `provider` and `model` in the [mcp-server-config.json](mcp-server-config.json) file.
   e.g. `provider` can be `ollama` and `model` can be `llama3.2:3b`.


4.Set the BRAVE_API_KEY environment variable:
   ```bash
   export BRAVE_API_KEY=your-brave-api-key
   ```
   You can also set the `BRAVE_API_KEY` in the [mcp-server-config.json](mcp-server-config.json) file.
   You can get the free `BRAVE_API_KEY` from [Brave Search API](https://brave.com/search/api/).

5. Running from the CLI:
   ```bash
   uv run cli.py
   ```
   To explore the available commands, use the `help` option. You can chat with LLM using `chat` command.
   Sample prompts:
   ```bash
     What is the capital city of India?
    ```
   ```bash
     Search the most expensive product from database and find more details about it from amazon?
    ```

6. Running from the REST API:
   ```bash
   uvicorn app:app --reload
   ```
   You can use the following curl command to chat with llm:
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"message": "list all the products from my local database?"}' http://localhost:8000/chat
   ```
   You can use the following curl command to chat with llm with streaming:
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"message": "list all the products from my local database?", "streaming": true}' http://localhost:8000/chat
   ```


## Contributing

Feel free to submit issues and pull requests for improvements or bug fixes.
