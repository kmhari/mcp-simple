# MYDOCKER

## 1. playwright-mcp

build
```bash
docker build -t playwright-mcp .
```

settings.json
```json
{
  "mcpServers": {
    "playwright": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "playwright-mcp"]
    }
  }
}
```