# Swagger Viewer MCP 工具

这是一个用于 Cursor 编辑器的 MCP 工具，可以帮助你快速查看和使用 Swagger API 文档。

## 功能特点

- 自动读取用户根目录下的 swagger.json 配置文件
- 实时监控配置文件变化，自动更新 API 文档
- 支持模糊搜索 API 接口
- 自动生成接口调用代码
- 支持查看所有可用接口

## 安装

```bash
npm install
```

## 配置

在用户根目录下创建 `swagger.json` 文件，格式如下：

```json
{
    "swaggerUrl": "https://your-swagger-api-url/swagger.json"
}
```

npx：

```json
"swagger-viewer": {
      "command": "cmd",
      "swagger-viewer": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@xc_angelwatch/swagger-viewer"]
    }
}
```

## 使用方法

该工具提供以下 MCP 接口：

1. `mcp_swagger_initialize()`: 初始化工具，加载配置
2. `mcp_swagger_search(query)`: 搜索接口
3. `mcp_swagger_generate_code(path, method, language)`: 生成接口调用代码
4. `mcp_swagger_get_all_endpoints()`: 获取所有可用接口

### 示例用法

```javascript
// 初始化
await mcp_swagger_initialize();

// 搜索包含 "user" 的接口
const results = await mcp_swagger_search("user");

// 生成特定接口的代码
const code = await mcp_swagger_generate_code("/api/users", "GET", "javascript");

// 获取所有接口
const endpoints = await mcp_swagger_get_all_endpoints();
```

## 配置文件监控

工具会自动监控用户根目录下的 `swagger.json` 文件变化。当文件发生变化时，会自动重新加载最新的 API 文档。

## 支持的编程语言

目前支持生成以下语言的代码：


