[![MseeP Badge](https://mseep.net/pr/bsmi021-mcp-mistral-codestral-badge.jpg)](https://mseep.ai/app/bsmi021-mcp-mistral-codestral)

# Mistral Codestral MCP Server

An MCP server implementation for the Mistral Codestral API, providing code completion, bug fixing, and test generation capabilities.

## Features

- Code completion with Mistral's Codestral model
- Bug detection and fixing
- Automated test generation
- Support for multiple programming languages
- Rate limiting and error handling
- Resource access for code files
- Fill-in-the-Middle (FIM) completion support
- Comprehensive input validation using Zod schemas

## Installation

1. Clone this repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and add your Mistral API key:

   ```bash
   cp .env.example .env
   ```

4. Build the project:

   ```bash
   npm run build
   ```

## Usage

Start the server:

```bash
npm start
```

### Configuration

Add your Mistral API key to the `.env` file:

```
MISTRAL_API_KEY=your_api_key_here
```

### Available Tools

#### code_completion

Process code for completion, bug fixing, or test generation:

Parameters:

- `code` (string, required): The code to process
- `language` (string, optional): Programming language
- `task` (string, required): One of:
  - `"complete"`: Code completion
  - `"fix"`: Bug fixing
  - `"test"`: Test generation
  - `"fim"`: Fill-in-the-Middle completion

### API Details

The server supports two main Mistral models:

- `codestral-latest`: Default model for code-related tasks
- `codestral-mamba-latest`: Alternative model with Mamba architecture

Features include:

- Automatic rate limiting (100ms minimum between requests)
- 30-second timeout for API calls
- Comprehensive error handling for API responses
- Response validation using Zod schemas
- Automatic extraction of code blocks from responses
- Debug logging for API interactions

## Development

Run in development mode with auto-reloading:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

## Error Handling

The server implements comprehensive error handling:

- API errors are properly caught and formatted
- Rate limiting is implemented
- Input validation using Zod schemas
- Proper error propagation to clients
- Specific error messages for common issues:
  - Authentication failures
  - Rate limit exceeded
  - Server errors
  - Invalid input validation

## Resource Access

The server provides access to code files through the `file://code` resource URI, allowing integration with workspace files.

## License

MIT
