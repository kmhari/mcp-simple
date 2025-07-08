# MCP Example Server

This is a demonstration server implementing the Model Context Protocol (MCP). It provides a simple example of how to create an MCP server with custom tools.

## Features

- Built with Express.js and the MCP SDK
- Implements Server-Sent Events (SSE) for real-time communication
- Includes a demo greeting tool

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Running the Server

Start the server with:
```bash
npm start
```

The server will run on port 8080 by default.

Add the following to the `mcp.json` file

```json
{
  "mcpServers": {
    "greeter-server-example": {
      "name": "MCP Greeter Server Example",
      "url": "http://localhost:8080/sse"
    }
  }
}
```

## License

MIT

