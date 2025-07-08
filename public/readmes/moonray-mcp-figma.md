# Figma MCP Server

An MCP (Model Context Protocol) server for analyzing Figma file structures.

## Features

- Analyze Figma files to extract node hierarchies
- Supports both REST API and MCP protocol
- Configurable node tree depth

## Prerequisites

- Node.js 16+
- npm or yarn
- A Figma API key

## Installation

### From npm
```bash
npm install -g figma-mcp-server
```

### From source
```bash
git clone https://github.com/yourusername/mcp-figma.git
cd mcp-figma
npm install
npm run build
```

## Configuration

Copy the example environment file and add your Figma API key:

```bash
cp .env.example .env
```

Then edit the `.env` file and add your Figma API key:

```
FIGMA_API_KEY=your_figma_api_key_here
```

You can get a Figma API key from your Figma account settings: https://www.figma.com/developers/api#access-tokens

## Usage

### As a REST API Server

Start the server:

```bash
npm start
```

This will start an Express server on port 3000 (or the port specified in your `.env` file).

#### API Endpoints

- `GET /health` - Health check endpoint
- `GET /openapi.json` - OpenAPI specification
- `GET /mcp.json` - MCP manifest
- `POST /analyze` - Analyze a Figma file

Example request to the analyze endpoint:

```bash
curl -X POST http://localhost:3000/analyze \
  -H "Content-Type: application/json" \
  -d '{"figmaUrl": "https://www.figma.com/file/FILE_ID/PROJECT_NAME?node-id=NODE_ID", "depth": 2}'
```

### As an MCP Server

The server can be used directly by an LLM through the MCP protocol:

```bash
figma-mcp-server --cli
```

Or if running from source:

```bash
npm run start -- --cli
```

### Client Example

A simple client example is included. To use it:

```bash
node client-example.js https://www.figma.com/file/FILE_ID/PROJECT_NAME?node-id=NODE_ID 2
```

The last parameter is the optional depth parameter.

## Development

### Running in Development Mode

```bash
npm run dev
```

### Testing

```bash
npm test
```

## Docker

A Dockerfile is provided for containerized deployment:

```bash
docker build -t figma-mcp-server .
docker run -p 3000:3000 --env-file .env figma-mcp-server
```

## License

MIT
