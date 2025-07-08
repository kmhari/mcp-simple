# MNS MCP Server

MNS MCP Manager 是一个基于阿里云消息服务（MNS）的管理工具。通过 MCP 框架实现，用户可以通过 MCP Host 配置文件轻松集成并使用。

## 功能特性

- **创建队列**：支持动态创建 MNS 队列。
- **删除队列**：支持删除指定队列。
- **发送消息**：向指定队列发送消息。
- **接收消息**：从指定队列接收并删除消息。
- **列出队列**：支持按前缀过滤列出所有队列。

---

## 环境要求

- Python 3.8+
- 阿里云 MNS SDK (`aliyun-mns-sdk`)

---

## 安装与配置

### 1. 克隆项目

```bash
git clone https://github.com/Houlong66/mns-mcp-server.git
cd mns-mcp-server
```

### 2. 配置 MCP Servers

在 MCP Host 的配置文件中添加以下内容以注册 MNS MCP Server 服务器：

```json
{
  "mcpServers": {
    "mns-mcp-server": {
      "command": "/absolute/path/to/uv",
      "args": [
        "--directory",
        "/absolute/path/to/mns-mcp-server",
        "run",
        "server.py"
      ],
      "env": {
        "MNS_ACCESS_KEY_ID": "your-access-key-id",
        "MNS_ACCESS_KEY_SECRET": "your-access-key-secret",
        "MNS_ENDPOINT": "your-mns-endpoint"
      }
    }
  }
}
```

#### 配置说明：
- **`command`**: 启动服务器的 uv 路径。
- **`env`**: 配置阿里云 MNS 的访问密钥和端点信息。

将 `your-access-key-id`、`your-access-key-secret` 和 `your-mns-endpoint` 替换为您的实际值。