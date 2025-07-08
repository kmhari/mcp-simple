# ConsultingAgents MCP Server

A Model Context Protocol (MCP) server that allows Claude Code to consult with additional AI agents for code and problem analysis. This server provides access to Darren (OpenAI), Sonny (Anthropic), Sergey (OpenAI with web search), and Gemma (Google Gemini with repository analysis) as expert consultants, enabling multi-model perspective on coding problems.

## Features

- **Darren**: OpenAI expert coding consultant powered by o3-mini model with high reasoning capabilities
- **Sonny**: Anthropic expert coding consultant powered by Claude 3.7 Sonnet with enhanced thinking (Note: somewhat redundant now that Claude Code has native Extended Thinking mode)
- **Sergey**: OpenAI web search specialist powered by GPT-4o for finding relevant documentation and examples (Note: somewhat redundant now that Claude Code has native web search capabilities)
- **Gemma**: Google Gemini specialist powered by gemini-2.5-pro-exp-03-25 with 1M token context for comprehensive repository analysis
- **MCP Integration**: Seamless integration with Claude Code via MCP protocol
- **Multiple Transport Options**: Supports stdio (for direct Claude Code integration) and HTTP/SSE transport

## Prerequisites

- Python 3.8+
- OpenAI API key
- Anthropic API key
- Google API key
- Claude Code CLI (for integration)

## Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/consulting-agents-mcp.git
   cd consulting-agents-mcp
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python -m venv mcp_venv
   source mcp_venv/bin/activate  # On Windows: mcp_venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up API keys**:
   Create a `.env` file in the project root:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   GOOGLE_API_KEY=your_google_api_key_here
   ```

5. **Start the server**:
   ```bash
   chmod +x start_mcp_server.sh
   ./start_mcp_server.sh
   ```

## Integration with Claude Code

1. **Register the MCP server** with Claude Code:
   ```bash
   claude mcp add ConsultingAgents /absolute/path/to/consulting-agents-mcp/start_mcp_server.sh
   ```

2. **Start Claude Code** with MCP integration:
   ```bash
   claude --mcp-debug
   ```

3. **Use the tools** in Claude Code:
   ```
   Now you can use consult_with_darren, consult_with_sonny, consult_with_sergey, and consult_with_gemma functions in Claude Code.
   ```

## Available Tools

The MCP server provides four consulting tools:

### `consult_with_darren`
Uses OpenAI's o3-mini model with high reasoning to analyze code and provide recommendations.

Parameters:
- `consultation_context`: Description of the problem (required)
- `source_code`: Optional code to analyze

### `consult_with_sonny`
Uses Claude 3.7 Sonnet with enhanced thinking to provide in-depth code analysis.

Parameters:
- `consultation_context`: Description of the problem (required)
- `source_code`: Optional code to analyze

**Note:** This agent is somewhat redundant now that Claude Code has native Extended Thinking mode, but may still be useful for getting a second opinion or different approach from another Claude model.

### `consult_with_sergey`
Uses GPT-4o with web search capabilities to find relevant documentation and examples.

Parameters:
- `consultation_context`: Description of what information or documentation you need (required)
- `search_query`: Optional specific search query to use
- `source_code`: Optional code for context

**Note:** This agent is somewhat redundant now that Claude Code has native web search capabilities, but may still be useful for comparing search results between GPT-4o and Claude, or getting a different perspective.

### `consult_with_gemma`
Uses Google's Gemini 2.5 Pro model with 1M token context window to analyze entire repositories and provide comprehensive development plans.

Parameters:
- `consultation_context`: Description of the task or feature to be implemented (required)
- `repo_url`: GitHub repository URL to analyze (required) - **IMPORTANT: Always specify the complete and correct GitHub URL (e.g., "https://github.com/username/repo")**
- `feature_description`: Detailed description of the feature to implement (required)

**Note:** This agent is particularly useful as Claude Code does not natively have the ability to analyze entire repositories in a single context.

**Important URL Specification:** When using Gemma, always provide the exact GitHub repository URL. Claude Code may incorrectly infer the repository URL from your local directory path, which can lead to repository access errors. The URL should be in the format `https://github.com/username/repository` with the correct case sensitivity.

## Advanced Configuration

### Environment Variables

- `MCP_TRANSPORT`: Transport protocol (default: "stdio", alternatives: "http", "sse")
- `HOST`: Server host when using HTTP/SSE transport (default: "127.0.0.1")
- `PORT`: Server port when using HTTP/SSE transport (default: 5000)

### HTTP API (When Using HTTP Transport)

When running with HTTP transport, the server provides these endpoints:

#### Health Check
```
GET /health
```

Returns server status and available agents.

#### Model Consultation
```
POST /consult
```

Request body for Darren or Sonny:
```json
{
  "agent": "Darren",
  "consultation_context": "I have a bug in my code where...",
  "source_code": "def example():\n    return 'hello'"
}
```

Request body for Sergey:
```json
{
  "agent": "Sergey",
  "consultation_context": "How do I implement JWT authentication in Express?",
  "search_query": "express.js JWT auth implementation"
}
```

Request body for Gemma:
```json
{
  "agent": "Gemma",
  "consultation_context": "Adding user authentication to the API",
  "repo_url": "https://github.com/username/repo",
  "feature_description": "Implement basic username/password authentication for API access"
}
```

**Important:** Always provide the exact and complete GitHub repository URL in the `repo_url` field. Do not rely on Claude Code to infer this from your local directory path.

## Troubleshooting

- **MCP Server Not Found**: Verify the absolute path in your claude mcp add command
- **API Authentication Errors**: Check that your API keys are correctly set in the .env file
- **Connection Issues**: Ensure the MCP server is running before starting Claude Code
- **Debug Logs**: Check the terminal where the MCP server is running for detailed logs

## Updating to a New Version

When updating to a new version of consulting-agents-mcp, follow these steps:

1. **Update the repository code** (pull latest changes)
2. **Restart the MCP server**:
   ```bash
   ./start_mcp_server.sh
   ```
3. **Remove the existing MCP server from Claude Code**:
   ```bash
   claude mcp remove ConsultingAgents
   ```
4. **Re-add the MCP server to Claude Code with the absolute path**:
   ```bash
   claude mcp add ConsultingAgents /absolute/path/to/consulting-agents-mcp/start_mcp_server.sh
   ```

This process ensures Claude Code is using the updated version of the MCP server with any new models or functionality.

## Development

### Running in Development Mode

1. Start the server with debug output:
   ```bash
   DEBUG=true ./start_mcp_server.sh
   ```

2. Test HTTP endpoints (when using HTTP transport):
   ```bash
   # Test Darren
   curl -X POST http://localhost:5000/consult \
     -H "Content-Type: application/json" \
     -d '{"agent":"Darren","consultation_context":"Test message"}'
   
   # Test Sonny
   curl -X POST http://localhost:5000/consult \
     -H "Content-Type: application/json" \
     -d '{"agent":"Sonny","consultation_context":"Test message"}'
   
   # Test Sergey
   curl -X POST http://localhost:5000/consult \
     -H "Content-Type: application/json" \
     -d '{"agent":"Sergey","consultation_context":"Test message","search_query":"example"}'
   
   # Test Gemma
   curl -X POST http://localhost:5000/consult \
     -H "Content-Type: application/json" \
     -d '{"agent":"Gemma","consultation_context":"Add user authentication","repo_url":"https://github.com/username/repo","feature_description":"Implement basic username/password authentication for API access"}'
   ```

### Project Structure

- `mcp_consul_server.py`: Main MCP server implementation
- `start_mcp_server.sh`: Script to start the server with proper environment
- `requirements.txt`: Python dependencies

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.