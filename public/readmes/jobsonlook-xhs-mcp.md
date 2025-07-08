# 小红书MCP服务
[![smithery badge](https://smithery.ai/badge/@jobsonlook/xhs-mcp)](https://smithery.ai/server/@jobsonlook/xhs-mcp)
## 特点
- [x] 采用js逆向出x-s,x-t,直接请求http接口,无须笨重的playwright
- [x] 搜索笔记
- [x] 获取笔记内容
- [x] 获取笔记的评论
- [x] 发表评论

![特性](https://raw.githubusercontent.com/jobsonlook/xhs-mcp/master/docs/feature.png)

## 快速开始

### 1. 环境
 * node
 * python 3.12
 * uv (pip install uv)

### 2. 安装依赖
```sh

git clone git@github.com:jobsonlook/xhs-mcp.git

cd xhs-mcp
uv sync 

```

### 3. 获取小红书的cookie
[打开web小红书](https://www.xiaohongshu.com/explore)
登录后，获取cookie，将cookie配置到第4步的 XHS_COOKIE 环境变量中
![cookie](https://raw.githubusercontent.com/jobsonlook/xhs-mcp/master/docs/cookie.png)

### 4. 配置mcp server

```json
{
    "mcpServers": {
        "xhs-mcp": {
            "command": "uv",
            "args": [
                "--directory",
                "/Users/xxx/xhs-mcp",
                "run",
                "main.py"
            ],
            "env": {
                "XHS_COOKIE": "xxxx"
            }
        }
    }
}
```

## 免责声明
本项目仅用于学习交流，禁止用于其他用途，任何涉及商业盈利目的均不得使用，否则风险自负。

