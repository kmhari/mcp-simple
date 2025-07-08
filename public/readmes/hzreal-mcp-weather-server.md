# 天气 MCP Server

docs: https://modelcontextprotocol.io/quickstart/server

## 服务运行测试

```shell
    uv run weather.py 
```

## 使用 Claude for Desktop 作为客户端测试

### 配置

打开并编辑文件： ~/Library/Application\ Support/Claude/claude_desktop_config.json，内容如下：

```json
    {
    "mcpServers": {
        "weather": {
            "command": "/ABSOLUTE/PATH/TO/uv",
            "args": [
                "--directory",
                "/ABSOLUTE/PATH/TO/mcp-weather-server",
                "run",
                "weather.py"
            ]
        }
    }
}
```

### 重启 Claude for Desktop

重启不报错，且有`锤子`图标显示两个 Available MCP Tools，即为成功；否则，查看日志排查

## Claude for Desktop 日志

日志文件夹：~/Library/Logs/Claude

来自具体 MCP Server 的日志：mcp-server-weather.log

MCP 连接通用日志：mcp.log

## 工作原理

1. 客户将您的问题发送给 Claude
2. Claude 分析可用的工具并决定使用哪一个
3. 客户端通过 MCP 服务器执行所选工具
4. 结果被发回给 Claude
5. Claude 制定了自然语言响应
6. 答案已经展示给你了！