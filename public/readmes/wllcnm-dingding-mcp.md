# 钉钉 MCP 服务

这是一个基于MCP（Model Control Protocol）的钉钉服务，提供了钉钉API的访问功能。

## 功能特性

1. 获取钉钉 Access Token
2. 获取部门列表
3. 获取部门用户列表
4. 根据姓名查询用户详细信息（包括遍历部门查找用户）

## 环境要求

- Python 3.12+
- Docker（推荐）
- 钉钉应用凭证

## 安装和配置

### 1. 获取钉钉应用凭证

1. 登录[钉钉开放平台](https://open.dingtalk.com/)
2. 创建企业内部应用
3. 获取应用的 AppKey 和 AppSecret

### 2. 配置环境变量

需要设置以下环境变量：
```bash
DINGDING_APP_KEY=你的AppKey
DINGDING_APP_SECRET=你的AppSecret
```

## 使用方法

### 在 Claude 桌面客户端中使用

1. 在你的 `claude_desktop_config.json` 中添加以下配置：
```json
{
  "mcpServers": {
    "dingding": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e", "DINGDING_APP_KEY=你的AppKey",
        "-e", "DINGDING_APP_SECRET=你的AppSecret",
        "ghcr.io/你的用户名/dingding-mcp:latest"
      ]
    }
  }
}
```

### 本地开发

1. 克隆仓库：
```bash
git clone <repository_url>
cd dingding_chat
```

2. 安装依赖：
```bash
pip install -r requirements.txt
```

3. 运行服务：
```bash
python src/server.py
```

### Docker 部署

1. 拉取镜像���
```bash
docker pull ghcr.io/你的用户名/dingding-mcp:latest
```

2. 运行容器：
```bash
docker run -d --name dingding-mcp \
  -e DINGDING_APP_KEY=你的AppKey \
  -e DINGDING_APP_SECRET=你的AppSecret \
  ghcr.io/你的用户名/dingding-mcp:latest
```

## API 说明

### 1. 获取 Access Token
- 功能：获取钉钉API的access token
- 工具名：`get_access_token`
- 参数：无
- 返回：access token字符串

### 2. 获取部门列表
- 功能：获取企业的部门列表
- 工具名：`get_department_list`
- 参数：
  - fetch_child: 是否抓取子部门列表（可选，默认为true）
- 返回：部门列表信息（包括部门ID、名称、父部门ID等）

### 3. 获取部门用户列表
- 功能：获取指定部门的用户列表
- 工具名：`get_department_users`
- 参数：
  - department_id: 部门ID（必填）
- 返回：部门用户列表（包括用户ID、姓名等）

### 4. 根据姓名查询用户
- 功能：通过用户姓名查询用户详细信息
- 工具名：`search_user_by_name`
- 参数：
  - name: 用户姓名
- 返回：用户详细信息（包括用户ID、姓名、手机、邮箱、职位、所属部门等）

## 注意事项

1. 确保正确配置钉钉应用的凭证信息
2. 由于钉钉API的限制，查询用户信息需要遍历所有部门，可能需要一定时间
3. 建议在生产环境��使用 Docker 部署，以确保环境一致性

## 许可证

MIT License 