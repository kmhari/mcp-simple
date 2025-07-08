# Bing CN MCP

一个基于 MCP (Model Context Protocol) 的中文必应搜索工具，可以直接通过 Claude 或其他支持 MCP 的 AI 来搜索必应并获取网页内容。

## 特点

- 支持中文搜索结果
- 无需 API 密钥，直接爬取必应搜索结果
- 提供网页内容获取功能
- 轻量级，易于安装和使用
- 专为中文用户优化
- 支持 Claude 等 AI 工具调用

## 安装

### 全局安装

```bash
npm install -g bing-cn-mcp
```

### 或者直接通过 npx 运行

```bash
npx bing-cn-mcp
```

## 使用方法

### 启动服务器

```bash
bing-cn-mcp
```

或者使用 npx：

```bash
npx bing-cn-mcp
```

### 在支持 MCP 的环境中使用

在支持 MCP 的环境（如 Cursor）中，配置 MCP 服务器来使用它：

1. 找到 MCP 配置文件（例如 `.cursor/mcp.json`）
2. 添加服务器配置：

```json
{
  "mcpServers": {
    "bingcn": {
      "command": "npx",
      "args": [
        "bing-cn-mcp"
      ]
    }
  }
}
```
Windows用户的配置

```json
{
  "mcpServers": {
    "bingcnmcp": {
        "command": "cmd",
        "args": [
          "/c",
          "npx",
          "bing-cn-mcp"
      ]
    }
  }
}
```

3. 现在你可以在 Claude 中使用 `mcp__bing_search` 和 `mcp__fetch_webpage` 工具了

## 支持的工具

### bing_search

搜索必应并获取结果列表。

参数：
- `query`: 搜索关键词
- `num_results`: 返回结果数量（默认为 5）

### fetch_webpage

根据搜索结果 ID 获取对应网页的内容。

参数：
- `result_id`: 从 bing_search 返回的结果 ID

## 自定义配置

你可以通过创建 `.env` 文件来自定义配置，例如：

```
# 用户代理设置
USER_AGENT=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
```

## 注意事项

- 某些网站可能有反爬虫措施，导致 `fetch_webpage` 无法获取内容
- 本工具仅供学习和研究使用，请勿用于商业目的
- 请遵守必应的使用条款和相关法律法规

## 作者

slcatwujian

## 许可证

MIT 
