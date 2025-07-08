# Deep Reasoning Server

基于 Model Context Protocol (MCP) 的深度推理服务器，基于 deepseek-r1 模型，为 MCP Clients （如 Cursor）提供深度推理能力。

## 使用方法

### Cursor

添加 Command 类型 MCP Server

```bash
npx -y deep-reasoning-mcp@latest --apiKey=<YOUR_OPENROUTER_API_KEY> --model=<YOUR_MODEL>
```

## 许可证

[MIT License](LICENSE)
