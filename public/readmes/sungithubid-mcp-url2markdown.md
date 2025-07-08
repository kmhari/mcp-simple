# mcp-url2markdown
基于 [crawl4ai](https://github.com/unclecode/crawl4ai) 根据提供的url把网页内容转为干净，格式化的markdown内容

## 快速开始

使用uv安装

```bash
git clone https://github.com/sungithubid/mcp-url2markdown.git

uv sync
```

## 使用

**1. FastMCP cli run server**
```bash
source .venv/bin/activate
fastmcp dev server.py
```

打开```http://127.0.0.1:6274/``` 测试


![](https://github.com/user-attachments/assets/8194028c-c588-44c6-93e4-10c74a009d33)

**2. 使用Cursor，cline，roo code等工具**

配置
```json
{
  "mcpServers": {
    "url2md": {
      "command": "uv",
      "args": [
        "--directory",
        "/path/to/mcp-url2markdown",
        "run",
        "server.py"
      ],
      "env": {},
      "disabled": false,
      "autoApprove": [],
      "alwaysAllow": []
    }
  }
}
```

使用roo code测试
输入

```
把如下网址的网页内容转成markdown输出
https://api-docs.deepseek.com/zh-cn/guides/kv_cache
```

执行与输出

![](https://github.com/user-attachments/assets/59973374-dd22-4f6c-be3b-acf75fd97fad)

