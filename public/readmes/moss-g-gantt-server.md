# 甘特图 MCP 服务器

一个专为甘特图管理设计的模型上下文协议(MCP)服务器，允许AI助手通过标准化接口创建、管理和可视化甘特图项目与任务。

## 功能特点

* 项目管理
  * 创建新的甘特图项目
  * 列出所有现有项目
  * 删除不需要的项目
* 任务管理
  * 添加新任务到项目
  * 更新任务信息(名称、描述、日期、负责人、进度)
  * 删除任务
  * 获取任务详情
* 可视化
  * 生成交互式HTML甘特图
  * 自动在浏览器中打开甘特图

## 使用指南

1. 确保您的系统上安装了Python 3.10或更高版本。
2. 确保安装了`uv`工具，如果尚未安装，请参考[uv官方安装指南](https://github.com/astral-sh/uv)进行安装。
3. 克隆此仓库：
4. 创建虚拟环境并安装依赖：

```bash
# 创建虚拟环境
uv venv
source .venv/bin/activate  # Unix/macOS
# 或 .venv\Scripts\activate  # Windows

# 安装依赖项
uv pip install -e .
```


5. 运行服务器：

```bash
# 直接运行服务器
uv run run_server.py
```

6. 确保数据目录存在（首次运行时）：

```bash
mkdir -p data charts
```

## 与MCP Client集成

添加以下配置：

```json
{
  "mcpServers": {
    "gantt-server": {
      "command": "uv",
      "args": [
        "--directory",
        "<完整路径到gantt-mcp-server目录>",
        "run",
        "run_server.py"
      ]
    }
  }
}
```
