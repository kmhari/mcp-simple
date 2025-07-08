# LLM Responses MCP Server

A Model Context Protocol (MCP) server that allows multiple AI agents to share and read each other's responses to the same prompt.

## Overview

This project implements an MCP server with two main tool calls:

1. `submit-response`: Allows an LLM to submit its response to a prompt
2. `get-responses`: Allows an LLM to retrieve all responses from other LLMs for a specific prompt

This enables a scenario where multiple AI agents can be asked the same question by a user, and then using these tools, the agents can read and reflect on what other LLMs said to the same question.

## Installation

```bash
# Install dependencies
bun install
```

## Development

```bash
# Build the TypeScript code
bun run build

# Start the server in development mode
bun run dev
```

## Testing with MCP Inspector

The project includes support for the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is a tool for testing and debugging MCP servers.

```bash
# Run the server with MCP Inspector
bun run inspect
```

The `inspect` script uses `npx` to run the MCP Inspector, which will launch a web interface in your browser for interacting with your MCP server.

This will allow you to:
- Explore available tools and resources
- Test tool calls with different parameters
- View the server's responses
- Debug your MCP server implementation

## Usage

The server exposes two endpoints:

- `/sse` - Server-Sent Events endpoint for MCP clients to connect
- `/messages` - HTTP endpoint for MCP clients to send messages

### MCP Tools

#### submit-response

Submit an LLM's response to a prompt:

```typescript
// Example tool call
const result = await client.callTool({
  name: 'submit-response',
  arguments: {
    llmId: 'claude-3-opus',
    prompt: 'What is the meaning of life?',
    response: 'The meaning of life is...'
  }
});
```

#### get-responses

Retrieve all LLM responses, optionally filtered by prompt:

```typescript
// Example tool call
const result = await client.callTool({
  name: 'get-responses',
  arguments: {
    prompt: 'What is the meaning of life?' // Optional
  }
});
```

## License

MIT 

## Deployment to EC2

This project includes Docker configuration for easy deployment to EC2 or any other server environment.

### Prerequisites

- An EC2 instance running Amazon Linux 2 or Ubuntu
- Security group configured to allow inbound traffic on port 62886
- SSH access to the instance

### Deployment Steps

1. Clone the repository to your EC2 instance:
   ```bash
   git clone <your-repository-url>
   cd <repository-directory>
   ```

2. Make the deployment script executable:
   ```bash
   chmod +x deploy.sh
   ```

3. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

The script will:
- Install Docker and Docker Compose if they're not already installed
- Build the Docker image
- Start the container in detached mode
- Display the public URL where your MCP server is accessible

### Manual Deployment

If you prefer to deploy manually:

1. Build the Docker image:
   ```bash
   docker-compose build
   ```

2. Start the container:
   ```bash
   docker-compose up -d
   ```

3. Verify the container is running:
   ```bash
   docker-compose ps
   ```

### Accessing the Server

Once deployed, your MCP server will be accessible at:
- `http://<ec2-public-ip>:62886/sse` - SSE endpoint
- `http://<ec2-public-ip>:62886/messages` - Messages endpoint

Make sure port 62886 is open in your EC2 security group! 