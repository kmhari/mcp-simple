# SSH Tools MCP

这是一个基于MCP (Model Context Protocol) 的SSH工具，允许你通过简单的命令连接到远程服务器并执行命令。

## 功能

- 连接到SSH服务器
- 执行远程命令（如 nvidia-smi）
- 断开SSH连接

## 安装

1. 安装依赖：
```bash
pip install -r requirements.txt
```

2. 运行服务器：
```bash
python ssh_server.py
```

## 使用方法

该MCP服务器提供以下工具：

1. `connect_ssh` - 连接到SSH服务器
   - 参数：
     - hostname: 服务器IP地址或主机名
     - password: SSH密码
     - username: SSH用户名（默认：root）
     - port: SSH端口（默认：22）

2. `run_command` - 在已连接的服务器上执行命令
   - 参数：
     - command: 要执行的命令（例如：nvidia-smi）

3. `disconnect_ssh` - 断开当前SSH连接

## 示例

1. 连接到服务器：
```python
connect_ssh(hostname="192.168.1.100", password="your_password")
```

2. 执行 nvidia-smi 命令：
```python
run_command(command="nvidia-smi")
```

3. 断开连接：
```python
disconnect_ssh()
```

## 注意事项

- 确保目标服务器允许SSH密码认证
- 建议在使用完毕后调用 `disconnect_ssh` 断开连接
- 所有命令执行都会返回命令的输出或错误信息 