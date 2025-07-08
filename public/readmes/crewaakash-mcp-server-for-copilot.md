# 🤖 MCP Server for Copilot Studio Agents

An [MCP (Model Context Protocol)](https://modelcontextprotocol.io/introduction) server implementation that connects to Microsoft Copilot Studio agents, allowing seamless integration of Copilot Studio agents with any MCP-compatible client.

https://github.com/user-attachments/assets/19fdd17b-2837-4797-8653-fe9439de355f

## ✨ Features

- 🔌 Connect to Copilot Studio agents through [DirectLine API](https://learn.microsoft.com/en-us/azure/bot-service/rest-api/bot-framework-rest-direct-line-3-0-api-reference?view=azure-bot-service-4.0)
- 🧠 Maintain conversation context across multiple queries
- 🔄 Easy integration with any MCP-compatible client
- 💬 Stateful conversations with conversation ID and watermark tracking
- ⚙️ Configurable agent definitions

## 🛠️ Tools

This MCP server exposes the following tools:

- 📮 `query_agent`: Send queries to a Copilot Studio agent and receive responses
  - 🔄 Maintains conversation context across multiple queries using conversation IDs and watermarks
  - 📊 Returns structured responses with success/error status

## 🔧 Configuration

### Pre-requisites
 - 🔐 Ensure you have a Copilot Studio agent set up and configure [direct line channel security](https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-web-security#use-secrets-or-tokens).
 - 📝 Update the `agent_definitions` in the `src/main.py` file to include your agent's details.
- The `agent_definitions` should include the following fields:
  - 📛 `name`: The name of the agent
  - 📄 `description`: A brief description of the agent for the MCP client to identify the responsibility of the agent.
  
### Environment Variables

The server requires the following environment variables:

- 🔗 `DIRECTLINE_ENDPOINT`: The DirectLine API endpoint for your Copilot Studio agent
- 🔑 `COPILOT_AGENT_SECRET`: Bot key for authenticating with the Copilot Studio agent via the DirectLine API

You can set these variables in a `.env` file in the project root directory or configure them through your system's environment variables.

## 📦 Installation

### Prerequisites

- 🐍 Python 3.12 or higher
- 🚀 `uv` package manager (recommended) or pip

#### Python Setup

```bash
# Setup environment with uv
uv venv
.venv\Scripts\activate  # On Windows
source .venv/bin/activate  # On macOS/Linux

# Install dependencies
uv sync
```

If you prefer using pip:

```bash
# Create a virtual environment
python -m venv .venv
.venv\Scripts\activate  # On Windows
source .venv/bin/activate  # On macOS/Linux

# Install dependencies
pip install -e .
```

#### Testing with MCP Inspector

Once you activate your environment, you can run the MCP server locally using [`MCP Inspector`](https://modelcontextprotocol.io/docs/tools/inspector#python).

1. Run the MCP server using the following command:

  ```bash
  mcp dev src/main.py
  ```

2. You will be prompted to install the `@modelcontextprotocol/inspector` package. Choose `y` to install it.  
  ![Install MCP Inspector](./images/run_mcp_server_locally.png)

3. Launch the MCP Inspector and connect to the MCP server.
4. Navigate to `Tools` and click `List Tools` to view all the available tools in the MCP server.
5. Select the `query_agent` tool to send queries to your Copilot Studio agent.  
  ![MCP Inspector](./images/mcp_inspector.png)
  ![Result](./images/mcp_inspector_result.png)


### Usage with Claude Desktop

To use with Claude Desktop, add the following to your configuration file:

1. Download [Claude Desktop](https://claude.ai/download) and install it, if you haven't already.
2. Navigate to `File` > `Settings` > `Developer` > `Edit Config`.
3. Open the `claude_desktop_config.json` file and add the following configurations to the `mcpServers` section. You can use either `uv`, `python`, or `docker` to run the server.  
  ![Claude Desktop Config](./images/claude_desktop_config.png)
4. Save the configuration file and restart Claude Desktop.
5. Once the MCP server is added to Claude Desktop, you can view it under the tools section.
  ![Claude Desktop Tools](./images/claude_desktop_mcp_server.png)

### MCP Server Configurations for Claude Desktop

#### Run via `uv`

```json
{
  "mcpServers": {
    "agent-name": {
      "command": "uv", // you might need to use the full path to uv if it's not in your PATH. use `which uv` to find the path.
      "args": [
        "--directory",
        "<PATH_TO_THE_PARENT_FOLDER>",
        "run",
        "mcp",
        "run",
        "<PATH_TO_THE_PARENT_FOLDER>/src/main.py"
      ],
      "env": {
        "DIRECTLINE_ENDPOINT": "endpoint-url",
        "COPILOT_AGENT_SECRET": "secret-key"
      }
    }
  }
}
```

#### Run via `python`

Post setup of virtual environment and installing the necessary packages, you can run the server using the following command:


```json
{
  "mcpServers": {
    "agent-name": {
      "command": "<PATH_TO_VENV>/bin/python",
      "args": [
        "<PATH_TO_THE_PARENT_FOLDER>/src/main.py"
      ],
      "env": {
        "DIRECTLINE_ENDPOINT": "endpoint-url",
        "COPILOT_AGENT_SECRET": "secret-key"
      }
    }
  }
}
```

Alternatively you can install the server to Claude Desktop by running the following command (inside the virtual environment):

```bash
mcp install src/main.py -f .env
```

#### Run via `docker`
You can run the MCP server as a container using Docker. Ensure you have Docker installed and running on your machine.

Build the Docker image:

```bash
docker build -t mcp-server-copilot-agent .
```

Add the following to your Claude Desktop configuration file:

```json
{
  "mcpServers": {
    "agent-name": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-p", "8000:8000",
        "--env-file", "<PATH_TO_THE_PARENT_FOLDER>/.env",
        "mcp-server-copilot-agent"
      ]
    }
  }
}
```

Once you have configured Claude Desktop with the 

### 🌐 Usage with Other MCP Clients

This server follows the MCP protocol specification and can be used with any MCP-compatible client. Refer to your client's documentation for specific instructions on how to connect to external MCP servers.

## 👩‍💻 Development

To contribute to this project, set up a development environment:

```bash
# Install development dependencies
uv sync -e dev
```

The project uses Ruff for linting:

```bash
# Run linter
ruff check .
```
