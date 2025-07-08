# md-emoji-mcp MCP Server

模型上下文协议服务器，构建自己的 cursor mcp 模板

这是一个基于 TypeScript 的 MCP 服务器，实现了一个简单的笔记系统。它通过提供以下功能演示了核心 MCP 概念：

- 用 URI 和元数据表示文本笔记的资源
- 创建新笔记的工具
- 生成笔记摘要的提示

## 特点

### 资源

- 通过 `note://`URI 列出和访问笔记
- 每个笔记都有标题、内容和元数据
- 纯文本 MIME 类型，用于简单的内容访问

### Tools

- `create_note` - 创建新的文本注释
  - 将标题和内容作为所需参数
  - 在服务器状态下存储笔记

### Prompts

- `summarize_notes` - 生成所有存储笔记的摘要
  - 包括作为嵌入资源的所有笔记内容
  - 返回 LLM 摘要的结构化提示

## Development

安装依赖项：

```bash
npm install
```

Build the server:

```bash
npm run build
```

For development with auto-rebuild:

```bash
npm run watch
```

## Installation

要与 Claude Desktop 一起使用，请添加服务器配置：

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "md-emoji-mcp": {
      "command": "/path/to/md-emoji-mcp/build/index.js"
    }
  }
}
```

### Debugging

由于 MCP 服务器通过 stdio 进行通信，因此调试起来很困难。我们建议使用[MCP Inspector](https://github.com/modelcontextprotocol/inspector)作为软件包脚本提供：

```bash
npm run inspector
```

检查器将提供一个 URL，以便在浏览器中访问调试工具。
