# 🖥️ MCP Glances Monitor

通过 MCP 服务与大语言模型（LLM）结合，调用 Glances API 获取并分析服务器监控数据，实时反馈系统状态。已在 Cursor 和 Cline 客户端测试通过。

---

## 🚀 功能说明

使用 MCP 的 Python SDK 编写的 MCP 服务，利用大模型调用 Glances 的 API，并将返回结果交由大模型分析展示。

---
## 🖼️ 使用效果展示

以下是通过 MCP 服务与 Glances 获取的系统监控数据结果截图：

![系统监控图](https://github.com/Lee-1024/mcp-glances/blob/main/images/Snipaste_2025-04-09_17-02-24.png)


## ⚙️ 配置说明

### 1. 服务端配置（被监控服务器）

- 安装并启动 Glances：
  ```bash
  pip install glances
  glances -w
  ```
- 具体查看官网文档
- 确保放开 61208 端口以允许远程访问

---

### 2. 本地开发环境

- 安装 [uv](https://hellowac.github.io/uv-zh-cn/guides/integration/pytorch/)
- 按照 [MCP 官方文档](https://modelcontextprotocol.io/quickstart/server) 初始化项目
- 替换默认的 `main.py` 为你自己的项目文件（如 `glances_info_mcp.py`）

---

### 3. MCP 服务客户端配置

#### 🖥️ Cline 客户端（需以管理员身份运行 VSCode）

```json
{
  "mcpServers": {
    "mcp-test": {
      "command": "uv",
      "args": [
        "--directory",
        "E:\\code\\mcp-glances\\",
        "run",
        "glances_info_mcp.py"
      ],
      "disable": false,
      "autoApprove": []
    }
  }
}
```

#### 💻 Cursor 客户端（不需要管理员权限）

```json
{
  "mcpServers": {
    "mcp-test": {
      "command": "uv",
      "args": [
        "--directory",
        "E:\\code\\mcp-test\\",
        "run",
        "glances_info_mcp.py"
      ]
    }
  }
}
```

> ⚠️ 修改配置后需重启 VSCode 并新建会话。

---

### 4. 服务器配置（`servers_configs.json`）

```json
{
  "server1": {
    "name": "测试服务器",
    "url": "http://192.168.0.1:61208/api/4",
    "description": "测试环境主服务器"
  },
  "server2": {
    "name": "生产服务器",
    "url": "http://192.168.0.2:61208/api/4",
    "description": "生产环境主服务器"
  }
}
```

---

## ❗ 错误处理

系统会自动处理以下常见错误：

- 服务器未配置或不存在
- 网络连接失败
- API 调用超时
- 数据格式错误

> 所有错误会返回友好的提示信息，便于问题排查。

---

## 📌 注意事项

1. 确保 Glances Web UI 正常启动并监听 61208 端口  
2. 检查网络连接与防火墙策略  
3. 定期更新服务器配置文件  
4. 建议为 API 请求设置合理的超时时间（推荐 ≤10 秒）

---

## 🤝 贡献指南

欢迎通过 Issue 或 Pull Request 参与贡献！

贡献前请确认：

- ✅ 遵循 Python 编码规范（PEP8）
- 📝 添加必要注释与文档
- 🧪 所有功能通过测试用例验证

---

## 📄 许可证
- Apache 2.0

---

## 📬 联系方式

如有问题或建议，请通过 GitHub Issues 提交，或联系项目维护者。