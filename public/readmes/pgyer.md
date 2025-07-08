# PGYER MCP Server

这是一个用于上传应用到 PGYER 平台的 MCP (Model Context Protocol) 服务器。

![Claude Screenshot](https://raw.githubusercontent.com/PGYER/pgyer-mcp-server/refs/heads/main/assets/claude-screenshot.png)

## 功能特点

- 兼容 MCP (Model Context Protocol) 协议，支持多平台集成（如 Claude、VSCode 等）
- 提供三大核心工具：
  - `upload-app`：上传应用（ipa/apk）到 PGYER 平台，支持多种上传参数
  - `list-my-apps`：查询当前账号下已上传的应用列表，支持分页
  - `get-app-info-by-shortcut`：通过应用短链接（shortcut）查询详细信息
- 支持通过环境变量 `PGYER_API_KEY` 配置 API 密钥，安全灵活
- 简单易用的 API 接口，支持命令行、Node.js、Docker 等多种运行方式
- 支持自定义上传参数（如安装方式、安装密码、更新描述、有效期等）
- 适用于 iOS/Android 应用分发、测试、内测等多种场景

## 使用场景

- **应用分发与内测**：通过 PGYER 平台快速分发 iOS/Android 应用，支持公开安装、密码安装、邀请安装等多种方式，适合团队内测、公测等场景。
- **持续集成与自动化**：结合 CI/CD 工具（如 Jenkins、GitHub Actions），实现应用自动打包、上传、分发，提升开发效率。
- **多平台集成**：支持与 Claude、VSCode 等平台集成，方便开发者在不同环境中使用 PGYER 服务。
- **应用版本管理**：通过 `list-my-apps` 和 `get-app-info-by-shortcut` 工具，轻松查询和管理已上传的应用版本信息。

## 先决条件

### 使用 Node.js 运行时

如果你选择使用 Node.js 运行时，请按照以下步骤操作：

```bash
# 克隆仓库
git clone https://github.com/PGYER/pgyer-mcp-server.git
cd pgyer-mcp-server

# 安装依赖
npm install
```

### 使用 Docker 运行时

如果你选择使用 Docker 运行时，只需确保你的系统已正确安装 Docker 并确保 Docker 正在运行。

## 集成方式

### 与 Claude App 集成

如果你想要与 Claude App 集成，需要在 Claude App 的配置文件中添加以下配置：

#### 使用 Node.js 运行

```json
{
  "mcpServers": {
    "pgyer": {
      "command": "node",
      "args": ["/path/to/pgyer-mcp-server/build/index.js"],
      "env": {
        "PGYER_API_KEY": "<your_pgyer_api_key>"
      }
    }
  }
}
```

#### 使用 Docker 运行

```json
{
  "mcpServers": {
    "pgyer": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "PGYER_API_KEY",
        "--mount", "type=bind,src=/Users/username/Downloads,dst=/Users/username/Downloads",
        "pgyer/pgyer-mcp-server"
      ],
      "env": {
        "PGYER_API_KEY": "<your_pgyer_api_key>"
      }
    }
  }
}
```

请确保：
1. 将 `/path/to/pgyer-mcp-server` 替换为你的实际项目路径
2. 将 `your_pgyer_api_key` 替换为你的 PGYER API 密钥
3. 如果使用 Docker，请根据你的实际需求调整挂载目录的路径

### 在 VSCode 中集成

如果你希望在 VSCode 中集成 PGYER MCP Server，可以参考以下配置示例：

#### 使用 Docker 方式

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "pgyer_api_key",
        "description": "PGYER API Key",
        "password": true
      }
    ],
    "servers": {
      "pgyer": {
        "command": "docker",
        "args": [
          "run",
          "-i",
          "--rm",
          "-e",
          "PGYER_API_KEY",
          "--mount",
          "type=bind,src=${workspaceFolder},dst=/workspace",
          "pgyer/pgyer-mcp-server"
        ],
        "env": {
          "PGYER_API_KEY": "${input:pgyer_api_key}"
        }
      }
    }
  }
}
```

#### 使用 Node.js 方式

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "pgyer_api_key",
        "description": "PGYER API Key",
        "password": true
      }
    ],
    "servers": {
      "pgyer": {
        "command": "node",
        "args": ["/path/to/pgyer-mcp-server/build/index.js"],
        "env": {
          "PGYER_API_KEY": "${input:pgyer_api_key}"
        }
      }
    }
  }
}
```

> **注意：**
> 1. 请将 `/path/to/pgyer-mcp-server` 替换为你本地的实际路径。
> 2. `${workspaceFolder}` 会自动替换为你当前 VSCode 工作区的根目录。
> 3. 你可以根据实际需求调整挂载目录。

## 工具配置

有以下几组工具可用（默认情况下全部启用）：

1. `upload-app`：上传应用到 PGYER 平台
2. `list-my-apps`：查询自己上传的 App 列表
3. `get-app-info-by-shortcut`：通过短链接（App shortcut）查询 App 信息

## 许可证

MIT

## 贡献

欢迎提交 Pull Request 或创建 Issue 来帮助改进项目。 
