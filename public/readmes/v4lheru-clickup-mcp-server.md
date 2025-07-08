# ClickUp MCP Server with Supergateway

This integration runs the ClickUp MCP server through Supergateway, exposing it as an SSE endpoint that can be used by n8n nodes or other clients.

## Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose (for containerized deployment)
- ClickUp API key and Team ID

## Local Development

### Running with Node.js

1. Install dependencies:
   ```bash
   npm install -g supergateway @taazkareem/clickup-mcp-server
   ```

2. Set environment variables:
   ```bash
   export CLICKUP_API_KEY=pk_94547006_D8DFEXXFDOX7RUOJBBPLM2BSVRFXPZE9
   export CLICKUP_TEAM_ID=2357720
   ```

3. Run the integration script:
   ```bash
   ./run-clickup-mcp.sh
   ```

4. Customize configuration (optional):
   ```bash
   ./run-clickup-mcp.sh --port 9000 --base-url http://example.com --cors "http://localhost:8080,http://localhost:3000"
   ```

### Running with Docker Compose

1. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your ClickUp API key and Team ID.

3. Start the container:
   ```bash
   docker-compose up -d
   ```

4. View logs:
   ```bash
   docker-compose logs -f
   ```

## Deployment to Railway

1. Create a new project on Railway.

2. Connect your GitHub repository or use the Railway CLI to deploy.

3. Set the following environment variables in Railway:
   - `CLICKUP_API_KEY`: Your ClickUp API key
   - `CLICKUP_TEAM_ID`: Your ClickUp Team ID
   - `PORT`: 8000 (or your preferred port)
   - `BASE_URL`: Your Railway app URL (e.g., https://your-app-name.up.railway.app)
   - `SSE_PATH`: /sse (or your preferred path)
   - `MESSAGE_PATH`: /message (or your preferred path)
   - `LOG_LEVEL`: info (or debug for more verbose logging)
   - `DOCUMENT_SUPPORT`: false (or true if needed)
   - `CORS_ORIGINS`: * (or a comma-separated list of allowed origins)

4. Deploy the application.

## Usage with n8n

1. In n8n, add a new "MCP" node.

2. Configure the node with the following settings:
   - Server URL: Your Railway app URL + SSE path (e.g., https://your-app-name.up.railway.app/sse)
   - Message Path: Your message path (e.g., /message)

3. Select the desired ClickUp tool from the available tools.

4. Configure the tool parameters as needed.

5. Connect the node to your workflow.

## API Endpoints

- **SSE Endpoint**: `{BASE_URL}{SSE_PATH}` (e.g., http://localhost:8000/sse)
  - Method: GET
  - Description: Subscribe to server-sent events

- **Message Endpoint**: `{BASE_URL}{MESSAGE_PATH}` (e.g., http://localhost:8000/message)
  - Method: POST
  - Description: Send messages to the server
  - Content-Type: application/json
  - Body: JSON-RPC 2.0 formatted message

- **Healthcheck Endpoint**: `{BASE_URL}/healthz` (e.g., http://localhost:8000/healthz)
  - Method: GET
  - Description: Check if the service is running correctly
  - Response: "ok" if the service is healthy

## Troubleshooting

- **Connection Issues**: Ensure your firewall allows connections to the specified port.
- **Authentication Errors**: Verify your ClickUp API key and Team ID are correct.
- **CORS Errors**: Configure the CORS_ORIGINS environment variable to include your client's origin.
