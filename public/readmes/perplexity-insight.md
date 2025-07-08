# Perplexity Insight MCP Server

An MCP server implementation for interfacing with the Perplexity AI API, providing advanced question answering capabilities through the standardised Model Context Protocol.

## Features

- Seamless integration with Perplexity AI API
- Support for different Perplexity models (sonar-reasoning, sonar-pro, sonar-deep-research)
- Customisable system prompts and user queries
- Proper error handling and response formatting
- Rate limiting protection
- Easy integration with Windsurf IDE

## Requirements

- Node.js 18+
- Perplexity API key

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file with the following variables:

```
PERPLEXITY_API_KEY=your_api_key_here
```

## Usage

Run the server:

```bash
npm start
```

## API Tools

The server exposes the following tools:

1. `perplexity_ask` - Send a direct question to Perplexity AI
2. `perplexity_search` - Perform a search query with Perplexity AI

### Changing Models

Both tools support the following Perplexity models:

- `sonar-reasoning` (default) - Perplexity's reasoning-focused model, best for general questions
- `sonar-pro` - Enhanced model with improved capabilities for professional use cases
- `sonar-deep-research` - Specialised for in-depth research and complex queries

To specify a model when using the tools, include the `model` parameter in your request:

```
Ask Perplexity using sonar-deep-research: What are the latest advancements in quantum computing?
```

You can also customise the system prompt and maximum token count:

```
Search with Perplexity using sonar-pro with system prompt "You are a helpful research assistant" and max tokens 2000: Latest developments in renewable energy
```

### Tool Response Format

The server follows the MCP specification for tool responses:

```typescript
{
  content: [
    {
      type: "text",
      text: "Response content from Perplexity AI"
    }
  ],
  isError: false // or true if an error occurred
}
```

## Windsurf Integration

### Setting up in Windsurf

1. Build the server:
   ```bash
   npm run build
   ```

2. Open Windsurf and navigate to Settings

3. Find the "AI Settings" or "Model Context Protocol" section

4. Add a new MCP server with the following details:
   - **Name**: Perplexity Insight
   - **Type**: Local Process
   - **Command**: Path to your Node.js executable
   - **Arguments**: Path to your compiled `index.js` file
   - **Working Directory**: Path to your project directory
   - **Environment Variables**: Make sure to include `PERPLEXITY_API_KEY=your_api_key_here`

5. Enable the server and restart Windsurf if necessary

### Example Configuration

Here's an example configuration for the `mcp_config.json` file:

```json
"perplexity-ask": {
  "command": "node",
  "args": [
    "/path/to/perplexity-insight-MCP/dist/index.js"
  ],
  "cwd": "/path/to/perplexity-insight-MCP",
  "env": {
    "PERPLEXITY_API_KEY": "pplx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

Replace `/path/to/perplexity-insight-MCP` with the actual path to your installation directory and use your actual Perplexity API key.

### Using Perplexity in Windsurf

- Use the AI Assistant panel to ask questions that will be directed to Perplexity
- For web searches, include specific terms like "search for" in your queries
- To change models, include the model name in your query as shown in the "Changing Models" section
- Windsurf will automatically use the appropriate Perplexity tool based on your query

## Development

For local development:

```bash
npm run dev
```

## Troubleshooting

If you encounter issues with the MCP server:

1. Check that your API key is valid and properly set in the `.env` file
2. Verify that the response format matches the MCP specification
3. Look for any error messages in the server logs
4. Ensure Windsurf is properly configured to use the MCP server

## License

MIT
