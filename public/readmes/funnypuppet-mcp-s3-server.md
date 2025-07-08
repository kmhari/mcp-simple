# 对象存储服务MCP

用于对象存储的MCP(模型上下文协议)服务器，支持对象存储的一系列操作

## 环境要求

Python >= 3.11

## 使用方法

1、拉取本项目到本地

2、安装依赖

```
uv sync
```

3、在mcp客户端中配置server

```
{
  "mcpServers": {
    "bilibili": {
      "command": "uv",
      "args": [
        "--directory",
        "/your-project-path/src/s3-server",
        "run",
        "server.py"
      ],
      "env": {
        "ENDPOINT": "endpoint",
        "ACCESS_KEY_ID": "your access key",
        "ACCESS_KEY_SECRET": "your access secret"
      }
    }
  }
}
```

## 支持操作

* list-buckets

  列出所有桶

* exists-bucket

  判断桶是否存在

* create-bucket

  创建一个新的桶

* delete-bucket

  删除桶

* list-objects

  查询桶下面的对象

* get-object

  获取对象，保存到本地文件

* put-object

  上传本地文件到桶中

* delete-object

  删除对象

* get-object-metadata

  获取对象元数据