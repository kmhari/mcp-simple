# Consul MCP Server

A Model Control Protocol (MCP) server for interacting with HashiCorp Consul service discovery and service mesh. This implementation follows Anthropic's MCP specification and allows Claude to analyze your microservices architecture, create diagrams, identify issues, and provide recommendations through natural language interaction.

## What is Model Control Protocol?

[Model Control Protocol (MCP)](https://modelcontextprotocol.io/introduction) is a specification developed by Anthropic that enables AI models like Claude to interact with external tools and APIs. This implementation connects AI Agents to your Consul infrastructure, allowing you to manage and analyze your services using natural language.

## Features

- List and analyze services registered in Consul
- Identify and diagnose failing health checks
- Generate service mesh architecture diagrams
- Detect service connection issues and provide recommendations
- Get AI insights on service load balancing and resource utilization

## Requirements

- Node.js 18+
- npm or yarn
- A running Consul instance (local or remote)
- Claude Desktop or Cursor IDE with Claude integration

## Installation

```bash
# Clone the repository
git clone https://github.com/3loka/consul-mcp-server.git
cd consul-mcp-server

# Install dependencies
npm install

# Build the project
npm run build
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
CONSUL_HTTP_ADDR=http://localhost:8500
CONSUL_HTTP_TOKEN=your-consul-token
PORT=3000
USE_HTTP=true
```

* `CONSUL_HTTP_ADDR`: Address of your Consul server
* `CONSUL_HTTP_TOKEN`: ACL token of your Consul server
* `PORT`: Port for the HTTP server
* `USE_HTTP`: Set to "true" for HTTP mode, omit for stdio mode

## Installation

### Installing in Cursor

To install and use this MCP server in [Cursor](https://cursor.sh/):

1. In Cursor, open Settings (⌘+,) and navigate to the "MCP" tab.
   
2. Click "+ Add new MCP server."
   
3. Enter the following:
   - Name: consul-assistant
   - Type: command
   - Command: npx -y consul-mcp-server
   
4. Click "Add" then scroll to the server and click "Disabled" to enable the server.

5. Restart Cursor, if needed, to ensure the MCP server is properly loaded.

### Installing in Claude Desktop

To install and use this MCP server in Claude Desktop:

1. In Claude Desktop, open Settings (⌘+,) and navigate to the "Developer" tab.

2. Click "Edit Config" at the bottom of the window.

3. Edit the file (`~/Library/Application Support/Claude/claude_desktop_config.json`) to add the following code, then Save the file.

```json
{
  "mcpServers": {
    "consul-assistant": {
      "command": "npx",
      "args": ["-y", "consul-mcp-server"]
    }
  }
}
```

if the server is not local host or ACL is enabled, use below configuration instead
```json
{
    "mcpServers": {
      "consul-assistant": {
        "command": "npx",
        "args": ["-y", "consul-mcp-server"],
        "env": {
          "CONSUL_HTTP_ADDR": "http://<host/ip>:8500",
          "CONSUL_HTTP_TOKEN": "<ACL Token>"
        }
      }
    }
  }
```

4. Restart Claude Desktop to ensure the MCP server is properly loaded.

## Example Prompts

Once connected, try these prompts with Claude:

- "Show me all services registered in Consul"
- "Which services have failing health checks?"
- "Create a diagram of my service mesh connections"
- "Analyze which services are having connectivity issues"
- "What's the overall health of my microservices architecture?"
- "Show me services with high error rates in their connections"

## Available MCP Actions

This server implements the following MCP actions:
| Action                          | Description                                             |
|--------------------------------|---------------------------------------------------------|
| `consul/get_services`          | Get a list of all services in Consul                   |
| `consul/get_health_checks`     | Get health checks, optionally filtering for failing checks |
| `consul/get_service_connections` | Get service connections and their status               |
| `consul/create_service_diagram` | Create a Mermaid diagram of service relationships      |
| `consul/analyze_service`       | Analyze a specific service to identify issues          |
| `consul/get_service_metrics`   | Get detailed metrics for a specific service            |

## Running a Demo Environment

For testing purposes, you can set up a local demo environment with multiple microservices registered in Consul:

```bash
# Run the setup script (requires Docker and Docker Compose)
chmod +x ./demo/setup-demo.sh
./demo/setup-demo.sh
```

This will start:
- A Consul server
- Several demo microservices
- Register the services in Consul
- Set up some service mesh connections and health checks

## Demo Walkthrough

1. Start the demo environment:
   ```bash
   ./scripts/setup-demo.sh
   ```

2. Start the MCP server:
   ```bash
   npm start
   ```

3. Connect Claude Desktop or Cursor to your MCP server

4. Try these demo scenarios:

   a. Get a service overview:
   ```
   Show me all the services registered in my Consul instance.
   ```

   b. Check for failing health checks:
   ```
   Are any services experiencing health issues? What might be causing them?
   ```

   c. Create a service mesh diagram:
   ```
   Create a diagram showing the connections between my services.
   ```

   d. Analyze connection issues:
   ```
   Which services are having trouble connecting to each other?
   ```

   e. Get recommendations:
   ```
   Based on my service mesh setup, what improvements would you recommend?
   ```

## Development

### Project Structure

- `src/index.ts`: Main entry point
- `src/resources/`: Consul API interaction code
- `src/tools/`: Helper functionality like diagram generation
- `src/server/`: MCP server components
- `src/mcp/`: MCP action definitions and handlers
- `src/prompts/`: Template management for AI interactions
- `src/tests/`: Test suites

### Running Tests

```bash
npm test
```

### Building

```bash
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

MIT