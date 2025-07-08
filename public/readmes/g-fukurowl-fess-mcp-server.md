# Fess MCP Server

Fess MCP Server is a middleware server that integrates with the Fess search engine.
By registering it in the settings of MCP clients such as Claude for Desktop, it enables agents to obtain information using Fess. Fess is an open-source full-text search server provided under the Apache License. Commercial support is also available. For more details, please refer to the official website.
https://fess.codelibs.org/ja/


# Setup

## Fess Setup
For the setup procedure of the Fess server itself, please refer to the official Fess documentation.
https://qiita.com/g_fukurowl/items/a00dbbad737d3e775108

The following article may also be helpful:
https://qiita.com/g_fukurowl/items/a00dbbad737d3e775108

## Fess MCP Server Setup
### Using Docker
Start the server with the following command:

```bash
docker-compose up -d
```

### Without Docker
Here we show the setup procedure using uv.
uv is a fast Python package manager. While not required, we recommend using it.

```powershell
# Install uv
irm https://astral.sh/uv/install.ps1 | iex
```

```powershell
# Activate virtual environment
.\.venv\Scripts\activate.bat
```

```powershell
# Install dependencies
uv pip install -e .
```

```powershell
# Start MCP server
uv run .\fess_mcp_server.py
```

## Configuration
### Fess Server Connection Settings
The URL of the Fess server that Fess MCP Server accesses is set as the environment variable Fess_API_BASE.
Please modify this variable according to your environment before starting Fess MCP Server.
If running as a Docker container, edit docker-compose.yaml and change the relevant settings.

### Claude for Desktop Connection Settings
Fess MCP Server starts on port 8000 by default.
If Fess MCP Server is running on localhost on port 8000, edit claude_desktop_config.json as follows:
```json
{
  "mcpServers": {
    "fess-search-sse": {
        "command": "npx",
        "args": [
          "-y",
          "mcp-remote",
          "http://localhost:8000/sse"
        ]
      }
  }
}
```

## Testing

### Without Docker
Here we show the testing procedure using uv.

```powershell
# Install development dependencies:
uv pip install -e ".[test]"
```

```powershell
# Run unit tests:
uv run pytest -v tests/unit/ -s
```

```powershell
# Run integration tests (requires communication with Fess server):
uv run pytest -v tests/integration/ -s
```

```powershell
# Generate coverage report:
uv run pytest --cov=fess_mcp_server --cov-report=html
```

### Running Tests in Docker Container

```powershell
# Build test Docker image:
docker build -t fess-mcp-server-test -f Dockerfile.test .
```

```powershell
# Run unit tests:
docker run --rm fess-mcp-server-test pytest -v tests/unit/ -s
```

```powershell
# Run integration tests (requires communication with Fess server):
docker run --rm --network host fess-mcp-server-test pytest -v tests/integration/ -s
```

```powershell
# Generate coverage report:
docker run --rm -v ${PWD}/coverage:/app/coverage fess-mcp-server-test pytest --cov=fess_mcp_server --cov-report=html
```


### Test Execution Options

- `-v`: Show verbose output
- `-s`: Show standard output
- `--cov`: Generate coverage report
- `--cov-report=html`: Generate HTML coverage report



## License

MIT License
