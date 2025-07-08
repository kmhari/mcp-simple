# 新闻获取MCP工具

这是一个基于Model Context Protocol (MCP)的新闻获取工具，它可以与支持MCP的AI助手（如Claude for Desktop）集成，为AI提供获取当前新闻的能力。

## 功能特点

- 从多个新闻源获取最新新闻
- 支持多种新闻类别：中国、全球、科技、财经
- 自动提取文章完整内容
- 与支持MCP的AI助手无缝集成

## 安装方式

### 方式1: 通过uvx直接从仓库运行（推荐）

1. 确保已安装 [uv](https://github.com/astral-sh/uv) 包管理工具
2. 使用 uvx 直接运行：

```bash
# 从 GitHub 仓库运行
uvx --from git+https://github.com/Zmingfeng/news_mcp.git news-mcp --transport stdio
```

### 方式2: 本地安装

1. 确保安装了Python 3.10或更高版本
2. 克隆或下载此项目到本地
3. 安装项目：

```bash
# 安装开发模式
pip install -e .

# 运行
news-mcp --transport stdio
```

## 与Claude for Desktop集成

1. 确保你已安装最新版本的Claude for Desktop
2. 打开Claude for Desktop的配置文件
3. 添加以下配置：

```json
{
    "mcpServers": {
        "news_summarizer": {
            "command": "uvx",
            "args": [
                "--from",
                "git+https://github.com/Zmingfeng/news_mcp.git",
                "news-mcp",
                "--transport",
                "stdio"
            ]
        }
    }
}
```

或者使用本地安装方式：

```json
{
    "mcpServers": {
        "news_summarizer": {
            "command": "news-mcp",
            "args": ["--transport", "stdio"]
        }
    }
}
```

## 可用工具

1. **get_latest_news** - 获取指定类别的最新新闻完整内容
   - 参数：
     - category (默认："中国")：新闻类别，可选值：中国、全球、科技、财经
     - count (默认：5)：要返回的新闻数量

2. **get_news_titles** - 仅获取指定类别的最新新闻标题列表
   - 参数：
     - category (默认："中国")：新闻类别，可选值：中国、全球、科技、财经
     - count (默认：10)：要返回的新闻标题数量

## 如何触发工具

在与Claude for Desktop对话时，使用以下词条可能会触发工具：

- "今天有什么新闻？"
- "最新的科技新闻是什么？"
- "有什么重要的全球新闻？"

## 注意事项

- 该工具依赖于各新闻网站的HTML结构，如果网站更改布局，可能需要更新爬取逻辑
- 请合理使用，避免频繁请求导致被新闻网站封禁 