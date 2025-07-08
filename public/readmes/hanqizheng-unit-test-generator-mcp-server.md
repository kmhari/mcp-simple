# Unit Test Generator

一个 MCP 协议的单元测试生成器。

## 使用

```
git clone git@github.com:hanqizheng/unit-test-generator-mcp-server.git

cd unit-test-generator-mcp-server

npm install

npm run build
```

## 在 Cursor 完成集成

1. Cursor -> Preferences -> Cursor Settings -> MCP -> Add new global MCP server

2. 输入以下配置

```json
{
  "mcpServers": {
    "unit-test-generator": {
      "command": "node",
      "args": ["YOUR_MCP_SERVER_BUILD_INDEX_PATH"],
      "env": {
        "PROJECT_PATH": "YOUR_COMPONENT_LIBRARY_PROJECT_PATH"
      },
      "transport": "stdio",
      "enabled": true,
      "description": "component library unit test generator"
    }
  }
}
```
