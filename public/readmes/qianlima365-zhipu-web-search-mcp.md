## 运行服务

1. 通过stdio协议启动服务端
    ```shell
    mcp dev web_search.py
    ```
- 配置客户端
    ```shell
    {
        "mcpServers": {
            "mcp-server": {
            "command": "uv",
                "args": [
                    "--directory",
                    "<你的项目路径>",
                    "run",
                    "main.py"
                ]
            }
        }
    }
    ```


2. 通过SSE协议启动服务端

- 
   ```shell
    uv run main.py --host 0.0.0.0 --port 8020
   ```

- 运行客户端

   ```shell
    uv run client.py http://127.0.0.1:8020/sse
   ```