# Elixir Linux MCP Server

该项目是适配于Elixir查看Linux代码的MCP服务器，能够让LLM更精准地读代码

# 依赖条件

- 本地配置[Elixir](https://github.com/bootlin/elixir)并根据其教程建立索引
- 安装了python和uv
- 已经clone了一个Linux仓库到本地

# 使用方法

将以下json代码粘贴到mcp的配置中：

```json
{
  "mcpServers": {
    "linux_source_code_query": {
      "command": "uv",
      "args": [
        "--directory",
        "/path/to/elixir_linux_mcp_server",
        "run",
        "main.py"
      ],
      "env": {
        "LXR_BASE_DIR": "/srv/elixir-data/",
        "REPO_DIR": "/path/to/linux"
      }
    }
  }
}
```
一般来说elixir建好索引项目的目录结构如下：

```
/srv/elixir-data
└── linux
    ├── data
    └── repo
```

环境变量`LXR_BASE_DIR`指向elixir项目的根目录`/srv/elixir-data`
环境变量`REPO_DIR`指向你clone下来的Linux源码项目

