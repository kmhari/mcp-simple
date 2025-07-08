# DDNet MCP Server

一个基于FastMCP的Model Context Protocol服务器，提供DDNet游戏进程管理和配置文件操作功能。

## 功能

- 游戏进程管理：获取DDNet游戏状态、启动和关闭DDNet游戏
- 配置文件操作：检查按键绑定、添加和删除按键绑定

## 安装

### 使用uv安装

```bash
uv install ddnet-mcpserver
```

## 使用方法

### 使用uv运行

```bash
uv run -m ddnet_mcpserver
```

### 在MCP客户端中配置

在您的MCP客户端配置文件中添加以下配置:

```json
{
  "mcpServers": {
    "ddnet": {
      "command": "uvx",
      "args": ["ddnet-mcpserver"],
      "env": {},
      "disabled": false
    }
  }
}
```

## 可用工具

- `get_ddnet_game_status()`: 获取DDNet进程状态
- `stop_ddnet_game()`: 关闭DDNet进程
- `start_ddnet_game()`: 启动DDNet进程
- `check_bind(bindkey: str)`: 检查按键是否被占用
- `add_bind(bindkey: str, bindvalue: str)`: 增加按键绑定
- `delete_bind(bindkey: str)`: 删除按键绑定

## 开发

### 设置开发环境

```bash
git clone https://github.com/silverhi/ddnet-mcpserver.git
cd ddnet-mcpserver
uv pip install -e .
```

### 本地开发指南

#### 使用uv运行服务器

```bash
uv run -m ddnet_mcpserver
```

#### 使用MCP Inspector调试

```bash
npx -y @modelcontextprotocol/inspector uv run -m ddnet_mcpserver
```

#### 安装Node.js（Windows环境）

```bash
winget install jasongin.nvs
nvs add lts
nvs use lts
```

#### 使用pre-commit进行代码检查

```bash
uv pip install pre-commit
pre-commit install
```

#### 构建和发布包

```bash
python -m build
twine upload dist/*
```

## 许可证

MIT
