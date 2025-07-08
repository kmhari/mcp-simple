# A Simple MCP Handsome Server written in Python

这是一个基于 MCP (Model Context Protocol) 的简单服务器，提供了一个 `who_is_handsome` 工具函数。

## 功能

- `who_is_handsome()`: 返回一个友好的消息，告诉你谁是最帅的人。

## 示例

![示例](sample.png)

## 安装

```bash
# 创建虚拟环境并安装依赖
uv venv
uv pip install -e .
```

## 配置

在 `~/.cursor/mcp.json` 中添加以下配置：

```json
{
  "mcpServers": {
    "handsome": {
      "command": "uv",
      "args": [
        "--directory",
        "/handsome-server-python",
        "run",
        "handsome.py"
      ]
    }
  }
}
```

注意：请根据你的实际项目路径修改 `--directory` 参数的值。

## 运行

```bash
uv run handsome.py
```

更多信息请参考 [MCP Quickstart](https://modelcontextprotocol.io/quickstart) 教程。

## 联系我
Author: Tianhan Yang
QQ: 1257330051
Email: 1257330051@qq.com
Email: yangtianhan01@gmail.com