# MCP Server

MCP Server is created on top of all the APIs from the Youtube-Summarizer. All APIs are exposed as tools in the MCP protocol and available for any AI application to integrate with.

**Note:** Currently MCP only supports local connections, so it doesn't support remote use of these tools.

## Setup

### Docker Setup
Build the Docker image:
```bash
docker build -t youtube-summarizer-mcp .
```

Run the MCP server using Docker:
```bash
docker run -i --rm youtube-summarizer-mcp
```

### Using the Inspector
You can use the MCP Inspector to explore available tools and test them:
```bash
./inspector.sh
```

### Usage with Claude Desktop

Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "youtube-summarizer": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "youtube-summarizer-mcp"
      ]
    }
  }
}
```

Now you can use the added mcp tools from server.py in claude desktop

### MCP Client Sample (Without Claude Desktop)
Run the MCP client locally to try out the Social Toolkit using natural language:

### Setup
```bash
./setup.sh
```

### Run
```bash
./run.sh
```

It will run both MCP server and client, connected to each other. The terminal will prompt for natural language queries from the user, which then will be translated into MCP tool calls to answer the user query.
