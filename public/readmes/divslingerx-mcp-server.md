# Memory Store MCP Server

A Model Context Protocol (MCP) server that provides web search capabilities using Puppeteer.

## Features

- Web search functionality via Google
- Structured JSON results
- Lightweight and stateless design
- Easy integration with MCP-enabled systems

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mcp-server.git
   cd mcp-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Configuration

Create a `.env` file in the project root with the following environment variables:

```env
# Puppeteer configuration
PUPPETEER_EXECUTABLE_PATH=/path/to/chrome
PUPPETEER_HEADLESS=true

# Server settings
PORT=3000
```

## Usage

Start the server:

```bash
npm start
```

The server will be available to MCP clients. Example usage through MCP:

```json
{
  "tool": "search_web",
  "arguments": {
    "query": "example search"
  }
}
```

## Development

### Building the Project

```bash
npm run build
```

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
