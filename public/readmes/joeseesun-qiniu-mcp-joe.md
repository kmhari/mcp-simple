# 七牛云存储 MCP 服务

用于上传文件到七牛云存储的MCP服务

## 安装指南

1. 克隆仓库
2. 创建并激活虚拟环境:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. 安装依赖:
   ```bash
   pip install -r requirements.txt
   ```
4. 配置环境变量:
   ```bash
   export QINIU_ACCESS_KEY="你的AccessKey"
   export QINIU_SECRET_KEY="你的SecretKey" 
   export QINIU_BUCKET_NAME="joemarkdown"
   export QINIU_DOMAIN="https://img.t5t6.com"
   ```
5. 启动服务:
   ```bash
   python server.py
   ```

## 配置说明

1. 复制示例配置文件:
   ```bash
   cp .env.example .env
   ```
2. 编辑`.env`文件填写你的七牛云凭证
3. 切勿将`.env`文件提交到版本控制

示例`.env`内容:
```
QINIU_ACCESS_KEY=你的AccessKey
QINIU_SECRET_KEY=你的SecretKey
QINIU_BUCKET_NAME=你的存储空间名称
QINIU_DOMAIN=https://你的域名
```

## 使用方法

1. 克隆项目后首次运行:
```bash
# 进入项目目录
cd qiniu_mcp_server

# 创建虚拟环境
python3 -m venv venv

# 激活环境 (Linux/Mac)
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 复制并配置.env文件
cp .env.example .env
nano .env  # 编辑填入你的七牛云凭证

# 启动服务
python server.py
```

2. 日常使用:
```bash
cd qiniu_mcp_server
source venv/bin/activate  # 激活环境
python server.py          # 启动服务
```

3. 调用上传接口示例:
```python
from mcp import McpClient

client = McpClient("qiniu_mcp")
url = client.use_tool("upload_file", {
    "file_path": "/path/to/your/file.jpg"
})
print("文件URL:", url)
```

服务提供以下工具:
- `upload_file(file_path: str) -> str`: 上传文件并返回公开访问URL

## Trae 集成配置

在Trae的配置文件中添加以下内容(请替换实际路径和凭证):

```json
{
  "mcpServers": {
    "qiniu_mcp": {
      "command": "python",
      "args": [
        "/path/to/qiniu_mcp_server/server.py"
      ],
      "env": {
        "QINIU_ACCESS_KEY": "你的AccessKey",
        "QINIU_SECRET_KEY": "你的SecretKey",
        "QINIU_BUCKET_NAME": "你的存储空间名称",
        "QINIU_DOMAIN": "https://你的域名"
      }
    }
  }
}
```

注意: 实际使用时请确保:
1. 替换`/path/to/`为实际服务器路径
2. 使用真实的凭证信息替换示例值
3. 妥善保管凭证信息
