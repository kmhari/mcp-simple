# MCP Server

A simple MCP (Model Context Protocol) server project implementing three services—**math**, **weather**, and **brave search**—using FastAPI, FastMCP, and Docker. This project deploys the MCP servers inside Docker containers, making them remotely accessible via a FastAPI app. Whether you are deploying infrastructure locally or in the cloud, these MCP servers can be called by any external application (for example, Claude) without exposing your host machine. For added security, dockerizing the MCP servers is a best practice.

In this example, an agent (`agent.py`) uses a local model Ollama deployed on port **11434** to process queries. It also demonstrates how to query all three services.

## Features

- **Math Server:** Provides simple mathematical operations such as addition and multiplication.
- **Weather Server:** Offers a tool to fetch current weather information by coordinates using asynchronous HTTP calls.
- **Brave Search Server:** Integrates with Brave Search’s API to perform web and local searches.
- **FastAPI Integration:** MCP servers are embedded in a FastAPI application.  
  - The app specifies the host and port via uvicorn.  
  - Routing is managed using a custom `register_mcp_router` function.
- **Remote Accessibility:** Deployed via Docker Compose, the MCP servers’ endpoints are accessible remotely by any client or external service.
- **Centralized Logging:** A shared logger (located at `src/utils/setup_logger.py`) is used in all modules.
- **Agent Example:** An example agent (`agent.py`) demonstrates querying these servers using both local (stdio) and production (SSE) modes.
- **GUI Testing with MCP Inspector:** Use MCP Inspector to check and debug your MCP servers with a graphical interface.

## Requirements

- Python 3.13
- [Poetry](https://python-poetry.org/)
- Docker and Docker Compose

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/mcpserver.git
   cd mcpserver
   ```

2. **Install dependencies using Poetry:**

   ```sh
   poetry install
   ```

3. **Create a `.env` file** at the root with the following example values:

   ```properties
   WEATHER_URL=http://localhost:5000/mcp/sse
   MATH_URL=http://localhost:5001/mcp/sse
   BRAVE_URL=http://localhost:5002/mcp/sse
   MODE=prod
   PORT_MATH_SERVER=5001
   PORT_WEATHER_SERVER=5000
   PORT_BRAVE_SERVER=5002
   BRAVE_API_KEY=your-brave-api-key
   ```

## Docker Deployment

The MCP servers are deployed in Docker containers. Each server is built from its own Dockerfile and exposed on a dedicated port.

### Dockerfiles

- **Math Server:** (Example: `Dockerfile.math`)

   ```dockerfile
   FROM python:3.13-slim

   WORKDIR /app
   COPY pyproject.toml poetry.lock ./
   RUN pip install uvicorn && pip install poetry && poetry install --no-dev --no-interaction
   COPY src/ ./src/
   ENV PYTHONPATH=/app
   EXPOSE 5001
   CMD ["python", "src/servers/math_server.py"]
   ```

- **Weather Server:** (Example: `Dockerfile.weather`)

   ```dockerfile
   FROM python:3.13-slim

   WORKDIR /app
   COPY pyproject.toml poetry.lock ./
   RUN pip install uvicorn && pip install poetry && poetry install --no-dev --no-interaction
   COPY src/ ./src/
   ENV PYTHONPATH=/app
   EXPOSE 5000
   CMD ["python", "src/servers/weather_server.py"]
   ```

- **Brave Server:** (Example: `Dockerfile.brave`)

   ```dockerfile
   FROM python:3.13-slim

   WORKDIR /app
   COPY pyproject.toml poetry.lock ./
   RUN pip install uvicorn && pip install poetry && poetry install --no-dev --no-interaction
   COPY src/ ./src/
   ENV PYTHONPATH=/app
   EXPOSE 5002
   CMD ["python", "src/servers/brave_server.py"]
   ```

### docker-compose.yml

Update your `docker-compose.yml` to include all three services:

```yaml
version: "3.8"

services:
  math_server:
    build:
      context: .
      dockerfile: Dockerfile.math
    ports:
      - "5001:5001"
    env_file:
      - .env
    networks:
      - mcpnetwork

  weather_server:
    build:
      context: .
      dockerfile: Dockerfile.weather
    ports:
      - "5000:5000"
    env_file:
      - .env
    networks:
      - mcpnetwork

  brave_server:
    build:
      context: .
      dockerfile: Dockerfile.brave
    ports:
      - "5002:5002"
    env_file:
      - .env
    networks:
      - mcpnetwork

networks:
  mcpnetwork:
    driver: bridge
```

Rebuild and launch the containers:

```sh
docker-compose up --build
```

2. **Check the logs:**

   - The Math server logs will show it listening on port `5001`.
   - The Weather server logs will show it listening on port `5000`.
   - The Brave server logs will show it listening on port `5002`.

3. **Test the endpoints:**

   - Weather SSE endpoint: [http://localhost:5000/mcp/sse](http://localhost:5000/mcp/sse)
   - Math SSE endpoint: [http://localhost:5001/mcp/sse](http://localhost:5001/mcp/sse)
   - Brave SSE endpoint: [http://localhost:5002/mcp/sse](http://localhost:5002/mcp/sse)

   These endpoints will be accessible remotely if your network configuration permits.

## Running the Agent

An example agent (`agent.py`) demonstrates how to query the MCP servers. In local mode, the agent launches the servers using their file paths with stdio transport; in production mode, it queries the servers via their URLs using SSE.

To run the agent:

```sh
python agent.py
```

The agent will log its process, connect to the MCP servers, send a query, and display the response.

## Testing with MCP Inspector (GUI)

For a GUI-based testing and debugging experience, you can use MCP Inspector to launch a graphical interface for your MCP servers. For example, you can launch MCP Inspector for the math server by running:

```sh
mcp dev ./src/servers/math_server.py
```
Then you can specify the transport type : sse and the url : http://localhost:5002/mcp/sse to check interactively your deployed servers. 

## Integration with Claude

Claude can call your MCP servers using Docker. Below is an example Claude configuration that launches each service in stdio mode:

```json
{
  "mcpServers": {
    "math": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "mcpserver-math_server"
      ],
      "transport": "stdio"
    },
    "weather": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "mcpserver-weather_server"
      ],
      "transport": "stdio"
    },
    "brave": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "-e",
        "BRAVE_API_KEY= YOUR_API_KEY",
        "mcpserver-brave_server"
      ],
      "transport": "stdio"
    }
  }
}
```

In this configuration:  
- **Math Server:** Claude runs the `mcpserver-math_server` container in interactive mode.
- **Weather Server:** Claude runs the `mcpserver-weather_server` container in interactive mode.
- **Brave Server:** Claude runs the `mcpserver-brave_server` container, setting `BRAVE_API_KEY` via an environment variable.  
Adjust container names and your API key as needed.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

## License

This project is licensed under the [MIT License](LICENSE).