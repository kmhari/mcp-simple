# Japan Weather MCP Server &#x1f31e;
A simple MCP server that using [天気予報 API（livedoor 天気互換）
](https://weather.tsukumijima.net/).


### Setup
Install dependencies using [uv](https://docs.astral.sh/uv/getting-started/installation/):
```shell
uv sync
```


### Usage with Claude Desktop

```json
{
  "mcpServers": {
    "Weather MPC Server": {
      "command": "/path/to/your/uv", // check `which uv`
      "args": [
        "--directory",
        "/path/to/your/jp-weather-mcp-server", //project full path
        "run",
        "weather.py"
      ]
    }
  }
}
```
