# CMD Executor

这是一个基于 `mcp.server` 框架的 Windows CMD 命令执行工具，允许通过 MCP 协议远程执行 CMD 命令。

## 功能特性

*   **远程命令执行：** 通过 `mcp.server` 提供的接口，安全地执行 Windows CMD 命令。
*   **可配置的工作目录：**
    *  在调用 `execute` 方法时，显式地传入 `cwd` 参数。
    *  如果未指定 `cwd` 参数，则优先使用项目根目录下的 `.env` 文件中定义的 `SANDBOX_PATH` 环境变量。
*   **UTF-8 JSON 响应：** 返回的 JSON 响应使用 UTF-8 编码，直接包含 Unicode 字符。
*   **错误处理：** 详细的错误处理和日志记录，方便问题排查。

## 依赖

*   **python-dotenv**：用于加载 `.env` 文件中的环境变量。  
*   **fast-mcp**：`mcp.server` 的一个快速实现。

您可以使用 `requirements.txt` 文件来安装所有依赖：

```bash
pip install -r requirements.txt
```

## 安装步骤

1.  **克隆仓库：** 将此仓库克隆到您的本地计算机。
2.  **安装依赖：** 运行 `pip install -r requirements.txt` 安装所有依赖。
3.  **配置 `.env` (建议)：** 在项目根目录下创建一个 `.env` 文件，并设置 `SANDBOX_PATH` 环境变量，以指定默认的工作目录：

    ```dotenv
    SANDBOX_PATH=Your_Desired_Path
    ```

## 配置说明

在您的 MCP 客户端的配置文件中添加或修改以下内容，以注册此服务器：

```json
{
    "mcpServers": {
        "name": { 
            "type": "stdio",
            "command": "your-path/python.exe",
            "args": [
                "your-program-path/main.py"
            ]
        }
    }
}
```

**注意：**

*   请将 `your-path/python.exe` 替换为您的 Python 解释器的实际路径。
*   请将 `your-program-path/main.py` 替换为 `main.py` 文件的实际路径。
*   `name` 字段可以替换为您喜欢的任何名称。

## 安全声明

**请务必注意：**

*   **本工具具有潜在的安全风险。** 允许远程执行 CMD 命令意味着攻击者可能利用此工具执行恶意操作，例如修改系统文件、安装恶意软件等。
*   **请勿在生产环境中使用。** 本工具主要用于学习和演示目的，请勿在生产环境中使用。
*   **请采取必要的安全措施。** 如果您必须使用此工具，请确保采取必要的安全措施，例如限制访问权限、使用强密码、定期审查日志等。
*   **您将承担所有风险。** 使用本工具所产生的一切后果由您自行承担，作者不承担任何责任。

## 许可

本项目使用 [MIT 许可证](LICENSE)。

