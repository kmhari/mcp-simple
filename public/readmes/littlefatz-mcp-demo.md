# 文件操作 MCP 服务器

这是一个符合[Model Context Protocol (MCP)](https://modelcontextprotocol.io/)规范的服务器，提供文件统计、搜索和内容分析功能。此服务器可以被LLM（如Claude、GPT等）调用，以实现访问文件系统的能力。

## 功能

服务器提供以下工具：
- `count_files`: 统计指定目录中的文件数量
- `search_files`: 根据文件名模式搜索文件
- `search_content`: 在文件内容中搜索文本

服务器还提供以下资源：
- `file://{file_path}`: 读取指定文件的内容

服务器提供以下提示模板：
- `analyze_directory`: 用于分析目录中的文件组成

## 安装

1. 安装 uv (如果尚未安装):

```bash
pip install uv
```

2. 使用 uv 创建虚拟环境并安装依赖:

```bash
uv venv
uv pip install -r requirements.txt
```

## 使用方法

### 运行服务器

使用提供的脚本启动服务器：

```bash
chmod +x run_server.sh
./run_server.sh
```

或者直接运行：

```bash
uv run python file_server.py
```

### 与LLM集成

此MCP服务器可以通过MCP协议连接到支持MCP的LLM应用程序（如Claude Desktop）。在Claude Desktop中，您可以通过以下方式配置服务器：

1. 打开Claude Desktop配置文件（`~/Library/Application Support/Claude/claude_desktop_config.json`）
2. 添加服务器配置：

```json
{
  "mcpServers": {
    "file-tools": {
      "command": "uv",
      "args": [
        "--directory",
        "/绝对路径/到/项目文件夹",
        "run",
        "python",
        "file_server.py"
      ]
    }
  }
}
```

3. 重启Claude Desktop应用

### 使用示例

一旦连接到LLM，您可以通过以下方式使用服务器功能：

- 统计目录中的文件：
  "请统计/Users/username/Documents目录中有多少个文件"

- 搜索特定类型的文件：
  "找出/Users/username/projects目录中所有的Python文件"

- 搜索文件内容：
  "在/Users/username/projects目录中找出所有包含'import tensorflow'的Python文件"

- 读取文件内容：
  "请读取并分析/Users/username/project/main.py文件"

## MCP协议

MCP（Model Context Protocol）是一个开放标准，用于定义AI模型如何与外部工具和资源交互。您可以在[官方网站](https://modelcontextprotocol.io/)了解更多。

## 许可证

MIT
