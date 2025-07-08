# Duck Duck MCP
[![smithery badge](https://smithery.ai/badge/duck-duck-mcp)](https://smithery.ai/server/duck-duck-mcp)

一个基于 DuckDuckGo 搜索引擎的 Model Context Protocol (MCP) 服务器实现。

<a href="https://glama.ai/mcp/servers/c0qz8cvfpi"><img width="380" height="200" src="https://glama.ai/mcp/servers/c0qz8cvfpi/badge" alt="Duck Duck MCP server" /></a>

## 功能特性

- 使用 DuckDuckGo 进行网络搜索
- 支持自定义搜索结果数量（默认 50 条）
- 支持区域设置（默认 zh-cn）
- 支持安全搜索级别设置（OFF/MODERATE/STRICT）
- 提供结构化的搜索结果，包含元数据
- 智能内容分类（文档/文章/社交媒体）
- 自动语言检测
- 主题标签识别

## 安装

### 安装通过 Smithery

通过 [Smithery](https://smithery.ai/server/duck-duck-mcp) 将 DuckDuckGo 搜索自动安装到 Claude 桌面端：

```bash
npx -y @smithery/cli install duck-duck-mcp --client claude
```

不需要安装，可以直接通过 npx 运行：
```bash
npx -y @smithery/cli install duck-duck-mcp --client claude
```

### 使用方法

这是一个 MCP 服务器实现，主要用于与支持 MCP 协议的 AI 客户端（如 Claude）集成。

### 启动服务器：
```bash
# 使用 npx（推荐）
npx duck-duck-mcp

# 或者如果已经全局安装
mcp-server-search
```

### 搜索参数示例：
```json
{
  "query": "搜索关键词",
  "options": {
    "region": "zh-cn",
    "safeSearch": "MODERATE",
    "numResults": 50
  }
}
```

### 返回结果格式：
```json
{
  "type": "search_results",
  "data": [
    {
      "title": "标题",
      "url": "网址",
      "description": "描述",
      "metadata": {
        "type": "article|documentation|social|other",
        "source": "域名"
      }
    }
  ],
  "metadata": {
    "query": "搜索关键词",
    "timestamp": "时间戳",
    "resultCount": 50,
    "searchContext": {
      "region": "zh-cn",
      "safeSearch": "MODERATE"
    },
    "queryAnalysis": {
      "language": "zh-cn|en",
      "topics": ["technology", "documentation"]
    }
  }
}
```

## License

MIT
